import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Truck, 
  CalendarClock, 
  BellRing, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  RotateCw,
  Users,
  Droplet
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Card, { CardContent, CardHeader } from '../../components/common/Card';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';
import { usePrototype } from '../../context/PrototypeContext';
import { useLanguage } from '../../context/LanguageContext';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { complaints, tankerRequests, schedules, notices, resetDemoData } = usePrototype();
  const { isMarathi } = useLanguage();
  const [showResetToast, setShowResetToast] = useState(false);

  const handleReset = () => {
    const confirmMsg = isMarathi 
      ? 'तुम्हाला सर्व नमुना डेटा (तक्रारी, टँकर, वेळापत्रक, नोटीस) मूळ स्थितीत आणायचा आहे का?'
      : 'Do you want to reset all simulated complaints, tanker bookings, and schedules to defaults?';
    if (window.confirm(confirmMsg)) {
      resetDemoData();
      setShowResetToast(true);
      setTimeout(() => setShowResetToast(false), 3500);
    }
  };

  const newCount = complaints.filter(c => c.status === 'submitted').length;
  const inProgressCount = complaints.filter(c => c.status === 'in_progress' || c.status === 'under_review').length;
  const resolvedCount = complaints.filter(c => c.status === 'resolved').length;
  const tankerCount = tankerRequests.length;

  const kpis = [
    { 
      label: isMarathi ? 'नवीन तक्रारी' : 'New Complaints', 
      count: newCount, 
      icon: FileText, 
      color: 'text-jal-blue bg-blue-50', 
      link: '/admin/complaints' 
    },
    { 
      label: isMarathi ? 'प्रगतीत कामे' : 'In Progress', 
      count: inProgressCount, 
      icon: RotateCw, 
      color: 'text-jal-amber bg-amber-50', 
      link: '/admin/complaints' 
    },
    { 
      label: isMarathi ? 'निकाली तक्रारी' : 'Resolved', 
      count: resolvedCount, 
      icon: CheckCircle2, 
      color: 'text-jal-teal bg-teal-50', 
      link: '/admin/complaints' 
    },
    { 
      label: isMarathi ? 'टँकर विनंत्या' : 'Tanker Demands', 
      count: tankerCount, 
      icon: Truck, 
      color: 'text-indigo-600 bg-indigo-50', 
      link: '/admin/tanker-requests' 
    },
  ];

  const recentList = complaints.slice(0, 4);

  return (
    <div className="space-y-6">
      <PageHeader
        title={isMarathi ? 'प्रशासन डॅशबोर्ड (Overview)' : 'Admin Control Center (Overview)'}
        subtitle={isMarathi 
          ? 'नागरी तक्रार निवारण, दैनंदिन पाणी वाटप व टँकर व्यवस्थापन केंद्र'
          : 'Citizen grievance redressal, municipal water distribution, and emergency tanker fleet oversight'}
        badge={<StatusBadge status="active" label={isMarathi ? 'प्रशासकीय नियंत्रण कक्ष (Demo)' : 'Command Center (Demo Mode)'} size="sm" />}
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            icon={RotateCw}
            className="text-xs bg-white text-jal-slate-700"
          >
            {isMarathi ? 'डेटा रीसेट (Reset Demo)' : 'Reset Demo Data'}
          </Button>
        }
      />

      {showResetToast && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs font-semibold text-jal-blue font-devanagari flex items-center justify-between">
          <span>{isMarathi ? '✓ सर्व प्रोटोटाइप नमुना डेटा मूळ स्थितीत यशस्वीरित्या रीसेट करण्यात आला आहे.' : '✓ All prototype data has been restored to default state.'}</span>
          <button onClick={() => setShowResetToast(false)} className="text-slate-500 hover:text-slate-800 font-bold">✕</button>
        </div>
      )}

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <Card
              key={idx}
              hoverable
              onClick={() => navigate(kpi.link)}
              className="p-4 sm:p-5"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-jal-slate-600 font-devanagari">
                  {kpi.label}
                </span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${kpi.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-jal-navy font-mono">
                {kpi.count}
              </div>
              <div className="text-[11px] text-jal-blue font-medium mt-1 flex items-center gap-1 font-devanagari">
                <span>{isMarathi ? 'तपशील पहा' : 'View Section'}</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Two Column Section: Recent Complaints + Quick Admin Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        {/* Recent Complaints Table/Card */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-jal-slate-900 font-devanagari">
              {isMarathi ? 'नवीन व प्रलंबित तक्रारी (Recent Complaints)' : 'Active Citizen Grievances (Live Queue)'}
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/admin/complaints')}
              className="text-xs"
            >
              {isMarathi ? `सर्व पहा (${complaints.length})` : `View Queue (${complaints.length})`}
            </Button>
          </div>

          <Card className="overflow-hidden">
            <div className="divide-y divide-jal-border">
              {recentList.map((c) => (
                <div
                  key={c.id}
                  onClick={() => navigate(`/admin/complaints/${c.id}`)}
                  className="p-3.5 sm:p-4 hover:bg-slate-50 transition-colors flex items-center justify-between gap-3 cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-jal-navy">#{c.id}</span>
                      <StatusBadge 
                        status={c.status} 
                        label={isMarathi ? c.statusLabel : (c.status === 'resolved' ? 'Resolved' : c.status === 'in_progress' ? 'In Progress' : 'Submitted')} 
                        size="sm" 
                      />
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-jal-slate-900 font-devanagari">
                      {isMarathi ? c.category : (c.categoryEn || c.category)} • <span className="font-normal text-jal-slate-600">{c.area}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-devanagari">
                      {isMarathi ? `दाखल: ${c.date}` : `Filed: ${c.date}`}
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="text-xs">
                    {isMarathi ? 'निवारण' : 'Manage'}
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Admin Actions */}
        <div className="space-y-3">
          <h2 className="text-base font-bold text-jal-slate-900 font-devanagari">
            {isMarathi ? 'जल प्रशासन साधने (Admin Tools)' : 'Municipal Management Suite'}
          </h2>

          <div className="space-y-2.5">
            {[
              {
                title: isMarathi ? 'तक्रार निवारण कक्ष' : 'Complaints Redressal',
                desc: isMarathi ? 'नागरिकांच्या तक्रारींचे वाटप व स्थिती बदल' : 'Review tickets, update resolution status & engineer notes',
                icon: FileText,
                link: '/admin/complaints',
              },
              {
                title: isMarathi ? 'आपत्कालीन टँकर नियंत्रण' : 'Emergency Tanker Fleet',
                desc: isMarathi ? 'टँकर मागण्यांची पडताळणी व चालक वाटप' : 'Approve requests, assign water tankers & dispatch drivers',
                icon: Truck,
                link: '/admin/tanker-requests',
              },
              {
                title: isMarathi ? 'दैनिक पाणी वाटप वेळापत्रक' : 'Water Supply Timetable',
                desc: isMarathi ? 'प्रभागनिहाय वेळापत्रक व दाब नियंत्रण' : 'Manage ward timings, duration, and pipeline pressure parameters',
                icon: CalendarClock,
                link: '/admin/schedules',
              },
              {
                title: isMarathi ? 'सार्वजनिक सूचना व्यवस्थापन' : 'Public Notices Broadcast',
                desc: isMarathi ? 'दुरुस्ती शटडाऊन व महत्त्वाच्या घोषणा' : 'Broadcast maintenance outages and emergency supply cuts',
                icon: BellRing,
                link: '/admin/notices',
              },
            ].map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <Card
                  key={idx}
                  hoverable
                  onClick={() => navigate(tool.link)}
                  className="p-3.5 sm:p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-jal-pale-blue text-jal-blue flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-jal-slate-900 font-devanagari">
                        {tool.title}
                      </div>
                      <div className="text-xs text-jal-slate-600">
                        {tool.desc}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
