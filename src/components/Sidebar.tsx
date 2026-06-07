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
    { id: 'students', label: 'Students', icon: '👥', path: '/admin/manage-students' },
    { id: 'courses', label: 'Courses', icon: '📚', path: '/admin/manage-courses' },
    { id: 'approvals', label: 'Approvals', icon: '✓', path: '/admin/approvals' },
    { id: 'uploads', label: 'Upload Materials', icon: '⬆️', path: '/admin/upload-materials' },
  ];

  const items = role === 'student' ? studentItems : adminItems;

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="s-logo">
        <img src="/logo.png" alt="Trilevel Logo" className="w-15 h-15 object-contain shrink-0" />
        <div className="s-logo-text">
          <strong>Trilevel College</strong>
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
        {/* Sign out moved to Profile page */}
      </div>
    </aside>
  );
};

export default Sidebar;
