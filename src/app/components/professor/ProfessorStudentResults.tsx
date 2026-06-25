import { useNavigate, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { professorAssignments, sampleAssessment } from "../../data";
import { ResultsView } from "../shared/ResultsView";

export function ProfessorStudentResults() {
  const { assignmentId, studentId } = useParams<{
    assignmentId: string;
    studentId: string;
  }>();
  const navigate = useNavigate();

  const assignment = professorAssignments.find((a) => a.id === assignmentId) ?? professorAssignments[0];
  const submission = assignment.submissions.find((s) => s.studentId === studentId);
  const assessment = submission?.assessment ?? sampleAssessment;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button
          onClick={() => navigate(`/professor/assignments/${assignmentId}`)}
          className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"
          style={{ color: "#9CA3AF", fontSize: "0.875rem" }}
        >
          <ArrowLeft size={14} />
          Back to class
        </button>

        {submission && (
          <div
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl"
            style={{ backgroundColor: "#F7F7F8", border: "1px solid #E5E5E8" }}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#2A2D31" }}
            >
              <span style={{ color: "white", fontSize: "0.7rem", fontWeight: 700 }}>
                {submission.studentName.charAt(0)}
              </span>
            </div>
            <div>
              <p style={{ fontWeight: 600, color: "#111827", fontSize: "0.8125rem" }}>
                {submission.studentName}
              </p>
              {submission.assessment && (
                <p style={{ color: "#9CA3AF", fontSize: "0.72rem" }}>
                  Score: {submission.assessment.score}/100
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <ResultsView
        assessment={assessment}
        onBack={() => navigate(`/professor/assignments/${assignmentId}`)}
        backLabel="Back to class view"
        context="professor"
      />
    </div>
  );
}
