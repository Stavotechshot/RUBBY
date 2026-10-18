import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Calculator, 
  ArrowRightLeft, 
  TrendingUp, 
  Coins, 
  ChevronRight, 
  BadgeAlert,
  Info
} from 'lucide-react';
import { Currency, SUPPORTED_BRANDS } from '../types';
import BrandLogo from './BrandLogo';

export default function CurrencyCalculator() {
  const [amount, setAmount] = useState<string>('100');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [selectedBrandId, setSelectedBrandId] = useState<string>('base');

  // Base market exchange rates
  const BASE_RATES: Record<string, number> = {
    USD_NGN: 800,
    USD_GHS: 12.5,
    NGN_GHS: 0.0156, // 1 NGN is roughly 0.0156 GHS
    GHS_NGN: 64.0,   // 1 GHS is roughly 64 NGN
  };

  const selectedBrand = useMemo(() => {
    if (selectedBrandId === 'base') return null;
    return SUPPORTED_BRANDS.find(b => b.id === selectedBrandId) || null;
  }, [selectedBrandId]);

  // Convert inputs
  const conversions = useMemo(() => {
    const numAmount = parseFloat(amount) || 0;
    if (numAmount <= 0) {
      return { NGN: 0, GHS: 0, USD: 0 };
    }

    if (selectedBrand) {
      // Selected specific brand rate
      const ngnRate = selectedBrand.rates[Currency.NGN];
      const ghsRate = selectedBrand.rates[Currency.GHS];

      if (fromCurrency === 'USD') {
        return {
          USD: numAmount,
          NGN: numAmount * ngnRate,
          GHS: numAmount * ghsRate
        };
      } else if (fromCurrency === 'NGN') {
        const usdValue = numAmount / ngnRate;
        return {
          USD: usdValue,
          NGN: numAmount,
          GHS: usdValue * ghsRate
        };
      } else { // GHS
        const usdValue = numAmount / ghsRate;
        return {
          USD: usdValue,
          NGN: usdValue * ngnRate,
          GHS: numAmount
        };
      }
    } else {
      // Standard base rates
      if (fromCurrency === 'USD') {
        return {
          USD: numAmount,
          NGN: numAmount * BASE_RATES.USD_NGN,
          GHS: numAmount * BASE_RATES.USD_GHS
        };
      } else if (fromCurrency === 'NGN') {
        const usdValue = numAmount / BASE_RATES.USD_NGN;
        return {
          USD: usdValue,
          NGN: numAmount,
          GHS: numAmount * BASE_RATES.NGN_GHS
        };
      } else { // GHS
        const usdValue = numAmount / BASE_RATES.USD_GHS;
        return {
          USD: usdValue,
          NGN: numAmount * BASE_RATES.GHS_NGN,
          GHS: numAmount
        };
      }
    }
  }, [amount, fromCurrency, selectedBrand, selectedBrandId]);

  return (
    <div id="currency-calculator-wrapper" className="bg-white dark:bg-[#0E1322] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 shadow-xl text-slate-900 dark:text-white transition-colors space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-600/10 border border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center">
            <Calculator className="w-4 h-4 text-rose-600 dark:text-rose-400" />
          </div>
          <div>
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">Exchange Rate Estimations</h3>
            <p className="text-[10px] text-slate-500 dark:text-white/40 block">Calculate value beforehand</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <TrendingUp className="w-2.5 h-2.5" />
          <span>Real-time</span>
        </div>
      </div>

      {/* Selector and Inputs Row */}
      <div className="space-y-3">
        {/* Rate Source type selector */}
        <div>
          <label className="block text-[10px] uppercase text-slate-500 dark:text-white/40 font-extrabold font-mono mb-1.5">
            Conversion Standard
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setSelectedBrandId('base')}
              className={`py-2 px-3 rounded-xl text-center text-xs font-bold transition cursor-pointer border ${
                selectedBrandId === 'base'
                  ? 'bg-rose-600 border-rose-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-white/60 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
            >
              Base Market Rate
            </button>
            <select
              value={selectedBrandId === 'base' ? '' : selectedBrandId}
              onChange={(e) => {
                if (e.target.value) {
                  setSelectedBrandId(e.target.value);
                } else {
                  setSelectedBrandId('base');
                }
              }}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer bg-white dark:bg-zinc-950 border ${
                selectedBrandId !== 'base'
                  ? 'border-rose-500 text-rose-600 dark:text-rose-400'
                  : 'border-slate-200 dark:border-white/10 text-slate-700 dark:text-white/60 hover:border-slate-300'
              }`}
            >
              <option value="">-- Or Gift Card Brand --</option>
              {SUPPORTED_BRANDS.map(brand => (
                <option key={brand.id} value={brand.id} className="bg-white dark:bg-zinc-950 text-slate-900 dark:text-white">
                  🏷️ {brand.name}
                </option>
              ))}
            </select>
          </div>

          {selectedBrand && (
            <div className="mt-2 flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
              <div className="w-6 h-6 rounded-lg bg-white dark:bg-black/40 flex items-center justify-center p-1 border border-slate-200 dark:border-white/10 shrink-0">
                <BrandLogo brandId={selectedBrand.id} className="w-4 h-4 text-slate-900 dark:text-white" />
              </div>
              <div className="flex-1 min-w-0 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 dark:text-white truncate">{selectedBrand.name}</span>
                <span className="text-[11px] font-mono text-rose-600 dark:text-rose-400 font-bold">
                  ₦{selectedBrand.rates[Currency.NGN]}/$ · ₵{selectedBrand.rates[Currency.GHS]}/$
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Amount Input */}
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-8">
            <label className="block text-[10px] uppercase text-slate-500 dark:text-white/40 font-extrabold font-mono mb-1">
              Transfer Input
            </label>
            <input
              type="number"
              placeholder="e.g. 100"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm font-bold border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono"
            />
          </div>
          <div className="col-span-4">
            <label className="block text-[10px] uppercase text-slate-500 dark:text-white/40 font-extrabold font-mono mb-1">
              Currency
            </label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full px-3 py-2.5 text-xs font-bold border border-slate-200 dark:border-white/10 rounded-xl bg-white dark:bg-zinc-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <option value="USD">💵 USD</option>
              <option value="NGN">₦ NGN</option>
              <option value="GHS">₵ GHS</option>
            </select>
          </div>
        </div>
      </div>

      {/* Target Results Area */}
      <div className="space-y-2 border-t border-slate-200 dark:border-white/5 pt-4">
        <span className="block text-[10px] uppercase text-slate-500 dark:text-white/40 font-extrabold font-mono">
          Estimated Equivalents
        </span>

        <div className="grid grid-cols-3 gap-2">
          {/* USD Output */}
          <div className={`p-3 rounded-xl border transition-all ${fromCurrency === 'USD' ? 'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20' : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/5'}`}>
            <span className="text-[9px] text-slate-500 dark:text-white/40 block font-mono">USD Payout</span>
            <span className="text-sm font-extrabold font-mono block mt-1 text-slate-900 dark:text-white">
              ${conversions.USD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          {/* NGN Output */}
          <div className={`p-3 rounded-xl border transition-all ${fromCurrency === 'NGN' ? 'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20' : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/5'}`}>
            <span className="text-[9px] text-slate-500 dark:text-white/40 block font-mono">Naira Rate</span>
            <span className="text-sm font-extrabold font-mono block mt-1 text-emerald-600 dark:text-emerald-400">
              ₦{conversions.NGN.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
            </span>
          </div>

          {/* GHS Output */}
          <div className={`p-3 rounded-xl border transition-all ${fromCurrency === 'GHS' ? 'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20' : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/5'}`}>
            <span className="text-[9px] text-slate-500 dark:text-white/40 block font-mono">Cedis Margin</span>
            <span className="text-sm font-extrabold font-mono block mt-1 text-amber-600 dark:text-amber-400">
              ₵{conversions.GHS.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      {/* Small informative tip footer */}
      <div className="flex gap-2 p-3.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl items-start">
        <Info className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
        <p className="text-[10px] text-slate-600 dark:text-white/50 leading-relaxed font-medium">
          {selectedBrand ? (
            <span>Currently using <strong>{selectedBrand.name} Premium Rates</strong>: 1 USD = ₦{selectedBrand.rates[Currency.NGN]} / ₵{selectedBrand.rates[Currency.GHS]}. Rates are updated continuously.</span>
          ) : (
            <span>Showing standard <strong>Interbank Market Base estimations</strong>. Swap to a custom Gift Card brand above to compute transaction-specific claims.</span>
          )}
        </p>
      </div>
    </div>
  );
}
