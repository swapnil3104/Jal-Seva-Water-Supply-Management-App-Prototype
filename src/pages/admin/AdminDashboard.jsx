import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, Clock, Truck } from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface p-4 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between py-2 mb-4">
        <button
          onClick={() => navigate('/')}
          className="p-2 rounded-lg bg-surface-container-high text-primary hover:bg-surface-container-highest flex items-center space-x-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-xs">मुख्य पृष्ठ</span>
        </button>
        <div className="flex items-center space-x-1.5">
          <Shield className="w-4 h-4 text-jal-blue" />
          <span className="font-bold text-sm text-jal-navy">प्रशासकीय कक्ष (Admin Demo)</span>
        </div>
        <div className="w-8"></div>
      </div>

      {/* Admin Stat Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-surface-container-lowest p-3 rounded-xl border border-surface-container">
          <div className="text-xs text-on-surface-variant">नवीन तक्रारी</div>
          <div className="text-xl font-bold text-jal-navy mt-1">१२</div>
        </div>
        <div className="bg-surface-container-lowest p-3 rounded-xl border border-surface-container">
          <div className="text-xs text-on-surface-variant">प्रलंबित (In Progress)</div>
          <div className="text-xl font-bold text-jal-amber mt-1">५</div>
        </div>
        <div className="bg-surface-container-lowest p-3 rounded-xl border border-surface-container">
          <div className="text-xs text-on-surface-variant">निवारण झाले</div>
          <div className="text-xl font-bold text-jal-teal mt-1">४८</div>
        </div>
        <div className="bg-surface-container-lowest p-3 rounded-xl border border-surface-container">
          <div className="text-xs text-on-surface-variant">टँकर विनंत्या</div>
          <div className="text-xl font-bold text-indigo-600 mt-1">३</div>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl p-4 border border-surface-container">
        <h3 className="font-bold text-sm text-primary mb-3">प्रशासकीय कृती पर्याय</h3>
        <p className="text-xs text-on-surface-variant mb-4">
          येथून अधिकारी तक्रारींची स्थिती अद्ययावत करू शकतात, नवीन वेळापत्रक प्रसिद्ध करू शकतात आणि सूचना जारी करू शकतात.
        </p>
      </div>
    </div>
  );
}
