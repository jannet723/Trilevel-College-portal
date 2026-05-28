import { useEffect, useState } from 'react';
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
  AlertCircle,
} from 'lucide-react';
import AdminLayout from '../../layouts/AdminLayout';
import ProfileLayout from '../../components/profile/ProfileLayout';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../firebase/auth';

const AdminProfile = () => {
  const { user, userProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    county: '',
    staffId: '',
    department: '',
  });

  useEffect(() => {
    if (user && userProfile) {
      setFormData({
        name: userProfile.fullName || '',
        email: userProfile.email || '',
        phone: userProfile.phone || '',
        county: userProfile.county || '',
        staffId: userProfile.staffId || '',
        department: userProfile.department || '',
      });
    }
  }, [user, userProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSaveMessage(null);
  };

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);
    setSaveMessage(null);

    try {
      await authService.updateUserProfile(user.uid, {
        fullName: formData.name,
        phone: formData.phone,
        county: formData.county,
        staffId: formData.staffId,
        department: formData.department,
      });
      setSaveMessage({ type: 'success', text: 'Profile updated successfully!' });
      setIsEditing(false);
    } catch (err: any) {
      setSaveMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
      console.error('Profile update failed:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const userInfo = {
    name: formData.name || 'Administrator',
    email: formData.email,
    staffId: formData.staffId || 'TLC/ADM/001',
    department: formData.department || 'Academic Administration',
    phone: formData.phone || '+254 700 000 000',
    role: 'System Administrator',
    county: formData.county || 'Nairobi',
  };

  const fieldClass = (editable: boolean) =>
    `w-full h-11 pl-10 pr-3 rounded-xl border text-sm transition-all outline-none ${
      editable && isEditing
        ? 'bg-white border-[#d0c8be] focus:ring-2 focus:ring-[#4a6a9b]/20 focus:border-[#4a6a9b]/40 text-[#2c2824]'
        : 'bg-[#faf8f5] border-[#e8e2d9] text-[#6b645a] cursor-not-allowed'
    }`;

  const handleCancel = () => {
    if (user && userProfile) {
      setFormData({
        name: userProfile.fullName || '',
        email: userProfile.email || '',
        phone: userProfile.phone || '',
        county: userProfile.county || '',
        staffId: userProfile.staffId || '',
        department: userProfile.department || '',
      });
    }
    setIsEditing(false);
    setSaveMessage(null);
  };

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
          {saveMessage && (
            <div className={`mb-4 p-3 rounded-lg flex items-start gap-2.5 ${
              saveMessage.type === 'success'
                ? 'bg-[#f0f9f7] border border-[#c8e6e1]'
                : 'bg-[#fef5f5] border border-[#f0d0d0]'
            }`}>
              <AlertCircle size={14} className={`mt-0.5 shrink-0 ${
                saveMessage.type === 'success' ? 'text-[#059669]' : 'text-[#b70c0c]'
              }`} />
              <p className={`text-xs ${
                saveMessage.type === 'success' ? 'text-[#059669]' : 'text-[#b70c0c]'
              }`}>{saveMessage.text}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-[10px] uppercase tracking-[0.14em] text-[#b0a89e] mb-2 block font-medium">
                Full name
              </label>
              <div className="relative">
                <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b0a89e]" />
                <input 
                  className={fieldClass(true)} 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing} 
                />
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
                  value={userInfo.role}
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
                  value={userInfo.email}
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
                <input 
                  className={fieldClass(true)}
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing} 
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.14em] text-[#b0a89e] mb-2 block font-medium">
                County
              </label>
              <div className="relative">
                <MapPin size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b0a89e]" />
                <input 
                  className={fieldClass(true)}
                  name="county"
                  value={formData.county}
                  onChange={handleChange}
                  disabled={!isEditing} 
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.14em] text-[#b0a89e] mb-2 block font-medium">
                Staff ID
              </label>
              <div className="relative">
                <CreditCard size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b0a89e]" />
                <input 
                  className={fieldClass(true)}
                  name="staffId"
                  value={formData.staffId}
                  onChange={handleChange}
                  disabled={!isEditing} 
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.14em] text-[#b0a89e] mb-2 block font-medium">
                Department
              </label>
              <div className="relative">
                <Building2 size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b0a89e]" />
                <input 
                  className={fieldClass(true)}
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  disabled={!isEditing} 
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            {!isEditing ? (
              <button type="button" className="home-cta-primary" onClick={() => setIsEditing(true)}>
                <Pencil size={14} />
                Edit profile
              </button>
            ) : (
              <>
                <button 
                  type="button" 
                  className="home-cta-primary" 
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  <Save size={14} />
                  {isSaving ? 'Saving...' : 'Save changes'}
                </button>
                <button 
                  type="button" 
                  className="home-cta-ghost" 
                  onClick={handleCancel}
                  disabled={isSaving}
                >
                  <X size={14} />
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </ProfileLayout>
    </AdminLayout>
  );
};

export default AdminProfile;
