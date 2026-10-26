import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertCircle, 
  Upload, 
  CheckCircle2, 
  MapPin, 
  ArrowRight,
  Sparkles,
  X,
  Image as ImageIcon
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Card, { CardContent, CardFooter } from '../../components/common/Card';
import FormField from '../../components/common/FormField';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import TextArea from '../../components/common/TextArea';
import Button from '../../components/common/Button';
import ConfirmModal from '../../components/common/ConfirmModal';
import { usePrototype } from '../../context/PrototypeContext';
import { useLanguage } from '../../context/LanguageContext';

export default function NewComplaint() {
  const navigate = useNavigate();
  const { citizen, createComplaint } = usePrototype();
  const { isMarathi } = useLanguage();

  const categories = isMarathi 
    ? [
        'पाणी गळती (Water Leakage)',
        'कमी दाब (Low Pressure)',
        'दूषित पाणी (Contaminated Water)',
        'पाणीपुरवठा बंद (No Water Supply)',
        'मीटर किंवा बिल तक्रार (Meter/Billing Issue)',
        'इतर समस्या (Other)',
      ]
    : [
        'Water Pipeline Leakage',
        'Low Water Pressure',
        'Contaminated / Turbid Water',
        'Complete Water Supply Cut',
        'Meter or Billing Grievance',
        'Other Utility Issue',
      ];

  const areas = isMarathi
    ? ['शिवाजी नगर', 'कोथरूड', 'शनिवार पेठ', 'विमान नगर', 'हडपसर']
    : ['Shivaji Nagar', 'Kothrud', 'Shaniwar Peth', 'Viman Nagar', 'Hadapsar'];

  const [category, setCategory] = useState(categories[0]);
  const [area, setArea] = useState(areas[0]);
  const [landmark, setLandmark] = useState('');
  const [address, setAddress] = useState(citizen.address || '');
  const [description, setDescription] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);
  
  // Validation errors
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Success modal state
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdComplaintId, setCreatedComplaintId] = useState('');

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert(isMarathi ? 'कृपया ५ MB पेक्षा लहान आकाराचा फोटो निवडा.' : 'Please select an image smaller than 5 MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoPreview(null);
  };

  const validate = () => {
    const newErrors = {};
    if (!category.trim()) newErrors.category = isMarathi ? 'कृपया तक्रारीचा प्रकार निवडा.' : 'Please select a complaint category.';
    if (!area.trim()) newErrors.area = isMarathi ? 'कृपया परिसर निवडा.' : 'Please select your ward or area.';
    if (!landmark.trim()) newErrors.landmark = isMarathi ? 'कृपया परिसरातील खूण किंवा पत्ता प्रविष्ट करा.' : 'Please enter a landmark or location.';
    if (!description.trim() || description.trim().length < 10) {
      newErrors.description = isMarathi 
        ? 'कृपया तक्रारीचे किमान १० अक्षरांचे सविस्तर वर्णन लिहा.' 
        : 'Please write a brief description of at least 10 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const newRecord = createComplaint({
        category,
        area,
        address: address || `${landmark}, ${area}, Pune`,
        landmark,
        description,
        photoUrl: photoPreview,
      });

      setCreatedComplaintId(newRecord.id);
      setShowSuccessModal(true);
    } catch (err) {
      console.error('Failed to create complaint:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <PageHeader
        backTo="/citizen"
        backLabel={isMarathi ? 'मागे जा' : 'Back to Dashboard'}
        title={isMarathi ? 'नवीन तक्रार नोंदवा' : 'Register New Water Complaint'}
        subtitle={isMarathi 
          ? 'पाणी गळती, कमी दाब किंवा अस्वच्छ पाण्याची तक्रार थेट नोंदवा (डेमो सिमुलेशन)'
          : 'Report pipeline leakage, pressure issues, or water contamination to municipal engineers'}
      />

      <Card className="shadow-card">
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 sm:space-y-5 p-5 sm:p-7">
            {/* Category Select */}
            <FormField
              id="category"
              label={isMarathi ? 'तक्रारीचा प्रकार (Category)' : 'Complaint Category'}
              required
              helperText={isMarathi ? 'योग्य प्रकार निवडल्यास दुरुस्ती पथकास कामाचे त्वरित नियोजन करता येते' : 'Accurate categorization helps dispatch the right repair equipment'}
              error={errors.category}
            >
              <Select
                id="category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  if (errors.category) setErrors((prev) => ({ ...prev, category: null }));
                }}
                options={categories}
              />
            </FormField>

            {/* Area Select */}
            <FormField
              id="area"
              label={isMarathi ? 'परिसर / प्रभाग (Area / Ward)' : 'Ward / Area'}
              required
              error={errors.area}
            >
              <Select
                id="area"
                value={area}
                onChange={(e) => {
                  setArea(e.target.value);
                  if (errors.area) setErrors((prev) => ({ ...prev, area: null }));
                }}
                options={areas}
              />
            </FormField>

            {/* Landmark & Exact Address */}
            <FormField
              id="landmark"
              label={isMarathi ? 'पत्ता / परिसरातील खूण (Landmark & Location)' : 'Location / Landmark'}
              required
              helperText={isMarathi ? 'उदा. गणपती मंदिरासमोर, साई रेसिडेन्सी, मॉडेल कॉलनी' : 'e.g. Opposite temple, Sai Residency, Model Colony road'}
              error={errors.landmark}
            >
              <Input
                id="landmark"
                placeholder={isMarathi ? 'घराचा पत्ता किंवा परिसरातील खूण लिहा' : 'House no, street name or prominent landmark'}
                value={landmark}
                onChange={(e) => {
                  setLandmark(e.target.value);
                  if (errors.landmark) setErrors((prev) => ({ ...prev, landmark: null }));
                }}
              />
            </FormField>

            {/* Description Textarea */}
            <FormField
              id="description"
              label={isMarathi ? 'तक्रारीचा सविस्तर तपशील (Details)' : 'Detailed Description'}
              required
              helperText={isMarathi ? 'समस्या कधीपासून आहे व नेमके काय घडत आहे ते नमूद करा (किमान १० अक्षरे)' : 'Mention since when the issue started and current severity (min 10 characters)'}
              error={errors.description}
            >
              <TextArea
                id="description"
                rows={4}
                placeholder={isMarathi 
                  ? 'उदा. गेल्या २ दिवसांपासून मुख्य पाईपलाईनमधून गळती होत असून रस्त्यावर पिण्याचे पाणी साचले आहे...'
                  : 'e.g. Clean drinking water has been leaking from the main pipeline since morning...'}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (errors.description) setErrors((prev) => ({ ...prev, description: null }));
                }}
              />
            </FormField>

            {/* Optional Photo Attachment Demo with Live Preview */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-jal-slate-900 mb-1.5 font-devanagari">
                {isMarathi ? 'फोटो जोडा (ऐच्छिक / Mock Photo Attachment)' : 'Attach Photo (Optional Demo)'}
              </label>

              {photoPreview ? (
                <div className="relative rounded-xl border border-jal-border p-3 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={photoPreview}
                      alt="Complaint Preview"
                      className="w-14 h-14 rounded-lg object-cover border border-slate-200"
                    />
                    <div>
                      <div className="text-xs font-bold text-jal-slate-900 font-devanagari">
                        {isMarathi ? 'फोटो जोडला गेला आहे' : 'Photo Attached'}
                      </div>
                      <div className="text-[11px] text-jal-teal font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{isMarathi ? 'अपलोड यशस्वी (नमुना)' : 'Upload Verified (Sample)'}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <label className="border-2 border-dashed border-jal-border hover:border-jal-blue rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-slate-50">
                  <Upload className="w-6 h-6 text-jal-blue mb-1" />
                  <span className="text-xs font-semibold text-jal-navy font-devanagari">
                    {isMarathi ? 'फोटो निवडण्यासाठी येथे क्लिक करा' : 'Click to upload water problem photo'}
                  </span>
                  <span className="text-[11px] text-jal-slate-600 mt-0.5">
                    {isMarathi ? 'PNG, JPG (कमाल ५ MB) • नमुना प्रात्यक्षिक' : 'PNG, JPG up to 5MB (Simulation)'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>{isMarathi ? 'महत्त्वाची सूचना:' : 'Notice:'}</strong>{' '}
                {isMarathi 
                  ? 'हे केवळ शैक्षणिक प्रोटोटाइप आहे. प्रत्यक्ष मनपा अधिकाऱ्यांना कोणतीही माहिती पाठवली जाणार नाही.'
                  : 'This is a college simulation model. No real civic complaints are filed with municipal authorities.'}
              </span>
            </div>
          </CardContent>

          <CardFooter className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <Button
              variant="ghost"
              size="md"
              type="button"
              onClick={() => navigate('/complaints')}
              className="w-full sm:w-auto"
            >
              {isMarathi ? 'रद्द करा' : 'Cancel'}
            </Button>
            <Button
              variant="primary"
              size="md"
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto font-bold bg-jal-blue hover:bg-jal-navy"
            >
              {isMarathi ? 'तक्रार सबमिट करा (Submit Demo)' : 'Submit Complaint (Demo)'}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Success Confirmation Modal */}
      <ConfirmModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          navigate(`/complaints/${createdComplaintId}`);
        }}
        title={isMarathi ? 'तक्रार यशस्वीरित्या नोंदवली गेली!' : 'Grievance Registered Successfully!'}
        subtitle={isMarathi ? 'तुमचा तक्रार संदर्भ क्रमांक तयार झाला आहे' : 'Your tracking reference number has been generated'}
        confirmText={isMarathi ? 'तक्रार स्थिती पहा (View Tracking)' : 'Track Grievance Status'}
        onConfirm={() => {
          setShowSuccessModal(false);
          navigate(`/complaints/${createdComplaintId}`);
        }}
        hideCancel
        showDisclaimer
        disclaimerText={isMarathi 
          ? 'हे केवळ शैक्षणिक प्रोटोटाइप आहे. प्रत्यक्ष महानगरपालिकेत कोणतीही तक्रार दाखल झालेली नाही.'
          : 'This is a simulated demo entry. No real government action will be taken.'}
      >
        <div className="text-center py-2 space-y-3">
          <div className="w-14 h-14 rounded-full bg-teal-50 text-jal-teal flex items-center justify-center mx-auto border border-teal-200">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <div className="text-xs text-jal-slate-600">
              {isMarathi ? 'तक्रार संदर्भ क्रमांक:' : 'Complaint Tracking ID:'}
            </div>
            <div className="text-xl font-bold text-jal-navy font-mono mt-0.5">
              #{createdComplaintId}
            </div>
          </div>
          <p className="text-xs text-jal-slate-600 max-w-xs mx-auto font-devanagari">
            {isMarathi 
              ? 'आपली तक्रार स्थानिक पाणीपुरवठा नियंत्रण कक्ष व दुरुस्ती पथकाकडे नोंदवली गेली आहे.'
              : 'Your grievance has been logged into the municipal water pipeline repair queue.'}
          </p>
        </div>
      </ConfirmModal>
    </div>
  );
}
