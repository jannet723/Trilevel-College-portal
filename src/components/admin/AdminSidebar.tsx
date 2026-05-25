import { BookOpen, LayoutDashboard, FileText, Upload, Users, User } from 'lucide-react';
import PortalSidebar from '../layout/PortalSidebar';

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onSignOut: () => void;
  userProfile?: { fullName?: string } | null;
}

const AdminSidebar = ({ userProfile, ...props }: AdminSidebarProps) => (
  <PortalSidebar
    portalLabel="Admin Portal"
    dashboardPath="/admin/dashboard"
    mainNav={[
      { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
      { icon: Users, label: 'Students', path: '/admin/manage-students' },
      { icon: BookOpen, label: 'Courses', path: '/admin/manage-courses' },
      { icon: Upload, label: 'Upload Materials', path: '/admin/upload-materials' },
      { icon: FileText, label: 'Approvals', path: '/admin/approvals' },
    ]}
    accountNav={[{ icon: User, label: 'Profile', path: '/admin/profile' }]}
    userProfile={userProfile}
    {...props}
  />
);

export default AdminSidebar;
