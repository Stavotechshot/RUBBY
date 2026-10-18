import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Printer, 
  Download, 
  Copy, 
  Check, 
  ShieldCheck, 
  Share2, 
  ExternalLink,
  CheckCircle2,
  Building2,
  Calendar,
  Hash,
  ArrowDownLeft,
  ArrowUpRight
} from 'lucide-react';
import { Currency, Trade, WalletTransaction } from '../types';
import { RubbyVectorMark } from './RubbyLogo';

export interface ReceiptData {
  id: string;
  receiptNumber?: string;
  type: 'card_trade' | 'deposit' | 'withdrawal' | 'utility';
  title: string;
  amount: number;
  currency: Currency;
  status: 'completed' | 'pending' | 'failed';
  timestamp: string;
  cardBrand?: string;
  cardValue?: number;
  rateApplied?: number;
  beneficiaryAccount?: string;
  beneficiaryBank?: string;
  beneficiaryName?: string;
  sessionRef?: string;
  tokenPin?: string;
}

interface TransactionReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ReceiptData | null;
  isLightMode?: boolean;
}

export default function TransactionReceiptModal({
  isOpen,
  onClose,
  data,
  isLightMode = false
}: TransactionReceiptModalProps) {
  const [copiedRef, setCopiedRef] = React.useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !data) return null;

  const symbol = data.currency === Currency.NGN ? '₦' : 'GH₵';
  const formattedAmount = `${symbol}${data.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const refCode = data.receiptNumber || data.sessionRef || `RX-${data.id.toUpperCase()}-2026`;
  const dateObj = new Date(data.timestamp);

  const handleCopyRef = () => {
    navigator.clipboard?.writeText(refCode);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className={`relative w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border overflow-hidden max-h-[92vh] overflow-y-auto ${
            isLightMode 
              ? 'bg-white border-slate-200 text-slate-900' 
              : 'bg-[#0B0E1B] border-white/10 text-white'
          }`}
        >
          {/* Header Controls */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/5 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-500 font-mono">
                Official Transaction Proof
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition cursor-pointer"
                title="Print or Save PDF"
              >
                <Printer className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Printable Receipt Paper Container */}
          <div 
            ref={receiptRef}
            className={`p-6 rounded-2xl border transition-all ${
              isLightMode 
                ? 'bg-slate-50 border-slate-200 shadow-inner' 
                : 'bg-[#0F1424] border-white/10'
            }`}
          >
            {/* Top Brand Watermark & Seal */}
            <div className="flex items-center justify-between border-b border-dashed border-slate-300 dark:border-white/10 pb-5 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 p-1.5 rounded-xl bg-black/40 border border-rose-500/30 flex items-center justify-center shrink-0">
                  <RubbyVectorMark className="w-full h-full" />
                </div>
                <div>
                  <h3 className="text-base font-black tracking-tight text-slate-900 dark:text-white font-sans">
                    RUBBY EXCHANGE
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    Institutional Settlement Rail
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-500 border border-emerald-500/20 font-mono">
                  <CheckCircle2 className="w-3 h-3" />
                  CONFIRMED
                </span>
                <span className="text-[10px] text-slate-400 block mt-1 font-mono">
                  NIP / MoMo Active
                </span>
              </div>
            </div>

            {/* Payout Big Figure */}
            <div className="text-center py-4 mb-5 border-b border-dashed border-slate-300 dark:border-white/10">
              <span className="text-xs text-slate-400 uppercase tracking-wider block font-semibold mb-1">
                Settled Payout Amount
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-emerald-500 tabular-nums">
                {formattedAmount}
              </h2>
              <span className="text-xs text-slate-400 mt-1 block">
                {data.title}
              </span>
            </div>

            {/* Structured Receipt Ledger Details */}
            <div className="space-y-3 text-xs mb-6 font-mono">
              <div className="flex items-center justify-between py-1 border-b border-slate-200 dark:border-white/5">
                <span className="text-slate-400">Reference No:</span>
                <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                  <span>{refCode}</span>
                  <button
                    type="button"
                    onClick={handleCopyRef}
                    className="p-1 hover:text-rose-400 transition cursor-pointer"
                    title="Copy Reference"
                  >
                    {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-200 dark:border-white/5">
                <span className="text-slate-400">Date & Timestamp:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} at {dateObj.toLocaleTimeString()}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-200 dark:border-white/5">
                <span className="text-slate-400">Transaction Type:</span>
                <span className="font-semibold capitalize text-slate-800 dark:text-slate-200">
                  {data.type.replace('_', ' ')}
                </span>
              </div>

              {data.cardBrand && (
                <div className="flex items-center justify-between py-1 border-b border-slate-200 dark:border-white/5">
                  <span className="text-slate-400">Card Asset Liquidated:</span>
                  <span className="font-bold text-rose-500">
                    {data.cardBrand} (${data.cardValue})
                  </span>
                </div>
              )}

              {data.rateApplied && (
                <div className="flex items-center justify-between py-1 border-b border-slate-200 dark:border-white/5">
                  <span className="text-slate-400">Exchange Rate Locked:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {symbol}{data.rateApplied} / $1 USD
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between py-1 border-b border-slate-200 dark:border-white/5">
                <span className="text-slate-400">Disbursement Rail:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {data.currency === Currency.NGN ? 'Providus NIP Instant Transfer' : 'Bank of Ghana / MoMo Switch'}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-200 dark:border-white/5">
                <span className="text-slate-400">Beneficiary:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {data.beneficiaryName || 'Bryan Wyatt (Verified)'}
                </span>
              </div>

              {data.tokenPin && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 my-2">
                  <span className="text-[10px] text-amber-500 block font-bold uppercase tracking-wider">
                    Recharge Token PIN
                  </span>
                  <span className="text-sm font-extrabold text-amber-400 tracking-wider">
                    {data.tokenPin}
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Barcode / QR Simulation */}
            <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <div className="space-y-0.5">
                <span>AUTHENTICATED VIA 256-BIT SSL</span>
                <span className="block text-[9px] text-slate-500">ID: NIP-NIBSS-AUTOSWEEP-2026</span>
              </div>
              
              {/* Stylized Barcode SVG */}
              <div className="flex items-center gap-0.5 h-6 opacity-60">
                <span className="w-0.5 h-full bg-current" />
                <span className="w-1 h-full bg-current" />
                <span className="w-0.5 h-full bg-current" />
                <span className="w-1.5 h-full bg-current" />
                <span className="w-0.5 h-full bg-current" />
                <span className="w-1 h-full bg-current" />
                <span className="w-2 h-full bg-current" />
                <span className="w-0.5 h-full bg-current" />
                <span className="w-1 h-full bg-current" />
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>NDPR & CBN AML/CFT Compliant</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handlePrint}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-md shadow-rose-600/30"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
