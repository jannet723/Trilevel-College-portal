import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  BookOpen,
  Search,
  CheckSquare,
  Users,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  Download,
  Check,
  AlertCircle,
  Award,
  Menu,
  Bell,
  User,
  Calendar,
  Clock,
} from 'lucide-react';

const ManageStudents = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterYear, setFilterYear] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const students = [
    {
      name: 'Jane Wanjiku',
      id: 'TLC/2024/0078',
      email: 'jane.wanjiku@student.trilevel.ac.ke',
      phone: '+254 712 345 678',
      programme: 'Introduction to AI',
      programmeCode: 'CS-AI101',
      year: 'Year 1',
      status: 'Active',
      enrollmentDate: 'Jan 15, 2024',
      avatar: 'JW',
      performance: 85,
    },
    {
      name: 'Amina Hassan',
      id: 'TLC/2024/0081',
      email: 'amina.hassan@student.trilevel.ac.ke',
      phone: '+254 723 456 789',
      programme: 'Diploma in AI',
      programmeCode: 'CS-DAI201',
      year: 'Year 1',
      status: 'Active',
      enrollmentDate: 'Feb 1, 2024',
      avatar: 'AH',
      performance: 92,
    },
    {
      name: 'Peter Kamau',
      id: 'TLC/2024/0085',
      email: 'peter.kamau@student.trilevel.ac.ke',
      phone: '+254 734 567 890',
      programme: 'Business Administration',
      programmeCode: 'BUS-DBA201',
      year: 'Year 1',
      status: 'Pending',
      enrollmentDate: 'Feb 10, 2024',
      avatar: 'PK',
      performance: 0,
    },
    {
      name: 'Grace Odhiambo',
      id: 'TLC/2023/0042',
      email: 'grace.odhiambo@student.trilevel.ac.ke',
      phone: '+254 745 678 901',
      programme: 'Social Work & Community Dev.',
      programmeCode: 'SOC-SW301',
      year: 'Year 2',
      status: 'Active',
      enrollmentDate: 'Sep 5, 2023',
      avatar: 'GO',
      performance: 78,
    },
    {
      name: 'Faith Njeri',
      id: 'TLC/2023/0051',
      email: 'faith.njeri@student.trilevel.ac.ke',
      phone: '+254 756 789 012',
      programme: 'Computer Studies',
      programmeCode: 'CS-CS151',
      year: 'Year 2',
      status: 'Active',
      enrollmentDate: 'Sep 12, 2023',
      avatar: 'FN',
      performance: 88,
    },
    {
      name: 'Brian Mutua',
      id: 'TLC/2024/0092',
      email: 'brian.mutua@student.trilevel.ac.ke',
      phone: '+254 767 890 123',
      programme: 'Hospitality Management',
      programmeCode: 'HOS-HM401',
      year: 'Year 1',
      status: 'Active',
      enrollmentDate: 'Mar 1, 2024',
      avatar: 'BM',
      performance: 76,
    },
    {
      name: 'John Otieno',
      id: 'TLC/2023/0063',
      email: 'john.otieno@student.trilevel.ac.ke',
      phone: '+254 778 901 234',
      programme: 'Theology',
      programmeCode: 'THE-TM501',
      year: 'Year 2',
      status: 'Inactive',
      enrollmentDate: 'Oct 10, 2023',
      avatar: 'JO',
      performance: 45,
    },
  ];

  const handleSignOut = () => {
    navigate('/');
  };

  const handleDeleteClick = (student: any) => {
    setSelectedStudent(student);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    console.log('Deleting student:', selectedStudent);
    setShowDeleteModal(false);
    setSelectedStudent(null);
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.programme.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    const matchesYear = filterYear === 'all' || student.year === filterYear;
    return matchesSearch && matchesStatus && matchesYear;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return 'bg-[#eef5f0] text-[#4a7c5e]';
      case 'Pending': return 'bg-[#fef5e8] text-[#d4a34b]';
      case 'Inactive': return 'bg-[#f0ece6] text-[#9b9288]';
      default: return 'bg-[#f0ece6] text-[#9b9288]';
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 80) return 'text-[#4a7c5e]';
    if (performance >= 60) return 'text-[#4a6a9b]';
    if (performance >= 40) return 'text-[#d4a34b]';
    return 'text-[#9b9288]';
  };

  const years = ['all', 'Year 1', 'Year 2', 'Year 3'];
  const statuses = ['all', 'Active', 'Pending', 'Inactive'];

  return (
    <div className="flex h-screen bg-[#f8f6f2] overflow-hidden font-['Inter',system-ui,-apple-system,sans-serif]"  style={{ fontFamily: "Georgia, serif" }}>
      {/* Sidebar - same refined style */}
      <aside className={`${isSidebarCollapsed ? 'w-20' : 'w-64'} bg-white/40 backdrop-blur-xl text-[#2c2824] flex flex-col shrink-0 border-r border-[#e8e2d9] shadow-sm transition-all duration-300`}>
        {/* Logo area */}
        <div className={`p-6 border-b border-[#e8e2d9] ${isSidebarCollapsed ? 'px-4' : ''}`}>
          <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
            <div className="w-10 h-10 bg-linear-to-br from-[#4a6a9b] to-[#2c4a7a] rounded-xl flex items-center justify-center shadow-sm shrink-0">
              <img src="/logo.png" alt="Trilevel Logo" className="w-10 h-10 object-contain" />
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
              { icon: <Users size={18} />, label: "Students", path: "/admin/manage-students" },
              { icon: <BookOpen size={18} />, label: "Courses", path: "/admin/manage-courses" },
              { icon: <CheckSquare size={18} />, label: "Approvals", path: "/admin/approvals" },
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
              { icon: <Bell size={18} />, label: "Notifications", path: "/admin/notifications" },
              { icon: <User size={18} />, label: "Profile", path: "/admin/profile" },
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
        {/* Header */}
        <header className="bg-white/60 backdrop-blur-md border-b border-[#e8e2d9] px-8 py-4 sticky top-0 z-20">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs text-[#9b9288] tracking-wide">Student management</p>
              <h1 className="text-2xl font-semibold text-[#2c2824] tracking-tight">Manage Students</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search students..."
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

        {/* Student Management Content */}
        <div className="p-8">
          {/* Header Section */}
          <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
            <div>
              <p className="text-xs text-[#9b9288] tracking-wide">All enrolled students</p>
              <h2 className="text-xl font-semibold text-[#2c2824] tracking-tight mt-1">
                Student Directory
              </h2>
            </div>
            <button 
              onClick={() => navigate('/admin/students/new')}
              className="px-5 py-2.5 bg-linear-to-r from-[#4a6a9b] to-[#3d5a86] text-white rounded-lg text-sm font-medium hover:from-[#3d5a86] hover:to-[#2c4a7a] transition shadow-sm flex items-center gap-2"
            >
              <Plus size={16} />
              Add Student
            </button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-[#e8e2d9] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#b0a89e]">Total Students</p>
                  <p className="text-2xl font-semibold text-[#2c2824] mt-1">{students.length}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-[#e8f0fe] to-[#d4e2f7] flex items-center justify-center">
                  <Users size={18} className="text-[#4a6a9b]" />
                </div>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-[#e8e2d9] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#b0a89e]">Active Students</p>
                  <p className="text-2xl font-semibold text-[#2c2824] mt-1">{students.filter(s => s.status === 'Active').length}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-[#eef5f0] to-[#ddebe2] flex items-center justify-center">
                  <Check size={18} className="text-[#4a7c5e]" />
                </div>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-[#e8e2d9] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#b0a89e]">Pending Approvals</p>
                  <p className="text-2xl font-semibold text-[#2c2824] mt-1">{students.filter(s => s.status === 'Pending').length}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-[#fef5e8] to-[#faeedc] flex items-center justify-center">
                  <Clock size={18} className="text-[#d4a34b]" />
                </div>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-[#e8e2d9] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#b0a89e]">Avg Performance</p>
                  <p className="text-2xl font-semibold text-[#2c2824] mt-1">78%</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-[#f3eef9] to-[#e8e0f2] flex items-center justify-center">
                  <Award size={18} className="text-[#7a5b9e]" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Filter size={14} className="text-[#9b9288]" />
                <span className="text-xs text-[#6b645a]">Status:</span>
                <div className="flex gap-1">
                  {statuses.map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status.toLowerCase())}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                        filterStatus === status.toLowerCase()
                          ? 'bg-[#4a6a9b] text-white shadow-sm'
                          : 'bg-white/60 text-[#6b645a] hover:bg-[#eae5dd] border border-[#e8e2d9]'
                      }`}
                    >
                      {status === 'all' ? 'All' : status}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-[#9b9288]" />
                <span className="text-xs text-[#6b645a]">Year:</span>
                <div className="flex gap-1">
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => setFilterYear(year.toLowerCase())}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                        filterYear === year.toLowerCase()
                          ? 'bg-[#4a6a9b] text-white shadow-sm'
                          : 'bg-white/60 text-[#6b645a] hover:bg-[#eae5dd] border border-[#e8e2d9]'
                      }`}
                    >
                      {year === 'all' ? 'All Years' : year}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button className="text-xs text-[#6b645a] hover:text-[#2c2824] transition flex items-center gap-1">
              <Download size={12} />
              Export List
            </button>
          </div>

          {/* Students Table */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#e8e2d9] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#faf8f5] border-b border-[#e8e2d9]">
                  <tr>
                    <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] font-medium">Student</th>
                    <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] font-medium">Student ID</th>
                    <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] font-medium">Programme</th>
                    <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] font-medium">Year</th>
                    <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] font-medium">Status</th>
                    <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] font-medium">Performance</th>
                    <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, idx) => (
                    <tr key={idx} className="border-b border-[#e8e2d9] hover:bg-[#faf8f5] transition-colors group">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-linear-to-br from-[#4a6a9b] to-[#2c4a7a] flex items-center justify-center text-white text-xs font-medium shadow-sm">
                            {student.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#2c2824]">{student.name}</p>
                            <p className="text-[10px] text-[#9b9288]">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <code className="text-xs font-mono text-[#6b645a]">{student.id}</code>
                        <p className="text-[10px] text-[#9b9288] mt-0.5">Enrolled: {student.enrollmentDate}</p>
                      </td>
                      <td className="px-5 py-3">
                        <p className="text-sm text-[#2c2824]">{student.programme}</p>
                        <code className="text-[10px] font-mono text-[#9b9288]">{student.programmeCode}</code>
                      </td>
                      <td className="px-5 py-3 text-sm text-[#6b645a]">{student.year}</td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(student.status)}`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        {student.performance > 0 ? (
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-medium ${getPerformanceColor(student.performance)}`}>
                              {student.performance}%
                            </span>
                            <div className="w-16 h-1.5 bg-[#e8e2d9] rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-linear-to-r from-[#4a6a9b] to-[#6b8cb5] rounded-full"
                                style={{ width: `${student.performance}%` }}
                              />
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-[#9b9288]">Not started</span>
                        )}
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => navigate(`/admin/students/${student.id}`)}
                            className="p-1.5 rounded-lg text-[#9b9288] hover:text-[#4a6a9b] hover:bg-[#e8f0fe] transition"
                            title="View Student"
                          >
                            <Eye size={14} />
                          </button>
                          <button 
                            onClick={() => navigate(`/admin/students/${student.id}/edit`)}
                            className="p-1.5 rounded-lg text-[#9b9288] hover:text-[#4a7c5e] hover:bg-[#eef5f0] transition"
                            title="Edit Student"
                          >
                            <Edit size={14} />
                          </button>
                          <button 
                            onClick={() => handleDeleteClick(student)}
                            className="p-1.5 rounded-lg text-[#9b9288] hover:text-[#d4a34b] hover:bg-[#fef5e8] transition"
                            title="Delete Student"
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
            {filteredStudents.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-linear-to-br from-[#e8f0fe] to-[#d4e2f7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users size={28} className="text-[#4a6a9b]" />
                </div>
                <h3 className="text-lg font-medium text-[#2c2824] mb-2">No students found</h3>
                <p className="text-sm text-[#9b9288] mb-6">Try adjusting your search or filter criteria.</p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setFilterStatus('all');
                    setFilterYear('all');
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
                <h3 className="text-lg font-semibold text-[#2c2824]">Delete Student</h3>
              </div>
              <p className="text-sm text-[#6b645a] mb-6">
                Are you sure you want to delete <span className="font-medium text-[#2c2824]">"{selectedStudent?.name}"</span>? 
                This action cannot be undone and will remove all associated data including enrollments and grades.
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
                  Delete Student
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStudents;