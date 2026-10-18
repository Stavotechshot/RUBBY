import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  QrCode, 
  Copy, 
  Check, 
  Smartphone, 
  ShieldCheck, 
  Sparkles, 
  Building2, 
  Coins, 
  ArrowDownLeft,
  CheckCircle2,
  ExternalLink,
  Download
} from 'lucide-react';
import { Currency } from '../types';
import { RubbyVectorMark } from './RubbyLogo';

export interface DepositQRCodeData {
  title: string;
  subtitle: string;
  depositType: 'bank' | 'momo' | 'crypto';
  currency?: Currency;
  addressOrAccount: string;
  accountName?: string;
  bankOrNetworkName: string;
  defaultAmount?: number;
  cryptoSymbol?: string;
}

interface DepositQRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: DepositQRCodeData | null;
  onSimulateDeposit?: (amount: number, currency: Currency, sender: string, bank: string) => void;
  isLightMode?: boolean;
}

export default function DepositQRCodeModal({
  isOpen,
  onClose,
  data,
  onSimulateDeposit,
  isLightMode = false
}: DepositQRCodeModalProps) {
  if (!isOpen || !data) return null;

  const [depositAmount, setDepositAmount] = useState<string>(
    data.defaultAmount ? data.defaultAmount.toString() : data.depositType === 'bank' ? '25000' : data.depositType === 'momo' ? '150' : '100'
  );
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);

  const currencySymbol = data.currency === Currency.NGN ? '₦' : data.currency === Currency.GHS ? 'GH₵' : data.cryptoSymbol || '$';

  // Construct official interoperable QR payment payload
  const qrPayload = React.useMemo(() => {
    const amt = parseFloat(depositAmount) || 0;
    if (data.depositType === 'bank') {
      return `rubby://nip-transfer?bank=providus&account=${data.addressOrAccount}&name=${encodeURIComponent(data.accountName || 'RUBBY')}&amt=${amt}&cur=NGN`;
    } else if (data.depositType === 'momo') {
      return `rubby://momo-pay?merchant=${data.addressOrAccount}&network=${encodeURIComponent(data.bankOrNetworkName)}&amt=${amt}&cur=GHS`;
    } else {
      return `${(data.cryptoSymbol || 'usdt').toLowerCase()}:${data.addressOrAccount}?amount=${amt}`;
    }
  }, [data, depositAmount]);

  const handleCopy = () => {
    navigator.clipboard.writeText(data.addressOrAccount);
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  const handleSimulateScanTransfer = () => {
    const parsed = parseFloat(depositAmount);
    if (isNaN(parsed) || parsed <= 0) return;

    setIsScanning(true);
    setScanSuccess(false);

    setTimeout(() => {
      setIsScanning(false);
      setScanSuccess(true);
      if (onSimulateDeposit && data.currency) {
        onSimulateDeposit(
          parsed,
          data.currency,
          'QR Mobile Scanner Instant Pay',
          data.bankOrNetworkName
        );
      }
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className={`w-full max-w-md p-6 rounded-3xl border shadow-2xl relative overflow-hidden text-center ${
          isLightMode ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#0E1322] border-white/10 text-white'
        }`}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
          <QrCode className="w-3.5 h-3.5" />
          <span>Instant Scan-To-Pay Rail</span>
        </div>

        <h3 className="text-xl font-black font-sans tracking-tight text-slate-900 dark:text-white">
          {data.title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 max-w-xs mx-auto leading-relaxed">
          {data.subtitle}
        </p>

        {!scanSuccess ? (
          <div className="mt-5 space-y-4">
            
            {/* Dynamic Deposit Amount Configurator */}
            <div className={`p-3 rounded-2xl border text-left ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/5'}`}>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Transfer Amount ({currencySymbol})
                </label>
                <span className="text-[10px] font-mono text-emerald-500 font-semibold">Zero Transfer Fee</span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="Enter amount"
                  className={`w-full px-3 py-2 rounded-xl text-base font-mono font-bold border transition focus:outline-hidden ${
                    isLightMode 
                      ? 'bg-white border-slate-300 text-slate-900 focus:border-rose-500' 
                      : 'bg-black/40 border-white/15 text-white focus:border-rose-500'
                  }`}
                />
              </div>
            </div>

            {/* High-Resolution SVG QR Code Vector Frame */}
            <div className="relative w-56 h-56 bg-white p-3 rounded-3xl mx-auto shadow-xl border border-slate-200 flex items-center justify-center group overflow-hidden">
              
              {/* Scanline Sweep Animation */}
              {!isScanning && (
                <motion.div
                  animate={{ top: ['4%', '92%', '4%'] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute left-3 right-3 h-0.5 bg-rose-500 shadow-md shadow-rose-500/80 z-20 pointer-events-none"
                />
              )}

              {/* Scanning in Progress Overlay */}
              {isScanning && (
                <div className="absolute inset-0 bg-black/85 z-30 flex flex-col items-center justify-center space-y-2.5 p-4">
                  <div className="w-10 h-10 border-3 border-rose-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-[11px] uppercase font-bold tracking-widest text-rose-400 font-mono animate-pulse">
                    Scanning & Authorizing NIP...
                  </span>
                  <span className="text-[9px] text-slate-300">Matching Bank Settlement Rails</span>
                </div>
              )}

              {/* Procedural High-Contrast QR Code */}
              <svg className="w-full h-full text-slate-950" viewBox="0 0 100 100" fill="currentColor">
                {/* 3 Corner Finding Patterns */}
                <rect x="6" y="6" width="22" height="22" rx="3" fill="currentColor" />
                <rect x="10" y="10" width="14" height="14" rx="1.5" fill="#fff" />
                <rect x="13" y="13" width="8" height="8" rx="1" fill="currentColor" />

                <rect x="72" y="6" width="22" height="22" rx="3" fill="currentColor" />
                <rect x="76" y="10" width="14" height="14" rx="1.5" fill="#fff" />
                <rect x="79" y="13" width="8" height="8" rx="1" fill="currentColor" />

                <rect x="6" y="72" width="22" height="22" rx="3" fill="currentColor" />
                <rect x="10" y="76" width="14" height="14" rx="1.5" fill="#fff" />
                <rect x="13" y="79" width="8" height="8" rx="1" fill="currentColor" />

                {/* Alignment Patterns */}
                <rect x="74" y="74" width="10" height="10" rx="1.5" fill="currentColor" />
                <rect x="77" y="77" width="4" height="4" rx="0.5" fill="#fff" />

                {/* QR Data Grid Matrix */}
                <path d="
                  M 34,7 h 5 v 5 h -5 z M 43,7 h 8 v 5 h -8 z M 55,7 h 5 v 8 h -5 z M 63,7 h 6 v 5 h -6 z
                  M 34,15 h 8 v 4 h -8 z M 46,15 h 5 v 7 h -5 z M 55,19 h 7 v 4 h -7 z M 66,15 h 4 v 4 h -4 z
                  M 34,23 h 4 v 4 h -4 z M 42,26 h 5 v 4 h -5 z M 50,23 h 9 v 4 h -9 z M 63,23 h 12 v 4 h -12 z
                  M 7,34 h 8 v 4 h -8 z M 19,34 h 4 v 8 h -4 z M 27,34 h 11 v 4 h -11 z M 42,34 h 8 v 4 h -8 z M 54,34 h 15 v 4 h -15 z M 73,34 h 11 v 4 h -11 z
                  M 7,42 h 4 v 8 h -4 z M 15,46 h 8 v 4 h -8 z M 27,42 h 4 v 4 h -4 z M 35,42 h 11 v 4 h -11 z M 50,46 h 15 v 4 h -15 z M 71,42 h 8 v 4 h -8 z
                  M 7,54 h 11 v 4 h -11 z M 22,54 h 4 v 8 h -4 z M 30,54 h 8 v 4 h -8 z M 42,54 h 11 v 4 h -11 z M 57,54 h 8 v 4 h -8 z M 69,54 h 12 v 4 h -12 z
                  M 7,62 h 4 v 4 h -4 z M 15,62 h 11 v 4 h -11 z M 30,66 h 4 v 7 h -4 z M 38,62 h 15 v 4 h -15 z M 57,62 h 4 v 11 h -4 z M 65,62 h 8 v 4 h -8 z M 77,62 h 12 v 4 h -12 z
                  M 34,74 h 11 v 4 h -11 z M 49,74 h 4 v 8 h -4 z M 57,78 h 8 v 4 h -8 z M 69,74 h 4 v 4 h -4 z
                  M 34,82 h 4 v 8 h -4 z M 42,86 h 8 v 4 h -8 z M 54,82 h 11 v 4 h -11 z M 69,86 h 4 v 4 h -4 z
                  M 34,90 h 11 v 4 h -11 z M 49,90 h 4 v 4 h -4 z M 57,90 h 15 v 4 h -15 z
                " fill="currentColor" />

                {/* Center Rubby Brand Gem Monogram */}
                <rect x="41" y="41" width="18" height="18" rx="5" fill="#090B14" stroke="#E11D48" strokeWidth="1.5" />
                <path d="M 50,43 L 56,47 L 56,53 L 50,57 L 44,53 L 44,47 Z" fill="#E11D48" />
                <path d="M 47,48 L 52,48 L 54,52 L 50,54 L 47,52 Z" fill="#FF4D6D" />
              </svg>
            </div>

            {/* Account Credentials Strip */}
            <div className={`p-3.5 rounded-2xl border text-left text-xs space-y-1.5 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-black/30 border-white/5'}`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                  {data.depositType === 'bank' ? 'Virtual NUBAN' : data.depositType === 'momo' ? 'Merchant MoMo' : 'Deposit Address'}
                </span>
                <span className="text-[10px] font-mono text-slate-400 font-semibold truncate max-w-[150px]">
                  {data.bankOrNetworkName}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 font-mono text-xs font-bold text-slate-900 dark:text-white">
                <span className="truncate">{data.addressOrAccount}</span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-1 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 transition cursor-pointer shrink-0"
                  title="Copy account / address"
                >
                  {copiedPayload ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {data.accountName && (
                <div className="text-[10px] text-slate-500 dark:text-slate-400 flex justify-between font-mono pt-1">
                  <span>Beneficiary:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{data.accountName}</span>
                </div>
              )}
            </div>

            {/* Action Buttons: Cancel and Simulate Instant Transfer Scan */}
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-bold hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer"
              >
                Close
              </button>

              <button
                type="button"
                onClick={handleSimulateScanTransfer}
                disabled={isScanning || !depositAmount || parseFloat(depositAmount) <= 0}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 hover:brightness-110 active:scale-97 text-white text-xs font-bold transition shadow-lg shadow-rose-600/30 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Simulate App Scan</span>
              </button>
            </div>

          </div>
        ) : (
          /* Scan Succeeded Success State */
          <div className="py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-emerald-400 stroke-[3]" />
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                Instant Transfer Confirmed!
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                {currencySymbol}{parseFloat(depositAmount).toLocaleString()} was scanned and credited directly via {data.bankOrNetworkName}.
              </p>
            </div>

            <div className={`p-4 rounded-2xl border text-xs font-mono text-left space-y-1.5 max-w-sm mx-auto ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-black/30 border-white/5'}`}>
              <div className="flex justify-between text-slate-400 text-[10px]">
                <span>Session Clearance:</span>
                <span className="text-emerald-500 font-bold">NIP-QR-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between text-slate-400 text-[10px]">
                <span>Settlement Speed:</span>
                <strong className="text-slate-900 dark:text-white">1.2 Seconds</strong>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs transition cursor-pointer hover:opacity-90"
            >
              Done & View Balances
            </button>
          </div>
        )}

      </motion.div>
    </div>
  );
}
