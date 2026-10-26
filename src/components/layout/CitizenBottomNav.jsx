import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, AlertCircle, User, Grid } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { usePrototype } from '../../context/PrototypeContext';

/**
 * Mobile Bottom Navigation for Citizens
 * Upgraded to 5-item app navigation with central "All Services" action sheet trigger.
 * Safe-area aware with active indicators and grievance badge counts.
 */
export default function CitizenBottomNav() {
  const { t, isMarathi } = useLanguage();
  const { openServicesModal, complaints } = usePrototype();

  const pendingComplaintsCount = complaints?.filter(c => c.status !== 'resolved')?.length || 0;

  return (
    <nav 
      aria-label="मोबाइल ॲप नेव्हिगेशन बार"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-jal-border shadow-elevated safe-bottom"
    >
      <div className="grid grid-cols-5 h-16 max-w-lg mx-auto px-1 items-center">
        {/* 1. Home Tab */}
        <NavLink
          to="/citizen"
          end
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-0.5 transition-colors relative py-1 ${
              isActive
                ? 'text-jal-blue font-semibold'
                : 'text-jal-slate-600 hover:text-jal-navy'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div className={`p-1 rounded-xl transition-all ${isActive ? 'bg-jal-pale-blue text-jal-blue' : ''}`}>
                <Home className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-devanagari tracking-tight">
                {t('navHome')}
              </span>
              {isActive && (
                <span className="absolute bottom-0.5 w-1.5 h-1.5 rounded-full bg-jal-blue" />
              )}
            </>
          )}
        </NavLink>

        {/* 2. Schedule Tab */}
        <NavLink
          to="/schedule"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-0.5 transition-colors relative py-1 ${
              isActive
                ? 'text-jal-blue font-semibold'
                : 'text-jal-slate-600 hover:text-jal-navy'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div className={`p-1 rounded-xl transition-all ${isActive ? 'bg-jal-pale-blue text-jal-blue' : ''}`}>
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-devanagari tracking-tight">
                {t('navSchedule')}
              </span>
              {isActive && (
                <span className="absolute bottom-0.5 w-1.5 h-1.5 rounded-full bg-jal-blue" />
              )}
            </>
          )}
        </NavLink>

        {/* 3. Central All Features / Services Trigger */}
        <button
          onClick={openServicesModal}
          className="flex flex-col items-center justify-center -mt-4 group focus:outline-hidden"
          aria-label="सर्व ॲप सेवा उघडा"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-jal-navy to-jal-blue text-white flex items-center justify-center shadow-lg group-hover:scale-105 active:scale-95 transition-transform border-2 border-white">
            <Grid className="w-6 h-6 text-jal-cyan" />
          </div>
          <span className="text-[10px] font-bold text-jal-navy font-devanagari mt-0.5">
            {isMarathi ? 'सर्व सेवा' : 'Services'}
          </span>
        </button>

        {/* 4. Complaints Tab */}
        <NavLink
          to="/complaints"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-0.5 transition-colors relative py-1 ${
              isActive
                ? 'text-jal-blue font-semibold'
                : 'text-jal-slate-600 hover:text-jal-navy'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div className={`p-1 rounded-xl transition-all relative ${isActive ? 'bg-jal-pale-blue text-jal-blue' : ''}`}>
                <AlertCircle className="w-5 h-5" />
                {pendingComplaintsCount > 0 && (
                  <span className="absolute -top-1 -right-1 px-1 min-w-[14px] h-[14px] rounded-full bg-jal-amber text-jal-navy text-[9px] font-bold flex items-center justify-center">
                    {pendingComplaintsCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-devanagari tracking-tight">
                {t('navComplaints')}
              </span>
              {isActive && (
                <span className="absolute bottom-0.5 w-1.5 h-1.5 rounded-full bg-jal-blue" />
              )}
            </>
          )}
        </NavLink>

        {/* 5. Profile Tab */}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-0.5 transition-colors relative py-1 ${
              isActive
                ? 'text-jal-blue font-semibold'
                : 'text-jal-slate-600 hover:text-jal-navy'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div className={`p-1 rounded-xl transition-all ${isActive ? 'bg-jal-pale-blue text-jal-blue' : ''}`}>
                <User className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-devanagari tracking-tight">
                {t('navProfile')}
              </span>
              {isActive && (
                <span className="absolute bottom-0.5 w-1.5 h-1.5 rounded-full bg-jal-blue" />
              )}
            </>
          )}
        </NavLink>
      </div>
    </nav>
  );
}
