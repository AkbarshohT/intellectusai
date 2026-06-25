import { useNavigate, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { studentAssessments } from "../../data";
import { ResultsView } from "../shared/ResultsView";

export function StudentResults() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const assessment = studentAssessments.find((a) => a.id === id) ?? studentAssessments[0];

  return (
    <div className="flex flex-col gap-5">
      <button
        onClick={() => navigate("/student/assessments")}
        className="flex items-center gap-1.5 self-start hover:opacity-70 transition-opacity"
        style={{ color: "#9CA3AF", fontSize: "0.875rem" }}
      >
        <ArrowLeft size={14} />
        Back to assessments
      </button>

      <ResultsView
        assessment={assessment}
        onBack={() => navigate("/student/assess")}
        backLabel="Analyze another video"
        context="student"
      />
    </div>
  );
}
