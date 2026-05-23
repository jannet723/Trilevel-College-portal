import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
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
  Calendar,
  Clock,
} from 'lucide-react';
import AdminEmptyState from '../../components/AdminEmptyState';
import AdminLayout from '../../layouts/AdminLayout';

interface Student {
  name: string;
  id: string;
  email: string;
  phone: string;
  programme: string;
  programmeCode: string;
  year: string;
  status: string;
  enrollmentDate: string;
  avatar: string;
  performance: number;
}

const ManageStudents = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterYear, setFilterYear] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const [students] = useState<Student[]>([]);

  const handleDeleteClick = (student: Student) => {
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
    <AdminLayout
      title="Manage Students"
      subtitle="View and manage enrolled students"
      backTo="/admin/dashboard"
    >
          <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
            <div className="relative flex-1 min-w-50 max-w-md">
              <input
                type="text"
                placeholder="Search students..."
                className="pl-10 pr-4 py-2.5 bg-white/80 border border-[#e0d9d0] rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#4a6a9b]/20 focus:border-[#4a6a9b]/30 text-sm text-[#2c2824] placeholder:text-[#b0a89e] transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search size={16} className="absolute left-3 top-3 text-[#b0a89e]" />
            </div>
            <button
              type="button"
              onClick={() => navigate('/admin/students/new')}
              className="px-5 py-2.5 bg-[#4a6a9b] text-white rounded-xl text-sm font-medium hover:bg-[#3d5a86] transition shadow-sm flex items-center gap-2"
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
                <div className="w-10 h-10 rounded-lg bg-[#e8f0fe] flex items-center justify-center">
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
                <div className="w-10 h-10 rounded-lg bg-[#eef5f0] flex items-center justify-center">
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
                <div className="w-10 h-10 rounded-lg bg-[#fef5e8] flex items-center justify-center">
                  <Clock size={18} className="text-[#d4a34b]" />
                </div>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-[#e8e2d9] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#b0a89e]">Avg Performance</p>
                  <p className="text-2xl font-semibold text-[#c0b8ae] mt-1">--</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#f3eef9] flex items-center justify-center">
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
            {filteredStudents.length === 0 ? (
              <div className="p-6">
                <AdminEmptyState
                  icon={<Users size={28} />}
                  title={students.length === 0 ? 'No students registered yet' : 'No students match your filters'}
                  description={
                    students.length === 0
                      ? 'Add your first student to start building the college directory and tracking enrolments.'
                      : 'Try adjusting your search or filter criteria.'
                  }
                  action={
                    students.length === 0
                      ? { label: 'Add Student', onClick: () => navigate('/admin/manage-students') }
                      : {
                          label: 'Clear filters',
                          onClick: () => {
                            setSearchTerm('');
                            setFilterStatus('all');
                            setFilterYear('all');
                          },
                        }
                  }
                />
              </div>
            ) : (
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
                          <div className="w-9 h-9 rounded-lg bg-[#4a6a9b] flex items-center justify-center text-white text-xs font-medium shadow-sm">
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
                                className="h-full bg-[#4a6a9b] rounded-full"
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
            )}
          </div>

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
                  className="flex-1 px-4 py-2.5 rounded-lg bg-[#d4a34b] text-white hover:bg-[#b8893a] transition text-sm font-medium"
                >
                  Delete Student
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ManageStudents;