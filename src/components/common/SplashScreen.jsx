import React, { useState, useEffect } from 'react';
import { 
  Droplets, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Activity, 
  Radio, 
  Truck, 
  X 
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

/**
 * Premium Start Loading Screen (Splash Screen) for Jal Seva App
 * Inspired by native smart-city and modern consumer apps.
 * Features realistic boot-sequence telemetry, pulsing water ripples,
 * progress tracking, and seamless auto-fade entry.
 */
export default function SplashScreen({ isVisible, onClose }) {
  const { isMarathi } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const steps = isMarathi
    ? [
        { label: 'पुणे स्मार्ट वॉटर ग्रिडशी जोडत आहे...', icon: Radio },
        { label: 'प्रभाग ४ (शिवाजी नगर) पाणी वेळापत्रक लोड होत आहे...', icon: Activity },
        { label: 'सक्रिय टँकर फ्लीट व तक्रार निवारण कक्ष सिंक होत आहे...', icon: Truck },
        { label: 'सर्व सेवा सज्ज! जल सेवा मध्ये आपले स्वागत आहे.', icon: CheckCircle2 },
      ]
    : [
        { label: 'Connecting to Pune Smart Water Grid...', icon: Radio },
        { label: 'Loading Ward 4 (Shivaji Nagar) Water Timetable...', icon: Activity },
        { label: 'Syncing Tanker Fleet & Grievance Redressal...', icon: Truck },
        { label: 'All Systems Ready! Welcome to Jal Seva.', icon: CheckCircle2 },
      ];

  // Timer loop for simulated progress boot
  useEffect(() => {
    if (!isVisible) {
      setProgress(0);
      setCurrentStepIndex(0);
      setIsReady(false);
      return;
    }

    setProgress(8);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true);
          return 100;
        }
        // Accelerate smoothly
        const step = prev < 40 ? 12 : prev < 75 ? 10 : 15;
        const next = Math.min(prev + step, 100);

        if (next < 30) setCurrentStepIndex(0);
        else if (next < 65) setCurrentStepIndex(1);
        else if (next < 95) setCurrentStepIndex(2);
        else setCurrentStepIndex(3);

        return next;
      });
    }, 220);

    return () => clearInterval(interval);
  }, [isVisible]);

  // Auto-dismiss after reaching 100%
  useEffect(() => {
    if (isReady && isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isReady, isVisible, onClose]);

  if (!isVisible) return null;

  const ActiveIcon = steps[currentStepIndex].icon;

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col justify-between items-center p-6 text-white overflow-hidden select-none transition-opacity duration-500"
      style={{
        background: 'radial-gradient(circle at 50% 35%, #0e3768 0%, #071f3f 45%, #030d1b 100%)',
      }}
      role="dialog"
      aria-modal="true"
      aria-label="App Starting Screen"
    >
      {/* Background Decorative Ripples & Lighting */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-jal-blue/15 blur-3xl" />
        <div className="absolute w-[320px] h-[320px] rounded-full border border-jal-cyan/20 animate-water-ripple" />
        <div className="absolute w-[320px] h-[320px] rounded-full border border-jal-blue/30 animate-water-ripple-delayed" />
      </div>

      {/* Top Bar: Official Badge & Quick Skip */}
      <div className="relative z-10 w-full max-w-md flex items-center justify-between pt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-medium text-jal-cyan font-devanagari">
          <span className="w-2 h-2 rounded-full bg-jal-teal animate-ping" />
          <span>{isMarathi ? 'पुणे महानगरपालिका • जल सेवा' : 'Pune Municipal Corporation'}</span>
        </div>

        <button
          onClick={onClose}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white text-xs font-medium transition-all backdrop-blur-sm border border-white/10"
          aria-label="Skip start screen"
        >
          <span>{isMarathi ? 'वगळा' : 'Skip'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Center: Brand Identity & Animated Water Droplet */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto max-w-sm px-4">
        {/* Animated Droplet Logo with Multi-Ring Ripple */}
        <div className="relative mb-6">
          {/* Ambient Glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-jal-blue to-jal-cyan rounded-3xl blur-xl opacity-40 animate-pulse" />
          
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-jal-navy via-jal-blue to-jal-cyan p-0.5 shadow-2xl animate-water-pulse flex items-center justify-center">
            <div className="w-full h-full rounded-[22px] bg-[#072144]/90 backdrop-blur-md flex items-center justify-center relative overflow-hidden">
              {/* Internal subtle wave reflection */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
              <Droplets className="w-12 h-12 sm:w-14 sm:h-14 text-jal-cyan drop-shadow-md animate-float-gentle" />
            </div>

            {/* Corner Emblem */}
            <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-gradient-to-tr from-jal-teal to-emerald-400 text-white shadow-lg border-2 border-[#072144]">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Brand Headings */}
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-devanagari bg-gradient-to-r from-white via-cyan-100 to-jal-cyan bg-clip-text text-transparent">
            {isMarathi ? 'जल सेवा' : 'Jal Seva'}
          </h1>
          <p className="text-xs sm:text-sm font-semibold tracking-wider text-jal-cyan uppercase font-sans">
            Water Supply Management App
          </p>
          <p className="text-xs text-slate-300 font-devanagari pt-1 max-w-xs mx-auto">
            {isMarathi 
              ? 'हर घर जल, हर पल सेवा • पारदर्शक पाणीपुरवठा' 
              : 'Smart, Transparent & Reliable Municipal Water Services'}
          </p>
        </div>
      </div>

      {/* Bottom: Progress Bar & Real-time Live Initialization Steps */}
      <div className="relative z-10 w-full max-w-md pb-6 space-y-4">
        {/* Progress Bar Container */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-300 font-medium">
            <div className="flex items-center gap-2">
              <ActiveIcon className="w-4 h-4 text-jal-cyan animate-pulse" />
              <span className="font-devanagari transition-all duration-300 text-[13px]">
                {steps[currentStepIndex].label}
              </span>
            </div>
            <span className="font-bold text-jal-cyan font-mono text-sm ml-2">
              {progress}%
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-white/15 overflow-hidden p-0.5 border border-white/10 backdrop-blur-sm">
            <div
              className="h-full rounded-full bg-gradient-to-r from-jal-blue via-jal-cyan to-teal-300 transition-all duration-300 shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Ready Action or College Prototype Footnote */}
        <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400 font-devanagari border-t border-white/10">
          <span>{isMarathi ? 'स्मार्ट व्हर्जन २.०' : 'Smart Version 2.0'}</span>
          <span className="text-jal-cyan font-medium">
            {isMarathi ? 'थेट सेन्सर्स कनेक्टेड' : 'Live IoT Grid Active'}
          </span>
        </div>

        {isReady && (
          <button
            onClick={onClose}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-jal-blue to-jal-cyan text-white font-semibold text-sm shadow-lg hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 font-devanagari animate-fade-in"
          >
            <span>{isMarathi ? 'ॲप मध्ये प्रवेश करा' : 'Enter Jal Seva App'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
