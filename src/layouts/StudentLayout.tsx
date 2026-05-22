import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { lastAction, clearLastAction } = useEnrollment();

  useEffect(() => {
    if (!lastAction) return;
    const t = setTimeout(clearLastAction, 4000);
    return () => clearTimeout(t);
  }, [lastAction, clearLastAction]);

  return (
    <div
      className="flex h-screen bg-[#f8f6f2] overflow-hidden font-['Inter',system-ui,-apple-system,sans-serif]"
      style={{ fontFamily: 'Georgia, serif' }}
    >
      <StudentSidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((c) => !c)}
        onSignOut={() => navigate('/')}
      />

      <main className="flex-1 overflow-y-auto relative">
        {lastAction && (
          <div
            className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg backdrop-blur-md animate-fade-in-up ${
              lastAction.type === 'enroll'
                ? 'bg-[#eef5f0]/95 border-[#ddebe2] text-[#4a7c5e]'
                : 'bg-white/95 border-[#e8e2d9] text-[#6b645a]'
            }`}
          >
            {lastAction.type === 'enroll' && <CheckCircle2 size={18} />}
            <span className="text-sm font-medium">
              {lastAction.type === 'enroll' ? 'Enrolled in' : 'Removed'} {lastAction.title}
            </span>
            <button type="button" onClick={clearLastAction} className="opacity-60 hover:opacity-100">
              <X size={14} />
            </button>
          </div>
        )}

        <div className="relative w-full min-w-0 px-6 sm:px-8 lg:px-10 py-6 sm:py-8">
          <StudentPageHeader title={title} subtitle={subtitle} showBack={showBack} backTo={backTo} />
          <div className="w-full">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default StudentLayout;
