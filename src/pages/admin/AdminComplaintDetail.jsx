import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, MapPin, Calendar, Clock, AlertCircle, Save, ArrowLeft, ExternalLink } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Card, { CardContent, CardFooter } from '../../components/common/Card';
import StatusBadge from '../../components/common/StatusBadge';
import Select from '../../components/common/Select';
import TextArea from '../../components/common/TextArea';
import Button from '../../components/common/Button';
import ToastMessage from '../../components/common/ToastMessage';
import { usePrototype } from '../../context/PrototypeContext';
import { useLanguage } from '../../context/LanguageContext';

export default function AdminComplaintDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getComplaintById, updateComplaint, citizen } = usePrototype();
  const { isMarathi } = useLanguage();

  const complaint = getComplaintById(id);

  const [status, setStatus] = useState(complaint?.status || 'in_progress');
  const [note, setNote] = useState(complaint?.adminNote || '');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (complaint) {
      setStatus(complaint.status);
      setNote(complaint.adminNote || '');
    }
  }, [complaint?.id]);

  if (!complaint) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <PageHeader
          backTo="/admin/complaints"
          backLabel={isMarathi ? "तक्रार यादीवर परत जा" : "Back to Complaints"}
          title={isMarathi ? "तक्रार आढळली नाही" : "Complaint Not Found"}
        />
        <Card className="p-8 text-center space-y-3">
          <p className="text-sm text-jal-slate-600">
            {isMarathi ? `तक्रार आयडी ${id} उपलब्ध नाही.` : `Complaint ID ${id} not found.`}
          </p>
          <Button variant="outline" onClick={() => navigate('/admin/complaints')}>
            {isMarathi ? "सर्व तक्रारी पहा" : "View All Complaints"}
          </Button>
        </Card>
      </div>
    );
  }

  const getCategoryLabel = (cat) => {
    if (isMarathi) return cat;
    const map = {
      'कमी दाबाने पाणीपुरवठा': 'Low Water Pressure',
      'दूषित / गढूळ पाणी': 'Contaminated / Muddy Water',
      'जलवाहिनी गळती (Pipe Leak)': 'Pipe Leakage (Pipeline Leak)',
      'वेळेवर पाणी न येणे': 'Water Supply Delay / Not on Time',
      'मीटर किंवा बिल तक्रार': 'Meter or Billing Issue',
      'इतर तक्रार': 'Other Grievance',
    };
    return map[cat] || cat;
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateComplaint(complaint.id, {
      status,
      adminNote: note,
    });
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <PageHeader
        backTo="/admin/complaints"
        backLabel={isMarathi ? "तक्रार यादीवर परत जा" : "Back to Complaints"}
        title={isMarathi ? `तक्रार व्यवस्थापन #${complaint.id}` : `Complaint Management #${complaint.id}`}
        subtitle={isMarathi ? "तक्रारीची स्थिती अद्ययावत करा आणि दुरुस्ती अहवाल नोंदवा (Admin Action)" : "Update grievance resolution status and log engineer remarks (Admin Action)"}
        badge={<StatusBadge status={status} size="md" />}
      />

      {showToast && (
        <ToastMessage
          type="success"
          title={isMarathi ? "बदल जतन झाले!" : "Changes Saved Successfully!"}
          message={isMarathi 
            ? "तक्रारीची नवीन स्थिती व प्रशासकीय शेरा सामायिक स्टेटमध्ये अद्ययावत करण्यात आला आहे. Citizen ट्रॅकिंगमध्ये हा बदल तत्काळ दिसेल." 
            : "Complaint status and remarks updated in shared state. Citizens will immediately see these changes."}
          onClose={() => setShowToast(false)}
        />
      )}

      {/* Citizen Submission Details */}
      <Card className="p-5 sm:p-6 space-y-4">
        <h3 className="text-sm font-bold text-jal-navy uppercase tracking-wider font-devanagari pb-2 border-b border-jal-border">
          {isMarathi ? "नागरिकाने दाखल केलेला तपशील" : "Citizen Submission Details"}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div>
            <span className="text-jal-slate-600 block">{isMarathi ? "तक्रारदार:" : "Complainant:"}</span>
            <span className="font-bold text-jal-slate-900 font-devanagari">
              {isMarathi ? citizen.marathiName : citizen.englishName} ({citizen.phone})
            </span>
          </div>
          <div>
            <span className="text-jal-slate-600 block">{isMarathi ? "तक्रार प्रकार:" : "Complaint Category:"}</span>
            <span className="font-semibold text-jal-navy font-devanagari">{getCategoryLabel(complaint.category)}</span>
          </div>
          <div className="sm:col-span-2">
            <span className="text-jal-slate-600 block">{isMarathi ? "पत्ता:" : "Address:"}</span>
            <span className="font-semibold text-jal-slate-900 flex items-center gap-1.5 mt-0.5 font-devanagari">
              <MapPin className="w-4 h-4 text-jal-blue flex-shrink-0" />
              {complaint.address || complaint.landmark || complaint.area}
            </span>
          </div>
          <div className="sm:col-span-2">
            <span className="text-jal-slate-600 block mb-1">{isMarathi ? "नागरिकाचे विवरण:" : "Citizen Description:"}</span>
            <p className="p-3 bg-slate-50 rounded-xl border border-jal-border text-xs leading-relaxed font-devanagari">
              {complaint.description}
            </p>
          </div>
          {complaint.photoUrl && (
            <div className="sm:col-span-2">
              <span className="text-jal-slate-600 block mb-1">{isMarathi ? "जोडलेला फोटो:" : "Attached Photo:"}</span>
              <img
                src={complaint.photoUrl}
                alt="Attachment"
                className="max-h-48 rounded-lg border border-slate-200"
              />
            </div>
          )}
        </div>
      </Card>

      {/* Admin Status Update Form */}
      <Card className="shadow-card">
        <form onSubmit={handleSave}>
          <div className="p-4 sm:p-5 border-b border-jal-border bg-slate-50/60 flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-bold text-jal-navy font-devanagari">
              {isMarathi ? "प्रशासकीय कार्यवाही व स्थिती अद्ययावत" : "Administrative Action & Status Update"}
            </h3>
            <span className="text-xs text-jal-teal font-semibold">Simulated Action</span>
          </div>

          <CardContent className="p-5 sm:p-6 space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-jal-slate-900 mb-1.5 font-devanagari">
                {isMarathi ? "नवीन स्थिती निवडा (Update Status):" : "Update Status:"}
              </label>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                options={isMarathi ? [
                  { value: 'submitted', label: 'नवीन दाखल (Submitted)' },
                  { value: 'under_review', label: 'तपासणी सुरू (Under Review)' },
                  { value: 'in_progress', label: 'दुरुस्ती काम प्रगतीत (In Progress)' },
                  { value: 'resolved', label: 'निकाली / पूर्ण झाले (Resolved)' },
                ] : [
                  { value: 'submitted', label: 'Submitted (New)' },
                  { value: 'under_review', label: 'Under Review' },
                  { value: 'in_progress', label: 'In Progress (Repair ongoing)' },
                  { value: 'resolved', label: 'Resolved (Completed)' },
                ]}
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-jal-slate-900 mb-1.5 font-devanagari">
                {isMarathi ? "अधिकारी शेरा / निवारण अहवाल (Staff & Resolution Note):" : "Staff & Resolution Remarks:"}
              </label>
              <TextArea
                rows={4}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={isMarathi 
                  ? "उदा. कनिष्ठ अभियंत्यांनी पाहणी केली असून जलवाहिनी दुरुस्ती पूर्ण करण्यात आली आहे..."
                  : "e.g. Junior engineer inspected site, pipeline replacement completed and pressure restored..."}
              />
            </div>
          </CardContent>

          <CardFooter className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="md"
                type="button"
                onClick={() => navigate('/admin/complaints')}
              >
                {isMarathi ? "रद्द करा" : "Cancel"}
              </Button>
              <Button
                variant="secondary"
                size="md"
                type="button"
                onClick={() => navigate(`/complaints/${complaint.id}`)}
                icon={ExternalLink}
                className="text-xs bg-slate-100 text-jal-navy"
              >
                {isMarathi ? "नागरिक ट्रॅकिंग पहा" : "View Citizen Tracking"}
              </Button>
            </div>
            <Button
              variant="navy"
              size="md"
              type="submit"
              icon={Save}
              className="w-full sm:w-auto font-bold px-7"
            >
              {isMarathi ? "बदल जतन करा (Save Changes)" : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
