import { useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Plus, Search, GraduationCap, X } from 'lucide-react';
import AdminLayout from '../../layouts/AdminLayout';
import { CATALOG_COURSES, getCourseById } from '../../data/courses';
import { useCourseResources } from '../../context/CourseResourcesContext';
import CourseLearningMaterials from '../../components/course/CourseLearningMaterials';
import type { CourseResource, CourseResourceType } from '../../types/courseResource';

const emptyForm = () => ({
  type: 'lesson' as CourseResourceType,
  title: '',
  unit: '',
  content: '',
});

const AdminCourseLearning = () => {
  const navigate = useNavigate();
  const { courseId: courseIdParam } = useParams();
  const [searchParams] = useSearchParams();
  const { getResourcesForCourse, addResource, updateResource, deleteResource, getResourceCount } =
    useCourseResources();

  const initialId = Number(courseIdParam || searchParams.get('course') || CATALOG_COURSES[0]?.id);
  const [selectedCourseId, setSelectedCourseId] = useState(
    Number.isFinite(initialId) && initialId > 0 ? initialId : CATALOG_COURSES[0].id
  );
  const [courseSearch, setCourseSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const course = getCourseById(selectedCourseId);
  const resources = getResourcesForCourse(selectedCourseId);

  const filteredCatalog = useMemo(() => {
    const q = courseSearch.toLowerCase();
    return CATALOG_COURSES.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.department.toLowerCase().includes(q)
    );
  }, [courseSearch]);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm());
    setShowForm(true);
  };

  const openEdit = (resource: CourseResource) => {
    setEditingId(resource.id);
    setForm({
      type: resource.type,
      title: resource.title,
      unit: resource.unit === 'General' ? '' : resource.unit,
      content: resource.content,
    });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;

    if (editingId) {
      updateResource(editingId, {
        courseId: selectedCourseId,
        type: form.type,
        title: form.title,
        unit: form.unit,
        content: form.content,
      });
    } else {
      addResource({
        courseId: selectedCourseId,
        type: form.type,
        title: form.title,
        unit: form.unit,
        content: form.content,
      });
    }
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm());
  };

  const handleDelete = (resource: CourseResource) => {
    if (window.confirm(`Remove "${resource.title}" from this course?`)) {
      deleteResource(resource.id);
    }
  };

  if (!course) {
    return (
      <AdminLayout title="Course Learning" subtitle="Manage lessons and notes" backTo="/admin/manage-courses">
        <p className="text-sm text-[#6b645a]">Course not found.</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Course Learning"
      subtitle="Add and organise lessons and notes for each programme"
      backTo="/admin/manage-courses"
    >
      <div className="grid grid-cols-1 xl:grid-cols-[280px_1fr] gap-6">
        <aside className="rounded-2xl border border-[#e8e2d9] bg-white/70 p-4 h-fit xl:sticky xl:top-4">
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap size={16} className="text-[#4a6a9b]" />
            <h2 className="text-sm font-semibold text-[#2c2824]">Programmes</h2>
          </div>
          <div className="relative mb-3">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b0a89e]" />
            <input
              type="text"
              value={courseSearch}
              onChange={(e) => setCourseSearch(e.target.value)}
              placeholder="Search programmes..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-[#e8e2d9] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#4a6a9b]/15"
            />
          </div>
          <ul className="space-y-1 max-h-[420px] overflow-y-auto scrollbar-none">
            {filteredCatalog.map((c) => {
              const active = c.id === selectedCourseId;
              const count = getResourceCount(c.id);
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCourseId(c.id);
                      navigate(`/admin/course-learning/${c.id}`, { replace: true });
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl transition text-sm ${
                      active
                        ? 'bg-[#4a6a9b]/12 text-[#2c4a7a] font-medium border border-[#4a6a9b]/20'
                        : 'text-[#6b645a] hover:bg-[#faf8f5] border border-transparent'
                    }`}
                  >
                    <span className="line-clamp-2 leading-snug">{c.title}</span>
                    <span className="text-[10px] text-[#9b9288] mt-0.5 block">
                      {count === 0 ? 'No materials' : `${count} material${count === 1 ? '' : 's'}`}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <div className="space-y-5">
          <div className="rounded-2xl border border-[#e8e2d9] bg-white/80 p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#9b9288] mb-1">{course.code}</p>
                <h2 className="text-xl font-semibold text-[#2c2824]">{course.title}</h2>
                <p className="text-sm text-[#6b645a] mt-1 max-w-2xl">{course.description}</p>
              </div>
              <button
                type="button"
                onClick={openAdd}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-linear-to-r from-[#4a6a9b] to-[#3d5a86] text-white text-sm font-medium hover:shadow-md transition shrink-0"
              >
                <Plus size={16} />
                Add material
              </button>
            </div>

            <CourseLearningMaterials
              resources={resources}
              mode="admin"
              onEdit={openEdit}
              onDelete={handleDelete}
              onAddClick={openAdd}
            />
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white rounded-2xl border border-[#e8e2d9] shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#e8e2d9]">
              <h3 className="font-semibold text-[#2c2824]">
                {editingId ? 'Edit material' : 'Add material'}
              </h3>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="w-8 h-8 rounded-lg hover:bg-[#f5f0eb] flex items-center justify-center text-[#9b9288]"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="text-xs font-medium text-[#6b645a] mb-1.5 block">Type</label>
                <div className="flex gap-2">
                  {(['lesson', 'note'] as CourseResourceType[]).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, type: t }))}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium border transition ${
                        form.type === t
                          ? 'bg-[#4a6a9b]/12 border-[#4a6a9b]/30 text-[#2c4a7a]'
                          : 'border-[#e8e2d9] text-[#6b645a] hover:bg-[#faf8f5]'
                      }`}
                    >
                      {t === 'lesson' ? 'Lesson' : 'Note'}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-[#6b645a] mb-1.5 block">Title</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-[#e8e2d9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a6a9b]/15"
                  placeholder="e.g. Introduction to the module"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[#6b645a] mb-1.5 block">Unit / module (optional)</label>
                <input
                  value={form.unit}
                  onChange={(e) => setForm((f) => ({ ...f, unit: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-[#e8e2d9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a6a9b]/15"
                  placeholder="e.g. Unit 1"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[#6b645a] mb-1.5 block">Content</label>
                <textarea
                  required
                  rows={6}
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-[#e8e2d9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a6a9b]/15 resize-y"
                  placeholder="Lesson outline, reading notes, or instructions for students..."
                />
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-2.5 rounded-xl border border-[#e0d9d0] text-sm text-[#6b645a] hover:bg-[#faf8f5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-linear-to-r from-[#4a6a9b] to-[#3d5a86] text-white text-sm font-medium"
                >
                  {editingId ? 'Save changes' : 'Publish to course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminCourseLearning;
