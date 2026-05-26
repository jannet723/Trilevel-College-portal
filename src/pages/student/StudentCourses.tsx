import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, SlidersHorizontal } from 'lucide-react';
import { CATALOG_COURSES, type CourseLevel } from '../../data/courses';
import PublicCourseCard from '../../components/public/PublicCourseCard';
import { useEnrollment } from '../../context/EnrollmentContext';
import StudentLayout from '../../layouts/StudentLayout';

type LevelFilter = 'all' | CourseLevel;

const StudentCourses = () => {
  const navigate = useNavigate();
  const { isEnrolled } = useEnrollment();
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');

  const departments = useMemo(
    () => ['all', ...Array.from(new Set(CATALOG_COURSES.map((c) => c.department))).sort()],
    []
  );

  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    return CATALOG_COURSES.filter((course) => {
      const matchesSearch =
        !query ||
        course.title.toLowerCase().includes(query) ||
        course.code.toLowerCase().includes(query) ||
        course.department.toLowerCase().includes(query);
      const matchesLevel = levelFilter === 'all' || course.level === levelFilter;
      const matchesDept = departmentFilter === 'all' || course.department === departmentFilter;
      return matchesSearch && matchesLevel && matchesDept;
    });
  }, [search, levelFilter, departmentFilter]);

  const certCount = CATALOG_COURSES.filter((course) => course.level === 'Certificate').length;
  const dipCount = CATALOG_COURSES.filter((course) => course.level === 'Diploma').length;

  return (
    <StudentLayout title="Courses" subtitle="Browse available programmes and start your enrolment." backTo="/student/dashboard">
      <div className="space-y-8">
        <section className="rounded-3xl border border-[#e8e2d9] bg-white/80 p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-[0.24em] text-[#9b9288]">Student catalogue</span>
              <h1 className="mt-3 text-3xl font-semibold text-[#2c2824]">Browse courses</h1>
              <p className="mt-3 text-sm text-[#6b645a] leading-relaxed">
                {CATALOG_COURSES.length} programmes across {departments.length - 1} departments. Select a course to complete the full student enrolment form.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#e8e2d9] bg-[#f8f6f2] p-4">
                <p className="text-xs text-[#9b9288] uppercase tracking-[0.22em] mb-2">Certificates</p>
                <p className="text-3xl font-semibold text-[#2c2824]">{certCount}</p>
              </div>
              <div className="rounded-2xl border border-[#e8e2d9] bg-[#f8f6f2] p-4">
                <p className="text-xs text-[#9b9288] uppercase tracking-[0.22em] mb-2">Diplomas</p>
                <p className="text-3xl font-semibold text-[#2c2824]">{dipCount}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b0a89e]" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, code, or department"
                className="w-full rounded-2xl border border-[#e8e2d9] bg-white/90 py-3 pl-11 pr-4 text-sm text-[#2c2824] placeholder:text-[#b0a89e] focus:outline-none focus:ring-2 focus:ring-[#4a6a9b]/20"
              />
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setLevelFilter('all')}
                className={`rounded-full border px-4 py-2 text-sm ${levelFilter === 'all' ? 'bg-[#4a6a9b] text-white' : 'bg-white text-[#4a4a4a]'}`}
              >
                All levels
              </button>
              <button
                type="button"
                onClick={() => setLevelFilter('Certificate')}
                className={`rounded-full border px-4 py-2 text-sm ${levelFilter === 'Certificate' ? 'bg-[#4a6a9b] text-white' : 'bg-white text-[#4a4a4a]'}`}
              >
                Certificate
              </button>
              <button
                type="button"
                onClick={() => setLevelFilter('Diploma')}
                className={`rounded-full border px-4 py-2 text-sm ${levelFilter === 'Diploma' ? 'bg-[#4a6a9b] text-white' : 'bg-white text-[#4a4a4a]'}`}
              >
                Diploma
              </button>
              <div className="relative">
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="w-full rounded-2xl border border-[#e8e2d9] bg-white/90 py-3 pl-4 pr-8 text-sm text-[#2c2824] focus:outline-none focus:ring-2 focus:ring-[#4a6a9b]/20"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept === 'all' ? 'All departments' : dept}
                    </option>
                  ))}
                </select>
                <SlidersHorizontal size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#b0a89e]" />
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-5">
          {filtered.length > 0 ? (
            <div className="grid gap-4 lg:grid-cols-3">
              {filtered.map((course, index) => (
                <div key={course.id} className="animate-fade-in-up" style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}>
                  <PublicCourseCard
                    course={course}
                    onView={() => navigate(`/student/course/${course.id}`)}
                    enrolled={isEnrolled(String(course.id))}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-[#d4cfc8] bg-white/80 p-10 text-center">
              <p className="mb-2 text-lg font-semibold text-[#2c2824]">No courses found</p>
              <p className="text-sm text-[#9b9288] mb-4">Try a broader search or clear the filters.</p>
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setLevelFilter('all');
                  setDepartmentFilter('all');
                }}
                className="rounded-2xl border border-[#e8e2d9] bg-white px-4 py-2 text-sm text-[#4a6a9b] hover:bg-[#f0f4fb]"
              >
                Reset filters
              </button>
            </div>
          )}
        </section>

        <div className="rounded-3xl border border-[#e8e2d9] bg-[#f7faf9] p-5 text-sm text-[#6b645a]">
          <div className="flex items-center gap-3">
            <Sparkles size={18} className="text-[#4a6a9b]" />
            <p className="leading-relaxed">
              Your student portal makes enrolment faster. Choose a programme, review the course details and complete the application form.
            </p>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentCourses;
