import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Truck, 
  CalendarClock, 
  BellRing, 
  ArrowLeft, 
  Droplets, 
  ShieldCheck,
  UserCheck,
  X,
  Play
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { usePrototype } from '../../context/PrototypeContext';

/**
 * Admin Sidebar for desktop, with mobile drawer support
 */
export default function AdminSidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { t, isMarathi } = useLanguage();
  const { showSplashScreen } = usePrototype();

  const adminNavItems = [
    {
      to: '/admin',
      label: t('adminDashboardTitle'),
      icon: LayoutDashboard,
      end: true,
    },
    {
      to: '/admin/complaints',
      label: isMarathi ? 'तक्रार निवारण' : 'Complaints Redressal',
      icon: FileText,
      badge: '१२',
    },
    {
      to: '/admin/tanker-requests',
      label: isMarathi ? 'टँकर विनंत्या' : 'Tanker Requests',
      icon: Truck,
      badge: '३',
    },
    {
      to: '/admin/schedules',
      label: isMarathi ? 'पाणी वेळापत्रक व्यवस्थापन' : 'Schedule Management',
      icon: CalendarClock,
    },
    {
      to: '/admin/notices',
      label: isMarathi ? 'सूचना व्यवस्थापन' : 'Notices Management',
      icon: BellRing,
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-jal-navy text-white">
      {/* Brand & Header */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <Link to="/admin" className="flex items-center gap-3" onClick={onClose}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-jal-blue to-jal-cyan flex items-center justify-center shadow-xs text-white">
            <Droplets className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold font-devanagari tracking-tight">
                {isMarathi ? 'जल सेवा प्रशासन' : 'Jal Seva Admin'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-jal-cyan font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Demo Admin Panel</span>
            </div>
          </div>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
            aria-label={isMarathi ? "मेनू बंद करा" : "Close Menu"}
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Main Navigation Links */}
      <div className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          {isMarathi ? 'व्यवस्थापन पर्याय' : 'Management Menu'}
        </div>
        {adminNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all font-devanagari ${
                  isActive
                    ? 'bg-jal-blue text-white shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 flex-shrink-0 text-jal-cyan" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-2 py-0.5 rounded-full bg-jal-amber text-jal-navy text-xs font-bold">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Footer / Switch to Citizen Portal */}
      <div className="p-4 border-t border-white/10 space-y-2 bg-[#081d36]">
        <button
          onClick={() => {
            if (onClose) onClose();
            navigate('/citizen');
          }}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-colors border border-white/10"
        >
          <UserCheck className="w-4 h-4 text-jal-cyan" />
          <span>{isMarathi ? 'नागरिक पोर्टलवर जा' : 'Go to Citizen Portal'}</span>
        </button>

        <button
          onClick={() => {
            if (onClose) onClose();
            navigate('/');
          }}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-medium transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isMarathi ? 'मुख्य स्वागत पृष्ठ' : 'Welcome Landing Page'}</span>
        </button>

        <button
          onClick={() => {
            if (onClose) onClose();
            showSplashScreen();
          }}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-teal-900/40 hover:bg-teal-900/60 text-teal-300 border border-teal-500/30 text-xs font-medium transition-colors font-devanagari"
        >
          <Play className="w-3.5 h-3.5 fill-teal-300" />
          <span>{isMarathi ? 'स्टार्ट स्क्रीन (Replay)' : 'Replay Splash Screen'}</span>
        </button>


        <div className="text-[10px] text-center text-slate-400 pt-1">
          {isMarathi ? 'प्रोटोटाइप डॅशबोर्ड • कॉलेज सादरीकरण' : 'Prototype Dashboard • College Demo'}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden md:flex flex-col w-64 min-h-[calc(100vh-37px)] sticky top-[37px] flex-shrink-0 border-r border-jal-border shadow-xs">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop & Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10 animate-slide-right">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
