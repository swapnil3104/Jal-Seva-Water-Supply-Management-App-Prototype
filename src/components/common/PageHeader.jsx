import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PageHeader({
  title,
  subtitle,
  backTo,
  backLabel = 'मागे जा',
  badge,
  actions,
  className = '',
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={`mb-5 sm:mb-6 ${className}`}>
      {/* Top back navigation button if requested */}
      {backTo !== undefined && (
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-jal-slate-600 hover:text-jal-blue mb-2.5 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>{backLabel}</span>
        </button>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-jal-slate-900 tracking-tight font-devanagari">
              {title}
            </h1>
            {badge && <div>{badge}</div>}
          </div>
          {subtitle && (
            <p className="text-xs sm:text-sm text-jal-slate-600 mt-1 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap flex-shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
