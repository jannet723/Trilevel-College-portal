import type { LucideIcon } from 'lucide-react';
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
} from 'lucide-react';
import { CATALOG_COURSES } from '../../data/courses';
import SidebarNavIcon from '../layout/SidebarNavIcon';

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
    icon: LucideIcon,
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
      <SidebarNavIcon icon={icon} active={active} />
      {!isCollapsed && <span className="flex-1 text-left text-sm">{label}</span>}
    </button>
  );

  const linkItem = (
    to: string,
    label: string,
    icon: LucideIcon,
    active: boolean,
    title?: string
  ) => (
    <Link
      to={to}
      title={isCollapsed ? title ?? label : undefined}
      className={`home-sidebar-nav-item group w-full ${active ? 'home-sidebar-nav-item--active' : ''}`}
    >
      <SidebarNavIcon icon={icon} active={active} />
      {!isCollapsed && <span className="flex-1 text-sm">{label}</span>}
    </Link>
  );

  return (
    <aside
      className={`home-sidebar ${isCollapsed ? 'home-sidebar--collapsed' : ''} shrink-0 h-screen z-30`}
      aria-label="Site navigation"
    >
      <div className="home-sidebar-inner h-full">
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

          {linkItem('/', 'Home', Home, isHome, 'Home')}

          {isHome || isCourses
            ? scrollItem(
                'Programmes',
                BookOpen,
                onScrollToProgrammes,
                isCourses ? 'Jump to programme list' : 'Jump to programmes',
                isCourses
              )
            : linkItem('/courses', 'Programmes', BookOpen, false, 'Programme catalogue')}

          {isHome &&
            scrollItem('Inside the portal', LayoutDashboard, onScrollToPortal, 'Portal preview')}

          {isHome && scrollItem('Why Trilevel', Sparkles, onScrollToAbout, 'About the college')}

          {!isHome &&
            linkItem('/#about-trilevel', 'About', Sparkles, false, 'About the college')}

          {!isCollapsed && (
            <>
              <p className="home-sidebar-section-label px-2 mt-4">Catalogue</p>
              <Link
                to="/courses"
                className={`home-sidebar-nav-item group w-full ${isCourses ? 'home-sidebar-nav-item--active' : ''}`}
              >
                <SidebarNavIcon icon={GraduationCap} active={isCourses} />
                <span className="flex-1 text-sm">Full catalogue</span>
              </Link>
            </>
          )}

          {isCollapsed && (
            <Link
              to="/courses"
              className={`home-sidebar-nav-item group w-full ${isCourses ? 'home-sidebar-nav-item--active' : ''}`}
              title="Full catalogue"
            >
              <SidebarNavIcon icon={GraduationCap} active={isCourses} />
            </Link>
          )}
        </nav>

        <div className="home-sidebar-footer">
        <div className={`home-sidebar-portal ${isCollapsed ? 'p-2' : 'p-3'}`}>
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
            <LogIn size={isCollapsed ? 18 : 15} strokeWidth={1.5} className="shrink-0 opacity-95" />
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
            <UserPlus size={isCollapsed ? 18 : 15} strokeWidth={1.5} className="shrink-0 text-[#6b645a]" />
            {!isCollapsed && <span>Create account</span>}
          </button>
        </div>

        <button
          type="button"
          onClick={onToggleCollapse}
          className="home-sidebar-collapse"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <PanelLeft size={17} strokeWidth={1.4} /> : <PanelLeftClose size={16} strokeWidth={1.4} />}
          {!isCollapsed && <span>Collapse</span>}
        </button>
        </div>
      </div>
    </aside>
  );
};

export default HomeSidebar;
