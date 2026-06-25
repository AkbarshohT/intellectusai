import { useNavigate } from "react-router";

export function SignIn() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: "#F7F7F8", fontFamily: "Inter, sans-serif" }}
    >
      {/* Left decorative panel — hidden on mobile */}
      <div
        className="hidden lg:flex flex-col justify-between w-[420px] shrink-0 p-10"
        style={{ backgroundColor: "#2A2D31" }}
      >
        <div className="flex items-center gap-2.5">
          <LogoMark color="white" />
          <span style={{ color: "white", fontWeight: 700, fontSize: "1rem", letterSpacing: "-0.01em" }}>
            IntellectualAI
          </span>
        </div>

        <div className="flex flex-col gap-6">
          <blockquote style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.1rem", lineHeight: 1.7, fontWeight: 400 }}>
            "I used to spend 4 hours watching every student video. Now I spot-check the ones that need attention in 20 minutes."
          </blockquote>
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
            >
              <span style={{ color: "white", fontWeight: 700, fontSize: "0.875rem" }}>DM</span>
            </div>
            <div>
              <p style={{ color: "white", fontWeight: 500, fontSize: "0.875rem" }}>Dr. Mirzo Davlatov</p>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.8rem" }}>
                Communications Dept., TATU
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {[
            { n: "12k+", label: "Speeches analyzed" },
            { n: "~4 hrs", label: "Saved per assignment" },
            { n: "3 langs", label: "Uzbek · Russian · English" },
          ].map((s) => (
            <div key={s.n} className="flex items-center gap-3">
              <span style={{ color: "white", fontWeight: 700, fontSize: "1rem", minWidth: "56px" }}>
                {s.n}
              </span>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: sign-in */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm flex flex-col gap-8">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2.5">
            <LogoMark color="#2A2D31" />
            <span style={{ color: "#2A2D31", fontWeight: 700, fontSize: "1rem" }}>
              IntellectualAI
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <h1
              style={{
                fontWeight: 800,
                color: "#2A2D31",
                fontSize: "1.75rem",
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
              }}
            >
              Assess your speech.<br />
              <span style={{ color: "#717182", fontWeight: 500, fontSize: "1.1rem" }}>
                Save everyone's time.
              </span>
            </h1>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigate("/role-select")}
              className="w-full flex items-center justify-center gap-3 bg-white rounded-xl px-5 py-3.5 transition-all hover:shadow-md active:scale-[0.98]"
              style={{
                border: "1.5px solid #E5E5E8",
                color: "#2A2D31",
                fontWeight: 500,
                fontSize: "0.9375rem",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}
            >
              <GoogleIcon />
              Continue with Google
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ backgroundColor: "#E5E5E8" }} />
              <span style={{ color: "#9CA3AF", fontSize: "0.75rem" }}>or</span>
              <div className="flex-1 h-px" style={{ backgroundColor: "#E5E5E8" }} />
            </div>

            <button
              onClick={() => navigate("/role-select")}
              className="w-full py-3 rounded-xl transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: "#2A2D31", color: "white", fontWeight: 500, fontSize: "0.9375rem" }}
            >
              Sign in with email
            </button>
          </div>

          <p className="text-center" style={{ color: "#9CA3AF", fontSize: "0.78rem" }}>
            By continuing, you agree to our{" "}
            <span className="underline cursor-pointer" style={{ color: "#2A2D31" }}>
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="underline cursor-pointer" style={{ color: "#2A2D31" }}>
              Privacy Policy
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

function LogoMark({ color }: { color: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <rect width="26" height="26" rx="7" fill={color} />
      <path d="M13 5L20 9.5V17L13 21.5L6 17V9.5L13 5Z" fill="white" fillOpacity="0.15" />
      <path d="M13 8L18 11V17L13 20L8 17V11L13 8Z" fill="white" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.2045c0-.6381-.0572-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615z" fill="#4285F4" />
      <path d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8064.54-1.8368.859-3.0477.859-2.344 0-4.3282-1.5831-5.036-3.7104H.9574v2.3318C2.4382 15.9832 5.4818 18 9 18z" fill="#34A853" />
      <path d="M3.964 10.71c-.18-.54-.2827-1.1168-.2827-1.71s.1027-1.17.2827-1.71V4.9582H.9574C.3477 6.1732 0 7.5482 0 9s.3477 2.8268.9574 4.0418L3.964 10.71z" fill="#FBBC05" />
      <path d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5813C13.4632.8918 11.4259 0 9 0 5.4818 0 2.4382 2.0168.9574 4.9582L3.964 7.29C4.6718 5.1627 6.656 3.5795 9 3.5795z" fill="#EA4335" />
    </svg>
  );
}
