import { createBrowserRouter } from "react-router";
import { SignIn } from "./components/SignIn";
import { RoleSelect } from "./components/RoleSelect";
import { StudentLayout } from "./components/student/StudentLayout";
import { StudentDashboard } from "./components/student/StudentDashboard";
import { AssessVideo } from "./components/student/AssessVideo";
import { MyAssessments } from "./components/student/MyAssessments";
import { StudentResults } from "./components/student/StudentResults";
import { ProfessorLayout } from "./components/professor/ProfessorLayout";
import { ProfessorDashboard } from "./components/professor/ProfessorDashboard";
import { AssignmentDetail } from "./components/professor/AssignmentDetail";
import { ProfessorStudentResults } from "./components/professor/ProfessorStudentResults";
import { NewAssignment } from "./components/professor/NewAssignment";

export const router = createBrowserRouter([
  { path: "/", Component: SignIn },
  { path: "/role-select", Component: RoleSelect },
  {
    path: "/student",
    Component: StudentLayout,
    children: [
      { index: true, Component: StudentDashboard },
      { path: "assess", Component: AssessVideo },
      { path: "assessments", Component: MyAssessments },
      { path: "results/:id", Component: StudentResults },
    ],
  },
  {
    path: "/professor",
    Component: ProfessorLayout,
    children: [
      { index: true, Component: ProfessorDashboard },
      { path: "assignments/:id", Component: AssignmentDetail },
      { path: "assignments/:assignmentId/student/:studentId", Component: ProfessorStudentResults },
      { path: "new-assignment", Component: NewAssignment },
    ],
  },
]);
