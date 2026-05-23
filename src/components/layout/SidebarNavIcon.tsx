import type { LucideIcon } from 'lucide-react';

interface SidebarNavIconProps {
  icon: LucideIcon;
  active?: boolean;
}

/** Shared nav icon treatment for public + portal sidebars */
const SidebarNavIcon = ({ icon: Icon, active = false }: SidebarNavIconProps) => (
  <span className={`home-sidebar-nav-icon ${active ? 'home-sidebar-nav-icon--active' : ''}`}>
    <Icon size={16} strokeWidth={active ? 1.65 : 1.4} aria-hidden />
  </span>
);

export default SidebarNavIcon;
