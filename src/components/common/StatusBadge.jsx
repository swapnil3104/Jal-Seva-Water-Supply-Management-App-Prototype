import React from 'react';
import { 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  Activity, 
  HelpCircle,
  AlertTriangle,
  RotateCw
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

/**
 * Jal Seva Status Badge
 * Never relies on color alone — pairs consistent icons, distinct background/border, and clear bilingual text.
 */
export default function StatusBadge({ 
  status, 
  label, 
  size = 'md',
  className = '',
  showIcon = true 
}) {
  const { isMarathi } = useLanguage();
  const normStatus = (status || '').toLowerCase().trim();

  // Color mapping based on standard Jal Seva status tokens
  let style = 'bg-blue-50 text-jal-blue border-blue-200';
  let Icon = Clock;
  let defaultLabel = isMarathi ? 'नियोजित' : 'Scheduled';


  if (
    normStatus === 'scheduled' || 
    normStatus === 'submitted' || 
    normStatus === 'नियोजित' || 
    normStatus === 'नोंदवली' ||
    normStatus === 'तक्रार दाखल'
  ) {
    style = 'bg-sky-50 text-jal-blue border-sky-200';
    Icon = Clock;
    defaultLabel = label || 'नियोजित';
  } else if (
    normStatus === 'under_review' || 
    normStatus === 'pending' || 
    normStatus === 'delayed' || 
    normStatus === 'विलंब' || 
    normStatus === 'प्रलंबित' ||
    normStatus === 'पुनरावलोकन'
  ) {
    style = 'bg-amber-50 text-amber-800 border-amber-200';
    Icon = AlertTriangle;
    defaultLabel = label || (isMarathi ? 'प्रलंबित' : 'Pending');
  } else if (
    normStatus === 'in_progress' || 
    normStatus === 'प्रगतीत' || 
    normStatus === 'काम सुरू' ||
    normStatus === 'सक्रिय'
  ) {
    style = 'bg-cyan-50 text-cyan-800 border-cyan-200';
    Icon = RotateCw;
    defaultLabel = label || (isMarathi ? 'प्रगतीत' : 'In Progress');
  } else if (
    normStatus === 'resolved' || 
    normStatus === 'active' || 
    normStatus === 'completed' || 
    normStatus === 'पूर्ण' || 
    normStatus === 'निकाली' || 
    normStatus === 'यशस्वी' ||
    normStatus === 'पुरवठा सुरू'
  ) {
    style = 'bg-teal-50 text-teal-800 border-teal-200';
    Icon = CheckCircle2;
    defaultLabel = label || (isMarathi ? 'पूर्ण' : 'Resolved');
  } else if (
    normStatus === 'disrupted' || 
    normStatus === 'rejected' || 
    normStatus === 'stopped' || 
    normStatus === 'पुरवठा बंद' || 
    normStatus === 'रद्द' ||
    normStatus === 'नाकारली'
  ) {
    style = 'bg-rose-50 text-rose-800 border-rose-200';
    Icon = XCircle;
    defaultLabel = label || (isMarathi ? 'पुरवठा बंद' : 'Disrupted');
  }

  const displayLabel = label || defaultLabel;

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border shadow-2xs whitespace-nowrap ${sizeClasses[size] || sizeClasses.md} ${style} ${className}`}
    >
      {showIcon && <Icon className={`${iconSizes[size] || iconSizes.md} flex-shrink-0`} />}
      <span>{displayLabel}</span>
    </span>
  );
}
