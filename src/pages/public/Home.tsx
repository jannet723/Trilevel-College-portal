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
  Sparkles,
} from "lucide-react";

const EyeIcon = ({ show }: { show: boolean }) =>
  show ? <Eye size={18} /> : <EyeOff size={18} />;

export default function TrilevelLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<"student" | "admin">("student");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const navigate = useNavigate();

  const tags = [
    "15 Programmes",
    "Certificate & Diploma",
    "Online & Blended",
    "Accredited College",
  ];

  const features = [
    "Access all your courses in one place",
    "Track your progress and assignments",
    "Download certificates upon completion",
  ];

  const handleLogin = () => {
    if (userType === "student") {
      navigate("/dashboard");
    } else {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex bg-linear-to-br from-[#f8f6f2] to-[#f0ede8] font-['Inter',system-ui,-apple-system,sans-serif] relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-[#4a6a9b]/5 rounded-full blur-3xl -top-48 -left-48 animate-pulse" style={{ animationDuration: "8s" }} />
        <div className="absolute w-96 h-96 bg-[#2F2FE4]/5 rounded-full blur-3xl top-1/2 left-1/4 animate-pulse" style={{ animationDuration: "10s", animationDelay: "2s" }} />
        <div className="absolute w-80 h-80 bg-[#b70c0c]/3 rounded-full blur-3xl bottom-0 right-1/4 animate-pulse" style={{ animationDuration: "12s", animationDelay: "4s" }} />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#4a6a9b]/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.5; }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes slideInFromLeft {
          0% { transform: translateX(-20px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeInUp {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px rgba(74, 106, 155, 0.2); }
          50% { box-shadow: 0 0 20px rgba(74, 106, 155, 0.4), 0 0 30px rgba(74, 106, 155, 0.1); }
        }
        .animate-slide-in {
          animation: slideInFromLeft 0.6s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>

      {/* ── Left Panel - Hero Section ── */}
      <div className="flex-1 flex flex-col justify-center px-16 py-12 relative overflow-hidden">
        {/* Enhanced background pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 20% 40%, #4a6a9b 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }} />
        </div>

        {/* Logo - with subtle hover effect */}
        <div className="flex items-center gap-3 mb-14 animate-slide-in group cursor-default">
          <div className="relative">
            <img 
              src="/logo.png" 
              alt="Trilevel College Logo" 
              className="w-30 h-30 transition-transform duration-500 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-linear-to-br from-[#4a6a9b]/0 to-[#4a6a9b]/0 group-hover:from-[#4a6a9b]/5 group-hover:to-transparent rounded-lg transition-all duration-500" />
          </div>
          <div className="relative">
            <p className="text-[22px] font-bold tracking-[0.18em] text-[#b70c0c] uppercase mt-0.5 transition-all duration-300 group-hover:tracking-[0.2em]" style={{ fontFamily: "Georgia, serif" }}>
              Trilevel College
            </p>
            <p className="text-[20px] font-semibold tracking-[0.18em] text-[#b70c0c] uppercase mt-0.5 transition-all duration-300 group-hover:tracking-[0.2em]" style={{ fontFamily: "Georgia, serif" }}>
              of Professional Studies
            </p>
            {/* Subtle underline animation */}
            <div className="h-0.5 w-0 group-hover:w-full bg-linear-to-r from-[#b70c0c] to-transparent transition-all duration-700 mt-1" />
          </div>
        </div>

        {/* Hero text - with staggered animation - FIXED COLOR */}
        <div className="max-w-xl mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <h1
            className="text-6xl font-bold leading-[1.08] mb-2 relative"
            style={{ 
              fontFamily: "'Palatino Linotype', Palatino, Georgia, serif", 
              letterSpacing: "-0.01em",
              color: "#2F2FE4" // Added consistent color
            }}
          >
            <span className="inline-block hover:transform hover:scale-105 transition-transform duration-300 cursor-default">Your academic</span>
            <br />
            <span className="inline-block hover:transform hover:scale-105 transition-transform duration-300 cursor-default">future starts</span>
            <br />
            <span className="inline-flex items-center gap-2 hover:transform hover:scale-105 transition-transform duration-300 cursor-default">
              here.
              <Sparkles size={32} className="text-[#2F2FE4] animate-pulse" style={{ animationDuration: "3s" }} />
            </span>
            
             </h1>
        </div>

        <p className="text-[24px] text-[#555] leading-relaxed max-w-md mb-8 animate-fade-in-up" style={{ fontFamily: "Georgia, serif", animationDelay: "0.3s" }}>
          Enrol in Certificate and Diploma programmes — AI, Business, Theology, Hospitality, Social Work, and Computer Studies — delivered on a modern academic platform.
        </p>

        {/* Tags - with staggered hover animations */}
        <div className="flex flex-wrap gap-2 mb-10 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          {tags.map((t, i) => (
            <span
              key={t}
              className="px-3 py-1 rounded-full border border-[#C8C2B8] text-[12px] text-[#555] bg-white/40 backdrop-blur-sm hover:bg-white/60 hover:border-[#4a6a9b] hover:text-[#4a6a9b] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default"
              style={{ 
                fontFamily: "Georgia, serif",
                animationDelay: `${0.5 + i * 0.1}s`
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── Right Panel - Login Form ── */}
      <div className="w-120 shrink-0 flex flex-col items-center justify-center px-8 py-12 relative bg-white/70 backdrop-blur-md border-l border-[#e8e2d9]/50 shadow-2xl">
        {/* Enhanced dot pattern */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle, #4a6a9b 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }} />
        </div>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-white/50 via-transparent to-[#4a6a9b]/5 pointer-events-none" />

        <div className="relative z-10 w-full max-w-sm">
          {/* Welcome Section - with enhanced icon and FIXED TEXT COLOR */}
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="w-16 h-16 mx-auto mb-4 bg-linear-to-br from-[#4a6a9b] to-[#2c4a7a] rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 relative overflow-hidden group cursor-default">
              <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <LogIn size={28} className="text-white relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)",
                backgroundSize: "200% 200%",
                animation: "shimmer 2s infinite"
              }} />
            </div>
            <h2 className="text-2xl font-semibold text-[#2c2824] mb-2">Welcome back</h2>
            <p className="text-sm text-[#9b9288]">Sign in to your learning portal</p>
          </div>

          {/* User Type Toggle - enhanced */}
          <div className="flex gap-2 mb-6 bg-[#f0ece6] rounded-lg p-1 shadow-inner animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <button
              onClick={() => setUserType("student")}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                userType === "student"
                  ? "bg-white text-[#2c4a7a] shadow-md scale-105"
                  : "text-[#6b645a] hover:text-[#2c2824] hover:bg-white/50"
              }`}
            >
              <span className="relative z-10">Student</span>
              {userType === "student" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-[#4a6a9b] to-transparent" />
              )}
            </button>
            <button
              onClick={() => setUserType("admin")}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                userType === "admin"
                  ? "bg-white text-[#2c4a7a] shadow-md scale-105"
                  : "text-[#6b645a] hover:text-[#2c2824] hover:bg-white/50"
              }`}
            >
              <span className="relative z-10">Administrator</span>
              {userType === "admin" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-[#4a6a9b] to-transparent" />
              )}
            </button>
          </div>

          {/* Email Field - enhanced with glow effect */}
          <div className="mb-5 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <label className="block text-[10px] tracking-[0.15em] uppercase text-[#9b9288] mb-2 font-medium">
              Email Address
            </label>
            <div className="relative group">
              <Mail size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                emailFocused ? "text-[#4a6a9b] scale-110" : "text-[#b0a89e]"
              }`} />
              <input
                type="email"
                placeholder="you@trilevel.ac.ke"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-lg text-sm text-[#2c2824] placeholder:text-[#b0a89e] focus:outline-none transition-all duration-300 ${
                  emailFocused 
                    ? "border-[#4a6a9b] shadow-lg ring-4 ring-[#4a6a9b]/10" 
                    : "border-[#e0d9d0] shadow-sm hover:border-[#4a6a9b]/50 hover:shadow-md"
                }`}
                style={emailFocused ? { animation: "glow 2s ease-in-out infinite" } : {}}
              />
              {emailFocused && (
                <div className="absolute -inset-0.5 bg-linear-to-r from-[#4a6a9b]/20 to-[#2c4a7a]/20 rounded-lg -z-10 blur" />
              )}
            </div>
          </div>

          {/* Password Field - enhanced with glow effect */}
          <div className="mb-3 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <label className="block text-[10px] tracking-[0.15em] uppercase text-[#9b9288] mb-2 font-medium">
              Password
            </label>
            <div className="relative group">
              <Lock size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                passwordFocused ? "text-[#4a6a9b] scale-110" : "text-[#b0a89e]"
              }`} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className={`w-full pl-10 pr-10 py-2.5 bg-white border rounded-lg text-sm text-[#2c2824] placeholder:text-[#b0a89e] focus:outline-none transition-all duration-300 ${
                  passwordFocused 
                    ? "border-[#4a6a9b] shadow-lg ring-4 ring-[#4a6a9b]/10" 
                    : "border-[#e0d9d0] shadow-sm hover:border-[#4a6a9b]/50 hover:shadow-md"
                }`}
                style={passwordFocused ? { animation: "glow 2s ease-in-out infinite" } : {}}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b0a89e] hover:text-[#4a6a9b] hover:scale-110 transition-all duration-200"
              >
                <EyeIcon show={showPassword} />
              </button>
              {passwordFocused && (
                <div className="absolute -inset-0.5 bg-linear-to-r from-[#4a6a9b]/20 to-[#2c4a7a]/20 rounded-lg -z-10 blur" />
              )}
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end mb-6 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <a href="#" className="text-[11px] text-[#9b9288] hover:text-[#4a6a9b] transition-all duration-200 relative group">
              Forgot password?
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[#4a6a9b] group-hover:w-full transition-all duration-300" />
            </a>
          </div>

          {/* Login Button - enhanced with shimmer */}
          <button
            onClick={handleLogin}
            className="w-full bg-linear-to-r from-[#4a6a9b] to-[#3d5a86] hover:from-[#3d5a86] hover:to-[#2c4a7a] text-white text-sm font-medium py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-2 mb-3 relative overflow-hidden group animate-fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            <LogIn size={16} className="relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            <span className="relative z-10">Sign in as {userType === "student" ? "Student" : "Admin"}</span>
          </button>

          {/* Admin Note - enhanced */}
          {userType === "admin" && (
            <div className="bg-linear-to-r from-[#e8f0fe]/40 to-[#e8f0fe]/20 rounded-lg p-3 mb-4 border border-[#d4e2f7] backdrop-blur-sm animate-fade-in-up shadow-sm" style={{ animationDelay: "0.6s" }}>
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-[#4a6a9b] animate-pulse" style={{ animationDuration: "3s" }} />
                <p className="text-[11px] text-[#6b645a]">Admin access requires additional verification</p>
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3 my-6 animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
            <div className="flex-1 h-px bg-linear-to-r from-transparent via-[#e0d9d0] to-transparent" />
            <span className="text-[10px] text-[#9b9288] uppercase tracking-wide">New to Trilevel?</span>
            <div className="flex-1 h-px bg-linear-to-r from-transparent via-[#e0d9d0] to-transparent" />
          </div>

          {/* Create Account Button - enhanced */}
          <button className="w-full border border-[#e0d9d0] bg-white hover:bg-[#faf8f5] text-[#2c2824] text-sm font-medium py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:border-[#4a6a9b] hover:-translate-y-0.5 relative overflow-hidden group animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
            <UserPlus size={16} className="relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <span className="relative z-10">Create an account</span>
            <div className="absolute inset-0 bg-linear-to-r from-[#4a6a9b]/0 via-[#4a6a9b]/5 to-[#4a6a9b]/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>

          {/* Features List - enhanced with hover effects */}
          <div className="mt-8 pt-6 border-t border-[#e8e2d9] animate-fade-in-up" style={{ animationDelay: "0.9s" }}>
            <div className="space-y-2">
              {features.map((feature, i) => (
                <div 
                  key={i}
                  className="flex items-center gap-2 text-[11px] text-[#6b645a] hover:text-[#2c2824] transition-all duration-300 cursor-default group"
                  style={{ animationDelay: `${1 + i * 0.1}s` }}
                >
                  <ChevronRight size={12} className="text-[#4a6a9b] group-hover:translate-x-1 transition-transform duration-300" />
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}