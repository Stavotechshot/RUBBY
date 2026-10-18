import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  Trash2, 
  TrendingUp, 
  Plus, 
  Check, 
  AlertTriangle,
  RotateCw,
  Sparkles,
  Zap,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Currency, GiftCardBrand, SUPPORTED_BRANDS, RateAlert } from '../types';
import BrandLogo from './BrandLogo';

function BrandSparkline({ currentRate, brandId, currency }: { currentRate: number; brandId: string; currency: Currency }) {
  // Seeded mock data for the 24h fluctuation
  const points = useMemo(() => {
    const seed = brandId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const numPoints = 12;
    const data = [];
    for (let i = 0; i < numPoints; i++) {
      // Create a nice wave using sine and seed noise
      const noise = Math.sin(i * 0.8 + seed) * 0.04 + Math.cos(i * 0.5 - seed) * 0.02;
      // The last point matches the current rate
      const factor = i === numPoints - 1 ? 1 : 1 + noise;
      data.push(currentRate * factor);
    }
    return data;
  }, [currentRate, brandId]);

  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min === 0 ? 1 : max - min;

  // Generate SVG coordinate points
  const width = 64;
  const height = 24;
  const padding = 2;
  
  const svgPoints = points.map((val, index) => {
    const x = (index / (points.length - 1)) * (width - 2 * padding) + padding;
    const y = height - ((val - min) / range) * (height - 2 * padding) - padding;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const isUp = points[points.length - 1] >= points[0];

  return (
    <div className="flex items-center gap-2" title="24-hour rate fluctuation sparkline">
      <svg width={width} height={height} className="overflow-visible opacity-85 hover:opacity-100 transition-opacity">
        <defs>
          <linearGradient id={`grad-${brandId}-${currency}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={isUp ? "#10b981" : "#e11d48"} stopOpacity="0.25" />
            <stop offset="100%" stopColor={isUp ? "#10b981" : "#e11d48"} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Filled Area */}
        <path
          d={`M ${svgPoints[0].split(',')[0]},${height} L ${svgPoints.join(' L ')} L ${svgPoints[svgPoints.length - 1].split(',')[0]},${height} Z`}
          fill={`url(#grad-${brandId}-${currency})`}
          stroke="none"
        />
        {/* Sparkline path */}
        <path
          d={`M ${svgPoints.join(' L ')}`}
          fill="none"
          stroke={isUp ? "#10b981" : "#e11d48"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* End point dot */}
        <circle
          cx={svgPoints[svgPoints.length - 1].split(',')[0]}
          cy={svgPoints[svgPoints.length - 1].split(',')[1]}
          r="2"
          fill={isUp ? "#10b981" : "#e11d48"}
          className="animate-pulse"
        />
      </svg>
      <span className={`text-[9px] font-mono font-extrabold ${isUp ? "text-emerald-500" : "text-rose-500"}`}>
        {isUp ? "▲" : "▼"}{((Math.abs(points[points.length - 1] - points[0]) / points[0]) * 100).toFixed(1)}%
      </span>
    </div>
  );
}

const EmptyAlertsGraphic = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center space-y-3.5 border border-dashed border-slate-200 dark:border-white/10 rounded-2xl bg-slate-50 dark:bg-white/[0.02]">
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* Sonar rings */}
        <motion.div
          animate={{ scale: [0.8, 1.8, 1.8, 0.8], opacity: [0, 0.25, 0, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full bg-rose-500/20 border border-rose-500/30"
        />
        <motion.div
          animate={{ scale: [0.8, 1.4, 1.4, 0.8], opacity: [0, 0.4, 0, 0] }}
          transition={{ duration: 3, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full bg-rose-500/10 border border-rose-500/20"
        />
        {/* Floating visual alert icon */}
        <motion.div
          animate={{ 
            rotate: [0, -10, 10, -10, 10, 0],
            y: [0, -3, 0, -3, 0] 
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            repeatType: 'reverse', 
            ease: 'easeInOut' 
          }}
          className="relative bg-white dark:bg-[#131A2E] border border-slate-200 dark:border-white/10 rounded-2xl p-3 shadow-md dark:shadow-xl z-10"
        >
          <Bell className="w-5.5 h-5.5 text-rose-500 fill-rose-500/15" />
          
          <motion.div
            animate={{ scale: [0.6, 1.2, 0.6], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white dark:border-black"
          />
        </motion.div>
      </div>

      <div className="max-w-[260px] space-y-1">
        <p className="text-xs font-extrabold text-slate-900 dark:text-white">No active triggers set</p>
        <p className="text-[10px] text-slate-500 dark:text-white/40 leading-relaxed font-medium">
          Once market rates hit your configured threshold values, we will notify you instantly and record the logs.
        </p>
      </div>
    </div>
  );
};

interface RateAlertsProps {
  alerts: RateAlert[];
  onAddAlert: (alert: Omit<RateAlert, 'id' | 'createdAt'>) => void;
  onDeleteAlert: (id: string) => void;
  onToggledAlert: (id: string, active: boolean) => void;
  liveRates: Record<string, { NGN: number; GHS: number }>;
  onRatesUpdate: (newRates: Record<string, { NGN: number; GHS: number }>) => void;
  triggerSystemNotification: (title: string, body: string) => void;
}

export default function RateAlerts({
  alerts,
  onAddAlert,
  onDeleteAlert,
  onToggledAlert,
  liveRates,
  onRatesUpdate,
  triggerSystemNotification
}: RateAlertsProps) {
  // Form State
  const [selectedBrandId, setSelectedBrandId] = useState(SUPPORTED_BRANDS[0].id);
  const [currency, setCurrency] = useState<Currency>(Currency.NGN);
  const [targetRate, setTargetRate] = useState('');
  const [condition, setCondition] = useState<'above' | 'below'>('above');
  
  // Market simulation states
  const [isSimulatingMarket, setIsSimulatingMarket] = useState(false);
  const [lastChangelog, setLastChangelog] = useState<{name: string, diff: number, currency: Currency}[]>([]);

  // Periodically fluctuate rates if simulation is active
  useEffect(() => {
    if (!isSimulatingMarket) return;

    const interval = setInterval(() => {
      const changes: typeof lastChangelog = [];
      const updatedRates = { ...liveRates };

      SUPPORTED_BRANDS.forEach(brand => {
        // Randomly choose NGN or GHS to fluctuate
        const currToModify = Math.random() > 0.5 ? Currency.NGN : Currency.GHS;
        const currentVal = updatedRates[brand.id][currToModify];
        
        // Fluctuate by -2.5% to +4.5% (slight bias towards high rates!)
        const percentChange = (Math.random() * 7 - 2.5) / 100;
        const rawDiff = Math.round(currentVal * percentChange);
        const nextVal = currentVal + (rawDiff === 0 ? (percentChange > 0 ? 1 : -1) : rawDiff);
        
        updatedRates[brand.id] = {
          ...updatedRates[brand.id],
          [currToModify]: Math.max(10, nextVal)
        };

        if (percentChange > 0.01 || percentChange < -0.01) {
          changes.push({
            name: brand.name,
            diff: rawDiff,
            currency: currToModify
          });
        }

        // Test active alerts for this brand code
        alerts.forEach(alert => {
          if (alert.isActive && alert.brandId === brand.id && alert.currency === currToModify) {
            const isAb = alert.condition === 'above' && nextVal >= alert.targetRate;
            const isBe = alert.condition === 'below' && nextVal <= alert.targetRate;
            
            if (isAb || isBe) {
              triggerSystemNotification(
                `🔔 Rate Target Met for ${brand.name}!`,
                `The exchange fee for ${brand.name} has hit ${currToModify === Currency.NGN ? '₦' : 'GH₵'}${nextVal}/${currencySymbol(currToModify)}. (Target alert was set at ${alert.condition} ${alert.targetRate})`
              );
              // Deactivate alert so it doesn't repeatedly spam the UI
              onToggledAlert(alert.id, false);
            }
          }
        });
      });

      onRatesUpdate(updatedRates);
      if (changes.length > 0) {
        setLastChangelog(changes.slice(0, 3));
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [isSimulatingMarket, liveRates, alerts, onRatesUpdate]);

  const currencySymbol = (c: Currency) => c === Currency.NGN ? '₦' : 'GH₵';

  const selectedBrandObj = SUPPORTED_BRANDS.find(b => b.id === selectedBrandId) || SUPPORTED_BRANDS[0];

  const handleAddAlertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rateVal = parseFloat(targetRate);
    if (isNaN(rateVal) || rateVal <= 0) return;

    onAddAlert({
      brandId: selectedBrandId,
      brandName: selectedBrandObj.name,
      targetRate: rateVal,
      currency,
      condition,
      isActive: true
    });

    setTargetRate('');
  };

  return (
    <div className="bg-white dark:bg-[#0E1322] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 shadow-xl space-y-5 text-slate-900 dark:text-white transition-colors">
      
      {/* Dynamic Alert Banner */}
      <div className="flex items-center justify-between pointer-events-auto">
        <div>
          <span className="text-slate-500 dark:text-white/40 font-bold text-[10px] tracking-widest uppercase flex items-center gap-1.5">
            <Bell className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-bounce" />
            Rate Target Notifications
          </span>
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">
            Smart Rate Target Alert
          </h3>
        </div>

        {/* Live Simulation Market Toggle Switch */}
        <button
          type="button"
          onClick={() => setIsSimulatingMarket(!isSimulatingMarket)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-bold border transition cursor-pointer ${
            isSimulatingMarket 
              ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400' 
              : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/50 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <RotateCw className={`w-3.5 h-3.5 ${isSimulatingMarket ? 'animate-spin' : ''}`} />
          {isSimulatingMarket ? 'Simulating Live Feeds' : 'Simulate Rates'}
        </button>
      </div>

      {isSimulatingMarket && lastChangelog.length > 0 && (
        <div className="bg-slate-50 dark:bg-white/5 p-2.5 rounded-xl border border-slate-200 dark:border-white/10">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 block mb-1">Live Rate Fluctuations Ticker</span>
          <div className="space-y-1">
            {lastChangelog.map((change, idx) => (
              <div key={idx} className="flex justify-between items-center text-[11px] font-mono">
                <span className="text-slate-600 dark:text-white/50">{change.name} ({change.currency})</span>
                <span className={`flex items-center transition ${change.diff >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-500'}`}>
                  {change.diff >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {change.diff >= 0 ? '+' : ''}{change.diff}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Target Setter Form */}
      <form onSubmit={handleAddAlertSubmit} className="space-y-3.5 bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-200 dark:border-white/10">
        <div className="grid grid-cols-2 gap-2.5">
          {/* Brand select */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="block text-[10px] font-bold text-slate-500 dark:text-white/50">Card Brand</label>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded bg-white dark:bg-black/40 flex items-center justify-center p-0.5 border border-slate-200 dark:border-white/10">
                  <BrandLogo brandId={selectedBrandId} className="w-3 h-3 text-slate-800 dark:text-white" />
                </div>
                <span className="text-[10px] text-rose-600 dark:text-rose-400 font-mono font-bold truncate max-w-[90px]">{selectedBrandObj.name.split(' ')[0]}</span>
              </div>
            </div>
            <select
              value={selectedBrandId}
              onChange={(e) => setSelectedBrandId(e.target.value)}
              className="w-full text-xs px-2.5 py-1.5 border border-slate-200 dark:border-white/10 rounded-lg bg-white dark:bg-zinc-950 text-slate-900 dark:text-white focus:outline-none"
            >
              {SUPPORTED_BRANDS.map(brand => (
                <option key={brand.id} value={brand.id} className="bg-white dark:bg-zinc-950 text-slate-900 dark:text-white">{brand.name}</option>
              ))}
            </select>
          </div>

          {/* Currency select */}
          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-slate-500 dark:text-white/50">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="w-full text-xs px-2.5 py-1.5 border border-slate-200 dark:border-white/10 rounded-lg bg-white dark:bg-zinc-950 text-slate-900 dark:text-white focus:outline-none"
            >
              <option value={Currency.NGN} className="bg-white dark:bg-zinc-950 text-slate-900 dark:text-white">NGN (₦)</option>
              <option value={Currency.GHS} className="bg-white dark:bg-zinc-950 text-slate-900 dark:text-white">GHS (GH₵)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Condition Select */}
          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-slate-500 dark:text-white/50">Condition</label>
            <div className="flex bg-slate-200/60 dark:bg-zinc-950 rounded-lg border border-slate-200 dark:border-white/10 p-0.5">
              <button
                type="button"
                onClick={() => setCondition('above')}
                className={`flex-1 py-1 text-center rounded text-[10px] font-bold transition cursor-pointer ${
                  condition === 'above' 
                    ? 'bg-rose-600 text-white shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900 dark:text-white/50 dark:hover:text-white'
                }`}
              >
                Goes Above
              </button>
              <button
                type="button"
                onClick={() => setCondition('below')}
                className={`flex-1 py-1 text-center rounded text-[10px] font-bold transition cursor-pointer ${
                  condition === 'below' 
                    ? 'bg-rose-600 text-white shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900 dark:text-white/50 dark:hover:text-white'
                }`}
              >
                Goes Below
              </button>
            </div>
          </div>

          {/* Rate Target Value Input */}
          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-slate-500 dark:text-white/50">
              Rate Threshold ({currencySymbol(currency)})
            </label>
            <input
              type="number"
              required
              value={targetRate}
              onChange={(e) => setTargetRate(e.target.value)}
              placeholder={`Current: ${liveRates[selectedBrandId][currency]}`}
              className="w-full text-xs px-2.5 py-1.5 border border-slate-200 dark:border-white/10 rounded-lg bg-white dark:bg-white/5 text-slate-900 dark:text-white focus:outline-none font-bold"
            />
          </div>
        </div>

        <button
          type="submit"
          id="btn-add-rate-target"
          className="w-full bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs py-2 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-rose-600/20"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Rate Target Trigger
        </button>
      </form>

      {/* Current Active Alerts Grid List */}
      <div>
        <h4 className="text-xs font-extrabold text-slate-800 dark:text-white/80 mb-2.5 flex items-center gap-1.5">
          <span>Your Alerts Tally</span>
          <span className="bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-white px-2 py-0.5 rounded-full text-[10px] font-mono font-bold">
            {alerts.length}
          </span>
        </h4>

        {alerts.length === 0 ? (
          <EmptyAlertsGraphic />
        ) : (
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            <AnimatePresence>
              {alerts.map(alert => {
                const currentRate = liveRates[alert.brandId]?.[alert.currency] || alert.targetRate;
                return (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-xs text-slate-900 dark:text-white gap-2 shadow-xs dark:shadow-none"
                  >
                    <div className="flex items-center gap-2.5 min-w-[120px]">
                      <div className="w-7 h-7 rounded-lg bg-white dark:bg-black/50 border border-slate-200 dark:border-white/10 flex items-center justify-center p-1 shrink-0">
                        <BrandLogo brandId={alert.brandId} className="w-4 h-4 text-slate-800 dark:text-white" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold truncate">{alert.brandName}</span>
                        <span className="text-[10px] text-slate-500 dark:text-white/40 font-mono">
                          When {alert.condition === 'above' ? '≥' : '≤'} {currencySymbol(alert.currency)}{alert.targetRate}/Unit
                        </span>
                      </div>
                    </div>

                    {/* Small Inline Sparkline Chart */}
                    <div className="flex-1 flex justify-center">
                      <BrandSparkline currentRate={currentRate} brandId={alert.brandId} currency={alert.currency} />
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => onToggledAlert(alert.id, !alert.isActive)}
                        className={`px-2.5 py-1 text-[9px] font-bold rounded-full transition cursor-pointer ${
                          alert.isActive
                            ? 'bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/35 text-rose-600 dark:text-rose-400'
                            : 'bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-400 dark:text-white/20'
                        }`}
                      >
                        {alert.isActive ? (
                          <span className="flex items-center gap-1">
                            <Check className="w-2.5 h-2.5" />
                            Armed
                          </span>
                        ) : (
                          <span>Muted</span>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => onDeleteAlert(alert.id)}
                        className="p-1 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded transition cursor-pointer bg-transparent border-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
