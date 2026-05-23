import { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  BookOpen,
  GraduationCap,
  Layers,
} from "lucide-react";
import { CATALOG_COURSES, type CatalogCourse, type CourseLevel } from "../../data/courses";
import PublicCourseCard from "../../components/public/PublicCourseCard";
import PublicCourseDetailModal from "../../components/public/PublicCourseDetailModal";
import RegisterOverlay from "../../components/public/RegisterOverlay";
import SignInOverlay from "../../components/public/SignInOverlay";
import HomeSidebar from "../../components/public/HomeSidebar";
import HomePortalPeek from "../../components/public/HomePortalPeek";

const FEATURED_COUNT = 6;
const HERO_WORDS = ["business", "technology", "hospitality", "theology", "community"];

const deptCount = new Set(CATALOG_COURSES.map((c) => c.department)).size;

const bentoTiles = [
  { value: String(CATALOG_COURSES.length), label: "Programmes", accent: "blue" },
  { value: "2", label: "Qualification levels", accent: "green" },
  { value: String(deptCount), label: "Departments", accent: "wine" },
  { value: "24/7", label: "Portal access", accent: "blue" },
];

const galleryStack = [
  { src: "/images/campus.svg", alt: "Campus", caption: "Campus" },
  { src: "/images/students.svg", alt: "Students", caption: "Community" },
  { src: "/images/graduation.svg", alt: "Graduation", caption: "Graduate" },
];

export default function TrilevelLogin() {
  const [selectedCourse, setSelectedCourse] = useState<CatalogCourse | null>(null);
  const [showRegister, setShowRegister] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [heroWordIndex, setHeroWordIndex] = useState(0);
  const [levelFilter, setLevelFilter] = useState<"all" | CourseLevel>("all");
  const [deptFilter, setDeptFilter] = useState<string>("all");

  const openSignIn = useCallback(() => setShowSignIn(true), []);
  const closeSignIn = useCallback(() => setShowSignIn(false), []);
  const openRegister = useCallback(() => setShowRegister(true), []);
  const closeRegister = useCallback(() => setShowRegister(false), []);
  const openRegisterFromSignIn = useCallback(() => {
    setShowSignIn(false);
    setShowRegister(true);
  }, []);

  const scrollToProgrammes = useCallback(() => {
    document.getElementById("programmes")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const scrollToAbout = useCallback(() => {
    document.getElementById("about-trilevel")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const scrollToPortal = useCallback(() => {
    document.getElementById("portal-peek")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const register = searchParams.get("register") === "1";
    const signin = searchParams.get("signin") === "1";
    if (register) setShowRegister(true);
    if (signin) setShowSignIn(true);
    if (register || signin) setSearchParams({}, { replace: true });
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setHeroWordIndex((i) => (i + 1) % HERO_WORDS.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, []);

  const departments = useMemo(
    () => ["all", ...Array.from(new Set(CATALOG_COURSES.map((c) => c.department))).sort()],
    []
  );

  const filteredFeatured = useMemo(() => {
    return CATALOG_COURSES.filter((c) => {
      const levelOk = levelFilter === "all" || c.level === levelFilter;
      const deptOk = deptFilter === "all" || c.department === deptFilter;
      return levelOk && deptOk;
    }).slice(0, FEATURED_COUNT);
  }, [levelFilter, deptFilter]);

  const modalOpen = showRegister || showSignIn;

  return (
    <div className="h-screen flex bg-[#f8f6f2] font-['Inter',system-ui,-apple-system,sans-serif] relative overflow-hidden portal-light">
      <HomeSidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
        onSignIn={openSignIn}
        onRegister={openRegister}
        onScrollToAbout={scrollToAbout}
        onScrollToProgrammes={scrollToProgrammes}
        onScrollToPortal={scrollToPortal}
      />

      <div
        className={`flex-1 min-h-0 min-w-0 relative transition-[filter] duration-500 ease-out ${
          modalOpen ? "blur-sm brightness-[0.94] pointer-events-none select-none" : ""
        }`}
      >
        <div className="home-hero-mesh pointer-events-none" aria-hidden />
        <div className="home-grain pointer-events-none" aria-hidden />

        <main className="scrollbar-none relative z-10 h-full overflow-y-auto overflow-x-hidden">
          <div className="home-page-shell px-5 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-10 lg:py-12">
            {/* Hero */}
            <section className="home-hero mb-14 lg:mb-20 min-h-[min(72vh,640px)] flex flex-col justify-center">
              <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
                <div className="space-y-7 home-fade-up">
                  <div className="flex flex-wrap items-center gap-3">
                    <img
                      src="/logo.png"
                      alt=""
                      width={56}
                      height={56}
                      className="w-14 h-14 object-contain"
                      loading="eager"
                    />
                    <div>
                      <p className="home-brand-serif text-sm font-bold tracking-[0.14em] text-[#b70c0c] uppercase">
                        Trilevel College
                      </p>
                      <p className="text-[10px] tracking-[0.2em] text-[#9b9288] uppercase">
                        Professional Studies
                      </p>
                    </div>
                  </div>

                  <h1 className="home-display text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.08] text-[#2c2824] max-w-xl">
                    Learn{" "}
                    <span className="home-hero-swap inline-block min-w-[9ch] text-[#3d5a86]" key={heroWordIndex}>
                      {HERO_WORDS[heroWordIndex]}
                    </span>
                    <br />
                    <span className="text-[#4a6a9b]">your way.</span>
                  </h1>

                  <p className="text-base text-[#6b645a] max-w-md leading-relaxed">
                    One portal for programmes, enrolment, and course materials — use the menu to explore or sign in.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {bentoTiles.map((t) => (
                      <div key={t.label} className={`home-stat-pill home-stat-pill--${t.accent}`}>
                        <span className="text-lg font-bold text-[#2c2824] tabular-nums">{t.value}</span>
                        <span className="text-[10px] uppercase tracking-wider text-[#9b9288]">{t.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative home-fade-up home-fade-up-delay lg:hidden max-w-sm mx-auto w-full">
                  <div className="rounded-2xl overflow-hidden border border-[#e8e2d9]/80 aspect-video shadow-lg">
                    <img
                      src="/images/campus.svg"
                      alt="Trilevel campus"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="relative home-fade-up home-fade-up-delay hidden lg:block">
                  <div className="home-gallery-stack">
                    {galleryStack.map((img, i) => (
                      <div
                        key={img.src}
                        className="home-gallery-card"
                        style={{ ["--stack-index" as string]: i }}
                      >
                        <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                        <span className="home-gallery-caption">{img.caption}</span>
                      </div>
                    ))}
                  </div>
                  <div className="absolute -z-10 inset-0 bg-linear-to-tr from-[#4a6a9b]/15 via-transparent to-[#2F2FE4]/10 rounded-3xl blur-2xl scale-110" />
                </div>
              </div>

              <div className="home-scroll-hint mt-12 lg:mt-16" aria-hidden>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#b0a89e]">Scroll to discover</span>
                <div className="home-scroll-line" />
              </div>
            </section>

            <HomePortalPeek onSignIn={openSignIn} />

            {/* Bento about */}
            <section id="about-trilevel" className="mb-16 lg:mb-24 scroll-mt-8">
              <div className="mb-8">
                <span className="home-section-label">
                  <Sparkles size={14} />
                  Why Trilevel
                </span>
                <h2 className="home-display text-2xl sm:text-3xl text-[#2c2824]">Built for real careers</h2>
              </div>
              <div className="home-bento">
                <div className="home-bento-card home-bento-card--wide home-bento-card--blue p-6 sm:p-8 flex flex-col justify-end min-h-50">
                  <GraduationCap className="text-[#4a6a9b] mb-4" size={32} />
                  <h3 className="text-xl font-semibold text-[#2c2824] mb-2">Certificates & diplomas</h3>
                  <p className="text-sm text-[#6b645a] max-w-sm">
                    Practical pathways across business, tech, hospitality, and more.
                  </p>
                </div>
                <div className="home-bento-card home-bento-card--green p-6 flex flex-col justify-between min-h-40">
                  <Layers className="text-[#4a7c5e]" size={28} />
                  <div>
                    <h3 className="font-semibold text-[#2c2824]">Blended learning</h3>
                    <p className="text-xs text-[#6b645a] mt-1">Campus + online</p>
                  </div>
                </div>
                <div className="home-bento-card home-bento-card--wine p-6 flex flex-col justify-between min-h-40">
                  <BookOpen className="text-[#b70c0c]" size={28} />
                  <div>
                    <h3 className="font-semibold text-[#2c2824]">One portal</h3>
                    <p className="text-xs text-[#6b645a] mt-1">Enrol · learn · grow</p>
                  </div>
                </div>
                <div className="home-bento-card home-bento-card--tall overflow-hidden p-0 min-h-70 sm:min-h-0">
                  <img
                    src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#2c2824]/70 via-[#2c2824]/20 to-transparent" />
                  <p className="absolute bottom-5 left-5 right-5 text-white text-sm font-medium">
                    A community that shows up for you
                  </p>
                </div>
              </div>
            </section>

            {/* Programmes — interactive filters */}
            <section id="programmes" className="mb-16 lg:mb-20 scroll-mt-8">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
                <div>
                  <span className="home-section-label">
                    <BookOpen size={14} />
                    Programmes
                  </span>
                  <h2 className="home-display text-2xl sm:text-3xl text-[#2c2824]">Find your path</h2>
                </div>
                <Link to="/courses" className="home-view-all-link shrink-0">
                  All {CATALOG_COURSES.length} programmes
                  <ArrowUpRight size={16} />
                </Link>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {(["all", "Certificate", "Diploma"] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setLevelFilter(level)}
                    className={`home-filter-chip ${levelFilter === level ? "home-filter-chip--active" : ""}`}
                  >
                    {level === "all" ? "All levels" : level}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-1 scrollbar-none">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => setDeptFilter(dept)}
                    className={`home-filter-chip home-filter-chip--dept ${
                      deptFilter === dept ? "home-filter-chip--active" : ""
                    }`}
                  >
                    {dept === "all" ? "All departments" : dept}
                  </button>
                ))}
              </div>

              {filteredFeatured.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                  {filteredFeatured.map((course, i) => (
                    <div
                      key={course.id}
                      className="home-course-reveal"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <PublicCourseCard course={course} variant="compact" onView={setSelectedCourse} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[#9b9288] py-8 text-center rounded-xl border border-dashed border-[#d4cfc8]">
                  No programmes match — try another filter.
                </p>
              )}

              <div className="mt-8 flex justify-center">
                <Link to="/courses" className="home-cta-ghost">
                  Browse full catalogue
                  <ChevronRight size={16} />
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>

      {showSignIn && <SignInOverlay onClose={closeSignIn} onOpenRegister={openRegisterFromSignIn} />}
      {showRegister && <RegisterOverlay onClose={closeRegister} />}

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
}
