import React, { useState } from 'react';
import { 
  CalendarClock, 
  Plus, 
  MapPin, 
  Clock, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Filter, 
  Search, 
  Gauge, 
  AlertCircle, 
  X, 
  Save 
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Card, { CardContent } from '../../components/common/Card';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import TextArea from '../../components/common/TextArea';
import Modal from '../../components/common/Modal';
import ToastMessage from '../../components/common/ToastMessage';
import { usePrototype } from '../../context/PrototypeContext';
import { useLanguage } from '../../context/LanguageContext';

export default function AdminSchedules() {
  const { schedules, createSchedule, updateSchedule, deleteSchedule } = usePrototype();
  const { isMarathi } = useLanguage();
  
  const [filterArea, setFilterArea] = useState('all');
  const [filterDay, setFilterDay] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null); // null means create mode
  const [toast, setToast] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    area: 'Shivaji Nagar',
    zone: '',
    day: 'Today',
    time: '06:00 AM to 08:30 AM',
    duration: '2h 30m',
    pressure: '4.0 PSI (Normal)',
    status: 'scheduled',
    statusLabel: isMarathi ? 'नियोजित' : 'Scheduled',
    note: isMarathi ? 'पाणीपुरवठा वेळेवर सुरू राहील.' : 'Water supply will run on schedule.',
  });

  const areas = [
    { value: 'all', label: isMarathi ? 'सर्व परिसर (All Areas)' : 'All Areas' },
    { value: 'शिवाजी नगर', label: isMarathi ? 'शिवाजी नगर' : 'Shivaji Nagar' },
    { value: 'कोथरूड', label: isMarathi ? 'कोथरूड' : 'Kothrud' },
    { value: 'शनिवार पेठ', label: isMarathi ? 'शनिवार पेठ' : 'Shaniwar Peth' },
    { value: 'विमान नगर', label: isMarathi ? 'विमान नगर' : 'Viman Nagar' },
    { value: 'हडपसर', label: isMarathi ? 'हडपसर' : 'Hadapsar' },
  ];

  const formAreas = [
    { value: 'शिवाजी नगर', label: isMarathi ? 'शिवाजी नगर' : 'Shivaji Nagar' },
    { value: 'कोथरूड', label: isMarathi ? 'कोथरूड' : 'Kothrud' },
    { value: 'शनिवार पेठ', label: isMarathi ? 'शनिवार पेठ' : 'Shaniwar Peth' },
    { value: 'विमान नगर', label: isMarathi ? 'विमान नगर' : 'Viman Nagar' },
    { value: 'हडपसर', label: isMarathi ? 'हडपसर' : 'Hadapsar' },
  ];

  const days = [
    { value: 'all', label: isMarathi ? 'सर्व दिवस (All Days)' : 'All Days' },
    { value: 'आज', label: isMarathi ? 'आज (Today)' : 'Today' },
    { value: 'उद्या', label: isMarathi ? 'उद्या (Tomorrow)' : 'Tomorrow' },
    { value: 'पुढील दिवस', label: isMarathi ? 'पुढील दिवस (Upcoming)' : 'Upcoming Day' },
  ];

  const formDays = [
    { value: 'आज', label: isMarathi ? 'आज' : 'Today' },
    { value: 'उद्या', label: isMarathi ? 'उद्या' : 'Tomorrow' },
    { value: 'पुढील दिवस', label: isMarathi ? 'पुढील दिवस' : 'Upcoming Day' },
  ];

  const statusOptions = isMarathi ? [
    { value: 'active', label: 'पुरवठा सुरू (Active Supply)', statusLabel: 'पुरवठा सुरू' },
    { value: 'scheduled', label: 'नियोजित (Scheduled)', statusLabel: 'नियोजित पुरवठा' },
    { value: 'delayed', label: 'विलंब (Delayed)', statusLabel: 'विलंब' },
    { value: 'cut', label: 'तात्पुरता बंद (Maintenance Cut)', statusLabel: 'पुरवठा बंद' },
  ] : [
    { value: 'active', label: 'Active Supply (Running now)', statusLabel: 'Active' },
    { value: 'scheduled', label: 'Scheduled (Upcoming)', statusLabel: 'Scheduled' },
    { value: 'delayed', label: 'Delayed', statusLabel: 'Delayed' },
    { value: 'cut', label: 'Maintenance Cut / Disrupted', statusLabel: 'Disrupted' },
  ];

  // Open modal for new schedule
  const handleOpenCreate = () => {
    setEditingSchedule(null);
    setFormData({
      area: 'शिवाजी नगर',
      zone: isMarathi ? 'प्रभाग ४ — नवीन परिसर' : 'Ward 4 — Model Colony Sector',
      day: 'आज',
      time: isMarathi ? 'सकाळी ०६:०० ते ०८:३०' : '06:00 AM - 08:30 AM',
      duration: isMarathi ? '२ तास ३० मिनिटे' : '2h 30m',
      pressure: isMarathi ? '४.० PSI (सामान्य)' : '4.0 PSI (Normal)',
      status: 'scheduled',
      statusLabel: isMarathi ? 'नियोजित' : 'Scheduled',
      note: isMarathi ? 'पाणीपुरवठा नियमित नियोजित वेळेत राहील.' : 'Water supply will operate in the designated time slot.',
    });
    setIsModalOpen(true);
  };

  // Open modal for editing existing schedule
  const handleOpenEdit = (schedule) => {
    setEditingSchedule(schedule);
    setFormData({
      area: schedule.area || 'शिवाजी नगर',
      zone: schedule.zone || '',
      day: schedule.day || 'आज',
      time: schedule.time || '',
      duration: schedule.duration || '2 hrs',
      pressure: schedule.pressure || '4.0 PSI',
      status: schedule.status || 'scheduled',
      statusLabel: schedule.statusLabel || (isMarathi ? 'नियोजित' : 'Scheduled'),
      note: schedule.note || '',
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
    if (!formData.zone || !formData.time) {
      alert(isMarathi ? 'कृपया प्रभाग/परिसर व पुरवठा वेळ प्रविष्ट करा.' : 'Please enter zone/ward and supply timings.');
      return;
    }

    if (editingSchedule) {
      updateSchedule(editingSchedule.id, formData);
      setToast({
        type: 'success',
        title: isMarathi ? 'वेळापत्रक अद्ययावत झाले!' : 'Timetable Updated!',
        message: isMarathi 
          ? `${formData.area} (${formData.day}) चे वेळापत्रक यशस्वीरित्या सामायिक स्टेटमध्ये सेव्ह झाले.`
          : `Timetable for ${formData.area} (${formData.day}) saved in shared state. Citizens will see this immediately.`,
      });
    } else {
      createSchedule(formData);
      setToast({
        type: 'success',
        title: isMarathi ? 'नवीन वेळापत्रक जोडले!' : 'New Schedule Added!',
        message: isMarathi 
          ? `${formData.area} साठी नवीन पाणी वाटप वेळ सामायिक स्टेटमध्ये नोंदवली गेली आहे.`
          : `New water supply slot for ${formData.area} has been published.`,
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id, area) => {
    if (window.confirm(isMarathi ? `खरोखर हे वेळापत्रक (#${id}) काढून टाकायचे आहे का?` : `Are you sure you want to delete schedule #${id}?`)) {
      deleteSchedule(id);
      setToast({
        type: 'info',
        title: isMarathi ? 'वेळापत्रक हटवले!' : 'Schedule Deleted!',
        message: isMarathi ? `${area} मधील वेळापत्रक रेकॉर्ड काढून टाकले गेले आहे.` : `Schedule record for ${area} was removed.`,
      });
    }
  };

  const getAreaLabel = (area) => {
    if (isMarathi) return area;
    const map = {
      'शिवाजी नगर': 'Shivaji Nagar',
      'कोथरूड': 'Kothrud',
      'शनिवार पेठ': 'Shaniwar Peth',
      'विमान नगर': 'Viman Nagar',
      'हडपसर': 'Hadapsar',
    };
    return map[area] || area;
  };

  const getDayLabel = (d) => {
    if (isMarathi) return d;
    const map = {
      'आज': 'Today',
      'उद्या': 'Tomorrow',
      'पुढील दिवस': 'Upcoming Day',
    };
    return map[d] || d;
  };

  // Filtered schedules
  const filtered = schedules.filter((s) => {
    const matchesArea = filterArea === 'all' || s.area === filterArea;
    const matchesDay = filterDay === 'all' || s.day === filterDay;
    const matchesSearch =
      searchTerm === '' ||
      s.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.zone && s.zone.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (s.note && s.note.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesArea && matchesDay && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        backTo="/admin"
        backLabel={isMarathi ? "डॅशबोर्डवर परत जा" : "Back to Dashboard"}
        title={isMarathi ? "पाणी वेळापत्रक व्यवस्थापन" : "Water Supply Schedule Management"}
        subtitle={isMarathi 
          ? "प्रभागनिहाय दैनंदिन पाणी वाटपाच्या वेळा प्रसिद्ध, संपादित व नियंत्रित करा"
          : "Publish, edit, and control ward-wise daily water supply hours and pressure levels"}
        badge={<StatusBadge status="active" label={isMarathi ? `${schedules.length} वेळापत्रके सक्रिय` : `${schedules.length} Schedules Active`} size="sm" />}
        actions={
          <Button
            variant="navy"
            size="sm"
            onClick={handleOpenCreate}
            icon={Plus}
          >
            {isMarathi ? "नवीन वेळापत्रक जोडा" : "Add Timetable"}
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
              {isMarathi ? "दिवस फिल्टर:" : "Day Filter:"}
            </label>
            <Select
              value={filterDay}
              onChange={(e) => setFilterDay(e.target.value)}
              options={days}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-jal-slate-900 mb-1 font-devanagari">
              {isMarathi ? "शोध:" : "Search:"}
            </label>
            <Input
              icon={Search}
              placeholder={isMarathi ? "प्रभाग, रस्ता किंवा शेरा शोधा..." : "Search ward, sector or remarks..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </Card>

      {/* Schedules List */}
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((s) => (
            <Card key={s.id} className="p-4 sm:p-5 hover:border-jal-blue/40 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-jal-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-jal-border">
                      {s.id}
                    </span>
                    <span className="font-bold text-base text-jal-navy font-devanagari">
                      {getAreaLabel(s.area)}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-blue-50 text-jal-blue font-semibold font-devanagari">
                      {getDayLabel(s.day)}
                    </span>
                    <StatusBadge status={s.status} label={!isMarathi && s.status === 'scheduled' ? 'Scheduled' : !isMarathi && s.status === 'active' ? 'Active' : s.statusLabel || s.status} size="sm" />
                  </div>

                  <div className="text-sm font-semibold text-jal-slate-900 font-devanagari">
                    {s.zone || s.ward}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-jal-slate-600 flex-wrap font-devanagari">
                    <span className="flex items-center gap-1.5 font-semibold text-jal-blue">
                      <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{s.time}</span>
                    </span>
                    {s.duration && (
                      <span>{isMarathi ? 'कालावधी:' : 'Duration:'} <strong className="text-jal-slate-900">{s.duration}</strong></span>
                    )}
                    {s.pressure && (
                      <span className="flex items-center gap-1">
                        <Gauge className="w-3.5 h-3.5 text-jal-teal flex-shrink-0" />
                        <span>{isMarathi ? `दाब: ${s.pressure}` : `Pressure: ${s.pressure}`}</span>
                      </span>
                    )}
                  </div>

                  {s.note && (
                    <p className="text-xs text-jal-slate-600 font-devanagari bg-slate-50 p-2 rounded border border-jal-border/60">
                      {isMarathi ? `टीप: ${s.note}` : `Note: ${s.note}`}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 sm:self-center">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Edit3}
                    onClick={() => handleOpenEdit(s)}
                    className="text-xs"
                  >
                    {isMarathi ? "संपादन" : "Edit"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(s.id, s.area)}
                    className="text-xs text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-8 text-center text-xs text-jal-slate-600">
            {isMarathi ? "कोणतेही वेळापत्रक जुळले नाही. फिल्टर तपासा किंवा नवीन वेळापत्रक जोडा." : "No schedules matched the filter criteria. Try adjusting search or add a new schedule."}
          </Card>
        )}
      </div>

      {/* Create / Edit Schedule Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSchedule 
          ? (isMarathi ? `वेळापत्रक संपादन (#${editingSchedule.id})` : `Edit Schedule (#${editingSchedule.id})`)
          : (isMarathi ? 'नवीन पाणी वाटप वेळापत्रक जोडा' : 'Add New Water Timetable')}
        description={isMarathi 
          ? "प्रशासकीय बदलांची सामायिक स्टेटमध्ये नोंद होईल आणि Citizen दृश्यात लगेच दिसेल."
          : "Updates will save directly into shared state and appear on Citizen timetable screens."}
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
              {isMarathi ? "रद्द करा" : "Cancel"}
            </Button>
            <Button variant="primary" size="sm" icon={Save} onClick={handleSave}>
              {editingSchedule 
                ? (isMarathi ? 'बदल जतन करा' : 'Save Changes')
                : (isMarathi ? 'वेळापत्रक प्रसिद्ध करा' : 'Publish Timetable')}
            </Button>
          </div>
        }
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-jal-slate-900 mb-1 font-devanagari">
                {isMarathi ? "परिसर (Area):" : "Area:"}
              </label>
              <Select
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                options={formAreas}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-jal-slate-900 mb-1 font-devanagari">
                {isMarathi ? "दिवस (Day):" : "Day:"}
              </label>
              <Select
                value={formData.day}
                onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                options={formDays}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-jal-slate-900 mb-1 font-devanagari">
              {isMarathi ? "प्रभाग व परिसर तपशील (Zone / Ward details):" : "Zone / Ward Details:"}
            </label>
            <Input
              placeholder={isMarathi ? "उदा. प्रभाग ४ — परिसर A (मॉडेल कॉलनी)" : "e.g. Ward 4 — Model Colony Sector A"}
              value={formData.zone}
              onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-jal-slate-900 mb-1 font-devanagari">
                {isMarathi ? "पाणीपुरवठा वेळ (Supply Time):" : "Supply Hours:"}
              </label>
              <Input
                placeholder={isMarathi ? "उदा. सकाळी ६:०० ते ८:३०" : "e.g. 06:00 AM - 08:30 AM"}
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-jal-slate-900 mb-1 font-devanagari">
                {isMarathi ? "कालावधी (Duration):" : "Duration:"}
              </label>
              <Input
                placeholder={isMarathi ? "उदा. २ तास ३० मिनिटे" : "e.g. 2h 30m"}
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-jal-slate-900 mb-1 font-devanagari">
                {isMarathi ? "दाब (Water Pressure):" : "Target Water Pressure:"}
              </label>
              <Input
                placeholder={isMarathi ? "उदा. ४.२ PSI (सामान्य)" : "e.g. 4.2 PSI (Normal)"}
                value={formData.pressure}
                onChange={(e) => setFormData({ ...formData, pressure: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-jal-slate-900 mb-1 font-devanagari">
                {isMarathi ? "सद्यस्थिती (Current Status):" : "Supply Status:"}
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
              {isMarathi ? "नागरिकांसाठी सूचना / टीप:" : "Citizen Notice / Advisory Note:"}
            </label>
            <TextArea
              rows={2}
              placeholder={isMarathi ? "नागरिकांसाठी विशेष सूचना लिहा..." : "Special instructions or pressure notices for citizens..."}
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
