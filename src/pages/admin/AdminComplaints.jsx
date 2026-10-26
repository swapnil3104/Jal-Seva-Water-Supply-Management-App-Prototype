import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronRight, MapPin, Calendar, CheckCircle2, FileText } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import StatusBadge from '../../components/common/StatusBadge';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Button from '../../components/common/Button';
import { usePrototype } from '../../context/PrototypeContext';
import { useLanguage } from '../../context/LanguageContext';

export default function AdminComplaints() {
  const navigate = useNavigate();
  const { complaints } = usePrototype();
  const { isMarathi } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = complaints.filter((c) => {
    const matchesSearch =
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filterOptions = isMarathi
    ? [
        { value: 'all', label: 'सर्व स्थिती (All Status)' },
        { value: 'submitted', label: 'नवीन दाखल (Submitted)' },
        { value: 'under_review', label: 'तपासणी सुरू (Review)' },
        { value: 'in_progress', label: 'प्रगतीत (In Progress)' },
        { value: 'resolved', label: 'निकाली (Resolved)' },
      ]
    : [
        { value: 'all', label: 'All Status' },
        { value: 'submitted', label: 'New / Submitted' },
        { value: 'under_review', label: 'Under Review' },
        { value: 'in_progress', label: 'In Progress' },
        { value: 'resolved', label: 'Resolved' },
      ];

  return (
    <div className="space-y-6">
      <PageHeader
        backTo="/admin"
        backLabel={isMarathi ? 'डॅशबोर्डवर परत जा' : 'Back to Admin'}
        title={isMarathi ? 'नागरी तक्रार निवारण कक्ष' : 'Citizen Grievance Redressal Queue'}
        subtitle={isMarathi 
          ? 'प्राप्त झालेल्या सर्व तक्रारींची यादी, सद्यस्थिती आणि निवारण प्रक्रिया'
          : 'Live citizen grievance tickets, engineer status updates, and dispatch history'}
        badge={
          <StatusBadge 
            status="active" 
            label={isMarathi ? `${complaints.length} तक्रारी नोंदणीकृत` : `${complaints.length} Tickets Registered`} 
            size="sm" 
          />
        }
      />

      {/* Filter and Search Bar */}
      <Card className="p-4 sm:p-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <Input
              icon={Search}
              placeholder={isMarathi ? 'आयडी, परिसर किंवा तक्रारीचा प्रकार शोधा...' : 'Search by ticket ID, area, or keyword...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={filterOptions}
            />
          </div>
        </div>
      </Card>

      {/* Complaints List / Table */}
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <Card
              key={item.id}
              hoverable
              onClick={() => navigate(`/admin/complaints/${item.id}`)}
              className="p-4 sm:p-5 hover:border-jal-blue/40 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-bold text-sm text-jal-navy font-mono">#{item.id}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-jal-slate-900 border border-jal-border font-devanagari">
                      {isMarathi ? item.category : (item.categoryEn || item.category)}
                    </span>
                    <StatusBadge 
                      status={item.status} 
                      label={isMarathi ? item.statusLabel : (item.status === 'resolved' ? 'Resolved' : item.status === 'in_progress' ? 'In Progress' : 'Submitted')} 
                      size="sm" 
                    />
                  </div>

                  <p className="text-sm font-semibold text-jal-slate-900 font-devanagari line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-jal-slate-600 flex-wrap font-devanagari">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-jal-blue flex-shrink-0" />
                      <span>{item.address || item.area}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span>{item.date}</span>
                    </span>
                    {item.adminNote && (
                      <span className="text-jal-teal font-medium">
                        • {isMarathi ? `शेरा: ${item.adminNote.slice(0, 45)}...` : `Note: ${item.adminNote.slice(0, 45)}...`}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:self-center">
                  <Button variant="outline" size="sm" className="text-xs bg-white">
                    {isMarathi ? 'स्थिती बदला' : 'Manage'}
                  </Button>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-8 text-center text-xs text-jal-slate-600">
            {isMarathi ? 'कोणतीही तक्रार सापडली नाही.' : 'No complaints found matching this criteria.'}
          </Card>
        )}
      </div>
    </div>
  );
}
