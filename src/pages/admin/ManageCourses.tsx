import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Search,
  Users,
  Plus,
  Edit,
  Trash2,
  Eye,
  Check,
  Clock,
  AlertCircle,
  ChevronRight,
  X,
} from 'lucide-react';
import { CATALOG_COURSES, type CatalogCourse } from '../../data/courses';
import AdminLayout from '../../layouts/AdminLayout';

type AdminCourse = CatalogCourse;

type CourseFormData = Omit<AdminCourse, 'id' | 'students' | 'progress'>;

const emptyForm = (): CourseFormData => ({
  title: '',
  code: '',
  department: '',
  description: '',
  units: 10,
  status: 'Pending',
  level: 'Certificate',
  duration: '6 months',
  iconKey: 'technology',
});

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

const ManageCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<AdminCourse[]>(() => [...CATALOG_COURSES]);
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'pending'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [selectedCourse, setSelectedCourse] = useState<AdminCourse | null>(null);
  const [formData, setFormData] = useState<CourseFormData>(emptyForm());

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'active' && course.status === 'Active') ||
      (activeTab === 'pending' && course.status === 'Pending');
    return matchesSearch && matchesTab;
  });

  const getTabCount = (tab: typeof activeTab) => {
    if (tab === 'all') return courses.length;
    if (tab === 'active') return courses.filter((c) => c.status === 'Active').length;
    return courses.filter((c) => c.status === 'Pending').length;
  };

  const openAddModal = () => {
    setFormMode('add');
    setSelectedCourse(null);
    setFormData(emptyForm());
    setShowFormModal(true);
  };

  const openEditModal = (course: AdminCourse) => {
    setFormMode('edit');
    setSelectedCourse(course);
    setFormData({
      title: course.title,
      code: course.code,
      department: course.department,
      description: course.description,
      units: course.units,
      status: course.status,
      level: course.level,
      duration: course.duration,
      iconKey: course.iconKey,
    });
    setShowFormModal(true);
  };

  const openViewModal = (course: AdminCourse) => {
    setSelectedCourse(course);
    setShowViewModal(true);
  };

  const handleDeleteClick = (course: AdminCourse) => {
    setSelectedCourse(course);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedCourse) {
      setCourses((prev) => prev.filter((c) => c.id !== selectedCourse.id));
    }
    setShowDeleteModal(false);
    setSelectedCourse(null);
  };

  const handleSaveCourse = () => {
    if (!formData.title.trim() || !formData.code.trim()) return;

    if (formMode === 'add') {
      const newCourse: AdminCourse = {
        id: Date.now(),
        ...formData,
        students: 0,
        progress: 0,
      };
      setCourses((prev) => [newCourse, ...prev]);
    } else if (selectedCourse) {
      setCourses((prev) =>
        prev.map((c) =>
          c.id === selectedCourse.id ? { ...c, ...formData } : c
        )
      );
    }
    setShowFormModal(false);
    setSelectedCourse(null);
    setFormData(emptyForm());
  };

  return (
    <AdminLayout title="Courses" subtitle="Manage certificate and diploma programmes" backTo="/admin/dashboard">
          <div className="mb-6 flex flex-wrap justify-end items-center gap-4">
            <button
              type="button"
              onClick={openAddModal}
              className="px-5 py-2.5 bg-[#4a6a9b] text-white rounded-xl text-sm font-medium hover:bg-[#3d5a86] transition shadow-sm flex items-center gap-2"
            >
              <Plus size={16} />
              Add Course
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              {
                label: 'Total Courses',
                value: courses.length,
                icon: <BookOpen size={18} className="text-[#4a6a9b]" />,
                color: 'bg-[#e8f0fe]',
                hasData: courses.length > 0,
              },
              {
                label: 'Active',
                value: courses.filter((c) => c.status === 'Active').length,
                icon: <Check size={18} className="text-[#4a7c5e]" />,
                color: 'bg-[#eef5f0]',
                hasData: courses.some((c) => c.status === 'Active'),
              },
              {
                label: 'Pending Review',
                value: courses.filter((c) => c.status === 'Pending').length,
                icon: <Clock size={18} className="text-[#d4a34b]" />,
                color: 'bg-[#fef5e8]',
                hasData: courses.some((c) => c.status === 'Pending'),
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className={`bg-white/60 backdrop-blur-sm rounded-xl border p-4 transition-all duration-300 ${
                  stat.hasData ? 'border-[#e8e2d9]' : 'border-dashed border-[#d4cfc8]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[#b0a89e]">{stat.label}</p>
                    <p className={`text-2xl font-semibold mt-1 transition-colors ${stat.hasData ? 'text-[#2c2824]' : 'text-[#c0b8ae]'}`}>
                      {stat.value}
                    </p>
                  </div>
                  <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center ${!stat.hasData ? 'opacity-40' : ''}`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="relative mb-6 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b0a89e]" />
            <input
              type="text"
              placeholder="Search by title, code, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/80 border border-[#e0d9d0] rounded-lg text-sm text-[#2c2824] placeholder:text-[#b0a89e] focus:outline-none focus:ring-2 focus:ring-[#4a6a9b]/20 focus:border-[#4a6a9b]/30 transition-all"
            />
          </div>

          <div className="flex gap-2 mb-6 border-b border-[#e8e2d9]">
            {(
              [
                { id: 'all' as const, label: 'All Courses' },
                { id: 'active' as const, label: 'Active' },
                { id: 'pending' as const, label: 'Pending' },
              ] as const
            ).map((tab) => (
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
                <span
                  className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    activeTab === tab.id ? 'bg-[#4a6a9b]/10 text-[#2c4a7a]' : 'bg-[#f0ece6] text-[#9b9288]'
                  }`}
                >
                  {getTabCount(tab.id)}
                </span>
              </button>
            ))}
          </div>

          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="relative bg-white/80 backdrop-blur-sm rounded-xl border border-[#e8e2d9] overflow-hidden hover:shadow-md transition-all duration-200 group"
                >
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1">
                    <button
                      onClick={() => openViewModal(course)}
                      className="w-7 h-7 rounded-lg bg-[#f5f0eb] hover:bg-[#e8f0fe] text-[#9b9288] hover:text-[#4a6a9b] flex items-center justify-center transition"
                      title="View"
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      onClick={() => openEditModal(course)}
                      className="w-7 h-7 rounded-lg bg-[#f5f0eb] hover:bg-[#eef5f0] text-[#9b9288] hover:text-[#4a7c5e] flex items-center justify-center transition"
                      title="Edit"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(course)}
                      className="w-7 h-7 rounded-lg bg-[#f5f0eb] hover:bg-[#fef5e8] text-[#9b9288] hover:text-[#d4a34b] flex items-center justify-center transition"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="p-5 border-b border-[#e8e2d9] bg-[#faf8f5]">
                    <div className="flex items-start justify-between mb-3 pr-24">
                      <div>
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span
                            className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${
                              course.level === 'Diploma'
                                ? 'bg-[#eef5f0] text-[#4a7c5e]'
                                : 'bg-[#e8f0fe] text-[#4a6a9b]'
                            }`}
                          >
                            {course.level}
                          </span>
                          <span className="text-[10px] text-[#b0a89e]">{course.department}</span>
                          <span
                            className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                              course.status === 'Active'
                                ? 'bg-[#eef5f0] text-[#4a7c5e]'
                                : 'bg-[#fef5e8] text-[#d4a34b]'
                            }`}
                          >
                            {course.status}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-[#2c2824] group-hover:text-[#4a6a9b] transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-[10px] font-mono text-[#9b9288] mt-1">{course.code}</p>
                      </div>
                      <ChevronRight size={18} className="text-[#c0b8ae] group-hover:text-[#4a6a9b] transition-colors shrink-0" />
                    </div>
                    <p className="text-sm text-[#6b645a] leading-relaxed line-clamp-2">{course.description}</p>
                  </div>

                  <div className="p-5">
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-[#6b645a]">Enrolment fill</span>
                        <span className="font-medium text-[#2c2824]">{course.progress}%</span>
                      </div>
                      <div className="h-2 bg-[#e8e2d9] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#4a6a9b] rounded-full transition-all duration-500"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4 text-xs text-[#6b645a]">
                      <span className="flex items-center gap-1">
                        <Users size={14} className="text-[#b0a89e]" />
                        {course.students} students
                      </span>
                      <span>{course.units} units</span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(course)}
                        className="flex-1 py-2.5 rounded-lg text-sm font-medium border border-[#e0d9d0] text-[#6b645a] hover:bg-[#faf8f5] hover:text-[#2c2824] transition-all duration-200"
                      >
                        Edit Course
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate(`/admin/upload-materials?course=${course.id}`)}
                        className="flex-1 py-2.5 rounded-lg text-sm font-medium bg-[#4a6a9b] text-white hover:bg-[#3d5a86] shadow-sm transition-all duration-200"
                      >
                        Upload Materials
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={
                activeTab === 'pending' ? (
                  <Clock size={28} />
                ) : activeTab === 'active' ? (
                  <Check size={28} />
                ) : (
                  <BookOpen size={28} />
                )
              }
              title={
                searchTerm
                  ? 'No courses match your search'
                  : activeTab === 'pending'
                  ? 'No pending courses'
                  : activeTab === 'active'
                  ? 'No active courses'
                  : 'No courses in catalog'
              }
              desc={
                searchTerm
                  ? 'Try a different search term or clear the filter.'
                  : 'Add a new programme to build your course catalog.'
              }
              action={
                searchTerm
                  ? { label: 'Clear search', onClick: () => setSearchTerm('') }
                  : { label: 'Add Course', onClick: openAddModal }
              }
            />
          )}

      {/* Add / Edit modal */}
      {showFormModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8e2d9]">
              <h3 className="text-lg font-semibold text-[#2c2824]">
                {formMode === 'add' ? 'Add Course' : 'Edit Course'}
              </h3>
              <button
                onClick={() => setShowFormModal(false)}
                className="p-1.5 rounded-lg text-[#9b9288] hover:bg-[#f0ece6] hover:text-[#2c2824] transition"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] text-[#9b9288] mb-1.5">Title</label>
                <input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-[#e0d9d0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4a6a9b]/20"
                  placeholder="Course title"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-[#9b9288] mb-1.5">Code</label>
                  <input
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full px-3 py-2 border border-[#e0d9d0] rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#4a6a9b]/20"
                    placeholder="CS-AI101"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-[#9b9288] mb-1.5">Department</label>
                  <input
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 border border-[#e0d9d0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4a6a9b]/20"
                    placeholder="Technology"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] text-[#9b9288] mb-1.5">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-[#e0d9d0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4a6a9b]/20 resize-none"
                  placeholder="Brief course description"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-[#9b9288] mb-1.5">Level</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value as AdminCourse['level'] })}
                    className="w-full px-3 py-2 border border-[#e0d9d0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4a6a9b]/20"
                  >
                    <option value="Certificate">Certificate</option>
                    <option value="Diploma">Diploma</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-[#9b9288] mb-1.5">Units</label>
                  <input
                    type="number"
                    min={1}
                    value={formData.units}
                    onChange={(e) => setFormData({ ...formData, units: Number(e.target.value) || 1 })}
                    className="w-full px-3 py-2 border border-[#e0d9d0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4a6a9b]/20"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-[#9b9288] mb-1.5">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as AdminCourse['status'] })}
                    className="w-full px-3 py-2 border border-[#e0d9d0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4a6a9b]/20"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3 px-6 py-4 border-t border-[#e8e2d9] bg-[#faf8f5]">
              <button
                onClick={() => setShowFormModal(false)}
                className="flex-1 px-4 py-2.5 rounded-lg border border-[#e0d9d0] text-[#6b645a] hover:bg-white transition text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCourse}
                className="flex-1 px-4 py-2.5 rounded-lg bg-[#4a6a9b] text-white hover:bg-[#3d5a86] transition text-sm font-medium"
              >
                {formMode === 'add' ? 'Add Course' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View modal */}
      {showViewModal && selectedCourse && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8e2d9]">
              <h3 className="text-lg font-semibold text-[#2c2824]">Course Details</h3>
              <button
                onClick={() => setShowViewModal(false)}
                className="p-1.5 rounded-lg text-[#9b9288] hover:bg-[#f0ece6] transition"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-3 text-sm">
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#9b9288] mb-1">Title</p>
                <p className="font-medium text-[#2c2824]">{selectedCourse.title}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#9b9288] mb-1">Code</p>
                  <p className="font-mono text-[#6b645a]">{selectedCourse.code}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#9b9288] mb-1">Department</p>
                  <p className="text-[#6b645a]">{selectedCourse.department}</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#9b9288] mb-1">Description</p>
                <p className="text-[#6b645a] leading-relaxed">{selectedCourse.description}</p>
              </div>
              <div className="flex gap-4 text-[#6b645a]">
                <span>{selectedCourse.level}</span>
                <span>·</span>
                <span>{selectedCourse.status}</span>
                <span>·</span>
                <span>{selectedCourse.units} units</span>
                <span>·</span>
                <span>{selectedCourse.students} students</span>
              </div>
            </div>
            <div className="flex gap-3 px-6 py-4 border-t border-[#e8e2d9]">
              <button
                onClick={() => {
                  setShowViewModal(false);
                  openEditModal(selectedCourse);
                }}
                className="flex-1 px-4 py-2.5 rounded-lg border border-[#e0d9d0] text-[#6b645a] hover:bg-[#faf8f5] text-sm font-medium transition"
              >
                Edit
              </button>
              <button
                onClick={() => setShowViewModal(false)}
                className="flex-1 px-4 py-2.5 rounded-lg bg-[#4a6a9b] text-white text-sm font-medium transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#fef5e8] flex items-center justify-center">
                  <AlertCircle size={20} className="text-[#d4a34b]" />
                </div>
                <h3 className="text-lg font-semibold text-[#2c2824]">Delete Course</h3>
              </div>
              <p className="text-sm text-[#6b645a] mb-6">
                Are you sure you want to delete{' '}
                <span className="font-medium text-[#2c2824]">&quot;{selectedCourse?.title}&quot;</span>?
                This action cannot be undone.
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
                  Delete Course
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ManageCourses;
