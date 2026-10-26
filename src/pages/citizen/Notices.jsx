import React, { useState } from 'react';
import { Bell, Wrench, AlertTriangle, CheckCircle, Info, Calendar, MapPin, Filter } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Card, { CardContent } from '../../components/common/Card';
import StatusBadge from '../../components/common/StatusBadge';
import Select from '../../components/common/Select';
import { usePrototype } from '../../context/PrototypeContext';
import { useLanguage } from '../../context/LanguageContext';

export default function Notices() {
  const { notices } = usePrototype();
  const { isMarathi } = useLanguage();
  const [filterArea, setFilterArea] = useState('all');

  const tabs = isMarathi
    ? [
        { id: 'all', label: 'सर्व परिसर' },
        { id: 'शिवाजी नगर', label: 'शिवाजी नगर' },
        { id: 'कोथरूड', label: 'कोथरूड' },
        { id: 'संपूर्ण पुणे शहर', label: 'शहरव्यापी' },
      ]
    : [
        { id: 'all', label: 'All Wards' },
        { id: 'शिवाजी नगर', label: 'Shivaji Nagar' },
        { id: 'कोथरूड', label: 'Kothrud' },
        { id: 'संपूर्ण पुणे शहर', label: 'City-wide' },
      ];

  const filteredNotices = notices.filter((n) => {
    if (filterArea === 'all') return true;
    return n.area.includes(filterArea) || n.area.includes('संपूर्ण') || n.area.toLowerCase().includes('all');
  });

  return (
    <div className="space-y-6">
      <PageHeader
        backTo="/citizen"
        backLabel={isMarathi ? 'मुख्य पृष्ठावर जा' : 'Back to Dashboard'}
        title={isMarathi ? 'पाणीपुरवठा अधिकृत सूचना फलक' : 'Official Water Supply & Outage Notices'}
        subtitle={isMarathi 
          ? 'दुरुस्ती, नियोजित शटडाऊन व महत्त्वाच्या शासकीय सूचना (नमुना माहिती)'
          : 'Announcements on pipeline repairs, scheduled shutdowns, and municipal guidelines'}
        badge={
          <StatusBadge 
            status="active" 
            label={isMarathi ? `${filteredNotices.length} सूचना उपलब्ध` : `${filteredNotices.length} Notices Active`} 
            size="sm" 
          />
        }
      />

      {/* Filter by Area Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="font-semibold text-jal-slate-600 flex items-center gap-1 pl-1">
          <Filter className="w-3.5 h-3.5" /> {isMarathi ? 'परिसर:' : 'Ward:'}
        </span>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterArea(tab.id)}
            className={`px-3 py-1.5 rounded-full font-medium transition-all whitespace-nowrap font-devanagari ${
              filterArea === tab.id
                ? 'bg-jal-navy text-white shadow-2xs font-bold'
                : 'bg-white text-jal-slate-600 hover:bg-slate-100 border border-jal-border'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredNotices.map((notice) => {
          const isHigh = notice.priority === 'high';

          return (
            <Card key={notice.id} className="p-4 sm:p-5 hover:border-jal-blue/40 transition-colors">
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isHigh ? 'bg-amber-100 text-amber-800' : 'bg-jal-pale-blue text-jal-blue'
                  }`}
                >
                  {isHigh ? <Wrench className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h3 className="text-base font-bold text-jal-slate-900 font-devanagari">
                      {isMarathi ? notice.title : (notice.titleEn || notice.title)}
                    </h3>
                    <StatusBadge
                      status={notice.status}
                      label={isMarathi ? notice.statusLabel : (notice.status === 'active' ? 'Active' : 'Scheduled')}
                      size="sm"
                    />
                  </div>

                  <p className="text-xs sm:text-sm text-jal-slate-900 leading-relaxed font-devanagari">
                    {isMarathi ? notice.message : (notice.messageEn || notice.message)}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-jal-slate-600 flex-wrap pt-1 border-t border-jal-border/60 font-devanagari">
                    <span className="flex items-center gap-1 font-medium text-jal-navy">
                      <MapPin className="w-3.5 h-3.5 text-jal-blue" />
                      <span>{notice.area}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{notice.date}</span>
                    </span>
                    {notice.time && (
                      <>
                        <span>•</span>
                        <span>{notice.time}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
