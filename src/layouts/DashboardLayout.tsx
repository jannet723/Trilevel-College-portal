import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  role: 'student' | 'admin';
  onSignOut: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  pageTitle,
  role,
  onSignOut,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="shell">
      <Sidebar
        role={role}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        onSignOut={onSignOut}
      />
      <div className={`main ${isCollapsed ? 'shifted' : ''}`}>
        <Topbar title={pageTitle} userInitials={role === 'admin' ? 'AD' : 'JW'} />
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
