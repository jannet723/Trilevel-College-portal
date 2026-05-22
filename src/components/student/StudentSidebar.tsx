import { useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, Menu, Search, User } from 'lucide-react';

interface StudentSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onSignOut: () => void;
}

const navItems = [
  { icon: Menu, label: 'Dashboard', path: '/student/dashboard' },
  { icon: BookOpen, label: 'My Courses', path: '/student/my-courses' },
  { icon: Search, label: 'Browse Courses', path: '/student/courses' },
];

const StudentSidebar = ({ isCollapsed, onToggleCollapse, onSignOut }: StudentSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside
      className={`${
        isCollapsed ? 'w-[4.5rem]' : 'w-64'
      } bg-white/50 backdrop-blur-xl text-[#2c2824] flex flex-col shrink-0 border-r border-[#e8e2d9]/80 shadow-[4px_0_24px_-12px_rgba(44,40,36,0.08)] transition-all duration-300 ease-out`}
    >
      <div className={`border-b border-[#e8e2d9] ${isCollapsed ? 'p-4' : 'p-6'}`}>
        <button
          type="button"
          onClick={() => navigate('/student/dashboard')}
          className={`flex items-center w-full ${isCollapsed ? 'justify-center' : 'gap-3'} group`}
          title="Dashboard"
        >
          <img
            src="/logo.png"
            alt="Trilevel Logo"
            className={`object-contain shrink-0 transition-transform duration-300 group-hover:scale-105 ${
              isCollapsed ? 'w-10 h-10' : 'w-15 h-15'
            }`}
          />
          {!isCollapsed && (
            <div className="text-left">
              <div className="font-semibold text-xl tracking-tight bg-linear-to-r from-[#2c2824] to-[#5a5248] bg-clip-text text-transparent">
                Trilevel College
              </div>
              <div className="text-[10px] tracking-[0.2em] text-[#9b9288] uppercase">Student Portal</div>
            </div>
          )}
        </button>
      </div>

      <nav className="flex-1 p-3">
        {!isCollapsed && (
          <div className="text-[10px] tracking-[0.2em] text-[#b0a89e] uppercase mb-3 px-3">Main</div>
        )}
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <li key={item.path}>
                <button
                  type="button"
                  onClick={() => navigate(item.path)}
                  title={isCollapsed ? item.label : undefined}
                  className={`w-full flex items-center ${
                    isCollapsed ? 'justify-center px-0 py-3' : 'gap-3 px-4 py-2.5'
                  } rounded-xl transition-all duration-200 ${
                    active
                      ? 'bg-[#4a6a9b]/12 text-[#2c4a7a] font-medium shadow-sm'
                      : 'text-[#6b645a] hover:bg-[#eae5dd]/80 hover:text-[#2c2824]'
                  }`}
                >
                  <Icon size={18} strokeWidth={active ? 2.2 : 1.8} />
                  {!isCollapsed && <span className="text-sm">{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>

        {!isCollapsed && (
          <div className="text-[10px] tracking-[0.2em] text-[#b0a89e] uppercase mb-3 mt-8 px-3">Account</div>
        )}
        <ul className={`space-y-1 ${isCollapsed ? 'mt-4' : ''}`}>
          <li>
            <button
              type="button"
              onClick={() => navigate('/student/profile')}
              title={isCollapsed ? 'Profile' : undefined}
              className={`w-full flex items-center ${
                isCollapsed ? 'justify-center py-3' : 'gap-3 px-4 py-2.5'
              } rounded-xl transition-all duration-200 ${
                location.pathname === '/student/profile'
                  ? 'bg-[#4a6a9b]/12 text-[#2c4a7a] font-medium'
                  : 'text-[#6b645a] hover:bg-[#eae5dd]/80 hover:text-[#2c2824]'
              }`}
            >
              <User size={18} />
              {!isCollapsed && <span className="text-sm">Profile</span>}
            </button>
          </li>
        </ul>
      </nav>

      <div className={`border-t border-[#e8e2d9] space-y-1 ${isCollapsed ? 'p-3' : 'p-5'}`}>
        <button
          type="button"
          onClick={onToggleCollapse}
          className={`text-[#9b9288] text-xs hover:text-[#2c2824] transition flex items-center w-full ${
            isCollapsed ? 'justify-center py-2' : 'gap-2'
          }`}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d={isCollapsed ? 'm9 18 6-6-6-6' : 'm15 18-6-6 6-6'} />
          </svg>
          {!isCollapsed && <span>Collapse sidebar</span>}
        </button>
        <button
          type="button"
          onClick={onSignOut}
          className={`text-[#9b9288] text-xs hover:text-[#2c2824] transition flex items-center w-full ${
            isCollapsed ? 'justify-center py-2' : 'gap-2'
          }`}
          title="Sign out"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          {!isCollapsed && <span>Sign out</span>}
        </button>
      </div>
    </aside>
  );
};

export default StudentSidebar;
