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

const MyCourses = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const courses = [
    {
      title: 'Introduction to Artificial Intelligence',
      department: 'Technology',
      description: 'Fundamentals of AI, machine learning concepts, and real-world applications across Africa.',
      progress: 68,
      type: 'Certificate' as const,
      units: 12,
      currentUnit: 7,
      status: 'in-progress',
    },
    {
      title: 'Diploma in Business Administration',
      department: 'Business',
      description: 'Strategic management, financial literacy, marketing and modern entrepreneurship.',
      progress: 41,
      type: 'Diploma' as const,
      units: 18,
      currentUnit: 5,
      status: 'in-progress',
    },
    {
      title: 'Social Work & Community Development',
      department: 'Social Sciences',
      description: 'Community engagement, welfare policy, social service delivery and advocacy.',
      progress: 82,
      type: 'Certificate' as const,
      units: 10,
      currentUnit: 9,
      status: 'in-progress',
    },
    {
      title: 'Theology',
      department: 'Theology',
      description: 'Biblical studies, church history and pastoral ministry.',
      progress: 100,
      type: 'Certificate' as const,
      units: 8,
      currentUnit: 8,
      status: 'completed',
    },
  ];

  const handleSignOut = () => {
    navigate('/');
  };

  const filteredCourses = courses.filter(course => {
    if (activeTab === 'all') return true;
    if (activeTab === 'in-progress') return course.status === 'in-progress';
    if (activeTab === 'completed') return course.status === 'completed';
    return true;
  });

  const getStatusCount = (status: string) => {
    if (status === 'all') return courses.length;
    return courses.filter(c => c.status === status).length;
  };

  return (
    <div className="flex h-screen bg-[#f8f6f2] overflow-hidden font-['Inter',system-ui,-apple-system,sans-serif]" style={{ fontFamily: "Georgia, serif" }}>
      {/* Sidebar - same refined style as Dashboard */}
      <aside className={`${isSidebarCollapsed ? 'w-20' : 'w-64'} bg-white/40 backdrop-blur-xl text-[#2c2824] flex flex-col shrink-0 border-r border-[#e8e2d9] shadow-sm transition-all duration-300`}>
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

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className={`text-[10px] tracking-[0.2em] text-[#b0a89e] uppercase mb-3 ${isSidebarCollapsed ? 'text-center px-1' : 'px-3'}`}>
            {!isSidebarCollapsed ? 'Main' : '≡'}
          </div>
          <ul className="space-y-1.5">
            {[
              { icon: <Menu size={18} />, label: "Dashboard", path: "/student/dashboard" },
              { icon: <BookOpen size={18} />, label: "My Courses", path: "/student/my-courses" },
              { icon: <Search size={18} />, label:  "Courses ", path: "/student/course-view" },
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
            {[
              
              { icon: <User size={18} />, label: "Profile", path: "/student/profile" },
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
        </nav>

        {/* Footer */}
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
        {/* Courses Content */}
        <div className="p-8">
          {/* Header Section */}
          <div className="mb-6">
            <p className="text-xs text-[#9b9288] tracking-wide">Manage your enrollment</p>
            <h2 className="text-xl font-semibold text-[#2c2824] tracking-tight mt-1">
              My Courses
            </h2>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-[#e8e2d9] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#b0a89e]">Total Courses</p>
                  <p className="text-2xl font-semibold text-[#2c2824] mt-1">{courses.length}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-[#e8f0fe] to-[#d4e2f7] flex items-center justify-center">
                  <BookOpen size={18} className="text-[#4a6a9b]" />
                </div>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-[#e8e2d9] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#b0a89e]">In Progress</p>
                  <p className="text-2xl font-semibold text-[#2c2824] mt-1">{courses.filter(c => c.status === 'in-progress').length}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-[#eef5f0] to-[#ddebe2] flex items-center justify-center">
                  <Clock size={18} className="text-[#4a7c5e]" />
                </div>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-[#e8e2d9] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#b0a89e]">Completed</p>
                  <p className="text-2xl font-semibold text-[#2c2824] mt-1">{courses.filter(c => c.status === 'completed').length}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-[#f3eef9] to-[#e8e0f2] flex items-center justify-center">
                  <Award size={18} className="text-[#7a5b9e]" />
                </div>
              </div>
            </div>
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
                  activeTab === tab.id
                    ? 'bg-[#4a6a9b]/10 text-[#2c4a7a]'
                    : 'bg-[#f0ece6] text-[#9b9288]'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Courses Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course.title}
                  className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#e8e2d9] overflow-hidden hover:shadow-md transition-all duration-200 group"
                >
                  {/* Course Header */}
                  <div className="p-5 border-b border-[#e8e2d9] bg-linear-to-r from-[#faf8f5] to-white">
                    <div className="flex items-start justify-between mb-3">
                      <div>
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
                      <ChevronRight size={18} className="text-[#c0b8ae] group-hover:text-[#4a6a9b] transition-colors" />
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
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-[#e8e2d9] p-12 text-center">
              <div className="w-16 h-16 bg-linear-to-br from-[#e8f0fe] to-[#d4e2f7] rounded-xl flex items-center justify-center mx-auto mb-4">
                <BookOpen size={28} className="text-[#4a6a9b]" />
              </div>
              <h3 className="text-lg font-medium text-[#2c2824] mb-2">No courses found</h3>
              <p className="text-sm text-[#9b9288] mb-6">You don't have any {activeTab === 'in-progress' ? 'in-progress' : activeTab === 'completed' ? 'completed' : ''} courses yet.</p>
              <button 
                onClick={() => navigate('/student/courses')}
                className="px-5 py-2.5 bg-linear-to-r from-[#4a6a9b] to-[#3d5a86] text-white rounded-lg text-sm font-medium hover:from-[#3d5a86] hover:to-[#2c4a7a] transition shadow-sm"
              >
                Browse Courses
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyCourses;