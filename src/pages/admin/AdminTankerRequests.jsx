import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Search, 
  Filter, 
  Edit3, 
  UserCheck, 
  Save, 
  AlertCircle 
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import TextArea from '../../components/common/TextArea';
import Modal from '../../components/common/Modal';
import ToastMessage from '../../components/common/ToastMessage';
import { usePrototype } from '../../context/PrototypeContext';
import { useLanguage } from '../../context/LanguageContext';

export default function AdminTankerRequests() {
  const { tankerRequests, updateTankerRequest } = usePrototype();
  const { isMarathi } = useLanguage();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal State for Dispatch / Update
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [toast, setToast] = useState(null);

  const [editForm, setEditForm] = useState({
    status: 'dispatched',
    statusLabel: isMarathi ? 'टँकर रवाना (Dispatched)' : 'Dispatched',
    driverName: 'Sachin Kamble (MH-12-AB-3421)',
    estimatedArrival: isMarathi ? '३० मिनिटांत पोहोचेल' : 'Arriving in 30 mins',
    notes: '',
  });

  const statusOptions = isMarathi ? [
    { value: 'submitted', label: 'मागणी दाखल (Submitted)', statusLabel: 'मागणी दाखल (Submitted)' },
    { value: 'under_review', label: 'तपासणी सुरू (Under Review)', statusLabel: 'तपासणी सुरू' },
    { value: 'dispatched', label: 'टँकर रवाना (Dispatched)', statusLabel: 'टँकर रवाना (Dispatched)' },
    { value: 'delivered', label: 'वितरित (Delivered)', statusLabel: 'वितरित (Delivered)' },
  ] : [
    { value: 'submitted', label: 'Submitted (New Request)', statusLabel: 'Submitted' },
    { value: 'under_review', label: 'Under Review', statusLabel: 'Under Review' },
    { value: 'dispatched', label: 'Dispatched (On the way)', statusLabel: 'Dispatched' },
    { value: 'delivered', label: 'Delivered (Completed)', statusLabel: 'Delivered' },
  ];

  const handleOpenModal = (request) => {
    setSelectedRequest(request);
    setEditForm({
      status: request.status || 'dispatched',
      statusLabel: request.statusLabel || (isMarathi ? 'टँकर रवाना' : 'Dispatched'),
      driverName: request.driverName && !request.driverName.includes('Pending') && !request.driverName.includes('प्रतीक्षेत')
        ? request.driverName 
        : 'Sachin Kamble (MH-12-AB-3421)',
      estimatedArrival: request.estimatedArrival || (isMarathi ? '३० मिनिटांत पोहोचेल' : 'Within 30 mins'),
      notes: request.notes || '',
    });
    setIsModalOpen(true);
  };

  const handleStatusChange = (val) => {
    const matched = statusOptions.find((opt) => opt.value === val);
    setEditForm((prev) => ({
      ...prev,
      status: val,
      statusLabel: matched ? matched.statusLabel : val,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!selectedRequest) return;

    updateTankerRequest(selectedRequest.id, {
      status: editForm.status,
      statusLabel: editForm.statusLabel,
      driverName: editForm.driverName,
      estimatedArrival: editForm.estimatedArrival,
      notes: editForm.notes,
    });

    setToast({
      type: 'success',
      title: isMarathi ? 'टँकर स्थिती अद्ययावत झाली!' : 'Tanker Status Updated!',
      message: isMarathi 
        ? `टँकर मागणी #${selectedRequest.id} ची स्थिती "${editForm.statusLabel}" म्हणून सेव्ह झाली आहे.`
        : `Tanker request #${selectedRequest.id} marked as "${editForm.statusLabel}".`,
    });

    setIsModalOpen(false);
  };

  // Quick Dispatch Handler
  const handleQuickDispatch = (r) => {
    updateTankerRequest(r.id, {
      status: 'dispatched',
      statusLabel: isMarathi ? 'टँकर रवाना (Dispatched)' : 'Dispatched',
      driverName: 'Sachin Kamble (MH-12-AB-3421)',
      estimatedArrival: isMarathi ? '३५ मिनिटांत पोहोचेल' : 'In 35 mins',
    });
    setToast({
      type: 'success',
      title: isMarathi ? 'टँकर रवाना करण्यात आला!' : 'Tanker Dispatched!',
      message: isMarathi 
        ? `मागणी #${r.id} साठी टँकर रवाना झाला असून चालकाचे नाव वाटप करण्यात आले आहे.`
        : `Tanker for request #${r.id} dispatched with assigned driver.`,
    });
  };

  // Quick Deliver Handler
  const handleQuickDeliver = (r) => {
    updateTankerRequest(r.id, {
      status: 'delivered',
      statusLabel: isMarathi ? 'वितरित (Delivered)' : 'Delivered',
      estimatedArrival: isMarathi ? 'वितरण पूर्ण झाले' : 'Delivery completed',
    });
    setToast({
      type: 'success',
      title: isMarathi ? 'वितरण पूर्ण!' : 'Delivery Complete!',
      message: isMarathi 
        ? `मागणी #${r.id} यशस्वीरित्या पूर्ण झाली म्हणून नोंदवली गेली.`
        : `Request #${r.id} marked as delivered successfully.`,
    });
  };

  const getReasonLabel = (reason) => {
    if (isMarathi) return reason;
    const map = {
      'जलवाहिनी दुरुस्ती व खंडित पुरवठा': 'Pipeline Maintenance Outage',
      'कमी दाबाने पाणीपुरवठा': 'Low Water Pressure',
      'दूषित / गढूळ पाणी': 'Contaminated Water',
      'सण / घरगुती विशेष कार्यक्रम': 'Festival / Special Household Event',
      'इतर आपत्कालीन कारण': 'Other Emergency',
    };
    return map[reason] || reason;
  };

  const filtered = tankerRequests.filter((r) => {
    const matchesSearch =
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.citizenName && r.citizenName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        backTo="/admin"
        backLabel={isMarathi ? "डॅशबोर्डवर परत जा" : "Back to Dashboard"}
        title={isMarathi ? "पाणी टँकर मागणी व्यवस्थापन" : "Water Tanker Dispatch Management"}
        subtitle={isMarathi 
          ? "नागरिकांकडून आलेल्या आपत्कालीन टँकर विनंत्यांचे वाटप, चालक नियुक्ती व थेट नियंत्रण (Admin Demo)"
          : "Fleet allocation, driver assignment, and live dispatch control for emergency water tankers"}
        badge={<StatusBadge status="active" label={isMarathi ? `${tankerRequests.length} विनंत्या नोंदणीकृत` : `${tankerRequests.length} Requests`} size="sm" />}
      />

      {toast && (
        <ToastMessage
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* Filter and Search Bar */}
      <Card className="p-4 sm:p-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <Input
              icon={Search}
              placeholder={isMarathi ? "आयडी, परिसर, नागरिक किंवा कारण शोधा..." : "Search by ID, area, citizen or reason..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={isMarathi ? [
                { value: 'all', label: 'सर्व स्थिती (All Status)' },
                { value: 'submitted', label: 'नवीन दाखल (Submitted)' },
                { value: 'under_review', label: 'तपासणी सुरू (Under Review)' },
                { value: 'dispatched', label: 'टँकर रवाना (Dispatched)' },
                { value: 'delivered', label: 'वितरित (Delivered)' },
              ] : [
                { value: 'all', label: 'All Status' },
                { value: 'submitted', label: 'Submitted (New)' },
                { value: 'under_review', label: 'Under Review' },
                { value: 'dispatched', label: 'Dispatched' },
                { value: 'delivered', label: 'Delivered' },
              ]}
            />
          </div>
        </div>
      </Card>

      {/* Requests List */}
      <div className="space-y-3.5">
        {filtered.length > 0 ? (
          filtered.map((r) => (
            <Card key={r.id} className="p-4 sm:p-5 hover:border-jal-blue/40 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-bold text-sm text-jal-navy font-mono">#{r.id}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {r.capacity}
                    </span>
                    <StatusBadge
                      status={
                        r.status === 'delivered'
                          ? 'resolved'
                          : r.status === 'dispatched'
                          ? 'active'
                          : r.status === 'under_review'
                          ? 'delayed'
                          : 'submitted'
                      }
                      label={!isMarathi && r.status === 'dispatched' ? 'Dispatched' : !isMarathi && r.status === 'delivered' ? 'Delivered' : r.statusLabel}
                      size="sm"
                    />
                  </div>

                  <div className="text-sm font-bold text-jal-slate-900 font-devanagari">
                    {r.citizenName || (isMarathi ? 'नागरिक' : 'Citizen')} • <span className="text-jal-slate-600 font-normal">{getReasonLabel(r.reason)}</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-jal-slate-600 flex-wrap font-devanagari">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-jal-blue flex-shrink-0" />
                      <span>{r.address} ({r.area})</span>
                    </span>
                    <span>•</span>
                    <span>{isMarathi ? `नोंदणी: ${r.date}` : `Req Date: ${r.date}`}</span>
                    {r.preferredTime && <span>• {isMarathi ? `अपेक्षित: ${r.preferredTime}` : `Pref Time: ${r.preferredTime}`}</span>}
                    {r.driverName && (
                      <span className="text-jal-teal font-medium flex items-center gap-1">
                        <Truck className="w-3.5 h-3.5" />
                        {r.driverName}
                      </span>
                    )}
                  </div>

                  {r.estimatedArrival && (
                    <div className="text-xs text-jal-blue font-medium font-devanagari">
                      {isMarathi ? `अपेक्षित आगमन / स्थिती: ${r.estimatedArrival}` : `ETA / Status: ${r.estimatedArrival}`}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 sm:self-center flex-wrap">
                  {r.status === 'submitted' && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleQuickDispatch(r)}
                      className="text-xs bg-jal-blue text-white"
                    >
                      {isMarathi ? "टँकर रवाना करा" : "Dispatch Tanker"}
                    </Button>
                  )}
                  {r.status === 'dispatched' && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleQuickDeliver(r)}
                      className="text-xs bg-jal-teal text-white"
                    >
                      {isMarathi ? "पूर्ण चिन्हांकित करा" : "Mark Delivered"}
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Edit3}
                    onClick={() => handleOpenModal(r)}
                    className="text-xs bg-white text-jal-navy"
                  >
                    {isMarathi ? "व्यवस्थापन" : "Manage"}
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-8 text-center text-xs text-jal-slate-600">
            {isMarathi ? "कोणतीही टँकर मागणी उपलब्ध नाही." : "No tanker requests found matching criteria."}
          </Card>
        )}
      </div>

      {/* Tanker Dispatch / Update Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedRequest 
          ? (isMarathi ? `टँकर मागणी व्यवस्थापन (#${selectedRequest.id})` : `Manage Tanker Request (#${selectedRequest.id})`)
          : (isMarathi ? 'टँकर वाटप' : 'Tanker Allocation')}
        description={isMarathi 
          ? "चालक नियुक्ती, पोहोचण्याची वेळ आणि वितरण स्थिती अद्ययावत करा."
          : "Assign tanker vehicle, driver contact, ETA and delivery status."}
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
              {isMarathi ? "रद्द करा" : "Cancel"}
            </Button>
            <Button variant="primary" size="sm" icon={Save} onClick={handleSave}>
              {isMarathi ? "बदल जतन करा" : "Save Changes"}
            </Button>
          </div>
        }
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-jal-slate-900 mb-1 font-devanagari">
              {isMarathi ? "वितरण स्थिती (Status):" : "Delivery Status:"}
            </label>
            <Select
              value={editForm.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              options={statusOptions}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-jal-slate-900 mb-1 font-devanagari">
              {isMarathi ? "टँकर चालक व वाहन क्रमांक (Driver & Vehicle):" : "Driver Name & Vehicle Number:"}
            </label>
            <Input
              placeholder={isMarathi ? "उदा. सचिन कांबळे (MH-12-AB-3421)" : "e.g. Sachin Kamble (MH-12-AB-3421)"}
              value={editForm.driverName}
              onChange={(e) => setEditForm({ ...editForm, driverName: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-jal-slate-900 mb-1 font-devanagari">
              {isMarathi ? "अपेक्षित पोहोचण्याची वेळ (Estimated Arrival):" : "Estimated Arrival (ETA):"}
            </label>
            <Input
              placeholder={isMarathi ? "उदा. ३० मिनिटांत पोहोचेल / दुपारी २:३० वाजता" : "e.g. In 30 mins / 02:30 PM"}
              value={editForm.estimatedArrival}
              onChange={(e) => setEditForm({ ...editForm, estimatedArrival: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-jal-slate-900 mb-1 font-devanagari">
              {isMarathi ? "प्रशासकीय शेरा (Admin Notes):" : "Admin Remarks / Internal Notes:"}
            </label>
            <TextArea
              rows={2}
              placeholder={isMarathi ? "वितरणाबाबत अंतर्गत नोंद किंवा शेरा..." : "Internal notes regarding water delivery..."}
              value={editForm.notes}
              onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
