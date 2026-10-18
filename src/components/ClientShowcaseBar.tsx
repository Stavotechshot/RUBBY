import React from 'react';
import { 
  Play, 
  Sparkles, 
  ShieldCheck, 
  ArrowDownLeft, 
  ArrowRightLeft, 
  FileText, 
  Smartphone,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { Currency } from '../types';

interface ClientShowcaseBarProps {
  onSimulateTrade: () => void;
  onSimulateDeposit: () => void;
  onSimulateBill: () => void;
  onOpenDueDiligence: () => void;
  onOpenBrandSpec: () => void;
  isLightMode?: boolean;
}

export default function ClientShowcaseBar({
  onSimulateTrade,
  onSimulateDeposit,
  onSimulateBill,
  onOpenDueDiligence,
  onOpenBrandSpec,
  isLightMode = false
}: ClientShowcaseBarProps) {
  return (
    <div className={`rounded-2xl border p-3 transition-colors ${
      isLightMode 
        ? 'bg-gradient-to-r from-rose-50 via-white to-amber-50 border-rose-200/80 shadow-xs' 
        : 'bg-gradient-to-r from-[#140D1D] via-[#0E1322] to-[#121626] border-rose-500/20 shadow-xl'
    }`}>
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
        
        {/* Left: Client Mode Status Label */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-rose-600/20 text-rose-500 border border-rose-500/30 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-black tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                Client Demo & Simulation Hub
              </span>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30 uppercase font-mono">
                Pitch Ready
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              Interactive 1-click test scenarios to demonstrate live card liquidation, NIP bank crediting, and official proof of payment.
            </p>
          </div>
        </div>

        {/* Right: Quick Simulation Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          {/* Action 1: Test Instant Card Liquidation */}
          <button
            type="button"
            onClick={onSimulateTrade}
            className="flex-1 sm:flex-none px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 active:scale-95 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md shadow-rose-600/20 cursor-pointer"
            title="Demonstrate instant card trade with live receipt"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Test $100 Card Trade</span>
          </button>

          {/* Action 2: Test Inbound Bank Deposit */}
          <button
            type="button"
            onClick={onSimulateDeposit}
            className={`flex-1 sm:flex-none px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border ${
              isLightMode 
                ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300' 
                : 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border-emerald-500/30'
            }`}
            title="Simulate incoming bank transfer via Providus NUBAN"
          >
            <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-400" />
            <span>Test NIP +₦50,000</span>
          </button>

          {/* Action 3: Test Bill Payment */}
          <button
            type="button"
            onClick={onSimulateBill}
            className={`flex-1 sm:flex-none px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border ${
              isLightMode 
                ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-300' 
                : 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border-amber-500/30'
            }`}
            title="Simulate electricity meter token purchase"
          >
            <Smartphone className="w-3.5 h-3.5 text-amber-400" />
            <span>Test Bill Recharge</span>
          </button>

          {/* Action 4: Open Institutional Due Diligence Deck */}
          <button
            type="button"
            onClick={onOpenDueDiligence}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
              isLightMode 
                ? 'hover:bg-slate-200/70 text-slate-700 border border-slate-300' 
                : 'hover:bg-white/10 text-slate-300 border border-white/10'
            }`}
            title="Open institutional regulatory & SLA specifications"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">Due Diligence</span>
          </button>
        </div>

      </div>
    </div>
  );
}
