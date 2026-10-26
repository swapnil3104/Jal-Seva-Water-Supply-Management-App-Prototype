import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  Droplets, 
  MapPin, 
  Bell, 
  User, 
  ShieldCheck, 
  Menu, 
  X, 
  Play, 
  Grid, 
  Home, 
  Calendar, 
  AlertCircle, 
  Receipt, 
  Truck, 
  PhoneCall,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { usePrototype } from '../../context/PrototypeContext';
import LanguageToggle from '../common/LanguageToggle';

/**
 * AppHeader with responsive desktop navigation,
 * mobile drawer with ALL app features, and instant splash screen & loop triggers.
 */
export default function AppHeader({ selectedArea }) {
  const navigate = useNavigate();
  const { t, isMarathi } = useLanguage();
  const { showSplashScreen, openServicesModal, complaints } = usePrototype();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pendingComplaintsCount = complaints?.filter(c => c.status !== 'resolved')?.length || 0;
  const areaLabel = selectedArea || (isMarathi ? 'शिवाजी नगर' : 'Shivaji Nagar');

  const navLinks = [
    { to: '/citizen', label: t('navHome'), icon: Home },
    { to: '/schedule', label: t('navSchedule'), icon: Calendar },
    { to: '/complaints', label: t('navComplaints'), icon: AlertCircle, badge: pendingComplaintsCount },
    { to: '/bills', label: t('navBills'), icon: Receipt },
    { to: '/tanker-request', label: t('navTanker'), icon: Truck },
    { to: '/notices', label: t('navNotices'), icon: Bell },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-jal-border shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Mobile Menu Trigger + Brand Mark */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile Hamburger Drawer Trigger */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 rounded-xl text-jal-navy hover:bg-slate-100 transition-colors"
                aria-label="ॲप मेनू उघडा"
              >
                <Menu className="w-5 h-5 text-jal-navy" />
              </button>

              {/* Brand Logo & Title */}
              <Link to="/citizen" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-jal-navy to-jal-blue flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                  <Droplets className="w-5 h-5 text-jal-cyan" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base sm:text-lg font-bold text-jal-navy font-devanagari tracking-tight">
                      {t('appName')}
                    </span>
                    <span className="hidden sm:inline-block px-1.5 py-0.2 bg-jal-pale-blue text-jal-blue border border-jal-blue/20 rounded text-[10px] font-semibold">
                      {t('cityPune')}
                    </span>
                  </div>
                  <span className="text-[10px] text-jal-slate-600 font-devanagari leading-none hidden sm:block">
                    {t('appSubtitle')}
                  </span>
                </div>
              </Link>

              {/* Selected Area Chip (Desktop) */}
              <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-jal-border text-xs text-jal-slate-900 ml-2">
                <MapPin className="w-3.5 h-3.5 text-jal-blue flex-shrink-0" />
                <span className="text-jal-slate-600 font-devanagari">{t('area')}:</span>
                <span className="font-semibold text-jal-navy font-devanagari">{areaLabel}</span>
              </div>
            </div>

            {/* Desktop Center Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
              {navLinks.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/citizen'}
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-lg text-xs lg:text-sm font-medium transition-colors font-devanagari relative ${
                      isActive
                        ? 'bg-jal-pale-blue text-jal-blue font-semibold shadow-2xs'
                        : 'text-jal-slate-600 hover:text-jal-navy hover:bg-slate-50'
                    }`
                  }
                >
                  <span className="flex items-center gap-1.5">
                    {item.label}
                    {item.badge > 0 && (
                      <span className="px-1.5 py-0.2 rounded-full bg-jal-amber text-jal-navy text-[10px] font-bold">
                        {item.badge}
                      </span>
                    )}
                  </span>
                </NavLink>
              ))}

              {/* All Services Quick Modal Launcher */}
              <button
                onClick={openServicesModal}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-jal-navy hover:bg-slate-100 transition-colors border border-dashed border-jal-border"
                title="सर्व ॲप वैशिष्ट्ये पहा"
              >
                <Grid className="w-3.5 h-3.5 text-jal-blue" />
                <span>{isMarathi ? 'सर्व सेवा' : 'Services'}</span>
              </button>
            </nav>

            {/* Right: Splash Screen Replay, Language, Notice, Profile, Admin Switch */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {/* Start Loading Page (Splash Screen) Replay Button */}
              <button
                onClick={showSplashScreen}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-cyan-50 hover:bg-cyan-100 text-teal-800 border border-teal-200 text-xs font-semibold transition-all shadow-2xs"
                title={isMarathi ? 'स्टार्ट लोडिंग स्क्रीन रीप्ले करा' : 'Replay Start Loading Screen'}
              >
                <Play className="w-3.5 h-3.5 text-teal-700 fill-teal-700" />
                <span className="hidden lg:inline">{isMarathi ? 'स्टार्ट स्क्रीन' : 'Start Screen'}</span>
              </button>

              {/* Language Switcher Button */}
              <LanguageToggle variant="compact" />

              {/* Notice Bell */}
              <Link
                to="/notices"
                className="relative p-2 rounded-xl text-jal-slate-600 hover:text-jal-navy hover:bg-slate-100 transition-colors"
                aria-label={t('navNotices')}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-jal-amber animate-pulse" />
              </Link>

              {/* Profile Avatar / Quick Link */}
              <Link
                to="/profile"
                className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1 rounded-xl bg-slate-50 hover:bg-slate-100 border border-jal-border text-jal-slate-900 transition-colors"
                aria-label={t('navProfile')}
              >
                <div className="w-7 h-7 rounded-full bg-jal-pale-blue text-jal-blue flex items-center justify-center font-bold text-xs">
                  {isMarathi ? 'रा' : 'RP'}
                </div>
                <span className="hidden xl:inline text-xs font-semibold font-devanagari text-jal-navy">
                  {isMarathi ? 'राहुल पाटील' : 'Rahul Patil'}
                </span>
              </Link>

              {/* Admin Switch Shortcut */}
              <Link
                to="/admin"
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-jal-navy text-white text-xs font-medium hover:bg-opacity-90 shadow-2xs transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-jal-cyan" />
                <span>Admin</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over App Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Menu */}
          <div className="relative w-80 max-w-[85vw] h-full bg-white shadow-2xl z-10 flex flex-col justify-between overflow-y-auto animate-slide-right">
            {/* Drawer Header */}
            <div className="p-4 bg-jal-navy text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-jal-blue to-jal-cyan flex items-center justify-center text-white">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm font-devanagari">{isMarathi ? 'जल सेवा • पुणे मनपा' : 'Jal Seva • PMC'}</div>
                  <div className="text-[11px] text-jal-cyan">{isMarathi ? 'नागरिक ॲप मेनू' : 'Citizen App Menu'}</div>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Consumer Status Card */}
            <div className="p-4 border-b border-jal-border bg-surface-container-low">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-jal-navy font-devanagari">
                    {isMarathi ? 'राहुल पाटील' : 'Rahul Patil'}
                  </div>
                  <div className="text-xs text-jal-slate-600 font-devanagari">
                    {isMarathi ? 'ग्राहक क्र. #८८४१ • प्रभाग ४' : 'Consumer #8841 • Ward 4'}
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  {isMarathi ? 'सक्रिय' : 'Active'}
                </span>
              </div>
            </div>

            {/* All App Features List */}
            <div className="flex-1 p-3 space-y-1">
              <div className="px-2 py-1 text-[11px] font-bold text-jal-slate-600 uppercase tracking-wider font-devanagari">
                {isMarathi ? 'सर्व ॲप वैशिष्ट्ये' : 'All App Features'}
              </div>

              {navLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/citizen'}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors font-devanagari ${
                        isActive
                          ? 'bg-jal-pale-blue text-jal-blue font-bold'
                          : 'text-jal-slate-900 hover:bg-slate-50'
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-jal-blue" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-jal-amber text-jal-navy text-xs font-bold">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}

              <div className="pt-2 border-t border-jal-border">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    showSplashScreen();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-teal-800 bg-teal-50 hover:bg-teal-100 transition-colors font-devanagari"
                >
                  <Play className="w-4 h-4 text-teal-700" />
                  <span>{isMarathi ? 'स्टार्ट लोडिंग स्क्रीन रीप्ले' : 'Replay Start Screen'}</span>
                </button>
              </div>
            </div>

            {/* Drawer Footer: Admin switch & Helpline */}
            <div className="p-4 border-t border-jal-border space-y-2.5 bg-surface-container-low">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate('/admin');
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-jal-navy text-white text-xs font-semibold shadow-xs"
              >
                <ShieldCheck className="w-4 h-4 text-jal-cyan" />
                <span>{isMarathi ? 'प्रशासकीय कक्ष (Admin Portal)' : 'Admin Portal Switch'}</span>
              </button>

              <div className="flex items-center justify-between text-xs text-jal-slate-600 pt-1">
                <span className="flex items-center gap-1 font-devanagari">
                  <PhoneCall className="w-3.5 h-3.5 text-jal-blue" />
                  <span>{isMarathi ? 'हेल्पलाईन:' : 'Helpline:'}</span>
                </span>
                <span className="font-bold text-jal-navy">1800-1030-222</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
