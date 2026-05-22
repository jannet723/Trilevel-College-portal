import { Link, useLocation } from 'react-router-dom';
import {
  LogIn,
  UserPlus,
  BookOpen,
  Info,
  Home,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react';

interface HomeSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onSignIn: () => void;
  onRegister: () => void;
  onScrollToAbout: () => void;
}

const HomeSidebar = ({
  isCollapsed,
  onToggleCollapse,
  onSignIn,
  onRegister,
  onScrollToAbout,
}: HomeSidebarProps) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const navButtonClass = (active: boolean) =>
    `flex items-center w-full rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a6a9b]/30 ${
      isCollapsed ? 'justify-center p-3' : 'gap-3 px-3 py-2.5'
    } ${
      active
        ? 'bg-[#4a6a9b]/10 text-[#2c4a7a] font-medium'
        : 'text-[#6b645a] hover:bg-white/70 hover:text-[#2c2824]'
    }`;

  return (
    <aside
      className={`home-sidebar ${
        isCollapsed ? 'home-sidebar--collapsed' : ''
      } shrink-0 h-screen flex flex-col z-30 relative transition-all duration-300 ease-out`}
      aria-label="Site navigation"
    >
      <div className={`flex flex-col h-full ${isCollapsed ? 'p-3' : 'p-4'}`}>
        {/* Top — home only, no logo */}
        <div className={`mb-4 ${isCollapsed ? 'flex justify-center' : ''}`}>
          <Link
            to="/"
            title="Home"
            className={`${navButtonClass(isHome)} ${isCollapsed ? 'w-full' : ''}`}
          >
            <Home size={18} className="text-[#4a6a9b] shrink-0" />
            {!isCollapsed && <span className="text-sm">Home</span>}
          </Link>
        </div>

        <nav className="flex-1 flex flex-col gap-1 min-h-0">
          {!isCollapsed && (
            <p className="text-[9px] tracking-[0.18em] text-[#b0a89e] uppercase px-3 mb-2">Explore</p>
          )}
          <Link to="/courses" className={navButtonClass(false)} title={isCollapsed ? 'Programmes' : undefined}>
            <BookOpen size={18} className="text-[#4a6a9b] shrink-0" />
            {!isCollapsed && <span className="text-sm">Programmes</span>}
          </Link>
          <button
            type="button"
            onClick={onScrollToAbout}
            className={navButtonClass(false)}
            title={isCollapsed ? 'About' : undefined}
          >
            <Info size={18} className="text-[#4a6a9b] shrink-0" />
            {!isCollapsed && <span className="text-sm text-left">About</span>}
          </button>
        </nav>

        {/* Portal access */}
        <div
          className={`home-sidebar-portal mt-auto rounded-2xl border border-[#e8e2d9]/70 bg-white/55 backdrop-blur-sm ${
            isCollapsed ? 'p-2 space-y-2' : 'p-3 space-y-2.5'
          }`}
        >
          {!isCollapsed && (
            <div className="flex items-center gap-2 px-1 pb-0.5">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4a6a9b] opacity-35" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4a6a9b]" />
              </span>
              <p className="text-[10px] font-semibold text-[#6b645a] uppercase tracking-wider">Your portal</p>
            </div>
          )}

          <button
            type="button"
            onClick={onSignIn}
            title="Sign in"
            className={`home-sidebar-cta-primary relative w-full flex items-center ${
              isCollapsed ? 'justify-center p-3' : 'gap-2 px-3 py-2.5'
            } rounded-xl text-white text-sm font-semibold transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F2FE4]/40`}
          >
            {isCollapsed && (
              <span
                className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#d4a34b] ring-2 ring-white"
                aria-hidden
              />
            )}
            <LogIn size={isCollapsed ? 20 : 16} className="shrink-0" />
            {!isCollapsed && <span>Sign in</span>}
          </button>

          <button
            type="button"
            onClick={onRegister}
            title="Create account"
            className={`relative w-full flex items-center ${
              isCollapsed ? 'justify-center p-3' : 'gap-2 px-3 py-2.5'
            } rounded-xl border border-[#e8e2d9] bg-white/90 text-[#2c2824] text-sm font-medium hover:border-[#4a6a9b]/30 hover:bg-white transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a6a9b]/25`}
          >
            {isCollapsed && (
              <span
                className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#4a7c5e] ring-2 ring-white"
                aria-hidden
              />
            )}
            <UserPlus size={isCollapsed ? 20 : 16} className="text-[#4a6a9b] shrink-0" />
            {!isCollapsed && <span>Create account</span>}
          </button>

          {isCollapsed && (
            <p className="text-[8px] text-center text-[#9b9288] leading-tight px-0.5">Sign in · Join</p>
          )}
        </div>

        <button
          type="button"
          onClick={onToggleCollapse}
          className={`mt-3 w-full flex flex-col items-center justify-center gap-1 py-2.5 rounded-xl text-[#9b9288] hover:text-[#2c2824] hover:bg-white/50 text-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a6a9b]/20 ${
            isCollapsed ? '' : 'flex-row gap-2 border border-transparent hover:border-[#e8e2d9]/60'
          }`}
          aria-label={isCollapsed ? 'Open menu' : 'Collapse menu'}
        >
          {isCollapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={16} />}
          <span className={isCollapsed ? 'text-[9px] font-medium' : ''}>
            {isCollapsed ? 'Menu' : 'Collapse menu'}
          </span>
        </button>
      </div>
    </aside>
  );
};

export default HomeSidebar;
