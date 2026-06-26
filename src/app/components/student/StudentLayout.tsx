import { Outlet, NavLink, useNavigate, useLocation } from "react-router";
import { Video, User, Menu, X, Repeat } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function StudentLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F7F7F8" }}>
      <nav
        className="sticky top-0 z-50 bg-white"
        style={{ borderBottom: "1px solid #E5E5E8", boxShadow: "0 1px 0 rgba(0,0,0,0.04)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          {/* Logo */}
          <button
            onClick={() => navigate("/student")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0"
          >
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <rect width="26" height="26" rx="7" fill="#2A2D31" />
              <path d="M13 8L18 11V17L13 20L8 17V11L13 8Z" fill="white" />
            </svg>
            <span style={{ fontWeight: 700, color: "#2A2D31", fontSize: "0.9375rem", letterSpacing: "-0.01em" }}>
              IntellectusAI
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink
              to="/student"
              end
              className="px-3.5 py-1.5 rounded-lg text-sm transition-colors"
              style={({ isActive }) => ({
                backgroundColor: isActive ? "#2A2D31" : "transparent",
                color: isActive ? "white" : "#6B7280",
                fontWeight: 500,
              })}
            >
              Home
            </NavLink>
            <NavLink
              to="/student/assessments"
              className="px-3.5 py-1.5 rounded-lg text-sm transition-colors"
              style={({ isActive }) => ({
                backgroundColor: isActive ? "#2A2D31" : "transparent",
                color: isActive ? "white" : "#6B7280",
                fontWeight: 500,
              })}
            >
              My Assessments
            </NavLink>
            <div className="w-px h-4 mx-1" style={{ backgroundColor: "#E5E5E8" }} />
            <NavLink
              to="/student/assess"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm transition-all hover:opacity-90 active:scale-[0.97]"
              style={({ isActive }) => ({
                backgroundColor: isActive ? "#1a1d20" : "#2A2D31",
                color: "white",
                fontWeight: 500,
              })}
            >
              <Video size={13} />
              Assess Video
            </NavLink>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center ml-1 cursor-pointer hover:opacity-80 transition-opacity outline-none"
                  style={{ backgroundColor: "#F0F0F2" }}
                  title="Profile"
                >
                  <User size={14} style={{ color: "#717182" }} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/role-select")}>
                  <Repeat />
                  Switch role
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile: hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div
            className="md:hidden border-t"
            style={{ borderColor: "#E5E5E8", backgroundColor: "white" }}
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {[
                { to: "/student", label: "Home", end: true },
                { to: "/student/assessments", label: "My Assessments", end: false },
              ].map(({ to, label, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm"
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? "#2A2D31" : "transparent",
                    color: isActive ? "white" : "#374151",
                    fontWeight: 500,
                  })}
                >
                  {label}
                </NavLink>
              ))}
              <NavLink
                to="/student/assess"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm mt-1"
                style={{ backgroundColor: "#2A2D31", color: "white", fontWeight: 500 }}
              >
                <Video size={13} />
                Assess Video
              </NavLink>
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <Outlet />
      </main>
    </div>
  );
}
