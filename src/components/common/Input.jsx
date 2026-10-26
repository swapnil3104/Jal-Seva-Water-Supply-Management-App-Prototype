import React from 'react';

export default function Input({
  id,
  type = 'text',
  className = '',
  hasError = false,
  icon: Icon,
  ...props
}) {
  const baseStyles = 'w-full rounded-input border bg-white px-3.5 py-2.5 text-sm text-jal-slate-900 placeholder:text-slate-400 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:bg-slate-100 disabled:cursor-not-allowed';
  
  const borderStyles = hasError
    ? 'border-jal-danger focus:border-jal-danger focus:ring-jal-danger/20'
    : 'border-jal-border focus:border-jal-blue focus:ring-jal-blue/20';

  if (Icon) {
    return (
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
          <Icon className="w-4 h-4" />
        </div>
        <input
          id={id}
          type={type}
          className={`${baseStyles} ${borderStyles} pl-9.5 ${className}`}
          {...props}
        />
      </div>
    );
  }

  return (
    <input
      id={id}
      type={type}
      className={`${baseStyles} ${borderStyles} ${className}`}
      {...props}
    />
  );
}
