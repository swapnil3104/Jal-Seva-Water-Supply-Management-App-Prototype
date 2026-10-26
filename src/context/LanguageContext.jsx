import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  mr: {
    // Brand & Common
    appName: 'जल सेवा',
    appSubtitle: 'पिण्याच्या पाण्याचा पुरवठा व्यवस्थापन ॲप',
    appTagline: 'स्मार्ट • सोपी • पारदर्शक पाणीपुरवठा सेवा',
    subBrand: 'महापालिका व स्थानिक पाणीपुरवठा विभाग',
    cityPune: 'पुणे',
    area: 'परिसर',
    ward: 'प्रभाग',
    demoNotice: 'प्रोटोटाइप — नमुना माहिती',
    demoActive: 'डेमो सक्रिय',
    prototypeDisclaimer: 'महाविद्यालयीन सादरीकरणासाठी तयार केलेला सिम्युलेटेड प्रोटोटाइप',
    mockDataNote: 'कॉलेज प्रात्यक्षिक • केवळ नमुना माहिती',
    
    // Navigation
    navHome: 'मुख्य पृष्ठ',
    navSchedule: 'वेळापत्रक',
    navComplaints: 'तक्रारी',
    navBills: 'पाणीपट्टी बिल',
    navTanker: 'टँकर मागणी',
    navNotices: 'सूचना',
    navProfile: 'प्रोफाइल',
    navAdminDemo: 'प्रशासकीय कक्ष (Admin Demo)',
    navCitizenPortal: 'नागरिक पोर्टल',
    navBack: 'मागे जा',

    // Buttons & Actions
    btnContinueCitizen: 'नागरिक म्हणून पुढे जा',
    btnAdminDemo: 'प्रशासकीय कक्ष (Admin Demo)',
    btnViewDetails: 'तपशील पहा',
    btnSubmitComplaint: 'तक्रार सबमिट करा',
    btnNewComplaint: 'नवीन तक्रार नोंदवा',
    btnCheckSchedule: 'वेळापत्रक तपासा',
    btnFullSchedule: 'संपूर्ण वेळापत्रक',
    btnPayNow: 'आत्ता भरा (Pay ₹४५०)',
    btnDownloadPdf: 'बिल डाउनलोड (PDF नमुना)',
    btnRequestTanker: 'टँकर विनंती नोंदवा',
    btnCancel: 'रद्द करा',
    btnUnderstood: 'समजले (Close)',
    btnSave: 'बदल जतन करा',
    btnUpdateStatus: 'स्थिती बदला',
    btnDispatchTanker: 'टँकर वाटप करा',
    btnSetReminder: 'स्मरणपत्र सेट करा',
    btnViewAll: 'सर्व पहा',
    btnLogout: 'बाहेर पडा',

    // Statuses
    statusActive: 'पुरवठा सुरू',
    statusScheduled: 'नियोजित',
    statusInProgress: 'प्रगतीत',
    statusResolved: 'निकाली',
    statusDelayed: 'विलंब',
    statusDisrupted: 'पुरवठा बंद',
    statusSubmitted: 'नवीन दाखल',
    statusUnderReview: 'तपासणी सुरू',

    // Citizen Dashboard
    greetingCitizen: 'नमस्कार, राहुल पाटील',
    citizenWardInfo: 'प्रभाग क्रमांक ४ • शिवाजी नगर, पुणे (डेमो खाते)',
    serviceScheduleDesc: 'तुमच्या परिसरातील पाणीपुरवठा वेळ पहा',
    serviceComplaintDesc: 'गळती, कमी दाब किंवा दूषित पाणी तक्रार',
    serviceBillDesc: 'नमुना पाणीपट्टी बिल व डिजिटल पावती',
    serviceTankerDesc: 'अतितातडीच्या गरजेसाठी पाणी टँकर मागणी',
    servicesTitle: 'प्रमुख नागरिक सेवा',
    servicesCount: '४ सेवा उपलब्ध',
    todaySupply: 'आजचा पाणीपुरवठा',
    todaySupplyTiming: 'सकाळी ६:०० ते ८:३० (शिवाजी नगर परिसर) • नियमित दाब',
    recentComplaintStatus: 'अलीकडील तक्रार स्थिती',
    recentNotice: 'महत्त्वाची सूचना (नमुना)',

    // Admin
    adminDashboardTitle: 'प्रशासन डॅशबोर्ड',
    adminDashboardSubtitle: 'नागरी तक्रार निवारण, दैनंदिन पाणी वाटप व टँकर व्यवस्थापन केंद्र',
    adminComplaintsTitle: 'नागरी तक्रार निवारण कक्ष',
    adminTankerTitle: 'पाणी टँकर मागणी व्यवस्थापन',
    adminScheduleTitle: 'पाणी वेळापत्रक व्यवस्थापन',
    adminNoticesTitle: 'शासकीय सूचना व्यवस्थापन',
    kpiNewComplaints: 'नवीन तक्रारी',
    kpiInProgress: 'प्रगतीत कामे',
    kpiResolved: 'निकाली तक्रारी',
    kpiTankerRequests: 'टँकर विनंत्या',

    // Page Titles & Sections
    backToHome: 'मुख्य पृष्ठावर जा',
    scheduleTitle: 'पाणीपुरवठा वेळापत्रक',
    scheduleSubtitle: 'तुमच्या परिसरातील दैनंदिन पाणी वाटपाची नियोजित वेळ व थेट स्थिती पहा (नमुना माहिती)',
    selectArea: 'परिसर / प्रभाग निवडा',
    selectDay: 'दिवस निवडा',
    today: 'आज',
    tomorrow: 'उद्या',
    nextDay: 'पुढील दिवस',
    expectedPressure: 'अपेक्षित दाब',
    duration: 'कालावधी',
    noSchedule: 'या दिवसासाठी कोणतेही वेळापत्रक उपलब्ध नाही',
    waterSavingAdvice: 'पाणी बचतीचा संदेश व मार्गदर्शक तत्त्वे:',
    tankerTitle: 'पाणी टँकर मागणी (Emergency Tanker Request)',
    tankerSubtitle: 'अतितातडीच्या गरजेसाठी महानगरपालिकेच्या अधिकृत पाणी टँकरची नोंदणी करा (डेमो)',
    billsTitle: 'पाणीपट्टी बिल व डिजिटल पावत्या',
    billsSubtitle: 'तुमच्या नळ जोडणीचे चालू बिल तपासा व नमुना डिजिटल पावती पहा (Mock Data)',
    myComplaintsTitle: 'माझ्या तक्रारी (My Complaints)',
    myComplaintsSubtitle: 'तुम्ही नोंदवलेल्या सर्व तक्रारींचा इतिहास व सद्यस्थितीचा पाठपुरावा करा',
    noticesTitle: 'नागरी सूचना व पाणी कपात',
    noticesSubtitle: 'पाईपलाईन दुरुस्ती, देखभाल व पाणी कपातीच्या अधिकृत सूचना',
    profileTitle: 'नागरिक प्रोफाइल व पाणी मीटर तपशील',
    profileSubtitle: 'तुमच्या अधिकृत नळ जोडणीची माहिती व खाते तपशील पहा',

    // Language
    langSwitchLabel: 'मराठी',
    langEnglish: 'English',
    langMarathi: 'मराठी',
  },
  en: {
    // Brand & Common
    appName: 'Jal Seva',
    appSubtitle: 'Drinking Water Supply Management App',
    appTagline: 'Smart • Simple • Transparent Water Supply Service',
    subBrand: 'Municipal Water Supply Department',
    cityPune: 'Pune',
    area: 'Area',
    ward: 'Ward',
    demoNotice: 'Prototype — Sample Data',
    demoActive: 'Demo Active',
    prototypeDisclaimer: 'Simulated prototype built for college demonstration',
    mockDataNote: 'College Demo • Mock Data Only',
    
    // Navigation
    navHome: 'Home',
    navSchedule: 'Schedule',
    navComplaints: 'Complaints',
    navBills: 'Bills & Payments',
    navTanker: 'Tanker Request',
    navNotices: 'Notices',
    navProfile: 'Profile',
    navAdminDemo: 'Admin Demo Room',
    navCitizenPortal: 'Citizen Portal',
    navBack: 'Back',

    // Buttons & Actions
    btnContinueCitizen: 'Continue as Citizen',
    btnAdminDemo: 'Admin Demo Portal',
    btnViewDetails: 'View Details',
    btnSubmitComplaint: 'Submit Complaint',
    btnNewComplaint: 'Register New Complaint',
    btnCheckSchedule: 'Check Schedule',
    btnFullSchedule: 'Full Schedule',
    btnPayNow: 'Pay Now (Demo ₹450)',
    btnDownloadPdf: 'Download Bill (Sample PDF)',
    btnRequestTanker: 'Request Tanker (Demo)',
    btnCancel: 'Cancel',
    btnUnderstood: 'Understood (Close)',
    btnSave: 'Save Changes',
    btnUpdateStatus: 'Update Status',
    btnDispatchTanker: 'Dispatch Tanker',
    btnSetReminder: 'Set Reminder',
    btnViewAll: 'View All',
    btnLogout: 'Logout / Exit',

    // Statuses
    statusActive: 'Supply Active',
    statusScheduled: 'Scheduled',
    statusInProgress: 'In Progress',
    statusResolved: 'Resolved',
    statusDelayed: 'Delayed',
    statusDisrupted: 'Disrupted',
    statusSubmitted: 'Submitted',
    statusUnderReview: 'Under Review',

    // Citizen Dashboard
    greetingCitizen: 'Welcome, Rahul Patil',
    citizenWardInfo: 'Ward No. 4 • Shivaji Nagar, Pune (Demo Account)',
    serviceScheduleDesc: 'Check daily water supply timings in your area',
    serviceComplaintDesc: 'Report leakage, low pressure, or contaminated water',
    serviceBillDesc: 'Sample water utility bill & digital receipt',
    serviceTankerDesc: 'Emergency drinking water tanker on-demand',
    servicesTitle: 'Citizen Services',
    servicesCount: '4 Services Available',
    todaySupply: "Today's Water Supply",
    todaySupplyTiming: '6:00 AM – 8:30 AM (Shivaji Nagar Area) • Normal Pressure',
    recentComplaintStatus: 'Recent Complaint Status',
    recentNotice: 'Important Notice (Sample)',

    // Admin
    adminDashboardTitle: 'Admin Dashboard',
    adminDashboardSubtitle: 'Citizen grievance redressal, water distribution & tanker management',
    adminComplaintsTitle: 'Citizen Grievance Redressal',
    adminTankerTitle: 'Water Tanker Fleet Management',
    adminScheduleTitle: 'Water Schedule Management',
    adminNoticesTitle: 'Public Notices Management',
    kpiNewComplaints: 'New Complaints',
    kpiInProgress: 'In Progress',
    kpiResolved: 'Resolved Complaints',
    kpiTankerRequests: 'Tanker Requests',

    // Page Titles & Sections
    backToHome: 'Go to Dashboard',
    scheduleTitle: 'Water Supply Timetable',
    scheduleSubtitle: 'Check daily water distribution schedule and real-time status in your ward (Sample Data)',
    selectArea: 'Select Ward / Area',
    selectDay: 'Select Day',
    today: 'Today',
    tomorrow: 'Tomorrow',
    nextDay: 'Next Day',
    expectedPressure: 'Expected Pressure',
    duration: 'Duration',
    noSchedule: 'No schedule available for this day',
    waterSavingAdvice: 'Water Conservation Guidelines & Best Practices:',
    tankerTitle: 'Emergency Drinking Water Tanker Request',
    tankerSubtitle: 'Book an official municipal drinking water tanker for emergencies (Demo)',
    billsTitle: 'Water Utility Bills & Digital Receipts',
    billsSubtitle: 'Check current billing cycle, consumption, and sample digital receipts (Mock Data)',
    myComplaintsTitle: 'My Complaints & Grievances',
    myComplaintsSubtitle: 'Track all registered complaints and real-time resolution timeline',
    noticesTitle: 'Public Notices & Water Outages',
    noticesSubtitle: 'Official announcements on pipeline repairs, maintenance, and water shutdowns',
    profileTitle: 'Consumer Profile & Meter Details',
    profileSubtitle: 'View your municipal water connection details and account settings',

    // Language
    langSwitchLabel: 'English',
    langEnglish: 'English',
    langMarathi: 'मराठी',
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('jal_seva_lang') || 'en';
  });


  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === 'mr' ? 'en' : 'mr';
      localStorage.setItem('jal_seva_lang', next);
      return next;
    });
  };

  const setSpecificLanguage = (lang) => {
    if (lang === 'mr' || lang === 'en') {
      setLanguage(lang);
      localStorage.setItem('jal_seva_lang', lang);
    }
  };

  const t = (key, fallback = '') => {
    const dict = translations[language] || translations.mr;
    return dict[key] || fallback || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage,
        setLanguage: setSpecificLanguage,
        t,
        isMarathi: language === 'mr',
        isEnglish: language === 'en',
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
