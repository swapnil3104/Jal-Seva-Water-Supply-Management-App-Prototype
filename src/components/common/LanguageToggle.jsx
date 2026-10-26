import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function LanguageToggle({ 
  variant = 'pill', // 'pill' | 'compact' | 'minimal'
  className = '' 
}) {
  const { language, setLanguage, toggleLanguage, isMarathi } = useLanguage();

  if (variant === 'compact') {
    return (
      <button
        onClick={toggleLanguage}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-jal-border bg-white hover:bg-slate-50 text-xs font-semibold text-jal-navy transition-all shadow-2xs hover:border-jal-blue/40 ${className}`}
        aria-label="Change Language / भाषा बदला"
        title="मराठी / English"
      >
        <Languages className="w-3.5 h-3.5 text-jal-blue" />
        <span className="font-devanagari">{isMarathi ? 'English' : 'मराठी'}</span>
      </button>
    );
  }

  // Segmented Pill Variant (e.g. Marathi | English)
  return (
    <div 
      className={`inline-flex items-center p-0.5 rounded-full bg-slate-100 border border-jal-border text-xs ${className}`}
      role="group"
      aria-label="Language selection"
    >
      <button
        type="button"
        onClick={() => setLanguage('mr')}
        className={`px-2.5 py-1 rounded-full font-devanagari font-semibold transition-all duration-150 ${
          isMarathi
            ? 'bg-jal-navy text-white shadow-xs'
            : 'text-jal-slate-600 hover:text-jal-navy'
        }`}
      >
        मराठी
      </button>

      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 rounded-full font-semibold transition-all duration-150 ${
          !isMarathi
            ? 'bg-jal-navy text-white shadow-xs'
            : 'text-jal-slate-600 hover:text-jal-navy'
        }`}
      >
        English
      </button>
    </div>
  );
}
