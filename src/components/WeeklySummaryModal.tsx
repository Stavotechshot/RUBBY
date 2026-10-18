import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Award, 
  Sparkles, 
  TrendingUp, 
  Coins, 
  Calendar,
  DollarSign,
  Briefcase,
  ChevronRight,
  TrendingDown,
  Gift
} from 'lucide-react';
import { Trade, Currency } from '../types';
import BrandLogo from './BrandLogo';

interface WeeklySummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  trades: Trade[];
}

export default function WeeklySummaryModal({ isOpen, onClose, trades }: WeeklySummaryModalProps) {
  // Calculate index for the previous 7 days
  const stats = useMemo(() => {
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const weeklyTrades = trades.filter(t => {
      const tradeTime = new Date(t.createdAt).getTime();
      return t.status === 'completed' && tradeTime >= sevenDaysAgo;
    });

    // 1. Top performing brand
    const brandGroups: { [id: string]: { name: string; valueUSD: number; count: number; brandId: string } } = {};
    weeklyTrades.forEach(t => {
      if (!brandGroups[t.brandId]) {
        brandGroups[t.brandId] = { name: t.brandName, valueUSD: 0, count: 0, brandId: t.brandId };
      }
      brandGroups[t.brandId].valueUSD += t.cardValue;
      brandGroups[t.brandId].count += 1;
    });

    let topBrandName = 'No major trades';
    let topBrandId = '';
    let topBrandUSD = 0;
    let topBrandCount = 0;

    Object.values(brandGroups).forEach(bg => {
      if (bg.valueUSD > topBrandUSD) {
        topBrandName = bg.name;
        topBrandId = bg.brandId;
        topBrandUSD = bg.valueUSD;
        topBrandCount = bg.count;
      }
    });

    // 2. Average trade value (USD)
    const totalTradedUSD = weeklyTrades.reduce((acc, t) => acc + t.cardValue, 0);
    const avgTradeValue = weeklyTrades.length > 0 ? totalTradedUSD / weeklyTrades.length : 0;

    // 3. Total reward points earned
    // RP = value * 2.5
    const totalPointsEarned = weeklyTrades.reduce((acc, t) => acc + Math.floor(t.cardValue * 2.5), 0);

    return {
      weeklyTrades,
      totalTradedUSD,
      avgTradeValue,
      totalPointsEarned,
      topBrandName,
      topBrandId,
      topBrandUSD,
      topBrandCount,
      brandBreakdown: Object.values(brandGroups).sort((a,b) => b.valueUSD - a.valueUSD)
    };
  }, [trades]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        id="weekly-summary-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="relative w-full max-w-lg overflow-hidden border border-slate-200 dark:border-white/10 rounded-3xl bg-white dark:bg-[#0E1322] text-slate-900 dark:text-white shadow-2xl p-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-4 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-violet-50 dark:bg-violet-600/20 text-violet-600 dark:text-violet-400 flex items-center justify-center border border-violet-200 dark:border-violet-500/20">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold font-sans text-slate-900 dark:text-white">
                  7-Day Trading Insights
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-white/50">
                  Performance & reward statement for the past 7 days
                </p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-500 hover:text-slate-900 dark:text-white/60 dark:hover:text-white flex items-center justify-center border border-slate-200 dark:border-white/5 transition"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Stats Bento Grid */}
          <div className="grid grid-cols-2 gap-3.5 mb-5">
            
            {/* Average trade Value */}
            <div className="col-span-1 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/5 relative overflow-hidden">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-white/50 text-[10px] uppercase font-mono tracking-wider font-extrabold mb-1">
                <DollarSign className="w-3.5 h-3.5 text-rose-500" />
                Avg Trade
              </div>
              <div className="text-xl font-black font-sans leading-none tracking-tight text-slate-900 dark:text-white">
                ${stats.avgTradeValue.toLocaleString(undefined, { maximumFractionDigits: 1 })}
              </div>
              <span className="text-[9px] text-slate-400 dark:text-white/40 block mt-1">
                across {stats.weeklyTrades.length} trades
              </span>
            </div>

            {/* Total Reward Points Earned */}
            <div className="col-span-1 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/5 relative overflow-hidden">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-white/50 text-[10px] uppercase font-mono tracking-wider font-extrabold mb-1">
                <Coins className="w-3.5 h-3.5 text-amber-500" />
                RP Earned
              </div>
              <div className="text-xl font-black font-sans leading-none tracking-tight text-amber-600 dark:text-amber-400 flex items-center gap-1">
                {stats.totalPointsEarned.toLocaleString()} <span className="text-xs">🪙</span>
              </div>
              <span className="text-[9px] text-slate-400 dark:text-white/40 block mt-1">
                ready to redeem
              </span>
            </div>

            {/* Top Performing Brand Callout */}
            <div className="col-span-2 p-4 rounded-2xl bg-violet-50 dark:bg-[#5b21b6]/15 border border-violet-200 dark:border-[#5b21b6]/30 relative overflow-hidden flex items-center justify-between">
              <div className="space-y-1.5 relative z-10">
                <div className="flex items-center gap-1 text-[10px] uppercase font-mono tracking-widest font-extrabold text-violet-600 dark:text-violet-400">
                  <Award className="w-3.5 h-3.5 animate-pulse" />
                  Top Performer Brand
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight leading-none">
                    {stats.topBrandName}
                  </h4>
                  {stats.topBrandUSD > 0 && (
                    <span className="text-[10px] text-slate-600 dark:text-white/60 block mt-1 leading-none">
                      Accumulated <strong className="text-slate-900 dark:text-white">${stats.topBrandUSD}</strong> traded in last 7 days
                    </span>
                  )}
                </div>
              </div>

              {stats.topBrandId ? (
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-black/60 text-slate-900 dark:text-white border border-slate-200 dark:border-violet-500/30 flex items-center justify-center p-2.5 shrink-0 shadow-sm">
                  <BrandLogo brandId={stats.topBrandId} className="w-7 h-7" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 flex items-center justify-center shrink-0 text-slate-400 dark:text-white/20">
                  <Gift className="w-6 h-6" />
                </div>
              )}
            </div>

          </div>

          {/* Visual Brand Breakdown Bar Charts */}
          <div className="space-y-3.5 mb-5 bg-slate-50 dark:bg-white/[0.03] p-4 rounded-2xl border border-slate-200 dark:border-white/5">
            <h4 className="text-[10px] uppercase font-mono font-extrabold text-slate-500 dark:text-white/50 tracking-wider">
              Brand Volume Breakdown
            </h4>

            {stats.brandBreakdown.length === 0 ? (
              <div className="text-center py-4 text-[11px] text-slate-400 dark:text-white/35 font-medium">
                No gift cards sold in the previous 7 days.
              </div>
            ) : (
              <div className="space-y-3">
                {stats.brandBreakdown.map(bg => {
                  const percent = Math.min(100, Math.round((bg.valueUSD / stats.totalTradedUSD) * 100));
                  return (
                    <div key={bg.brandId} className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 flex items-center justify-center p-0.5 shrink-0">
                            <BrandLogo brandId={bg.brandId} className="w-3.5 h-3.5" />
                          </div>
                          <span className="font-bold text-slate-800 dark:text-white/80">{bg.name}</span>
                        </div>
                        <span className="font-mono text-slate-500 dark:text-white/50 text-[11px]">
                          ${bg.valueUSD} ({bg.count}x)
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-white/5 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${percent}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Recent Trades list */}
          <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-none pr-0.5">
            <span className="text-[10px] uppercase font-mono font-semibold tracking-wider text-slate-400 dark:text-white/40 block pl-0.5">
              Last 7 Days Exchanges ({stats.weeklyTrades.length})
            </span>

            {stats.weeklyTrades.length === 0 ? (
              <div className="text-center py-6 border border-dashed border-slate-200 dark:border-white/5 rounded-xl bg-slate-50 dark:bg-white/5 text-[10px] text-slate-400 dark:text-white/40 font-medium">
                All done! Try trading a card instantly to generate report traces.
              </div>
            ) : (
              <div className="space-y-1.5">
                {stats.weeklyTrades.map(t => (
                  <div 
                    key={t.id} 
                    className="flex justify-between items-center p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                  >
                    <div>
                      <div className="text-[11px] font-bold text-slate-900 dark:text-white">{t.brandName}</div>
                      <span className="text-[9px] text-slate-500 dark:text-white/40 font-mono">
                        ${t.cardValue} @ {t.currencyOutput === Currency.NGN ? '₦' : 'GH₵'}{t.rate}/$
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {t.currencyOutput === Currency.NGN ? '₦' : 'GH₵'}{t.payoutAmount.toLocaleString()}
                      </div>
                      <span className="text-[8px] text-slate-400 dark:text-white/30 block capitalize">
                        {t.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer message */}
          <div className="mt-5 pt-3.5 border-t border-slate-200 dark:border-white/5 text-center flex items-center justify-center gap-1 pb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
            <span className="text-[10px] text-slate-500 dark:text-white/50 leading-none">
              Your points and stats are fully audited and backed by absolute payout secure receipts.
            </span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
