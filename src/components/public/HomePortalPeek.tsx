import { useState } from 'react';
import { BookOpen, LayoutDashboard, FileText, ChevronRight } from 'lucide-react';

const tabs = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    headline: 'Your progress at a glance',
    points: ['Enrolled programmes', 'Continue where you left off', 'Announcements'],
  },
  {
    id: 'courses',
    label: 'Programmes',
    icon: BookOpen,
    headline: 'Browse & enrol in seconds',
    points: ['13 certificate & diploma paths', 'Filter by department', 'One-click enrolment'],
  },
  {
    id: 'materials',
    label: 'Materials',
    icon: FileText,
    headline: 'Notes & files, per course',
    points: ['Lecture uploads', 'Download or view PDFs', 'Organised by unit'],
  },
] as const;

interface HomePortalPeekProps {
  onSignIn: () => void;
}

const HomePortalPeek = ({ onSignIn }: HomePortalPeekProps) => {
  const [active, setActive] = useState<(typeof tabs)[number]['id']>('dashboard');
  const current = tabs.find((t) => t.id === active) ?? tabs[0];
  const Icon = current.icon;

  return (
    <section id="portal-peek" className="home-portal-peek mb-16 lg:mb-24 scroll-mt-8" aria-label="Portal preview">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
        <div>
          <span className="home-section-label">Inside the portal</span>
          <h2 className="home-display text-2xl sm:text-3xl text-[#2c2824] max-w-md">
            See what awaits after you sign in
          </h2>
        </div>
        <button type="button" onClick={onSignIn} className="home-cta-ghost shrink-0 self-start lg:self-auto">
          Open your portal
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid lg:grid-cols-[220px_1fr] gap-4 lg:gap-6">
        <div className="flex lg:flex-col gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none" role="tablist">
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(tab.id)}
                className={`home-portal-tab shrink-0 flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-white border border-[#4a6a9b]/25 text-[#2c4a7a] shadow-[0_8px_24px_-12px_rgba(74,106,155,0.2)]'
                    : 'border border-transparent text-[#6b645a] hover:bg-white/60 hover:border-[#e8e2d9]'
                }`}
              >
                <TabIcon size={16} className={isActive ? 'text-[#4a6a9b]' : 'text-[#9b9288]'} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          className="home-portal-window relative rounded-2xl border border-[#e8e2d9]/80 bg-white/70 backdrop-blur-md overflow-hidden min-h-55"
          role="tabpanel"
        >
          <div className="h-9 flex items-center gap-1.5 px-4 border-b border-[#e8e2d9]/60 bg-[#faf8f5]/90">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e8c4c4]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#faeedc]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ddebe2]" />
            <span className="ml-3 text-[10px] text-[#9b9288] font-mono">trilevel.portal</span>
          </div>
          <div key={active} className="p-6 sm:p-8 home-portal-panel-enter">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#e8f0fe] flex items-center justify-center text-[#4a6a9b]">
                <Icon size={22} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-[#9b9288] mb-1">Student view</p>
                <h3 className="text-lg font-semibold text-[#2c2824]">{current.headline}</h3>
              </div>
            </div>
            <ul className="space-y-3">
              {current.points.map((point, i) => (
                <li
                  key={point}
                  className="flex items-center gap-3 text-sm text-[#555]"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span className="w-6 h-6 rounded-lg bg-[#4a6a9b]/10 text-[#4a6a9b] text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-[#2F2FE4]/8 rounded-full blur-3xl pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default HomePortalPeek;
