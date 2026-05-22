import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Search,
  CheckSquare,
  Bell,
  User,
  Menu,
  GraduationCap,
  Users,
  Plus,
  Edit,
  Trash2,
  Eye,
  Clock,
  TrendingUp,
  Download,
  Check,
  AlertCircle,
} from 'lucide-react';

const ManageCourses = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const courses = [
    { 
      id: 1,
      title: 'Introduction to Artificial Intelligence', 
      code: 'CS-AI101',
      department: 'Technology',
      students: 42, 
      units: 12,
      status: 'Active',
      level: 'Certificate',
      enrolled: 'Jan 2024',
      progress: 78,
    },
    { 
      id: 2,
      title: 'Diploma in Business Administration', 
      code: 'BUS-DBA201',
      department: 'Business',
      students: 78, 
      units: 18,
      status: 'Active',
      level: 'Diploma',
      enrolled: 'Feb 2024',
      progress: 65,
    },
    { 
      id: 3,
      title: 'Social Work & Community Development', 
      code: 'SOC-SW301',
      department: 'Social Sciences',
      students: 55, 
      units: 10,
      status: 'Active',
      level: 'Certificate',
      enrolled: 'Jan 2024',
      progress: 82,
    },
    { 
      id: 4,
      title: 'Hospitality Management', 
      code: 'HOS-HM401',
      department: 'Hospitality',
      students: 34, 
      units: 14,
      status: 'Pending',
      level: 'Diploma',
      enrolled: 'Mar 2024',
      progress: 45,
    },
    { 
      id: 5,
      title: 'Theology & Ministry', 
      code: 'THE-TM501',
      department: 'Theology',
      students: 28, 
      units: 8,
      status: 'Active',
      level: 'Certificate',
      enrolled: 'Feb 2024',
      progress: 91,
    },
  ];

  const handleSignOut = () => {
    navigate('/');
  };

  const handleDeleteClick = (course: any) => {
    setSelectedCourse(course);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    // Handle deletion logic here
    console.log('Deleting course:', selectedCourse);
    setShowDeleteModal(false);
    setSelectedCourse(null);
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || course.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return 'bg-[#eef5f0] text-[#4a7c5e]';
      case 'Pending': return 'bg-[#fef5e8] text-[#d4a34b]';
      default: return 'bg-[#f0ece6] text-[#9b9288]';
    }
  };

  const getLevelColor = (level: string) => {
    switch(level) {
      case 'Diploma': return 'bg-linear-to-r from-[#eef5f0] to-[#ddebe2] text-[#4a7c5e]';
      default: return 'bg-linear-to-r from-[#e8f0fe] to-[#d4e2f7] text-[#4a6a9b]';
    }
  };

  return (
    <div className="flex h-screen bg-[#f8f6f2] overflow-hidden font-['Inter',system-ui,-apple-system,sans-serif]" style={{ fontFamily: "Georgia, serif" }}>
      {/* Sidebar - same refined style */}
      <aside className={`${isSidebarCollapsed ? 'w-20' : 'w-64'} bg-white/40 backdrop-blur-xl text-[#2c2824] flex flex-col shrink-0 border-r border-[#e8e2d9] shadow-sm transition-all duration-300`}>
        {/* Logo area */}
        <div className={`p-6 border-b border-[#e8e2d9] ${isSidebarCollapsed ? 'px-4' : ''}`}>
          <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
            <div className="w-10 h-10 bg-linear-to-br from-[#4a6a9b] to-[#2c4a7a] rounded-xl flex items-center justify-center shadow-sm shrink-0">
              <GraduationCap size={20} className="text-white" />
            </div>
            {!isSidebarCollapsed && (
              <div>
                <div className="font-semibold text-xl tracking-tight bg-linear-to-r from-[#2c2824] to-[#5a5248] bg-clip-text text-transparent">Inleed</div>
                <div className="text-[10px] tracking-[0.2em] text-[#9b9288] uppercase">Admin Portal</div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className={`text-[10px] tracking-[0.2em] text-[#b0a89e] uppercase mb-3 ${isSidebarCollapsed ? 'text-center px-1' : 'px-3'}`}>
            {!isSidebarCollapsed ? 'Main' : '≡'}
          </div>
          <ul className="space-y-1.5">
            {[
              { icon: <Menu size={18} />, label: "Dashboard", path: "/admin/dashboard" },
              { icon: <Users size={18} />, label: "Students", path: "/admin/students" },
              { icon: <BookOpen size={18} />, label: "Courses", path: "/admin/courses", active: true },
              { icon: <CheckSquare size={18} />, label: "Approvals", path: "/admin/approvals" },
            ].map((item, idx) => (
              <li key={idx}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-2.5 rounded-xl transition-all duration-200 ${
                    item.active 
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
            {!isSidebarCollapsed ? 'Management' : '📋'}
          </div>
          <ul className="space-y-1.5">
            {[
              { icon: <Clock size={18} />, label: "Schedule", path: "/admin/schedule" },
              { icon: <TrendingUp size={18} />, label: "Analytics", path: "/admin/analytics" },
              { icon: <SettingsIcon size={18} />, label: "Settings", path: "/admin/settings" },
            ].map((item, idx) => (
              <li key={idx}>
                <button
                  onClick={() => navigate(item.path)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#6b645a] hover:bg-[#eae5dd] hover:text-[#2c2824] transition-all duration-200"
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
              { icon: <Bell size={18} />, label: "Notifications", path: "/notifications" },
              { icon: <User size={18} />, label: "Profile", path: "/profile" },
            ].map((item, idx) => (
              <li key={idx}>
                <button
                  onClick={() => navigate(item.path)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#6b645a] hover:bg-[#eae5dd] hover:text-[#2c2824] transition-all duration-200"
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
        {/* Header */}
        <header className="bg-white/60 backdrop-blur-md border-b border-[#e8e2d9] px-8 py-4 sticky top-0 z-20">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs text-[#9b9288] tracking-wide">Course management</p>
              <h1 className="text-2xl font-semibold text-[#2c2824] tracking-tight">Manage Courses</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="pl-10 pr-4 py-2.5 bg-white/80 border border-[#e0d9d0] rounded-xl w-80 focus:outline-none focus:ring-2 focus:ring-[#4a6a9b]/20 focus:border-[#4a6a9b]/30 text-sm text-[#2c2824] placeholder:text-[#b0a89e] transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search size={16} className="absolute left-3 top-3 text-[#b0a89e]" />
              </div>
              <button className="w-10 h-10 rounded-xl border border-[#e0d9d0] bg-white/60 hover:bg-white transition flex items-center justify-center text-[#6b645a] hover:text-[#2c2824] relative">
                <Bell size={16} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#d4a34b] rounded-full"></span>
              </button>
              <div className="w-10 h-10 bg-linear-to-br from-[#4a6a9b] to-[#2c4a7a] rounded-xl flex items-center justify-center text-white font-semibold shadow-sm text-sm">AD</div>
            </div>
          </div>
        </header>

          {/* Course Management Content */}
          <div className="p-8">
            {/* Header Section */}
            <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
            <div>
              <p className="text-xs text-[#9b9288] tracking-wide">All programmes</p>
              <h2 className="text-xl font-semibold text-[#2c2824] tracking-tight mt-1">
                Course Catalog
              </h2>
            </div>
            <button 
              onClick={() => navigate('/admin/courses/new')}
              className="px-5 py-2.5 bg-linear-to-r from-[#4a6a9b] to-[#3d5a86] text-white rounded-lg text-sm font-medium hover:from-[#3d5a86] hover:to-[#2c4a7a] transition shadow-sm flex items-center gap-2"
            >
              <Plus size={16} />
              New Course
            </button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#b0a89e]">Active Courses</p>
                  <p className="text-2xl font-semibold text-[#2c2824] mt-1">{courses.filter(c => c.status === 'Active').length}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-[#eef5f0] to-[#ddebe2] flex items-center justify-center">
                  <Check size={18} className="text-[#4a7c5e]" />
                </div>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-[#e8e2d9] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#b0a89e]">Total Students</p>
                  <p className="text-2xl font-semibold text-[#2c2824] mt-1">237</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-[#f3eef9] to-[#e8e0f2] flex items-center justify-center">
                  <Users size={18} className="text-[#7a5b9e]" />
                </div>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-[#e8e2d9] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#b0a89e]">Completion Rate</p>
                  <p className="text-2xl font-semibold text-[#2c2824] mt-1">72%</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-[#fef5e8] to-[#faeedc] flex items-center justify-center">
                  <TrendingUp size={18} className="text-[#d4a34b]" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <div className="flex gap-2">
              {['all', 'Active', 'Pending'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status.toLowerCase())}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    filterStatus === status.toLowerCase()
                      ? 'bg-[#4a6a9b] text-white shadow-sm'
                      : 'bg-white/60 text-[#6b645a] hover:bg-[#eae5dd] border border-[#e8e2d9]'
                  }`}
                >
                  {status === 'all' ? 'All Courses' : status}
                </button>
              ))}
            </div>
            <button className="text-xs text-[#6b645a] hover:text-[#2c2824] transition flex items-center gap-1">
              <Download size={12} />
              Export List
            </button>
          </div>

          {/* Courses Table */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#e8e2d9] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#faf8f5] border-b border-[#e8e2d9]">
                  <tr>
                    <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] font-medium">Course</th>
                    <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] font-medium">Code</th>
                    <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] font-medium">Department</th>
                    <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] font-medium">Students</th>
                    <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] font-medium">Units</th>
                    <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] font-medium">Status</th>
                    <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] font-medium">Level</th>
                    <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((course, idx) => (
                    <tr key={idx} className="border-b border-[#e8e2d9] hover:bg-[#faf8f5] transition-colors group">
                      <td className="px-5 py-3">
                        <div>
                          <p className="text-sm font-medium text-[#2c2824]">{course.title}</p>
                          <p className="text-[10px] text-[#9b9288] mt-0.5">Enrolled: {course.enrolled}</p>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <code className="text-xs font-mono text-[#6b645a]">{course.code}</code>
                      </td>
                      <td className="px-5 py-3 text-sm text-[#6b645a]">{course.department}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-[#2c2824]">{course.students}</span>
                          <div className="w-16 h-1.5 bg-[#e8e2d9] rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-linear-to-r from-[#4a6a9b] to-[#6b8cb5] rounded-full"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-sm text-[#6b645a]">{course.units}</td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(course.status)}`}>
                          {course.status}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${getLevelColor(course.level)}`}>
                          {course.level}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => navigate(`/admin/courses/${course.id}`)}
                            className="p-1.5 rounded-lg text-[#9b9288] hover:text-[#4a6a9b] hover:bg-[#e8f0fe] transition"
                            title="View Course"
                          >
                            <Eye size={14} />
                          </button>
                          <button 
                            onClick={() => navigate(`/admin/courses/${course.id}/edit`)}
                            className="p-1.5 rounded-lg text-[#9b9288] hover:text-[#4a7c5e] hover:bg-[#eef5f0] transition"
                            title="Edit Course"
                          >
                            <Edit size={14} />
                          </button>
                          <button 
                            onClick={() => handleDeleteClick(course)}
                            className="p-1.5 rounded-lg text-[#9b9288] hover:text-[#d4a34b] hover:bg-[#fef5e8] transition"
                            title="Delete Course"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-linear-to-br from-[#e8f0fe] to-[#d4e2f7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen size={28} className="text-[#4a6a9b]" />
                </div>
                <h3 className="text-lg font-medium text-[#2c2824] mb-2">No courses found</h3>
                <p className="text-sm text-[#9b9288] mb-6">Try adjusting your search or filter criteria.</p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setFilterStatus('all');
                  }}
                  className="px-5 py-2.5 bg-linear-to-r from-[#4a6a9b] to-[#3d5a86] text-white rounded-lg text-sm font-medium hover:from-[#3d5a86] hover:to-[#2c4a7a] transition shadow-sm"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#fef5e8] flex items-center justify-center">
                  <AlertCircle size={20} className="text-[#d4a34b]" />
                </div>
                <h3 className="text-lg font-semibold text-[#2c2824]">Delete Course</h3>
              </div>
              <p className="text-sm text-[#6b645a] mb-6">
                Are you sure you want to delete <span className="font-medium text-[#2c2824]">"{selectedCourse?.title}"</span>? 
                This action cannot be undone and will remove all associated data.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-[#e0d9d0] text-[#6b645a] hover:bg-[#faf8f5] transition text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-linear-to-r from-[#d4a34b] to-[#b8893a] text-white hover:from-[#b8893a] hover:to-[#9a7530] transition text-sm font-medium"
                >
                  Delete Course
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Settings Icon component
const SettingsIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

export default ManageCourses;