import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  BookOpen,
  Search,
  Menu,
  Clock,
  Users,
  Briefcase,
  Heart,
  Cpu,
  Church,
  Coffee,
  Filter,
  LayoutGrid,
  List,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

const CourseView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Complete course data
  const allCourses = [
    // Certificates
    {
      id: 1,
      title: 'Hospitality and Hotel Management',
      level: 'Certificate',
      department: 'Hospitality',
      description: 'Learn the essentials of hotel operations, guest services, food and beverage management, and event planning.',
      duration: '6 months',
      enrolled: 0,
      icon: Coffee,
    },
    {
      id: 2,
      title: 'Business Administration',
      level: 'Certificate',
      department: 'Business',
      description: 'Build a solid foundation in business principles including management, marketing, accounting, and entrepreneurship.',
      duration: '6 months',
      enrolled: 0,
      icon: Briefcase,
    },
    {
      id: 3,
      title: 'Computer Studies',
      level: 'Certificate',
      department: 'Technology',
      description: 'A practical introduction to computing fundamentals, programming basics, networking, and office applications.',
      duration: '6 months',
      enrolled: 0,
      icon: Cpu,
    },
    {
      id: 4,
      title: 'Social Work and Community Development',
      level: 'Certificate',
      department: 'Social Science',
      description: 'Gain the knowledge and skills to support individuals and communities in need.',
      duration: '6 months',
      enrolled: 0,
      icon: Heart,
    },
    {
      id: 5,
      title: 'Theology',
      level: 'Certificate',
      department: 'Theology',
      description: 'A comprehensive study of religious thought, biblical hermeneutics, church history, and pastoral ministry.',
      duration: '6 months',
      enrolled: 0,
      icon: Church,
    },
    {
      id: 6,
      title: 'Introduction to AI',
      level: 'Certificate',
      department: 'Technology',
      description: 'Explore the foundations of artificial intelligence, machine learning concepts, and practical applications.',
      duration: '6 months',
      enrolled: 0,
      icon: Sparkles,
    },
    // Diplomas
    {
      id: 7,
      title: 'Diploma in Social Work and Community Development',
      level: 'Diploma',
      department: 'Social Science',
      description: 'Advanced study in social welfare policy, human rights, project management, and community empowerment.',
      duration: '12 months',
      enrolled: 0,
      icon: Users,
    },
    {
      id: 8,
      title: 'Diploma in Hospitality and Hotel Management',
      level: 'Diploma',
      department: 'Hospitality',
      description: 'Professional hospitality management covering resort operations, revenue management, and conference services.',
      duration: '12 months',
      enrolled: 0,
      icon: Coffee,
    },
    {
      id: 9,
      title: 'Diploma in AI',
      level: 'Diploma',
      department: 'Technology',
      description: 'In-depth diploma programme covering advanced machine learning, neural networks, and AI project deployment.',
      duration: '12 months',
      enrolled: 0,
      icon: Cpu,
    },
    {
      id: 10,
      title: 'Diploma in AI for Digital Work',
      level: 'Diploma',
      department: 'Technology',
      description: 'Practical AI tools for the modern workplace: automation, AI-assisted design, and data-driven decision making.',
      duration: '12 months',
      enrolled: 0,
      icon: Sparkles,
    },
    {
      id: 11,
      title: 'Diploma in Theology',
      level: 'Diploma',
      department: 'Theology',
      description: 'Advanced theological education covering systematic theology, missiology, leadership, and practical ministry.',
      duration: '12 months',
      enrolled: 0,
      icon: Church,
    },
    {
      id: 12,
      title: 'Diploma in Computer Studies',
      level: 'Diploma',
      department: 'Technology',
      description: 'Advanced computing covering software development, database management, and cybersecurity fundamentals.',
      duration: '12 months',
      enrolled: 0,
      icon: Cpu,
    },
    {
      id: 13,
      title: 'Diploma in Business Administration',
      level: 'Diploma',
      department: 'Business',
      description: 'Comprehensive business management covering strategic management, finance, human resources, and operations.',
      duration: '12 months',
      enrolled: 0,
      icon: Briefcase,
    },
  ];

  // Filter courses
  const filteredCourses = allCourses.filter(course => {
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const handleSignOut = () => {
    navigate('/');
  };

  const getLevelBadgeStyle = (level: string) => {
    return level === 'Diploma'
      ? 'bg-amber-50/80 text-amber-700 border-amber-200/50'
      : 'bg-blue-50/80 text-blue-700 border-blue-200/50';
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#f8f6f2] to-[#f0ede8] overflow-hidden font-['Inter',system-ui,-apple-system,sans-serif]" style={{ fontFamily: "Georgia, serif" }}>
      {/* Sidebar */}
      <aside className={`${isSidebarCollapsed ? 'w-20' : 'w-64'} bg-white/60 backdrop-blur-xl text-[#2c2824] flex flex-col shrink-0 border-r border-[#e8e2d9] shadow-sm transition-all duration-300`}>
        <div className="p-6 border-b border-[#e8e2d9]">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Trilevel Logo" className="w-12 h-12 object-contain" />
            {!isSidebarCollapsed && (
              <div>
                <div className="font-semibold text-lg tracking-tight text-[#2c2824]">Trilevel College</div>
                <div className="text-[10px] tracking-[0.2em] text-[#9b9288] uppercase">Student Portal</div>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className={`text-[10px] tracking-[0.2em] text-[#b0a89e] uppercase mb-3 ${isSidebarCollapsed ? 'text-center' : 'px-3'}`}>
            {!isSidebarCollapsed ? 'Menu' : '≡'}
          </div>
          <ul className="space-y-1.5">
            {[
              { icon: <Menu size={18} />, label: "Dashboard", path: "/student/dashboard" },
              { icon: <BookOpen size={18} />, label: "My Courses", path: "/student/my-courses" },
              { icon: <Search size={18} />, label: "Browse Courses", path: "/student/courses" },
            ].map((item, idx) => (
              <li key={idx}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-2.5 rounded-xl transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-[#4a6a9b]/10 text-[#2c4a7a] font-medium' 
                      : 'text-[#6b645a] hover:bg-white/50 hover:text-[#2c2824]'
                  }`}
                >
                  {item.icon}
                  {!isSidebarCollapsed && <span>{item.label}</span>}
                </button>
              </li>
            ))}
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
            {!isSidebarCollapsed && "Collapse"}
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
        <div className="px-8 py-6 w-full">
          {/* Header Section */}
          <div className="mb-6">
            
            <p className="text-sm text-[#6b645a]">Explore our comprehensive range of certificate and diploma programs</p>
          </div>

          

          {/* Filters Bar - Compact */}
          <div className="bg-white rounded-lg border border-[#e8e2d9] p-3 mb-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-[#9b9288]" />
                <span className="text-xs font-medium text-[#6b645a]">Filter by:</span>
                <div className="flex gap-1.5">
                  {['all', 'Certificate', 'Diploma'].map(level => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(level)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                        selectedLevel === level
                          ? 'bg-[#2c2824] text-white shadow-sm'
                          : 'bg-gray-50 text-[#6b645a] hover:bg-gray-100 border border-[#e8e2d9]'
                      }`}
                    >
                      {level === 'all' ? 'All Programs' : level}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {/* View Toggle */}
                <div className="flex gap-1 bg-gray-50 rounded-lg border border-[#e8e2d9] p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1 rounded transition-all ${viewMode === 'grid' ? 'bg-white text-[#2c2824] shadow-sm' : 'text-[#b0a89e]'}`}
                  >
                    <LayoutGrid size={14} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1 rounded transition-all ${viewMode === 'list' ? 'bg-white text-[#2c2824] shadow-sm' : 'text-[#b0a89e]'}`}
                  >
                    <List size={14} />
                  </button>
                </div>
                
                {/* Search */}
                <div className="relative">
                  <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#b0a89e]" />
                  <input
                    type="text"
                    placeholder="Search programs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1 text-xs border border-[#e8e2d9] rounded-lg w-56 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#2c2824]/10 focus:border-[#2c2824]/30 focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4">
            <p className="text-xs text-[#9b9288]">
              Showing <span className="font-semibold text-[#2c2824]">{filteredCourses.length}</span> programs
            </p>
          </div>

          {/* Courses Grid - Optimized card size */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => navigate(`/student/course/${course.id}`)}
                  className="group bg-white rounded-lg border border-[#e8e2d9] hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden relative"
                >
                  {/* Subtle top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4a6a9b]/0 via-[#4a6a9b]/40 to-[#4a6a9b]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="p-4">
                    {/* Header with Icon and Badge */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#4a6a9b]/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-50 to-white border border-[#e8e2d9] flex items-center justify-center shadow-sm group-hover:shadow transition-all">
                          <course.icon size={18} className="text-[#6b645a] group-hover:text-[#4a6a9b] transition-colors duration-300" />
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium border backdrop-blur-sm ${getLevelBadgeStyle(course.level)}`}>
                        {course.level}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-semibold text-base text-[#2c2824] mb-2 leading-tight group-hover:text-[#4a6a9b] transition-colors duration-300 line-clamp-2">
                      {course.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-xs text-[#6b645a] mb-3 leading-relaxed line-clamp-2">
                      {course.description}
                    </p>
                    
                    {/* Meta Info */}
                    <div className="flex items-center justify-between pt-3 border-t border-[#e8e2d9]">
                      <div className="flex items-center gap-3 text-xs text-[#9b9288]">
                        <div className="flex items-center gap-1.5 group-hover:text-[#6b645a] transition-colors">
                          <Clock size={12} />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5 group-hover:text-[#6b645a] transition-colors">
                          <Users size={12} />
                          <span>{course.enrolled}</span>
                        </div>
                      </div>
                      <button className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#e8e2d9] rounded-md text-xs font-medium text-[#6b645a] hover:bg-[#2c2824] hover:text-white hover:border-[#2c2824] transition-all duration-300 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 translate-x-1">
                        View
                        <ChevronRight size={10} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // List View - Compact
            <div className="space-y-2">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => navigate(`/student/course/${course.id}`)}
                  className="group bg-white rounded-lg border border-[#e8e2d9] hover:shadow-md transition-all duration-300 cursor-pointer relative overflow-hidden"
                >
                  {/* Subtle left accent bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#4a6a9b] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="flex items-start gap-4 p-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#4a6a9b]/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-50 to-white border border-[#e8e2d9] flex items-center justify-center shadow-sm group-hover:shadow transition-all">
                        <course.icon size={18} className="text-[#6b645a] group-hover:text-[#4a6a9b] transition-colors duration-300" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <h3 className="font-semibold text-[#2c2824] text-sm group-hover:text-[#4a6a9b] transition-colors duration-300">
                          {course.title}
                        </h3>
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium border backdrop-blur-sm ${getLevelBadgeStyle(course.level)}`}>
                          {course.level}
                        </span>
                      </div>
                      <p className="text-xs text-[#6b645a] mb-2 line-clamp-1">
                        {course.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-[#9b9288]">
                        <div className="flex items-center gap-1.5">
                          <Clock size={11} />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users size={11} />
                          <span>{course.enrolled} enrolled</span>
                        </div>
                      </div>
                    </div>
                    
                    <ChevronRight size={14} className="text-[#b0a89e] group-hover:text-[#4a6a9b] group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg border border-[#e8e2d9]">
              <BookOpen size={40} className="mx-auto text-[#b0a89e] mb-3" />
              <h3 className="text-base font-semibold text-[#2c2824] mb-1">No programs found</h3>
              <p className="text-xs text-[#6b645a]">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CourseView;