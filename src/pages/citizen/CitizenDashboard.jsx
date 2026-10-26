import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, FileText, Receipt, Truck, Bell, User } from 'lucide-react';

export default function CitizenDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface p-4 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between py-2 mb-4">
        <button
          onClick={() => navigate('/')}
          className="p-2 rounded-lg bg-surface-container-high text-primary hover:bg-surface-container-highest flex items-center space-x-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-xs">मुख्य पृष्ठ</span>
        </button>
        <span className="font-bold text-sm text-jal-navy">नागरिक सेवा केंद्र</span>
        <div className="w-8"></div>
      </div>

      {/* Greeting Card */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-jal-pale-blue text-jal-blue flex items-center justify-center font-bold">
            रा
          </div>
          <div>
            <h2 className="text-base font-bold text-primary">नमस्कार, राहुल पाटील</h2>
            <p className="text-xs text-on-surface-variant">प्रभाग क्रमांक ४ • शिवाजी नगर, पुणे</p>
          </div>
        </div>
      </div>

      {/* Status Notice */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-4 text-xs text-emerald-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>आजचा पुरवठा: सकाळी ६:०० ते ८:३० (वेळेवर)</span>
        </div>
        <span className="font-semibold text-[11px] bg-emerald-200/60 px-2 py-0.5 rounded-full">सुरू</span>
      </div>

      {/* Quick Services Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-surface-container-lowest p-3.5 rounded-xl border border-surface-container shadow-xs text-left">
          <Clock className="w-6 h-6 text-jal-blue mb-2" />
          <div className="text-sm font-semibold text-primary">पाणी वेळापत्रक</div>
          <div className="text-xs text-on-surface-variant">तुमच्या भागाची वेळ पहा</div>
        </div>
        <div className="bg-surface-container-lowest p-3.5 rounded-xl border border-surface-container shadow-xs text-left">
          <FileText className="w-6 h-6 text-jal-amber mb-2" />
          <div className="text-sm font-semibold text-primary">तक्रार नोंदवा</div>
          <div className="text-xs text-on-surface-variant">गळती, कमी दाबाची तक्रार</div>
        </div>
        <div className="bg-surface-container-lowest p-3.5 rounded-xl border border-surface-container shadow-xs text-left">
          <Receipt className="w-6 h-6 text-jal-teal mb-2" />
          <div className="text-sm font-semibold text-primary">पाणी पट्टी / बिल</div>
          <div className="text-xs text-on-surface-variant">नमुना बिल व पावती</div>
        </div>
        <div className="bg-surface-container-lowest p-3.5 rounded-xl border border-surface-container shadow-xs text-left">
          <Truck className="w-6 h-6 text-indigo-600 mb-2" />
          <div className="text-sm font-semibold text-primary">टँकर मागणी</div>
          <div className="text-xs text-on-surface-variant">अतितातडीचा पुरवठा</div>
        </div>
      </div>
    </div>
  );
}
