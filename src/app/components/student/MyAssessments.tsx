import { useNavigate } from "react-router";
import { Eye, FileVideo } from "lucide-react";
import { studentAssessments } from "../../data";

function StatusPill({ status }: { status: "completed" | "pending" }) {
  if (status === "completed") {
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs"
        style={{ backgroundColor: "#DCFCE7", color: "#15803D", fontWeight: 600, letterSpacing: "0.02em" }}
      >
        <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: "#16A34A" }} />
        COMPLETED
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs"
      style={{ backgroundColor: "#FEF3C7", color: "#92400E", fontWeight: 600, letterSpacing: "0.02em" }}
    >
      <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: "#D97706" }} />
      PENDING
    </span>
  );
}

export function MyAssessments() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1
            style={{
              fontWeight: 800,
              color: "#2A2D31",
              fontSize: "1.5rem",
              letterSpacing: "-0.025em",
            }}
          >
            My Assessments
          </h1>
          <p style={{ color: "#6B7280", fontSize: "0.9rem", marginTop: "4px" }}>
            Your full submission history and AI feedback results.
          </p>
        </div>
        <button
          onClick={() => navigate("/student/assess")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all hover:opacity-90 active:scale-[0.97] shrink-0"
          style={{ backgroundColor: "#2A2D31", color: "white", fontWeight: 500, fontSize: "0.875rem" }}
        >
          <FileVideo size={14} />
          New Assessment
        </button>
      </div>

      {/* Summary chips */}
      <div className="flex flex-wrap gap-2">
        {[
          { label: `${studentAssessments.length} total`, bg: "#F0F0F2", color: "#374151" },
          {
            label: `${studentAssessments.filter((a) => a.status === "completed").length} completed`,
            bg: "#DCFCE7",
            color: "#15803D",
          },
          {
            label: `Avg. score: ${Math.round(studentAssessments.filter((a) => a.status === "completed").reduce((s, a) => s + a.score, 0) / studentAssessments.filter((a) => a.status === "completed").length)}`,
            bg: "#EFF6FF",
            color: "#1D4ED8",
          },
        ].map((chip) => (
          <span
            key={chip.label}
            className="px-3 py-1 rounded-full text-xs"
            style={{ backgroundColor: chip.bg, color: chip.color, fontWeight: 600 }}
          >
            {chip.label}
          </span>
        ))}
      </div>

      {/* Table card */}
      <div
        className="bg-white rounded-2xl overflow-hidden"
        style={{ border: "1px solid #E5E5E8", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
      >
        {/* Desktop header */}
        <div
          className="hidden sm:grid px-6 py-3"
          style={{
            gridTemplateColumns: "190px 1fr 90px 120px 80px",
            borderBottom: "1px solid #E5E5E8",
            backgroundColor: "#FAFAFA",
          }}
        >
          {["Submitted At", "Title", "Language", "Status", ""].map((col) => (
            <span
              key={col}
              style={{
                color: "#9CA3AF",
                fontSize: "0.72rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {col}
            </span>
          ))}
        </div>

        {/* Rows */}
        {studentAssessments.map((a, i) => (
          <div
            key={a.id}
            style={{ borderBottom: i < studentAssessments.length - 1 ? "1px solid #F3F4F6" : "none" }}
          >
            {/* Mobile */}
            <div
              className="sm:hidden flex items-start justify-between gap-3 px-5 py-4 hover:bg-gray-50/60 transition-colors cursor-pointer"
              onClick={() => a.status === "completed" && navigate(`/student/results/${a.id}`)}
            >
              <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                <p style={{ fontWeight: 600, color: "#111827", fontSize: "0.875rem" }} className="truncate">
                  {a.topic}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span style={{ color: "#9CA3AF", fontSize: "0.75rem" }}>{a.language}</span>
                  <span style={{ color: "#D1D5DB", fontSize: "0.75rem" }}>·</span>
                  <span style={{ color: "#9CA3AF", fontSize: "0.75rem" }}>{a.submittedAt}</span>
                </div>
                <StatusPill status={a.status} />
              </div>
              {a.status === "completed" && (
                <button
                  onClick={(e) => { e.stopPropagation(); navigate(`/student/results/${a.id}`); }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg shrink-0 hover:bg-gray-100 transition-colors"
                  style={{ border: "1.5px solid #E5E5E8", color: "#374151", fontSize: "0.8rem", fontWeight: 500 }}
                >
                  <Eye size={12} />
                  View
                </button>
              )}
            </div>

            {/* Desktop */}
            <div
              className="hidden sm:grid px-6 py-4 items-center hover:bg-gray-50/40 transition-colors cursor-pointer"
              style={{ gridTemplateColumns: "190px 1fr 90px 120px 80px" }}
              onClick={() => a.status === "completed" && navigate(`/student/results/${a.id}`)}
            >
              <p style={{ color: "#6B7280", fontSize: "0.8rem" }}>{a.submittedAt}</p>
              <p
                className="truncate pr-6"
                style={{ fontWeight: 600, color: "#111827", fontSize: "0.875rem" }}
              >
                {a.topic}
              </p>
              <p style={{ color: "#6B7280", fontSize: "0.875rem" }}>{a.language}</p>
              <StatusPill status={a.status} />
              {a.status === "completed" ? (
                <button
                  onClick={(e) => { e.stopPropagation(); navigate(`/student/results/${a.id}`); }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                  style={{ border: "1.5px solid #E5E5E8", color: "#374151", fontSize: "0.8rem", fontWeight: 500, width: "fit-content" }}
                >
                  <Eye size={13} />
                  View
                </button>
              ) : (
                <span />
              )}
            </div>
          </div>
        ))}

        {/* Footer */}
        <div
          className="px-6 py-3 flex items-center justify-between"
          style={{ borderTop: "1px solid #E5E5E8", backgroundColor: "#FAFAFA" }}
        >
          <p style={{ color: "#9CA3AF", fontSize: "0.78rem" }}>
            {studentAssessments.length} submissions total
          </p>
          <p style={{ color: "#9CA3AF", fontSize: "0.78rem" }}>
            All times in UTC+5
          </p>
        </div>
      </div>
    </div>
  );
}
