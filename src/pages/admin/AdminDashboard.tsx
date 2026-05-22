import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Users,
  Clock,
  BookMarked,
  BarChart3,
  UserCheck,
  FileText,
  Settings,
  Download,
  ChevronRight,
  Activity,
  Sparkles,
} from 'lucide-react';
import { CATALOG_COURSES } from '../../data/courses';
import AdminEmptyState from '../../components/AdminEmptyState';
import AdminLayout from '../../layouts/AdminLayout';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const activeProgrammes = CATALOG_COURSES.filter((c) => c.status === 'Active').length;

  const stats = [
    {
      label: 'Total Students',
      value: '0',
      note: 'No students yet',
      icon: <Users size={20} />,
      color: 'from-[#e8f0fe] to-[#d4e2f7]',
      iconColor: '#4a6a9b',
      hasData: false,
    },
    {
      label: 'Pending Approvals',
      value: '0',
      note: 'Nothing pending',
      icon: <Clock size={20} />,
      color: 'from-[#fef5e8] to-[#faeedc]',
      iconColor: '#d4a34b',
      hasData: false,
    },
    {
      label: 'Programmes',
      value: String(CATALOG_COURSES.length),
      note: `${activeProgrammes} active`,
      icon: <BookMarked size={20} />,
      color: 'from-[#eef5f0] to-[#ddebe2]',
      iconColor: '#4a7c5e',
      hasData: true,
    },
    {
      label: 'Total Enrolments',
      value: '0',
      note: 'Awaiting enrolments',
      icon: <BarChart3 size={20} />,
      color: 'from-[#f3eef9] to-[#e8e0f2]',
      iconColor: '#7a5b9e',
      hasData: false,
    },
  ];

  return (
    <AdminLayout
      title="Admin Dashboard"
      subtitle="Overview of students, programmes, and college operations"
      showBack={false}
    >
      <div className="space-y-8">
        {/* Hero */}
        <div className="relative bg-linear-to-br from-[#1a1d24] via-[#2c2824] to-[#1f1d1a] rounded-2xl p-8 overflow-hidden shadow-lg">
          <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle,#ffffff_1px,transparent_1px)] bg-size-[20px_20px]" />
          <div className="absolute -right-8 -top-8 w-48 h-48 bg-[#4a6a9b]/15 rounded-full blur-3xl" />
          <div className="relative z-10 flex flex-wrap justify-between items-center gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs mb-4">
                <Sparkles size={12} className="text-[#8aabcf]" />
                Admin Overview
              </div>
              <h2 className="text-3xl font-semibold text-white mb-2 leading-tight">
                Welcome to your admin portal
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                Set up programmes, enrol students, and manage materials as your college grows.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate('/admin/approvals')}
                className="px-5 py-2.5 bg-linear-to-r from-[#4a6a9b] to-[#3d5a86] text-white rounded-xl text-sm font-medium hover:from-[#3d5a86] hover:to-[#2c4a7a] transition shadow-sm flex items-center gap-2"
              >
                <UserCheck size={16} />
                Review Approvals
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/upload-materials')}
                className="px-5 py-2.5 bg-white/10 border border-white/20 text-white rounded-xl text-sm font-medium hover:bg-white/20 transition flex items-center gap-2"
              >
                <FileText size={16} />
                Upload Materials
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`bg-white/80 backdrop-blur-sm rounded-2xl border p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 ${
                stat.hasData ? 'border-[#e8e2d9]' : 'border-dashed border-[#d4cfc8]'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-11 h-11 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center ${
                    !stat.hasData ? 'opacity-50' : ''
                  }`}
                >
                  <div style={{ color: stat.iconColor }}>{stat.icon}</div>
                </div>
                <span className="text-[10px] text-[#b0a89e] tracking-wide">{stat.note}</span>
              </div>
              <div className={`text-2xl font-semibold ${stat.hasData ? 'text-[#2c2824]' : 'text-[#c0b8ae]'}`}>
                {stat.value}
              </div>
              <div className="text-xs text-[#9b9288] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#e8e2d9] overflow-hidden shadow-sm">
            <div className="p-5 border-b border-[#e8e2d9] flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-[#2c2824]">Recent Enrolments</h3>
                <p className="text-xs text-[#9b9288] mt-0.5">Latest student registrations</p>
              </div>
              <button
                type="button"
                onClick={() => navigate('/admin/manage-students')}
                className="text-xs text-[#4a6a9b] hover:underline flex items-center gap-1"
              >
                View all
                <ChevronRight size={12} />
              </button>
            </div>
            <div className="p-5">
              <AdminEmptyState
                icon={<Users size={28} />}
                title="No enrolments yet"
                description="When students register and enrol in programmes, their records will appear here."
                action={{ label: 'Manage students →', onClick: () => navigate('/admin/manage-students') }}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#e8e2d9] p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-[#2c2824]">Enrolment by Department</h3>
                  <p className="text-xs text-[#9b9288] mt-0.5">Distribution across faculties</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-linear-to-br from-[#f3eef9] to-[#e8e0f2] flex items-center justify-center">
                  <BarChart3 size={16} className="text-[#7a5b9e]" />
                </div>
              </div>
              <AdminEmptyState
                icon={<BarChart3 size={28} />}
                title="No enrolment data"
                description="Department breakdowns will populate once students begin enrolling."
              />
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#e8e2d9] p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-[#2c2824]">Upcoming Tasks</h3>
                  <p className="text-xs text-[#9b9288] mt-0.5">Items requiring attention</p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/admin/approvals')}
                  className="text-xs text-[#4a6a9b] hover:underline"
                >
                  View all
                </button>
              </div>
              <AdminEmptyState
                icon={<Clock size={28} />}
                title="No tasks scheduled"
                description="Pending approvals and admin tasks will show up here when action is needed."
                action={{ label: 'View approvals →', onClick: () => navigate('/admin/approvals') }}
              />
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: <Users size={18} />, label: 'Manage Students', action: '/admin/manage-students', color: 'from-[#e8f0fe] to-[#d4e2f7]', textColor: '#4a6a9b' },
            { icon: <BookOpen size={18} />, label: 'Manage Courses', action: '/admin/manage-courses', color: 'from-[#eef5f0] to-[#ddebe2]', textColor: '#4a7c5e' },
            { icon: <Download size={18} />, label: 'Export Reports', action: '/admin/dashboard', color: 'from-[#fef5e8] to-[#faeedc]', textColor: '#d4a34b' },
            { icon: <Settings size={18} />, label: 'System Settings', action: '/admin/dashboard', color: 'from-[#f3eef9] to-[#e8e0f2]', textColor: '#7a5b9e' },
          ].map((action, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => navigate(action.action)}
              className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#e8e2d9] p-4 flex items-center gap-3 hover:shadow-md hover:border-[#4a6a9b]/20 transition-all duration-200 hover:-translate-y-0.5 group text-left"
            >
              <div
                className={`w-11 h-11 rounded-xl bg-linear-to-br ${action.color} flex items-center justify-center group-hover:scale-105 transition-transform`}
              >
                <div style={{ color: action.textColor }}>{action.icon}</div>
              </div>
              <span className="text-sm font-medium text-[#2c2824] group-hover:text-[#4a6a9b] transition-colors">
                {action.label}
              </span>
            </button>
          ))}
        </div>

        {/* Programme summary strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-[#e8e2d9] p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#e8f0fe] to-[#d4e2f7] flex items-center justify-center">
              <Activity size={18} className="text-[#4a6a9b]" />
            </div>
            <div>
              <p className="font-medium text-[#2c2824] text-sm">{CATALOG_COURSES.length} programmes in catalog</p>
              <p className="text-xs text-[#9b9288]">Certificates and diplomas ready for student enrolment</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('/admin/manage-courses')}
            className="px-5 py-2.5 bg-[#4a6a9b]/10 hover:bg-[#4a6a9b]/20 text-[#4a6a9b] rounded-xl text-sm font-medium transition flex items-center gap-2"
          >
            Manage courses
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
