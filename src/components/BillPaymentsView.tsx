import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Tv, 
  Smartphone, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  Receipt, 
  AlertCircle
} from 'lucide-react';
import { Currency } from '../types';
import UtilityBrandLogo from './UtilityBrandLogo';

interface BillPaymentProps {
  nairaBalance: number;
  cedisBalance: number;
  onPayBill: (currency: Currency, amount: number, category: string, serviceTitle: string) => void;
  isLightMode?: boolean;
}

interface UtilityService {
  id: string;
  category: 'airtime' | 'data' | 'power' | 'cable' | 'betting';
  name: string;
  provider: string;
  brandKey: string;
  discountCashback: string;
  country: 'NG' | 'GH' | 'BOTH';
}

const UTILITY_SERVICES: UtilityService[] = [
  // Airtime & Data
  { id: 'mtn-ng', category: 'airtime', name: 'MTN Airtime Top-Up', provider: 'MTN Nigeria', brandKey: 'mtn', discountCashback: '2% Cashback', country: 'NG' },
  { id: 'airtel-ng', category: 'airtime', name: 'Airtel Instant VTU', provider: 'Airtel Nigeria', brandKey: 'airtel', discountCashback: '2% Cashback', country: 'NG' },
  { id: 'glo-ng', category: 'airtime', name: 'Glo 4G Airtime', provider: 'Globacom', brandKey: 'glo', discountCashback: '3% Cashback', country: 'NG' },
  { id: '9mobile-ng', category: 'airtime', name: '9mobile Turbo Airtime', provider: '9mobile Nigeria', brandKey: '9mobile', discountCashback: '2% Cashback', country: 'NG' },
  { id: 'mtn-gh', category: 'airtime', name: 'MTN MoMo Airtime', provider: 'MTN Ghana', brandKey: 'mtn', discountCashback: '1.5% Cashback', country: 'GH' },
  { id: 'telecel-gh', category: 'airtime', name: 'Telecel Airtime', provider: 'Telecel Ghana', brandKey: 'telecel', discountCashback: '1.5% Cashback', country: 'GH' },
  
  // Data Bundles
  { id: 'mtn-data', category: 'data', name: 'MTN SME Data (1GB - 50GB)', provider: 'MTN Data Express', brandKey: 'mtn', discountCashback: 'Cheap Wholesale', country: 'NG' },
  { id: 'airtel-data', category: 'data', name: 'Airtel Binge Data Plans', provider: 'Airtel Nigeria', brandKey: 'airtel', discountCashback: 'Instant Activation', country: 'NG' },
  { id: 'glo-data', category: 'data', name: 'Glo Mega Data Bundles', provider: 'Globacom Nigeria', brandKey: 'glo', discountCashback: 'Extra Gigabyte', country: 'NG' },
  { id: '9mobile-data', category: 'data', name: '9mobile Blaze Data', provider: '9mobile Network', brandKey: '9mobile', discountCashback: 'Ultra Fast 4G', country: 'NG' },
  
  // Electricity
  { id: 'aedc', category: 'power', name: 'AEDC Abuja Electricity Token', provider: 'Abuja Disco', brandKey: 'aedc', discountCashback: '0% Surcharge', country: 'NG' },
  { id: 'ekedc', category: 'power', name: 'EKEDC Eko Electricity Prepaid', provider: 'Eko Disco (Lagos)', brandKey: 'ekedc', discountCashback: '0% Surcharge', country: 'NG' },
  { id: 'ibedc', category: 'power', name: 'IBEDC Ibadan Electricity', provider: 'Ibadan Disco', brandKey: 'ibedc', discountCashback: '0% Surcharge', country: 'NG' },
  { id: 'ecg-gh', category: 'power', name: 'ECG Prepaid Power Token', provider: 'ECG Ghana', brandKey: 'ecg', discountCashback: 'Instant Token', country: 'GH' },
  
  // Cable TV
  { id: 'dstv', category: 'cable', name: 'DSTV Subscription Renewal', provider: 'MultiChoice Africa', brandKey: 'dstv', discountCashback: 'Instant Reconnection', country: 'NG' },
  { id: 'gotv', category: 'cable', name: 'GOtv Monthly Package', provider: 'MultiChoice Africa', brandKey: 'gotv', discountCashback: 'Instant Reconnection', country: 'NG' },
  { id: 'startimes', category: 'cable', name: 'StarTimes Smart Bouquet', provider: 'StarTimes Media', brandKey: 'startimes', discountCashback: 'Zero Fee', country: 'NG' },
  
  // Sports Betting
  { id: 'bet9ja', category: 'betting', name: 'Bet9ja Account Top-up', provider: 'Bet9ja Nigeria', brandKey: 'bet9ja', discountCashback: 'Instant Funding', country: 'NG' },
  { id: 'sportybet', category: 'betting', name: 'SportyBet Instant Wallet', provider: 'SportyBet Africa', brandKey: 'sportybet', discountCashback: 'Fast Deposit', country: 'BOTH' },
  { id: '1xbet', category: 'betting', name: '1xBet Wallet Top-up', provider: '1xBet Africa', brandKey: '1xbet', discountCashback: 'Zero Charges', country: 'BOTH' }
];

export default function BillPaymentsView({ 
  nairaBalance, 
  cedisBalance, 
  onPayBill, 
  isLightMode = false 
}: BillPaymentProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'airtime' | 'data' | 'power' | 'cable' | 'betting'>('all');
  const [selectedService, setSelectedService] = useState<UtilityService>(UTILITY_SERVICES[0]);
  
  // Form input fields
  const [recipientNumber, setRecipientNumber] = useState<string>('08149204859');
  const [meterOrSmartCard, setMeterOrSmartCard] = useState<string>('45029381744');
  const [customerId, setCustomerId] = useState<string>('USER-77391');
  const [billAmount, setBillAmount] = useState<string>('2500');
  const [currency, setCurrency] = useState<Currency>(Currency.NGN);
  
  // State for transaction execution
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [successReceipt, setSuccessReceipt] = useState<{
    reference: string;
    token?: string;
    service: string;
    amount: number;
    currency: Currency;
    date: string;
  } | null>(null);

  const filteredServices = UTILITY_SERVICES.filter(service => {
    if (selectedCategory === 'all') return true;
    return service.category === selectedCategory;
  });

  const availableBalance = currency === Currency.NGN ? nairaBalance : cedisBalance;
  const numAmount = parseFloat(billAmount) || 0;
  const hasSufficientFunds = availableBalance >= numAmount && numAmount > 0;

  const handleExecutePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasSufficientFunds) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const isPower = selectedService.category === 'power';
      const fakeToken = isPower 
        ? `${Math.floor(1000 + Math.random()*9000)}-${Math.floor(1000 + Math.random()*9000)}-${Math.floor(1000 + Math.random()*9000)}-${Math.floor(1000 + Math.random()*9000)}` 
        : undefined;
      
      const receipt = {
        reference: `RUB-VAS-${Math.floor(100000 + Math.random() * 900000)}`,
        token: fakeToken,
        service: selectedService.name,
        amount: numAmount,
        currency,
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      onPayBill(currency, numAmount, selectedService.category, `${selectedService.name} (${receipt.reference})`);
      setSuccessReceipt(receipt);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Value Banner */}
      <div className={`p-6 rounded-3xl border ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0E1322] border-white/10'} shadow-xl relative overflow-hidden`}>
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 dark:text-rose-400 font-bold text-[11px] uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            <span>Rubby Value-Added Services (VAS)</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Instant Airtime, Power, Data & Cable TV Bills
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Spend trade proceeds directly from your Naira (₦) or Cedis (GH₵) wallet balance. Enjoy up to 3% cashback and zero transaction fees on all utility top-ups.
          </p>
        </div>

        {/* Quick Balance Cards */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className={`p-3 rounded-2xl border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/5'}`}>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Naira Wallet Balance</span>
            <span className="text-base font-extrabold text-rose-500 font-mono">
              ₦{nairaBalance.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
            </span>
          </div>
          <div className={`p-3 rounded-2xl border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/5'}`}>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Cedis Wallet Balance</span>
            <span className="text-base font-extrabold text-indigo-500 font-mono">
              GH₵{cedisBalance.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
            </span>
          </div>
          <div className={`p-3 rounded-2xl border ${isLightMode ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-emerald-950/20 border-emerald-500/20 text-emerald-400'} col-span-2 sm:col-span-1 flex items-center justify-between`}>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider block opacity-80">Cashback Reward</span>
              <span className="text-sm font-black">Active Tier · 2.5%</span>
            </div>
            <Sparkles className="w-5 h-5 text-emerald-500 shrink-0" />
          </div>
        </div>
      </div>

      {/* Main Grid: Service Selection + Payment Cockpit */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Service Catalog */}
        <div className="lg:col-span-7 space-y-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'airtime', label: 'Airtime VTU' },
              { id: 'data', label: 'Internet Data' },
              { id: 'power', label: 'Electricity Token' },
              { id: 'cable', label: 'Cable TV' },
              { id: 'betting', label: 'Betting Wallets' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer border ${
                  selectedCategory === tab.id
                    ? 'bg-rose-600 text-white font-bold border-rose-600 shadow-sm'
                    : isLightMode
                      ? 'bg-white text-slate-600 hover:text-slate-900 border-slate-200'
                      : 'bg-white/5 text-slate-400 hover:text-white border-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredServices.map(service => {
              const isSelected = selectedService.id === service.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => {
                    setSelectedService(service);
                    setSuccessReceipt(null);
                    if (service.country === 'GH') {
                      setCurrency(Currency.GHS);
                      setBillAmount('50');
                    } else {
                      setCurrency(Currency.NGN);
                      setBillAmount('2500');
                    }
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-rose-500/10 border-rose-500 ring-2 ring-rose-500/20'
                      : isLightMode
                        ? 'bg-white hover:bg-slate-50 border-slate-200'
                        : 'bg-[#0E1322] hover:bg-white/5 border-white/10'
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 p-1 flex items-center justify-center shrink-0 border border-slate-200/50 dark:border-white/10 shadow-sm overflow-hidden">
                    <UtilityBrandLogo providerId={service.brandKey} className="w-10 h-10 object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className={`text-xs font-bold truncate ${isSelected ? 'text-rose-600 dark:text-rose-400' : 'text-slate-900 dark:text-white'}`}>
                        {service.name}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 block leading-tight">{service.provider}</span>
                    <span className="inline-block mt-2 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                      {service.discountCashback}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Checkout Execution Form & Receipt */}
        <div className="lg:col-span-5">
          <div className={`p-6 rounded-3xl border ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0E1322] border-white/10'} shadow-xl space-y-5 relative`}>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 p-1 flex items-center justify-center shrink-0 border border-slate-200/50 dark:border-white/10">
                  <UtilityBrandLogo providerId={selectedService.brandKey} className="w-8 h-8 object-contain" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {selectedService.name}
                  </h3>
                  <span className="text-[10px] text-slate-400">{selectedService.provider}</span>
                </div>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-500">
                Auto-Credit
              </span>
            </div>

            {/* Receipt Modal Overlay when succeeded */}
            <AnimatePresence>
              {successReceipt && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3"
                >
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Transaction Confirmed & Dispatched!</span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-200 bg-white dark:bg-black/30 p-3 rounded-xl border border-emerald-500/20 font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Reference:</span>
                      <span className="font-bold">{successReceipt.reference}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Service:</span>
                      <span>{successReceipt.service}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Debited:</span>
                      <span className="font-bold text-rose-500">
                        {successReceipt.currency === Currency.NGN ? `₦${successReceipt.amount.toLocaleString()}` : `GH₵${successReceipt.amount.toLocaleString()}`}
                      </span>
                    </div>
                    {successReceipt.token && (
                      <div className="pt-2 border-t border-emerald-500/20">
                        <span className="text-[10px] text-slate-400 block">Prepaid Power Token:</span>
                        <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 tracking-wider">
                          {successReceipt.token}
                        </span>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSuccessReceipt(null)}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    Perform Another Recharge
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Execution Form */}
            {!successReceipt && (
              <form onSubmit={handleExecutePayment} className="space-y-4">
                {/* Currency & Preset Picker */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-white/60 mb-1.5">
                    Select Debit Wallet
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setCurrency(Currency.NGN)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                        currency === Currency.NGN
                          ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                          : isLightMode
                            ? 'bg-slate-50 text-slate-600 border-slate-200'
                            : 'bg-white/5 text-slate-400 border-white/5'
                      }`}
                    >
                      Naira (₦{nairaBalance.toLocaleString()})
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrency(Currency.GHS)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                        currency === Currency.GHS
                          ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                          : isLightMode
                            ? 'bg-slate-50 text-slate-600 border-slate-200'
                            : 'bg-white/5 text-slate-400 border-white/5'
                      }`}
                    >
                      Cedis (GH₵{cedisBalance.toLocaleString()})
                    </button>
                  </div>
                </div>

                {/* Dynamic Target Input based on category */}
                {selectedService.category === 'airtime' || selectedService.category === 'data' ? (
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-white/60 mb-1">
                      Recipient Mobile Phone Number
                    </label>
                    <input
                      type="tel"
                      value={recipientNumber}
                      onChange={(e) => setRecipientNumber(e.target.value)}
                      placeholder="e.g. 08149204859 or +233..."
                      required
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                ) : selectedService.category === 'power' ? (
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-white/60 mb-1">
                      Meter / Account Number (Prepaid/Postpaid)
                    </label>
                    <input
                      type="text"
                      value={meterOrSmartCard}
                      onChange={(e) => setMeterOrSmartCard(e.target.value)}
                      placeholder="Enter 11-digit Meter Number"
                      required
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                ) : selectedService.category === 'cable' ? (
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-white/60 mb-1">
                      Decoder Smartcard / IUC Number
                    </label>
                    <input
                      type="text"
                      value={meterOrSmartCard}
                      onChange={(e) => setMeterOrSmartCard(e.target.value)}
                      placeholder="10 or 11 Digit IUC Number"
                      required
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-white/60 mb-1">
                      Betting User ID / Account Number
                    </label>
                    <input
                      type="text"
                      value={customerId}
                      onChange={(e) => setCustomerId(e.target.value)}
                      placeholder="Enter your customer betting ID"
                      required
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                )}

                {/* Amount Input */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-slate-600 dark:text-white/60">
                      Amount ({currency})
                    </label>
                    <span className="text-[10px] text-slate-400">
                      Max: {currency === Currency.NGN ? `₦${nairaBalance.toLocaleString()}` : `GH₵${cedisBalance.toLocaleString()}`}
                    </span>
                  </div>
                  <input
                    type="number"
                    min="50"
                    value={billAmount}
                    onChange={(e) => setBillAmount(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />

                  {/* Preset Amount Chips */}
                  <div className="flex gap-1.5 mt-2">
                    {(currency === Currency.NGN ? [500, 1000, 2500, 5000, 10000] : [20, 50, 100, 200]).map(amt => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setBillAmount(amt.toString())}
                        className="flex-1 py-1 rounded-lg text-[10px] font-mono font-bold bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 transition cursor-pointer"
                      >
                        {amt}
                      </button>
                    ))}
                  </div>
                </div>

                {!hasSufficientFunds && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Insufficient {currency} balance. Trade a gift card or deposit to recharge!</span>
                  </div>
                )}

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={!hasSufficientFunds || isProcessing}
                  className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 active:scale-98 disabled:opacity-50 text-white font-bold text-xs transition shadow-lg shadow-rose-600/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Recharging Instantly via Gateway...</span>
                    </>
                  ) : (
                    <>
                      <span>Pay {currency === Currency.NGN ? `₦${numAmount.toLocaleString()}` : `GH₵${numAmount.toLocaleString()}`} from Wallet</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
