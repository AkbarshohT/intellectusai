"""FastAPI backend: presentation delivery feedback via Google's Gemini API.

Single endpoint POST /api/analyze accepts an audio or video file plus a topic
and language, extracts the audio track (video frames are never sent to Gemini),
uploads the audio through the Gemini File API, and asks gemini-2.5-flash to
score the delivery. The model is forced to return strict JSON matching a fixed
schema. All failure modes (overloaded model, unparseable output) are turned
into clean JSON error responses instead of crashes.
"""

import json
import os
import shutil
import subprocess
import tempfile
import time
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from google import genai
from google.genai import types
from google.genai import errors as genai_errors

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

# Load environment from the project-root .env.local (one level up from backend/).
PROJECT_ROOT = Path(__file__).resolve().parent.parent
load_dotenv(PROJECT_ROOT / ".env.local")

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
MODEL_NAME = "gemini-2.5-flash"

ALLOWED_LANGUAGES = {"uzbek", "russian", "english"}

# Retry schedule (seconds) used when Gemini reports the model is overloaded (503).
RETRY_DELAYS = [2, 5, 10]

app = FastAPI(title="Presentation Delivery Feedback API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Gemini response schema (forces strict JSON output)
# ---------------------------------------------------------------------------

RESPONSE_SCHEMA = {
    "type": "object",
    "properties": {
        "overall_score": {"type": "integer"},
        "pace": {
            "type": "object",
            "properties": {
                "wpm": {"type": "number"},
                "note": {"type": "string"},
            },
            "required": ["wpm", "note"],
        },
        "filler_words": {
            "type": "object",
            "properties": {
                "count": {"type": "integer"},
                "examples": {"type": "array", "items": {"type": "string"}},
            },
            "required": ["count", "examples"],
        },
        "pauses": {
            "type": "object",
            "properties": {
                "score": {"type": "integer"},
                "note": {"type": "string"},
            },
            "required": ["score", "note"],
        },
        "pronunciation": {
            "type": "object",
            "properties": {
                "score": {"type": "integer"},
                "note": {"type": "string"},
            },
            "required": ["score", "note"],
        },
        "structure": {
            "type": "object",
            "properties": {
                "score": {"type": "integer"},
                "note": {"type": "string"},
            },
            "required": ["score", "note"],
        },
        "energy": {
            "type": "object",
            "properties": {
                "score": {"type": "integer"},
                "note": {"type": "string"},
            },
            "required": ["score", "note"],
        },
        "transcript": {"type": "string"},
        "top_strengths": {"type": "array", "items": {"type": "string"}},
        "top_improvements": {"type": "array", "items": {"type": "string"}},
        "relevance_note": {"type": "string"},
    },
    "required": [
        "overall_score",
        "pace",
        "filler_words",
        "pauses",
        "pronunciation",
        "structure",
        "energy",
        "transcript",
        "top_strengths",
        "top_improvements",
        "relevance_note",
    ],
}


def build_prompt(topic: str, language: str) -> str:
    return f"""You are an expert presentation coach. Evaluate the speaker's DELIVERY \
in the attached audio recording. The presentation topic is: "{topic}". \
The spoken language is {language}.

IMPORTANT: Judge ONLY delivery, NOT whether the content is factually correct. \
Do not fact-check. Assess how the speaker delivers, on these exact dimensions:

- pace: estimate words per minute (wpm) and give a short qualitative note \
(too fast / too slow / well-paced).
- filler_words: count filler words/sounds (e.g. "um", "uh", "like", "you know", \
and their equivalents in the spoken language) and list a few examples you heard.
- pauses: rate the clarity of pacing and use of pauses (0-100) with a short note.
- pronunciation: rate pronunciation clarity and articulation (0-100) with a note.
- structure: rate whether the talk has a clear intro, body, and conclusion \
(0-100) with a note on what was present or missing.
- energy: rate vocal variation, enthusiasm, and dynamism (0-100) with a note.

Also provide:
- overall_score (0-100): a holistic delivery score.
- transcript: a faithful transcript of what was said.
- top_strengths: exactly 3 concise strengths in delivery.
- top_improvements: exactly 3 concise, actionable improvements.
- relevance_note: a brief note on whether the delivery stayed on the stated topic \
(this is about focus/relevance of delivery, still not fact-checking correctness).

Respond ONLY with JSON that matches the provided schema. All scores are integers \
0-100. Write notes and the transcript in {language} where natural."""


# ---------------------------------------------------------------------------
# Audio extraction helpers
# ---------------------------------------------------------------------------

def _ffmpeg_binary() -> str | None:
    """Locate an ffmpeg binary: system ffmpeg, or the imageio-ffmpeg bundle."""
    system = shutil.which("ffmpeg")
    if system:
        return system
    try:
        import imageio_ffmpeg

        return imageio_ffmpeg.get_ffmpeg_exe()
    except Exception:
        return None


def extract_audio(src_path: str, content_type: str, filename: str) -> tuple[str, str]:
    """Return (path_to_audio_file, mime_type) ready for upload.

    If the upload is already audio, it is used as-is. If it is video, the audio
    track is transcoded to a standalone .m4a (AAC) file so that no video frames
    are ever sent to Gemini.
    """
    name = (filename or "").lower()
    ctype = (content_type or "").lower()

    is_video = ctype.startswith("video/") or name.endswith(
        (".mp4", ".mov", ".webm", ".mkv", ".avi", ".m4v")
    )

    if not is_video:
        # Treat as audio. Best-effort mime detection for the File API.
        mime = ctype if ctype.startswith("audio/") else "audio/mpeg"
        if name.endswith(".wav"):
            mime = "audio/wav"
        elif name.endswith((".m4a", ".mp4a")):
            mime = "audio/mp4"
        elif name.endswith(".ogg"):
            mime = "audio/ogg"
        elif name.endswith(".flac"):
            mime = "audio/flac"
        elif name.endswith(".mp3"):
            mime = "audio/mpeg"
        return src_path, mime

    ffmpeg = _ffmpeg_binary()
    if not ffmpeg:
        raise RuntimeError(
            "A video file was uploaded but no ffmpeg binary is available to "
            "extract the audio track. Install ffmpeg or the imageio-ffmpeg package."
        )

    out_path = src_path + ".audio.m4a"
    cmd = [
        ffmpeg,
        "-y",
        "-i", src_path,
        "-vn",            # drop video stream entirely
        "-acodec", "aac",
        "-b:a", "128k",
        out_path,
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0 or not os.path.exists(out_path):
        raise RuntimeError(
            "Failed to extract audio from the uploaded video. "
            f"ffmpeg error: {result.stderr[-500:]}"
        )
    return out_path, "audio/mp4"


# ---------------------------------------------------------------------------
# Gemini call with retry
# ---------------------------------------------------------------------------

def call_gemini(client: genai.Client, audio_path: str, mime_type: str,
                topic: str, language: str) -> dict:
    """Upload the audio and call Gemini, retrying on 503 (overloaded).

    Returns the parsed JSON dict. Raises on unrecoverable failure.
    """
    uploaded = client.files.upload(
        file=audio_path,
        config=types.UploadFileConfig(mime_type=mime_type),
    )

    prompt = build_prompt(topic, language)
    config = types.GenerateContentConfig(
        response_mime_type="application/json",
        response_schema=RESPONSE_SCHEMA,
    )

    last_error: Exception | None = None
    # Total attempts = 1 initial + len(RETRY_DELAYS) retries.
    for attempt in range(len(RETRY_DELAYS) + 1):
        try:
            response = client.models.generate_content(
                model=MODEL_NAME,
                contents=[uploaded, prompt],
                config=config,
            )
            return json.loads(response.text)
        except genai_errors.APIError as exc:
            last_error = exc
            if getattr(exc, "code", None) == 503 and attempt < len(RETRY_DELAYS):
                time.sleep(RETRY_DELAYS[attempt])
                continue
            raise
        except json.JSONDecodeError as exc:
            # The model returned something that wasn't valid JSON; don't retry.
            raise RuntimeError("Gemini returned a response that was not valid JSON.") from exc

    # Should be unreachable, but be safe.
    if last_error:
        raise last_error
    raise RuntimeError("Gemini call failed for an unknown reason.")


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@app.get("/health")
def health() -> dict:
    return {"status": "ok", "model": MODEL_NAME, "api_key_configured": bool(GEMINI_API_KEY)}


@app.post("/api/analyze")
async def analyze(
    file: UploadFile = File(...),
    topic: str = Form(...),
    language: str = Form(...),
) -> JSONResponse:
    language = (language or "").strip().lower()
    if language not in ALLOWED_LANGUAGES:
        return JSONResponse(
            status_code=400,
            content={
                "error": True,
                "message": (
                    f"Invalid language '{language}'. "
                    f"Must be one of: {', '.join(sorted(ALLOWED_LANGUAGES))}."
                ),
            },
        )

    if not GEMINI_API_KEY:
        return JSONResponse(
            status_code=500,
            content={
                "error": True,
                "message": "GEMINI_API_KEY is not configured on the server.",
            },
        )

    tmp_dir = tempfile.mkdtemp(prefix="analyze_")
    saved_path = os.path.join(tmp_dir, file.filename or "upload.bin")
    extracted_path: str | None = None
    try:
        # Persist the upload to disk for ffmpeg / the File API.
        with open(saved_path, "wb") as out:
            shutil.copyfileobj(file.file, out)

        if os.path.getsize(saved_path) == 0:
            return JSONResponse(
                status_code=400,
                content={"error": True, "message": "The uploaded file is empty."},
            )

        audio_path, mime_type = extract_audio(
            saved_path, file.content_type or "", file.filename or ""
        )
        if audio_path != saved_path:
            extracted_path = audio_path

        client = genai.Client(api_key=GEMINI_API_KEY)
        result = call_gemini(client, audio_path, mime_type, topic, language)
        return JSONResponse(status_code=200, content=result)

    except genai_errors.APIError as exc:
        code = getattr(exc, "code", None)
        if code == 503:
            message = (
                "The Gemini model is currently overloaded. Please try again "
                "in a few moments."
            )
        else:
            message = f"Gemini API error: {getattr(exc, 'message', str(exc))}"
        return JSONResponse(
            status_code=502,
            content={"error": True, "message": message},
        )
    except RuntimeError as exc:
        return JSONResponse(
            status_code=502,
            content={"error": True, "message": str(exc)},
        )
    except Exception as exc:  # noqa: BLE001 - last-resort guard, never crash
        return JSONResponse(
            status_code=500,
            content={
                "error": True,
                "message": f"Unexpected error while analyzing the recording: {exc}",
            },
        )
    finally:
        # Clean up temp files regardless of outcome.
        for path in (extracted_path, saved_path):
            try:
                if path and os.path.exists(path):
                    os.remove(path)
            except OSError:
                pass
        try:
            os.rmdir(tmp_dir)
        except OSError:
            pass
