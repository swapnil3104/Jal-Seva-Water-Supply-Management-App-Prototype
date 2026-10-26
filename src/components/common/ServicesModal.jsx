import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  AlertCircle, 
  PlusCircle, 
  Receipt, 
  Truck, 
  BellRing, 
  User, 
  ShieldCheck, 
  Play, 
  PhoneCall, 
  X, 
  ChevronRight, 
  Droplets, 
  Layers, 
  Smartphone, 
  QrCode 
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { usePrototype } from '../../context/PrototypeContext';

/**
 * All Features Modal / Native App Action Sheet
 * Gives users 1-click access to all citizen & admin capabilities
 */
export default function ServicesModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { t, isMarathi } = useLanguage();
  const { showSplashScreen, complaints, bills } = usePrototype();
  const [showQr, setShowQr] = useState(false);

  if (!isOpen) return null;

  const pendingComplaintsCount = complaints?.filter(c => c.status !== 'resolved')?.length || 0;
  const pendingBill = bills?.find(b => b.status === 'pending');

  const mainServices = [
    {
      to: '/citizen',
      title: isMarathi ? 'मुख्य डॅशबोर्ड' : 'Citizen Dashboard',
      subtitle: isMarathi ? 'थेट पाणी स्थिती व आजचा पुरवठा' : 'Live water status & today summary',
      icon: Home,
      color: 'bg-blue-50 text-jal-blue border-blue-200',
    },
    {
      to: '/schedule',
      title: isMarathi ? 'पाणी वेळापत्रक' : 'Water Schedule',
      subtitle: isMarathi ? 'वॉर्डनिहाय वेळ, दाब व रिमाइंडर' : 'Ward timings, pressure & alerts',
      icon: Calendar,
      color: 'bg-cyan-50 text-teal-700 border-teal-200',
    },
    {
      to: '/complaints/new',
      title: isMarathi ? 'नवीन तक्रार नोंदणी' : 'New Complaint',
      subtitle: isMarathi ? 'गळती, कमी दाब किंवा दूषित पाणी' : 'Report leak, pressure, or quality',
      icon: PlusCircle,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      badge: isMarathi ? 'जलद' : 'Fast',
    },
    {
      to: '/complaints',
      title: isMarathi ? 'माझ्या तक्रारी' : 'My Complaints',
      subtitle: isMarathi ? 'निवारण स्थिती व मागोवा' : 'Track grievance resolution',
      icon: AlertCircle,
      color: 'bg-red-50 text-red-600 border-red-200',
      badge: pendingComplaintsCount > 0 ? `${pendingComplaintsCount}` : null,
    },
    {
      to: '/bills',
      title: isMarathi ? 'पाणीपट्टी बिल व भरणा' : 'Water Bills & Pay',
      subtitle: isMarathi ? 'डिजिटल पावती व ऑनलाइन भरणा' : 'Sample bill ₹450 & digital pay',
      icon: Receipt,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      badge: pendingBill ? '₹४५०' : null,
    },
    {
      to: '/tanker-request',
      title: isMarathi ? 'पाणी टँकर मागणी' : 'Tanker Booking',
      subtitle: isMarathi ? 'अतितातडीच्या गरजेसाठी टँकर' : 'Emergency drinking water tanker',
      icon: Truck,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    },
    {
      to: '/notices',
      title: isMarathi ? 'सार्वजनिक सूचना' : 'Public Notices',
      subtitle: isMarathi ? 'पाइपलाईन दुरुस्ती व कपात सूचना' : 'Maintenance & shutdown alerts',
      icon: BellRing,
      color: 'bg-amber-50 text-jal-amber border-amber-200',
    },
    {
      to: '/profile',
      title: isMarathi ? 'माझे खाते व मीटर' : 'Consumer Profile',
      subtitle: isMarathi ? 'ग्राहक क्र. #८८४१, प्रभाग ४' : 'Consumer #8841, Ward 4',
      icon: User,
      color: 'bg-slate-100 text-jal-slate-900 border-slate-200',
    },
  ];

  const handleNavigate = (path) => {
    onClose();
    navigate(path);
  };

  const handleReplaySplash = () => {
    onClose();
    showSplashScreen();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="All App Features"
    >
      <div 
        className="relative w-full max-w-lg max-h-[90vh] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-jal-border flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-jal-navy text-white flex items-center justify-center shadow-xs">
              <Layers className="w-5 h-5 text-jal-cyan" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-jal-navy font-devanagari">
                {isMarathi ? 'जल सेवा — सर्व ॲप वैशिष्ट्ये' : 'Jal Seva — All App Features'}
              </h2>
              <p className="text-xs text-jal-slate-600 font-devanagari">
                {isMarathi ? 'सर्व नागरिक व प्रशासकीय सेवांची यादी' : 'Complete directory of services'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-jal-slate-600 hover:text-jal-navy hover:bg-slate-200/60 transition-colors"
            aria-label="Close features sheet"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Features Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          <div>
            <div className="text-[11px] font-bold text-jal-slate-600 uppercase tracking-wider mb-2 font-devanagari">
              {isMarathi ? 'नागरिक सेवा' : 'Citizen Services'}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {mainServices.map((service) => {
                const Icon = service.icon;
                return (
                  <button
                    key={service.to}
                    onClick={() => handleNavigate(service.to)}
                    className="flex items-center gap-3 p-3 rounded-2xl border border-jal-border/70 bg-white hover:bg-slate-50 hover:border-jal-blue/40 shadow-xs hover:shadow-card transition-all text-left group"
                  >
                    <div className={`p-2.5 rounded-xl border flex-shrink-0 ${service.color} group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-jal-navy font-devanagari truncate">
                          {service.title}
                        </span>
                        {service.badge && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-jal-pale-blue text-jal-blue border border-jal-blue/20">
                            {service.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-jal-slate-600 font-devanagari truncate">
                        {service.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick App Role & Demo Switcher Section */}
          <div className="pt-2 border-t border-jal-border">
            <div className="text-[11px] font-bold text-jal-slate-600 uppercase tracking-wider mb-2 font-devanagari">
              {isMarathi ? 'ॲप लूप व डेमो साधने' : 'App Loop & Demo Tools'}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleNavigate('/admin')}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-jal-navy text-white hover:bg-opacity-95 text-xs font-semibold shadow-xs transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-jal-cyan flex-shrink-0" />
                <div className="text-left font-devanagari">
                  <div>{isMarathi ? 'प्रशासकीय कक्ष' : 'Admin Portal'}</div>
                  <div className="text-[10px] text-slate-300 font-normal">
                    {isMarathi ? 'तक्रार व टँकर वाटप' : 'Grievance & Fleet'}
                  </div>
                </div>
              </button>

              <button
                onClick={handleReplaySplash}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-jal-pale-blue text-jal-blue hover:bg-blue-100 border border-jal-blue/20 text-xs font-semibold shadow-xs transition-colors"
              >
                <Play className="w-4 h-4 text-jal-blue flex-shrink-0" />
                <div className="text-left font-devanagari">
                  <div>{isMarathi ? 'स्टार्ट लोडिंग स्क्रीन' : 'Start Loading Page'}</div>
                  <div className="text-[10px] text-jal-slate-600 font-normal">
                    {isMarathi ? 'ॲप स्प्लॅश रिप्ले' : 'Replay Splash'}
                  </div>
                </div>
              </button>
            </div>

            {/* Run on Mobile Device Button & QR Viewer */}
            <div className="mt-2.5">
              <button
                onClick={() => setShowQr(!showQr)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-jal-navy to-jal-blue text-white shadow-xs text-xs font-semibold transition-all hover:brightness-105 font-devanagari"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-white/20">
                    <Smartphone className="w-4 h-4 text-jal-cyan" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold">
                      {isMarathi ? '📱 मोबाइलवर ॲप चालवा (QR कोड स्कॅन करा)' : '📱 Run on Mobile Phone (Scan QR)'}
                    </div>
                    <div className="text-[10px] text-jal-cyan font-normal">
                      {isMarathi ? 'वाय-फाय नेटवर्क: http://192.168.0.100:5174' : 'Network IP: http://192.168.0.100:5174'}
                    </div>
                  </div>
                </div>
                <QrCode className="w-4 h-4 text-jal-cyan" />
              </button>

              {showQr && (
                <div className="mt-2.5 p-4 rounded-2xl bg-surface-container-lowest border border-jal-border text-center space-y-2.5 animate-slide-up shadow-card">
                  <div className="inline-block p-2 bg-white rounded-xl shadow-xs border border-jal-border">
                    <img 
                      src="/mobile-qr.png" 
                      alt="Mobile QR Code" 
                      className="w-44 h-44 mx-auto rounded-lg object-contain"
                    />
                  </div>
                  <div className="text-xs font-bold text-jal-navy font-devanagari">
                    {isMarathi ? 'तुमच्या फोनच्या कॅमेऱ्याने वरील QR स्कॅन करा' : 'Scan this QR code with your phone camera'}
                  </div>
                  <div className="text-[11px] text-jal-slate-600 max-w-xs mx-auto font-devanagari">
                    {isMarathi 
                      ? 'किंवा फोनच्या Chrome/Safari ब्राऊझरमध्ये हे टाका:'
                      : 'Or open this URL on your phone browser:'}
                    <div className="font-mono text-jal-blue font-bold mt-1 text-xs select-all bg-jal-pale-blue p-1.5 rounded-lg border border-jal-blue/20">
                      http://192.168.0.100:5174
                    </div>
                  </div>
                  <div className="text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg p-2 font-medium">
                    💡 <strong>{isMarathi ? 'ॲप म्हणून सेव्ह करा:' : 'Install as Native App:'}</strong> {isMarathi ? 'Chrome मध्ये ३ डॉट्सवर क्लिक करून "Add to Home screen" करा!' : 'In Chrome, tap ⋮ and select "Add to Home screen" to install!'}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Emergency Helpline Banner */}
          <div className="p-3 rounded-xl bg-surface-container-high border border-jal-border flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-jal-blue text-white">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-jal-navy font-devanagari">
                  {isMarathi ? 'पुणे मनपा पाणीपुरवठा हेल्पलाईन' : 'PMC Water Emergency Helpline'}
                </div>
                <div className="text-xs text-jal-blue font-bold tracking-wider">
                  1800-1030-222 (Toll Free)
                </div>
              </div>
            </div>
            <button
              onClick={() => handleNavigate('/')}
              className="px-2.5 py-1.5 rounded-lg bg-white border border-jal-border text-xs font-semibold text-jal-slate-900 hover:bg-slate-50 transition-colors font-devanagari"
            >
              {isMarathi ? 'स्वागत पृष्ठ' : 'Welcome'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
