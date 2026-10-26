import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Truck, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Calendar,
  MapPin,
  FileText,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Card, { CardContent, CardFooter } from '../../components/common/Card';
import FormField from '../../components/common/FormField';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import TextArea from '../../components/common/TextArea';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/common/StatusBadge';
import ConfirmModal from '../../components/common/ConfirmModal';
import { usePrototype } from '../../context/PrototypeContext';
import { useLanguage } from '../../context/LanguageContext';

export default function TankerRequest() {
  const navigate = useNavigate();
  const { citizen, tankerRequests, createTankerRequest } = usePrototype();
  const { isMarathi } = useLanguage();

  const areas = isMarathi 
    ? ['शिवाजी नगर', 'कोथरूड', 'शनिवार पेठ', 'विमान नगर', 'हडपसर']
    : ['Shivaji Nagar', 'Kothrud', 'Shaniwar Peth', 'Viman Nagar', 'Hadapsar'];

  const reasons = isMarathi
    ? [
        'पाणीपुरवठा खंडित (Water Supply Cut)',
        'पाईपलाईन गळतीमुळे तुटवडा (Shortage due to leakage)',
        'कमी दाबामुळे पाण्याची कमतरता (Low pressure shortage)',
        'सार्वजनिक / कौटुंबिक कार्यक्रम (Special Occasion)',
        'इतर तातडीचे कारण (Other emergency)',
      ]
    : [
        'Water Supply Cut / Disrupted',
        'Water Shortage Due to Pipeline Leakage',
        'Severe Low Pressure Shortage',
        'Special Occasion / Family Event',
        'Other Emergency Shortage',
      ];

  const capacities = isMarathi
    ? ['५,००० लिटर (मिनी टँकर)', '१०,००० लिटर (मानक टँकर)', '१५,००० लिटर (मोठा टँकर)']
    : ['5,000 Litres (Mini Tanker)', '10,000 Litres (Standard Tanker)', '15,000 Litres (Large Tanker)'];

  const times = isMarathi
    ? ['लवकरात लवकर (तातडीने)', 'दुपारी २:०० पूर्वी', 'सायंकाळी ५:०० नंतर', 'उद्या सकाळी']
    : ['As soon as possible (Urgent)', 'Before 2:00 PM', 'After 5:00 PM', 'Tomorrow Morning'];

  const [area, setArea] = useState(areas[0]);
  const [address, setAddress] = useState(citizen.address || '');
  const [reason, setReason] = useState(reasons[0]);
  const [capacity, setCapacity] = useState(capacities[0]);
  const [preferredTime, setPreferredTime] = useState(times[0]);
  const [notes, setNotes] = useState('');
  
  // Validation errors
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [createdRequestId, setCreatedRequestId] = useState('');

  const validate = () => {
    const errs = {};
    if (!area.trim()) errs.area = isMarathi ? 'कृपया परिसर निवडा.' : 'Please select area.';
    if (!address.trim()) errs.address = isMarathi ? 'कृपया नेमका पत्ता प्रविष्ट करा.' : 'Please enter delivery address.';
    if (!reason.trim()) errs.reason = isMarathi ? 'कृपया टँकर मागण्याचे कारण निवडा.' : 'Please select a reason.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newRequest = createTankerRequest({
      area,
      address,
      reason,
      capacity,
      preferredTime,
      notes,
    });

    setCreatedRequestId(newRequest.id);
    setShowModal(true);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <PageHeader
        backTo="/citizen"
        backLabel={isMarathi ? 'मुख्य पृष्ठावर जा' : 'Back to Dashboard'}
        title={isMarathi ? 'पाणी टँकर मागणी' : 'Emergency Water Tanker Request'}
        subtitle={isMarathi 
          ? 'अतितातडीच्या गरजेसाठी महानगरपालिकेच्या अधिकृत पाणी टँकरची नोंदणी करा (डेमो)'
          : 'Request an emergency municipal water tanker to your location (Simulation)'}
      />

      <Card className="shadow-card">
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 sm:space-y-5 p-5 sm:p-7">
            <FormField id="area" label={isMarathi ? 'परिसर निवडा' : 'Select Ward / Area'} required error={errors.area}>
              <Select
                id="area"
                value={area}
                onChange={(e) => {
                  setArea(e.target.value);
                  if (errors.area) setErrors(prev => ({ ...prev, area: null }));
                }}
                options={areas}
              />
            </FormField>

            <FormField 
              id="address" 
              label={isMarathi ? 'टँकर पोहचवण्याचा नेमका पत्ता' : 'Exact Delivery Street Address'} 
              required 
              helperText={isMarathi ? 'उदा. घर क्र. १२, साई रेसिडेन्सी, गणपती मंदिरासमोर' : 'e.g. House No. 12, Sai Residency, Opposite Temple'}
              error={errors.address}
            >
              <Input
                id="address"
                placeholder={isMarathi ? 'घर क्र., सोसायटीचे नाव, जवळची खूण' : 'House no, building name, landmark'}
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  if (errors.address) setErrors(prev => ({ ...prev, address: null }));
                }}
              />
            </FormField>

            <FormField id="reason" label={isMarathi ? 'टँकर मागण्याचे कारण' : 'Reason for Water Tanker'} required error={errors.reason}>
              <Select
                id="reason"
                value={reason}
                onChange={(e) => {
                  setReason(e.target.value);
                  if (errors.reason) setErrors(prev => ({ ...prev, reason: null }));
                }}
                options={reasons}
              />
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField id="capacity" label={isMarathi ? 'अपेक्षित क्षमता' : 'Tanker Capacity'}>
                <Select
                  id="capacity"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  options={capacities}
                />
              </FormField>

              <FormField id="time" label={isMarathi ? 'अपेक्षित वेळ' : 'Preferred Delivery Time'}>
                <Select
                  id="time"
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  options={times}
                />
              </FormField>
            </div>

            <FormField id="notes" label={isMarathi ? 'अतिरिक्त सूचना / शेरा (ऐच्छिक)' : 'Special Delivery Instructions (Optional)'}>
              <TextArea
                id="notes"
                rows={3}
                placeholder={isMarathi ? 'उदा. रस्ता अरुंद आहे, लहान टँकर पाठवावा...' : 'e.g. Narrow road, please send medium vehicle with long pipe...'}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </FormField>

            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>{isMarathi ? 'महत्त्वाची सूचना:' : 'Notice:'}</strong>{' '}
                {isMarathi 
                  ? 'हे केवळ शैक्षणिक प्रोटोटाइप आहे. प्रत्यक्ष कोणताही पाण्याचा टँकर रवाना केला जाणार नाही.'
                  : 'This is a simulation prototype for demo purposes. No physical water tanker will actually be dispatched.'}
              </span>
            </div>
          </CardContent>

          <CardFooter className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <Button
              variant="ghost"
              size="md"
              type="button"
              onClick={() => navigate('/citizen')}
              className="w-full sm:w-auto"
            >
              {isMarathi ? 'रद्द करा' : 'Cancel'}
            </Button>
            <Button
              variant="primary"
              size="md"
              type="submit"
              className="w-full sm:w-auto font-bold bg-jal-blue hover:bg-jal-navy"
            >
              {isMarathi ? 'टँकर मागणी नोंदवा (Submit Request)' : 'Submit Tanker Request (Demo)'}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Submitted Tanker Requests Tracking History */}
      <div className="space-y-3 pt-2">
        <h3 className="text-base font-bold text-jal-slate-900 font-devanagari flex items-center gap-2">
          <Truck className="w-4 h-4 text-jal-blue" />
          <span>
            {isMarathi 
              ? `नोंदवलेल्या टँकर मागण्यांची स्थिती (${tankerRequests.length})` 
              : `Registered Tanker Request History (${tankerRequests.length})`}
          </span>
        </h3>

        {tankerRequests.map((req) => (
          <Card key={req.id} className="p-4 sm:p-5 hover:border-jal-blue/40 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 pb-2 border-b border-jal-border">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-jal-blue bg-jal-pale-blue px-2 py-0.5 rounded">
                  #{req.id}
                </span>
                <span className="font-bold text-sm text-jal-navy font-devanagari">
                  {req.capacity}
                </span>
              </div>
              <StatusBadge
                status={
                  req.status === 'delivered'
                    ? 'resolved'
                    : req.status === 'dispatched'
                    ? 'active'
                    : 'under_review'
                }
                label={isMarathi ? req.statusLabel : (req.status === 'delivered' ? 'Delivered' : req.status === 'dispatched' ? 'Out for Delivery' : 'Requested')}
                size="sm"
              />
            </div>

            <div className="pt-2 text-xs text-jal-slate-600 space-y-1 font-devanagari">
              <div className="flex items-center gap-1.5 text-jal-slate-900 font-medium">
                <MapPin className="w-3.5 h-3.5 text-jal-blue flex-shrink-0" />
                <span>{req.address} ({req.area})</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-0.5">
                <span>{isMarathi ? 'कारण:' : 'Reason:'} {req.reason.split('(')[0]}</span>
                <span>•</span>
                <span>{isMarathi ? 'नोंद:' : 'Date:'} {req.date}</span>
                {req.driverName && (
                  <>
                    <span>•</span>
                    <span className="text-jal-teal font-medium">{isMarathi ? 'चालक:' : 'Driver:'} {req.driverName}</span>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Tanker Confirmation Modal */}
      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={isMarathi ? 'टँकर मागणी यशस्वीरित्या नोंदवली!' : 'Tanker Request Registered Successfully!'}
        subtitle={isMarathi ? 'तुमचा तात्पुरता संदर्भ क्रमांक तयार झाला आहे' : 'Your simulated reference ticket has been generated'}
        confirmText={isMarathi ? 'समजले (Close)' : 'Done (Close)'}
        onConfirm={() => setShowModal(false)}
        hideCancel
        showDisclaimer
        disclaimerText={isMarathi 
          ? 'हे केवळ शैक्षणिक प्रोटोटाइप आहे. प्रत्यक्ष कोणताही टँकर रवाना केला जाणार नाही किंवा कोणतेही शुल्क आकारले जाणार नाही.'
          : 'This is a college simulation model. No real tanker will be sent, and no fees are charged.'}
      >
        <div className="text-center py-2 space-y-3">
          <div className="w-14 h-14 rounded-full bg-teal-50 text-jal-teal flex items-center justify-center mx-auto border border-teal-200">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <div className="text-xs text-jal-slate-600">
              {isMarathi ? 'मागणी संदर्भ क्रमांक (Demo ID):' : 'Request Reference ID:'}
            </div>
            <div className="text-xl font-bold text-jal-navy font-mono mt-0.5">
              {createdRequestId}
            </div>
          </div>
          <p className="text-xs text-jal-slate-600 max-w-xs mx-auto font-devanagari">
            {isMarathi 
              ? 'आपली टँकर मागणी प्रशासकीय नियंत्रण कक्षाकडे नोंदवली गेली असून खालील यादीत जोडली गेली आहे.'
              : 'Your tanker booking has been synced to the municipal control dispatch queue.'}
          </p>
        </div>
      </ConfirmModal>
    </div>
  );
}
