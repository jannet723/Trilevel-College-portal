import { BookOpen, LayoutDashboard, Search, User } from 'lucide-react';
import PortalSidebar from '../layout/PortalSidebar';

interface StudentSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onSignOut: () => void;
  userProfile?: { fullName?: string } | null;
}

const StudentSidebar = ({ userProfile, ...props }: StudentSidebarProps) => (
  <PortalSidebar
    portalLabel="Student Portal"
    dashboardPath="/student/dashboard"
    mainNav={[
      { icon: LayoutDashboard, label: 'Dashboard', path: '/student/dashboard' },
      { icon: BookOpen, label: 'My Courses', path: '/student/my-courses' },
      { icon: Search, label: 'Browse Courses', path: '/courses' },
    ]}
    accountNav={[{ icon: User, label: 'Profile', path: '/student/profile' }]}
    userProfile={userProfile}
    {...props}
  />
);

export default StudentSidebar;
