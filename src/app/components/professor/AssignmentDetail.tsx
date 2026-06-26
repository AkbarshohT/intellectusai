import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Eye, Clock, AlertTriangle, TrendingDown } from "lucide-react";
import { useAssignments } from "../../AssignmentsContext";

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
      style={{ backgroundColor: "#F0F0F2", color: "#9CA3AF", fontWeight: 600, letterSpacing: "0.02em" }}
    >
      <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: "#D1D5DB" }} />
      PENDING
    </span>
  );
}

export function AssignmentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { assignments } = useAssignments();

  const assignment = assignments.find((a) => a.id === id) ?? assignments[0];
  const completed = assignment.submissions.filter((s) => s.status === "completed");
  const pending = assignment.submissions.filter((s) => s.status === "pending");

  const sortedCompleted = [...completed].sort(
    (a, b) => (b.assessment?.score ?? 0) - (a.assessment?.score ?? 0)
  );

  const avgScore = completed.length > 0
    ? Math.round(completed.reduce((s, sub) => s + (sub.assessment?.score ?? 0), 0) / completed.length)
    : null;

  const highRisk = completed.filter((s) => (s.assessment?.score ?? 100) < 65);
  const hoursSaved = Math.round(completed.length * 0.22);

  const scoreColor = (score: number) => score >= 80 ? "#16A34A" : score >= 65 ? "#D97706" : "#DC2626";
  const isLow = (score: number) => score < 65;

  return (
    <div className="flex flex-col gap-5">
      {/* Back button */}
      <button
        onClick={() => navigate("/professor")}
        className="flex items-center gap-1.5 self-start hover:opacity-70 transition-opacity"
        style={{ color: "#9CA3AF", fontSize: "0.875rem" }}
      >
        <ArrowLeft size={14} />
        Back to dashboard
      </button>

      {/* Assignment header */}
      <div
        className="bg-white rounded-2xl p-6 flex flex-col gap-3"
        style={{ border: "1px solid #E5E5E8" }}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="px-2.5 py-0.5 rounded-md text-xs"
            style={{ backgroundColor: "#F0F0F2", color: "#717182", fontWeight: 600 }}
          >
            {assignment.course}
          </span>
          <span style={{ color: "#9CA3AF", fontSize: "0.8rem" }}>Due {assignment.dueDate}</span>
        </div>
        <h1
          style={{ fontWeight: 800, color: "#111827", fontSize: "1.375rem", letterSpacing: "-0.025em" }}
        >
          {assignment.title}
        </h1>
        <p style={{ color: "#6B7280", fontSize: "0.9rem" }}>
          <strong style={{ color: "#374151" }}>{completed.length}</strong> of{" "}
          <strong style={{ color: "#374151" }}>{assignment.totalStudents}</strong> students submitted —
          all auto-graded by AI.
        </p>

        {/* Summary stats row */}
        <div className="flex flex-wrap gap-3 mt-1">
          {[
            { label: "Graded", val: completed.length.toString(), color: "#15803D", bg: "#F0FDF4", border: "#BBF7D0" },
            { label: "Pending", val: pending.length.toString(), color: "#9CA3AF", bg: "#F9FAFB", border: "#E5E5E8" },
            ...(avgScore !== null ? [{ label: "Class avg", val: avgScore.toString(), color: "#1D4ED8", bg: "#EFF6FF", border: "#BFDBFE" }] : []),
            ...(highRisk.length > 0 ? [{ label: "Need attention", val: highRisk.length.toString(), color: "#C2410C", bg: "#FFF7ED", border: "#FED7AA" }] : []),
          ].map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{ backgroundColor: s.bg, border: `1px solid ${s.border}` }}
            >
              <span style={{ fontWeight: 800, color: s.color, fontSize: "1rem" }}>{s.val}</span>
              <span style={{ color: s.color, fontSize: "0.75rem", fontWeight: 500, opacity: 0.8 }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Time saved callout — prominent */}
      <div
        className="rounded-2xl p-5 flex items-start sm:items-center gap-4"
        style={{ backgroundColor: "#F0FDF4", border: "1.5px solid #86EFAC" }}
      >
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: "#16A34A" }}
        >
          <Clock size={20} style={{ color: "white" }} />
        </div>
        <div className="flex-1">
          <p style={{ fontWeight: 700, color: "#14532D", fontSize: "1rem", letterSpacing: "-0.01em" }}>
            You've saved ~{hoursSaved} hours of manual grading on this assignment.
          </p>
          <p style={{ color: "#16A34A", fontSize: "0.8125rem", marginTop: "3px", lineHeight: 1.5 }}>
            Each of the {completed.length} submissions has been fully scored and broken down. Spot-check the highlighted rows instead of watching every video.
          </p>
        </div>
      </div>

      {/* At-risk callout */}
      {highRisk.length > 0 && (
        <div
          className="rounded-xl px-4 py-3.5 flex items-center gap-3"
          style={{ backgroundColor: "#FFF7ED", border: "1px solid #FED7AA" }}
        >
          <AlertTriangle size={15} style={{ color: "#F97316", flexShrink: 0 }} />
          <div className="flex-1">
            <p style={{ color: "#9A3412", fontSize: "0.8125rem", fontWeight: 600 }}>
              {highRisk.length} student{highRisk.length > 1 ? "s" : ""} scored below 65 —
              {" "}{highRisk.map((s) => s.studentName.split(" ")[0]).join(", ")}
            </p>
            <p style={{ color: "#C2410C", fontSize: "0.78rem", marginTop: "1px" }}>
              Rows are highlighted in amber. Click View to see their full feedback.
            </p>
          </div>
        </div>
      )}

      {/* Class table */}
      <div
        className="bg-white rounded-2xl overflow-hidden"
        style={{ border: "1px solid #E5E5E8", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
      >
        {/* Desktop column headers */}
        <div
          className="hidden sm:grid px-6 py-3"
          style={{
            gridTemplateColumns: "1fr 180px 90px 130px 80px",
            borderBottom: "1px solid #E5E5E8",
            backgroundColor: "#FAFAFA",
          }}
        >
          {["Student", "Submitted At", "Score", "Status", ""].map((col) => (
            <span
              key={col}
              style={{
                color: "#9CA3AF",
                fontSize: "0.7rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.07em",
              }}
            >
              {col}
            </span>
          ))}
        </div>

        {/* Completed rows */}
        {sortedCompleted.map((sub, i) => {
          const score = sub.assessment?.score ?? 0;
          const low = isLow(score);
          return (
            <div
              key={sub.studentId}
              style={{
                borderBottom: i < sortedCompleted.length - 1 || pending.length > 0 ? "1px solid #F3F4F6" : "none",
                backgroundColor: low ? "#FFFBF5" : undefined,
              }}
            >
              {/* Mobile */}
              <div
                className="sm:hidden flex items-center justify-between gap-3 px-5 py-4 cursor-pointer hover:bg-orange-50/30 transition-colors"
                onClick={() => navigate(`/professor/assignments/${assignment.id}/student/${sub.studentId}`)}
                style={{ backgroundColor: low ? "#FFFBF5" : undefined }}
              >
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {low && <TrendingDown size={12} style={{ color: "#F97316", flexShrink: 0 }} />}
                    <p style={{ fontWeight: 600, color: "#111827", fontSize: "0.875rem" }} className="truncate">
                      {sub.studentName}
                    </p>
                  </div>
                  <p style={{ color: "#9CA3AF", fontSize: "0.75rem" }}>{sub.submittedAt}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className="px-2 py-1 rounded-lg"
                    style={{ fontWeight: 800, color: scoreColor(score), fontSize: "1rem", backgroundColor: low ? "#FFF7ED" : "#F9FAFB" }}
                  >
                    {score}
                  </span>
                  <button
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                    style={{ border: "1.5px solid #E5E5E8", color: "#374151", fontSize: "0.75rem", fontWeight: 500 }}
                  >
                    <Eye size={11} />
                    View
                  </button>
                </div>
              </div>

              {/* Desktop */}
              <div
                className="hidden sm:grid px-6 py-3.5 items-center hover:bg-gray-50/40 transition-colors cursor-pointer group"
                style={{ gridTemplateColumns: "1fr 180px 90px 130px 80px" }}
                onClick={() => navigate(`/professor/assignments/${assignment.id}/student/${sub.studentId}`)}
              >
                <div className="flex items-center gap-2">
                  {low && (
                    <TrendingDown size={13} style={{ color: "#F97316", flexShrink: 0 }} />
                  )}
                  <p style={{ fontWeight: 600, color: "#111827", fontSize: "0.875rem" }}>
                    {sub.studentName}
                  </p>
                </div>
                <p style={{ color: "#6B7280", fontSize: "0.8rem" }}>{sub.submittedAt}</p>
                <div className="flex items-center gap-1">
                  <span
                    style={{ fontWeight: 800, color: scoreColor(score), fontSize: "1.05rem" }}
                  >
                    {score}
                  </span>
                  <span style={{ color: "#D1D5DB", fontSize: "0.75rem" }}>/100</span>
                </div>
                <StatusPill status="completed" />
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                  style={{ border: "1.5px solid #E5E5E8", color: "#374151", fontSize: "0.8rem", fontWeight: 500, width: "fit-content" }}
                >
                  <Eye size={13} />
                  View
                </button>
              </div>
            </div>
          );
        })}

        {/* Pending rows */}
        {pending.map((sub, i) => (
          <div
            key={sub.studentId}
            style={{ borderBottom: i < pending.length - 1 ? "1px solid #F3F4F6" : "none" }}
          >
            {/* Mobile */}
            <div className="sm:hidden flex items-center justify-between gap-3 px-5 py-4">
              <div className="flex flex-col gap-1">
                <p style={{ fontWeight: 600, color: "#9CA3AF", fontSize: "0.875rem" }}>{sub.studentName}</p>
                <p style={{ color: "#D1D5DB", fontSize: "0.75rem" }}>Not yet submitted</p>
              </div>
              <StatusPill status="pending" />
            </div>
            {/* Desktop */}
            <div
              className="hidden sm:grid px-6 py-3.5 items-center"
              style={{ gridTemplateColumns: "1fr 180px 90px 130px 80px" }}
            >
              <p style={{ fontWeight: 600, color: "#9CA3AF", fontSize: "0.875rem" }}>{sub.studentName}</p>
              <p style={{ color: "#D1D5DB", fontSize: "0.8rem" }}>Not submitted</p>
              <p style={{ color: "#D1D5DB", fontSize: "0.8rem" }}>—</p>
              <StatusPill status="pending" />
              <span />
            </div>
          </div>
        ))}

        {/* Footer */}
        <div
          className="px-6 py-3 flex flex-wrap items-center justify-between gap-2"
          style={{ borderTop: "1px solid #E5E5E8", backgroundColor: "#FAFAFA" }}
        >
          <p style={{ color: "#9CA3AF", fontSize: "0.78rem" }}>
            {assignment.submissions.length} students enrolled
          </p>
          <div className="flex items-center gap-4">
            <span style={{ color: "#9CA3AF", fontSize: "0.78rem" }}>
              {completed.length} graded · {pending.length} pending
            </span>
            {avgScore !== null && (
              <span style={{ color: "#9CA3AF", fontSize: "0.78rem" }}>
                Class avg:{" "}
                <strong style={{ color: "#374151" }}>{avgScore}/100</strong>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
