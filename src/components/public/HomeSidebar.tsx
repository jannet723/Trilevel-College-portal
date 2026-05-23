import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LogIn,
  UserPlus,
  BookOpen,
  Sparkles,
  Home,
  PanelLeftClose,
  PanelLeft,
  LayoutDashboard,
  GraduationCap,
  ChevronRight,
} from 'lucide-react';
import { CATALOG_COURSES } from '../../data/courses';

interface HomeSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onSignIn: () => void;
  onRegister: () => void;
  onScrollToAbout: () => void;
  onScrollToProgrammes: () => void;
  onScrollToPortal: () => void;
}

const programmeCount = CATALOG_COURSES.length;
const deptCount = new Set(CATALOG_COURSES.map((c) => c.department)).size;

const HomeSidebar = ({
  isCollapsed,
  onToggleCollapse,
  onSignIn,
  onRegister,
  onScrollToAbout,
  onScrollToProgrammes,
  onScrollToPortal,
}: HomeSidebarProps) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isCourses = location.pathname === '/courses';

  const scrollItem = (
    label: string,
    icon: ReactNode,
    onClick: () => void,
    title?: string,
    active = false
  ) => (
    <button
      type="button"
      onClick={onClick}
      title={isCollapsed ? title ?? label : undefined}
      className={`home-sidebar-nav-item group w-full ${active ? 'home-sidebar-nav-item--active' : ''}`}
    >
      <span className={`home-sidebar-nav-icon ${active ? 'home-sidebar-nav-icon--active' : ''}`}>{icon}</span>
      {!isCollapsed && (
        <>
          <span className="flex-1 text-left text-sm">{label}</span>
          <ChevronRight size={14} className="text-[#c0b8ae] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
        </>
      )}
    </button>
  );

  const linkItem = (
    to: string,
    label: string,
    icon: ReactNode,
    active: boolean,
    title?: string
  ) => (
    <Link
      to={to}
      title={isCollapsed ? title ?? label : undefined}
      className={`home-sidebar-nav-item group w-full ${active ? 'home-sidebar-nav-item--active' : ''}`}
    >
      <span className={`home-sidebar-nav-icon ${active ? 'home-sidebar-nav-icon--active' : ''}`}>{icon}</span>
      {!isCollapsed && (
        <>
          <span className="flex-1 text-sm">{label}</span>
          {active && <span className="w-1.5 h-1.5 rounded-full bg-[#4a6a9b] shrink-0" />}
        </>
      )}
    </Link>
  );

  return (
    <aside
      className={`home-sidebar ${isCollapsed ? 'home-sidebar--collapsed' : ''} shrink-0 h-screen flex flex-col z-30 relative`}
      aria-label="Site navigation"
    >
      <div className="home-sidebar-inner flex flex-col h-full">
        {/* Brand */}
        <div className={`home-sidebar-brand ${isCollapsed ? 'home-sidebar-brand--collapsed' : ''}`}>
          <Link to="/" className="flex items-center gap-3 min-w-0 group" title="Trilevel College home">
            <img
              src="/logo.png"
              alt=""
              className={`object-contain shrink-0 transition-transform group-hover:scale-105 ${
                isCollapsed ? 'w-10 h-10' : 'w-11 h-11'
              }`}
            />
            {!isCollapsed && (
              <div className="min-w-0">
                <p className="home-brand-serif text-xs font-bold tracking-[0.12em] text-[#b70c0c] uppercase leading-tight truncate">
                  Trilevel College
                </p>
                <p className="text-[9px] tracking-[0.16em] text-[#9b9288] uppercase">Portal</p>
              </div>
            )}
          </Link>
        </div>

        {/* Quick stats — expanded only */}
        {!isCollapsed && (
          <div className="home-sidebar-stats mx-3 mb-4 grid grid-cols-2 gap-2">
            <div className="home-sidebar-stat">
              <span className="text-base font-bold text-[#2c2824] tabular-nums">{programmeCount}</span>
              <span className="text-[9px] uppercase tracking-wider text-[#9b9288]">Programmes</span>
            </div>
            <div className="home-sidebar-stat home-sidebar-stat--green">
              <span className="text-base font-bold text-[#2c2824] tabular-nums">{deptCount}</span>
              <span className="text-[9px] uppercase tracking-wider text-[#9b9288]">Departments</span>
            </div>
          </div>
        )}

        <nav className="flex-1 flex flex-col gap-1 px-2 min-h-0 overflow-y-auto scrollbar-none">
          {!isCollapsed && (
            <p className="home-sidebar-section-label px-2">Navigate</p>
          )}

          {linkItem('/', 'Home', <Home size={17} />, isHome, 'Home')}

          {isHome || isCourses
            ? scrollItem(
                'Programmes',
                <BookOpen size={17} />,
                isCourses ? onScrollToProgrammes : onScrollToProgrammes,
                isCourses ? 'Jump to programme list' : 'Jump to programmes',
                isCourses
              )
            : linkItem('/courses', 'Programmes', <BookOpen size={17} />, false, 'Programme catalogue')}

          {isHome &&
            scrollItem(
              'Inside the portal',
              <LayoutDashboard size={17} />,
              onScrollToPortal,
              'Portal preview'
            )}

          {isHome &&
            scrollItem('Why Trilevel', <Sparkles size={17} />, onScrollToAbout, 'About the college')}

          {!isHome && (
            <Link
              to="/#about-trilevel"
              className="home-sidebar-nav-item group w-full"
              title={isCollapsed ? 'About' : undefined}
            >
              <span className="home-sidebar-nav-icon">
                <Sparkles size={17} />
              </span>
              {!isCollapsed && <span className="flex-1 text-sm">About</span>}
            </Link>
          )}

          {!isCollapsed && (
            <>
              <p className="home-sidebar-section-label px-2 mt-4">Catalogue</p>
              <Link to="/courses" className="home-sidebar-nav-item group w-full">
                <span className="home-sidebar-nav-icon">
                  <GraduationCap size={17} />
                </span>
                <span className="flex-1 text-sm">Full catalogue</span>
                <ArrowUpRightIcon />
              </Link>
            </>
          )}

          {isCollapsed && (
            <Link
              to="/courses"
              className="home-sidebar-nav-item group w-full"
              title="Full catalogue"
            >
              <span className="home-sidebar-nav-icon">
                <GraduationCap size={17} />
              </span>
            </Link>
          )}
        </nav>

        {/* Portal access */}
        <div className={`home-sidebar-portal mx-2 mb-2 ${isCollapsed ? 'p-2' : 'p-3'}`}>
          {!isCollapsed && (
            <p className="text-[10px] font-semibold text-[#6b645a] uppercase tracking-wider mb-2.5 px-0.5">
              Student access
            </p>
          )}
          <button
            type="button"
            onClick={onSignIn}
            title="Sign in"
            className={`home-sidebar-cta-primary w-full flex items-center ${
              isCollapsed ? 'justify-center p-3' : 'gap-2 px-3 py-2.5'
            } rounded-xl text-white text-sm font-semibold`}
          >
            <LogIn size={isCollapsed ? 20 : 16} className="shrink-0" />
            {!isCollapsed && <span>Sign in</span>}
          </button>
          <button
            type="button"
            onClick={onRegister}
            title="Create account"
            className={`home-sidebar-cta-secondary w-full flex items-center mt-2 ${
              isCollapsed ? 'justify-center p-3' : 'gap-2 px-3 py-2.5'
            } rounded-xl text-sm font-medium`}
          >
            <UserPlus size={isCollapsed ? 20 : 16} className="shrink-0 text-[#4a6a9b]" />
            {!isCollapsed && <span>Create account</span>}
          </button>
        </div>

        <button
          type="button"
          onClick={onToggleCollapse}
          className="home-sidebar-collapse mx-2 mb-3"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={16} />}
          {!isCollapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
};

function ArrowUpRightIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="text-[#9b9288] shrink-0"
      aria-hidden
    >
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

export default HomeSidebar;
