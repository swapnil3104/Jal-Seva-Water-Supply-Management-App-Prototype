import React from 'react';
import { Info } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import LanguageToggle from '../common/LanguageToggle';

export default function PrototypeBanner() {
  const { t, isMarathi } = useLanguage();

  return (
    <div className="bg-surface-container-high border-b border-surface-container text-on-surface px-3 sm:px-6 py-1.5 flex items-center justify-between text-xs sm:text-sm">
      <div className="flex items-center space-x-2">
        <Info className="w-4 h-4 text-jal-blue flex-shrink-0" />
        <span className="font-semibold text-primary font-devanagari">
          {t('demoNotice')}
        </span>
        <span className="hidden md:inline text-on-surface-variant text-[11px]">
          | {t('mockDataNote')}
        </span>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <LanguageToggle variant="pill" />
        
        <div className="hidden sm:flex items-center space-x-1.5 bg-surface-container-lowest px-2 py-0.5 rounded-full border border-surface-container shadow-2xs text-[11px]">
          <span className="w-2 h-2 rounded-full bg-jal-teal animate-pulse"></span>
          <span className="font-medium text-jal-navy font-devanagari">{t('demoActive')}</span>
        </div>
      </div>
    </div>
  );
}
