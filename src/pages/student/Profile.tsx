import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Calendar,
  ShieldCheck,
  Pencil,
  Save,
  X,
} from "lucide-react";
import StudentLayout from "../../layouts/StudentLayout";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const userInfo = {
    name: "Jane Wanjiku",
    email: "jane.wanjiku@student.trilevel.ac.ke",
    studentId: "TLC/2024/0078",
    enrolled: "January 2024",
    phone: "+254 712 345 678",
    nId: "32456789",
    county: "Nairobi",
    verified: true,
  };

  return (
    <StudentLayout title="Profile Settings" subtitle="Manage your account details" backTo="/student/dashboard">
          {/* Layout */}
          <div className="grid grid-cols-[340px_1fr] gap-6">
            {/* LEFT PROFILE CARD */}
            <div className="bg-white/80 backdrop-blur-sm border border-[#e8e2d9] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
              {/* Top Banner */}
              <div className="h-28 bg-linear-to-br from-[#2c2824] to-[#1f1d1a] relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle,#ffffff_1px,transparent_1px)] bg-size-[20px_20px]" />
              </div>

              {/* Content */}
              <div className="px-6 pb-6 relative">
                {/* Avatar */}
                <div className="w-24 h-24 rounded-xl bg-linear-to-br from-[#4a6a9b] to-[#2c4a7a] border-4 border-white flex items-center justify-center text-white text-2xl font-medium shadow-md -mt-12 mx-auto">
                  JW
                </div>

                {/* Name */}
                <div className="text-center mt-4">
                  <h3 className="text-xl font-semibold text-[#2c2824]">
                    {userInfo.name}
                  </h3>
                  <p className="text-xs text-[#9b9288] mt-1.5 break-all">
                    {userInfo.email}
                  </p>

                  {/* Badge */}
                  <div className="inline-flex items-center gap-1.5 bg-linear-to-r from-[#eef5f0] to-[#e0ebe5] text-[#4a7c5e] px-3 py-1.5 rounded-full mt-4 text-xs font-medium">
                    <ShieldCheck size={12} />
                    Active Student
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-[#e8e2d9] my-6" />

                {/* Details */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#e8f0fe] to-[#d4e2f7] flex items-center justify-center shrink-0">
                      <CreditCard size={14} className="text-[#4a6a9b]" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.15em] text-[#b0a89e]">
                        Student ID
                      </p>
                      <p className="text-[#2c2824] text-sm font-medium mt-0.5">
                        {userInfo.studentId}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#eef5f0] to-[#ddebe2] flex items-center justify-center shrink-0">
                      <Calendar size={14} className="text-[#4a7c5e]" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.15em] text-[#b0a89e]">
                        Enrolled
                      </p>
                      <p className="text-[#2c2824] text-sm font-medium mt-0.5">
                        {userInfo.enrolled}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#f3eef9] to-[#e8e0f2] flex items-center justify-center shrink-0">
                      <MapPin size={14} className="text-[#7a5b9e]" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.15em] text-[#b0a89e]">
                        County
                      </p>
                      <p className="text-[#2c2824] text-sm font-medium mt-0.5">
                        {userInfo.county}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="bg-white/80 backdrop-blur-sm border border-[#e8e2d9] rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-200">
              {/* Header */}
              <div className="px-6 py-5 border-b border-[#e8e2d9] flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#9b9288] tracking-wide">
                    Update your information
                  </p>
                  <h3 className="text-xl font-semibold text-[#2c2824] mt-1">
                    Personal Information
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-[#e8f0fe] to-[#d4e2f7] flex items-center justify-center">
                  <User size={18} className="text-[#4a6a9b]" />
                </div>
              </div>

              {/* Form */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-5">
                  {/* First Name */}
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] mb-2 block font-medium">
                      First Name
                    </label>
                    <div className="relative">
                      <User size={14} className="absolute left-3.5 top-3.5 text-[#b0a89e]" />
                      <input
                        className={`w-full h-11 pl-9 pr-3 rounded-lg border transition-all duration-200 text-sm ${
                          isEditing 
                            ? 'bg-white border-[#d0c8be] focus:ring-2 focus:ring-[#4a6a9b]/20 focus:border-[#4a6a9b]/40 text-[#2c2824]' 
                            : 'bg-[#faf8f5] border-[#e8e2d9] text-[#6b645a] cursor-not-allowed'
                        } outline-none`}
                        defaultValue="Jane"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] mb-2 block font-medium">
                      Last Name
                    </label>
                    <div className="relative">
                      <User size={14} className="absolute left-3.5 top-3.5 text-[#b0a89e]" />
                      <input
                        className={`w-full h-11 pl-9 pr-3 rounded-lg border transition-all duration-200 text-sm ${
                          isEditing 
                            ? 'bg-white border-[#d0c8be] focus:ring-2 focus:ring-[#4a6a9b]/20 focus:border-[#4a6a9b]/40 text-[#2c2824]' 
                            : 'bg-[#faf8f5] border-[#e8e2d9] text-[#6b645a] cursor-not-allowed'
                        } outline-none`}
                        defaultValue="Wanjiku"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="col-span-2">
                    <label className="text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] mb-2 block font-medium">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail size={14} className="absolute left-3.5 top-3.5 text-[#b0a89e]" />
                      <input
                        className="w-full h-11 pl-9 pr-3 rounded-lg border bg-[#faf8f5] border-[#e8e2d9] text-[#9b9288] text-sm cursor-not-allowed"
                        defaultValue={userInfo.email}
                        disabled
                      />
                    </div>
                    <p className="text-[10px] text-[#b0a89e] mt-1.5">Email cannot be changed</p>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] mb-2 block font-medium">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone size={14} className="absolute left-3.5 top-3.5 text-[#b0a89e]" />
                      <input
                        className={`w-full h-11 pl-9 pr-3 rounded-lg border transition-all duration-200 text-sm ${
                          isEditing 
                            ? 'bg-white border-[#d0c8be] focus:ring-2 focus:ring-[#4a6a9b]/20 focus:border-[#4a6a9b]/40 text-[#2c2824]' 
                            : 'bg-[#faf8f5] border-[#e8e2d9] text-[#6b645a] cursor-not-allowed'
                        } outline-none`}
                        defaultValue={userInfo.phone}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  {/* National ID */}
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] mb-2 block font-medium">
                      National ID
                    </label>
                    <div className="relative">
                      <CreditCard size={14} className="absolute left-3.5 top-3.5 text-[#b0a89e]" />
                      <input
                        className={`w-full h-11 pl-9 pr-3 rounded-lg border transition-all duration-200 text-sm ${
                          isEditing 
                            ? 'bg-white border-[#d0c8be] focus:ring-2 focus:ring-[#4a6a9b]/20 focus:border-[#4a6a9b]/40 text-[#2c2824]' 
                            : 'bg-[#faf8f5] border-[#e8e2d9] text-[#6b645a] cursor-not-allowed'
                        } outline-none`}
                        defaultValue={userInfo.nId}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  {/* County - full width */}
                  <div className="col-span-2">
                    <label className="text-[10px] uppercase tracking-[0.15em] text-[#b0a89e] mb-2 block font-medium">
                      County of Residence
                    </label>
                    <div className="relative">
                      <MapPin size={14} className="absolute left-3.5 top-3.5 text-[#b0a89e]" />
                      <input
                        className={`w-full h-11 pl-9 pr-3 rounded-lg border transition-all duration-200 text-sm ${
                          isEditing 
                            ? 'bg-white border-[#d0c8be] focus:ring-2 focus:ring-[#4a6a9b]/20 focus:border-[#4a6a9b]/40 text-[#2c2824]' 
                            : 'bg-[#faf8f5] border-[#e8e2d9] text-[#6b645a] cursor-not-allowed'
                        } outline-none`}
                        defaultValue={userInfo.county}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-8">
                  <button
                    className={`h-10 px-5 rounded-lg font-medium text-sm flex items-center gap-2 transition-all duration-200 ${
                      isEditing
                        ? 'bg-linear-to-r from-[#4a6a9b] to-[#3d5a86] hover:from-[#3d5a86] hover:to-[#2c4a7a] text-white shadow-sm'
                        : 'bg-[#4a6a9b] hover:bg-[#3d5a86] text-white shadow-sm'
                    }`}
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? (
                      <>
                        <Save size={14} />
                        Save Changes
                      </>
                    ) : (
                      <>
                        <Pencil size={14} />
                        Edit Profile
                      </>
                    )}
                  </button>

                  {isEditing && (
                    <button
                      className="h-10 px-5 rounded-lg border border-[#e0d9d0] bg-white hover:bg-[#faf8f5] text-[#6b645a] font-medium text-sm flex items-center gap-2 transition-all duration-200"
                      onClick={() => setIsEditing(false)}
                    >
                      <X size={14} />
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
    </StudentLayout>
  );
};

export default Profile;