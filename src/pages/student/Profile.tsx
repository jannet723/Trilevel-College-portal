import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
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
import { authService } from '../../firebase/auth';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { userProfile, user, logout } = useAuth();
  const navigate = useNavigate();

  const [savedProfile, setSavedProfile] = useState<any>(userProfile ?? null);

  useEffect(() => { setSavedProfile(userProfile ?? null); }, [userProfile]);

  const userInfo = {
    name: savedProfile?.fullName ?? userProfile?.fullName ?? user?.displayName ?? 'Unnamed Student',
    email: savedProfile?.email ?? userProfile?.email ?? user?.email ?? '',
    studentId: savedProfile?.studentId ?? userProfile?.studentId ?? '—',
    enrolled: savedProfile?.enrolled ?? userProfile?.enrolled ?? '—',
    phone: savedProfile?.phone ?? userProfile?.phone ?? '—',
    nId: savedProfile?.nId ?? userProfile?.nId ?? '—',
    county: savedProfile?.county ?? userProfile?.county ?? '—',
  };

  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', county: '' });

  useEffect(() => {
    const full = (savedProfile?.fullName ?? userProfile?.fullName ?? user?.displayName ?? '');
    const parts = full.split(' ').filter(Boolean);
    setForm({
      firstName: parts[0] ?? '',
      lastName: parts.slice(1).join(' ') ?? '',
      phone: savedProfile?.phone ?? userProfile?.phone ?? '',
      county: savedProfile?.county ?? userProfile?.county ?? '',
    });
  }, [savedProfile, userProfile, user]);

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
        badge={userProfile?.role === 'admin' ? 'Staff' : 'Active Student'}
        initials={(userInfo.name || 'U').split(' ').map((s: string) => s[0]).slice(0,2).join('').toUpperCase()}
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
            value: typeof userInfo.enrolled === 'object' ? String(userInfo.enrolled) : userInfo.enrolled,
            variant: 'green',
          },
          {
            icon: <MapPin size={14} />,
            label: 'County',
            value: userInfo.county,
            variant: 'purple',
          },
        ]}
        onSignOut={async () => { try { await logout(); navigate('/'); } catch (err) { console.error('Sign out failed', err); } }}
      >
        {/* header removed from right panel; left aside holds profile summary */}

        <div className="p-6 sm:p-8 bg-white/60 rounded-xl mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] uppercase tracking-[0.14em] text-[#b0a89e] mb-2 block font-medium">
                First name
              </label>
              <div className="relative">
                <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b0a89e]" />
                <input className={fieldClass(true)} value={form.firstName} onChange={(e) => setForm(f => ({ ...f, firstName: e.target.value }))} disabled={!isEditing} />
              </div>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.14em] text-[#b0a89e] mb-2 block font-medium">
                Last name
              </label>
              <div className="relative">
                <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b0a89e]" />
                <input className={fieldClass(true)} value={form.lastName} onChange={(e) => setForm(f => ({ ...f, lastName: e.target.value }))} disabled={!isEditing} />
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
                <input className={fieldClass(true)} value={form.phone} onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))} disabled={!isEditing} />
              </div>
            </div>
            {/* National ID removed per design */}
            <div className="sm:col-span-2">
              <label className="text-[10px] uppercase tracking-[0.14em] text-[#b0a89e] mb-2 block font-medium">
                County
              </label>
              <div className="relative">
                <MapPin size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b0a89e]" />
                <input className={fieldClass(true)} value={form.county} onChange={(e) => setForm(f => ({ ...f, county: e.target.value }))} disabled={!isEditing} />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <button
              type="button"
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-transform duration-200 ease-in-out transform hover:-translate-y-0.5 ${isEditing ? 'btn-primary text-white' : 'btn-soft-primary'}`}
              onClick={async () => {
                if (!isEditing) { setIsEditing(true); return; }
                try {
                  if (!user) throw new Error('Not authenticated');
                    const fullName = `${form.firstName} ${form.lastName}`.trim();
                    const updated = await authService.updateUserProfile(user.uid, {
                      fullName,
                      phone: form.phone,
                      county: form.county,
                    });
                  setSavedProfile(updated);
                  setIsEditing(false);
                } catch (err) {
                  console.error('Failed to save profile', err);
                }
              }}
            >
              {isEditing ? (
                <>
                  <Save size={12} />
                  <span className="ml-1">Save changes</span>
                </>
              ) : (
                <>
                  <Pencil size={12} />
                  <span className="ml-1">Edit profile</span>
                </>
              )}
            </button>
            {isEditing && (
              <button type="button" className="home-cta-ghost" onClick={() => setIsEditing(false)}>
                <X size={14} />
                <span className="ml-2">Cancel</span>
              </button>
            )}
          </div>
          {/* moved sign out to left aside */}
        </div>
      </ProfileLayout>
    </StudentLayout>
  );
};

export default Profile;
