import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Plus, ChevronRight, MapPin, Calendar, Clock, Filter, AlertCircle, CheckCircle2 } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';
import { usePrototype } from '../../context/PrototypeContext';
import { useLanguage } from '../../context/LanguageContext';

export default function MyComplaints() {
  const navigate = useNavigate();
  const { complaints } = usePrototype();
  const { isMarathi } = useLanguage();
  const [filter, setFilter] = useState('all');

  // Filter complaints based on status
  const filteredComplaints = complaints.filter((c) => {
    if (filter === 'all') return true;
    if (filter === 'in_progress') return c.status === 'in_progress' || c.status === 'under_review';
    return c.status === filter;
  });

  // Calculate dynamic counts
  const allCount = complaints.length;
  const inProgressCount = complaints.filter(
    (c) => c.status === 'in_progress' || c.status === 'under_review'
  ).length;
  const submittedCount = complaints.filter((c) => c.status === 'submitted').length;
  const resolvedCount = complaints.filter((c) => c.status === 'resolved').length;

  const tabs = isMarathi
    ? [
        { id: 'all', label: `सर्व तक्रारी (${allCount})` },
        { id: 'in_progress', label: `प्रगतीत (${inProgressCount})` },
        { id: 'submitted', label: `नवीन दाखल (${submittedCount})` },
        { id: 'resolved', label: `निकाली (${resolvedCount})` },
      ]
    : [
        { id: 'all', label: `All Complaints (${allCount})` },
        { id: 'in_progress', label: `In Progress (${inProgressCount})` },
        { id: 'submitted', label: `Submitted (${submittedCount})` },
        { id: 'resolved', label: `Resolved (${resolvedCount})` },
      ];

  return (
    <div className="space-y-6">
      <PageHeader
        backTo="/citizen"
        backLabel={isMarathi ? 'मुख्य पृष्ठावर जा' : 'Back to Dashboard'}
        title={isMarathi ? 'माझ्या तक्रारी (My Complaints)' : 'My Water Grievances & Complaints'}
        subtitle={isMarathi 
          ? 'तुम्ही नोंदवलेल्या सर्व तक्रारींचा इतिहास व सद्यस्थितीचा पाठपुरावा करा'
          : 'Track resolution progress, municipal engineer notes, and complaint timelines'}
        actions={
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/complaints/new')}
            icon={Plus}
            className="bg-jal-blue hover:bg-jal-navy"
          >
            {isMarathi ? 'नवीन तक्रार नोंदवा' : 'Register Grievance'}
          </Button>
        }
      />

      {/* Filter Tabs with dynamic counts */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-3.5 py-1.5 rounded-full font-medium transition-all whitespace-nowrap font-devanagari ${
              filter === tab.id
                ? 'bg-jal-navy text-white shadow-2xs font-bold'
                : 'bg-white text-jal-slate-600 hover:bg-slate-100 border border-jal-border'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Complaints List */}
      <div className="space-y-3.5">
        {filteredComplaints.length > 0 ? (
          filteredComplaints.map((item) => (
            <Card
              key={item.id}
              hoverable
              onClick={() => navigate(`/complaints/${item.id}`)}
              className="p-4 sm:p-5 hover:border-jal-blue/50 transition-all group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold font-mono text-jal-blue bg-jal-pale-blue px-2 py-0.5 rounded-md">
                      #{item.id}
                    </span>
                    <span className="text-base font-bold text-jal-slate-900 font-devanagari">
                      {isMarathi ? item.category : (item.categoryEn || item.category)}
                    </span>
                    <StatusBadge
                      status={item.status}
                      label={isMarathi ? item.statusLabel : (item.status === 'resolved' ? 'Resolved' : item.status === 'in_progress' ? 'In Progress' : 'Submitted')}
                      size="sm"
                    />
                  </div>

                  <p className="text-xs sm:text-sm text-jal-slate-600 line-clamp-2 font-devanagari">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-jal-slate-600 flex-wrap pt-1 font-devanagari">
                    <span className="flex items-center gap-1 font-medium text-jal-navy">
                      <MapPin className="w-3.5 h-3.5 text-jal-blue flex-shrink-0" />
                      <span>{item.landmark ? `${item.landmark}, ` : ''}{item.area}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{item.date}</span>
                    </span>
                    {item.adminNote && (
                      <span className="text-[11px] text-jal-teal font-medium hidden sm:inline-block">
                        • {isMarathi ? 'प्रशासकीय शेरा उपलब्ध' : 'Engineer Note Attached'}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <span className="text-xs font-semibold text-jal-blue group-hover:translate-x-0.5 transition-transform">
                    {isMarathi ? 'तपशील पहा' : 'View Ticket'}
                  </span>
                  <ChevronRight className="w-4 h-4 text-jal-blue group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-8 sm:p-12 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <FileText className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-bold text-jal-slate-900 text-base font-devanagari">
                {filter === 'all'
                  ? (isMarathi ? 'कोणतीही तक्रार नोंदवलेली नाही' : 'No grievances reported yet')
                  : (isMarathi ? 'या फिल्टर अंतर्गत तक्रारी सापडल्या नाहीत' : 'No complaints found under this filter')}
              </h3>
              <p className="text-xs sm:text-sm text-jal-slate-600 mt-1 max-w-sm mx-auto">
                {isMarathi 
                  ? 'पाणी गळती, कमी दाब किंवा दूषित पाण्याबाबत अडचण असल्यास आपण थेट नवीन तक्रार नोंदवू शकता.'
                  : 'Report leakages, low pipeline pressure, or contaminated water directly to municipal engineers.'}
              </p>
            </div>
            <div className="pt-2 flex items-center justify-center gap-3">
              {filter !== 'all' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFilter('all')}
                >
                  {isMarathi ? 'सर्व तक्रारी पहा' : 'View All'}
                </Button>
              )}
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/complaints/new')}
                icon={Plus}
                className="bg-jal-blue hover:bg-jal-navy"
              >
                {isMarathi ? 'नवीन तक्रार नोंदवा' : 'Register Grievance'}
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
