import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Compass, 
  UserCheck, 
  ShieldCheck, 
  Play, 
  RotateCcw, 
  Home, 
  Layers, 
  X, 
  ChevronUp, 
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { usePrototype } from '../../context/PrototypeContext';

/**
 * App Loop Floating Controller
 * Provides seamless 1-click looping across Citizen App, Admin Portal,
 * Start Loading Splash Screen, and All Features Modal from ANY view.
 */
export default function AppLoopController() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isMarathi } = useLanguage();
  const { showSplashScreen, openServicesModal } = usePrototype();
  const [isExpanded, setIsExpanded] = useState(false);

  const isAdmin = location.pathname.startsWith('/admin');
  const isWelcome = location.pathname === '/';

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-40 flex flex-col items-end select-none">
      {/* Expanded Quick Navigation Loop Menu */}
      {isExpanded && (
        <div className="mb-2 bg-white/95 backdrop-blur-md rounded-2xl shadow-elevated border border-jal-border p-3 w-56 sm:w-64 space-y-1.5 animate-slide-up">
          <div className="flex items-center justify-between pb-2 border-b border-jal-border text-xs font-bold text-jal-navy font-devanagari">
            <div className="flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-jal-blue" />
              <span>{isMarathi ? 'ॲप लूप व डेमो स्विचर' : 'App Loop Switcher'}</span>
            </div>
            <button 
              onClick={() => setIsExpanded(false)} 
              className="p-1 rounded-md text-jal-slate-600 hover:text-jal-navy"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 1. Citizen Portal Loop */}
          <button
            onClick={() => {
              navigate('/citizen');
              setIsExpanded(false);
            }}
            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold transition-colors font-devanagari ${
              !isAdmin && !isWelcome
                ? 'bg-jal-pale-blue text-jal-blue border border-jal-blue/30 font-bold'
                : 'hover:bg-slate-100 text-jal-slate-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-jal-blue" />
              <span>{isMarathi ? 'नागरिक ॲप (Citizen)' : 'Citizen App'}</span>
            </div>
            {!isAdmin && !isWelcome && (
              <span className="w-2 h-2 rounded-full bg-jal-blue" />
            )}
          </button>

          {/* 2. Admin Portal Loop */}
          <button
            onClick={() => {
              navigate('/admin');
              setIsExpanded(false);
            }}
            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold transition-colors font-devanagari ${
              isAdmin
                ? 'bg-jal-navy text-white shadow-xs'
                : 'hover:bg-slate-100 text-jal-slate-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-jal-cyan" />
              <span>{isMarathi ? 'प्रशासकीय कक्ष (Admin)' : 'Admin Portal'}</span>
            </div>
            {isAdmin && (
              <span className="w-2 h-2 rounded-full bg-jal-teal" />
            )}
          </button>

          {/* 3. Replay Start Loading Screen (Splash Screen) */}
          <button
            onClick={() => {
              showSplashScreen();
              setIsExpanded(false);
            }}
            className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-medium text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors font-devanagari"
          >
            <Play className="w-4 h-4 text-amber-600" />
            <span>{isMarathi ? 'स्टार्ट लोडिंग स्क्रीन (Replay)' : 'Replay Splash Screen'}</span>
          </button>

          {/* 4. Open All Features Action Sheet */}
          <button
            onClick={() => {
              openServicesModal();
              setIsExpanded(false);
            }}
            className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-medium text-jal-blue hover:bg-slate-50 transition-colors font-devanagari"
          >
            <Layers className="w-4 h-4 text-jal-blue" />
            <span>{isMarathi ? 'सर्व ॲप वैशिष्ट्ये (Directory)' : 'All Features Directory'}</span>
          </button>

          {/* 5. Welcome Landing */}
          <button
            onClick={() => {
              navigate('/');
              setIsExpanded(false);
            }}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-[11px] text-jal-slate-600 hover:text-jal-navy hover:bg-slate-50 transition-colors font-devanagari"
          >
            <Home className="w-3.5 h-3.5" />
            <span>{isMarathi ? 'स्वागत पृष्ठ (Welcome Screen)' : 'Welcome Screen'}</span>
          </button>
        </div>
      )}

      {/* Floating Pill Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-jal-navy text-white shadow-elevated hover:bg-opacity-95 active:scale-95 transition-all border border-white/20 text-xs font-semibold font-devanagari"
        aria-label="Toggle App Loop Switcher"
      >
        <Sparkles className="w-3.5 h-3.5 text-jal-cyan animate-pulse" />
        <span className="hidden sm:inline">
          {isAdmin ? (isMarathi ? 'प्रशासन' : 'Admin') : (isMarathi ? 'नागरिक' : 'Citizen')}
        </span>
        <span className="sm:hidden">{isMarathi ? 'ॲप लूप' : 'Loop'}</span>
        {isExpanded ? (
          <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
        ) : (
          <ChevronUp className="w-3.5 h-3.5 text-slate-300" />
        )}
      </button>
    </div>
  );
}
