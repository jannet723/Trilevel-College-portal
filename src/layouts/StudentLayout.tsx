import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import StudentSidebar from '../components/student/StudentSidebar';
import StudentPageHeader from '../components/student/StudentPageHeader';
import { useEnrollment } from '../context/EnrollmentContext';
import { CheckCircle2, X } from 'lucide-react';

interface StudentLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showBack?: boolean;
  backTo?: string;
}

const StudentLayout = ({ children, title, subtitle, showBack = true, backTo }: StudentLayoutProps) => {
  const navigate = useNavigate();
  const { logout, userProfile } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { lastAction, clearLastAction } = useEnrollment();

  const handleMobileMenuClick = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
    // Expand sidebar when opening mobile menu
    if (!isMobileSidebarOpen) {
      setIsSidebarCollapsed(false);
    }
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  useEffect(() => {
    if (!lastAction) return;
    const t = setTimeout(clearLastAction, 4000);
    return () => clearTimeout(t);
  }, [lastAction, clearLastAction]);

  return (
    <div className="h-screen flex bg-[#f8f6f2] overflow-hidden font-['Inter',system-ui,-apple-system,sans-serif] portal-light">
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 md:hidden"
          onClick={closeMobileSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar - Hidden on mobile, visible on md and up, overlay on mobile when open */}
      <div
        className={`fixed md:relative top-0 left-0 h-full z-30 md:z-auto transition-transform duration-300 ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <StudentSidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed((c) => !c)}
          onSignOut={async () => {
            await logout();
            navigate('/');
          }}
          userProfile={userProfile}
        />
      </div>

      <div className="flex-1 min-h-0 min-w-0 flex flex-col relative">
        <div className="home-hero-mesh pointer-events-none absolute inset-0" aria-hidden />
        <div className="home-grain pointer-events-none absolute inset-0" aria-hidden />

        {lastAction && (
          <div
            className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg backdrop-blur-md ${
              lastAction.type === 'enroll'
                ? 'bg-[#eef5f0]/95 border-[#ddebe2] text-[#4a7c5e]'
                : 'bg-white/95 border-[#e8e2d9] text-[#6b645a]'
            }`}
          >
            {lastAction.type === 'enroll' && <CheckCircle2 size={18} />}
            <span className="text-sm font-medium whitespace-nowrap">
              {lastAction.type === 'enroll' ? 'Enrolled in' : 'Removed'} {lastAction.title}
            </span>
            <button type="button" onClick={clearLastAction} className="opacity-60 hover:opacity-100">
              <X size={14} />
            </button>
          </div>
        )}

        <main className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none relative z-10">
          <div className="home-page-shell px-5 sm:px-8 lg:px-10 xl:px-12 py-6 sm:py-8">
            <StudentPageHeader
              title={title}
              subtitle={subtitle}
              showBack={showBack}
              backTo={backTo}
              onMenuClick={handleMobileMenuClick}
            />
            <div className="w-full">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
