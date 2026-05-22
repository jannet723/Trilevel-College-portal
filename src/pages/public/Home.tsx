import { useState } from "react";
import { useNavigate } from "react-router-dom";


const EyeIcon = ({ show }: { show: boolean }) =>
  show ? (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2}>
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

export default function TrilevelLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


  const tags = ["15 Programmes", "Certificate & Diploma", "Online & Blended", "Accredited College"];

  return (
    <div className="min-h-screen flex font-serif bg-[#F0EDE6]">
      {/* ── Left panel ── */}
      <div className="flex-1 flex flex-col justify-center px-16 py-12 relative overflow-hidden">
        {/* subtle noise overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "150px 150px",
          }}
        />

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

        
      </div>

      {/* ── Right panel ── */}
      <div
        className="w-90 shrink-0 flex flex-col items-center justify-center px-8 py-12 relative"
        style={{ background: "#FFFFFF" }}
      >
        {/* subtle dot-grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #2F2FE4 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <div className="relative z-10 w-full max-w-75">
          {/* Logo */}
          

          {/* Heading */}
          <h2
            className="text-6xl font-bold text-[#000000] mb-5 text-left"
            style={{ fontFamily: "'Palatino Linotype', Palatino, Georgia, serif" }}
          >
            Welcome 
          </h2>
          <p className="text-[13px] text-[#666] mb-7" style={{ fontFamily: "Georgia, serif" }}>
            Sign in to your learning portal
          </p>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-[11px] tracking-[0.12em] uppercase text-[#555] mb-1.5" style={{ fontFamily: "Georgia, serif" }}>
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="you@trilevel.ac.ke"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#f5f5f5] border border-[#ddd] rounded-lg px-4 py-2.5 text-[13px] text-[#333] placeholder-[#999] focus:outline-none focus:border-[#2F2FE4] transition-colors"
                style={{ fontFamily: "Georgia, serif" }}
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="block text-[11px] tracking-[0.12em] uppercase text-[#555] mb-1.5" style={{ fontFamily: "Georgia, serif" }}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#f5f5f5] border border-[#ddd] rounded-lg px-4 py-2.5 pr-10 text-[13px] text-[#333] placeholder-[#999] focus:outline-none focus:border-[#2F2FE4] transition-colors"
                style={{ fontFamily: "Georgia, serif" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555] hover:text-[#888] transition-colors"
              >
                <EyeIcon show={showPassword} />
              </button>
            </div>
          </div>

          {/* Forgot */}
          <div className="flex justify-end mb-6">
            <a href="#" className="text-[12px] text-[#666] hover:text-[#2F2FE4] transition-colors" style={{ fontFamily: "Georgia, serif" }}>
              Forgot password?
            </a>
          </div>

          {/* CTA buttons */}
          <button
            onClick={() => navigate("/student/dashboard")}
            className="w-full bg-[#2F2FE4] hover:bg-[#1a1ac4] text-white text-[13px] font-semibold py-2.5 rounded-lg transition-colors mb-2.5"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Sign in as Student
          </button>
          <button
            className="w-full bg-[#2F2FE4] border border-[#2F2FE4] hover:bg-[#1a1ac4] text-white text-[13px] font-semibold py-2.5 rounded-lg transition-colors"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Sign in as Admin
          </button>

          {/* Divider */}
          <div className="flex items-center my-5">
            <div className="flex-1 h-px bg-[#ddd]" />
            <span className="text-[11px] text-[#888] px-3" style={{ fontFamily: "Georgia, serif" }}>
              New to Trilevel?
            </span>
            <div className="flex-1 h-px bg-[#ddd]" />
          </div>

          <button
            className="w-full bg-[#2F2FE4] border border-[#2F2FE4] hover:bg-[#1a1ac4] text-white text-[13px] py-2.5 rounded-lg transition-colors"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
}