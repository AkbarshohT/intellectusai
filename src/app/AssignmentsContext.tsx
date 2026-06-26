import { createContext, useContext, useState, ReactNode } from "react";
import { Assignment, professorAssignments } from "./data";

export interface NewAssignmentInput {
  title: string;
  course: string;
  language: string;
  dueDate: string; // ISO date string (yyyy-mm-dd) from the date input
}

interface AssignmentsContextValue {
  assignments: Assignment[];
  addAssignment: (input: NewAssignmentInput) => Assignment;
}

const AssignmentsContext = createContext<AssignmentsContextValue | null>(null);

function formatDueDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function AssignmentsProvider({ children }: { children: ReactNode }) {
  const [assignments, setAssignments] = useState<Assignment[]>(professorAssignments);

  const addAssignment = (input: NewAssignmentInput): Assignment => {
    const created: Assignment = {
      id: `p${Date.now()}`,
      title: input.title,
      course: input.course,
      language: input.language,
      dueDate: formatDueDate(input.dueDate),
      totalStudents: 30,
      submissions: [],
    };
    setAssignments((prev) => [created, ...prev]);
    return created;
  };

  return (
    <AssignmentsContext.Provider value={{ assignments, addAssignment }}>
      {children}
    </AssignmentsContext.Provider>
  );
}

export function useAssignments(): AssignmentsContextValue {
  const ctx = useContext(AssignmentsContext);
  if (!ctx) {
    throw new Error("useAssignments must be used within an AssignmentsProvider");
  }
  return ctx;
}
