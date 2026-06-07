import type { ReactNode } from 'react';
import { ShieldCheck, LogOut } from 'lucide-react';

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
  onSignOut?: () => void;
}

const iconBg: Record<string, string> = {
  blue: 'bg-[#e8f0fe] text-[#4a6a9b]',
  green: 'bg-[#eef5f0] text-[#4a7c5e]',
  purple: 'bg-[#f3eef9] text-[#7a5b9e]',
};

const ProfileLayout = ({ name, email, badge, initials, details, children, onSignOut }: ProfileLayoutProps) => (
  <>
    <div className="portal-profile-grid">
    <aside className="portal-panel portal-panel--solid overflow-hidden relative">
      <div className="h-20 bg-gradient-to-r from-white/40 via-[#e8f0fe]/30 to-white/40 relative">
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle,#ffffff_1px,transparent_1px)] bg-size-[18px_18px]" />
      </div>
      <div className="px-5 sm:px-6 pb-6 -mt-10">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white border-4 border-[#eef5f0] flex items-center justify-center text-[#2563eb] text-xl font-semibold shadow-md">
            {initials}
          </div>
          <div className="min-w-0">
            <h2 className="home-display text-lg sm:text-xl text-[#2c2824] truncate">{name}</h2>
            <p className="text-xs text-[#9b9288] mt-1.5 break-all">{email}</p>
            <div className="inline-flex items-center gap-2 bg-[#eef5f0] text-[#4a7c5e] px-3 py-1.5 rounded-full mt-3 text-xs font-medium">
              <ShieldCheck size={12} />
              {badge}
            </div>
          </div>
        </div>

        <div className="border-t border-[#e8e2d9] my-6" />
        <div className="grid grid-cols-1 gap-3">
          {details.map((row) => (
            <div key={row.label} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/60 transition">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${iconBg[row.variant ?? 'blue']}`}>
                {row.icon}
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.12em] text-[#b0a89e]">{row.label}</p>
                <p className="text-sm font-medium text-[#2c2824] mt-0.5 truncate">{row.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>

    <div className="portal-panel portal-panel--solid overflow-hidden min-w-0">
      <div className="px-5 sm:px-6 py-5">{children}</div>
    </div>
    </div>

    {/* global sign out button placed below the panels */}
    {onSignOut && (
      <div className="mt-4 px-5 sm:px-6">
        <button
          type="button"
          onClick={onSignOut}
          className="inline-flex items-center gap-2 text-sm text-[#9b9288] hover:text-[#2c2824] transition-colors"
        >
          <LogOut size={16} />
          <span>Sign out</span>
        </button>
      </div>
    )}
  </>
);

export default ProfileLayout;
