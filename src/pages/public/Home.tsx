import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
  Shield,
  ChevronRight,
} from "lucide-react";

const EyeIcon = ({ show }: { show: boolean }) =>
  show ? <Eye size={18} /> : <EyeOff size={18} />;

export default function TrilevelLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<"student" | "admin">("student");
  const navigate = useNavigate();

  const tags = [
    "15 Programmes",
    "Certificate & Diploma",
    "Online & Blended",
    "Accredited College",
  ];

  const handleLogin = () => {
    if (userType === "student") {
      navigate("/dashboard");
    } else {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex bg-linear-to-br from-[#f8f6f2] to-[#f0ede8] font-['Inter',system-ui,-apple-system,sans-serif]"  style={{ fontFamily: "Georgia, serif" }}>
      {/* ── Left Panel - Hero Section ── */}
      <div className="flex-1 flex flex-col justify-center px-16 py-12 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 20% 40%, #4a6a9b 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }} />
        </div>

         {/* Logo */}
        <div className="flex items-center gap-3 mb-14">
          <img src="/logo.png" alt="Trilevel College Logo" className="w-30 h-30 " />
          <div>
            <p className="text-[22px] font-bold tracking-[0.18em] text-[#b70c0c] uppercase mt-0.5" style={{ fontFamily: "Georgia, serif" }}>
              Trilevel College
            </p>
            <p className="text-[20px]  font-semibold tracking-[0.18em] text-[#b70c0c] uppercase mt-0.5" style={{ fontFamily: "Georgia, serif" }}>
              of Professional Studies
            </p>
          </div>
        </div>

          {/* Hero text */}
        <div className="max-w-xl mb-8">
          <h1
            className="text-6xl font-bold leading-[1.08] text-[#2F2FE4] mb-2"
            style={{ fontFamily: "'Palatino Linotype', Palatino, Georgia, serif", letterSpacing: "-0.01em" }}
          >
            Your academic
            <br />
            future starts
            <br />
            <span className=" text-[#2F2FE4] italic">here.</span>
          </h1>
        </div>

        <p className="text-[24px] text-[#555] leading-relaxed max-w-md mb-8" style={{ fontFamily: "Georgia, serif" }}>
          Enrol in Certificate and Diploma programmes — AI, Business, Theology, Hospitality, Social Work, and Computer Studies — delivered on a modern academic platform.
        </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-10">
        {tags.map((t) => (
          <span
            key={t}
            className="px-3 py-1 rounded-full border border-[#C8C2B8] text-[12px] text-[#555] bg-transparent"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {t}
          </span>
        ))}
      </div>

      

        {/* Tags */}
      </div>

      {/* ── Right Panel - Login Form ── */}
      <div className="w-120 shrink-0 flex flex-col items-center justify-center px-8 py-12 relative bg-white/60 backdrop-blur-sm border-l border-[#e8e2d9] shadow-xl">
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle, #4a6a9b 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }} />
        </div>

        <div className="relative z-10 w-full max-w-sm">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-linear-to-br from-[#4a6a9b] to-[#2c4a7a] rounded-2xl flex items-center justify-center shadow-md">
              <LogIn size={28} className="text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-[#2c2824] mb-2">Welcome back</h2>
            <p className="text-sm text-[#9b9288]">Sign in to your learning portal</p>
          </div>

          {/* User Type Toggle */}
          <div className="flex gap-2 mb-6 bg-[#f0ece6] rounded-lg p-1">
            <button
              onClick={() => setUserType("student")}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                userType === "student"
                  ? "bg-white text-[#2c4a7a] shadow-sm"
                  : "text-[#6b645a] hover:text-[#2c2824]"
              }`}
            >
              Student
            </button>
            <button
              onClick={() => setUserType("admin")}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                userType === "admin"
                  ? "bg-white text-[#2c4a7a] shadow-sm"
                  : "text-[#6b645a] hover:text-[#2c2824]"
              }`}
            >
              Administrator
            </button>
          </div>

          {/* Email Field */}
          <div className="mb-5">
            <label className="block text-[10px] tracking-[0.15em] uppercase text-[#9b9288] mb-2 font-medium">
              Email Address
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b0a89e]" />
              <input
                type="email"
                placeholder="you@trilevel.ac.ke"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#e0d9d0] rounded-lg text-sm text-[#2c2824] placeholder:text-[#b0a89e] focus:outline-none focus:ring-2 focus:ring-[#4a6a9b]/20 focus:border-[#4a6a9b]/30 transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label className="block text-[10px] tracking-[0.15em] uppercase text-[#9b9288] mb-2 font-medium">
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b0a89e]" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#e0d9d0] rounded-lg text-sm text-[#2c2824] placeholder:text-[#b0a89e] focus:outline-none focus:ring-2 focus:ring-[#4a6a9b]/20 focus:border-[#4a6a9b]/30 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b0a89e] hover:text-[#6b645a] transition-colors"
              >
                <EyeIcon show={showPassword} />
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end mb-6">
            <a href="#" className="text-[11px] text-[#9b9288] hover:text-[#4a6a9b] transition-colors">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-linear-to-r from-[#4a6a9b] to-[#3d5a86] hover:from-[#3d5a86] hover:to-[#2c4a7a] text-white text-sm font-medium py-2.5 rounded-lg transition-all duration-200 shadow-sm flex items-center justify-center gap-2 mb-3"
          >
            <LogIn size={16} />
            Sign in as {userType === "student" ? "Student" : "Admin"}
          </button>

          {/* Admin Note */}
          {userType === "admin" && (
            <div className="bg-[#e8f0fe]/30 rounded-lg p-3 mb-4 border border-[#d4e2f7]">
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-[#4a6a9b]" />
                <p className="text-[11px] text-[#6b645a]">Admin access requires additional verification</p>
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#e0d9d0]" />
            <span className="text-[10px] text-[#9b9288] uppercase tracking-wide">New to Trilevel?</span>
            <div className="flex-1 h-px bg-[#e0d9d0]" />
          </div>

          {/* Create Account Button */}
          <button className="w-full border border-[#e0d9d0] bg-white hover:bg-[#faf8f5] text-[#2c2824] text-sm font-medium py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
            <UserPlus size={16} />
            Create an account
          </button>

          {/* Features List */}
          <div className="mt-8 pt-6 border-t border-[#e8e2d9]">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[11px] text-[#6b645a]">
                <ChevronRight size={12} className="text-[#4a6a9b]" />
                <span>Access all your courses in one place</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-[#6b645a]">
                <ChevronRight size={12} className="text-[#4a6a9b]" />
                <span>Track your progress and assignments</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-[#6b645a]">
                <ChevronRight size={12} className="text-[#4a6a9b]" />
                <span>Download certificates upon completion</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}