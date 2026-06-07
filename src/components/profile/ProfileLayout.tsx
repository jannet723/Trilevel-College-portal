import type { ReactNode } from 'react';
import { ShieldCheck } from 'lucide-react';

export interface ProfileDetailRow {
  icon: ReactNode;
  label: string;
  value: string;
  variant?: 'blue' | 'green' | 'purple';
}

interface ProfileLayoutProps {
  name: string;
  email: string;
  badge: string;
  initials: string;
  details: ProfileDetailRow[];
  children: ReactNode;
}

const iconBg: Record<string, string> = {
  blue: 'bg-[#e8f0fe] text-[#4a6a9b]',
  green: 'bg-[#eef5f0] text-[#4a7c5e]',
  purple: 'bg-[#f3eef9] text-[#7a5b9e]',
};

const ProfileLayout = ({ name, email, badge, initials, details, children }: ProfileLayoutProps) => (
  <div className="portal-profile-grid">
    <aside className="portal-panel portal-panel--solid overflow-hidden">
      <div className="h-24 bg-[#1e40af] relative">
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle,#ffffff_1px,transparent_1px)] bg-size-[18px_18px]" />
      </div>
      <div className="px-5 sm:px-6 pb-6 -mt-12">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-[#4a6a9b] border-4 border-white flex items-center justify-center text-white text-xl font-semibold shadow-lg mx-auto">
          {initials}
        </div>
        <div className="text-center mt-4">
          <h2 className="home-display text-lg sm:text-xl text-[#2c2824]">{name}</h2>
          <p className="text-xs text-[#9b9288] mt-1.5 break-all px-1">{email}</p>
          <div className="inline-flex items-center gap-1.5 bg-[#eef5f0] text-[#4a7c5e] px-3 py-1.5 rounded-full mt-4 text-xs font-medium">
            <ShieldCheck size={12} />
            {badge}
          </div>
        </div>
        <div className="border-t border-[#e8e2d9] my-6" />
        <div className="space-y-4">
          {details.map((row) => (
            <div key={row.label} className="flex items-start gap-3">
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                  iconBg[row.variant ?? 'blue']
                }`}
              >
                {row.icon}
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.14em] text-[#b0a89e]">{row.label}</p>
                <p className="text-sm font-medium text-[#2c2824] mt-0.5 wrap-break-word">{row.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>

    <div className="portal-panel portal-panel--solid overflow-hidden min-w-0">{children}</div>
  </div>
);

export default ProfileLayout;
