import React from 'react';
import { Info } from 'lucide-react';

export default function PrototypeBanner() {
  return (
    <div className="bg-surface-container-high border-b border-surface-container text-on-surface px-4 py-2 flex items-center justify-between text-xs sm:text-sm">
      <div className="flex items-center space-x-2">
        <Info className="w-4 h-4 text-jal-blue flex-shrink-0" />
        <span className="font-semibold text-primary">प्रोटोटाइप — नमुना माहिती</span>
        <span className="hidden sm:inline text-on-surface-variant">| College Demo Prototype • Mock Data Only</span>
      </div>
      <div className="flex items-center space-x-1.5 bg-surface-container-lowest px-2 py-0.5 rounded-full border border-surface-container shadow-xs text-xs">
        <span className="w-2 h-2 rounded-full bg-jal-teal animate-pulse"></span>
        <span className="font-medium text-jal-navy">डेमो सक्रिय</span>
      </div>
    </div>
  );
}
