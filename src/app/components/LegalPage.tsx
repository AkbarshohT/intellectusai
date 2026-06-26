import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

function LegalPage({ title, body }: { title: string; body: string }) {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ backgroundColor: "#F7F7F8", fontFamily: "Inter, sans-serif" }}
    >
      <div className="w-full max-w-md flex flex-col gap-5">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 self-start hover:opacity-70 transition-opacity"
          style={{ color: "#9CA3AF", fontSize: "0.875rem" }}
        >
          <ArrowLeft size={14} />
          Back
        </button>
        <h1
          style={{
            fontWeight: 800,
            color: "#2A2D31",
            fontSize: "1.75rem",
            letterSpacing: "-0.03em",
            lineHeight: 1.2,
          }}
        >
          {title}
        </h1>
        <p style={{ color: "#6B7280", fontSize: "0.9375rem", lineHeight: 1.65 }}>
          {body}
        </p>
      </div>
    </div>
  );
}

export function TermsOfService() {
  return (
    <LegalPage
      title="Terms of Service"
      body="This is a placeholder Terms of Service page for the IntellectusAI MVP. Full terms will be published here soon."
    />
  );
}

export function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      body="This is a placeholder Privacy Policy page for the IntellectusAI MVP. Full policy details will be published here soon."
    />
  );
}
