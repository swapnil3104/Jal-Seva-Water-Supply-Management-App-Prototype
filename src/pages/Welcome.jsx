import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplets, ShieldCheck, ArrowRight, UserCheck, Settings, Activity } from 'lucide-react';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between p-4 sm:p-6 max-w-lg mx-auto">
      {/* Top Section */}
      <div className="flex flex-col items-center text-center pt-6">
        <div className="relative mb-4">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-jal-navy via-jal-blue to-jal-cyan flex items-center justify-center shadow-lg text-white">
            <Droplets className="w-10 h-10" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-jal-teal text-white rounded-full p-1 shadow">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-jal-blue text-xs font-semibold mb-3 shadow-xs">
          <span>स्मार्ट • सोपी • पारदर्शक पाणीपुरवठा सेवा</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-primary tracking-tight font-devanagari">
          जल सेवा
        </h1>
        <p className="text-base sm:text-lg font-medium text-jal-blue mt-1 font-devanagari">
          पिण्याच्या पाण्याचा पुरवठा व्यवस्थापन ॲप
        </p>
        <p className="text-xs sm:text-sm text-on-surface-variant max-w-xs mt-1">
          महापालिका व स्थानिक पाणीपुरवठा विभागाचे डिजिटल नागरिक सेवा पोर्टल
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
              <div className="text-sm font-bold text-primary">आजचा पाणीपुरवठा अहवाल</div>
              <div className="text-xs text-on-surface-variant flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-jal-teal inline-block"></span>
                <span>थेट प्रवाह अपडेट: सकाळी ६:३०</span>
              </div>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
            सक्रिय
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-surface-container">
          <div className="bg-surface-container-low rounded-xl p-2.5 text-center">
            <div className="text-xs text-on-surface-variant">शुद्धता</div>
            <div className="text-lg font-bold text-jal-navy">९८%</div>
          </div>
          <div className="bg-surface-container-low rounded-xl p-2.5 text-center">
            <div className="text-xs text-on-surface-variant">दाब (PSI)</div>
            <div className="text-lg font-bold text-jal-navy">४.२</div>
          </div>
          <div className="bg-surface-container-low rounded-xl p-2.5 text-center">
            <div className="text-xs text-on-surface-variant">वेळ</div>
            <div className="text-lg font-bold text-jal-navy">नियमित</div>
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
              <div className="text-base font-semibold">नागरिक म्हणून पुढे जा</div>
              <div className="text-xs text-slate-300">वेळापत्रक, तक्रारी, बिले व टँकर सेवा</div>
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
              <div className="text-sm font-semibold">प्रशासकीय कक्ष (Admin Demo)</div>
              <div className="text-xs text-on-surface-variant">तक्रार निवारण व पुरवठा व्यवस्थापन</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-on-surface-variant" />
        </button>

        <p className="text-center text-xs text-on-surface-variant pt-2">
          महाविद्यालयीन सादरीकरणासाठी तयार केलेला सिम्युलेटेड प्रोटोटाइप
        </p>
      </div>
    </div>
  );
}
