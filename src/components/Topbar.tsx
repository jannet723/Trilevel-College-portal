import React from 'react';

interface TopbarProps {
  title: string;
  onSearch?: (query: string) => void;
  userInitials?: string;
}

const Topbar: React.FC<TopbarProps> = ({ title, userInitials = 'JW' }) => {
  return (
    <header className="topbar">
      <div className="tb-title text-[#2c2824]">{title}</div>
      <div className="tb-actions">
        <div className="tb-btn">
          <svg viewBox="0 0 24 24">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <div className="notif-dot"></div>
        </div>
        <div className="avatar">{userInitials}</div>
      </div>
    </header>
  );
};

export default Topbar;
