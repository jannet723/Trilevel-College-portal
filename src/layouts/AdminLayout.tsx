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
    <div className="h-screen flex bg-[#f8f6f2] overflow-hidden font-['Inter',system-ui,-apple-system,sans-serif] portal-light">
      <AdminSidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((c) => !c)}
        onSignOut={() => navigate('/')}
      />

      <div className="flex-1 min-h-0 min-w-0 flex flex-col relative">
        <div className="home-hero-mesh pointer-events-none absolute inset-0" aria-hidden />
        <div className="home-grain pointer-events-none absolute inset-0" aria-hidden />

        <main className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none relative z-10">
          <div className="home-page-shell px-5 sm:px-8 lg:px-10 xl:px-12 py-6 sm:py-8">
            <AdminPageHeader title={title} subtitle={subtitle} showBack={showBack} backTo={backTo} />
            <div className="w-full">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
