import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  CreditCard, 
  Building2, 
  TrendingUp, 
  Layers, 
  ChevronDown, 
  ShieldCheck, 
  MessageSquare, 
  Trophy, 
  Lock, 
  Scale, 
  Moon, 
  Sun, 
  Search,
  Sparkles,
  Award,
  X,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  Menu,
  Activity,
  ArrowRightLeft,
  Bell,
  BellRing,
  Trash2,
  Plus,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Currency, RateAlert } from '../types';
import RubbyLogo, { RubbyVectorMark } from './RubbyLogo';
import BrandLogo from './BrandLogo';
import { WorkspaceView } from '../App';

interface HeaderProps {
  activeView: WorkspaceView;
  onSelectView: (view: WorkspaceView) => void;
  isLightMode: boolean;
  onToggleTheme: () => void;
  globalPayoutCurrency: Currency;
  onChangeCurrency: (curr: Currency) => void;
  onOpenDueDiligence: () => void;
  userTradeVolume?: number;
  rubbyPoints?: number;
  rateAlerts?: RateAlert[];
  liveRates?: Record<string, { NGN: number; GHS: number }>;
  onDeleteAlert?: (id: string) => void;
  onToggleAlert?: (id: string, active: boolean) => void;
  onSimulatePriceSpike?: () => void;
}

export default function Header({
  activeView,
  onSelectView,
  isLightMode,
  onToggleTheme,
  globalPayoutCurrency,
  onChangeCurrency,
  onOpenDueDiligence,
  userTradeVolume = 1200,
  rubbyPoints = 250,
  rateAlerts = [],
  liveRates = {},
  onDeleteAlert,
  onToggleAlert,
  onSimulatePriceSpike
}: HeaderProps) {
  const [isSolutionsMenuOpen, setIsSolutionsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAlertsMenuOpen, setIsAlertsMenuOpen] = useState(false);
  const [dismissedAlertIds, setDismissedAlertIds] = useState<string[]>([]);

  // Calculate triggered rate alerts based on live market movements
  const triggeredAlerts = useMemo(() => {
    return rateAlerts.filter(alert => {
      if (!alert.isActive || dismissedAlertIds.includes(alert.id)) return false;
      const brandRate = liveRates[alert.brandId];
      if (!brandRate) return false;
      const currentRate = alert.currency === Currency.NGN ? brandRate.NGN : brandRate.GHS;
      if (alert.condition === 'above') {
        return currentRate >= alert.targetRate;
      } else {
        return currentRate <= alert.targetRate;
      }
    });
  }, [rateAlerts, liveRates, dismissedAlertIds]);

  const handleDismissAlert = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDismissedAlertIds(prev => [...prev, id]);
  };

  // Minimalist High-Finance Core Navigation: 5 clean, uncluttered anchors
  const highFinanceNav: { id: WorkspaceView; label: string; tag?: string }[] = [
    { id: 'exchange', label: 'Exchange' },
    { id: 'cards_catalog', label: 'Card Vault', tag: 'Live' },
    { id: 'accounts', label: 'Banking & Rails' },
    { id: 'rates', label: 'Market Rates' },
    { id: 'ledger', label: 'Activity Ledger' },
  ];

  const institutionalDirectory = [
    {
      group: 'Institutional Liquidity & Trading',
      items: [
        { 
          id: 'cards_catalog', 
          label: 'Retail Card Vault & Specs', 
          desc: 'Inspect genuine physical card specimens and merchant rates', 
          icon: <CreditCard className="w-4 h-4 text-rose-500" /> 
        },
        { 
          id: 'whatsapp_bot', 
          label: 'WhatsApp OTC Liquidity Desk', 
          desc: 'Private high-net-worth desk with up to $50,000 single execution', 
          icon: <MessageSquare className="w-4 h-4 text-emerald-500" />, 
          badge: '$50k OTC' 
        },
        { 
          id: 'comparison', 
          label: 'Market Spread Benchmark', 
          desc: 'Transparent real-time spread analysis against peer desks', 
          icon: <Scale className="w-4 h-4 text-sky-400" /> 
        },
      ]
    },
    {
      group: 'Governance, Rails & Compliance',
      items: [
        { 
          id: 'kyc', 
          label: 'Tiered KYC Compliance', 
          desc: 'Automated BVN/NIN identity verification and account limits', 
          icon: <ShieldCheck className="w-4 h-4 text-emerald-500" />, 
          badge: 'Tier 2 Active' 
        },
        { 
          id: 'security', 
          label: 'Cryptographic Security & 2FA', 
          desc: 'Hardware PIN protection and multi-factor withdrawal verification', 
          icon: <Lock className="w-4 h-4 text-rose-400" /> 
        },
        { 
          id: 'vip', 
          label: 'VIP Traders League', 
          desc: 'Volume league tournament with monthly ₦250k prize pool', 
          icon: <Trophy className="w-4 h-4 text-amber-400" />, 
          badge: 'Rank #4' 
        },
      ]
    }
  ];

  const handleMobileNavSelect = (view: WorkspaceView) => {
    onSelectView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-40 border-b transition-colors backdrop-blur-2xl ${
      isLightMode 
        ? 'bg-white/95 border-slate-200/90 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)]' 
        : 'bg-[#080A12]/95 border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.6)]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between gap-4 lg:gap-8">
        
        {/* 1. PRONOUNCED INSTITUTIONAL BRANDING AREA */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <button 
            type="button"
            onClick={() => onSelectView('overview')}
            className="flex items-center gap-3 sm:gap-3.5 text-left group cursor-pointer focus:outline-hidden py-1"
            title="Rubby Financial Technologies - Institutional Asset Exchange"
          >
            {/* Pronounced Vector Emblem with Ambient Rose Luster */}
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 rounded-2xl blur-[8px] opacity-35 group-hover:opacity-75 transition duration-300" />
              <div className="relative w-full h-full flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
                <RubbyVectorMark className="w-full h-full" isLightMode={isLightMode} />
              </div>
            </div>

            {/* Pronounced Institutional Wordmark & Moniker */}
            <div className="flex flex-col select-none">
              <div className="flex items-center gap-1.5 sm:gap-2 leading-none">
                <span className={`text-xl sm:text-2xl font-black tracking-[0.16em] font-sans ${
                  isLightMode ? 'text-slate-950' : 'text-white'
                }`}>
                  RUBBY
                </span>
                
                {/* Precision Ruby Diamond Pip */}
                <span className="w-1.5 h-1.5 rotate-45 bg-gradient-to-r from-rose-500 to-amber-500 rounded-[1px] shadow-sm shadow-rose-500/80 inline-block" />
                
                <span className="hidden sm:inline-flex px-1.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider bg-rose-500/10 text-rose-500 dark:text-rose-400 border border-rose-500/20">
                  Institutional
                </span>
              </div>
              <span className={`text-[8.5px] sm:text-[9.5px] font-bold tracking-[0.24em] uppercase font-sans mt-0.5 leading-none ${
                isLightMode ? 'text-slate-500' : 'text-rose-400/90'
              }`}>
                Liquidity & Rails
              </span>
            </div>
          </button>

          {/* Stately Hairline Divider */}
          <div className="hidden xl:block h-6 w-px bg-slate-200 dark:bg-white/10 ml-1" />

          {/* Live Operational SLA Chip */}
          <div className="hidden xl:flex items-center gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400 pl-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] tracking-wide">
              Rail SLA: <strong className="text-emerald-500 font-bold">99.98%</strong>
            </span>
          </div>
        </div>

        {/* 2. MINIMALIST, HIGH-FINANCE CLEAN NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {highFinanceNav.map(item => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectView(item.id)}
                className={`px-3.5 py-2 rounded-xl text-xs tracking-tight transition-all cursor-pointer relative flex items-center gap-1.5 ${
                  isActive
                    ? isLightMode
                      ? 'text-rose-700 bg-rose-50 font-bold shadow-xs'
                      : 'text-white bg-white/10 font-bold shadow-xs'
                    : isLightMode
                      ? 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/70 font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-white/5 font-semibold'
                }`}
              >
                <span>{item.label}</span>
                {item.tag && (
                  <span className="text-[8px] font-mono font-bold px-1 py-0.2 rounded bg-emerald-500/15 text-emerald-500">
                    {item.tag}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-rose-600 dark:bg-rose-500" />
                )}
              </button>
            );
          })}

          {/* Institutional Solutions Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsSolutionsMenuOpen(prev => !prev)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-tight transition-all cursor-pointer ${
                ['kyc', 'whatsapp_bot', 'vip', 'security', 'comparison', 'wallets'].includes(activeView)
                  ? 'text-rose-500 bg-rose-500/10 font-bold'
                  : isLightMode
                    ? 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/70'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>Solutions</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isSolutionsMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Mega Dropdown Panel */}
            <AnimatePresence>
              {isSolutionsMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsSolutionsMenuOpen(false)} 
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    className={`absolute top-full right-0 mt-2.5 w-[520px] p-4 rounded-3xl border shadow-2xl z-50 backdrop-blur-2xl ${
                      isLightMode ? 'bg-white/98 border-slate-200' : 'bg-[#0B0E1B]/98 border-white/10'
                    }`}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {institutionalDirectory.map(cat => (
                        <div key={cat.group} className="space-y-2">
                          <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 font-mono">
                            {cat.group}
                          </h4>
                          <div className="space-y-1">
                            {cat.items.map(item => (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => {
                                  onSelectView(item.id as WorkspaceView);
                                  setIsSolutionsMenuOpen(false);
                                }}
                                className={`w-full text-left p-2.5 rounded-2xl transition cursor-pointer flex items-start gap-2.5 ${
                                  activeView === item.id
                                    ? 'bg-rose-500/15 text-rose-500 font-bold'
                                    : isLightMode ? 'hover:bg-slate-100 text-slate-800' : 'hover:bg-white/5 text-slate-200'
                                }`}
                              >
                                <div className="p-1.5 rounded-xl bg-black/5 dark:bg-white/5 shrink-0 mt-0.5">
                                  {item.icon}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between gap-1">
                                    <span className="text-xs font-bold block truncate">{item.label}</span>
                                    {item.badge && (
                                      <span className="text-[8px] font-mono px-1.5 py-0.2 rounded-md bg-emerald-500/15 text-emerald-500 font-bold shrink-0">
                                        {item.badge}
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[10px] text-slate-400 block line-clamp-1">{item.desc}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Mega-Menu Institutional Deck Link */}
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between px-2 text-xs">
                      <button
                        type="button"
                        onClick={() => {
                          onOpenDueDiligence();
                          setIsSolutionsMenuOpen(false);
                        }}
                        className="text-rose-500 hover:text-rose-600 font-bold flex items-center gap-1.5 cursor-pointer text-[11px]"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Inspect Institutional Due Diligence Deck</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* 3. REFINED UTILITY CONTROLS: SEARCH, CURRENCY, THEME, PRICE ALERT BELL & PROFILE */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Quick Audit Trail / Search Button */}
          <button
            type="button"
            onClick={() => onSelectView('ledger')}
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-[11px] font-mono transition cursor-pointer ${
              isLightMode 
                ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600' 
                : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-400 hover:text-white'
            }`}
            title="Search Ledger & Receipts (⌘K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="text-[10px] tracking-wide">⌘K</span>
          </button>

          {/* Minimalist Dual-Currency Segmented Toggle */}
          <div className={`flex items-center p-0.5 rounded-xl border ${
            isLightMode ? 'bg-slate-100 border-slate-200' : 'bg-white/5 border-white/10'
          }`}>
            <button
              type="button"
              onClick={() => onChangeCurrency(Currency.NGN)}
              className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold font-mono transition cursor-pointer ${
                globalPayoutCurrency === Currency.NGN
                  ? 'bg-rose-600 text-white shadow-xs'
                  : isLightMode ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
              }`}
              title="Liquidate in Nigerian Naira (NGN)"
            >
              ₦<span className="hidden sm:inline"> NGN</span>
            </button>
            <button
              type="button"
              onClick={() => onChangeCurrency(Currency.GHS)}
              className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold font-mono transition cursor-pointer ${
                globalPayoutCurrency === Currency.GHS
                  ? 'bg-rose-600 text-white shadow-xs'
                  : isLightMode ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
              }`}
              title="Liquidate in Ghanaian Cedis (GHS)"
            >
              GH₵<span className="hidden sm:inline"> GHS</span>
            </button>
          </div>

          {/* Theme Toggle Button */}
          <button
            type="button"
            id="global-theme-toggle-btn"
            onClick={onToggleTheme}
            className={`w-9 h-9 rounded-xl flex items-center justify-center border transition cursor-pointer ${
              isLightMode 
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700' 
                : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
            }`}
            title={isLightMode ? "Switch to Obsidian Dark" : "Switch to Platinum Light"}
          >
            {isLightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          {/* 🔔 VISUAL 'PRICE ALERT' NOTIFICATION BELL ICON (PULSES ON TRIGGER) */}
          <div className="relative">
            <button
              type="button"
              id="header-price-alerts-bell"
              onClick={() => setIsAlertsMenuOpen(prev => !prev)}
              className={`relative w-9 h-9 rounded-xl flex items-center justify-center border transition cursor-pointer ${
                triggeredAlerts.length > 0 
                  ? 'bg-rose-500/15 border-rose-500/50 text-rose-500 shadow-md shadow-rose-500/25 ring-2 ring-rose-500/20' 
                  : isLightMode 
                    ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700' 
                    : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
              }`}
              title={
                triggeredAlerts.length > 0
                  ? `🚀 Rate Target Hit! (${triggeredAlerts.length} Active Alert Triggered)`
                  : 'Market Price Movement Alerts'
              }
            >
              {triggeredAlerts.length > 0 ? (
                <BellRing className="w-4 h-4 text-rose-500 animate-bounce" />
              ) : (
                <Bell className="w-4 h-4" />
              )}

              {/* Glowing Pulse Aura when Rate Alert is Triggered */}
              {triggeredAlerts.length > 0 && (
                <>
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-500 animate-ping opacity-80 pointer-events-none" />
                  <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-600 text-white font-mono font-black text-[9px] flex items-center justify-center border-2 border-white dark:border-[#080A12] shadow-md shadow-rose-600/50">
                    {triggeredAlerts.length}
                  </span>
                </>
              )}

              {/* Gentle indicator when active alerts exist but not yet triggered */}
              {triggeredAlerts.length === 0 && rateAlerts.some(a => a.isActive) && (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 ring-1 ring-white dark:ring-black" />
              )}
            </button>

            {/* Price Alerts Dropdown Menu */}
            <AnimatePresence>
              {isAlertsMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsAlertsMenuOpen(false)} 
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    className={`absolute top-full right-0 mt-2.5 w-80 sm:w-96 p-4 rounded-3xl border shadow-2xl z-50 backdrop-blur-2xl ${
                      isLightMode ? 'bg-white/98 border-slate-200' : 'bg-[#0B0E1B]/98 border-white/10'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-rose-500" />
                        <span className="text-xs font-bold text-slate-900 dark:text-white font-sans">
                          Market Price Alerts
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live Ticker Active
                      </span>
                    </div>

                    {/* Section 1: TRIGGERED ALERTS BANNER (TARGET HIT!) */}
                    {triggeredAlerts.length > 0 && (
                      <div className="my-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 font-mono flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            Target Price Reached!
                          </span>
                          <span className="text-[9px] font-mono text-slate-400">
                            {triggeredAlerts.length} triggered
                          </span>
                        </div>

                        {triggeredAlerts.map(alert => {
                          const currentBrandRate = liveRates[alert.brandId];
                          const liveVal = currentBrandRate 
                            ? alert.currency === Currency.NGN ? currentBrandRate.NGN : currentBrandRate.GHS 
                            : alert.targetRate;
                          const currencySymbol = alert.currency === Currency.NGN ? '₦' : 'GH₵';

                          return (
                            <div 
                              key={alert.id}
                              className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/25 space-y-2"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex items-center gap-2.5">
                                  <BrandLogo brandId={alert.brandId} size="sm" className="w-6 h-6 rounded-lg" />
                                  <div>
                                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                                      {alert.brandName}
                                    </h5>
                                    <div className="flex items-center gap-1.5 text-[10px] font-mono">
                                      <span className="text-slate-400">Target: {currencySymbol}{alert.targetRate}/$</span>
                                      <span className="text-emerald-500 font-bold flex items-center">
                                        <ArrowUpRight className="w-3 h-3" />
                                        Now: {currencySymbol}{liveVal}/$
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={(e) => handleDismissAlert(alert.id, e)}
                                  className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1"
                                  title="Dismiss alert"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <div className="flex items-center justify-between pt-1">
                                <span className="text-[9px] font-mono text-slate-400">
                                  Condition: {alert.condition === 'above' ? '≥ Target' : '≤ Target'}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    onSelectView('exchange');
                                    setIsAlertsMenuOpen(false);
                                  }}
                                  className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[10px] font-bold flex items-center gap-1 transition shadow-xs cursor-pointer"
                                >
                                  <Zap className="w-3 h-3 text-amber-300" />
                                  <span>Trade at {currencySymbol}{liveVal}/$</span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Section 2: Active Market Watchlist */}
                    <div className="my-3 space-y-2 max-h-48 overflow-y-auto pr-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                          Active Monitors ({rateAlerts.length})
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            onSelectView('rates');
                            setIsAlertsMenuOpen(false);
                          }}
                          className="text-[10px] text-rose-500 hover:text-rose-600 font-bold"
                        >
                          Manage All
                        </button>
                      </div>

                      {rateAlerts.length === 0 ? (
                        <div className="p-4 rounded-xl border border-dashed border-slate-200 dark:border-white/10 text-center space-y-1">
                          <p className="text-xs text-slate-400">No active price alerts set.</p>
                          <p className="text-[10px] text-slate-500">Configure target notifications for Steam, Apple, Razer, or Amazon.</p>
                        </div>
                      ) : (
                        rateAlerts.map(alert => {
                          const brandRate = liveRates[alert.brandId];
                          const liveVal = brandRate 
                            ? alert.currency === Currency.NGN ? brandRate.NGN : brandRate.GHS 
                            : alert.targetRate;
                          const currencySymbol = alert.currency === Currency.NGN ? '₦' : 'GH₵';
                          const isTriggered = triggeredAlerts.some(t => t.id === alert.id);

                          return (
                            <div
                              key={alert.id}
                              className={`p-2.5 rounded-xl border transition flex items-center justify-between gap-2 ${
                                isTriggered 
                                  ? 'bg-rose-500/10 border-rose-500/30' 
                                  : isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/5'
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <BrandLogo brandId={alert.brandId} size="xs" className="w-5 h-5 rounded" />
                                <div className="truncate">
                                  <span className="text-xs font-bold block truncate text-slate-900 dark:text-white">
                                    {alert.brandName}
                                  </span>
                                  <span className="text-[10px] font-mono text-slate-400">
                                    Target: {currencySymbol}{alert.targetRate}/$ · Live: <strong className="text-slate-800 dark:text-slate-200">{currencySymbol}{liveVal}/$</strong>
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0">
                                {onToggleAlert && (
                                  <button
                                    type="button"
                                    onClick={() => onToggleAlert(alert.id, !alert.isActive)}
                                    className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold transition cursor-pointer ${
                                      alert.isActive 
                                        ? 'bg-emerald-500/15 text-emerald-500' 
                                        : 'bg-slate-200 dark:bg-white/10 text-slate-400'
                                    }`}
                                  >
                                    {alert.isActive ? 'Active' : 'Paused'}
                                  </button>
                                )}

                                {onDeleteAlert && (
                                  <button
                                    type="button"
                                    onClick={() => onDeleteAlert(alert.id)}
                                    className="p-1 rounded text-slate-400 hover:text-rose-500 transition cursor-pointer"
                                    title="Delete alert"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>

                    {/* Section 3: Quick Action Footer */}
                    <div className="pt-2 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-2">
                      {onSimulatePriceSpike && (
                        <button
                          type="button"
                          onClick={() => {
                            onSimulatePriceSpike();
                            setDismissedAlertIds([]);
                          }}
                          className="px-2.5 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 text-[10px] font-mono font-bold flex items-center gap-1 transition cursor-pointer"
                          title="Simulate a market rate surge to test alert pulse"
                        >
                          <Activity className="w-3 h-3 text-rose-500" />
                          <span>Simulate Price Spike</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          onSelectView('rates');
                          setIsAlertsMenuOpen(false);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold flex items-center gap-1 transition shadow-xs cursor-pointer ml-auto"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Alert</span>
                      </button>
                    </div>

                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Executive Trader Profile Chip */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsProfileMenuOpen(p => !p)}
              className={`hidden sm:flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-2xl border transition cursor-pointer ${
                isLightMode 
                  ? 'bg-slate-50 hover:bg-slate-100 border-slate-200' 
                  : 'bg-white/5 hover:bg-white/10 border-white/10'
              }`}
            >
              <img 
                src="/src/assets/images/avatar_trader_vip_1791674394339.jpg" 
                alt="Bryan Wyatt" 
                className="w-7 h-7 rounded-full object-cover border border-rose-500/40"
              />
              <div className="text-left hidden md:block leading-none">
                <span className="text-xs font-bold block text-slate-900 dark:text-white">Bryan W.</span>
                <span className="text-[9px] text-emerald-500 font-bold block font-mono">Tier 2 Active</span>
              </div>
              <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Profile Menu Dropdown */}
            <AnimatePresence>
              {isProfileMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsProfileMenuOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    className={`absolute top-full right-0 mt-2.5 w-64 p-3 rounded-2xl border shadow-2xl z-50 backdrop-blur-xl ${
                      isLightMode ? 'bg-white border-slate-200' : 'bg-[#0E1322] border-white/10'
                    }`}
                  >
                    <div className="p-2 border-b border-slate-100 dark:border-white/5 mb-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white block">Bryan Wyatt</span>
                      <span className="text-[10px] text-slate-400 block font-mono">Providus NUBAN · Tier 2 Verified</span>
                    </div>

                    <div className="space-y-1">
                      <button
                        type="button"
                        onClick={() => {
                          onSelectView('wallets');
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full p-2 text-left text-xs font-semibold rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition flex items-center justify-between cursor-pointer"
                      >
                        <span>Wallet Vault & Cashouts</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onSelectView('vip');
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full p-2 text-left text-xs font-semibold rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition flex items-center justify-between cursor-pointer"
                      >
                        <span className="flex items-center gap-1.5 text-amber-500 font-bold">
                          <Trophy className="w-3.5 h-3.5" />
                          <span>VIP League ({rubbyPoints} RP)</span>
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onSelectView('kyc');
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full p-2 text-left text-xs font-semibold rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition flex items-center justify-between cursor-pointer"
                      >
                        <span>KYC Verification (BVN/NIN)</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onSelectView('security');
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full p-2 text-left text-xs font-semibold rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition flex items-center justify-between cursor-pointer"
                      >
                        <span>Security & 2FA Vault</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Primary High-Finance CTA */}
          <button
            type="button"
            onClick={() => onSelectView('exchange')}
            className="px-3.5 sm:px-4 py-2 bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 hover:brightness-110 active:scale-97 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-rose-600/30 whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Instant Trade</span>
            <span className="sm:hidden font-mono font-bold">Trade</span>
          </button>

          {/* Mobile Hamburger Drawer Trigger */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(p => !p)}
            className={`lg:hidden w-9 h-9 rounded-xl flex items-center justify-center border transition cursor-pointer ${
              isLightMode 
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700' 
                : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
            }`}
            aria-label="Open Mobile Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* MOBILE EXPANDED NAVIGATION DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden border-t overflow-hidden transition-colors ${
              isLightMode ? 'bg-white/98 border-slate-200' : 'bg-[#090C18]/98 border-white/10'
            }`}
          >
            <div className="p-4 space-y-4 max-h-[80vh] overflow-y-auto">
              
              {/* Quick Status Bar */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-black/5 dark:bg-white/5 text-xs font-mono">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Rail SLA: 99.98%</span>
                </span>
                <span className="text-slate-400">Providus NIP: Active</span>
              </div>

              {/* Core Links */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 font-mono">
                  Core Liquidity Rails
                </span>
                {highFinanceNav.map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleMobileNavSelect(item.id)}
                    className={`w-full p-2.5 rounded-xl text-left text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                      activeView === item.id 
                        ? 'bg-rose-500 text-white' 
                        : isLightMode ? 'hover:bg-slate-100 text-slate-800' : 'hover:bg-white/5 text-slate-200'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-60" />
                  </button>
                ))}
              </div>

              {/* Institutional Solutions */}
              <div className="space-y-1 pt-2 border-t border-slate-200 dark:border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 font-mono">
                  Institutional Services
                </span>
                <button
                  type="button"
                  onClick={() => handleMobileNavSelect('whatsapp_bot')}
                  className="w-full p-2.5 rounded-xl text-left text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp OTC Desk ($50k)</span>
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-500 font-bold">OTC</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleMobileNavSelect('kyc')}
                  className="w-full p-2.5 rounded-xl text-left text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>KYC Verification (BVN/NIN)</span>
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-500 font-bold">Tier 2</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleMobileNavSelect('vip')}
                  className="w-full p-2.5 rounded-xl text-left text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <span>VIP Traders League (₦250k)</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onOpenDueDiligence();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full p-2.5 rounded-xl text-left text-xs font-bold text-rose-500 hover:bg-rose-500/10 transition flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span>Due Diligence Audit Deck</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
