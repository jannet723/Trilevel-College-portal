import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  BookOpen,
  Menu,
  GraduationCap,
  Users,
  Clock,
  BookMarked,
  BarChart3,
  TrendingUp,
  UserCheck,
  FileText,
  Settings,
  Download,
  Eye,
  MoreHorizontal,
  ChevronRight,
  Activity,
  Upload,
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const stats = [
    {
      label: 'Total Students',
      value: '1,240',
      icon: <Users size={20} />,
      trend: '+42 this month',
      trendUp: true,
      color: 'from-[#e8f0fe] to-[#d4e2f7]',
      iconColor: '#4a6a9b',
    },
    {
      label: 'Pending Approvals',
      value: '12',
      icon: <Clock size={20} />,
      trend: 'Needs review',
      trendUp: false,
      color: 'from-[#fef5e8] to-[#faeedc]',
      iconColor: '#d4a34b',
    },
    {
      label: 'Active Courses',
      value: '15',
      icon: <BookMarked size={20} />,
      trend: '+2 new',
      trendUp: true,
      color: 'from-[#eef5f0] to-[#ddebe2]',
      iconColor: '#4a7c5e',
    },
    {
      label: 'Total Enrolments',
      value: '3,890',
      icon: <BarChart3 size={20} />,
      trend: '↑ 8%',
      trendUp: true,
      color: 'from-[#f3eef9] to-[#e8e0f2]',
      iconColor: '#7a5b9e',
    },
  ];

  const recentEnrolments = [
    { name: 'Amina Hassan', programme: 'Diploma in AI', date: 'May 18', status: 'Approved', id: 'STU001' },
    { name: 'Peter Kamau', programme: 'Business Admin', date: 'May 17', status: 'Pending', id: 'STU002' },
    { name: 'Grace Odhiambo', programme: 'Social Work', date: 'May 16', status: 'Approved', id: 'STU003' },
    { name: 'Brian Mutua', programme: 'Hospitality Mgt', date: 'May 15', status: 'Pending', id: 'STU004' },
    { name: 'Faith Njeri', programme: 'Computer Studies', date: 'May 14', status: 'Approved', id: 'STU005' },
  ];

  const departments = [
    { name: 'Technology', percentage: 38, color: '#4a6a9b' },
    { name: 'Business', percentage: 24, color: '#4a7c5e' },
    { name: 'Social Work', percentage: 18, color: '#7a5b9e' },
    { name: 'Hospitality', percentage: 12, color: '#d4a34b' },
    { name: 'Theology', percentage: 8, color: '#b87c5e' },
  ];

  const upcomingTasks = [
    { task: 'Review course submissions', deadline: 'Today', priority: 'High' },
    { task: 'Update fee structure', deadline: 'Tomorrow', priority: 'Medium' },
    { task: 'Faculty meeting', deadline: 'May 25', priority: 'Low' },
    { task: 'Exam scheduling', deadline: 'May 28', priority: 'High' },
  ];

  const handleSignOut = () => {
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-[#f8f6f2] overflow-hidden font-['Inter',system-ui,-apple-system,sans-serif]"  style={{ fontFamily: "Georgia, serif" }}>
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
              { icon: <Users size={18} />, label: "Students", path: "/admin/manage-students" },
              { icon: <BookOpen size={18} />, label: "Courses", path: "/admin/manage-courses" },
              { icon: <FileText size={18} />, label: "Approvals", path: "/admin/approvals" },
              { icon: <Upload size={18} />, label: "Upload Materials", path: "/admin/upload-materials" },
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
        

        {/* Dashboard Content */}
        <div className="p-8 space-y-8">
          {/* Welcome Banner */}
          <div className="bg-linear-to-br from-[#1a1d24] to-[#2c2824] rounded-xl p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle,#ffffff_1px,transparent_1px)] bg-size-[20px_20px]"></div>
            <div className="relative z-10 flex flex-wrap justify-between items-center gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs mb-3">
                  <Activity size={12} />
                  Admin Overview
                </div>
                <h2 className="text-2xl font-semibold text-white mb-2">Welcome back, Dr. Admin</h2>
                <p className="text-gray-300 text-sm">Here's what's happening at Trilevel College today.</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => navigate('/admin/approvals')}
                  className="px-5 py-2.5 bg-linear-to-r from-[#4a6a9b] to-[#3d5a86] text-white rounded-lg text-sm font-medium hover:from-[#3d5a86] hover:to-[#2c4a7a] transition shadow-sm flex items-center gap-2"
                >
                  <UserCheck size={16} />
                  Review Approvals
                </button>
                <button 
                  onClick={() => navigate('/admin/uploads')}
                  className="px-5 py-2.5 bg-white/10 border border-white/20 text-white rounded-lg text-sm font-medium hover:bg-white/20 transition flex items-center gap-2"
                >
                  <FileText size={16} />
                  Upload Materials
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#e8e2d9] p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-linear-to-br ${stat.color} flex items-center justify-center`}>
                    <div style={{ color: stat.iconColor }}>{stat.icon}</div>
                  </div>
                  <div className={`flex items-center gap-1 text-xs ${stat.trendUp ? 'text-[#4a7c5e]' : 'text-[#d4a34b]'}`}>
                    {stat.trendUp && <TrendingUp size={12} />}
                    <span>{stat.trend}</span>
                  </div>
                </div>
                <div className="text-2xl font-semibold text-[#2c2824]">{stat.value}</div>
                <div className="text-xs text-[#9b9288] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Enrolments Table */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#e8e2d9] overflow-hidden">
              <div className="p-5 border-b border-[#e8e2d9] flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-[#2c2824]">Recent Enrolments</h3>
                  <p className="text-xs text-[#9b9288] mt-0.5">Latest student registrations</p>
                </div>
                <button className="text-xs text-[#4a6a9b] hover:underline flex items-center gap-1">
                  View all
                  <ChevronRight size={12} />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#faf8f5] border-b border-[#e8e2d9]">
                    <tr>
                      <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] font-medium">Student</th>
                      <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] font-medium">Programme</th>
                      <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] font-medium">Date</th>
                      <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] font-medium">Status</th>
                      <th className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentEnrolments.map((enrolment, idx) => (
                      <tr key={idx} className="border-b border-[#e8e2d9] hover:bg-[#faf8f5] transition-colors">
                        <td className="px-5 py-3">
                          <div>
                            <p className="text-sm font-medium text-[#2c2824]">{enrolment.name}</p>
                            <p className="text-[10px] text-[#9b9288]">{enrolment.id}</p>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-sm text-[#6b645a]">{enrolment.programme}</td>
                        <td className="px-5 py-3 text-sm text-[#6b645a]">{enrolment.date}</td>
                        <td className="px-5 py-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${
                            enrolment.status === 'Approved' 
                              ? 'bg-[#eef5f0] text-[#4a7c5e]' 
                              : 'bg-[#fef5e8] text-[#d4a34b]'
                          }`}>
                            {enrolment.status}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <button className="text-[#b0a89e] hover:text-[#4a6a9b] transition">
                            <Eye size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Column - Department Distribution & Tasks */}
            <div className="space-y-6">
              {/* Enrolment by Department */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#e8e2d9] p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-[#2c2824]">Enrolment by Department</h3>
                    <p className="text-xs text-[#9b9288] mt-0.5">Distribution across faculties</p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#f3eef9] to-[#e8e0f2] flex items-center justify-center">
                    <BarChart3 size={14} className="text-[#7a5b9e]" />
                  </div>
                </div>
                <div className="space-y-4">
                  {departments.map((dept, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-[#2c2824]">{dept.name}</span>
                        <span className="text-xs font-medium" style={{ color: dept.color }}>{dept.percentage}%</span>
                      </div>
                      <div className="h-1.5 bg-[#e8e2d9] rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${dept.percentage}%`, backgroundColor: dept.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Tasks */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#e8e2d9] p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-[#2c2824]">Upcoming Tasks</h3>
                    <p className="text-xs text-[#9b9288] mt-0.5">Items requiring attention</p>
                  </div>
                  <button className="text-xs text-[#4a6a9b] hover:underline">View all</button>
                </div>
                <div className="space-y-3">
                  {upcomingTasks.map((task, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-[#faf8f5] transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          task.priority === 'High' ? 'bg-[#d4a34b]' : task.priority === 'Medium' ? 'bg-[#4a6a9b]' : 'bg-[#9b9288]'
                        }`} />
                        <div>
                          <p className="text-sm font-medium text-[#2c2824]">{task.task}</p>
                          <p className="text-[10px] text-[#9b9288]">Due: {task.deadline}</p>
                        </div>
                      </div>
                      <button className="text-[#b0a89e] hover:text-[#4a6a9b] transition">
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { icon: <Users size={18} />, label: 'Manage Students', action: '/admin/students', color: 'from-[#e8f0fe] to-[#d4e2f7]', textColor: '#4a6a9b' },
              { icon: <BookOpen size={18} />, label: 'Create Course', action: '/admin/courses/create', color: 'from-[#eef5f0] to-[#ddebe2]', textColor: '#4a7c5e' },
              { icon: <Download size={18} />, label: 'Export Reports', action: '/admin/reports', color: 'from-[#fef5e8] to-[#faeedc]', textColor: '#d4a34b' },
              { icon: <Settings size={18} />, label: 'System Settings', action: '/admin/settings', color: 'from-[#f3eef9] to-[#e8e0f2]', textColor: '#7a5b9e' },
            ].map((action, idx) => (
              <button
                key={idx}
                onClick={() => navigate(action.action)}
                className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#e8e2d9] p-4 flex items-center gap-3 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group"
              >
                <div className={`w-10 h-10 rounded-lg bg-linear-to-br ${action.color} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                  <div style={{ color: action.textColor }}>{action.icon}</div>
                </div>
                <span className="text-sm font-medium text-[#2c2824] group-hover:text-[#4a6a9b] transition-colors">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;