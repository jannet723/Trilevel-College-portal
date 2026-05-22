import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  badge?: number;
}

interface SidebarProps {
  role: 'student' | 'admin';
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onSignOut: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, isCollapsed, onToggleCollapse, onSignOut }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const studentItems: SidebarItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/student/dashboard' },
    { id: 'my-courses', label: 'My Courses', icon: '📚', path: '/student/my-courses', badge: 4 },
    { id: 'profile', label: 'Profile', icon: '👤', path: '/student/profile' },
  ];

  const adminItems: SidebarItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/admin/dashboard' },
    { id: 'students', label: 'Students', icon: '👥', path: '/admin/manage-students', badge: 1240 },
    { id: 'courses', label: 'Courses', icon: '📚', path: '/admin/manage-courses' },
    { id: 'approvals', label: 'Approvals', icon: '✓', path: '/admin/approvals', badge: 12 },
    { id: 'uploads', label: 'Upload Materials', icon: '⬆️', path: '/admin/upload-materials' },
  ];

  const items = role === 'student' ? studentItems : adminItems;

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="s-logo">
        <div className="s-logo-mark">
          <img src="/logo.png" alt="Trilevel Logo" className="w-10 h-10 object-contain" />
        </div>
        <div className="s-logo-text">
          <strong>Trilevel</strong>
          <span>{role === 'student' ? 'Student Portal' : 'Admin Portal'}</span>
        </div>
      </div>

      <nav className="s-nav">
        <div className="s-section">
          {role === 'student' ? 'Main' : 'Administration'}
        </div>
        {items.slice(0, role === 'student' ? 2 : 5).map((item) => (
          <button
            key={item.id}
            className={`s-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => handleNavClick(item.path)}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
            {item.badge && <span className="s-badge">{item.badge}</span>}
          </button>
        ))}

        {role === 'student' && (
          <>
            <div className="s-section">Account</div>
            {items.slice(2).map((item) => (
              <button
                key={item.id}
                className={`s-item ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => handleNavClick(item.path)}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
                {item.badge && <span className="s-badge">{item.badge}</span>}
              </button>
            ))}
          </>
        )}
      </nav>

      <div className="s-footer">
        <button className="s-collapse" onClick={onToggleCollapse}>
          <svg viewBox="0 0 24 24" className="collapse-arrow">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          <span>Collapse sidebar</span>
        </button>
        <button className="s-item s-signout" onClick={onSignOut}>
          <svg viewBox="0 0 24 24">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
