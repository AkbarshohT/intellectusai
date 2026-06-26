import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AssignmentsProvider } from "./AssignmentsContext";

export default function App() {
  return (
    <AssignmentsProvider>
      <RouterProvider router={router} />
    </AssignmentsProvider>
  );
}
