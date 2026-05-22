import React from 'react';

interface CourseCardProps {
  title: string;
  department: string;
  description: string;
  progress?: number;
  type: 'Certificate' | 'Diploma';
  units: number;
  currentUnit?: number;
  thumbnail?: {
    gradient: string;
    icon: string;
  };
  onContinue?: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  title,
  department,
  description,
  progress = 0,
  type,
  units,
  currentUnit,
  onContinue,
}) => {
  return (
    <div className="ccard">
      <div className="cthumb">
        <div
          className="cthumb-inner"
          style={{
            background: 'linear-gradient(135deg, #1e3554, #2d5282)',
          }}
        >
          <div className="cthumb-icon">
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
        </div>
        <span className="cbadge">{type}</span>
      </div>
      <div className="cbody">
        <div className="cdept">{department}</div>
        <div className="ctitle">{title}</div>
        <div className="cdesc">{description}</div>
        {progress > 0 && (
          <div className="cprog">
            <div className="cprog-hd">
              <span className="cprog-lbl">Progress</span>
              <span className="cprog-pct">{progress}%</span>
            </div>
            <div className="pbar">
              <div className="pfill" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        )}
        <div className="cfoot">
          <button className="cbtn" onClick={onContinue}>
            <svg viewBox="0 0 24 24">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Continue
          </button>
          <div className="cpills">
            <span className="pill">{units} units</span>
            {currentUnit && <span className="pill">Unit {currentUnit}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
  trend?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  color = 'var(--accent)',
  trend,
}) => {
  return (
    <div className="stat">
      <div className="stat-top">
        <div
          className="stat-icon"
          style={{
            background: `${color}20`,
            color: color,
          }}
        >
          {icon}
        </div>
        {trend && (
          <span
            className="stat-tag"
            style={{
              background: `${color}20`,
              color: color,
            }}
          >
            {trend}
          </span>
        )}
      </div>
      <div className="stat-val" style={{ color }}>
        {value}
      </div>
      <div className="stat-lbl">{label}</div>
    </div>
  );
};

interface PanelProps {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export const Panel: React.FC<PanelProps> = ({ title, children, action }) => {
  return (
    <div className="panel">
      {title && (
        <div className="panel-hd">
          <span className="panel-title">{title}</span>
          {action && <span className="see-all">{action}</span>}
        </div>
      )}
      <div className="panel-body">{children}</div>
    </div>
  );
};

interface BannerProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

export const Banner: React.FC<BannerProps> = ({ title, subtitle, children }) => {
  return (
    <div className="banner">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        {children}
      </div>
      <div className="banner-art">
        <svg viewBox="0 0 24 24">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      </div>
    </div>
  );
};

interface ChipProps {
  label: string;
  variant?: 'ok' | 'pend' | 'done' | 'err';
}

export const Chip: React.FC<ChipProps> = ({ label, variant = 'done' }) => {
  return <span className={`chip ${variant}`}>{label}</span>;
};
