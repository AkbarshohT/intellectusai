import { useNavigate } from "react-router";
import { ArrowRight, Clock, BarChart2, BookOpen, Plus } from "lucide-react";
import { professorAssignments } from "../../data";

export function ProfessorDashboard() {
  const navigate = useNavigate();

  const totalGraded = professorAssignments.reduce(
    (acc, a) => acc + a.submissions.filter((s) => s.status === "completed").length,
    0
  );
  const hoursSaved = Math.round(totalGraded * 0.18);

  const stats = [
    {
      icon: <BookOpen size={18} />,
      label: "Active Assignments",
      value: professorAssignments.length.toString(),
      sub: "across all courses",
      color: "#2A2D31",
      bg: "#F0F0F2",
    },
    {
      icon: <BarChart2 size={18} />,
      label: "Submissions Graded",
      value: totalGraded.toString(),
      sub: "all auto-graded by AI",
      color: "#1D4ED8",
      bg: "#EFF6FF",
    },
    {
      icon: <Clock size={18} />,
      label: "Hours Saved",
      value: `~${hoursSaved}`,
      sub: "vs. manual review",
      color: "#15803D",
      bg: "#F0FDF4",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Hero */}
      <div
        className="relative overflow-hidden bg-white rounded-2xl p-8 sm:p-10"
        style={{ border: "1px solid #E5E5E8", boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}
      >
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-[0.03] -translate-y-1/4 translate-x-1/4"
          style={{ backgroundColor: "#2A2D31" }}
        />
        <div className="relative flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="flex flex-col gap-3 max-w-lg">
            <p
              style={{
                color: "#9CA3AF",
                fontSize: "0.8rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Professor Dashboard
            </p>
            <h1
              style={{
                fontWeight: 800,
                color: "#2A2D31",
                fontSize: "clamp(1.5rem, 4vw, 2rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
              }}
            >
              Your class, auto-graded.
            </h1>
            <p style={{ color: "#6B7280", fontSize: "0.9375rem", lineHeight: 1.65 }}>
              Auto-graded first-pass feedback for your whole class. Spot-check the ones that need your attention — stop watching every video.
            </p>
          </div>
          <button
            onClick={() => navigate("/professor/new-assignment")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all hover:opacity-90 active:scale-[0.97] shrink-0"
            style={{ backgroundColor: "#2A2D31", color: "white", fontWeight: 500, fontSize: "0.9375rem" }}
          >
            <Plus size={15} />
            New Assignment
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-xl p-5 flex items-center gap-4"
            style={{ border: "1px solid #E5E5E8" }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: s.bg, color: s.color }}
            >
              {s.icon}
            </div>
            <div className="min-w-0">
              <p
                style={{ fontWeight: 800, color: "#111827", fontSize: "1.625rem", letterSpacing: "-0.03em", lineHeight: 1 }}
              >
                {s.value}
              </p>
              <p style={{ color: "#374151", fontSize: "0.8rem", fontWeight: 500, marginTop: "2px" }}>
                {s.label}
              </p>
              <p style={{ color: "#9CA3AF", fontSize: "0.75rem", marginTop: "1px" }}>{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Active assignments */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2
            style={{ fontWeight: 700, color: "#2A2D31", fontSize: "1rem", letterSpacing: "-0.01em" }}
          >
            Active assignments
          </h2>
          <button
            onClick={() => navigate("/professor/new-assignment")}
            className="flex items-center gap-1.5 text-sm transition-colors hover:text-gray-800"
            style={{ color: "#717182" }}
          >
            <Plus size={13} />
            New
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {professorAssignments.map((assignment) => {
            const completed = assignment.submissions.filter((s) => s.status === "completed").length;
            const pct = Math.round((completed / assignment.totalStudents) * 100);
            const avgScore = completed > 0
              ? Math.round(
                  assignment.submissions
                    .filter((s) => s.status === "completed" && s.assessment)
                    .reduce((s, sub) => s + (sub.assessment?.score ?? 0), 0) / completed
                )
              : null;

            return (
              <div
                key={assignment.id}
                className="bg-white rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5"
                style={{ border: "1px solid #E5E5E8" }}
              >
                <div className="flex flex-col gap-3 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="px-2.5 py-0.5 rounded text-xs"
                      style={{ backgroundColor: "#F0F0F2", color: "#717182", fontWeight: 500 }}
                    >
                      {assignment.course}
                    </span>
                    <span style={{ color: "#9CA3AF", fontSize: "0.78rem" }}>
                      Due {assignment.dueDate}
                    </span>
                  </div>
                  <p style={{ fontWeight: 700, color: "#111827", fontSize: "0.9375rem", lineHeight: 1.3 }}>
                    {assignment.title}
                  </p>

                  <div className="flex items-center gap-4 flex-wrap">
                    {/* Progress bar */}
                    <div className="flex flex-col gap-1 flex-1 min-w-0 max-w-52">
                      <div className="flex items-center justify-between">
                        <p style={{ color: "#6B7280", fontSize: "0.75rem" }}>
                          {completed}/{assignment.totalStudents} submitted
                        </p>
                        <p style={{ color: "#6B7280", fontSize: "0.75rem" }}>{pct}%</p>
                      </div>
                      <div className="w-full rounded-full" style={{ height: "5px", backgroundColor: "#F0F0F2" }}>
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${pct}%`, backgroundColor: "#2A2D31" }}
                        />
                      </div>
                    </div>

                    {/* Avg score pill */}
                    {avgScore !== null && (
                      <div
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg shrink-0"
                        style={{ backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0" }}
                      >
                        <span style={{ color: "#9CA3AF", fontSize: "0.72rem" }}>avg</span>
                        <span style={{ fontWeight: 700, color: "#15803D", fontSize: "0.875rem" }}>
                          {avgScore}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/professor/assignments/${assignment.id}`)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-colors shrink-0"
                  style={{ border: "1.5px solid #E5E5E8", color: "#374151", fontSize: "0.875rem", fontWeight: 500 }}
                >
                  Review class
                  <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
