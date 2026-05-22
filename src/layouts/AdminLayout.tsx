import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminPageHeader from '../components/admin/AdminPageHeader';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showBack?: boolean;
  backTo?: string;
}

const AdminLayout = ({
  children,
  title,
  subtitle,
  showBack = true,
  backTo = '/admin/dashboard',
}: AdminLayoutProps) => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div
      className="flex h-screen bg-[#f8f6f2] overflow-hidden font-['Inter',system-ui,-apple-system,sans-serif]"
      style={{ fontFamily: 'Georgia, serif' }}
    >
      <AdminSidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((c) => !c)}
        onSignOut={() => navigate('/')}
      />

      <main className="flex-1 overflow-y-auto relative">
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(74,106,155,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(74,106,155,0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative w-full min-w-0 px-6 sm:px-8 lg:px-10 py-6 sm:py-8">
          <AdminPageHeader title={title} subtitle={subtitle} showBack={showBack} backTo={backTo} />
          <div className="w-full">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
