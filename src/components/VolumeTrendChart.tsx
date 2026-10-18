import { useMemo } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { TrendingUp, BarChart3, Calendar, ArrowUpRight } from 'lucide-react';
import { Trade } from '../types';

interface VolumeTrendChartProps {
  trades: Trade[];
}

export default function VolumeTrendChart({ trades }: VolumeTrendChartProps) {
  
  // Calculate rolling 7 days of completed trades volume
  const chartData = useMemo(() => {
    const data = [];
    const now = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      const label = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      
      const dayTrades = trades.filter(t => {
        if (t.status !== 'completed') return false;
        const tradeDate = new Date(t.createdAt);
        return tradeDate.toDateString() === d.toDateString();
      });
      
      const volume = dayTrades.reduce((sum, t) => sum + t.cardValue, 0);
      
      const ngnVolumeUSD = dayTrades.filter(t => t.currencyOutput === 'NGN').reduce((sum, t) => sum + t.cardValue, 0);
      const ngnPayout = dayTrades.filter(t => t.currencyOutput === 'NGN').reduce((sum, t) => sum + t.payoutAmount, 0);
      
      const ghsVolumeUSD = dayTrades.filter(t => t.currencyOutput === 'GHS').reduce((sum, t) => sum + t.cardValue, 0);
      const ghsPayout = dayTrades.filter(t => t.currencyOutput === 'GHS').reduce((sum, t) => sum + t.payoutAmount, 0);
      
      data.push({
        name: label,
        volume: volume,
        count: dayTrades.length,
        ngnVolumeUSD,
        ngnPayout,
        ghsVolumeUSD,
        ghsPayout
      });
    }
    return data;
  }, [trades]);

  // Aggregate stats
  const total7DayVolume = useMemo(() => {
    return chartData.reduce((sum, d) => sum + d.volume, 0);
  }, [chartData]);

  const total7DayTrades = useMemo(() => {
    return chartData.reduce((sum, d) => sum + d.count, 0);
  }, [chartData]);

  const avgTradeValue = useMemo(() => {
    return total7DayTrades > 0 ? Math.round(total7DayVolume / total7DayTrades) : 0;
  }, [total7DayVolume, total7DayTrades]);

  // Custom high-fidelity interactive Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 p-3.5 rounded-2xl shadow-2xl space-y-2 text-slate-900 dark:text-white min-w-[210px]">
          <div>
            <p className="text-[9px] text-slate-400 dark:text-white/40 font-extrabold uppercase tracking-widest font-mono">
              Date: {data.name}
            </p>
            <p className="text-sm font-black text-rose-600 dark:text-rose-400 mt-0.5">
              Volume: ${payload[0].value.toLocaleString()} USD
            </p>
          </div>

          <div className="border-t border-slate-200 dark:border-white/5 pt-2 space-y-1.5 text-xs">
            <span className="block text-[8px] uppercase text-slate-400 dark:text-white/40 font-extrabold font-mono tracking-wider">
              Currency Breakdown
            </span>
            
            {/* NGN trades breakdown */}
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-white/60 font-medium">🇳🇬 Naira (NGN):</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                {data.ngnPayout > 0 
                  ? `₦${data.ngnPayout.toLocaleString()}` 
                  : '₦0'}
              </span>
            </div>

            {/* GHS trades breakdown */}
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-white/60 font-medium">🇬🇭 Cedis (GHS):</span>
              <span className="font-bold text-amber-600 dark:text-amber-400 font-mono">
                {data.ghsPayout > 0 
                  ? `GH₵${data.ghsPayout.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 })}` 
                  : 'GH₵0'}
              </span>
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-white/5 pt-1.5 flex items-center justify-between text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-200 dark:border-emerald-500/20">
            <span className="flex items-center gap-1.5 font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {data.count} Completed trades
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-[#0E1322] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 shadow-xl space-y-4 text-slate-900 dark:text-white transition-colors">
      
      {/* Header section with brand tags */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-slate-400 dark:text-white/40 font-bold text-[10px] tracking-widest uppercase flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5 text-rose-500" />
            Performance Insights
          </span>
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">
            7-Day Trading Volume Trend
          </h3>
        </div>

        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border border-rose-200 dark:border-rose-500/20 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400">
          <TrendingUp className="w-3 h-3" />
          <span>Volume Tracker</span>
        </div>
      </div>

      {/* Aggregate Stats Bar */}
      <div className="grid grid-cols-3 gap-2 bg-slate-50 dark:bg-white/[0.04] p-3 rounded-2xl border border-slate-200 dark:border-white/5 text-center">
        <div>
          <span className="text-[9px] text-slate-500 dark:text-white/40 tracking-wider block font-mono uppercase font-semibold">7D Volume</span>
          <span className="text-sm font-black font-sans tracking-tight block mt-0.5 text-slate-900 dark:text-white">
            ${total7DayVolume.toLocaleString()}
          </span>
        </div>
        <div>
          <span className="text-[9px] text-slate-500 dark:text-white/40 tracking-wider block font-mono uppercase font-semibold">Claims Paid</span>
          <span className="text-sm font-black font-sans tracking-tight block mt-0.5 text-emerald-600 dark:text-emerald-400">
            {total7DayTrades} Trades
          </span>
        </div>
        <div>
          <span className="text-[9px] text-slate-500 dark:text-white/40 tracking-wider block font-mono uppercase font-semibold">Avg Ticket</span>
          <span className="text-sm font-black font-sans tracking-tight block mt-0.5 text-rose-600 dark:text-rose-400">
            ${avgTradeValue}
          </span>
        </div>
      </div>

      {/* Recharts Glowing Line/Area Graph Container */}
      <div className="h-44 w-full relative select-none">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="volTrendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(225, 29, 72)" stopOpacity={0.35}/>
                <stop offset="95%" stopColor="rgb(225, 29, 72)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.15)" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="#94a3b8" 
              fontSize={9}
              tickLine={false}
              axisLine={false}
              dy={8}
              fontFamily="JetBrains Mono, monospace"
            />
            <YAxis 
              stroke="#94a3b8" 
              fontSize={9}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
              fontFamily="JetBrains Mono, monospace"
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(225, 29, 72, 0.2)', strokeWidth: 1 }} />
            <Area 
              type="monotone" 
              dataKey="volume" 
              stroke="#e11d48" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#volTrendGradient)"
              activeDot={{ r: 5, stroke: '#e11d48', strokeWidth: 2, fill: '#fda4af' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-white/40 leading-relaxed justify-center font-medium">
        <Calendar className="w-3.5 h-3.5" />
        <span>Refreshed live based on trades verified in real-time</span>
      </div>

    </div>
  );
}
