import { useNavigate } from "react-router";
import { ArrowRight, TrendingUp, BarChart2, Mic } from "lucide-react";
import { studentAssessments } from "../../data";

export function StudentDashboard() {
  const navigate = useNavigate();
  const recent = studentAssessments.slice(0, 2);

  const scoreColor = (score: number) => {
    if (score >= 80) return "#16A34A";
    if (score >= 60) return "#D97706";
    return "#DC2626";
  };

  const scoreBg = (score: number) => {
    if (score >= 80) return "#DCFCE7";
    if (score >= 60) return "#FEF3C7";
    return "#FEE2E2";
  };

  const ringOffset = (score: number) => {
    const r = 14;
    const c = 2 * Math.PI * r;
    return c - (score / 100) * c;
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Hero */}
      <div
        className="relative overflow-hidden bg-white rounded-2xl p-8 sm:p-10"
        style={{ border: "1px solid #E5E5E8", boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}
      >
        {/* Subtle decorative shape */}
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-[0.035] -translate-y-1/4 translate-x-1/4"
          style={{ backgroundColor: "#2A2D31" }}
        />
        <div className="relative flex flex-col gap-5 max-w-lg">
          <div className="flex flex-col gap-2">
            <p
              style={{
                color: "#9CA3AF",
                fontSize: "0.8rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Welcome back
            </p>
            <h1
              style={{
                fontWeight: 800,
                color: "#2A2D31",
                fontSize: "clamp(1.6rem, 4vw, 2.25rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
              }}
            >
              Ready to practice your next speech?
            </h1>
          </div>
          <p style={{ color: "#6B7280", fontSize: "0.9375rem", lineHeight: 1.65 }}>
            Record or upload a presentation and get clear, actionable feedback on your delivery.
          </p>
          <div className="flex flex-wrap gap-3 mt-1">
            <button
              onClick={() => navigate("/student/assess")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all hover:opacity-90 active:scale-[0.97]"
              style={{ backgroundColor: "#2A2D31", color: "white", fontWeight: 500, fontSize: "0.9375rem" }}
            >
              Assess a Video
              <ArrowRight size={15} />
            </button>
            <button
              onClick={() => navigate("/student/assessments")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all hover:bg-gray-50 active:scale-[0.97]"
              style={{ border: "1.5px solid #E5E5E8", color: "#374151", fontWeight: 500, fontSize: "0.9375rem" }}
            >
              View all assessments
            </button>
          </div>
        </div>
      </div>

      {/* What AI evaluates */}
      <div className="flex flex-col gap-3">
        <h2 style={{ fontWeight: 700, color: "#2A2D31", fontSize: "1rem", letterSpacing: "-0.01em" }}>
          What our AI evaluates
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { icon: <BarChart2 size={16} />, label: "Pace & Fluency", desc: "Words per minute, rhythm" },
            { icon: <Mic size={16} />, label: "Filler Words", desc: "Uh, um, like, you know" },
            { icon: "🎯", label: "Pronunciation", desc: "Clarity and accuracy" },
            { icon: "⏸", label: "Pauses", desc: "Strategic use of silence" },
            { icon: "🏗", label: "Structure", desc: "Intro, body, conclusion" },
            { icon: <TrendingUp size={16} />, label: "Vocal Energy", desc: "Variation and engagement" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-xl p-4 flex flex-col gap-2"
              style={{ border: "1px solid #E5E5E8" }}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#F7F7F8", color: "#2A2D31", fontSize: "1rem" }}
              >
                {typeof item.icon === "string" ? item.icon : item.icon}
              </div>
              <div>
                <p style={{ fontWeight: 600, color: "#2A2D31", fontSize: "0.8125rem" }}>
                  {item.label}
                </p>
                <p style={{ color: "#9CA3AF", fontSize: "0.75rem", marginTop: "1px" }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent feedback */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 style={{ fontWeight: 700, color: "#2A2D31", fontSize: "1rem", letterSpacing: "-0.01em" }}>
            Recent feedback
          </h2>
          <button
            onClick={() => navigate("/student/assessments")}
            className="flex items-center gap-1 text-sm transition-colors hover:text-gray-800"
            style={{ color: "#717182" }}
          >
            View all
            <ArrowRight size={13} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {recent.map((a) => (
            <div
              key={a.id}
              className="bg-white rounded-xl p-5 cursor-pointer transition-all hover:shadow-md active:scale-[0.98]"
              style={{ border: "1px solid #E5E5E8", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
              onClick={() => navigate(`/student/results/${a.id}`)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                  <p
                    className="truncate"
                    style={{ fontWeight: 600, color: "#2A2D31", fontSize: "0.9rem" }}
                  >
                    {a.topic}
                  </p>
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2 py-0.5 rounded text-xs"
                      style={{ backgroundColor: "#F0F0F2", color: "#717182", fontWeight: 500 }}
                    >
                      {a.language}
                    </span>
                    <span style={{ color: "#9CA3AF", fontSize: "0.75rem" }}>{a.submittedAt}</span>
                  </div>
                </div>

                {/* Mini circular score */}
                <div className="shrink-0 flex flex-col items-center gap-0.5">
                  <svg width="36" height="36" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="14" fill={scoreBg(a.score)} stroke="#E5E5E8" strokeWidth="3" />
                    <circle
                      cx="18" cy="18" r="14"
                      fill="none"
                      stroke={scoreColor(a.score)}
                      strokeWidth="3"
                      strokeDasharray={2 * Math.PI * 14}
                      strokeDashoffset={ringOffset(a.score)}
                      strokeLinecap="round"
                      transform="rotate(-90 18 18)"
                    />
                    <text x="18" y="22" textAnchor="middle" fontSize="9" fontWeight="800" fill="#2A2D31" fontFamily="Inter, sans-serif">
                      {a.score}
                    </text>
                  </svg>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3" style={{ color: "#2A2D31" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 500 }}>View feedback</span>
                <ArrowRight size={12} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
