import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, 
  FileText, 
  Receipt, 
  Truck, 
  Bell, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  MapPin,
  Calendar,
  Sparkles,
  PlusCircle
} from 'lucide-react';
import Card, { CardContent } from '../../components/common/Card';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';
import { useLanguage } from '../../context/LanguageContext';
import { usePrototype } from '../../context/PrototypeContext';

export default function CitizenDashboard() {
  const navigate = useNavigate();
  const { t, isMarathi } = useLanguage();
  const { citizen, schedules, complaints, notices, bills, tankerRequests } = usePrototype();

  // Find schedule for citizen's area for today
  const areaSchedule = schedules.find(
    (s) => s.area === citizen.area && s.day === 'आज'
  ) || schedules[0];

  // Most recent complaint and notice
  const recentComplaint = complaints.length > 0 ? complaints[0] : null;
  const recentNotice = notices.length > 0 ? notices[0] : null;

  // Unpaid bill
  const unpaidBill = bills.find((b) => b.status === 'unpaid');

  const services = [
    {
      title: t('navSchedule'),
      desc: t('serviceScheduleDesc'),
      icon: Clock,
      color: 'text-jal-blue bg-jal-pale-blue',
      route: '/schedule',
      badge: areaSchedule?.statusLabel 
        ? (isMarathi ? areaSchedule.statusLabel : (areaSchedule.status === 'active' ? 'Active' : 'Scheduled'))
        : null,
    },
    {
      title: t('btnNewComplaint'),
      desc: t('serviceComplaintDesc'),
      icon: FileText,
      color: 'text-jal-amber bg-amber-50',
      route: '/complaints/new',
      badge: complaints.filter(c => c.status !== 'resolved').length > 0
        ? `${complaints.filter(c => c.status !== 'resolved').length} ${isMarathi ? 'सक्रिय' : 'Active'}`
        : null,
    },
    {
      title: t('navBills'),
      desc: t('serviceBillDesc'),
      icon: Receipt,
      color: 'text-jal-teal bg-teal-50',
      route: '/bills',
      badge: unpaidBill 
        ? (isMarathi ? `₹${unpaidBill.amount} देय` : `₹${unpaidBill.amount} Due`) 
        : (isMarathi ? 'भरणा पूर्ण' : 'Paid'),
    },
    {
      title: t('navTanker'),
      desc: t('serviceTankerDesc'),
      icon: Truck,
      color: 'text-indigo-600 bg-indigo-50',
      route: '/tanker-request',
      badge: tankerRequests.length > 0 
        ? `${tankerRequests.length} ${isMarathi ? 'मागणी' : 'Active'}` 
        : null,
    },
  ];


  return (
    <div className="space-y-6">
      {/* Welcome Banner Card */}
      <div className="relative overflow-hidden rounded-card bg-gradient-to-r from-jal-navy via-[#103b6e] to-jal-blue p-5 sm:p-7 text-white shadow-card">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-jal-cyan text-xs font-semibold backdrop-blur-xs font-devanagari">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isMarathi ? 'डिजिटल नागरिक सेवा पोर्टल' : 'Digital Citizen Services Portal'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-devanagari tracking-tight">
              {isMarathi ? `नमस्कार, ${citizen.marathiName.split(' ')[0]}!` : `Hello, ${citizen.englishName.split(' ')[0]}!`}
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-jal-cyan flex-shrink-0" />
              <span>{citizen.ward} • ग्राहक क्र: {citizen.demoCustomerNumber}</span>
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate('/schedule')}
              className="bg-white/10 hover:bg-white/20 text-white border-white/20"
            >
              {t('btnCheckSchedule')}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/complaints/new')}
              className="bg-jal-cyan hover:bg-[#25a9b9] text-jal-navy font-bold"
            >
              {t('btnNewComplaint')}
            </Button>
          </div>
        </div>
        
        {/* Subtle decorative background water ripple */}
        <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-white/5 pointer-events-none blur-xl" />
      </div>

      {/* Today's Supply Status Card */}
      <Card variant="highlight" className="border-jal-cyan/40">
        <CardContent className="p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-jal-blue text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-jal-navy font-devanagari">
                    {areaSchedule 
                      ? (isMarathi ? `${areaSchedule.area} — आजचा पाणीपुरवठा` : `${areaSchedule.area} — Today's Water Supply`) 
                      : t('todaySupply')}
                  </h2>
                  {areaSchedule && (
                    <StatusBadge
                      status={areaSchedule.status}
                      label={isMarathi ? areaSchedule.statusLabel : (areaSchedule.status === 'active' ? 'Supply Active' : 'Scheduled')}
                      size="sm"
                    />
                  )}
                </div>
                <p className="text-xs sm:text-sm text-jal-slate-600 mt-0.5">
                  {areaSchedule 
                    ? (isMarathi 
                        ? `वेळ: ${areaSchedule.time} (${areaSchedule.duration}) • दाब: ${areaSchedule.pressure}`
                        : `Time: ${areaSchedule.time} (${areaSchedule.duration}) • Pressure: ${areaSchedule.pressure}`)
                    : t('todaySupplyTiming')}
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/schedule')}
              icon={ArrowRight}
              iconPosition="right"
              className="self-start sm:self-auto bg-white text-xs"
            >
              {t('btnFullSchedule')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Primary Services Grid */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <h2 className="text-base sm:text-lg font-bold text-jal-slate-900 font-devanagari">
            {t('servicesTitle')}
          </h2>
          <span className="text-xs text-jal-slate-600">{t('servicesCount')}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.route}
                hoverable
                onClick={() => navigate(item.route)}
                className="group p-4 sm:p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${item.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    {item.badge && (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-jal-navy border border-slate-200">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-jal-slate-900 font-devanagari group-hover:text-jal-blue transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-jal-slate-600 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="flex items-center text-xs font-semibold text-jal-blue gap-1 mt-4 group-hover:translate-x-1 transition-transform">
                  <span>{isMarathi ? 'सुरू करा' : 'Open'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Two Column Layout: Recent Complaint Summary + Recent Notice */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Complaint Card */}
        <Card>
          <div className="p-4 sm:p-5 border-b border-jal-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-jal-blue" />
              <h3 className="text-sm sm:text-base font-bold text-jal-slate-900 font-devanagari">
                {isMarathi ? 'अलीकडील तक्रार स्थिती' : 'Recent Complaint Status'}
              </h3>
            </div>
            <button
              onClick={() => navigate('/complaints')}
              className="text-xs font-medium text-jal-blue hover:underline"
            >
              {isMarathi ? `सर्व तक्रारी (${complaints.length})` : `View All (${complaints.length})`}
            </button>
          </div>
          <CardContent className="p-4 sm:p-5">
            {recentComplaint ? (
              <div className="p-3.5 bg-slate-50 rounded-xl border border-jal-border/70 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-jal-navy font-mono">#{recentComplaint.id}</span>
                    <StatusBadge
                      status={recentComplaint.status}
                      label={isMarathi ? recentComplaint.statusLabel : (recentComplaint.status === 'resolved' ? 'Resolved' : 'In Progress')}
                      size="sm"
                    />
                  </div>
                  <div className="text-xs font-semibold text-jal-slate-900 font-devanagari">
                    {isMarathi ? recentComplaint.category : (recentComplaint.categoryEn || recentComplaint.category)}
                  </div>
                  <div className="text-[11px] text-jal-slate-600">
                    {recentComplaint.area} • {isMarathi ? `दाखल: ${recentComplaint.date}` : `Filed: ${recentComplaint.date}`}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/complaints/${recentComplaint.id}`)}
                  className="text-xs py-1 px-2.5 h-auto min-h-0 bg-white"
                >
                  {isMarathi ? 'तपशील' : 'Details'}
                </Button>
              </div>
            ) : (
              <div className="text-center py-5 space-y-2">
                <p className="text-xs text-jal-slate-600">
                  {isMarathi ? 'सध्या कोणतीही प्रलंबित तक्रार नाही.' : 'No active grievances recorded.'}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/complaints/new')}
                  icon={PlusCircle}
                >
                  {isMarathi ? 'नवीन तक्रार नोंदवा' : 'Register New Grievance'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Notice Card */}
        <Card>
          <div className="p-4 sm:p-5 border-b border-jal-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-jal-amber" />
              <h3 className="text-sm sm:text-base font-bold text-jal-slate-900 font-devanagari">
                {isMarathi ? 'महत्त्वाची सूचना (नमुना)' : 'Important Water Notice (Demo)'}
              </h3>
            </div>
            <button
              onClick={() => navigate('/notices')}
              className="text-xs font-medium text-jal-blue hover:underline"
            >
              {isMarathi ? 'सर्व सूचना पहा' : 'View All Notices'}
            </button>
          </div>
          <CardContent className="p-4 sm:p-5">
            {recentNotice ? (
              <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-200/80 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-amber-900 font-devanagari">
                    {isMarathi ? recentNotice.title : (recentNotice.titleEn || recentNotice.title)}
                  </span>
                  <span className="text-[10px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full font-medium">
                    {recentNotice.date}
                  </span>
                </div>
                <p className="text-xs text-amber-950/80 leading-relaxed font-devanagari">
                  {isMarathi ? recentNotice.message : (recentNotice.messageEn || recentNotice.message)}
                </p>
                <div className="text-[11px] text-amber-900/70 pt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-700" />
                  <span>{recentNotice.area}</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-5 text-xs text-jal-slate-600">
                {isMarathi ? 'सध्या कोणत्याही नवीन सूचना नाहीत.' : 'No new outage notices.'}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
