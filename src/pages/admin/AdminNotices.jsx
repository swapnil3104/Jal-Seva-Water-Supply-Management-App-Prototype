import React, { useState } from 'react';
import { 
  BellRing, 
  Plus, 
  Calendar, 
  MapPin, 
  Clock, 
  Edit3, 
  Trash2, 
  AlertTriangle, 
  CheckCircle2, 
  Filter, 
  Search, 
  Save 
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

export default function AdminNotices() {
  const { notices, createNotice, updateNotice, deleteNotice } = usePrototype();
  const { isMarathi } = useLanguage();

  const [filterArea, setFilterArea] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [toast, setToast] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    type: 'नियोजित दुरुस्ती',
    area: 'प्रभाग ४ — शिवाजी नगर',
    date: '२६ ऑक्टोबर २०२६',
    time: 'सकाळी १०:०० ते दुपारी २:००',
    message: '',
    priority: 'normal',
    status: 'active',
    statusLabel: isMarathi ? 'सक्रिय सूचना' : 'Active Notice',
  });

  const areas = [
    { value: 'all', label: isMarathi ? 'सर्व परिसर (All Areas)' : 'All Areas' },
    { value: 'शिवाजी नगर', label: isMarathi ? 'शिवाजी नगर' : 'Shivaji Nagar' },
    { value: 'कोथरूड', label: isMarathi ? 'कोथरूड' : 'Kothrud' },
    { value: 'शनिवार पेठ', label: isMarathi ? 'शनिवार पेठ' : 'Shaniwar Peth' },
    { value: 'विमान नगर', label: isMarathi ? 'विमान नगर' : 'Viman Nagar' },
    { value: 'हडपसर', label: isMarathi ? 'हडपसर' : 'Hadapsar' },
    { value: 'संपूर्ण पुणे शहर', label: isMarathi ? 'संपूर्ण पुणे शहर' : 'Entire Pune City' },
  ];

  const noticeTypes = isMarathi ? [
    { value: 'नियोजित दुरुस्ती', label: 'नियोजित दुरुस्ती' },
    { value: 'आपत्कालीन शटडाऊन', label: 'आपत्कालीन शटडाऊन' },
    { value: 'सण नियोजन', label: 'सण नियोजन' },
    { value: 'सामान्य सूचना', label: 'सामान्य सूचना' },
    { value: 'पुरवठा पूर्ववत', label: 'पुरवठा पूर्ववत' },
  ] : [
    { value: 'नियोजित दुरुस्ती', label: 'Scheduled Maintenance' },
    { value: 'आपत्कालीन शटडाऊन', label: 'Emergency Shutdown' },
    { value: 'सण नियोजन', label: 'Festival Schedule' },
    { value: 'सामान्य सूचना', label: 'General Announcement' },
    { value: 'पुरवठा पूर्ववत', label: 'Supply Restored' },
  ];

  const statusOptions = isMarathi ? [
    { value: 'active', label: 'सक्रिय सूचना (Active Alert)', statusLabel: 'सक्रिय सूचना' },
    { value: 'delayed', label: 'महत्त्वाची सूचना (Urgent/Notice)', statusLabel: 'महत्त्वाची सूचना' },
    { value: 'resolved', label: 'काम पूर्ण / नियमित (Resolved/Normal)', statusLabel: 'काम पूर्ण' },
  ] : [
    { value: 'active', label: 'Active Alert', statusLabel: 'Active Alert' },
    { value: 'delayed', label: 'Urgent Advisory', statusLabel: 'Urgent' },
    { value: 'resolved', label: 'Resolved / Normal Supply', statusLabel: 'Resolved' },
  ];

  const handleOpenCreate = () => {
    setEditingNotice(null);
    setFormData({
      title: '',
      type: 'नियोजित दुरुस्ती',
      area: isMarathi ? 'प्रभाग ४ — शिवाजी नगर' : 'Ward 4 — Shivaji Nagar',
      date: isMarathi ? '२७ ऑक्टोबर २०२६' : '27 October 2026',
      time: isMarathi ? 'सकाळी १०:०० ते दुपारी २:००' : '10:00 AM to 02:00 PM',
      message: '',
      priority: 'normal',
      status: 'delayed',
      statusLabel: isMarathi ? 'महत्त्वाची सूचना' : 'Important Notice',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (notice) => {
    setEditingNotice(notice);
    setFormData({
      title: notice.title || '',
      type: notice.type || 'नियोजित दुरुस्ती',
      area: notice.area || (isMarathi ? 'संपूर्ण पुणे शहर' : 'Entire Pune City'),
      date: notice.date || '',
      time: notice.time || '',
      message: notice.message || '',
      priority: notice.priority || 'normal',
      status: notice.status || 'active',
      statusLabel: notice.statusLabel || (isMarathi ? 'सक्रिय सूचना' : 'Active Notice'),
    });
    setIsModalOpen(true);
  };

  const handleStatusChange = (val) => {
    const matched = statusOptions.find((opt) => opt.value === val);
    setFormData((prev) => ({
      ...prev,
      status: val,
      statusLabel: matched ? matched.statusLabel : val,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.message) {
      alert(isMarathi ? 'कृपया सूचनेचे शीर्षक आणि तपशील संदेश प्रविष्ट करा.' : 'Please enter notice title and message details.');
      return;
    }

    if (editingNotice) {
      updateNotice(editingNotice.id, formData);
      setToast({
        type: 'success',
        title: isMarathi ? 'सूचना अद्ययावत झाली!' : 'Notice Updated!',
        message: isMarathi 
          ? `"${formData.title}" ही शासकीय सूचना सामायिक स्टेटमध्ये सेव्ह झाली असून Citizen नोटिस बोर्डवर दिसेल.`
          : `Notice "${formData.title}" saved in shared state and live on Citizen board.`,
      });
    } else {
      createNotice(formData);
      setToast({
        type: 'success',
        title: isMarathi ? 'नवीन सूचना प्रसिद्ध झाली!' : 'Notice Published!',
        message: isMarathi 
          ? `"${formData.title}" ही सूचना नागरिकांच्या सूचना फलकावर प्रसिद्ध झाली आहे.`
          : `Notice "${formData.title}" published to citizen boards successfully.`,
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(isMarathi ? `खरोखर ही सूचना (#${id}: ${title}) काढून टाकायची आहे का?` : `Are you sure you want to delete notice #${id}: ${title}?`)) {
      deleteNotice(id);
      setToast({
        type: 'info',
        title: isMarathi ? 'सूचना हटवली!' : 'Notice Removed!',
        message: isMarathi ? `सूचना रेकॉर्ड #${id} काढून टाकले गेले आहे.` : `Notice record #${id} removed.`,
      });
    }
  };

  const getTypeLabel = (t) => {
    if (isMarathi) return t;
    const map = {
      'नियोजित दुरुस्ती': 'Scheduled Maintenance',
      'आपत्कालीन शटडाऊन': 'Emergency Shutdown',
      'सण नियोजन': 'Festival Schedule',
      'सामान्य सूचना': 'General Announcement',
      'पुरवठा पूर्ववत': 'Supply Restored',
    };
    return map[t] || t;
  };

  // Filtered list
  const filtered = notices.filter((n) => {
    const matchesArea = filterArea === 'all' || n.area.includes(filterArea);
    const matchesPriority = filterPriority === 'all' || n.priority === filterPriority;
    const matchesSearch =
      searchTerm === '' ||
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (n.message && n.message.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesArea && matchesPriority && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        backTo="/admin"
        backLabel={isMarathi ? "डॅशबोर्डवर परत जा" : "Back to Dashboard"}
        title={isMarathi ? "शासकीय सूचना व्यवस्थापन (Notices)" : "Official Notice & Alert Management"}
        subtitle={isMarathi 
          ? "नागरिकांसाठी तातडीच्या सूचना, शटडाऊन अलर्ट व परिपत्रके प्रसिद्ध करा"
          : "Broadcast emergency advisories, planned maintenance alerts and municipal press releases"}
        badge={<StatusBadge status="active" label={isMarathi ? `${notices.length} सूचना प्रसिद्ध` : `${notices.length} Notices Active`} size="sm" />}
        actions={
          <Button
            variant="navy"
            size="sm"
            onClick={handleOpenCreate}
            icon={Plus}
          >
            {isMarathi ? "नवीन सूचना जोडा" : "Publish Notice"}
          </Button>
        }
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
          <div>
            <label className="block text-xs font-semibold text-jal-slate-900 mb-1 font-devanagari">
              {isMarathi ? "परिसर फिल्टर:" : "Area Filter:"}
            </label>
            <Select
              value={filterArea}
              onChange={(e) => setFilterArea(e.target.value)}
              options={areas}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-jal-slate-900 mb-1 font-devanagari">
              {isMarathi ? "प्राधान्य:" : "Priority Filter:"}
            </label>
            <Select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              options={isMarathi ? [
                { value: 'all', label: 'सर्व प्राधान्य' },
                { value: 'high', label: 'तातडीची / High Priority' },
                { value: 'normal', label: 'सामान्य / Normal' },
              ] : [
                { value: 'all', label: 'All Priorities' },
                { value: 'high', label: 'High Priority (Urgent)' },
                { value: 'normal', label: 'Normal Priority' },
              ]}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-jal-slate-900 mb-1 font-devanagari">
              {isMarathi ? "शोध:" : "Search:"}
            </label>
            <Input
              icon={Search}
              placeholder={isMarathi ? "शीर्षक, परिसर किंवा मजकूर शोधा..." : "Search title, ward or announcement text..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </Card>

      {/* Notices List */}
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((n) => {
            const isHigh = n.priority === 'high';
            return (
              <Card 
                key={n.id} 
                className={`p-4 sm:p-5 hover:border-jal-blue/40 transition-colors ${
                  isHigh ? 'border-l-4 border-l-red-500' : ''
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold text-jal-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-jal-border">
                        #{n.id}
                      </span>
                      <span className="font-bold text-base text-jal-navy font-devanagari">
                        {n.title}
                      </span>
                      {isHigh && (
                        <span className="text-xs px-2 py-0.5 rounded bg-red-100 text-red-700 font-bold border border-red-200">
                          {isMarathi ? 'अतितातडीचे' : 'High Priority'}
                        </span>
                      )}
                      <StatusBadge status={n.status} label={!isMarathi && n.status === 'active' ? 'Active Alert' : n.statusLabel} size="sm" />
                    </div>

                    <p className="text-xs sm:text-sm text-jal-slate-700 font-devanagari leading-relaxed">
                      {n.message}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-jal-slate-600 flex-wrap font-devanagari pt-1">
                      <span className="flex items-center gap-1 text-jal-blue font-medium">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{n.area}</span>
                      </span>
                      <span>•</span>
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-jal-slate-800">
                        {getTypeLabel(n.type)}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span>{n.date}</span>
                      </span>
                      {n.time && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                            <span>{n.time}</span>
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:self-center">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={Edit3}
                      onClick={() => handleOpenEdit(n)}
                      className="text-xs"
                    >
                      {isMarathi ? "संपादन" : "Edit"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(n.id, n.title)}
                      className="text-xs text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })
        ) : (
          <Card className="p-8 text-center text-xs text-jal-slate-600">
            {isMarathi ? "कोणतीही शासकीय सूचना जुळली नाही. फिल्टर बदला किंवा नवीन सूचना जोडा." : "No notices match the filter criteria. Change filters or publish a new notice."}
          </Card>
        )}
      </div>

      {/* Create / Edit Notice Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingNotice 
          ? (isMarathi ? `सूचना संपादन (#${editingNotice.id})` : `Edit Notice (#${editingNotice.id})`)
          : (isMarathi ? 'नवीन शासकीय सूचना प्रसिद्ध करा' : 'Publish Official Water Advisory')}
        description={isMarathi 
          ? "प्रशासकीय नोटीस सामायिक स्टेटमध्ये सेव्ह होईल व Citizen सूचना फलकावर थेट प्रसिद्ध होईल."
          : "Notices are saved directly to shared state and broadcast live across citizen boards."}
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
              {isMarathi ? "रद्द करा" : "Cancel"}
            </Button>
            <Button variant="primary" size="sm" icon={Save} onClick={handleSave}>
              {editingNotice 
                ? (isMarathi ? 'बदल जतन करा' : 'Save Changes')
                : (isMarathi ? 'सूचना प्रसिद्ध करा' : 'Publish Notice')}
            </Button>
          </div>
        }
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-jal-slate-900 mb-1 font-devanagari">
              {isMarathi ? "सूचनेचे शीर्षक (Notice Title):" : "Notice Title:"}
            </label>
            <Input
              placeholder={isMarathi ? "उदा. नियोजित जलवाहिनी दुरुस्ती काम" : "e.g. Planned Pipeline Repair Work"}
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-jal-slate-900 mb-1 font-devanagari">
                {isMarathi ? "सूचनेचा प्रकार (Notice Type):" : "Notice Type:"}
              </label>
              <Select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                options={noticeTypes}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-jal-slate-900 mb-1 font-devanagari">
                {isMarathi ? "प्रभावित परिसर (Affected Area):" : "Affected Area / Ward:"}
              </label>
              <Input
                placeholder={isMarathi ? "उदा. प्रभाग ४ — शिवाजी नगर व मॉडेल कॉलनी" : "e.g. Ward 4 — Shivaji Nagar & Model Colony"}
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-jal-slate-900 mb-1 font-devanagari">
                {isMarathi ? "तारीख (Date):" : "Date:"}
              </label>
              <Input
                placeholder={isMarathi ? "उदा. २७ ऑक्टोबर २०२६" : "e.g. 27 Oct 2026"}
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-jal-slate-900 mb-1 font-devanagari">
                {isMarathi ? "वेळ (Time):" : "Time Window:"}
              </label>
              <Input
                placeholder={isMarathi ? "उदा. सकाळी १०:०० ते दुपारी २:००" : "e.g. 10:00 AM to 02:00 PM"}
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-jal-slate-900 mb-1 font-devanagari">
                {isMarathi ? "प्राधान्य (Priority):" : "Priority Level:"}
              </label>
              <Select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                options={isMarathi ? [
                  { value: 'normal', label: 'सामान्य सूचना (Normal)' },
                  { value: 'high', label: 'तातडीची / शटडाऊन अलर्ट (High Priority)' },
                ] : [
                  { value: 'normal', label: 'Normal Announcement' },
                  { value: 'high', label: 'High Priority / Shutdown Alert' },
                ]}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-jal-slate-900 mb-1 font-devanagari">
                {isMarathi ? "सद्यस्थिती (Status):" : "Status:"}
              </label>
              <Select
                value={formData.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                options={statusOptions}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-jal-slate-900 mb-1 font-devanagari">
              {isMarathi ? "संपूर्ण संदेश / परिपत्रक मजकूर (Full Message):" : "Full Advisory Message:"}
            </label>
            <TextArea
              rows={3}
              placeholder={isMarathi ? "नागरिकांसाठी सविस्तर माहिती लिहा..." : "Detailed information and instructions for citizens..."}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
