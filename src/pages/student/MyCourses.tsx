import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  BookOpen,
  Search,
  User,
  Menu,
  ChevronRight,
  Award,
  Clock,
  Star,
} from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────
interface Course {
  id: number;
  title: string;
  department: string;
  description: string;
  progress: number;
  type: 'Certificate' | 'Diploma';
  units: number;
  currentUnit: number;
  status: 'in-progress' | 'completed';
}

// ── Course pool for demo ───────────────────────────────────────────────────
// const COURSE_POOL: Omit<Course, 'id'>[] = [
//   {
//     title: 'Introduction to Artificial Intelligence',
//     department: 'Technology',
//     description: 'Fundamentals of AI, machine learning concepts, and real-world applications across Africa.',
//     progress: 68, type: 'Certificate', units: 12, currentUnit: 7, status: 'in-progress',
//   },
//   {
//     title: 'Diploma in Business Administration',
//     department: 'Business',
//     description: 'Strategic management, financial literacy, marketing and modern entrepreneurship.',
//     progress: 41, type: 'Diploma', units: 18, currentUnit: 5, status: 'in-progress',
//   },
//   {
//     title: 'Social Work & Community Development',
//     department: 'Social Sciences',
//     description: 'Community engagement, welfare policy, social service delivery and advocacy.',
//     progress: 82, type: 'Certificate', units: 10, currentUnit: 9, status: 'in-progress',
//   },
//   {
//     title: 'Theology',
//     department: 'Theology',
//     description: 'Biblical studies, church history and pastoral ministry.',
//     progress: 100, type: 'Certificate', units: 8, currentUnit: 8, status: 'completed',
//   },
// ];

// ── Empty state card ───────────────────────────────────────────────────────
const EmptyState: React.FC<{
  icon: React.ReactNode;
  title: string;
  desc: string;
  action?: { label: string; onClick: () => void };
}> = ({ icon, title, desc, action }) => (
  <div className="flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm rounded-xl border border-dashed border-[#d4cfc8] p-12 text-center">
    <div className="w-16 h-16 bg-[#f0ece6] rounded-xl flex items-center justify-center mx-auto mb-4 text-[#b0a89e]">
      {icon}
    </div>
    <h3 className="text-base font-medium text-[#6b645a] mb-1">{title}</h3>
    <p className="text-sm text-[#b0a89e] max-w-xs leading-relaxed mb-5">{desc}</p>
    {action && (
      <button
        onClick={action.onClick}
        className="px-5 py-2 bg-[#4a6a9b]/10 hover:bg-[#4a6a9b]/20 text-[#4a6a9b] rounded-lg text-sm font-medium transition"
      >
        {action.label}
      </button>
    )}
  </div>
);

// ── Main component ─────────────────────────────────────────────────────────
const MyCourses = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [courses, setCourses] = useState<Course[]>([]);

  // ── Demo actions ─────────────────────────────────────────────────────────

  const removeCourse = (id: number) => setCourses(prev => prev.filter(c => c.id !== id));

  // ── Derived ──────────────────────────────────────────────────────────────
  const filteredCourses = courses.filter(course => {
    if (activeTab === 'all') return true;
    return course.status === activeTab;
  });

  const getStatusCount = (status: string) => {
    if (status === 'all') return courses.length;
    return courses.filter(c => c.status === status).length;
  };

  const handleSignOut = () => navigate('/');

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="flex h-screen bg-[#f8f6f2] overflow-hidden font-['Inter',system-ui,-apple-system,sans-serif]" style={{ fontFamily: "Georgia, serif" }}>

      {/* Sidebar */}
      <aside className={`${isSidebarCollapsed ? 'w-20' : 'w-64'} bg-white/40 backdrop-blur-xl text-[#2c2824] flex flex-col shrink-0 border-r border-[#e8e2d9] shadow-sm transition-all duration-300`}>
        <div className="p-6 border-b border-[#e8e2d9]">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Trilevel Logo" className="w-15 h-15 object-contain" />
            {!isSidebarCollapsed && (
              <div>
                <div className="font-semibold text-xl tracking-tight bg-linear-to-r from-[#2c2824] to-[#5a5248] bg-clip-text text-transparent">Trilevel College</div>
                <div className="text-[10px] tracking-[0.2em] text-[#9b9288] uppercase">Student Portal</div>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className={`text-[10px] tracking-[0.2em] text-[#b0a89e] uppercase mb-3 ${isSidebarCollapsed ? 'text-center px-1' : 'px-3'}`}>
            {!isSidebarCollapsed ? 'Main' : '≡'}
          </div>
          <ul className="space-y-1.5">
            {[
              { icon: <Menu size={18} />, label: "Dashboard", path: "/student/dashboard" },
              { icon: <BookOpen size={18} />, label: "My Courses", path: "/student/my-courses" },
              { icon: <Search size={18} />, label: "Courses", path: "/student/courses" },
            ].map((item, idx) => (
              <li key={idx}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-2.5 rounded-xl transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-[#4a6a9b]/10 text-[#2c4a7a] font-medium'
                      : 'text-[#6b645a] hover:bg-[#eae5dd] hover:text-[#2c2824]'
                  }`}
                >
                  {item.icon}
                  {!isSidebarCollapsed && <span>{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>

          <div className={`text-[10px] tracking-[0.2em] text-[#b0a89e] uppercase mb-3 mt-8 ${isSidebarCollapsed ? 'text-center px-1' : 'px-3'}`}>
            {!isSidebarCollapsed ? 'Account' : '⚙️'}
          </div>
          <ul className="space-y-1.5">
            <li>
              <button
                onClick={() => navigate("/student/profile")}
                className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-2.5 rounded-xl transition-all duration-200 ${
                  location.pathname === "/student/profile"
                    ? 'bg-[#4a6a9b]/10 text-[#2c4a7a] font-medium'
                    : 'text-[#6b645a] hover:bg-[#eae5dd] hover:text-[#2c2824]'
                }`}
              >
                <User size={18} />
                {!isSidebarCollapsed && <span>Profile</span>}
              </button>
            </li>
          </ul>
        </nav>

        <div className="p-5 border-t border-[#e8e2d9] space-y-2">
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="text-[#9b9288] text-xs hover:text-[#2c2824] transition flex items-center gap-2 w-full"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d={isSidebarCollapsed ? "m9 18 6-6-6-6" : "m15 18-6-6 6-6"} />
            </svg>
            {!isSidebarCollapsed && "Collapse sidebar"}
          </button>
          <button
            onClick={handleSignOut}
            className="text-[#9b9288] text-xs hover:text-[#2c2824] transition flex items-center gap-2 w-full"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            {!isSidebarCollapsed && "Sign out"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">

          {/* Header */}
          <div className="mb-6">
            <p className="text-xs text-[#9b9288] tracking-wide">Manage your enrollment</p>
            <h2 className="text-xl font-semibold text-[#2c2824] tracking-tight mt-1">My Courses</h2>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              {
                label: 'Total Courses', value: courses.length,
                icon: <BookOpen size={18} className="text-[#4a6a9b]" />,
                color: 'from-[#e8f0fe] to-[#d4e2f7]',
                hasData: courses.length > 0,
              },
              {
                label: 'In Progress', value: courses.filter(c => c.status === 'in-progress').length,
                icon: <Clock size={18} className="text-[#4a7c5e]" />,
                color: 'from-[#eef5f0] to-[#ddebe2]',
                hasData: courses.filter(c => c.status === 'in-progress').length > 0,
              },
              {
                label: 'Completed', value: courses.filter(c => c.status === 'completed').length,
                icon: <Award size={18} className="text-[#7a5b9e]" />,
                color: 'from-[#f3eef9] to-[#e8e0f2]',
                hasData: courses.filter(c => c.status === 'completed').length > 0,
              },
            ].map((stat, idx) => (
              <div key={idx} className={`bg-white/60 backdrop-blur-sm rounded-xl border p-4 transition-all duration-300 ${stat.hasData ? 'border-[#e8e2d9]' : 'border-dashed border-[#d4cfc8]'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[#b0a89e]">{stat.label}</p>
                    <p className={`text-2xl font-semibold mt-1 transition-colors ${stat.hasData ? 'text-[#2c2824]' : 'text-[#c0b8ae]'}`}>
                      {stat.value}
                    </p>
                  </div>
                  <div className={`w-10 h-10 rounded-lg bg-linear-to-br ${stat.color} flex items-center justify-center ${!stat.hasData ? 'opacity-40' : ''}`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

         
          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-[#e8e2d9]">
            {[
              { id: 'all', label: 'All Courses', count: getStatusCount('all') },
              { id: 'in-progress', label: 'In Progress', count: getStatusCount('in-progress') },
              { id: 'completed', label: 'Completed', count: getStatusCount('completed') },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 text-sm font-medium transition-all duration-200 border-b-2 ${
                  activeTab === tab.id
                    ? 'border-[#4a6a9b] text-[#2c4a7a]'
                    : 'border-transparent text-[#9b9288] hover:text-[#6b645a] hover:border-[#d0c8be]'
                }`}
              >
                {tab.label}
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-[#4a6a9b]/10 text-[#2c4a7a]' : 'bg-[#f0ece6] text-[#9b9288]'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Courses Grid or Empty State */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="relative bg-white/80 backdrop-blur-sm rounded-xl border border-[#e8e2d9] overflow-hidden hover:shadow-md transition-all duration-200 group"
                >
                  {/* Remove button */}
                  <button
                    onClick={() => removeCourse(course.id)}
                    className="absolute top-3 right-3 z-10 w-6 h-6 rounded-full bg-[#f5f0eb] hover:bg-[#ede6de] text-[#b0a89e] hover:text-[#6b645a] text-xs flex items-center justify-center transition"
                    title="Remove"
                  >✕</button>

                  {/* Course Header */}
                  <div className="p-5 border-b border-[#e8e2d9] bg-linear-to-r from-[#faf8f5] to-white">
                    <div className="flex items-start justify-between mb-3">
                      <div className="pr-6">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${
                            course.type === 'Diploma'
                              ? 'bg-linear-to-r from-[#eef5f0] to-[#e0ebe5] text-[#4a7c5e]'
                              : 'bg-linear-to-r from-[#e8f0fe] to-[#d4e2f7] text-[#4a6a9b]'
                          }`}>
                            {course.type}
                          </span>
                          <span className="text-[10px] text-[#b0a89e]">{course.department}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-[#2c2824] group-hover:text-[#4a6a9b] transition-colors">
                          {course.title}
                        </h3>
                      </div>
                      <ChevronRight size={18} className="text-[#c0b8ae] group-hover:text-[#4a6a9b] transition-colors shrink-0" />
                    </div>
                    <p className="text-sm text-[#6b645a] leading-relaxed">{course.description}</p>
                  </div>

                  {/* Course Progress */}
                  <div className="p-5">
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-[#6b645a]">Overall Progress</span>
                        <span className="font-medium text-[#2c2824]">{course.progress}%</span>
                      </div>
                      <div className="h-2 bg-[#e8e2d9] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-[#4a6a9b] to-[#6b8cb5] rounded-full transition-all duration-500"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Star size={14} className="text-[#b0a89e]" />
                        <span className="text-xs text-[#6b645a]">
                          Unit {course.currentUnit} of {course.units} completed
                        </span>
                      </div>
                      {course.status === 'completed' && (
                        <div className="flex items-center gap-1">
                          <Award size={14} className="text-[#4a7c5e]" />
                          <span className="text-xs font-medium text-[#4a7c5e]">Completed!</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => navigate(`/student/course/${course.title.toLowerCase().replace(/\s+/g, '-')}`)}
                      className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        course.status === 'completed'
                          ? 'bg-linear-to-r from-[#eef5f0] to-[#e0ebe5] text-[#4a7c5e] hover:from-[#e0ebe5] hover:to-[#d4e5da]'
                          : 'bg-linear-to-r from-[#4a6a9b] to-[#3d5a86] text-white hover:from-[#3d5a86] hover:to-[#2c4a7a] shadow-sm'
                      }`}
                    >
                      {course.status === 'completed' ? 'Review Course' : 'Continue Learning'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={
                activeTab === 'completed'
                  ? <Award size={28} />
                  : activeTab === 'in-progress'
                  ? <Clock size={28} />
                  : <BookOpen size={28} />
              }
              title={
                activeTab === 'completed'
                  ? 'No completed courses yet'
                  : activeTab === 'in-progress'
                  ? 'No courses in progress'
                  : 'No courses enrolled'
              }
              desc={
                activeTab === 'completed'
                  ? 'Finish a course to see it appear here with your certificate.'
                  : activeTab === 'in-progress'
                  ? "You don't have any active courses. Enrol to get started."
                  : "You haven't enrolled in any courses yet. Browse available programmes to begin."
              }
              action={
                activeTab !== 'completed'
                  ? { label: 'Browse Courses →', onClick: () => navigate('/student/courses') }
                  : undefined
              }
            />
          )}

        </div>
      </main>
    </div>
  );
};

export default MyCourses;