import { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Calendar,
  Pencil,
  Save,
  X,
} from 'lucide-react';
import StudentLayout from '../../layouts/StudentLayout';
import ProfileLayout from '../../components/profile/ProfileLayout';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const userInfo = {
    name: 'Jane Wanjiku',
    email: 'jane.wanjiku@student.trilevel.ac.ke',
    studentId: 'TLC/2024/0078',
    enrolled: 'January 2024',
    phone: '+254 712 345 678',
    nId: '32456789',
    county: 'Nairobi',
  };

  const fieldClass = (editable: boolean) =>
    `w-full h-11 pl-10 pr-3 rounded-xl border text-sm transition-all outline-none ${
      editable && isEditing
        ? 'bg-white border-[#d0c8be] focus:ring-2 focus:ring-[#4a6a9b]/20 focus:border-[#4a6a9b]/40 text-[#2c2824]'
        : 'bg-[#faf8f5] border-[#e8e2d9] text-[#6b645a] cursor-not-allowed'
    }`;

  return (
    <StudentLayout title="Profile" subtitle="Your account and contact details" backTo="/student/dashboard">
      <ProfileLayout
        name={userInfo.name}
        email={userInfo.email}
        badge="Active Student"
        initials="JW"
        details={[
          {
            icon: <CreditCard size={14} />,
            label: 'Student ID',
            value: userInfo.studentId,
            variant: 'blue',
          },
          {
            icon: <Calendar size={14} />,
            label: 'Enrolled',
            value: userInfo.enrolled,
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
            <span className="home-section-label">Account</span>
            <h3 className="home-display text-lg text-[#2c2824]">Personal information</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#e8f0fe] flex items-center justify-center shrink-0">
            <User size={18} className="text-[#4a6a9b]" />
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-[10px] uppercase tracking-[0.14em] text-[#b0a89e] mb-2 block font-medium">
                First name
              </label>
              <div className="relative">
                <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b0a89e]" />
                <input className={fieldClass(true)} defaultValue="Jane" disabled={!isEditing} />
              </div>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.14em] text-[#b0a89e] mb-2 block font-medium">
                Last name
              </label>
              <div className="relative">
                <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b0a89e]" />
                <input className={fieldClass(true)} defaultValue="Wanjiku" disabled={!isEditing} />
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
              <p className="text-[10px] text-[#b0a89e] mt-1.5">Email cannot be changed here</p>
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
                National ID
              </label>
              <div className="relative">
                <CreditCard size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b0a89e]" />
                <input className={fieldClass(true)} defaultValue={userInfo.nId} disabled={!isEditing} />
              </div>
            </div>
            <div className="sm:col-span-2">
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
            <button
              type="button"
              className="home-cta-primary"
              onClick={() => setIsEditing(!isEditing)}
            >
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
    </StudentLayout>
  );
};

export default Profile;
