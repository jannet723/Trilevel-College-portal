// Placeholder for reusable components
// Create component files as needed (Button, Card, Header, Sidebar, etc.)

import React from 'react';

export const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}> = ({ children, onClick, className = '' }) => (
  <button onClick={onClick} className={`btn ${className}`}>
    {children}
  </button>
);

export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`card ${className}`}>{children}</div>
);
