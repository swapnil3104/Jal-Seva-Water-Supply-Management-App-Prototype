import React from 'react';
import { HelpCircle } from 'lucide-react';
import Button from './Button';

/**
 * Reusable Empty State component with consistent water-themed styling
 */
export default function EmptyState({
  icon: Icon = HelpCircle,
  title = 'माहिती उपलब्ध नाही',
  description = 'सध्या येथे कोणतीही माहिती किंवा नोंदी आढळल्या नाहीत.',
  actionText,
  onAction,
  className = '',
}) {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-white rounded-card border border-dashed border-jal-border ${className}`}>
      <div className="w-14 h-14 rounded-2xl bg-jal-pale-blue flex items-center justify-center text-jal-blue mb-3.5 shadow-2xs">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-base sm:text-lg font-bold text-jal-slate-900 font-devanagari mb-1">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-jal-slate-600 max-w-sm mb-5 leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <Button variant="primary" size="md" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
}
