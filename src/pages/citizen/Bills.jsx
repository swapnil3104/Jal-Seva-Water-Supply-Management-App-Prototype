import React, { useState } from 'react';
import { 
  Receipt, 
  CreditCard, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Calendar,
  Sparkles,
  Printer,
  ShieldAlert
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Card, { CardContent, CardFooter } from '../../components/common/Card';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';
import ConfirmModal from '../../components/common/ConfirmModal';
import { usePrototype } from '../../context/PrototypeContext';
import { useLanguage } from '../../context/LanguageContext';

export default function Bills() {
  const { citizen, bills, payBill } = usePrototype();
  const { isMarathi } = useLanguage();
  const [showPayModal, setShowPayModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Active (unpaid) bill
  const activeBill = bills.find((b) => b.status === 'unpaid');
  // Past / paid bills
  const paidBills = bills.filter((b) => b.status === 'paid');

  const handleSimulatePayment = () => {
    if (!activeBill) return;
    const receiptNo = payBill(activeBill.id);
    setPaymentSuccess(true);
    setShowPayModal(false);
  };

  const openReceipt = (bill) => {
    setSelectedReceipt(bill);
    setShowReceiptModal(true);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <PageHeader
        backTo="/citizen"
        backLabel={isMarathi ? 'मुख्य पृष्ठावर जा' : 'Back to Dashboard'}
        title={isMarathi ? 'पाणीपट्टी बिल व डिजिटल पावत्या' : 'Water Utility Bills & Digital Receipts'}
        subtitle={isMarathi 
          ? 'तुमच्या नळ जोडणीचे चालू बिल तपासा व नमुना डिजिटल पावती पहा (Mock Data)'
          : 'Check active utility bill, consumption metrics, and download simulated digital receipts'}
      />

      {/* Customer Info Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3.5 bg-slate-50 border border-jal-border rounded-xl text-xs sm:text-sm">
        <div>
          <span className="text-jal-slate-600">{isMarathi ? 'ग्राहक क्रमांक:' : 'Consumer ID:'} </span>
          <span className="font-bold text-jal-navy font-mono">{citizen.demoCustomerNumber}</span>
        </div>
        <div>
          <span className="text-jal-slate-600">{isMarathi ? 'मीटर क्रमांक:' : 'Meter ID:'} </span>
          <span className="font-semibold text-jal-navy font-mono">{citizen.meterNumber}</span>
        </div>
        <div>
          <span className="text-jal-slate-600">{isMarathi ? 'जोडणी प्रकार:' : 'Connection:'} </span>
          <span className="font-semibold text-jal-slate-900 font-devanagari">
            {isMarathi ? citizen.connectionType : (citizen.connectionTypeEn || 'Domestic (15mm Metered)')}
          </span>
        </div>
      </div>

      {/* Success Notification after simulated payment */}
      {paymentSuccess && (
        <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 flex items-start justify-between gap-3 shadow-xs">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-jal-teal flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm font-devanagari">
                {isMarathi ? 'डेमो भरणा यशस्वी झाला!' : 'Demo Payment Successful!'}
              </h4>
              <p className="text-xs text-teal-800 font-devanagari mt-0.5">
                {isMarathi 
                  ? 'ऑक्टोबर २०२६ चे बिल सिमुलेटेड प्रणालीत भरले गेले असून डिजिटल पावती तयार झाली आहे.'
                  : 'October 2026 utility bill has been settled in the simulation. Digital receipt is generated.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setPaymentSuccess(false)}
            className="text-xs font-bold text-teal-700 hover:underline"
          >
            {isMarathi ? 'बंद करा' : 'Dismiss'}
          </button>
        </div>
      )}

      {/* Current Active Bill Card */}
      {activeBill ? (
        <Card className="border-jal-blue/30 shadow-card">
          <div className="bg-gradient-to-r from-jal-navy to-jal-blue text-white p-4 sm:p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Receipt className="w-5 h-5 text-jal-cyan" />
              </div>
              <div>
                <div className="text-xs text-jal-cyan font-medium">
                  {isMarathi ? `चालू मागणी बिल • ${activeBill.period}` : `Current Cycle • ${activeBill.period}`}
                </div>
                <h2 className="text-lg font-bold font-devanagari">
                  {isMarathi ? 'महानगरपालिका पाणीपट्टी मागणी' : 'Municipal Water Utility Demand Bill'}
                </h2>
              </div>
            </div>
            <StatusBadge status="under_review" label={isMarathi ? 'देय (Unpaid)' : 'Unpaid (Due)'} size="sm" />
          </div>

          <CardContent className="p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 border-b border-jal-border pb-4">
              <div>
                <span className="text-xs text-jal-slate-600 block">
                  {isMarathi ? 'एकूण देय रक्कम (Total Due):' : 'Total Amount Due:'}
                </span>
                <span className="text-3xl font-extrabold text-jal-navy font-mono">
                  ₹ {activeBill.amount}.००
                </span>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-jal-slate-600 block">
                  {isMarathi ? 'अंतिम मुदत (Due Date):' : 'Payment Due Date:'}
                </span>
                <span className="text-sm font-bold text-jal-danger flex items-center gap-1 sm:justify-end">
                  <Calendar className="w-4 h-4" />
                  {activeBill.dueDate}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-lg">
                <span className="text-jal-slate-600 block">
                  {isMarathi ? 'पाणी वापर (लिटर):' : 'Consumption (Litres):'}
                </span>
                <span className="font-bold text-jal-slate-900 font-mono">{activeBill.usageLitres}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg">
                <span className="text-jal-slate-600 block">
                  {isMarathi ? 'मागील थकबाकी:' : 'Previous Arrears:'}
                </span>
                <span className="font-bold text-jal-slate-900 font-mono">₹ {activeBill.previousDue}.००</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg col-span-2 sm:col-span-1">
                <span className="text-jal-slate-600 block">
                  {isMarathi ? 'सवलत (मुदतीत भरल्यास):' : 'Prompt Rebate:'}
                </span>
                <span className="font-bold text-jal-teal font-mono">₹ {activeBill.rebate}.००</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <Button
              variant="outline"
              size="md"
              onClick={() => openReceipt(activeBill)}
              icon={Download}
              className="w-full sm:w-auto text-xs bg-white"
            >
              {isMarathi ? 'बिल तपशील (View Bill Breakdown)' : 'View Itemized Breakdown'}
            </Button>

            <Button
              variant="primary"
              size="md"
              onClick={() => setShowPayModal(true)}
              icon={CreditCard}
              className="w-full sm:w-auto font-bold bg-jal-blue hover:bg-jal-navy"
            >
              {isMarathi ? `आत्ता भरा (Pay ₹${activeBill.amount} Demo)` : `Pay Now (Demo ₹${activeBill.amount})`}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="p-6 text-center space-y-3 bg-teal-50/50 border-teal-200">
          <div className="w-12 h-12 rounded-full bg-teal-100 text-jal-teal flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-jal-navy font-devanagari">
            {isMarathi ? 'सर्व पाणी बिले पूर्ण भरलेली आहेत!' : 'All Water Bills Are Paid in Full!'}
          </h3>
          <p className="text-xs text-jal-slate-600 max-w-sm mx-auto">
            {isMarathi 
              ? 'चालू कालावधीसाठी कोणतीही थकबाकी शिल्लक नाही. खालील यादीतून मागील पावत्या पाहू शकता.'
              : 'No pending arrears for the current billing cycle. Past transaction receipts can be reviewed below.'}
          </p>
        </Card>
      )}

      {/* Bill History */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-jal-slate-900 font-devanagari">
          {isMarathi ? 'मागील भरणा इतिहास व डिजिटल पावत्या' : 'Payment History & Receipts Archive'}
        </h3>

        {paidBills.map((item) => (
          <Card key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs sm:text-sm">
            <div className="space-y-0.5">
              <div className="font-bold text-jal-navy font-devanagari text-base">{item.period}</div>
              <div className="text-xs text-jal-slate-600 font-mono">
                {isMarathi ? 'पावती क्र:' : 'Receipt #:'} {item.receiptNumber || 'N/A'} • {isMarathi ? 'भरणा दिनांक:' : 'Paid:'} {item.paidAt || item.billDate}
              </div>
            </div>
            <div className="flex items-center gap-3 justify-between sm:justify-end">
              <div className="text-right">
                <span className="font-bold text-jal-slate-900 font-mono text-base">₹ {item.amount}.००</span>
                <div className="text-[10px] text-jal-teal font-medium">
                  {isMarathi ? 'यशस्वी भरणा' : 'Settled'}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => openReceipt(item)}
                className="text-xs bg-white"
              >
                {isMarathi ? 'पावती पहा' : 'View Receipt'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Safe Payment Disclaimer Modal */}
      <ConfirmModal
        isOpen={showPayModal}
        onClose={() => setShowPayModal(false)}
        title={isMarathi ? 'डेमो सुरक्षित भरणा (Simulated Payment)' : 'Simulated Instant Payment (Demo)'}
        subtitle={isMarathi ? 'कॉलेज प्रोजेक्ट प्रोटोटाइप प्रात्यक्षिक' : 'College prototype demo transaction'}
        confirmText={isMarathi ? 'डेमो भरणा पूर्ण करा (Simulate Success)' : 'Complete Demo Payment'}
        onConfirm={handleSimulatePayment}
        cancelText={isMarathi ? 'रद्द करा' : 'Cancel'}
        showDisclaimer
        disclaimerText={isMarathi 
          ? 'हे केवळ प्रोटोटाइप आहे. कोणतेही बँक खाते, यूपीआय पिन किंवा क्रेडिट कार्ड वापरले जाणार नाही. प्रत्यक्ष पेमेंट प्रक्रिया होत नाही.'
          : 'This is a simulation prototype. No real bank accounts, UPI pins or cards are used, and no actual transaction occurs.'}
      >
        <div className="text-center py-3 space-y-3">
          <div className="w-14 h-14 rounded-full bg-jal-pale-blue text-jal-blue flex items-center justify-center mx-auto">
            <CreditCard className="w-7 h-7" />
          </div>
          <div>
            <div className="text-xs text-jal-slate-600">
              {isMarathi ? 'पाणीपट्टी देय रक्कम:' : 'Payable Utility Amount:'}
            </div>
            <div className="text-2xl font-extrabold text-jal-navy font-mono mt-0.5">
              ₹ {activeBill?.amount || 450}.००
            </div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl text-xs text-jal-slate-600 font-devanagari text-left space-y-1 border border-jal-border">
            <div>• {isMarathi ? 'ग्राहक:' : 'Consumer:'} <strong>{isMarathi ? citizen.marathiName : citizen.englishName}</strong></div>
            <div>• {isMarathi ? 'कालावधी:' : 'Period:'} <strong>{activeBill?.period}</strong></div>
            <div>• {isMarathi ? 'देयक क्रमांक:' : 'Invoice ID:'} <strong className="font-mono">{activeBill?.billNumber}</strong></div>
          </div>
        </div>
      </ConfirmModal>

      {/* Mock Receipt Modal */}
      <ConfirmModal
        isOpen={showReceiptModal}
        onClose={() => setShowReceiptModal(false)}
        title={isMarathi ? 'नमुना पाणी बिल ई-पावती' : 'Digital Water Utility e-Receipt'}
        confirmText={isMarathi ? 'बंद करा' : 'Close'}
        onConfirm={() => setShowReceiptModal(false)}
        hideCancel
        showDisclaimer={false}
      >
        {selectedReceipt && (
          <div className="p-4 bg-slate-50 border border-jal-border rounded-xl font-mono text-xs space-y-2.5 text-jal-slate-900">
            <div className="text-center font-bold pb-2 border-b border-dashed border-slate-300">
              {isMarathi ? 'पुणे महानगरपालिका — पाणीपुरवठा विभाग' : 'Pune Municipal Corporation — Water Department'}
              <div className="text-[10px] font-normal text-slate-500">
                {isMarathi ? 'नमुना डिजिटल ई-पावती (College Prototype Sample)' : 'Official Digital e-Receipt (Simulation Model)'}
              </div>
            </div>
            <div className="flex justify-between">
              <span>{isMarathi ? 'पावती क्रमांक:' : 'Receipt Number:'}</span>
              <span className="font-bold">{selectedReceipt.receiptNumber || 'PMC-DEMO-RCP-9921'}</span>
            </div>
            <div className="flex justify-between">
              <span>{isMarathi ? 'ग्राहक क्र:' : 'Consumer ID:'}</span>
              <span>{citizen.demoCustomerNumber}</span>
            </div>
            <div className="flex justify-between">
              <span>{isMarathi ? 'ग्राहक नाव:' : 'Consumer Name:'}</span>
              <span>{isMarathi ? citizen.marathiName : citizen.englishName}</span>
            </div>
            <div className="flex justify-between">
              <span>{isMarathi ? 'कालावधी:' : 'Billing Cycle:'}</span>
              <span>{selectedReceipt.period}</span>
            </div>
            <div className="flex justify-between">
              <span>{isMarathi ? 'मीटर क्र:' : 'Meter ID:'}</span>
              <span>{citizen.meterNumber}</span>
            </div>
            <div className="flex justify-between">
              <span>{isMarathi ? 'पाणी वापर:' : 'Metered Volume:'}</span>
              <span>{selectedReceipt.usageLitres}</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t border-dashed border-slate-300 text-sm">
              <span>{isMarathi ? 'एकूण रक्कम:' : 'Total Amount Paid:'}</span>
              <span className="text-jal-navy">₹ {selectedReceipt.amount}.००</span>
            </div>
            <div className="text-[10px] text-center text-slate-400 pt-1 border-t border-dashed border-slate-300">
              ** {isMarathi ? 'नमुना प्रात्यक्षिक • कोणतीही शासकीय मान्यता नाही' : 'Simulated Prototype • College Demo Project'} **
            </div>
          </div>
        )}
      </ConfirmModal>
    </div>
  );
}
