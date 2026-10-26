import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function Select({
  id,
  options = [],
  className = '',
  hasError = false,
  placeholder,
  children,
  ...props
}) {
  const baseStyles = 'w-full appearance-none rounded-input border bg-white px-3.5 py-2.5 pr-9 text-sm text-jal-slate-900 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:bg-slate-100 disabled:cursor-not-allowed';
  
  const borderStyles = hasError
    ? 'border-jal-danger focus:border-jal-danger focus:ring-jal-danger/20'
    : 'border-jal-border focus:border-jal-blue focus:ring-jal-blue/20';

  return (
    <div className="relative">
      <select
        id={id}
        className={`${baseStyles} ${borderStyles} ${className}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children || options.map((opt) => {
          const val = typeof opt === 'object' ? opt.value : opt;
          const lab = typeof opt === 'object' ? opt.label : opt;
          return (
            <option key={val} value={val}>
              {lab}
            </option>
          );
        })}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
        <ChevronDown className="w-4 h-4" />
      </div>
    </div>
  );
}
