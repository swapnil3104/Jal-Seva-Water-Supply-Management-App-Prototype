import React from 'react';

/**
 * Accessible form field wrapper with label, required marker, helper text, and error handling.
 */
export default function FormField({
  id,
  label,
  required = false,
  helperText,
  error,
  children,
  className = '',
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-xs sm:text-sm font-semibold text-jal-slate-900">
          {label}
          {required && <span className="text-jal-danger ml-1" aria-hidden="true">*</span>}
        </label>
      )}
      {children}
      {error ? (
        <p id={id ? `${id}-error` : undefined} className="text-xs text-jal-danger font-medium flex items-center gap-1">
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p id={id ? `${id}-helper` : undefined} className="text-xs text-jal-slate-600">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
