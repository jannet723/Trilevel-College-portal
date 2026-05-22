import { useState, useEffect, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ChevronRight,
  Sparkles,
  BookOpen,
  ArrowUpRight,
  Target,
  Users,
  Award,
  Globe,
} from "lucide-react";
import { CATALOG_COURSES, type CatalogCourse } from "../../data/courses";
import PublicCourseCard from "../../components/public/PublicCourseCard";
import PublicCourseDetailModal from "../../components/public/PublicCourseDetailModal";
import RegisterOverlay from "../../components/public/RegisterOverlay";
import SignInOverlay from "../../components/public/SignInOverlay";
import HomeSidebar from "../../components/public/HomeSidebar";

const FEATURED_COUNT = 6;

const aboutPillars = [
  {
    icon: Target,
    title: "Career-focused programmes",
    text: "Certificate and diploma pathways in business, technology, hospitality, theology, and social sciences.",
  },
  {
    icon: Globe,
    title: "Blended delivery",
    text: "Learn on campus and online with schedules designed for working professionals and school leavers.",
  },
  {
    icon: Award,
    title: "Recognised credentials",
    text: "Structured units, assessments, and certificates that reflect real workplace and academic standards.",
  },
];

const galleryImages = [
  { src: "/images/campus.svg", alt: "Trilevel campus learning environment", caption: "Modern learning spaces" },
  { src: "/images/students.svg", alt: "Students at Trilevel College", caption: "A diverse student community" },
  { src: "/images/graduation.svg", alt: "Graduation and achievement", caption: "Pathways to success" },
];

const sectionGap = "mb-20 lg:mb-28";

export default function TrilevelLogin() {
  const [selectedCourse, setSelectedCourse] = useState<CatalogCourse | null>(null);
  const [showRegister, setShowRegister] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const openSignIn = useCallback(() => setShowSignIn(true), []);
  const closeSignIn = useCallback(() => setShowSignIn(false), []);
  const openRegister = useCallback(() => setShowRegister(true), []);
  const closeRegister = useCallback(() => setShowRegister(false), []);
  const openRegisterFromSignIn = useCallback(() => {
    setShowSignIn(false);
    setShowRegister(true);
  }, []);

  const scrollToAbout = useCallback(() => {
    document.getElementById("about-trilevel")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const register = searchParams.get("register") === "1";
    const signin = searchParams.get("signin") === "1";
    if (register) setShowRegister(true);
    if (signin) setShowSignIn(true);
    if (register || signin) setSearchParams({}, { replace: true });
  }, [searchParams, setSearchParams]);

  const modalOpen = showRegister || showSignIn;

  const tags = [
    "15 Programmes",
    "Certificate & Diploma",
    "Online & Blended",
    "Accredited College",
  ];

  const featuredCourses = CATALOG_COURSES.slice(0, FEATURED_COUNT);

  return (
    <div className="h-screen flex bg-[#f8f6f2] font-['Inter',system-ui,-apple-system,sans-serif] relative overflow-hidden">
      <HomeSidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
        onSignIn={openSignIn}
        onRegister={openRegister}
        onScrollToAbout={scrollToAbout}
      />

      <div
        className={`flex-1 min-h-0 min-w-0 relative bg-linear-to-br from-[#f8f6f2] to-[#f0ede8] transition-[filter,transform] duration-500 ease-out ${
          modalOpen ? "blur-sm brightness-[0.94] pointer-events-none select-none" : ""
        }`}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.28]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(74,106,155,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(74,106,155,0.035) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute w-[min(40rem,50vw)] h-[min(40rem,50vh)] bg-[#4a6a9b]/6 rounded-full blur-[120px] -top-24 right-[10%] pointer-events-none" />
        <div className="absolute w-80 h-80 bg-[#4a6a9b]/4 rounded-full blur-[100px] bottom-0 left-[30%] pointer-events-none" />

        <main className="scrollbar-none relative z-10 h-full overflow-y-auto overflow-x-hidden">
          <div className="home-page-shell px-5 sm:px-8 lg:px-12 xl:px-16 py-10 sm:py-12 lg:py-14 space-y-4">
            {/* Hero */}
            <section className={`home-section ${sectionGap}`}>
              <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 xl:gap-20 items-center w-full">
                <div className="w-full min-w-0 space-y-6">
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                    <img
                      src="/logo.png"
                      alt="Trilevel College logo"
                      width={88}
                      height={88}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-contain shrink-0"
                      loading="eager"
                      fetchPriority="high"
                    />
                    <div className="min-w-0">
                      <p
                        className="text-base sm:text-lg font-bold tracking-[0.12em] text-[#b70c0c] uppercase leading-tight"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        Trilevel College
                      </p>
                      <p
                        className="text-sm sm:text-base font-semibold tracking-widest text-[#b70c0c]/90 uppercase"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        of Professional Studies
                      </p>
                      <p className="text-[10px] tracking-[0.18em] text-[#9b9288] uppercase mt-2">
                        Student &amp; staff portal
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#e8e2d9]/90 bg-white/60 text-xs text-[#6b645a]">
                    <Sparkles size={12} className="text-[#4a6a9b]" aria-hidden />
                    Welcome to your learning gateway
                  </div>

                  <h1
                    className="home-hero-title text-3xl sm:text-4xl lg:text-5xl xl:text-[3.15rem] font-bold leading-[1.12] max-w-2xl"
                    style={{ fontFamily: "'Palatino Linotype', Palatino, Georgia, serif" }}
                  >
                    Your academic future starts here.
                  </h1>

                  <p
                    className="text-base sm:text-lg text-[#555] leading-relaxed max-w-2xl"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    Certificate and diploma programmes across business, technology, hospitality, theology, and
                    community development — delivered through one calm, modern portal built for Trilevel learners.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 rounded-full border border-[#e8e2d9]/80 text-xs text-[#555] bg-white/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative w-full min-w-0 lg:pl-2">
                  <div className="absolute -inset-4 sm:-inset-6 bg-linear-to-br from-[#4a6a9b]/10 to-[#3d5a86]/5 rounded-3xl blur-2xl pointer-events-none" />
                  <img
                    src="/images/graduation.svg"
                    alt="Graduation at Trilevel College"
                    className="relative w-full rounded-2xl border border-[#e8e2d9]/80 shadow-[0_24px_56px_-24px_rgba(61,90,134,0.22)] object-cover aspect-16/10 bg-[#f8f6f2]"
                    loading="eager"
                  />
                </div>
              </div>
            </section>

            {/* About */}
            <section id="about-trilevel" className={`home-section ${sectionGap} scroll-mt-8`}>
              <div className="home-content-panel">
                <div className="grid lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-16 items-start w-full">
                  <div className="space-y-5 lg:pr-4">
                    <span className="home-section-label">
                      <Users size={14} aria-hidden />
                      About us
                    </span>
                    <h2
                      className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#2c2824] leading-tight"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      Why Trilevel College?
                    </h2>
                    <p className="text-[#555] leading-relaxed text-base sm:text-lg" style={{ fontFamily: "Georgia, serif" }}>
                      Trilevel College of Professional Studies prepares learners for meaningful careers through
                      practical, industry-aligned programmes. Our certificate and diploma courses combine structured
                      academics with real-world skills — supported by experienced faculty and a dedicated online portal
                      for every student.
                    </p>
                  </div>
                  <div className="grid gap-4 w-full">
                    {aboutPillars.map((pillar) => (
                      <div
                        key={pillar.title}
                        className="flex gap-4 p-5 lg:p-6 rounded-2xl border border-[#e8e2d9]/70 bg-white/55 hover:bg-white/75 hover:shadow-[0_10px_32px_-14px_rgba(74,106,155,0.12)] transition-all duration-300"
                      >
                        <div className="w-11 h-11 rounded-xl bg-linear-to-br from-[#e8f0fe] to-[#d4e2f7] flex items-center justify-center shrink-0">
                          <pillar.icon size={20} className="text-[#4a6a9b]" aria-hidden />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-[#2c2824] mb-1.5">{pillar.title}</h3>
                          <p className="text-sm text-[#6b645a] leading-relaxed">{pillar.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Gallery */}
            <section className={`home-section ${sectionGap}`}>
              <div className="space-y-8 lg:space-y-10">
                <div>
                  <span className="home-section-label">Campus life</span>
                  <h2
                    className="text-2xl sm:text-3xl font-semibold text-[#2c2824]"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    Life at Trilevel
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
                  {galleryImages.map((img) => (
                    <figure
                      key={img.src}
                      className="group overflow-hidden rounded-2xl border border-[#e8e2d9]/75 bg-white/45 hover:shadow-[0_14px_44px_-18px_rgba(74,106,155,0.14)] transition-shadow duration-300"
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        decoding="async"
                        className="w-full aspect-4/3 object-cover transition-transform duration-500 group-hover:scale-[1.015]"
                      />
                      <figcaption className="px-4 py-4 text-sm font-medium text-[#6b645a] border-t border-[#e8e2d9]/55 bg-white/60">
                        {img.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </section>

            {/* Programmes */}
            <section className="home-section pb-12 lg:pb-16">
              <div className="home-content-panel space-y-10">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 w-full">
                  <div className="space-y-3 max-w-xl">
                    <span className="home-section-label">
                      <BookOpen size={14} aria-hidden />
                      Programme catalogue
                    </span>
                    <h2
                      className="text-2xl sm:text-3xl font-semibold text-[#2c2824]"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      Explore our courses
                    </h2>
                    <p className="text-sm text-[#6b645a] leading-relaxed">
                      Preview our certificate and diploma programmes. Sign in from the menu to enrol and access your
                      learning materials.
                    </p>
                  </div>
                  <Link to="/courses" className="home-view-all-link shrink-0 self-start sm:self-end">
                    View all {CATALOG_COURSES.length} programmes
                    <ArrowUpRight size={16} aria-hidden />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 w-full">
                  {featuredCourses.map((course) => (
                    <PublicCourseCard key={course.id} course={course} variant="compact" onView={setSelectedCourse} />
                  ))}
                </div>

                <div className="pt-2 flex justify-center sm:justify-start">
                  <Link
                    to="/courses"
                    className="home-view-all-link"
                  >
                    Browse full catalogue
                    <ChevronRight size={16} aria-hidden />
                  </Link>
                </div>
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
