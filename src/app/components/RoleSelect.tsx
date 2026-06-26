import { useState } from "react";
import { useNavigate } from "react-router";
import { GraduationCap, BookOpen, ArrowRight } from "lucide-react";

export function RoleSelect() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<"student" | "professor" | null>(null);

  const handleSelect = (role: "student" | "professor") => {
    setSelected(role);
    setTimeout(() => {
      navigate(role === "student" ? "/student" : "/professor");
    }, 200);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ backgroundColor: "#F7F7F8" }}
    >
      <div className="w-full max-w-2xl flex flex-col items-center gap-10">
        {/* Logo + heading */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2.5">
            <svg width="28" height="28" viewBox="0 0 26 26" fill="none">
              <rect width="26" height="26" rx="7" fill="#2A2D31" />
              <path d="M13 8L18 11V17L13 20L8 17V11L13 8Z" fill="white" />
            </svg>
            <span style={{ fontWeight: 700, color: "#2A2D31", fontSize: "1rem" }}>IntellectusAI</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <h1
              style={{
                fontWeight: 800,
                color: "#2A2D31",
                fontSize: "clamp(1.5rem, 4vw, 2rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
                textAlign: "center",
              }}
            >
              How will you be using IntellectusAI?
            </h1>
            <p style={{ color: "#717182", fontSize: "0.9375rem" }}>
              Choose your role to get started.
            </p>
          </div>
        </div>

        {/* Role cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RoleCard
            icon={<GraduationCap size={26} />}
            title="I'm a Student"
            subtitle="Practice presentations and get instant AI feedback on your delivery."
            bullets={["Pace & fluency analysis", "Filler word detection", "Actionable improvement tips"]}
            selected={selected === "student"}
            onClick={() => handleSelect("student")}
          />
          <RoleCard
            icon={<BookOpen size={26} />}
            title="I'm a Professor"
            subtitle="Assign presentations and auto-grade your entire class at once."
            bullets={["Auto-grade all submissions", "Spot-check by score", "Save hours per assignment"]}
            selected={selected === "professor"}
            onClick={() => handleSelect("professor")}
          />
        </div>

        <p style={{ color: "#9CA3AF", fontSize: "0.78rem", textAlign: "center" }}>
          You can switch roles anytime from your profile settings.
        </p>
      </div>
    </div>
  );
}

function RoleCard({
  icon,
  title,
  subtitle,
  bullets,
  selected,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  bullets: string[];
  selected: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col items-start gap-5 bg-white rounded-2xl p-7 text-left transition-all"
      style={{
        border: selected
          ? "2px solid #2A2D31"
          : hovered
          ? "1.5px solid #BBBBC0"
          : "1.5px solid #E5E5E8",
        boxShadow: selected
          ? "0 0 0 4px rgba(42,45,49,0.07), 0 4px 16px rgba(0,0,0,0.08)"
          : hovered
          ? "0 4px 16px rgba(0,0,0,0.07)"
          : "0 1px 4px rgba(0,0,0,0.04)",
        transform: selected ? "scale(0.985)" : "scale(1)",
      }}
    >
      <div className="w-full flex items-start justify-between">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center transition-all"
          style={{
            backgroundColor: selected ? "#2A2D31" : "#F0F0F2",
            color: selected ? "white" : "#2A2D31",
          }}
        >
          {icon}
        </div>
        <div
          className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
          style={{
            borderColor: selected ? "#2A2D31" : "#D1D5DB",
            backgroundColor: selected ? "#2A2D31" : "transparent",
          }}
        >
          {selected && (
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
              <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <span style={{ fontWeight: 700, color: "#2A2D31", fontSize: "1.05rem" }}>{title}</span>
        <span style={{ color: "#717182", fontSize: "0.85rem", lineHeight: 1.55 }}>{subtitle}</span>
      </div>

      <ul className="flex flex-col gap-2 w-full">
        {bullets.map((b) => (
          <li key={b} className="flex items-center gap-2">
            <div
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: selected ? "#2A2D31" : "#D1D5DB" }}
            />
            <span style={{ color: "#717182", fontSize: "0.8rem" }}>{b}</span>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-1.5 mt-auto">
        <span style={{ color: selected ? "#2A2D31" : "#9CA3AF", fontSize: "0.8rem", fontWeight: 500 }}>
          Continue as {title.replace("I'm a ", "")}
        </span>
        <ArrowRight size={13} style={{ color: selected ? "#2A2D31" : "#9CA3AF" }} />
      </div>
    </button>
  );
}
