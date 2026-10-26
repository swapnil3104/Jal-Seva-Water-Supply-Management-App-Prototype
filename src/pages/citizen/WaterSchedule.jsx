import React, { useState } from 'react';
import { Calendar, Clock, MapPin, AlertCircle, CheckCircle2, ChevronRight, Gauge, Info } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Card, { CardContent } from '../../components/common/Card';
import StatusBadge from '../../components/common/StatusBadge';
import Select from '../../components/common/Select';
import Button from '../../components/common/Button';
import { usePrototype } from '../../context/PrototypeContext';
import { useLanguage } from '../../context/LanguageContext';

export default function WaterSchedule() {
  const { schedules, notices, citizen } = usePrototype();
  const { isMarathi, t } = useLanguage();

  const areas = isMarathi 
    ? ['शिवाजी नगर', 'कोथरूड', 'शनिवार पेठ', 'विमान नगर', 'हडपसर']
    : ['Shivaji Nagar', 'Kothrud', 'Shaniwar Peth', 'Viman Nagar', 'Hadapsar'];

  const days = isMarathi
    ? ['आज', 'उद्या', 'पुढील दिवस']
    : ['Today', 'Tomorrow', 'Next Day'];

  const [selectedAreaIndex, setSelectedAreaIndex] = useState(0);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const selectedArea = areas[selectedAreaIndex] || areas[0];
  const selectedDay = days[selectedDayIndex] || days[0];

  // Marathi area equivalents for internal mock data matching
  const marathiAreaEquivs = ['शिवाजी नगर', 'कोथरूड', 'शनिवार पेठ', 'विमान नगर', 'हडपसर'];
  const marathiDayEquivs = ['आज', 'उद्या', 'पुढील दिवस'];

  const filterArea = marathiAreaEquivs[selectedAreaIndex];
  const filterDay = marathiDayEquivs[selectedDayIndex];

  // Filter schedules based on user selection
  const filteredSchedules = schedules.filter(
    (item) => item.area === filterArea && item.day === filterDay
  );

  // Check for any maintenance notices in the selected area
  const areaNotice = notices.find(
    (n) => n.area.includes(filterArea) || n.area.includes('संपूर्ण') || n.area.toLowerCase().includes('all')
  );

  return (
    <div className="space-y-6">
      <PageHeader
        backTo="/citizen"
        backLabel={isMarathi ? 'मुख्य पृष्ठावर जा' : 'Back to Dashboard'}
        title={isMarathi ? 'पाणीपुरवठा वेळापत्रक' : 'Water Supply Timetable'}
        subtitle={isMarathi 
          ? 'तुमच्या परिसरातील दैनंदिन पाणी वाटपाची नियोजित वेळ व थेट स्थिती पहा (नमुना माहिती)' 
          : 'Check daily scheduled water distribution timings, pressure levels, and live status'}
        badge={<StatusBadge status="active" label={isMarathi ? 'वेळापत्रक अद्ययावत (Live)' : 'Schedule Live (Mock)'} size="sm" />}
      />

      {/* Area & Day Selector Bar */}
      <Card className="p-4 sm:p-5 bg-white shadow-card">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-jal-slate-900 mb-1.5 font-devanagari">
              {isMarathi ? 'परिसर / प्रभाग निवडा:' : 'Select Ward / Area:'}
            </label>
            <select
              value={selectedAreaIndex}
              onChange={(e) => setSelectedAreaIndex(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-input border border-jal-border text-xs sm:text-sm font-medium bg-white focus:outline-none focus:border-jal-blue"
            >
              {areas.map((a, idx) => (
                <option key={a} value={idx}>{a}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-jal-slate-900 mb-1.5 font-devanagari">
              {isMarathi ? 'दिवस निवडा:' : 'Select Day:'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {days.map((day, idx) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDayIndex(idx)}
                  className={`py-2 px-3 rounded-input text-xs font-semibold transition-all font-devanagari ${
                    selectedDayIndex === idx
                      ? 'bg-jal-blue text-white shadow-xs'
                      : 'bg-slate-50 text-jal-slate-600 hover:bg-slate-100 border border-jal-border'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Relevant Maintenance Notice (if applicable for selected area) */}
      {areaNotice && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold text-amber-900 font-devanagari">
              {isMarathi ? areaNotice.title : (areaNotice.titleEn || areaNotice.title)}:{' '}
            </span>
            <span className="text-amber-950/80 font-devanagari">
              {isMarathi ? areaNotice.message : (areaNotice.messageEn || areaNotice.message)}
            </span>
          </div>
        </div>
      )}

      {/* Schedules List */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-bold text-jal-slate-900 font-devanagari">
            {selectedArea} — {selectedDay} {isMarathi ? 'चे वेळापत्रक' : 'Water Timetable'} ({filteredSchedules.length} {isMarathi ? 'सत्रे' : 'Sessions'})
          </h2>
          <span className="text-xs text-jal-slate-600">
            {isMarathi ? 'पुणे महानगरपालिका (नमुना डेटा)' : 'Pune Municipal Corporation (Mock Telemetry)'}
          </span>
        </div>

        {filteredSchedules.length > 0 ? (
          filteredSchedules.map((item) => (
            <Card key={item.id} className="p-4 sm:p-5 hover:border-jal-blue/40 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-jal-border">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base text-jal-navy font-devanagari">
                      {isMarathi ? item.zone : (item.zoneEn || item.zone)}
                    </span>
                    <StatusBadge
                      status={item.status}
                      label={isMarathi ? item.statusLabel : (item.status === 'active' ? 'Supply Active' : 'Scheduled')}
                      size="sm"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-jal-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-jal-blue flex-shrink-0" />
                    <span>{selectedArea}</span>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-lg font-bold text-jal-blue flex items-center gap-1.5 sm:justify-end">
                    <Clock className="w-4 h-4" />
                    <span>{item.time}</span>
                  </div>
                  <div className="text-xs text-jal-slate-600">
                    {isMarathi ? `कालावधी: ${item.duration}` : `Duration: ${item.duration}`}
                  </div>
                </div>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 text-jal-slate-600 font-devanagari">
                  <Gauge className="w-3.5 h-3.5 text-jal-teal flex-shrink-0" />
                  <span>
                    {isMarathi ? 'अपेक्षित दाब:' : 'Expected Pressure:'}{' '}
                    <strong className="text-jal-slate-900">{item.pressure}</strong>
                  </span>
                </div>
                <div className="text-jal-slate-600 font-devanagari italic text-[11px]">
                  {isMarathi ? item.note : (item.noteEn || 'Regular flow maintained. Store drinking water responsibly.')}
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-jal-slate-900 text-sm font-devanagari">
                {isMarathi ? 'या दिवसासाठी कोणतेही वेळापत्रक उपलब्ध नाही' : 'No water schedule scheduled for this day'}
              </h3>
              <p className="text-xs text-jal-slate-600 mt-1 max-w-sm mx-auto">
                {isMarathi 
                  ? `निवडलेल्या ${selectedArea} परिसरासाठी ${selectedDay}चे वेळापत्रक अद्याप निश्चित झालेले नाही किंवा नियोजित शटडाऊन असू शकते.`
                  : `Schedule for ${selectedArea} on ${selectedDay} has not been finalized yet or may be undergoing maintenance.`}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedDayIndex(0)}
            >
              {isMarathi ? 'आजचे वेळापत्रक पहा' : "View Today's Schedule"}
            </Button>
          </Card>
        )}
      </div>

      {/* Disclaimers & Advice Footer */}
      <div className="p-4 rounded-xl bg-jal-pale-blue/60 border border-jal-blue/20 text-xs text-jal-slate-900 space-y-1.5">
        <div className="flex items-center gap-1.5 font-bold text-jal-navy">
          <Info className="w-4 h-4 text-jal-blue flex-shrink-0" />
          <span>{isMarathi ? 'पाणी बचतीचा संदेश व मार्गदर्शक तत्त्वे:' : 'Water Conservation Guidelines & Best Practices:'}</span>
        </div>
        <p className="text-[11px] text-jal-slate-600 font-devanagari leading-relaxed">
          {isMarathi ? (
            <>
              • पुरवठा सुरू होण्यापूर्वी घरातील मुख्य साठवण टाक्या स्वच्छ ठेवाव्यात.<br />
              • हे वेळापत्रक कॉलेज प्रोजेक्ट प्रात्यक्षिकासाठी तयार केलेले नमुना मॉडेल आहे. वास्तविक परिस्थितीसाठी अधिकृत मनपा चॅनेलचा संदर्भ घ्यावा.
            </>
          ) : (
            <>
              • Please ensure overhead and underground water storage tanks are clean prior to supply hours.<br />
              • This timetable is a simulated prototype model built for college project demonstration. For actual city emergencies, refer to official municipal channels.
            </>
          )}
        </p>
      </div>
    </div>
  );
}
