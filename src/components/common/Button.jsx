import React from 'react';

/**
 * Jal Seva Standard Button Component
 * Supports primary, navy, secondary, outline, destructive, and ghost variants.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-button select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 min-h-[36px]',
    md: 'text-sm px-4 py-2.5 gap-2 min-h-[44px]',
    lg: 'text-base px-6 py-3.5 gap-2.5 min-h-[48px]',
  };

  const variantStyles = {
    // Primary Water Blue (Action button)
    primary: 'bg-jal-blue hover:bg-[#076ba0] text-white shadow-sm focus-visible:ring-jal-blue',
    // Main Brand Navy
    navy: 'bg-jal-navy hover:bg-[#12365e] text-white shadow-sm focus-visible:ring-jal-navy',
    // Secondary light surface
    secondary: 'bg-jal-pale-blue text-jal-blue hover:bg-[#ddf0f9] border border-jal-border focus-visible:ring-jal-blue',
    // Clean outline
    outline: 'bg-white hover:bg-slate-50 text-jal-slate-900 border border-jal-border hover:border-slate-300 focus-visible:ring-jal-blue',
    // Destructive
    destructive: 'bg-jal-danger hover:bg-[#af3b3b] text-white shadow-sm focus-visible:ring-jal-danger',
    // Ghost
    ghost: 'text-jal-slate-600 hover:text-jal-slate-900 hover:bg-slate-100 focus-visible:ring-jal-blue',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        Icon && iconPosition === 'left' && <Icon className="w-4 h-4 flex-shrink-0" />
      )}
      <span>{children}</span>
      {!loading && Icon && iconPosition === 'right' && <Icon className="w-4 h-4 flex-shrink-0" />}
    </button>
  );
}
