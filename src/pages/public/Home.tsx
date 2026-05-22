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

export default function TrilevelLogin() {
  const [selectedCourse, setSelectedCourse] = useState<CatalogCourse | null>(null);
  const [showRegister, setShowRegister] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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

  const highlights = [
    { label: "Programmes", value: "15+" },
    { label: "Formats", value: "Cert & Diploma" },
    { label: "Delivery", value: "Blended" },
    { label: "Departments", value: "6+" },
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
          modalOpen ? "blur-[8px] brightness-[0.94] pointer-events-none select-none" : ""
        }`}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.3]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(74,106,155,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(74,106,155,0.035) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute w-[min(40rem,50vw)] h-[min(40rem,50vh)] bg-[#4a6a9b]/7 rounded-full blur-[120px] -top-24 right-[10%] pointer-events-none" />
        <div className="absolute w-80 h-80 bg-[#2F2FE4]/5 rounded-full blur-[100px] bottom-0 left-[30%] pointer-events-none" />

        <main className="scrollbar-none relative z-10 h-full overflow-y-auto overflow-x-hidden">
          <div className="home-page-shell px-5 sm:px-8 lg:px-12 xl:px-14 py-8 sm:py-10 lg:py-12">
            {/* Hero — logo & brand */}
            <section className="home-section mb-16 lg:mb-20">
              <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 xl:gap-16 items-center w-full">
                <div className="w-full min-w-0">
                  <div className="flex flex-wrap items-center gap-4 sm:gap-5 mb-8">
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
                        className="text-sm sm:text-base font-semibold tracking-[0.1em] text-[#b70c0c]/90 uppercase"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        of Professional Studies
                      </p>
                      <p className="text-[10px] tracking-[0.18em] text-[#9b9288] uppercase mt-1.5">
                        Student &amp; staff portal
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#e8e2d9]/90 bg-white/55 text-xs text-[#6b645a] mb-5">
                    <Sparkles size={12} className="text-[#4a6a9b]" aria-hidden />
                    Welcome to your learning gateway
                  </div>

                  <h1
                    className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-bold leading-[1.1] mb-5 text-[#2F2FE4]"
                    style={{ fontFamily: "'Palatino Linotype', Palatino, Georgia, serif" }}
                  >
                    Your academic future starts here.
                  </h1>

                  <p
                    className="text-base sm:text-lg text-[#555] leading-relaxed mb-6 max-w-2xl"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    Certificate and diploma programmes across business, technology, hospitality, theology, and
                    community development — delivered through one calm, modern portal built for Trilevel learners.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 rounded-full border border-[#e8e2d9]/80 text-xs text-[#555] bg-white/55"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button type="button" onClick={openSignIn} className="btn-primary px-6 py-3 rounded-xl text-sm font-semibold">
                      Sign in to portal
                    </button>
                    <button type="button" onClick={openRegister} className="btn-secondary px-6 py-3 rounded-xl text-sm font-medium">
                      Create an account
                    </button>
                    <Link to="/courses" className="btn-ghost inline-flex items-center gap-1.5 px-5 py-3 rounded-xl text-sm font-medium">
                      Browse programmes
                      <ArrowUpRight size={14} aria-hidden />
                    </Link>
                  </div>
                </div>

                <div className="relative w-full min-w-0">
                  <div className="absolute -inset-3 sm:-inset-5 bg-linear-to-br from-[#4a6a9b]/8 to-[#2F2FE4]/4 rounded-3xl blur-2xl pointer-events-none" />
                  <img
                    src="/images/graduation.svg"
                    alt="Graduation at Trilevel College"
                    className="relative w-full rounded-2xl border border-[#e8e2d9]/75 shadow-[0_20px_50px_-20px_rgba(74,106,155,0.2)] object-cover aspect-[16/10] bg-[#f8f6f2]"
                    loading="eager"
                  />
                </div>
              </div>
            </section>

            {/* Stats — full width */}
            <section className="home-section mb-16 lg:mb-20">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 w-full">
                {highlights.map((h) => (
                  <div
                    key={h.label}
                    className="p-5 lg:p-6 rounded-2xl border border-white/70 bg-white/45 backdrop-blur-sm hover:bg-white/65 hover:shadow-[0_8px_30px_-12px_rgba(74,106,155,0.12)] transition-all duration-300"
                  >
                    <p className="text-[10px] uppercase tracking-[0.14em] text-[#9b9288] mb-1.5">{h.label}</p>
                    <p className="text-2xl lg:text-3xl font-semibold text-[#2c2824]">{h.value}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* About */}
            <section id="about-trilevel" className="home-section mb-16 lg:mb-20 scroll-mt-6">
              <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-start w-full">
                <div>
                  <div className="flex items-center gap-2 text-[#4a6a9b] mb-3">
                    <Users size={16} aria-hidden />
                    <span className="text-[10px] uppercase tracking-[0.2em] font-medium">About us</span>
                  </div>
                  <h2
                    className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#2c2824] mb-5"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    Why Trilevel College?
                  </h2>
                  <p className="text-[#555] leading-relaxed text-base sm:text-lg" style={{ fontFamily: "Georgia, serif" }}>
                    Trilevel College of Professional Studies prepares learners for meaningful careers through practical,
                    industry-aligned programmes. Our certificate and diploma courses combine structured academics with
                    real-world skills — supported by experienced faculty and a dedicated online portal for every student.
                  </p>
                </div>
                <div className="grid sm:grid-cols-1 gap-4 w-full">
                  {aboutPillars.map((pillar) => (
                    <div
                      key={pillar.title}
                      className="flex gap-4 p-5 rounded-2xl border border-[#e8e2d9]/75 bg-white/50 hover:bg-white/70 hover:shadow-sm transition-all duration-300"
                    >
                      <div className="w-11 h-11 rounded-xl bg-linear-to-br from-[#e8f0fe] to-[#d4e2f7] flex items-center justify-center shrink-0">
                        <pillar.icon size={20} className="text-[#4a6a9b]" aria-hidden />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-[#2c2824] mb-1">{pillar.title}</h3>
                        <p className="text-sm text-[#6b645a] leading-relaxed">{pillar.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Gallery */}
            <section className="home-section mb-16 lg:mb-20">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#2c2824] mb-6 lg:mb-8" style={{ fontFamily: "Georgia, serif" }}>
                Life at Trilevel
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 w-full">
                {galleryImages.map((img) => (
                  <figure
                    key={img.src}
                    className="group overflow-hidden rounded-2xl border border-[#e8e2d9]/75 bg-white/40 hover:shadow-[0_12px_40px_-16px_rgba(74,106,155,0.15)] transition-shadow duration-300"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-[1.015]"
                    />
                    <figcaption className="px-4 py-3.5 text-sm font-medium text-[#6b645a] border-t border-[#e8e2d9]/55 bg-white/55">
                      {img.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>

            {/* Programmes */}
            <section className="home-section pb-8 lg:pb-12">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 w-full">
                <div>
                  <div className="flex items-center gap-2 text-[#4a6a9b] mb-2">
                    <BookOpen size={16} aria-hidden />
                    <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Programme catalogue</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-[#2c2824]" style={{ fontFamily: "Georgia, serif" }}>
                    Explore our courses
                  </h2>
                  <p className="text-sm text-[#9b9288] mt-2">Preview programmes — sign in to enrol</p>
                </div>
                <Link
                  to="/courses"
                  className="btn-ghost inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium shrink-0"
                >
                  View all {CATALOG_COURSES.length}
                  <ArrowUpRight size={14} aria-hidden />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 w-full">
                {featuredCourses.map((course) => (
                  <PublicCourseCard key={course.id} course={course} variant="compact" onView={setSelectedCourse} />
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3 justify-center sm:justify-start">
                <Link
                  to="/courses"
                  className="btn-secondary inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-medium"
                >
                  Browse full catalogue
                  <ChevronRight size={16} aria-hidden />
                </Link>
                <button type="button" onClick={openSignIn} className="btn-primary inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold">
                  Sign in to enrol
                </button>
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
