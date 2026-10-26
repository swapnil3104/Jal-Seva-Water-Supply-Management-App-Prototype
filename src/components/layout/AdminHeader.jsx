import React from 'react';
import { Menu, Shield, Bell, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import LanguageToggle from '../common/LanguageToggle';

export default function AdminHeader({ onMenuClick, title }) {
  const navigate = useNavigate();
  const { t, isMarathi } = useLanguage();

  const displayTitle = title || t('adminDashboardTitle');

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-jal-border shadow-xs px-4 sm:px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-xl text-jal-slate-900 hover:bg-slate-100 transition-colors"
          aria-label="मेनू उघडा"
        >
          <Menu className="w-5 h-5 text-jal-navy" />
        </button>

        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-jal-navy text-white hidden sm:flex">
            <Shield className="w-4 h-4 text-jal-cyan" />
          </div>
          <div>
            <span className="text-sm sm:text-base font-bold text-jal-navy font-devanagari">
              {displayTitle}
            </span>
            <span className="hidden sm:inline-block ml-2 px-2 py-0.5 rounded-full bg-slate-100 text-jal-slate-600 text-[11px] font-medium border border-jal-border">
              Demo Admin Mode
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2.5">
        <LanguageToggle variant="compact" />

        <button
          onClick={() => navigate('/citizen')}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold text-jal-blue bg-jal-pale-blue border border-jal-blue/20 hover:bg-blue-100 transition-colors shadow-2xs font-devanagari"
          title={isMarathi ? 'नागरिक पोर्टलवर जा' : 'Switch to Citizen App'}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">{isMarathi ? 'नागरिक ॲप' : 'Citizen App'}</span>
          <span className="xs:hidden">{isMarathi ? 'नागरिक' : 'Citizen'}</span>
        </button>

        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{isMarathi ? 'सिम्युलेशन ऑन' : 'Simulation On'}</span>
        </div>
      </div>
    </header>
  );
}
