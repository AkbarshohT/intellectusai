import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useAssignments } from "../../AssignmentsContext";

export function NewAssignment() {
  const navigate = useNavigate();
  const { addAssignment } = useAssignments();
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [language, setLanguage] = useState("Uzbek");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [creating, setCreating] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    addAssignment({ title, course, language, dueDate });
    setTimeout(() => {
      setDone(true);
      setTimeout(() => navigate("/professor/assignments"), 900);
    }, 1000);
  };

  const inputCls: React.CSSProperties = {
    border: "1.5px solid #E5E5E8",
    fontSize: "0.875rem",
    color: "#111827",
    backgroundColor: "white",
    borderRadius: "0.75rem",
    padding: "10px 14px",
    width: "100%",
    outline: "none",
    transition: "border-color 0.15s",
  };

  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "#2A2D31";
  };
  const blur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "#E5E5E8";
  };

  if (done) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div
          className="bg-white rounded-2xl p-10 flex flex-col items-center gap-4 w-full max-w-sm text-center"
          style={{ border: "1px solid #E5E5E8" }}
        >
          <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: "#DCFCE7" }}>
            <CheckCircle2 size={30} style={{ color: "#16A34A" }} />
          </div>
          <div>
            <h2 style={{ fontWeight: 700, color: "#111827", fontSize: "1.125rem" }}>Assignment created!</h2>
            <p style={{ color: "#6B7280", fontSize: "0.875rem", marginTop: "4px" }}>
              Redirecting to your assignments…
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <button
        onClick={() => navigate("/professor")}
        className="flex items-center gap-1.5 self-start hover:opacity-70 transition-opacity"
        style={{ color: "#9CA3AF", fontSize: "0.875rem" }}
      >
        <ArrowLeft size={14} />
        Back to dashboard
      </button>

      <div>
        <h1
          style={{ fontWeight: 800, color: "#111827", fontSize: "1.5rem", letterSpacing: "-0.025em" }}
        >
          New Assignment
        </h1>
        <p style={{ color: "#6B7280", fontSize: "0.9rem", marginTop: "4px" }}>
          Students will receive a submission link and all responses will be auto-graded.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-6 flex flex-col gap-5"
        style={{ border: "1px solid #E5E5E8" }}
      >
        {/* Assignment title */}
        <div className="flex flex-col gap-1.5">
          <label style={{ fontWeight: 600, color: "#374151", fontSize: "0.8125rem" }}>
            Assignment Title
          </label>
          <input
            type="text"
            placeholder="e.g. Presentation: Climate Change Solutions"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={inputCls}
            onFocus={focus}
            onBlur={blur}
          />
        </div>

        {/* Course */}
        <div className="flex flex-col gap-1.5">
          <label style={{ fontWeight: 600, color: "#374151", fontSize: "0.8125rem" }}>
            Course
          </label>
          <input
            type="text"
            placeholder="e.g. Public Speaking 101"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
            style={inputCls}
            onFocus={focus}
            onBlur={blur}
          />
        </div>

        {/* Language + due date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label style={{ fontWeight: 600, color: "#374151", fontSize: "0.8125rem" }}>
              Language
            </label>
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={{ ...inputCls, appearance: "none" as const, paddingRight: "36px" }}
                onFocus={focus}
                onBlur={blur}
              >
                <option>Uzbek</option>
                <option>Russian</option>
                <option>English</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 4.5L6 8L9.5 4.5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label style={{ fontWeight: 600, color: "#374151", fontSize: "0.8125rem" }}>
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              style={inputCls}
              onFocus={focus}
              onBlur={blur}
            />
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label style={{ fontWeight: 600, color: "#374151", fontSize: "0.8125rem" }}>
            Description{" "}
            <span style={{ color: "#9CA3AF", fontWeight: 400 }}>(optional)</span>
          </label>
          <textarea
            placeholder="Instructions or context for students — topic guidelines, length requirements, grading criteria…"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            style={{
              ...inputCls,
              resize: "vertical" as const,
              minHeight: "96px",
              lineHeight: "1.6",
            }}
            onFocus={focus}
            onBlur={blur}
          />
        </div>

        {/* Info note */}
        <div
          className="rounded-xl p-4 flex items-start gap-3"
          style={{ backgroundColor: "#F7F7F8", border: "1px solid #EBEBED" }}
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ marginTop: "1px", flexShrink: 0 }}>
            <circle cx="7.5" cy="7.5" r="6.5" stroke="#9CA3AF" strokeWidth="1.2" />
            <path d="M7.5 7V11M7.5 5H7.51" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <p style={{ color: "#6B7280", fontSize: "0.8rem", lineHeight: 1.6 }}>
            Once created, a submission link is shared with students. All videos are automatically analyzed and graded — you'll see a ranked class overview as submissions come in.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-1">
          <button
            type="submit"
            disabled={creating}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all hover:opacity-90 active:scale-[0.97] disabled:opacity-70"
            style={{ backgroundColor: "#2A2D31", color: "white", fontWeight: 500, fontSize: "0.9375rem" }}
          >
            {creating ? (
              <>
                <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="5.5" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
                  <path d="M7 1.5a5.5 5.5 0 0 1 5.5 5.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Creating…
              </>
            ) : (
              "Create Assignment"
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate("/professor")}
            className="px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
            style={{ border: "1.5px solid #E5E5E8", color: "#374151", fontWeight: 500, fontSize: "0.9375rem" }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
