import { useNavigate } from "react-router";
import { ArrowRight, TrendingUp, BarChart2, Mic } from "lucide-react";

export function StudentDashboard() {
  const navigate = useNavigate();

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
    </div>
  );
}
