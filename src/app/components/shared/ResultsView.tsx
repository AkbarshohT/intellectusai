import { useState } from "react";
import { ChevronDown, ChevronUp, ArrowRight, ArrowLeft } from "lucide-react";
import { type Assessment } from "../../data";

interface ResultsViewProps {
  assessment: Assessment;
  onBack?: () => void;
  backLabel?: string;
  context?: "student" | "professor";
}

export function ResultsView({
  assessment,
  onBack,
  backLabel = "Analyze another video",
  context = "student",
}: ResultsViewProps) {
  const [transcriptOpen, setTranscriptOpen] = useState(false);

  const subscoreItems = [
    { label: "Pace", score: assessment.subscores.pace.score, detail: assessment.subscores.pace.detail },
    { label: "Filler Words", score: assessment.subscores.fillerWords.score, detail: assessment.subscores.fillerWords.detail },
    { label: "Pauses & Pacing", score: assessment.subscores.pausesPacing.score, detail: assessment.subscores.pausesPacing.detail },
    { label: "Pronunciation & Clarity", score: assessment.subscores.pronunciation.score, detail: assessment.subscores.pronunciation.detail },
    { label: "Structure", score: assessment.subscores.structure.score, detail: assessment.subscores.structure.detail },
    { label: "Energy & Vocal Variation", score: assessment.subscores.energy.score, detail: assessment.subscores.energy.detail },
  ];

  const scoreColor = (s: number) => s >= 80 ? "#16A34A" : s >= 60 ? "#D97706" : "#DC2626";
  const scoreBg = (s: number) => s >= 80 ? "#DCFCE7" : s >= 60 ? "#FEF3C7" : "#FEE2E2";
  const scoreBorder = (s: number) => s >= 80 ? "#BBF7D0" : s >= 60 ? "#FDE68A" : "#FECACA";

  return (
    <div className="flex flex-col gap-5">
      {/* Header card */}
      <div
        className="bg-white rounded-2xl px-6 py-5"
        style={{ border: "1px solid #E5E5E8" }}
      >
        <div className="flex items-center gap-2 flex-wrap mb-2">
          <span
            className="px-2.5 py-0.5 rounded-full text-xs"
            style={{ backgroundColor: "#F0F0F2", color: "#717182", fontWeight: 600 }}
          >
            {assessment.language}
          </span>
          <span style={{ color: "#9CA3AF", fontSize: "0.8rem" }}>{assessment.submittedAt}</span>
        </div>
        <h1
          style={{ fontWeight: 800, color: "#2A2D31", fontSize: "1.375rem", letterSpacing: "-0.025em" }}
        >
          {assessment.topic}
        </h1>
      </div>

      {/* Score + verdict hero */}
      <div
        className="bg-white rounded-2xl overflow-hidden"
        style={{ border: "1px solid #E5E5E8" }}
      >
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 p-8">
          {/* Circle gauge */}
          <div className="shrink-0">
            <CircularScore score={assessment.score} />
          </div>
          {/* Right info */}
          <div className="flex flex-col gap-5 flex-1 text-center sm:text-left">
            <div>
              <p
                style={{
                  color: "#9CA3AF",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                  marginBottom: "6px",
                }}
              >
                Overall Score
              </p>
              <p
                style={{ fontWeight: 600, color: "#111827", fontSize: "1.05rem", lineHeight: 1.5 }}
              >
                {assessment.verdict}
              </p>
            </div>

            {/* Mini stat row */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-3">
              {[
                { label: "Filler words", val: `${assessment.fillerWordBreakdown.reduce((s, f) => s + f.count, 0)} detected` },
                { label: "Pace", val: assessment.subscores.pace.detail.split(" — ")[0] },
                { label: "Relevance", val: `${assessment.relevanceScore}%` },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col gap-0.5 px-3.5 py-2.5 rounded-xl"
                  style={{ backgroundColor: "#F7F7F8", border: "1px solid #E5E5E8" }}
                >
                  <p style={{ color: "#9CA3AF", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {stat.label}
                  </p>
                  <p style={{ color: "#111827", fontSize: "0.875rem", fontWeight: 600 }}>{stat.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subscores */}
      <div className="flex flex-col gap-3">
        <h2 style={{ fontWeight: 700, color: "#2A2D31", fontSize: "0.9375rem", letterSpacing: "-0.01em" }}>
          Detailed Breakdown
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {subscoreItems.map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-xl p-4 flex flex-col gap-3"
              style={{ border: `1px solid ${scoreBorder(item.score)}`, backgroundColor: scoreBg(item.score) + "18" }}
            >
              <div className="flex items-center justify-between">
                <span style={{ fontWeight: 600, color: "#111827", fontSize: "0.8125rem" }}>
                  {item.label}
                </span>
                <span
                  className="px-2 py-0.5 rounded-lg text-sm"
                  style={{ fontWeight: 800, color: scoreColor(item.score), backgroundColor: scoreBg(item.score) }}
                >
                  {item.score}
                </span>
              </div>
              <div className="w-full rounded-full overflow-hidden" style={{ height: "5px", backgroundColor: "rgba(0,0,0,0.06)" }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: `${item.score}%`, backgroundColor: scoreColor(item.score) }}
                />
              </div>
              <p style={{ color: "#6B7280", fontSize: "0.78rem", lineHeight: 1.5 }}>{item.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths & Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FeedbackPanel
          type="strengths"
          title="What you did well"
          items={assessment.strengths}
        />
        <FeedbackPanel
          type="improvements"
          title="What to improve"
          items={assessment.improvements}
        />
      </div>

      {/* Filler word breakdown */}
      <div
        className="bg-white rounded-2xl p-5 flex flex-col gap-4"
        style={{ border: "1px solid #E5E5E8" }}
      >
        <div className="flex items-center justify-between">
          <h3 style={{ fontWeight: 700, color: "#111827", fontSize: "0.875rem" }}>
            Filler Word Breakdown
          </h3>
          <span
            className="px-2.5 py-1 rounded-full text-xs"
            style={{ backgroundColor: "#FEF3C7", color: "#92400E", fontWeight: 600 }}
          >
            {assessment.fillerWordBreakdown.reduce((s, f) => s + f.count, 0)} total
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {assessment.fillerWordBreakdown.map((fw, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{ backgroundColor: "#FEF9EC", border: "1px solid #FDE68A" }}
            >
              <span style={{ fontWeight: 600, color: "#78350F", fontSize: "0.875rem" }}>
                "{fw.word}"
              </span>
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#F59E0B" }}
              >
                <span style={{ color: "white", fontSize: "0.65rem", fontWeight: 800 }}>
                  {fw.count}
                </span>
              </div>
            </div>
          ))}
        </div>
        <p style={{ color: "#6B7280", fontSize: "0.8rem", lineHeight: 1.5 }}>
          Replace filler words with short, deliberate pauses — silence reads as confidence to your audience.
        </p>
      </div>

      {/* Relevance callout */}
      <div
        className="rounded-2xl p-5 flex items-start gap-3.5"
        style={{ backgroundColor: "#EFF6FF", border: "1px solid #BFDBFE" }}
      >
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: "#3B82F6" }}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M6.5 5.5V9M6.5 3.5H6.51" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <p style={{ fontWeight: 600, color: "#1E40AF", fontSize: "0.875rem", marginBottom: "3px" }}>
            Topic relevance: {assessment.relevanceScore}%
          </p>
          <p style={{ color: "#1D4ED8", fontSize: "0.8125rem", lineHeight: 1.6 }}>
            Your speech stayed on topic — {assessment.relevanceScore}% relevance to "{assessment.topic}". This indicates strong content focus and a well-prepared structure.
          </p>
        </div>
      </div>

      {/* Transcript — collapsible */}
      <div
        className="bg-white rounded-2xl overflow-hidden"
        style={{ border: "1px solid #E5E5E8" }}
      >
        <button
          onClick={() => setTranscriptOpen(!transcriptOpen)}
          className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50/60 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span style={{ fontWeight: 600, color: "#111827", fontSize: "0.875rem" }}>
              Speech Transcript
            </span>
            <span
              className="px-2 py-0.5 rounded text-xs"
              style={{ backgroundColor: "#F0F0F2", color: "#717182", fontWeight: 500 }}
            >
              AI-generated
            </span>
          </div>
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center"
            style={{ backgroundColor: "#F0F0F2" }}
          >
            {transcriptOpen ? (
              <ChevronUp size={13} style={{ color: "#717182" }} />
            ) : (
              <ChevronDown size={13} style={{ color: "#717182" }} />
            )}
          </div>
        </button>

        {transcriptOpen && (
          <div className="px-6 pb-6">
            <div className="w-full h-px mb-4" style={{ backgroundColor: "#F3F4F6" }} />
            <p
              className="whitespace-pre-wrap"
              style={{
                color: "#374151",
                fontSize: "0.875rem",
                lineHeight: 1.85,
                fontFamily: "inherit",
              }}
            >
              {assessment.transcript}
            </p>
          </div>
        )}
      </div>

      {/* Bottom action */}
      {onBack && (
        <div className="flex justify-start pb-2">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all hover:opacity-90 active:scale-[0.97]"
            style={{ backgroundColor: "#2A2D31", color: "white", fontWeight: 500, fontSize: "0.9375rem" }}
          >
            {context === "student" ? null : <ArrowLeft size={15} />}
            {backLabel}
            {context === "student" ? <ArrowRight size={15} /> : null}
          </button>
        </div>
      )}
    </div>
  );
}

function FeedbackPanel({
  type,
  title,
  items,
}: {
  type: "strengths" | "improvements";
  title: string;
  items: string[];
}) {
  const isStrengths = type === "strengths";
  const iconBg = isStrengths ? "#DCFCE7" : "#FEF3C7";
  const dotColor = isStrengths ? "#16A34A" : "#D97706";
  const headingColor = isStrengths ? "#15803D" : "#92400E";
  const headerBg = isStrengths ? "#F0FDF4" : "#FFFBEB";
  const borderColor = isStrengths ? "#BBF7D0" : "#FDE68A";

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden flex flex-col"
      style={{ border: "1px solid #E5E5E8" }}
    >
      <div
        className="flex items-center gap-2.5 px-5 py-3.5"
        style={{ backgroundColor: headerBg, borderBottom: `1px solid ${borderColor}` }}
      >
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center"
          style={{ backgroundColor: iconBg }}
        >
          {isStrengths ? (
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M2 5.5L4.5 8L9 3.5" stroke={dotColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M5.5 3V6.5M5.5 8.5H5.51" stroke={dotColor} strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          )}
        </div>
        <h3 style={{ fontWeight: 700, color: headingColor, fontSize: "0.875rem" }}>{title}</h3>
      </div>

      <ul className="flex flex-col gap-0 flex-1">
        {items.map((s, i) => (
          <li
            key={i}
            className="flex items-start gap-3 px-5 py-3.5"
            style={{ borderBottom: i < items.length - 1 ? "1px solid #F9FAFB" : "none" }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full mt-[7px] shrink-0"
              style={{ backgroundColor: dotColor }}
            />
            <span style={{ color: "#374151", fontSize: "0.8125rem", lineHeight: 1.65 }}>{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CircularScore({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color = score >= 80 ? "#16A34A" : score >= 60 ? "#D97706" : "#DC2626";
  const trackColor = score >= 80 ? "#DCFCE7" : score >= 60 ? "#FEF9C3" : "#FEE2E2";
  const label = score >= 85 ? "Excellent" : score >= 70 ? "Good" : score >= 55 ? "Fair" : "Needs Work";
  const labelColor = score >= 80 ? "#15803D" : score >= 60 ? "#92400E" : "#991B1B";
  const labelBg = score >= 80 ? "#DCFCE7" : score >= 60 ? "#FEF3C7" : "#FEE2E2";

  return (
    <div className="flex flex-col items-center gap-3">
      <div style={{ position: "relative", width: 148, height: 148 }}>
        <svg width="148" height="148" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r={radius} fill={trackColor} stroke="#E5E5E8" strokeWidth="10" />
          <circle
            cx="70" cy="70" r={radius}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 70 70)"
          />
          <text x="70" y="64" textAnchor="middle" dominantBaseline="middle" fontSize="32" fontWeight="800" fill="#111827" fontFamily="Inter, sans-serif">
            {score}
          </text>
          <text x="70" y="86" textAnchor="middle" dominantBaseline="middle" fontSize="12" fill="#9CA3AF" fontFamily="Inter, sans-serif">
            out of 100
          </text>
        </svg>
      </div>
      <span
        className="px-3 py-1 rounded-full text-xs"
        style={{ backgroundColor: labelBg, color: labelColor, fontWeight: 700, letterSpacing: "0.03em" }}
      >
        {label}
      </span>
    </div>
  );
}
