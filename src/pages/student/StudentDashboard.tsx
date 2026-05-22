import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="flex h-screen bg-[#f8f6f2] overflow-hidden font-['Inter',system-ui,-apple-system,sans-serif]">
      {/* SIDEBAR - Refined  */}
      <aside className="w-64 bg-white/40 backdrop-blur-xl text-[#2c2824] flex flex-col shrink-0 border-r border-[#e8e2d9] shadow-sm">
        {/* Logo area - softer */}
        <div className="p-6 border-b border-[#e8e2d9]">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Trilevel Logo" className="w-15 h-15 object-contain" />
            <div>
              <div className="font-semibold text-xl tracking-tight bg-linear-to-r from-[#2c2824] to-[#5a5248] bg-clip-text text-transparent"> Trilevel College</div>
              <div className="text-[10px] tracking-[0.2em] text-[#9b9288] uppercase">Student Portal</div>
            </div>
          </div>
        </div>

        {/* Navigation - subtle hover */}
        <nav className="flex-1 p-4">
          <div className="text-[10px] tracking-[0.2em] text-[#b0a89e] uppercase mb-3 px-3">Main</div>
          <ul className="space-y-1.5">
            {[
              { icon: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></>, label: "Dashboard", path: "/student/dashboard" },
              { icon: <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></>, label: "My Courses", path: "/student/my-courses" },
              { icon: <><circle cx="10" cy="10" r="7" /><path d="m21 21-6-6" /></>, label: "Browse Courses", path: "/student/courseview" },

            ].map((item, idx) => (
              <li key={idx}>
                <button onClick={() => navigate(item.path)} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${location.pathname === item.path ? 'bg-[#4a6a9b]/10 text-[#2c4a7a] font-medium' : 'text-[#6b645a] hover:bg-[#eae5dd] hover:text-[#2c2824]'}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{item.icon}</svg>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="text-[10px] tracking-[0.2em] text-[#b0a89e] uppercase mb-3 px-3 mt-8">Account</div>
          <ul className="space-y-1.5">
            {[
              { icon: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></>, label: "Notifications", path: "/student/notifications" },
              { icon: <><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>, label: "Profile", path: "/student/profile" },
            ].map((item, idx) => (
              <li key={idx}>
                <button onClick={() => navigate(item.path)} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#6b645a] hover:bg-[#eae5dd] hover:text-[#2c2824] transition-all duration-200">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{item.icon}</svg>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-5 border-t border-[#e8e2d9] space-y-2">
          <button className="text-[#9b9288] text-xs hover:text-[#2c2824] transition flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m15 18-6-6 6-6" /></svg>
            Collapse sidebar
          </button>
          <button className="text-[#9b9288] text-xs hover:text-[#2c2824] transition flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
            Sign out
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT - Refined ================= */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 space-y-8">
          {/* Hero Section - refined and subtle */}
          <div className="bg-linear-to-br from-[#2c2824] to-[#1f1d1a] rounded-2xl p-8 relative overflow-hidden shadow-md">
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle,#ffffff_1px,transparent_1px)] bg-size-[24px_24px]"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-gray-300 tracking-wide mb-5">✨ New student</div>
              <h2 className="text-4xl font-light text-white leading-tight max-w-xl">
                Start your learning <br /><span className="font-medium italic text-[#8aabcf]">journey today</span>
              </h2>
              <p className="text-gray-400 mt-4 max-w-md text-sm leading-6">Explore certificates, diplomas, and skill paths crafted for your success.</p>
              <div className="flex gap-3 mt-6">
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-5 py-2 rounded-xl text-sm font-medium transition">Browse Courses →</button>
                <button className="bg-white/5 border border-white/15 hover:bg-white/10 text-white/80 px-5 py-2 rounded-xl text-sm font-medium transition">Complete Profile</button>
              </div>
            </div>
            <div className="absolute right-4 bottom-0 opacity-5">
              <svg width="160" height="160" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
          </div>

          {/* Stats Grid - refined cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></>, title: "Enrolled Courses", value: "0", note: "Get started", color: "from-[#e8f0fe] to-[#d4e2f7]" },
              { icon: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>, title: "Study Time", value: "0h", note: "Start learning", color: "from-[#eef5f0] to-[#ddebe2]" },
              { icon: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>, title: "Assignments Done", value: "0", note: "No tasks yet", color: "from-[#fef5e8] to-[#faeedc]" },
              { icon: <><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /><circle cx="12" cy="12" r="3" /></>, title: "Average Score", value: "--", note: "Begin journey", color: "from-[#f3eef9] to-[#e8e0f2]" },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/70 backdrop-blur-sm rounded-xl p-5 border border-[#e8e2d9] shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-linear-to-br ${stat.color} flex items-center justify-center`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4a6a9b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{stat.icon}</svg>
                  </div>
                  <span className="text-[10px] text-[#b0a89e] font-medium tracking-wide">{stat.note}</span>
                </div>
                <div className="text-3xl font-semibold text-[#2c2824] tracking-tight">{stat.value}</div>
                <div className="text-xs text-[#9b9288] mt-1.5">{stat.title}</div>
              </div>
            ))}
          </div>

          {/* Continue Learning - refined */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[#2c2824]">Continue Learning</h2>
              <button className="text-[#4a6a9b] text-xs font-medium hover:underline transition">View Schedule →</button>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { title: "Technology", subtitle: "Introduction to Artificial Intelligence", desc: "Fundamentals of AI, machine learning concepts", badge: "Certificate", badgeColor: "bg-[#e8f0fe] text-[#4a6a9b]" },
                { title: "Business Administration", subtitle: "Diploma Program", desc: "Strategic management, financial literacy, marketing", badge: "Diploma", badgeColor: "bg-[#eef5f0] text-[#4a7c5e]" },
                { title: "Social Sciences", subtitle: "Social Work & Community", desc: "Community engagement, welfare policy, advocacy", badge: "Certificate", badgeColor: "bg-[#f3eef9] text-[#7a5b9e]" },
              ].map((course, idx) => (
                <div key={idx} className="bg-white/70 backdrop-blur-sm rounded-xl border border-[#e8e2d9] p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`rounded-lg px-2.5 py-1 text-[10px] font-semibold ${course.badgeColor} tracking-wide uppercase`}>{course.badge}</div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c0b8ae"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                  </div>
                  <h3 className="text-[#2c2824] font-semibold text-lg mb-1">{course.title}</h3>
                  <p className="text-[#9b9288] text-xs leading-relaxed">{course.desc}</p>
                  <div className="mt-4">
                    <div className="flex justify-between text-[11px] text-[#b0a89e] mb-1.5"><span>Progress</span><span>0%</span></div>
                    <div className="h-1.5 bg-[#e8e2d9] rounded-full overflow-hidden"><div className="h-full w-0 bg-linear-to-r from-[#4a6a9b] to-[#6b8cb5] rounded-full transition-all duration-500"></div></div>
                  </div>
                  <button className="w-full mt-4 py-2 text-xs font-medium text-[#4a6a9b] bg-[#e8f0fe] rounded-lg hover:bg-[#dce6f5] transition">Enroll Now →</button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity & Announcements - refined */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold text-[#2c2824] mb-4">Recent Activity</h3>
              <div className="bg-white/70 backdrop-blur-sm border border-[#e8e2d9] rounded-xl p-10 text-center">
                <div className="w-16 h-16 bg-linear-to-br from-[#e8f0fe] to-[#d4e2f7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4a6a9b" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <h4 className="font-medium text-[#2c2824] text-lg mb-2">No activity yet</h4>
                <p className="text-[#9b9288] text-sm max-w-sm mx-auto">Once you enroll in courses, your progress and submissions will appear here.</p>
                <button className="mt-5 px-5 py-2 bg-[#4a6a9b] text-white rounded-lg text-xs font-medium hover:bg-[#3d5a86] transition shadow-sm">Find your first course</button>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#2c2824] mb-4">Announcements</h3>
              <div className="space-y-3">
                {[
                  { icon: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></>, text: "Welcome to Inleed Portal! Start by browsing certificates.", time: "Just now", color: "from-[#e8f0fe] to-[#d4e2f7]", iconColor: "#4a6a9b" },
                  { icon: <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />, text: "Complete your profile to get personalized recommendations.", time: "2 hours ago", color: "from-[#eef5f0] to-[#ddebe2]", iconColor: "#4a7c5e" },
                  { icon: <><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></>, text: "New intake: AI for Digital Work & Business diplomas open.", time: "Yesterday", color: "from-[#f3eef9] to-[#e8e0f2]", iconColor: "#7a5b9e" },
                ].map((ann, idx) => (
                  <div key={idx} className="bg-white/70 backdrop-blur-sm border border-[#e8e2d9] rounded-xl p-4 hover:shadow-sm transition">
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-lg bg-linear-to-br ${ann.color} flex items-center justify-center shrink-0`}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ann.iconColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{ann.icon}</svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-[#2c2824] leading-relaxed">{ann.text}</p>
                        <span className="text-[10px] text-[#b0a89e] mt-1 block">{ann.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Banner - refined subtle */}
          <div className="bg-linear-to-r from-[#faf8f5] to-[#f5f2ed] rounded-xl border border-[#e8e2d9] p-4 flex flex-wrap justify-between items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-linear-to-br from-[#e8f0fe] to-[#d4e2f7] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4a6a9b"><path d="M12 8v4l3 3M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/></svg>
              </div>
              <div>
                <p className="font-medium text-[#2c2824] text-sm">Ready to begin?</p>
                <p className="text-xs text-[#9b9288]">Enroll in your first course today</p>
              </div>
            </div>
            <button className="bg-[#4a6a9b] hover:bg-[#3d5a86] text-white px-5 py-2 rounded-lg text-xs font-medium transition shadow-sm">Start Learning →</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;