import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, GraduationCap, LogIn, Search, Sparkles } from 'lucide-react';
import { CATALOG_COURSES, type CatalogCourse, type CourseLevel } from '../../data/courses';
import PublicCourseCard from '../../components/public/PublicCourseCard';
import PublicCourseDetailModal from '../../components/public/PublicCourseDetailModal';

type LevelFilter = 'all' | CourseLevel;

const Courses = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [selectedCourse, setSelectedCourse] = useState<CatalogCourse | null>(null);

  const departments = useMemo(
    () => ['all', ...Array.from(new Set(CATALOG_COURSES.map((c) => c.department))).sort()],
    []
  );

  const filtered = useMemo(() => {
    return CATALOG_COURSES.filter((course) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        course.title.toLowerCase().includes(q) ||
        course.code.toLowerCase().includes(q) ||
        course.department.toLowerCase().includes(q);
      const matchesLevel = levelFilter === 'all' || course.level === levelFilter;
      const matchesDept = departmentFilter === 'all' || course.department === departmentFilter;
      return matchesSearch && matchesLevel && matchesDept;
    });
  }, [search, levelFilter, departmentFilter]);

  const certCount = CATALOG_COURSES.filter((c) => c.level === 'Certificate').length;
  const dipCount = CATALOG_COURSES.filter((c) => c.level === 'Diploma').length;

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f8f6f2] to-[#f0ede8] font-['Inter',system-ui,-apple-system,sans-serif] relative">
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(74,106,155,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(74,106,155,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="fixed -top-32 -left-32 w-96 h-96 bg-[#4a6a9b]/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-72 h-72 bg-[#2F2FE4]/5 rounded-full blur-[90px] pointer-events-none" />

      <header className="portal-page-header sticky top-0 z-30 border-b border-[#e8e2d9]/80 bg-white/95 backdrop-blur-xl text-[#2c2824]">
        <div className="w-full px-6 sm:px-8 lg:px-10 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <img src="/logo.png" alt="Trilevel" className="w-12 h-12 object-contain group-hover:scale-105 transition-transform" />
              <div className="hidden sm:block">
                <p className="text-sm font-bold tracking-wide text-[#b70c0c] uppercase" style={{ fontFamily: 'Georgia, serif' }}>
                  Trilevel College
                </p>
                <p className="text-[10px] text-[#9b9288] tracking-[0.15em] uppercase">Programme Catalogue</p>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#e8e2d9] bg-white/70 text-sm text-[#6b645a] hover:text-[#4a6a9b] hover:border-[#4a6a9b]/30 transition"
            >
              <ArrowLeft size={14} />
              Home
            </Link>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-linear-to-r from-[#2F2FE4] to-[#3d5a86] text-white text-sm font-medium hover:from-[#3d5a86] hover:to-[#2c4a7a] transition shadow-sm"
            >
              <LogIn size={14} />
              Sign in
            </button>
          </div>
        </div>
      </header>

      <main className="relative w-full px-6 sm:px-8 lg:px-10 py-8 sm:py-10">
        <div className="mb-8 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#e8e2d9] bg-white/50 text-xs text-[#6b645a] mb-4">
            <Sparkles size={12} className="text-[#4a6a9b]" />
            View-only catalogue — sign in to enrol
          </div>
          <h1
            className="text-3xl sm:text-4xl font-bold text-[#2F2FE4] mb-3"
            style={{ fontFamily: "'Palatino Linotype', Palatino, Georgia, serif" }}
          >
            Our Programmes
          </h1>
          <p className="text-[#555] leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
            Browse {CATALOG_COURSES.length} certificate and diploma programmes across hospitality, business, technology, theology, and more.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          {[
            { id: 'all' as const, label: 'All', count: CATALOG_COURSES.length },
            { id: 'Certificate' as const, label: 'Certificate', count: certCount },
            { id: 'Diploma' as const, label: 'Diploma', count: dipCount },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setLevelFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                levelFilter === tab.id
                  ? 'bg-[#4a6a9b] text-white shadow-md'
                  : 'bg-white/60 border border-[#e8e2d9] text-[#6b645a] hover:bg-white'
              }`}
            >
              {tab.label}
              <span className={`ml-2 text-xs ${levelFilter === tab.id ? 'text-white/80' : 'text-[#9b9288]'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-8">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b0a89e]" />
            <input
              type="text"
              placeholder="Search programmes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/80 border border-[#e0d9d0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4a6a9b]/20"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {departments.map((dept) => (
              <button
                key={dept}
                type="button"
                onClick={() => setDepartmentFilter(dept)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  departmentFilter === dept
                    ? 'bg-white border border-[#4a6a9b]/40 text-[#4a6a9b] shadow-sm'
                    : 'bg-white/40 border border-transparent text-[#9b9288] hover:bg-white/70'
                }`}
              >
                {dept === 'all' ? 'All departments' : dept}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-[#9b9288] mb-5 flex items-center gap-2">
          <GraduationCap size={14} />
          Showing {filtered.length} programme{filtered.length !== 1 ? 's' : ''}
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {filtered.map((course) => (
              <PublicCourseCard key={course.id} course={course} onView={setSelectedCourse} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center rounded-2xl border border-dashed border-[#d4cfc8] bg-white/40">
            <BookOpen size={40} className="mx-auto text-[#b0a89e] mb-3" />
            <p className="text-[#6b645a] font-medium">No programmes match your filters</p>
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setLevelFilter('all');
                setDepartmentFilter('all');
              }}
              className="mt-3 text-sm text-[#4a6a9b] hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>

      <PublicCourseDetailModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onSignIn={() => navigate('/')}
      />
    </div>
  );
};

export default Courses;
