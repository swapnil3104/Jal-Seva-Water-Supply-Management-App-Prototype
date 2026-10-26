import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Calendar, 
  AlertCircle, 
  User, 
  FileText,
  RotateCw,
  ExternalLink,
  ShieldCheck,
  Image as ImageIcon
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Card, { CardContent } from '../../components/common/Card';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';
import { usePrototype } from '../../context/PrototypeContext';
import { useLanguage } from '../../context/LanguageContext';

export default function ComplaintDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getComplaintById } = usePrototype();
  const { isMarathi } = useLanguage();

  const complaint = getComplaintById(id);

  if (!complaint) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <PageHeader
          backTo="/complaints"
          backLabel={isMarathi ? 'माझ्या तक्रारींवर परत जा' : 'Back to Complaints'}
          title={isMarathi ? 'तक्रार सापडली नाही' : 'Complaint Not Found'}
          subtitle={isMarathi 
            ? 'संबंधित तक्रार संदर्भ क्रमांक अस्तित्वात नाही किंवा हटवला गेला आहे' 
            : 'The requested grievance ticket does not exist or has been archived'}
        />
        <Card className="p-8 text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-jal-amber mx-auto" />
          <p className="text-sm text-jal-slate-600 font-devanagari">
            {isMarathi 
              ? `तक्रार आयडी #${id} सिमुलेटेड प्रणालीमध्ये आढळला नाही.`
              : `Complaint reference #${id} could not be found in the simulation database.`}
          </p>
          <Button variant="primary" onClick={() => navigate('/complaints')}>
            {isMarathi ? 'सर्व तक्रारी पहा' : 'View All Complaints'}
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <PageHeader
        backTo="/complaints"
        backLabel={isMarathi ? 'माझ्या तक्रारींवर परत जा' : 'Back to Complaints'}
        title={isMarathi ? `तक्रार तपशील #${complaint.id}` : `Complaint Ticket Details #${complaint.id}`}
        subtitle={isMarathi 
          ? 'तक्रारीची सद्यस्थिती व महानगरपालिका दुरुस्ती पथकाची प्रगती'
          : 'Live status, engineer inspection progress, and department resolution log'}
        badge={
          <StatusBadge
            status={complaint.status}
            label={isMarathi ? complaint.statusLabel : (complaint.status === 'resolved' ? 'Resolved' : complaint.status === 'in_progress' ? 'In Progress' : 'Submitted')}
            size="md"
          />
        }
      />

      {/* Main Complaint Overview Card */}
      <Card className="p-5 sm:p-6 space-y-5 shadow-card">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-jal-border text-xs sm:text-sm">
          <div>
            <span className="text-jal-slate-600 block">{isMarathi ? 'तक्रारीचा प्रकार:' : 'Category:'}</span>
            <span className="font-bold text-jal-slate-900 text-base font-devanagari">
              {isMarathi ? complaint.category : (complaint.categoryEn || complaint.category)}
            </span>
          </div>
          <div>
            <span className="text-jal-slate-600 block">{isMarathi ? 'दाखल दिनांक व वेळ:' : 'Date & Time Filed:'}</span>
            <span className="font-semibold text-jal-slate-900">{complaint.date}</span>
          </div>
          <div className="sm:col-span-2">
            <span className="text-jal-slate-600 block">{isMarathi ? 'पत्ता व परिसर:' : 'Address & Ward:'}</span>
            <span className="font-semibold text-jal-slate-900 flex items-center gap-1.5 mt-0.5 font-devanagari">
              <MapPin className="w-4 h-4 text-jal-blue flex-shrink-0" />
              <span>{complaint.address || complaint.landmark || complaint.area}</span>
            </span>
          </div>
        </div>

        {/* Complaint Description */}
        <div>
          <h3 className="text-xs font-bold text-jal-slate-600 uppercase tracking-wider mb-1.5 font-devanagari">
            {isMarathi ? 'नागरिकाने दिलेला तपशील (Description):' : 'Citizen Grievance Description:'}
          </h3>
          <p className="text-sm text-jal-slate-900 bg-slate-50 p-3.5 rounded-xl border border-jal-border/70 leading-relaxed font-devanagari">
            {complaint.description}
          </p>
        </div>

        {/* Attached Photo Preview (if any) */}
        {complaint.photoUrl && (
          <div>
            <h3 className="text-xs font-bold text-jal-slate-600 uppercase tracking-wider mb-2 font-devanagari flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-jal-blue" />
              <span>{isMarathi ? 'जोडलेला फोटो (Photo Attachment):' : 'Attached Photo Evidence:'}</span>
            </h3>
            <div className="border border-jal-border rounded-xl p-2 bg-slate-50 inline-block">
              <img
                src={complaint.photoUrl}
                alt="Complaint attachment"
                className="max-h-56 rounded-lg object-contain"
              />
            </div>
          </div>
        )}

        {/* Official PMC Staff Note */}
        {complaint.adminNote && (
          <div className="p-4 rounded-xl bg-jal-pale-blue/60 border border-jal-blue/30 space-y-1">
            <div className="flex items-center gap-2 text-jal-blue font-bold text-xs sm:text-sm font-devanagari">
              <RotateCw className="w-4 h-4" />
              <span>{isMarathi ? 'महानगरपालिका प्रशासकीय शेरा (Department Update):' : 'Municipal Engineer Log Update:'}</span>
            </div>
            <p className="text-xs sm:text-sm text-jal-navy font-devanagari leading-relaxed">
              {complaint.adminNote}
            </p>
          </div>
        )}
      </Card>

      {/* Progress Timeline Tracker */}
      <Card className="p-5 sm:p-6 space-y-4">
        <h3 className="text-sm sm:text-base font-bold text-jal-navy font-devanagari flex items-center gap-2">
          <Clock className="w-4 h-4 text-jal-blue" />
          <span>{isMarathi ? 'निवारण टप्पे व प्रगती (Redressal Timeline)' : 'Grievance Resolution Progress & Timeline'}</span>
        </h3>

        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 before:top-2.5 before:bottom-2.5 before:w-0.5 before:bg-slate-200">
          {complaint.timeline.map((step, idx) => {
            const isDone = step.done;
            const isCurrent = step.current;

            return (
              <div key={idx} className="relative group">
                {/* Dot */}
                <div
                  className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isDone
                      ? 'bg-jal-teal text-white shadow-xs'
                      : isCurrent
                      ? 'bg-jal-blue text-white ring-4 ring-jal-pale-blue animate-pulse'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-0.5">
                  <div className="text-xs sm:text-sm font-bold text-jal-slate-900 font-devanagari">
                    {step.step}
                  </div>
                  <div className="text-[11px] text-jal-slate-600">
                    {step.date}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Admin Demo Switch Helper Button */}
      <div className="p-4 rounded-xl bg-slate-50 border border-jal-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-jal-slate-600">
          <ShieldCheck className="w-4 h-4 text-jal-blue" />
          <span>
            {isMarathi 
              ? 'प्रोटोटाइप चाचणी: या तक्रारीची स्थिती Admin कक्षामधून बदलून पहा' 
              : 'Prototype Demo: Manage this ticket status from the Admin Portal'}
          </span>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigate(`/admin/complaints/${complaint.id}`)}
          icon={ExternalLink}
          iconPosition="right"
          className="text-xs bg-white text-jal-navy border-jal-border hover:bg-slate-100"
        >
          {isMarathi ? 'Admin कक्षामध्ये उघडा' : 'Open in Admin Panel'}
        </Button>
      </div>
    </div>
  );
}
