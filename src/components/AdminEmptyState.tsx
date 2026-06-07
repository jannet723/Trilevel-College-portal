import React from 'react';

interface AdminEmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
}

const AdminEmptyState: React.FC<AdminEmptyStateProps> = ({ icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm rounded-xl border border-dashed border-[#d4cfc8] p-10 text-center">
    <div className="w-14 h-14 bg-[#f0ece6] rounded-xl flex items-center justify-center mb-4 text-[#b0a89e]">
      {icon}
    </div>
    <h3 className="text-base font-medium text-[#6b645a] mb-1">{title}</h3>
    <p className="text-sm text-[#b0a89e] max-w-sm leading-relaxed mb-4">{description}</p>
    {action && (
      <button
        onClick={action.onClick}
        className="px-5 py-2 bg-[#2563eb]/10 hover:bg-[#2563eb]/20 text-[#2563eb] rounded-lg text-sm font-medium transition"
      >
        {action.label}
      </button>
    )}
  </div>
);

export default AdminEmptyState;
