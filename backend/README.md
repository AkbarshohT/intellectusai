# Presentation Delivery Feedback Backend

A small FastAPI service that takes a presentation recording (audio or video) and
returns AI-generated **delivery** feedback using Google's Gemini API
(`gemini-2.5-flash`). It evaluates *how* something is said — pace, filler words,
pauses, pronunciation, structure, and energy — not whether the content is
factually correct.

If a video is uploaded, only the **audio track** is extracted and sent to
Gemini; video frames are never uploaded.

## Install

From the `backend/` directory:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

> `imageio-ffmpeg` bundles an `ffmpeg` binary used to extract audio from video,
> so no system-wide ffmpeg install is required. A system `ffmpeg` on `PATH`
> will be used if present.

## Configure the API key

The key is read from `GEMINI_API_KEY` in a `.env.local` file at the **project
root** (one level above `backend/`):

```bash
# from the project root
echo "GEMINI_API_KEY=your_real_key_here" > .env.local
```

See `backend/.env.example` for the variable name. The key is never hardcoded.

## Run

From the `backend/` directory (with the venv activated):

```bash
uvicorn main:app --reload --port 8000
```

The server listens on `http://localhost:8000`. CORS is enabled for
`http://localhost:5173` (the Vite dev front-end).

## Endpoints

### `GET /health`

Returns service status, e.g.:

```json
{ "status": "ok", "model": "gemini-2.5-flash", "api_key_configured": true }
```

### `POST /api/analyze`

Accepts `multipart/form-data`:

| Field      | Type   | Description                                            |
| ---------- | ------ | ------------------------------------------------------ |
| `file`     | file   | An audio **or** video recording of the presentation.   |
| `topic`    | string | The presentation topic (used for the relevance note).  |
| `language` | string | One of `uzbek`, `russian`, `english`.                  |

Example:

```bash
curl -X POST http://localhost:8000/api/analyze \
  -F "file=@recording.mp4" \
  -F "topic=Climate change in Central Asia" \
  -F "language=english"
```

**Success (`200`)** — strict JSON matching this shape:

```json
{
  "overall_score": 0,
  "pace": { "wpm": 0, "note": "" },
  "filler_words": { "count": 0, "examples": [] },
  "pauses": { "score": 0, "note": "" },
  "pronunciation": { "score": 0, "note": "" },
  "structure": { "score": 0, "note": "" },
  "energy": { "score": 0, "note": "" },
  "transcript": "",
  "top_strengths": ["", "", ""],
  "top_improvements": ["", "", ""],
  "relevance_note": ""
}
```

The JSON shape is enforced via Gemini's `responseMimeType: "application/json"`
and a `responseSchema`.

**Errors** — always clean JSON, never a crash or malformed body:

```json
{ "error": true, "message": "..." }
```

- `400` — invalid/empty input (bad language, empty file).
- `502` — Gemini error, including the model being overloaded after retries, or
  an unparseable response.
- `500` — missing `GEMINI_API_KEY` or an unexpected server error.

If Gemini returns `503` (model overloaded), the call is retried up to 3 times
with increasing delays (2s, 5s, 10s) before giving up.
