import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Shield, 
  LogOut, 
  ArrowRight, 
  ShieldCheck, 
  RotateCcw, 
  CheckCircle2, 
  FileCheck 
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Card, { CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import ConfirmModal from '../../components/common/ConfirmModal';
import ToastMessage from '../../components/common/ToastMessage';
import { usePrototype } from '../../context/PrototypeContext';
import { useLanguage } from '../../context/LanguageContext';

export default function Profile() {
  const navigate = useNavigate();
  const { citizen, resetDemoData } = usePrototype();
  const { isMarathi } = useLanguage();

  const [showResetModal, setShowResetModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleResetConfirm = () => {
    resetDemoData();
    setShowResetModal(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <PageHeader
        backTo="/citizen"
        backLabel={isMarathi ? 'मुख्य पृष्ठावर जा' : 'Back to Dashboard'}
        title={isMarathi ? 'नागरिक प्रोफाइल (Demo Profile)' : 'Consumer Profile & Connection Details'}
        subtitle={isMarathi ? 'तुमची नोंदणीकृत माहिती व खाते तपशील' : 'Registered municipal account details, meter specs, and settings'}
      />

      {showToast && (
        <ToastMessage
          type="success"
          title={isMarathi ? 'डेमो डेटा रिसेट झाला!' : 'Demo Data Reset Complete!'}
          message={isMarathi 
            ? 'प्रणालीतील सर्व नमुना तक्रारी, बिले व नोंदी मूळ स्थितीत आणल्या आहेत.' 
            : 'All demo complaints, bookings and billing statuses restored to default.'}
          onClose={() => setShowToast(false)}
        />
      )}

      <Card className="p-5 sm:p-6 shadow-card">
        <div className="flex items-center gap-4 pb-5 border-b border-jal-border">
          <div className="w-16 h-16 rounded-2xl bg-jal-navy text-jal-cyan flex items-center justify-center font-bold text-2xl shadow-card font-devanagari">
            {isMarathi ? citizen.marathiName.slice(0, 2) : 'RP'}
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-jal-navy font-devanagari">
              {isMarathi ? citizen.marathiName : citizen.englishName}
            </h2>
            <div className="text-xs text-jal-slate-600 font-mono mt-0.5">
              {isMarathi ? 'ग्राहक क्र:' : 'Consumer ID:'} {citizen.demoCustomerNumber} ({isMarathi ? 'डेमो खाते' : 'Demo Account'})
            </div>
            <div className="inline-flex items-center gap-1.5 mt-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>{isMarathi ? 'सत्यापित नळ जोडणी ग्राहक (PMC Verified)' : 'PMC Verified Connection Active'}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5 border-b border-jal-border text-xs sm:text-sm">
          <div>
            <span className="text-jal-slate-600 block">{isMarathi ? 'परिसर / प्रभाग:' : 'Ward / Zone:'}</span>
            <span className="font-semibold text-jal-slate-900 mt-0.5 flex items-center gap-1.5 font-devanagari">
              <MapPin className="w-4 h-4 text-jal-blue flex-shrink-0" />
              {isMarathi ? citizen.ward : (citizen.wardEn || 'Ward No. 4 (Shivaji Nagar - Model Colony)')}
            </span>
          </div>

          <div>
            <span className="text-jal-slate-600 block">{isMarathi ? 'पत्ता:' : 'Delivery Address:'}</span>
            <span className="font-semibold text-jal-slate-900 mt-0.5 font-devanagari">
              {isMarathi ? citizen.address : (citizen.addressEn || 'Flat 402, Sai Residency, Model Colony, Pune - 411005')}
            </span>
          </div>

          <div>
            <span className="text-jal-slate-600 block">{isMarathi ? 'संपर्क क्रमांक (डमी):' : 'Contact Phone:'}</span>
            <span className="font-semibold text-jal-slate-900 mt-0.5 flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
              +91 98230 48212
            </span>
          </div>

          <div>
            <span className="text-jal-slate-600 block">{isMarathi ? 'ई-मेल (डमी):' : 'Email Address:'}</span>
            <span className="font-semibold text-jal-slate-900 mt-0.5 flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
              {citizen.email}
            </span>
          </div>

          <div>
            <span className="text-jal-slate-600 block">{isMarathi ? 'मीटर क्रमांक:' : 'Meter Number:'}</span>
            <span className="font-semibold text-jal-navy font-mono mt-0.5">
              {citizen.meterNumber}
            </span>
          </div>

          <div>
            <span className="text-jal-slate-600 block">{isMarathi ? 'जोडणी प्रकार:' : 'Connection Type:'}</span>
            <span className="font-semibold text-jal-slate-900 mt-0.5 font-devanagari">
              {isMarathi ? citizen.connectionType : (citizen.connectionTypeEn || 'Domestic Standard (15mm Metered)')}
            </span>
          </div>
        </div>

        {/* Prototype Reset and Actions */}
        <div className="pt-5 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="navy"
              size="md"
              onClick={() => navigate('/admin')}
              icon={ShieldCheck}
              className="flex-1"
            >
              {isMarathi ? 'प्रशासकीय कक्ष पहा (Admin Demo)' : 'Open Admin Portal Demo'}
            </Button>

            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('/')}
              icon={LogOut}
              className="flex-1"
            >
              {isMarathi ? 'मुख्य स्वागत पृष्ठावर जा' : 'Go to Welcome Screen'}
            </Button>
          </div>

          <div className="pt-3 border-t border-jal-border flex items-center justify-between">
            <span className="text-xs text-jal-slate-600 font-devanagari">
              {isMarathi ? 'डेमो डेटा मूळ स्थितीत आणायचा आहे का?' : 'Reset prototype data to original state?'}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowResetModal(true)}
              icon={RotateCcw}
              className="text-xs text-rose-600 hover:bg-rose-50 hover:text-rose-700"
            >
              {isMarathi ? 'डेमो डेटा रिसेट करा' : 'Reset Demo Data'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Reset Confirmation Modal */}
      <ConfirmModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title={isMarathi ? 'डेमो डेटा रिसेट करायचा आहे का?' : 'Reset Prototype Mock Data?'}
        subtitle={isMarathi 
          ? 'सर्व नवीन दाखल केलेल्या तक्रारी व बदल हटवून मूळ नमुना डेटा पुनर्संचयित केला जाईल.' 
          : 'All new complaints, payments, and tanker bookings will be cleared to default sample records.'}
        confirmText={isMarathi ? 'होय, रिसेट करा' : 'Yes, Reset Data'}
        cancelText={isMarathi ? 'रद्द करा' : 'Cancel'}
        onConfirm={handleResetConfirm}
        showDisclaimer={false}
      />
    </div>
  );
}
