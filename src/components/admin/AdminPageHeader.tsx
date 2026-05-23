import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, ChevronRight } from 'lucide-react';

interface AdminPageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  backTo?: string;
  homeTo?: string;
}

const AdminPageHeader = ({
  title,
  subtitle,
  showBack = true,
  backTo = '/admin/dashboard',
  homeTo = '/',
}: AdminPageHeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backTo) navigate(backTo);
    else navigate(-1);
  };

  return (
    <header className="portal-page-header mb-6">
      <nav className="flex items-center gap-2 text-xs text-[#9b9288] mb-4 flex-wrap">
        <button
          type="button"
          onClick={() => navigate(homeTo)}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[#e8e2d9] bg-white text-[#6b645a] hover:bg-[#faf8f5] hover:text-[#4a6a9b] hover:border-[#4a6a9b]/30 transition-all duration-200"
        >
          <Home size={13} className="text-[#9b9288]" />
          <span className="text-[#6b645a]">Home</span>
        </button>
        {showBack && (
          <>
            <ChevronRight size={12} className="text-[#d0c8be]" />
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[#e8e2d9] bg-white text-[#6b645a] hover:bg-[#faf8f5] hover:text-[#4a6a9b] hover:border-[#4a6a9b]/30 transition-all duration-200"
            >
              <ArrowLeft size={13} className="text-[#9b9288]" />
              <span className="text-[#6b645a]">Back</span>
            </button>
          </>
        )}
      </nav>
      <h1 className="home-display text-2xl sm:text-3xl text-[#2c2824] tracking-tight">{title}</h1>
      {subtitle && <p className="text-sm text-[#6b645a] mt-1.5 max-w-2xl leading-relaxed">{subtitle}</p>}
    </header>
  );
};

export default AdminPageHeader;
