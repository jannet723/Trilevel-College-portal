import type { LucideIcon } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PanelLeft, PanelLeftClose, LogOut } from 'lucide-react';
import SidebarNavIcon from './SidebarNavIcon';

export interface PortalNavItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

interface PortalSidebarProps {
  portalLabel: string;
  dashboardPath: string;
  mainNav: PortalNavItem[];
  accountNav?: PortalNavItem[];
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onSignOut: () => void;
}

const PortalSidebar = ({
  portalLabel,
  dashboardPath,
  mainNav,
  accountNav = [],
  isCollapsed,
  onToggleCollapse,
  onSignOut,
}: PortalSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navLink = (item: PortalNavItem) => {
    const active = location.pathname === item.path;

    return (
      <li key={item.path}>
        <button
          type="button"
          onClick={() => navigate(item.path)}
          title={isCollapsed ? item.label : undefined}
          className={`home-sidebar-nav-item group w-full ${active ? 'home-sidebar-nav-item--active' : ''}`}
        >
          <SidebarNavIcon icon={item.icon} active={active} />
          {!isCollapsed && <span className="flex-1 text-sm text-left">{item.label}</span>}
        </button>
      </li>
    );
  };

  return (
    <aside
      className={`home-sidebar ${isCollapsed ? 'home-sidebar--collapsed' : ''} shrink-0 h-screen z-30`}
      aria-label={`${portalLabel} navigation`}
    >
      <div className="home-sidebar-inner h-full">
        <div className={`home-sidebar-brand ${isCollapsed ? 'home-sidebar-brand--collapsed' : ''}`}>
          <Link to={dashboardPath} className="flex items-center gap-3 min-w-0 group" title={portalLabel}>
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
                <p className="text-[9px] tracking-[0.16em] text-[#9b9288] uppercase">{portalLabel}</p>
              </div>
            )}
          </Link>
        </div>

        <nav className="flex-1 flex flex-col gap-1 px-2 min-h-0 overflow-y-auto overflow-x-hidden scrollbar-none">
          {!isCollapsed && <p className="home-sidebar-section-label px-2">Menu</p>}
          <ul className="space-y-1">{mainNav.map(navLink)}</ul>

          {accountNav.length > 0 && (
            <>
              {!isCollapsed && <p className="home-sidebar-section-label px-2 mt-4">Account</p>}
              <ul className={`space-y-1 ${isCollapsed ? 'mt-3' : ''}`}>{accountNav.map(navLink)}</ul>
            </>
          )}
        </nav>

        <div className="home-sidebar-footer">
          <button
            type="button"
            onClick={onSignOut}
            title="Sign out"
            className={`home-sidebar-nav-item group w-full mb-2 ${isCollapsed ? '' : ''}`}
          >
            <SidebarNavIcon icon={LogOut} />
            {!isCollapsed && <span className="flex-1 text-sm text-left">Sign out</span>}
          </button>
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

export default PortalSidebar;
