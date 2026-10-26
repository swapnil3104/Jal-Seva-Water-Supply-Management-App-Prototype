import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export default function ToastMessage({
  id,
  type = 'success', // 'success' | 'error' | 'warning' | 'info'
  message,
  title,
  onClose,
  duration = 4000,
}) {
  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  const typeConfig = {
    success: {
      bg: 'bg-teal-50 border-teal-200 text-teal-900',
      icon: CheckCircle2,
      iconColor: 'text-jal-teal',
    },
    error: {
      bg: 'bg-rose-50 border-rose-200 text-rose-900',
      icon: AlertCircle,
      iconColor: 'text-jal-danger',
    },
    warning: {
      bg: 'bg-amber-50 border-amber-200 text-amber-900',
      icon: AlertTriangle,
      iconColor: 'text-jal-amber',
    },
    info: {
      bg: 'bg-sky-50 border-sky-200 text-sky-900',
      icon: Info,
      iconColor: 'text-jal-blue',
    },
  };

  const current = typeConfig[type] || typeConfig.info;
  const Icon = current.icon;

  return (
    <div
      role="alert"
      className={`flex items-start gap-3 p-3.5 sm:p-4 rounded-xl border shadow-card max-w-sm w-full transition-all duration-200 animate-slide-in ${current.bg}`}
    >
      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${current.iconColor}`} />
      <div className="flex-1 text-xs sm:text-sm">
        {title && <div className="font-bold mb-0.5">{title}</div>}
        <div className="font-medium leading-relaxed">{message}</div>
      </div>
      {onClose && (
        <button
          onClick={() => onClose(id)}
          className="p-1 rounded-md text-slate-400 hover:text-slate-700 transition-colors"
          aria-label="सूचना बंद करा"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
