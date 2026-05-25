import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, BookOpen, Search, Sparkles, SlidersHorizontal } from 'lucide-react';
import { CATALOG_COURSES, type CatalogCourse, type CourseLevel } from '../../data/courses';
import PublicCourseCard from '../../components/public/PublicCourseCard';
import PublicCourseDetailModal from '../../components/public/PublicCourseDetailModal';
import RegisterOverlay from '../../components/public/RegisterOverlay';
import SignInOverlay from '../../components/public/SignInOverlay';
import ForgotPasswordOverlay from '../../components/public/ForgotPasswordOverlay';
import HomeSidebar from '../../components/public/HomeSidebar';
import { useEnrollment } from '../../context/EnrollmentContext';

type LevelFilter = 'all' | CourseLevel;

const deptCount = new Set(CATALOG_COURSES.map((c) => c.department)).size;

const Courses = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [selectedCourse, setSelectedCourse] = useState<CatalogCourse | null>(null);
  const [showRegister, setShowRegister] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const openSignIn = useCallback(() => setShowSignIn(true), []);
  const closeSignIn = useCallback(() => setShowSignIn(false), []);
  const openRegister = useCallback(() => setShowRegister(true), []);
  const closeRegister = useCallback(() => setShowRegister(false), []);
  const openRegisterFromSignIn = useCallback(() => {
    setShowSignIn(false);
    setShowRegister(true);
  }, []);

  const openForgot = useCallback(() => setShowForgot(true), []);
  const closeForgot = useCallback(() => setShowForgot(false), []);

  const scrollToCatalogue = useCallback(() => {
    document.getElementById('catalogue-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const scrollToAbout = useCallback(() => {
    navigate('/#about-trilevel');
  }, [navigate]);

  const scrollToPortal = useCallback(() => {
    navigate('/#portal-peek');
  }, [navigate]);

  const goToMyCourses = useCallback(() => {
    navigate('/student/my-courses');
  }, [navigate]);

  useEffect(() => {
    const register = searchParams.get('register') === '1';
    const signin = searchParams.get('signin') === '1';
    if (register) setShowRegister(true);
    if (signin) setShowSignIn(true);
    if (register || signin) setSearchParams({}, { replace: true });
  }, [searchParams, setSearchParams]);

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
  const modalOpen = showRegister || showSignIn || showForgot;
  const { isEnrolled, loading: enrollmentLoading } = useEnrollment();

  return (
    <div className="h-screen flex bg-[#f8f6f2] font-['Inter',system-ui,-apple-system,sans-serif] relative overflow-hidden portal-light">
      <HomeSidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
        onSignIn={openSignIn}
        onRegister={openRegister}
        onScrollToAbout={scrollToAbout}
        onScrollToProgrammes={scrollToCatalogue}
        onScrollToPortal={scrollToPortal}
      />

      <div
        className={`flex-1 min-h-0 min-w-0 relative transition-[filter] duration-500 ease-out ${
          modalOpen ? 'blur-sm brightness-[0.94] pointer-events-none select-none' : ''
        }`}
      >
        <div className="home-hero-mesh pointer-events-none" aria-hidden />
        <div className="home-grain pointer-events-none" aria-hidden />

        <main className="scrollbar-none relative z-10 h-full overflow-y-auto overflow-x-hidden">
          <div className="courses-page px-5 sm:px-8 lg:px-10 xl:px-14 2xl:px-16 py-8 sm:py-10 lg:py-12">
            {/* Hero */}
            <section className="courses-page-hero mb-10 lg:mb-12 home-fade-up">
              <div className="courses-page-hero__intro">
                <span className="home-section-label">
                  <BookOpen size={14} aria-hidden />
                  Programme catalogue
                </span>
                <h1 className="home-display text-3xl sm:text-4xl lg:text-[2.75rem] text-[#2c2824] leading-tight mb-3">
                  Find your <span className="text-[#3d5a86]">programme</span>
                </h1>
                <p className="text-base text-[#6b645a] leading-relaxed max-w-2xl">
                  {CATALOG_COURSES.length} pathways across {deptCount} departments — preview details, then sign in from the menu to enrol.
                </p>
                <p className="mt-3 text-sm text-[#4a6a9b] max-w-2xl">
                  {enrollmentLoading
                    ? 'Refreshing your enrolled programme badges…'
                    : 'Enrolled programmes appear visibly on the cards without extra clicks.'}
                </p>
                <button
                  type="button"
                  onClick={goToMyCourses}
                  className="inline-flex items-center gap-2 mt-5 rounded-full border border-[#d4cfc8] bg-white px-4 py-2 text-sm font-semibold text-[#3d5a86] shadow-sm transition hover:bg-[#f5f3ef] hover:text-[#2c2824]"
                >
                  My courses
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="courses-page-hero__stats flex flex-wrap gap-2 sm:gap-3">
                <div className="home-stat-pill home-stat-pill--blue min-w-22">
                  <span className="text-lg font-bold text-[#2c2824] tabular-nums">{CATALOG_COURSES.length}</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#9b9288]">Total</span>
                </div>
                <div className="home-stat-pill home-stat-pill--green min-w-22">
                  <span className="text-lg font-bold text-[#2c2824] tabular-nums">{certCount}</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#9b9288]">Certificate</span>
                </div>
                <div className="home-stat-pill home-stat-pill--wine min-w-22">
                  <span className="text-lg font-bold text-[#2c2824] tabular-nums">{dipCount}</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#9b9288]">Diploma</span>
                </div>
              </div>
            </section>

            {/* Filters */}
            <section className="courses-page-filters mb-8 home-fade-up home-fade-up-delay">
              <div className="rounded-2xl border border-[#e8e2d9]/80 bg-white/55 backdrop-blur-md p-5 sm:p-6 lg:p-7 shadow-[0_12px_40px_-20px_rgba(74,106,155,0.12)] w-full">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal size={16} className="text-[#4a6a9b]" />
                    <span className="text-sm font-semibold text-[#2c2824]">Refine results</span>
                  </div>
                  <span className="text-xs text-[#9b9288]">
                    {filtered.length} of {CATALOG_COURSES.length} shown
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-5">
                  {(
                    [
                      { id: 'all' as const, label: 'All levels', count: CATALOG_COURSES.length },
                      { id: 'Certificate' as const, label: 'Certificate', count: certCount },
                      { id: 'Diploma' as const, label: 'Diploma', count: dipCount },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setLevelFilter(tab.id)}
                      className={`home-filter-chip ${levelFilter === tab.id ? 'home-filter-chip--active' : ''}`}
                    >
                      {tab.label}
                      <span className="opacity-80 ml-1">({tab.count})</span>
                    </button>
                  ))}
                </div>

                <div className="courses-page-filters__row">
                  <div className="relative courses-page-search">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b0a89e]" />
                    <input
                      type="search"
                      placeholder="Search by title, code, or department..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white/90 border border-[#e8e2d9] rounded-xl text-sm text-[#2c2824] placeholder:text-[#b0a89e] focus:outline-none focus:ring-2 focus:ring-[#4a6a9b]/20 focus:border-[#4a6a9b]/30"
                    />
                  </div>
                  <div className="courses-page-dept-filters flex flex-wrap gap-2">
                    {departments.map((dept) => (
                      <button
                        key={dept}
                        type="button"
                        onClick={() => setDepartmentFilter(dept)}
                        className={`home-filter-chip home-filter-chip--dept ${
                          departmentFilter === dept ? 'home-filter-chip--active' : ''
                        }`}
                      >
                        {dept === 'all' ? 'All departments' : dept}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section id="catalogue-grid" className="courses-page-grid scroll-mt-8 pb-12 relative">
              {enrollmentLoading && (
                <div className="absolute inset-x-0 top-0 z-10 flex min-h-120 items-center justify-center rounded-4xl bg-white/85 backdrop-blur-sm px-6 py-12">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border-4 border-[#4a6a9b]/20 border-t-[#4a6a9b] animate-spin" />
                    <p className="text-sm font-semibold text-[#2c2824]">Loading your programme status…</p>
                    <p className="mt-2 text-xs text-[#6b645a] max-w-[18rem]">Enrolled courses will be highlighted on the catalogue cards once your profile and enrolments are ready.</p>
                  </div>
                </div>
              )}
              {filtered.length > 0 ? (
                <div className="courses-page-grid__inner">
                  {filtered.map((course, i) => (
                    <div
                      key={course.id}
                      className="home-course-reveal"
                      style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}
                    >
                      <PublicCourseCard
                        course={course}
                        onView={setSelectedCourse}
                        enrolled={isEnrolled(String(course.id))}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="courses-page-empty py-16 rounded-2xl border border-dashed border-[#d4cfc8] bg-white/50 backdrop-blur-sm">
                  <div className="w-14 h-14 mb-4 rounded-2xl bg-[#f0ece6] flex items-center justify-center">
                    <BookOpen size={26} className="text-[#b0a89e]" />
                  </div>
                  <p className="text-[#2c2824] font-medium mb-1">No programmes match</p>
                  <p className="text-sm text-[#9b9288] mb-4">Try a different search or filter</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearch('');
                      setLevelFilter('all');
                      setDepartmentFilter('all');
                    }}
                    className="home-cta-ghost"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </section>

            {filtered.length > 0 && (
              <div className="flex items-center gap-2 py-6 text-xs text-[#9b9288] border-t border-[#e8e2d9]/60 mt-2">
                <Sparkles size={12} className="text-[#4a6a9b] shrink-0" />
                Sign in from the sidebar to enrol in a programme
              </div>
            )}
          </div>
        </main>
      </div>

      {showSignIn && (
        <SignInOverlay onClose={closeSignIn} onOpenRegister={openRegisterFromSignIn} onOpenForgot={openForgot} />
      )}
      {showRegister && <RegisterOverlay onClose={closeRegister} onOpenSignIn={openSignIn} />}
      {showForgot && <ForgotPasswordOverlay onClose={closeForgot} onOpenSignIn={openSignIn} />}

      <PublicCourseDetailModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onSignIn={() => {
          setSelectedCourse(null);
          openSignIn();
        }}
      />
    </div>
  );
};

export default Courses;
