import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from '../../layouts/StudentLayout';
import { useEnrollment } from '../../context/EnrollmentContext';

// ── Types ──────────────────────────────────────────────────────────────────
interface Course {
  id: number;
  title: string;
  subtitle: string;
  desc: string;
  badge: string;
  badgeColor: string;
  progress: number;
}

interface Activity {
  id: number;
  text: string;
  time: string;
  type: 'course' | 'assignment' | 'login';
}

interface Announcement {
  id: number;
  text: string;
  time: string;
  color: string;
  iconColor: string;
  iconType: 'bell' | 'star' | 'book';
}

// ── Empty-state placeholder ────────────────────────────────────────────────
const EmptyCard: React.FC<{ icon: React.ReactNode; title: string; desc: string; action?: { label: string; onClick: () => void } }> = ({ icon, title, desc, action }) => (
  <div className="flex flex-col justify-center items-center portal-panel portal-stat-card--empty p-8 text-center">
    <div className="flex justify-center items-center bg-[#f0ece6] mb-4 rounded-xl w-14 h-14 text-[#b0a89e]">{icon}</div>
    <p className="mb-1 font-medium text-[#6b645a] text-sm">{title}</p>
    <p className="mb-4 text-[#b0a89e] text-xs leading-relaxed">{desc}</p>
    {action && (
      <button onClick={action.onClick} className="bg-[#4a6a9b]/10 hover:bg-[#4a6a9b]/20 px-4 py-1.5 rounded-lg font-medium text-[#4a6a9b] text-xs transition">
        {action.label}
      </button>
    )}
  </div>
);

// ── SVG icon helpers ───────────────────────────────────────────────────────
const ClockIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const BookIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

// ── Demo data pools ────────────────────────────────────────────────────────
// const COURSE_POOL: Omit<Course, 'id'>[] = [
//   { title: "Technology", subtitle: "Introduction to Artificial Intelligence", desc: "Fundamentals of AI, machine learning concepts", badge: "Certificate", badgeColor: "bg-[#e8f0fe] text-[#4a6a9b]", progress: 0 },
//   { title: "Business Administration", subtitle: "Diploma Program", desc: "Strategic management, financial literacy, marketing", badge: "Diploma", badgeColor: "bg-[#eef5f0] text-[#4a7c5e]", progress: 0 },
//   { title: "Social Sciences", subtitle: "Social Work & Community", desc: "Community engagement, welfare policy, advocacy", badge: "Certificate", badgeColor: "bg-[#f3eef9] text-[#7a5b9e]", progress: 0 },
//   { title: "Data Analytics", subtitle: "Applied Data Science", desc: "Python, visualisation, statistics, dashboards", badge: "Certificate", badgeColor: "bg-[#fef5e8] text-[#b07a3a]", progress: 0 },
// ];

const ANNOUNCEMENT_POOL: Omit<Announcement, 'id'>[] = [
  { text: "Welcome to Trilevel Portal! Start by browsing certificates.", time: "Just now", color: "bg-[#e8f0fe]", iconColor: "#4a6a9b", iconType: 'bell' },
  { text: "Complete your profile to get personalised recommendations.", time: "2 hours ago", color: "bg-[#eef5f0]", iconColor: "#4a7c5e", iconType: 'star' },
  { text: "New intake: AI for Digital Work & Business diplomas open.", time: "Yesterday", color: "bg-[#f3eef9]", iconColor: "#7a5b9e", iconType: 'book' },
];

const announcementIcon = (type: Announcement['iconType'], color: string) => {
  const paths: Record<Announcement['iconType'], React.ReactNode> = {
    bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></>,
    star: <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />,
    book: <><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></>,
  };
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[type]}
    </svg>
  );
};

// ── Main component ─────────────────────────────────────────────────────────
const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { enrolledCourses, unenroll } = useEnrollment();

  const courses: Course[] = enrolledCourses.map((c) => ({
    id: c.id,
    title: c.department,
    subtitle: c.title,
    desc: c.description,
    badge: c.type,
    badgeColor:
      c.type === 'Diploma'
        ? 'bg-[#eef5f0] text-[#4a7c5e]'
        : 'bg-[#e8f0fe] text-[#4a6a9b]',
    progress: c.progress,
  }));
  const [studyHours] = useState(0);
  const [assignmentsDone] = useState(0);
  const [avgScore] = useState<number | null>(null);
  const [activities] = useState<Activity[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  // ── Demo actions ───────────────────────────────────────────────────────

  const removeCourse = (id: number) => unenroll(id);

  const addAnnouncement = () => {
    const pool = ANNOUNCEMENT_POOL.filter(a => !announcements.find(ea => ea.text === a.text));
    if (!pool.length) return;
    setAnnouncements(prev => [{ ...pool[0], id: Date.now() }, ...prev]);
  };

  // const addActivity = ({ text, type }: { text: string; type: Activity['type'] }) => {
  //   setActivities(prev => [{ id: Date.now(), text, time: "Just now", type }, ...prev.slice(0, 9)]);
  // };

  // ── Derived stats ──────────────────────────────────────────────────────
  const stats = [
    {
      icon: <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></>,
      title: "Enrolled Courses", value: courses.length > 0 ? String(courses.length) : "0",
      note: courses.length > 0 ? `${courses.length} active` : "Get started",
      color: "bg-[#e8f0fe]",
      hasData: courses.length > 0,
    },
    {
      icon: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>,
      title: "Study Time", value: studyHours > 0 ? `${studyHours}h` : "0h",
      note: studyHours > 0 ? "Keep it up!" : "Start learning",
      color: "bg-[#eef5f0]",
      hasData: studyHours > 0,
    },
    {
      icon: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>,
      title: "Assignments Done", value: String(assignmentsDone),
      note: assignmentsDone > 0 ? "Well done!" : "No tasks yet",
      color: "bg-[#fef5e8]",
      hasData: assignmentsDone > 0,
    },
    {
      icon: <><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /><circle cx="12" cy="12" r="3" /></>,
      title: "Average Score", value: avgScore !== null ? `${avgScore}%` : "--",
      note: avgScore !== null ? (avgScore >= 70 ? "Great work!" : "Keep going") : "Begin journey",
      color: "bg-[#f3eef9]",
      hasData: avgScore !== null,
    },
  ];

  return (
    <StudentLayout title="Dashboard" subtitle="Your learning overview" showBack={false}>
        <div className="space-y-8">

          {/* Hero */}
          <div className="portal-hero p-8 sm:p-10">
            <div className="relative z-10">
              <div className="inline-flex items-center bg-white/5 mb-5 px-3 py-1.5 border border-white/10 rounded-full text-[11px] text-gray-300 tracking-wide">✨ New student</div>
              <h2 className="max-w-xl font-light text-white text-4xl leading-tight">
                Start your learning <br /><span className="font-medium text-[#8aabcf] italic">journey today</span>
              </h2>
              <p className="mt-4 max-w-md text-gray-400 text-sm leading-6">Explore certificates, diplomas, and skill paths crafted for your success.</p>
              <div className="flex gap-3 mt-6">
                <button onClick={() => navigate('/student/courses')} className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-5 py-2 rounded-xl font-medium text-white text-sm transition">Browse Courses →</button>
                <button onClick={() => navigate('/student/profile')} className="bg-white/5 hover:bg-white/10 px-5 py-2 border border-white/15 rounded-xl font-medium text-white/80 text-sm transition">Complete Profile</button>
              </div>
            </div>
            <div className="right-4 bottom-0 absolute opacity-5">
              <svg width="160" height="160" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, idx) => (
              <div key={idx} className={`portal-stat-card ${stat.hasData ? '' : 'portal-stat-card--empty'}`}>
                <div className="flex justify-between items-center mb-4">
                  <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center ${!stat.hasData ? 'opacity-50' : ''}`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stat.hasData ? "#4a6a9b" : "#b0a89e"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{stat.icon}</svg>
                  </div>
                  <span className="font-medium text-[#b0a89e] text-[10px] tracking-wide">{stat.note}</span>
                </div>
                <div className={`font-semibold text-3xl tracking-tight ${stat.hasData ? 'text-[#2c2824]' : 'text-[#c0b8ae]'}`}>{stat.value}</div>
                <div className="mt-1.5 text-[#9b9288] text-xs">{stat.title}</div>
              </div>
            ))}
          </div>

          

          {/* Continue Learning */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-[#2c2824] text-xl">Continue Learning</h2>
              <button className="font-medium text-[#4a6a9b] text-xs hover:underline transition">View Schedule →</button>
            </div>

            {courses.length === 0 ? (
              <EmptyCard
                icon={<BookIcon />}
                title="No courses yet"
                desc="Enrol in a course to start tracking your progress here."
                action={{ label: "Browse courses →", onClick: () => navigate('/student/courses') }}
              />
            ) : (
              <div className="gap-5 grid md:grid-cols-3">
                {courses.map(course => (
                  <div key={course.id} className="relative bg-white/70 hover:shadow-md backdrop-blur-sm p-5 border border-[#e8e2d9] rounded-xl transition-all hover:-translate-y-0.5 duration-200">
                    <button onClick={() => removeCourse(course.id)} className="top-3 right-3 absolute flex justify-center items-center bg-[#f5f0eb] hover:bg-[#ede6de] rounded-full w-6 h-6 text-[#b0a89e] hover:text-[#6b645a] text-xs transition" title="Remove">✕</button>
                    <div className="flex justify-between items-start mb-3">
                      <div className={`rounded-lg px-2.5 py-1 text-[10px] font-semibold ${course.badgeColor} tracking-wide uppercase`}>{course.badge}</div>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c0b8ae"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
                    </div>
                    <h3 className="mb-1 font-semibold text-[#2c2824] text-lg">{course.subtitle}</h3>
                    <p className="text-[#9b9288] text-xs leading-relaxed">{course.desc}</p>
                    <div className="mt-4">
                      <div className="flex justify-between mb-1.5 text-[#b0a89e] text-[11px]"><span>Progress</span><span>{course.progress}%</span></div>
                      <div className="bg-[#e8e2d9] rounded-full h-1.5 overflow-hidden">
                        <div className="bg-[#4a6a9b] rounded-full h-full transition-all duration-500" style={{ width: `${course.progress}%` }}></div>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/student/learn/${course.id}`)}
                      className="bg-[#e8f0fe] hover:bg-[#dce6f5] mt-4 py-2 rounded-lg w-full font-medium text-[#4a6a9b] text-xs transition"
                    >
                      Continue →
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Activity & Announcements */}
          <div className="gap-6 grid lg:grid-cols-3">
            {/* Activity */}
            <div className="lg:col-span-2">
              <h3 className="mb-4 font-semibold text-[#2c2824] text-xl">Recent Activity</h3>
              {activities.length === 0 ? (
                <EmptyCard
                  icon={<ClockIcon />}
                  title="No activity yet"
                  desc="Once you enrol in courses, your progress and submissions will appear here."
                />
              ) : (
                <div className="bg-white/70 backdrop-blur-sm border border-[#e8e2d9] rounded-xl divide-y divide-[#f0ece6] overflow-hidden">
                  {activities.map(act => (
                    <div key={act.id} className="flex items-start gap-3 p-4 hover:bg-[#faf8f5] transition">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${act.type === 'course' ? 'bg-[#e8f0fe]' : act.type === 'assignment' ? 'bg-[#fef5e8]' : 'bg-[#eef5f0]'}`}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={act.type === 'course' ? '#4a6a9b' : act.type === 'assignment' ? '#b07a3a' : '#4a7c5e'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          {act.type === 'course' && <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></>}
                          {act.type === 'assignment' && <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>}
                          {act.type === 'login' && <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>}
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-[#2c2824] text-sm">{act.text}</p>
                        <span className="text-[#b0a89e] text-[10px]">{act.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Announcements */}
            <div>
              <h3 className="mb-4 font-semibold text-[#2c2824] text-xl">Announcements</h3>
              {announcements.length === 0 ? (
                <EmptyCard
                  icon={
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                  }
                  title="No announcements"
                  desc="Important updates and notices will appear here."
                  action={{ label: "+ Add announcement", onClick: addAnnouncement }}
                />
              ) : (
                <div className="space-y-3">
                  {announcements.map(ann => (
                    <div key={ann.id} className="bg-white/70 hover:shadow-sm backdrop-blur-sm p-4 border border-[#e8e2d9] rounded-xl transition">
                      <div className="flex items-start gap-3">
                        <div className={`w-9 h-9 rounded-lg ${ann.color} flex items-center justify-center shrink-0`}>
                          {announcementIcon(ann.iconType, ann.iconColor)}
                        </div>
                        <div className="flex-1">
                          <p className="text-[#2c2824] text-sm leading-relaxed">{ann.text}</p>
                          <span className="block mt-1 text-[#b0a89e] text-[10px]">{ann.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CTA Banner */}
          <div className="flex flex-wrap justify-between items-center gap-3 bg-[#faf8f5] p-4 border border-[#e8e2d9] rounded-xl">
            <div className="flex items-center gap-3">
              <div className="flex justify-center items-center bg-[#e8f0fe] rounded-lg w-10 h-10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4a6a9b">
                  <path d="M12 8v4l3 3M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-[#2c2824] text-sm">Ready to begin?</p>
                <p className="text-[#9b9288] text-xs">Enrol in your first course today</p>
              </div>
            </div>
            <button onClick={() => navigate('/student/courses')} className="bg-[#4a6a9b] hover:bg-[#3d5a86] shadow-sm px-5 py-2 rounded-lg font-medium text-white text-xs transition">
              Start Learning →
            </button>
          </div>

        </div>
    </StudentLayout>
  );
};

export default Dashboard;