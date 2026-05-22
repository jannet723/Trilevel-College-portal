import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  BookOpen,
  Menu,
} from "lucide-react";
 


const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarCollapsed] = useState(false);
  
  return (
    <div className="flex bg-[#f8f6f2] h-screen overflow-hidden font-['Inter',system-ui,-apple-system,sans-serif]" style={{ fontFamily: "Georgia, serif" }}>
      {/* SIDEBAR - Refined  */}
      <aside className="flex flex-col bg-white/40 shadow-sm backdrop-blur-xl border-[#e8e2d9] border-r w-64 text-[#2c2824] shrink-0">
        {/* Logo area - softer */}
        <div className="p-6 border-[#e8e2d9] border-b">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Trilevel Logo" className="w-15 h-15 object-contain" />
            <div>
              <div className="bg-clip-text bg-linear-to-r from-[#2c2824] to-[#5a5248] font-semibold text-transparent text-xl tracking-tight"> Trilevel College</div>
              <div className="text-[#9b9288] text-[10px] uppercase tracking-[0.2em]">Student Portal</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className={`text-[10px] tracking-[0.2em] text-[#b0a89e] uppercase mb-3 ${isSidebarCollapsed ? 'text-center px-1' : 'px-3'}`}>
            {!isSidebarCollapsed ? 'Main' : '≡'}
          </div>
          <ul className="space-y-1.5">
            {[
              { icon: <Menu size={18} />, label: "Dashboard", path: "/student/dashboard" },
              { icon: <BookOpen size={18} />, label: "My Courses", path: "/student/my-courses" },
            ].map((item, idx) => (
              <li key={idx}>
                <button onClick={() => navigate(item.path)} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${location.pathname === item.path ? 'bg-[#4a6a9b]/10 text-[#2c4a7a] font-medium' : 'text-[#6b645a] hover:bg-[#eae5dd] hover:text-[#2c2824]'}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{item.icon}</svg>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-8 mb-3 px-3 text-[#b0a89e] text-[10px] uppercase tracking-[0.2em]">Account</div>
          <ul className="space-y-1.5">
            {[
              { icon: <><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>, label: "Profile", path: "/student/profile" },
            ].map((item, idx) => (
              <li key={idx}>
                <button onClick={() => navigate(item.path)} className="flex items-center gap-3 hover:bg-[#eae5dd] px-4 py-2.5 rounded-xl w-full text-[#6b645a] hover:text-[#2c2824] transition-all duration-200">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{item.icon}</svg>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-2 p-5 border-[#e8e2d9] border-t">
          <button className="flex items-center gap-2 text-[#9b9288] hover:text-[#2c2824] text-xs transition">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m15 18-6-6 6-6" /></svg>
            Collapse sidebar
          </button>
          <button className="flex items-center gap-2 text-[#9b9288] hover:text-[#2c2824] text-xs transition">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
            Sign out
          </button>
        </div>
      </aside>

      {/* ================ MAIN CONTENT - Refined  */}
      <main className="flex-1 overflow-y-auto">
        <div className="space-y-8 p-8">
          {/* Hero Section - refined and subtle */}
          <div className="relative bg-linear-to-br from-[#2c2824] to-[#1f1d1a] shadow-md p-8 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle,#ffffff_1px,transparent_1px)] opacity-[0.03] bg-size-[24px_24px]"></div>
            <div className="z-10 relative">
              <div className="inline-flex items-center bg-white/5 mb-5 px-3 py-1.5 border border-white/10 rounded-full text-[11px] text-gray-300 tracking-wide">✨ New student</div>
              <h2 className="max-w-xl font-light text-white text-4xl leading-tight">
                Start your learning <br /><span className="font-medium text-[#8aabcf] italic">journey today</span>
              </h2>
              <p className="mt-4 max-w-md text-gray-400 text-sm leading-6">Explore certificates, diplomas, and skill paths crafted for your success.</p>
              <div className="flex gap-3 mt-6">
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-5 py-2 rounded-xl font-medium text-white text-sm transition">Browse Courses →</button>
                <button className="bg-white/5 hover:bg-white/10 px-5 py-2 border border-white/15 rounded-xl font-medium text-white/80 text-sm transition">Complete Profile</button>
              </div>
            </div>
            <div className="right-4 bottom-0 absolute opacity-5">
              <svg width="160" height="160" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
          </div>

          {/* Stats Grid - refined cards */}
          <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></>, title: "Enrolled Courses", value: "0", note: "Get started", color: "from-[#e8f0fe] to-[#d4e2f7]" },
              { icon: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>, title: "Study Time", value: "0h", note: "Start learning", color: "from-[#eef5f0] to-[#ddebe2]" },
              { icon: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>, title: "Assignments Done", value: "0", note: "No tasks yet", color: "from-[#fef5e8] to-[#faeedc]" },
              { icon: <><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /><circle cx="12" cy="12" r="3" /></>, title: "Average Score", value: "--", note: "Begin journey", color: "from-[#f3eef9] to-[#e8e0f2]" },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/70 shadow-sm hover:shadow-md backdrop-blur-sm p-5 border border-[#e8e2d9] rounded-xl transition-all hover:-translate-y-0.5 duration-200">
                <div className="flex justify-between items-center mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-linear-to-br ${stat.color} flex items-center justify-center`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4a6a9b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{stat.icon}</svg>
                  </div>
                  <span className="font-medium text-[#b0a89e] text-[10px] tracking-wide">{stat.note}</span>
                </div>
                <div className="font-semibold text-[#2c2824] text-3xl tracking-tight">{stat.value}</div>
                <div className="mt-1.5 text-[#9b9288] text-xs">{stat.title}</div>
              </div>
            ))}
          </div>

          {/* Continue Learning - refined */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-[#2c2824] text-xl">Continue Learning</h2>
              <button className="font-medium text-[#4a6a9b] text-xs hover:underline transition">View Schedule →</button>
            </div>
            <div className="gap-5 grid md:grid-cols-3">
              {[
                { title: "Technology", subtitle: "Introduction to Artificial Intelligence", desc: "Fundamentals of AI, machine learning concepts", badge: "Certificate", badgeColor: "bg-[#e8f0fe] text-[#4a6a9b]" },
                { title: "Business Administration", subtitle: "Diploma Program", desc: "Strategic management, financial literacy, marketing", badge: "Diploma", badgeColor: "bg-[#eef5f0] text-[#4a7c5e]" },
                { title: "Social Sciences", subtitle: "Social Work & Community", desc: "Community engagement, welfare policy, advocacy", badge: "Certificate", badgeColor: "bg-[#f3eef9] text-[#7a5b9e]" },
              ].map((course, idx) => (
                <div key={idx} className="bg-white/70 hover:shadow-md backdrop-blur-sm p-5 border border-[#e8e2d9] rounded-xl transition-all hover:-translate-y-0.5 duration-200">
                  <div className="flex justify-between items-start mb-3">
                    <div className={`rounded-lg px-2.5 py-1 text-[10px] font-semibold ${course.badgeColor} tracking-wide uppercase`}>{course.badge}</div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c0b8ae"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                  </div>
                  <h3 className="mb-1 font-semibold text-[#2c2824] text-lg">{course.title}</h3>
                  <p className="text-[#9b9288] text-xs leading-relaxed">{course.desc}</p>
                  <div className="mt-4">
                    <div className="flex justify-between mb-1.5 text-[#b0a89e] text-[11px]"><span>Progress</span><span>0%</span></div>
                    <div className="bg-[#e8e2d9] rounded-full h-1.5 overflow-hidden"><div className="bg-linear-to-r from-[#4a6a9b] to-[#6b8cb5] rounded-full w-0 h-full transition-all duration-500"></div></div>
                  </div>
                  <button className="bg-[#e8f0fe] hover:bg-[#dce6f5] mt-4 py-2 rounded-lg w-full font-medium text-[#4a6a9b] text-xs transition">Enroll Now →</button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity & Announcements - refined */}
          <div className="gap-6 grid lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h3 className="mb-4 font-semibold text-[#2c2824] text-xl">Recent Activity</h3>
              <div className="bg-white/70 backdrop-blur-sm p-10 border border-[#e8e2d9] rounded-xl text-center">
                <div className="flex justify-center items-center bg-linear-to-br from-[#e8f0fe] to-[#d4e2f7] mx-auto mb-4 rounded-xl w-16 h-16">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4a6a9b" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <h4 className="mb-2 font-medium text-[#2c2824] text-lg">No activity yet</h4>
                <p className="mx-auto max-w-sm text-[#9b9288] text-sm">Once you enroll in courses, your progress and submissions will appear here.</p>
                <button className="bg-[#4a6a9b] hover:bg-[#3d5a86] shadow-sm mt-5 px-5 py-2 rounded-lg font-medium text-white text-xs transition">Find your first course</button>
              </div>
            </div>

            <div>
              <h3 className="mb-4 font-semibold text-[#2c2824] text-xl">Announcements</h3>
              <div className="space-y-3">
                {[
                  { icon: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></>, text: "Welcome to Inleed Portal! Start by browsing certificates.", time: "Just now", color: "from-[#e8f0fe] to-[#d4e2f7]", iconColor: "#4a6a9b" },
                  { icon: <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />, text: "Complete your profile to get personalized recommendations.", time: "2 hours ago", color: "from-[#eef5f0] to-[#ddebe2]", iconColor: "#4a7c5e" },
                  { icon: <><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></>, text: "New intake: AI for Digital Work & Business diplomas open.", time: "Yesterday", color: "from-[#f3eef9] to-[#e8e0f2]", iconColor: "#7a5b9e" },
                ].map((ann, idx) => (
                  <div key={idx} className="bg-white/70 hover:shadow-sm backdrop-blur-sm p-4 border border-[#e8e2d9] rounded-xl transition">
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-lg bg-linear-to-br ${ann.color} flex items-center justify-center shrink-0`}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ann.iconColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{ann.icon}</svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-[#2c2824] text-sm leading-relaxed">{ann.text}</p>
                        <span className="block mt-1 text-[#b0a89e] text-[10px]">{ann.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Banner - refined subtle */}
          <div className="flex flex-wrap justify-between items-center gap-3 bg-linear-to-r from-[#faf8f5] to-[#f5f2ed] p-4 border border-[#e8e2d9] rounded-xl">
            <div className="flex items-center gap-3">
              <div className="flex justify-center items-center bg-linear-to-br from-[#e8f0fe] to-[#d4e2f7] rounded-lg w-10 h-10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4a6a9b"><path d="M12 8v4l3 3M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/></svg>
              </div>
              <div>
                <p className="font-medium text-[#2c2824] text-sm">Ready to begin?</p>
                <p className="text-[#9b9288] text-xs">Enroll in your first course today</p>
              </div>
            </div>
            <button className="bg-[#4a6a9b] hover:bg-[#3d5a86] shadow-sm px-5 py-2 rounded-lg font-medium text-white text-xs transition">Start Learning →</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
