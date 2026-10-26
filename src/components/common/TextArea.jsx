import React from 'react';

export default function TextArea({
  id,
  rows = 3,
  className = '',
  hasError = false,
  ...props
}) {
  const baseStyles = 'w-full rounded-input border bg-white px-3.5 py-2.5 text-sm text-jal-slate-900 placeholder:text-slate-400 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:bg-slate-100 disabled:cursor-not-allowed resize-y';
  
  const borderStyles = hasError
    ? 'border-jal-danger focus:border-jal-danger focus:ring-jal-danger/20'
    : 'border-jal-border focus:border-jal-blue focus:ring-jal-blue/20';

  return (
    <textarea
      id={id}
      rows={rows}
      className={`${baseStyles} ${borderStyles} ${className}`}
      {...props}
    />
  );
}
