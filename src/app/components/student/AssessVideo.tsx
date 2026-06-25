import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { Video, Upload, CheckCircle2, X } from "lucide-react";

export function AssessVideo() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("Uzbek");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file.type.startsWith("video/")) setVideoFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setAnalyzing(true);
    setTimeout(() => navigate("/student/results/a1"), 3000);
  };

  if (analyzing) {
    return <AnalyzingScreen />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1
          style={{
            fontWeight: 800,
            color: "#2A2D31",
            fontSize: "1.5rem",
            letterSpacing: "-0.025em",
          }}
        >
          Assess a Video
        </h1>
        <p style={{ color: "#6B7280", fontSize: "0.9rem", marginTop: "4px" }}>
          Submit your presentation for instant AI-powered delivery feedback.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        {/* LEFT: How it works */}
        <div
          className="lg:col-span-2 bg-white rounded-2xl p-6 flex flex-col gap-6"
          style={{ border: "1px solid #E5E5E8" }}
        >
          <div>
            <h2 style={{ fontWeight: 700, color: "#2A2D31", fontSize: "0.9375rem" }}>
              How it works
            </h2>
            <p style={{ color: "#9CA3AF", fontSize: "0.8rem", marginTop: "2px" }}>
              Four steps to better speaking
            </p>
          </div>

          <ol className="flex flex-col gap-5">
            {[
              { n: "01", title: "Record or upload a video", desc: "Submit a speech between 3–10 minutes" },
              { n: "02", title: "AI analyzes your performance", desc: "Pace, pronunciation, structure, energy & more" },
              { n: "03", title: "Get detailed feedback", desc: "Scores across 6 dimensions of speaking" },
              { n: "04", title: "Improve with clear suggestions", desc: "Specific, actionable tips for your next speech" },
            ].map((step, i) => (
              <li key={step.n} className="flex items-start gap-3.5">
                <div
                  className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5"
                  style={{ backgroundColor: "#2A2D31" }}
                >
                  <span style={{ color: "white", fontSize: "0.6875rem", fontWeight: 700 }}>
                    {step.n}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <p style={{ fontWeight: 600, color: "#2A2D31", fontSize: "0.875rem" }}>
                    {step.title}
                  </p>
                  <p style={{ color: "#9CA3AF", fontSize: "0.8rem", lineHeight: 1.5 }}>
                    {step.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div
            className="rounded-xl p-3.5 flex flex-col gap-2"
            style={{ backgroundColor: "#F7F7F8", border: "1px solid #EBEBED" }}
          >
            <p style={{ fontWeight: 600, color: "#2A2D31", fontSize: "0.8rem" }}>
              Supported languages
            </p>
            <div className="flex gap-1.5">
              {["Uzbek", "Russian", "English"].map((l) => (
                <span
                  key={l}
                  className="px-2.5 py-1 rounded-lg text-xs"
                  style={{ backgroundColor: "#2A2D31", color: "white", fontWeight: 500 }}
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Form */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-3 bg-white rounded-2xl p-6 flex flex-col gap-5"
          style={{ border: "1px solid #E5E5E8" }}
        >
          <h2 style={{ fontWeight: 700, color: "#2A2D31", fontSize: "0.9375rem" }}>
            Submit your presentation
          </h2>

          {/* Topic */}
          <FieldGroup label="Topic">
            <input
              type="text"
              placeholder="Enter the topic of your speech"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
              className="w-full rounded-xl px-4 py-2.5 outline-none transition-all"
              style={{
                border: "1.5px solid #E5E5E8",
                fontSize: "0.875rem",
                color: "#111827",
                backgroundColor: "white",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#2A2D31")}
              onBlur={(e) => (e.target.style.borderColor = "#E5E5E8")}
            />
          </FieldGroup>

          {/* Language */}
          <FieldGroup label="Language">
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full rounded-xl px-4 py-2.5 outline-none transition-all appearance-none"
                style={{
                  border: "1.5px solid #E5E5E8",
                  fontSize: "0.875rem",
                  color: "#111827",
                  backgroundColor: "white",
                  paddingRight: "36px",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#2A2D31")}
                onBlur={(e) => (e.target.style.borderColor = "#E5E5E8")}
              >
                <option>Uzbek</option>
                <option>Russian</option>
                <option>English</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 4.5L6 8L9.5 4.5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </FieldGroup>

          {/* Video upload zone */}
          <FieldGroup label="Video">
            <input
              ref={fileRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
              }}
            />
            <div
              className="rounded-xl flex flex-col items-center justify-center gap-3 py-8 px-5 cursor-pointer transition-all"
              style={{
                border: `2px dashed ${dragOver ? "#2A2D31" : videoFile ? "#16A34A" : "#D1D5DB"}`,
                backgroundColor: dragOver ? "#F7F7F8" : videoFile ? "#F0FDF4" : "#FAFAFA",
              }}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                const f = e.dataTransfer.files[0];
                if (f) handleFile(f);
              }}
              onClick={() => fileRef.current?.click()}
            >
              {videoFile ? (
                <div className="flex flex-col items-center gap-2 text-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#DCFCE7" }}
                  >
                    <CheckCircle2 size={22} style={{ color: "#16A34A" }} />
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, color: "#16A34A", fontSize: "0.875rem" }}>
                      {videoFile.name}
                    </p>
                    <p style={{ color: "#6B7280", fontSize: "0.8rem" }}>
                      {(videoFile.size / 1024 / 1024).toFixed(1)} MB · Click to change
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-center">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "#F0F0F2" }}
                  >
                    <Video size={20} style={{ color: "#9CA3AF" }} />
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, color: "#374151", fontSize: "0.875rem" }}>
                      No video selected
                    </p>
                    <p style={{ color: "#9CA3AF", fontSize: "0.8rem" }}>
                      Drag & drop or click to upload
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                style={{ border: "1.5px solid #E5E5E8", color: "#374151", fontSize: "0.8125rem", fontWeight: 500 }}
              >
                <Video size={14} />
                Record Video
              </button>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                style={{ border: "1.5px solid #E5E5E8", color: "#374151", fontSize: "0.8125rem", fontWeight: 500 }}
              >
                <Upload size={14} />
                Upload Video
              </button>
            </div>
          </FieldGroup>

          {/* Terms checkbox */}
          <label className="flex items-start gap-3 cursor-pointer">
            <button
              type="button"
              onClick={() => setAgreed(!agreed)}
              className="w-4.5 h-4.5 rounded flex items-center justify-center shrink-0 transition-all mt-0.5"
              style={{
                width: "18px",
                height: "18px",
                border: `1.5px solid ${agreed ? "#2A2D31" : "#D1D5DB"}`,
                backgroundColor: agreed ? "#2A2D31" : "white",
              }}
            >
              {agreed && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
            <span style={{ color: "#6B7280", fontSize: "0.8125rem", lineHeight: 1.6 }}>
              By submitting the video you agree to our{" "}
              <span
                className="underline cursor-pointer"
                style={{ color: "#2A2D31" }}
                onClick={(e) => e.stopPropagation()}
              >
                Terms and Conditions
              </span>
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={!agreed}
            className="w-full py-3 rounded-xl transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#2A2D31", color: "white", fontWeight: 600, fontSize: "0.9375rem" }}
          >
            Submit for Analysis
          </button>
        </form>
      </div>
    </div>
  );
}

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label style={{ fontWeight: 600, color: "#374151", fontSize: "0.8125rem" }}>{label}</label>
      {children}
    </div>
  );
}

function AnalyzingScreen() {
  const steps = [
    "Transcribing audio",
    "Measuring pace & fluency",
    "Detecting filler words",
    "Scoring structure & energy",
    "Generating feedback report",
  ];

  return (
    <div className="min-h-[72vh] flex flex-col items-center justify-center">
      <div
        className="bg-white rounded-2xl p-10 flex flex-col items-center gap-7 w-full max-w-md"
        style={{ border: "1px solid #E5E5E8", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
      >
        {/* Animated ring */}
        <div className="relative flex items-center justify-center w-16 h-16">
          <svg className="animate-spin" width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ position: "absolute" }}>
            <circle cx="32" cy="32" r="28" stroke="#E5E5E8" strokeWidth="5" />
            <path d="M32 4a28 28 0 0 1 28 28" stroke="#2A2D31" strokeWidth="5" strokeLinecap="round" />
          </svg>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "#2A2D31" }}
          >
            <Video size={18} style={{ color: "white" }} />
          </div>
        </div>

        <div className="flex flex-col items-center gap-1.5 text-center">
          <h2
            style={{ fontWeight: 800, color: "#2A2D31", fontSize: "1.25rem", letterSpacing: "-0.02em" }}
          >
            Analyzing your delivery…
          </h2>
          <p style={{ color: "#6B7280", fontSize: "0.875rem" }}>
            Our AI is reviewing your speech across 6 dimensions.
          </p>
        </div>

        <div className="w-full flex flex-col gap-2.5">
          {steps.map((step, i) => (
            <ProgressStep key={step} label={step} delay={i * 500} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProgressStep({ label, delay }: { label: string; delay: number }) {
  const [state, setState] = useState<"waiting" | "active" | "done">("waiting");

  useEffect(() => {
    const t1 = setTimeout(() => setState("active"), delay);
    const t2 = setTimeout(() => setState("done"), delay + 450);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [delay]);

  if (state === "waiting") return null;

  return (
    <div className="flex items-center gap-3">
      <div
        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all"
        style={{ backgroundColor: state === "done" ? "#16A34A" : "#F0F0F2" }}
      >
        {state === "done" ? (
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
            <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse" />
        )}
      </div>
      <span
        style={{
          fontSize: "0.8125rem",
          color: state === "done" ? "#111827" : "#9CA3AF",
          fontWeight: state === "done" ? 500 : 400,
        }}
      >
        {label}
      </span>
    </div>
  );
}
