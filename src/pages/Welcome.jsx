import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplets, ShieldCheck, ArrowRight, UserCheck, Settings, Activity, Play, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePrototype } from '../context/PrototypeContext';
import LanguageToggle from '../components/common/LanguageToggle';

export default function Welcome() {
  const navigate = useNavigate();
  const { t, isMarathi } = useLanguage();
  const { showSplashScreen, openServicesModal } = usePrototype();

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between p-4 sm:p-6 max-w-lg mx-auto">
      {/* Top Language Switcher Bar */}
      <div className="flex justify-end pt-2">
        <LanguageToggle variant="pill" />
      </div>

      {/* Top Hero Brand Section */}
      <div className="flex flex-col items-center text-center pt-2">
        <div className="relative mb-4">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-jal-navy via-jal-blue to-jal-cyan flex items-center justify-center shadow-lg text-white">
            <Droplets className="w-10 h-10" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-jal-teal text-white rounded-full p-1 shadow">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-jal-blue text-xs font-semibold mb-3 shadow-2xs font-devanagari">
          <span>{t('appTagline')}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-primary tracking-tight font-devanagari">
          {t('appName')}
        </h1>
        <p className="text-base sm:text-lg font-medium text-jal-blue mt-1 font-devanagari">
          {t('appSubtitle')}
        </p>
        <p className="text-xs sm:text-sm text-on-surface-variant max-w-xs mt-1">
          {isMarathi
            ? 'महापालिका व स्थानिक पाणीपुरवठा विभागाचे डिजिटल नागरिक सेवा पोर्टल'
            : 'Digital citizen water services portal for municipal corporations'}
        </p>
      </div>

      {/* Hero Status Card (Mocked) */}
      <div className="my-6 bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-jal-pale-blue flex items-center justify-center text-jal-blue">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-primary font-devanagari">
                {isMarathi ? 'आजचा पाणीपुरवठा अहवाल' : "Today's Water Status Report"}
              </div>
              <div className="text-xs text-on-surface-variant flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-jal-teal inline-block"></span>
                <span>{isMarathi ? 'थेट प्रवाह अपडेट: सकाळी ६:३०' : 'Live stream update: 6:30 AM'}</span>
              </div>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
            {t('statusActive')}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-surface-container">
          <div className="bg-surface-container-low rounded-xl p-2.5 text-center">
            <div className="text-xs text-on-surface-variant">{isMarathi ? 'शुद्धता' : 'Purity'}</div>
            <div className="text-lg font-bold text-jal-navy">९८%</div>
          </div>
          <div className="bg-surface-container-low rounded-xl p-2.5 text-center">
            <div className="text-xs text-on-surface-variant">{isMarathi ? 'दाब (PSI)' : 'Pressure'}</div>
            <div className="text-lg font-bold text-jal-navy">४.२</div>
          </div>
          <div className="bg-surface-container-low rounded-xl p-2.5 text-center">
            <div className="text-xs text-on-surface-variant">{isMarathi ? 'वेळ' : 'Schedule'}</div>
            <div className="text-lg font-bold text-jal-navy">{isMarathi ? 'नियमित' : 'On-Time'}</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pb-6">
        <button
          onClick={() => navigate('/citizen')}
          className="w-full flex items-center justify-between px-5 py-4 rounded-xl bg-jal-navy hover:bg-opacity-95 text-white font-medium shadow-md transition-transform active:scale-[0.99]"
        >
          <div className="flex items-center space-x-3 text-left">
            <UserCheck className="w-5 h-5 text-jal-cyan" />
            <div>
              <div className="text-base font-semibold font-devanagari">
                {t('btnContinueCitizen')}
              </div>
              <div className="text-xs text-slate-300">
                {isMarathi ? 'वेळापत्रक, तक्रारी, बिले व टँकर सेवा' : 'Timetable, complaints, bills & tankers'}
              </div>
            </div>
          </div>
          <ArrowRight className="w-5 h-5" />
        </button>

        <button
          onClick={() => navigate('/admin')}
          className="w-full flex items-center justify-between px-5 py-3.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-primary font-medium border border-surface-container transition-colors"
        >
          <div className="flex items-center space-x-3 text-left">
            <Settings className="w-5 h-5 text-jal-blue" />
            <div>
              <div className="text-sm font-semibold font-devanagari">
                {t('btnAdminDemo')}
              </div>
              <div className="text-xs text-on-surface-variant">
                {isMarathi ? 'तक्रार निवारण व पुरवठा व्यवस्थापन' : 'Complaint redressal & water control'}
              </div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-on-surface-variant" />
        </button>

        {/* Quick App Splash & Services Loop buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={showSplashScreen}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-semibold transition-colors font-devanagari"
          >
            <Play className="w-3.5 h-3.5 text-teal-700 fill-teal-700" />
            <span>{isMarathi ? 'स्टार्ट लोडिंग स्क्रीन' : 'Start Loading Screen'}</span>
          </button>

          <button
            onClick={openServicesModal}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-jal-blue border border-jal-blue/20 text-xs font-semibold transition-colors font-devanagari"
          >
            <Layers className="w-3.5 h-3.5 text-jal-blue" />
            <span>{isMarathi ? 'सर्व ॲप वैशिष्ट्ये' : 'All App Features'}</span>
          </button>
        </div>

        <p className="text-center text-xs text-on-surface-variant pt-2">
          {t('prototypeDisclaimer')}
        </p>
      </div>
    </div>
  );
}
