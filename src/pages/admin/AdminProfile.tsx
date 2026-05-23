import { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Building2,
  Pencil,
  Save,
  X,
} from 'lucide-react';
import AdminLayout from '../../layouts/AdminLayout';
import ProfileLayout from '../../components/profile/ProfileLayout';

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const userInfo = {
    name: 'Admin User',
    email: 'admin@trilevel.ac.ke',
    staffId: 'TLC/ADM/001',
    department: 'Academic Administration',
    phone: '+254 700 000 000',
    role: 'System Administrator',
    county: 'Nairobi',
  };

  const fieldClass = (editable: boolean) =>
    `w-full h-11 pl-10 pr-3 rounded-xl border text-sm transition-all outline-none ${
      editable && isEditing
        ? 'bg-white border-[#d0c8be] focus:ring-2 focus:ring-[#4a6a9b]/20 focus:border-[#4a6a9b]/40 text-[#2c2824]'
        : 'bg-[#faf8f5] border-[#e8e2d9] text-[#6b645a] cursor-not-allowed'
    }`;

  return (
    <AdminLayout title="Profile" subtitle="Your administrator account" backTo="/admin/dashboard">
      <ProfileLayout
        name={userInfo.name}
        email={userInfo.email}
        badge={userInfo.role}
        initials="AU"
        details={[
          {
            icon: <CreditCard size={14} />,
            label: 'Staff ID',
            value: userInfo.staffId,
            variant: 'blue',
          },
          {
            icon: <Building2 size={14} />,
            label: 'Department',
            value: userInfo.department,
            variant: 'green',
          },
          {
            icon: <MapPin size={14} />,
            label: 'County',
            value: userInfo.county,
            variant: 'purple',
          },
        ]}
      >
        <div className="px-5 sm:px-6 py-5 border-b border-[#e8e2d9] flex items-center justify-between gap-4">
          <div>
            <span className="home-section-label">Administrator</span>
            <h3 className="home-display text-lg text-[#2c2824]">Account details</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#fef5e8] flex items-center justify-center shrink-0">
            <User size={18} className="text-[#9a7530]" />
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-[10px] uppercase tracking-[0.14em] text-[#b0a89e] mb-2 block font-medium">
                Full name
              </label>
              <div className="relative">
                <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b0a89e]" />
                <input className={fieldClass(true)} defaultValue={userInfo.name} disabled={!isEditing} />
              </div>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.14em] text-[#b0a89e] mb-2 block font-medium">
                Role
              </label>
              <div className="relative">
                <Building2 size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b0a89e]" />
                <input
                  className="w-full h-11 pl-10 pr-3 rounded-xl border bg-[#faf8f5] border-[#e8e2d9] text-[#6b645a] text-sm cursor-not-allowed"
                  defaultValue={userInfo.role}
                  disabled
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="text-[10px] uppercase tracking-[0.14em] text-[#b0a89e] mb-2 block font-medium">
                Email
              </label>
              <div className="relative">
                <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b0a89e]" />
                <input
                  className="w-full h-11 pl-10 pr-3 rounded-xl border bg-[#faf8f5] border-[#e8e2d9] text-[#9b9288] text-sm cursor-not-allowed"
                  defaultValue={userInfo.email}
                  disabled
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.14em] text-[#b0a89e] mb-2 block font-medium">
                Phone
              </label>
              <div className="relative">
                <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b0a89e]" />
                <input className={fieldClass(true)} defaultValue={userInfo.phone} disabled={!isEditing} />
              </div>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.14em] text-[#b0a89e] mb-2 block font-medium">
                County
              </label>
              <div className="relative">
                <MapPin size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b0a89e]" />
                <input className={fieldClass(true)} defaultValue={userInfo.county} disabled={!isEditing} />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <button type="button" className="home-cta-primary" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? (
                <>
                  <Save size={14} />
                  Save changes
                </>
              ) : (
                <>
                  <Pencil size={14} />
                  Edit profile
                </>
              )}
            </button>
            {isEditing && (
              <button type="button" className="home-cta-ghost" onClick={() => setIsEditing(false)}>
                <X size={14} />
                Cancel
              </button>
            )}
          </div>
        </div>
      </ProfileLayout>
    </AdminLayout>
  );
};

export default AdminProfile;
