import React, { useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';
import Button from './Button';

/**
 * Reusable Jal Seva Modal Dialog
 * Supports escape key dismissal, focus trap basics, accessible backdrop, and custom actions.
 */
export default function ConfirmModal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  confirmText = 'होय, पुष्टी करा',
  cancelText = 'रद्द करा',
  onConfirm,
  variant = 'primary', // 'primary', 'destructive', 'navy'
  hideCancel = false,
  showDisclaimer = true,
  disclaimerText = 'हे प्रोटोटाइप आहे. प्रत्यक्ष प्रणालीमध्ये कोणतीही थेट नोंदणी किंवा व्यवहार होणार नाही.'
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative w-full max-w-md bg-white rounded-card shadow-elevated border border-jal-border overflow-hidden z-10 transition-all transform animate-scale-up"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-4 sm:p-5 border-b border-jal-border">
          <div>
            <h3 id="modal-title" className="text-lg font-bold text-jal-slate-900 font-devanagari">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-jal-slate-600 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-jal-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="बंद करा"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 text-sm text-jal-slate-900 space-y-3">
          {children}

          {showDisclaimer && (
            <div className="mt-4 p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">{disclaimerText}</p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-jal-border flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5">
          {!hideCancel && (
            <Button
              variant="outline"
              size="md"
              onClick={onClose}
              className="w-full sm:w-auto"
            >
              {cancelText}
            </Button>
          )}
          {onConfirm && (
            <Button
              variant={variant}
              size="md"
              onClick={onConfirm}
              className="w-full sm:w-auto"
            >
              {confirmText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
