import { useNavigate } from "react-router";
import { Plus, Eye } from "lucide-react";
import { useAssignments } from "../../AssignmentsContext";

const GRID_COLUMNS = "1fr 200px 110px 120px 110px 96px";

export function Assignments() {
  const navigate = useNavigate();
  const { assignments } = useAssignments();

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1
            style={{ fontWeight: 800, color: "#111827", fontSize: "1.5rem", letterSpacing: "-0.025em" }}
          >
            Assignments
          </h1>
          <p style={{ color: "#6B7280", fontSize: "0.9rem", marginTop: "4px" }}>
            All assignments across your courses, with submissions auto-graded as they come in.
          </p>
        </div>
        <button
          onClick={() => navigate("/professor/new-assignment")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all hover:opacity-90 active:scale-[0.97] shrink-0 self-start sm:self-auto"
          style={{ backgroundColor: "#2A2D31", color: "white", fontWeight: 500, fontSize: "0.9375rem" }}
        >
          <Plus size={15} />
          New Assignment
        </button>
      </div>

      {/* Table */}
      <div
        className="bg-white rounded-2xl overflow-hidden"
        style={{ border: "1px solid #E5E5E8", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
      >
        {/* Desktop column headers */}
        <div
          className="hidden sm:grid px-6 py-3"
          style={{
            gridTemplateColumns: GRID_COLUMNS,
            borderBottom: "1px solid #E5E5E8",
            backgroundColor: "#FAFAFA",
          }}
        >
          {["Title", "Course", "Language", "Due Date", "Submissions", ""].map((col) => (
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

        {assignments.map((assignment, i) => {
          const submitted = assignment.submissions.filter((s) => s.status === "completed").length;
          const last = i === assignments.length - 1;
          return (
            <div
              key={assignment.id}
              style={{ borderBottom: last ? "none" : "1px solid #F3F4F6" }}
            >
              {/* Mobile */}
              <div
                className="sm:hidden flex items-center justify-between gap-3 px-5 py-4 cursor-pointer hover:bg-gray-50/40 transition-colors"
                onClick={() => navigate(`/professor/assignments/${assignment.id}`)}
              >
                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                  <p style={{ fontWeight: 600, color: "#111827", fontSize: "0.875rem" }} className="truncate">
                    {assignment.title}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="px-2 py-0.5 rounded text-xs"
                      style={{ backgroundColor: "#F0F0F2", color: "#717182", fontWeight: 500 }}
                    >
                      {assignment.course}
                    </span>
                    <span style={{ color: "#9CA3AF", fontSize: "0.75rem" }}>
                      {assignment.language} · Due {assignment.dueDate}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className="px-2 py-1 rounded-lg"
                    style={{ fontWeight: 700, color: "#374151", fontSize: "0.8125rem", backgroundColor: "#F9FAFB" }}
                  >
                    {submitted} / {assignment.totalStudents}
                  </span>
                  <button
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                    style={{ border: "1.5px solid #E5E5E8", color: "#374151", fontSize: "0.75rem", fontWeight: 500 }}
                  >
                    <Eye size={11} />
                    Review
                  </button>
                </div>
              </div>

              {/* Desktop */}
              <div
                className="hidden sm:grid px-6 py-3.5 items-center hover:bg-gray-50/40 transition-colors cursor-pointer"
                style={{ gridTemplateColumns: GRID_COLUMNS }}
                onClick={() => navigate(`/professor/assignments/${assignment.id}`)}
              >
                <p style={{ fontWeight: 600, color: "#111827", fontSize: "0.875rem" }} className="truncate pr-4">
                  {assignment.title}
                </p>
                <span
                  className="px-2.5 py-0.5 rounded text-xs w-fit"
                  style={{ backgroundColor: "#F0F0F2", color: "#717182", fontWeight: 500 }}
                >
                  {assignment.course}
                </span>
                <p style={{ color: "#6B7280", fontSize: "0.8rem" }}>{assignment.language}</p>
                <p style={{ color: "#6B7280", fontSize: "0.8rem" }}>{assignment.dueDate}</p>
                <p style={{ color: "#374151", fontSize: "0.875rem", fontWeight: 600 }}>
                  {submitted}{" "}
                  <span style={{ color: "#9CA3AF", fontWeight: 400 }}>/ {assignment.totalStudents}</span>
                </p>
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                  style={{ border: "1.5px solid #E5E5E8", color: "#374151", fontSize: "0.8rem", fontWeight: 500, width: "fit-content" }}
                >
                  <Eye size={13} />
                  Review
                </button>
              </div>
            </div>
          );
        })}

        {/* Footer */}
        <div
          className="px-6 py-3 flex items-center justify-between"
          style={{ borderTop: "1px solid #E5E5E8", backgroundColor: "#FAFAFA" }}
        >
          <p style={{ color: "#9CA3AF", fontSize: "0.78rem" }}>
            {assignments.length} assignment{assignments.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>
    </div>
  );
}
