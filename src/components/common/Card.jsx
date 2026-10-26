import React from 'react';

/**
 * Jal Seva Card Component
 * Conforms to 16px radius, soft borders, clean padding, and optional hover states.
 */
export default function Card({
  children,
  className = '',
  hoverable = false,
  onClick,
  variant = 'default',
  ...props
}) {
  const baseStyles = 'rounded-card border transition-all duration-200 overflow-hidden';
  
  const variantStyles = {
    default: 'bg-white border-jal-border shadow-card text-jal-slate-900',
    flat: 'bg-white border-jal-border text-jal-slate-900',
    surface: 'bg-surface-container-low border-surface-container text-jal-slate-900',
    highlight: 'bg-jal-pale-blue border-jal-cyan/30 text-jal-slate-900',
    navy: 'bg-jal-navy border-jal-navy text-white shadow-elevated',
  };

  const hoverStyles = hoverable
    ? 'hover:shadow-card-hover hover:-translate-y-0.5 cursor-pointer active:translate-y-0'
    : '';

  return (
    <div
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant] || variantStyles.default} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', ...props }) {
  return (
    <div className={`p-4 sm:p-5 border-b border-jal-border/60 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '', ...props }) {
  return (
    <div className={`p-4 sm:p-5 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '', ...props }) {
  return (
    <div className={`p-4 sm:p-5 bg-slate-50/70 border-t border-jal-border/60 ${className}`} {...props}>
      {children}
    </div>
  );
}
