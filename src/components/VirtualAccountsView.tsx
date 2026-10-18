import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Copy, 
  Check, 
  ShieldCheck, 
  ArrowDownLeft, 
  CreditCard, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { Currency } from '../types';
import UtilityBrandLogo from './UtilityBrandLogo';

interface VirtualAccountsViewProps {
  nairaBalance: number;
  cedisBalance: number;
  onDepositSimulated: (currency: Currency, amount: number, senderName: string, bank: string) => void;
  isLightMode?: boolean;
}

export default function VirtualAccountsView({
  nairaBalance,
  cedisBalance,
  onDepositSimulated,
  isLightMode = false
}: VirtualAccountsViewProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(Currency.NGN);
  
  // Simulated instant bank transfer inbound state
  const [testAmount, setTestAmount] = useState<string>('25000');
  const [senderName, setSenderName] = useState<string>('Bryan Wyatt');
  const [isTransferring, setIsTransferring] = useState<boolean>(false);
  const [transferReceipt, setTransferReceipt] = useState<{
    sessionId: string;
    amount: number;
    currency: Currency;
    bank: string;
  } | null>(null);

  const virtualNuban = {
    bankName: 'Providus Bank / Rubby Microfinance',
    accountNumber: '9582048592',
    accountName: 'RUBBY-BRYAN-WYATT',
    bvnStatus: 'Linked & Verified',
    instantCreditWindow: 'Under 5 Seconds (NIP Instant)',
  };

  const virtualGhanaMoMo = {
    momoNetwork: 'MTN Mobile Money Ghana',
    merchantNumber: '0244910284',
    merchantID: 'RUBBY-GHA-8821',
    instantCreditWindow: 'Immediate (GhIPSS Instant Rail)',
  };

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSimulateInflow = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(testAmount);
    if (isNaN(parsed) || parsed <= 0) return;

    setIsTransferring(true);
    setTransferReceipt(null);

    setTimeout(() => {
      setIsTransferring(false);
      const bank = selectedCurrency === Currency.NGN ? 'Providus Bank / NIP' : 'MTN MoMo Ghana';
      const receipt = {
        sessionId: `NIP-SESSION-${Math.floor(100000000 + Math.random() * 900000000)}`,
        amount: parsed,
        currency: selectedCurrency,
        bank
      };
      
      onDepositSimulated(selectedCurrency, parsed, senderName, bank);
      setTransferReceipt(receipt);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className={`p-6 rounded-3xl border ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0E1322] border-white/10'} shadow-xl relative overflow-hidden`}>
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 dark:text-rose-400 font-bold text-[11px] uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>Dedicated Automated Inflow Engine</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Permanent Virtual NUBAN Bank & MoMo Merchant Accounts
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Transfer Naira or Cedis from any commercial bank app (Zenith, GTBank, Kuda, Access, Ecobank, or MTN MoMo). Your wallet auto-credits in seconds without manual proof submissions.
          </p>
        </div>
      </div>

      {/* Grid: Virtual Account Details + Inbound Bank Transfer Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Account Pass & Credentials */}
        <div className="lg:col-span-6 space-y-4">
          <div className={`p-6 rounded-3xl border ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0E1322] border-white/10'} shadow-xl space-y-5`}>
            {/* Currency Tabs */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSelectedCurrency(Currency.NGN)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition cursor-pointer flex items-center justify-center gap-2 ${
                  selectedCurrency === Currency.NGN
                    ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                    : isLightMode ? 'bg-slate-50 text-slate-600 border-slate-200' : 'bg-white/5 text-slate-400 border-white/5'
                }`}
              >
                <span>🇳🇬 Nigeria NUBAN Account</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedCurrency(Currency.GHS)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition cursor-pointer flex items-center justify-center gap-2 ${
                  selectedCurrency === Currency.GHS
                    ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                    : isLightMode ? 'bg-slate-50 text-slate-600 border-slate-200' : 'bg-white/5 text-slate-400 border-white/5'
                }`}
              >
                <UtilityBrandLogo providerId="mtn" className="w-4 h-4 rounded" />
                <span>Ghana MoMo Account</span>
              </button>
            </div>

            {selectedCurrency === Currency.NGN ? (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-rose-950 to-slate-950 text-white border border-rose-500/30 shadow-2xl relative overflow-hidden">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-[10px] text-rose-300 font-mono tracking-widest uppercase block font-bold">
                        Rubby Virtual NUBAN
                      </span>
                      <span className="text-xs text-white/80 font-semibold">{virtualNuban.bankName}</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 p-1.5 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-rose-400" />
                    </div>
                  </div>

                  <div className="space-y-1 mb-4">
                    <span className="text-[10px] text-white/50 uppercase tracking-wider block font-bold">Account Number</span>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-black font-mono tracking-widest text-white">
                        {virtualNuban.accountNumber}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(virtualNuban.accountNumber, 'acct')}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition cursor-pointer"
                        title="Copy account number"
                      >
                        {copiedField === 'acct' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-end text-xs font-mono pt-3 border-t border-white/10">
                    <div>
                      <span className="text-[9px] text-white/50 block">Account Name</span>
                      <span className="font-bold">{virtualNuban.accountName}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                      NIP Real-time
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-200 dark:border-white/10">
                  <div className="flex justify-between">
                    <span>Settlement Window:</span>
                    <strong className="text-slate-900 dark:text-white">{virtualNuban.instantCreditWindow}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Transfer Fees:</span>
                    <strong className="text-emerald-500 font-bold">₦0.00 (Zero Surcharge)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Identity Status:</span>
                    <strong className="text-emerald-500 font-bold">{virtualNuban.bvnStatus}</strong>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white border border-indigo-500/30 shadow-2xl relative overflow-hidden">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-[10px] text-indigo-300 font-mono tracking-widest uppercase block font-bold">
                        Ghana MoMo Merchant Rail
                      </span>
                      <span className="text-xs text-white/80 font-semibold">{virtualGhanaMoMo.momoNetwork}</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 p-1 flex items-center justify-center">
                      <UtilityBrandLogo providerId="mtn" className="w-8 h-8 rounded" />
                    </div>
                  </div>

                  <div className="space-y-1 mb-4">
                    <span className="text-[10px] text-white/50 uppercase tracking-wider block font-bold">Merchant / Phone Number</span>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-black font-mono tracking-widest text-white">
                        {virtualGhanaMoMo.merchantNumber}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(virtualGhanaMoMo.merchantNumber, 'momo')}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition cursor-pointer"
                      >
                        {copiedField === 'momo' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-end text-xs font-mono pt-3 border-t border-white/10">
                    <div>
                      <span className="text-[9px] text-white/50 block">Merchant Reference</span>
                      <span className="font-bold">{virtualGhanaMoMo.merchantID}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                      GhIPSS Instant
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Inbound Bank Transfer Simulator */}
        <div className="lg:col-span-6 space-y-4">
          <div className={`p-6 rounded-3xl border ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0E1322] border-white/10'} shadow-xl space-y-4`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Direct Bank Transfer / Test Deposit
                </h3>
                <p className="text-[11px] text-slate-400">Receive automatic credit directly to your Rubby wallet</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                NIBSS Instant Rail
              </span>
            </div>

            <form onSubmit={handleSimulateInflow} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-white/60 mb-1">
                  Sender Full Name (as on your bank account)
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-white/60 mb-1">
                  Transfer Amount ({selectedCurrency})
                </label>
                <input
                  type="number"
                  min="100"
                  value={testAmount}
                  onChange={(e) => setTestAmount(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                
                {/* Preset Chips */}
                <div className="flex gap-1.5 mt-2">
                  {(selectedCurrency === Currency.NGN ? [10000, 25000, 50000, 100000] : [100, 250, 500, 1000]).map(amt => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setTestAmount(amt.toString())}
                      className="flex-1 py-1 rounded-lg text-[10px] font-mono font-bold bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 transition cursor-pointer"
                    >
                      {amt.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isTransferring}
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold text-xs transition shadow-md shadow-rose-600/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isTransferring ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Broadcasting via NIBSS Settlement Channel...</span>
                  </>
                ) : (
                  <>
                    <ArrowDownLeft className="w-4 h-4" />
                    <span>Process Deposit ({selectedCurrency === Currency.NGN ? `₦${parseFloat(testAmount || '0').toLocaleString()}` : `GH₵${parseFloat(testAmount || '0').toLocaleString()}`})</span>
                  </>
                )}
              </button>
            </form>

            <AnimatePresence>
              {transferReceipt && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs space-y-1.5 font-mono"
                >
                  <div className="flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Inbound NIP Deposit Credited Instantly!</span>
                  </div>
                  <p className="text-[11px] text-slate-700 dark:text-slate-300">
                    Session: <strong>{transferReceipt.sessionId}</strong>
                  </p>
                  <p className="text-[11px] text-slate-700 dark:text-slate-300">
                    Credited Amount: <strong className="text-emerald-500">+{transferReceipt.currency === Currency.NGN ? `₦${transferReceipt.amount.toLocaleString()}` : `GH₵${transferReceipt.amount.toLocaleString()}`}</strong>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
