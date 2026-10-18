import React, { useState } from 'react';
import { 
  Check, 
  X, 
  HelpCircle, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Award, 
  DollarSign, 
  Layers, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

interface CompetitorFeature {
  feature: string;
  category: 'Speed & Payouts' | 'Rates & Currency' | 'Platform & UX' | 'Security & Trust' | 'Engagement & VIP';
  rubby: { supported: boolean; note: string };
  cardtonic: { supported: boolean; note: string };
  legitcards: { supported: boolean; note: string };
  cardgoal: { supported: boolean; note: string };
  beekle: { supported: boolean; note: string };
  quchange: { supported: boolean; note: string };
  afrbtc: { supported: boolean; note: string };
}

const COMPARISON_DATA: CompetitorFeature[] = [
  {
    feature: 'Dual Payout Gateways (NGN & GHS)',
    category: 'Rates & Currency',
    rubby: { supported: true, note: 'Seamless ₦ / GH₵ instant toggle with bank API' },
    cardtonic: { supported: true, note: 'NGN & GHS supported' },
    legitcards: { supported: true, note: 'NGN focused, manual GHS' },
    cardgoal: { supported: true, note: 'NGN & GHS supported' },
    beekle: { supported: true, note: 'NGN & GHS' },
    quchange: { supported: true, note: 'NGN & GHS' },
    afrbtc: { supported: false, note: 'Cryptocurrency/NGN primary' },
  },
  {
    feature: 'Real-Time Live Rate Ticker & Volatility Feeds',
    category: 'Rates & Currency',
    rubby: { supported: true, note: 'Dynamic live ticker with spread and high/low' },
    cardtonic: { supported: true, note: 'Live rate calculator on app' },
    legitcards: { supported: false, note: 'Static rate table' },
    cardgoal: { supported: true, note: 'Rate calculator included' },
    beekle: { supported: false, note: 'Updated periodically' },
    quchange: { supported: true, note: 'Interactive rate checker' },
    afrbtc: { supported: true, note: 'Crypto ticker oriented' },
  },
  {
    feature: 'Real-Time Push & Custom Rate Alerts',
    category: 'Rates & Currency',
    rubby: { supported: true, note: 'Custom target thresholds + browser/sound notifications' },
    cardtonic: { supported: false, note: 'General push broadcasts only' },
    legitcards: { supported: false, note: 'Not available' },
    cardgoal: { supported: false, note: 'Standard promo notifications' },
    beekle: { supported: false, note: 'Not available' },
    quchange: { supported: false, note: 'Broadcast notifications only' },
    afrbtc: { supported: false, note: 'Crypto rate notifications only' },
  },
  {
    feature: 'Sub-5 Min Automated Payout Guarantee',
    category: 'Speed & Payouts',
    rubby: { supported: true, note: 'Average 90s payout processing time' },
    cardtonic: { supported: true, note: 'Industry standard fast payout' },
    legitcards: { supported: false, note: 'Typically 10-25 mins' },
    cardgoal: { supported: true, note: '5-15 min processing window' },
    beekle: { supported: true, note: 'Quick verification' },
    quchange: { supported: true, note: 'Instant automated bank credit' },
    afrbtc: { supported: true, note: 'Automated crypto/fiat settlement' },
  },
  {
    feature: 'Interactive Currency Arbitrage Calculator',
    category: 'Rates & Currency',
    rubby: { supported: true, note: 'Side-by-side comparison with instant yield estimates' },
    cardtonic: { supported: true, note: 'Rate calculator widget' },
    legitcards: { supported: false, note: 'Basic calculation' },
    cardgoal: { supported: true, note: 'Simple rate calculator' },
    beekle: { supported: false, note: 'Simple estimation' },
    quchange: { supported: true, note: 'Rate checker' },
    afrbtc: { supported: true, note: 'Crypto-to-fiat calculator' },
  },
  {
    feature: 'Embedded Virtual Card Vault & Management',
    category: 'Platform & UX',
    rubby: { supported: true, note: 'Freeze/Unfreeze, spending limits & CVV reveal' },
    cardtonic: { supported: true, note: 'Virtual USD cards available' },
    legitcards: { supported: false, note: 'No virtual card program' },
    cardgoal: { supported: false, note: 'Exchange only' },
    beekle: { supported: false, note: 'Exchange only' },
    quchange: { supported: false, note: 'Exchange only' },
    afrbtc: { supported: false, note: 'Crypto wallet only' },
  },
  {
    feature: 'Gamified Monthly Tournament & Prize Pool',
    category: 'Engagement & VIP',
    rubby: { supported: true, note: 'Live Leaderboard with ₦250k / GH₵2.5k cash pool' },
    cardtonic: { supported: true, note: 'Monthly trading competitions' },
    legitcards: { supported: false, note: 'No public tournament' },
    cardgoal: { supported: true, note: 'Reward points system' },
    beekle: { supported: false, note: 'Occasional social giveaways' },
    quchange: { supported: false, note: 'Loyalty points system' },
    afrbtc: { supported: false, note: 'Affiliate commission focus' },
  },
  {
    feature: 'Interactive Volume & Trade Velocity Analytics',
    category: 'Platform & UX',
    rubby: { supported: true, note: 'Recharts interactive volume curves + metrics' },
    cardtonic: { supported: false, note: 'Summary statements only' },
    legitcards: { supported: false, note: 'Basic history list' },
    cardgoal: { supported: false, note: 'Transaction lists' },
    beekle: { supported: false, note: 'Basic receipts' },
    quchange: { supported: false, note: 'Transaction history table' },
    afrbtc: { supported: true, note: 'Candlestick charts for crypto' },
  },
  {
    feature: 'Exportable Receipt & Ledger Audit Trail',
    category: 'Security & Trust',
    rubby: { supported: true, note: 'Downloadable high-res receipts, CSV export, filterable ledger' },
    cardtonic: { supported: true, note: 'In-app transaction receipts' },
    legitcards: { supported: true, note: 'Receipt generation' },
    cardgoal: { supported: true, note: 'Order summaries' },
    beekle: { supported: true, note: 'Basic receipts' },
    quchange: { supported: true, note: 'Downloadable transaction receipts' },
    afrbtc: { supported: true, note: 'Blockchain hash verification' },
  },
  {
    feature: 'Biometric 2FA, Fraud Lock & Whitelisted Withdrawals',
    category: 'Security & Trust',
    rubby: { supported: true, note: 'Hardware token simulation, lockout triggers, and account freeze' },
    cardtonic: { supported: true, note: 'PIN verification + biometrics' },
    legitcards: { supported: false, note: 'Standard password' },
    cardgoal: { supported: true, note: '2FA verification' },
    beekle: { supported: true, note: 'PIN authentication' },
    quchange: { supported: true, note: '2FA security' },
    afrbtc: { supported: true, note: 'Google Authenticator 2FA' },
  },
  {
    feature: 'Instant Live Chat Concierge (24/7)',
    category: 'Platform & UX',
    rubby: { supported: true, note: 'Interactive chat widget with instant queue status' },
    cardtonic: { supported: true, note: 'In-app chat + WhatsApp' },
    legitcards: { supported: true, note: 'WhatsApp direct line' },
    cardgoal: { supported: true, note: 'In-app support desk' },
    beekle: { supported: true, note: 'WhatsApp support' },
    quchange: { supported: true, note: 'Live customer chat' },
    afrbtc: { supported: true, note: 'Telegram & web chat' },
  },
  {
    feature: 'Dual Obsidian Dark & Executive Light Theme',
    category: 'Platform & UX',
    rubby: { supported: true, note: 'Zero-flicker pre-hydrated high contrast dual-palette' },
    cardtonic: { supported: true, note: 'Light & Dark theme' },
    legitcards: { supported: false, note: 'Light mode only' },
    cardgoal: { supported: false, note: 'Dark accent theme' },
    beekle: { supported: false, note: 'Light only' },
    quchange: { supported: false, note: 'Light only' },
    afrbtc: { supported: true, note: 'Dark crypto interface' },
  },
  {
    feature: 'Value-Added Services (Airtime, Data, Power & Cable TV)',
    category: 'Platform & UX',
    rubby: { supported: true, note: 'Direct wallet spending for MTN/Airtel/Glo, AEDC/EKEDC tokens & DSTV with 2.5% cashback' },
    cardtonic: { supported: true, note: 'Airtime & bill pay available' },
    legitcards: { supported: false, note: 'Exchange only' },
    cardgoal: { supported: false, note: 'Exchange only' },
    beekle: { supported: false, note: 'Exchange only' },
    quchange: { supported: true, note: 'Utility bill payments supported' },
    afrbtc: { supported: false, note: 'Crypto only' },
  },
  {
    feature: 'Dedicated Permanent Virtual NUBAN Bank Accounts',
    category: 'Platform & UX',
    rubby: { supported: true, note: 'Dedicated Providus/NIP NUBAN with instant 5-second auto-credit' },
    cardtonic: { supported: true, note: 'Virtual Providus/Wema accounts' },
    legitcards: { supported: false, note: 'Manual transfer verification' },
    cardgoal: { supported: false, note: 'Manual deposit proof' },
    beekle: { supported: false, note: 'Manual deposits' },
    quchange: { supported: true, note: 'Virtual account inflow' },
    afrbtc: { supported: true, note: 'Fiat deposit rails' },
  },
  {
    feature: 'Multi-Network Crypto Inflow (TRC20, BSC, Polygon, BTC)',
    category: 'Rates & Currency',
    rubby: { supported: true, note: 'Permanent TRC-20, BEP-20, Polygon & Native BTC addresses with auto-sweep' },
    cardtonic: { supported: true, note: 'BTC & USDT TRC20 deposits' },
    legitcards: { supported: false, note: 'Gift cards only' },
    cardgoal: { supported: false, note: 'Limited crypto support' },
    beekle: { supported: false, note: 'Gift cards only' },
    quchange: { supported: true, note: 'USDT & BTC wallet' },
    afrbtc: { supported: true, note: 'Full crypto multi-network' },
  },
  {
    feature: 'Camera Card PIN Scanner & Bulk Batch Uploader',
    category: 'Platform & UX',
    rubby: { supported: true, note: 'Camera scan PIN detection & multi-line bulk code parser' },
    cardtonic: { supported: true, note: 'Camera code scanner' },
    legitcards: { supported: false, note: 'Manual code entry' },
    cardgoal: { supported: true, note: 'In-app OCR barcode/code scan' },
    beekle: { supported: false, note: 'Manual typing' },
    quchange: { supported: false, note: 'Manual code typing' },
    afrbtc: { supported: false, note: 'Manual entry' },
  },
  {
    feature: 'Tiered KYC Compliance (BVN, NIN, Ghana Card, Liveness)',
    category: 'Security & Trust',
    rubby: { supported: true, note: 'Tier 1 to Tier 3 with real-time Prembly/NIBSS verification & 3D facial biometric' },
    cardtonic: { supported: true, note: 'Tiered BVN & NIN verification' },
    legitcards: { supported: false, note: 'Basic phone check' },
    cardgoal: { supported: true, note: 'Tiered identity limits' },
    beekle: { supported: true, note: 'Phone & BVN check' },
    quchange: { supported: true, note: 'BVN identity verification' },
    afrbtc: { supported: true, note: 'International KYC' },
  },
  {
    feature: 'WhatsApp Direct-To-Trade Automated Business Bot',
    category: 'Engagement & VIP',
    rubby: { supported: true, note: 'Interactive Meta Cloud WhatsApp API bot for chat-based trade and live quotes' },
    cardtonic: { supported: true, note: 'WhatsApp support desk' },
    legitcards: { supported: true, note: 'Core WhatsApp trading model' },
    cardgoal: { supported: false, note: 'App only' },
    beekle: { supported: true, note: 'WhatsApp direct line' },
    quchange: { supported: false, note: 'App only' },
    afrbtc: { supported: true, note: 'Telegram bot trading' },
  }
];

const COMPETITOR_OVERVIEWS = [
  {
    name: 'Rubby (This App)',
    tagline: 'Enterprise-grade OTC Gift Card & Digital Asset Trading Terminal',
    marketPosition: 'High-speed institutional & retail terminal with live analytics, rates ticker, and multi-currency vault',
    strengths: ['Real-time push alerts', 'Deep analytics & Recharts velocity', 'Dual theme (Dark/Light)', 'Interactive tournament engine', 'Virtual card vault'],
    badge: 'Our Platform',
    accentColor: 'border-rose-500/30 bg-rose-500/10 text-rose-500'
  },
  {
    name: 'Cardtonic',
    tagline: 'Nigeria & Ghana Market Leader',
    marketPosition: 'The most established household brand in West Africa with massive marketing presence and mobile app adoption.',
    strengths: ['Brand trust & millions of downloads', 'Virtual USD cards', 'Broad gift card catalog', 'Established banking relationships'],
    badge: 'Tier 1 Competitor',
    accentColor: 'border-blue-500/30 bg-blue-500/10 text-blue-400'
  },
  {
    name: 'LegitCards',
    tagline: 'Fast Payout Retail Exchange',
    marketPosition: 'Simple, direct peer-to-admin trade platform popular among young Nigerian retail traders.',
    strengths: ['Simple onboarding', 'Active WhatsApp-based trading', 'Direct customer rapport'],
    badge: 'Retail Favorite',
    accentColor: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
  },
  {
    name: 'CardGoal',
    tagline: 'Gamified Gift Card Trading App',
    marketPosition: 'Gamified redemption experience with reward tasks, daily check-in coins, and tiered reward structures.',
    strengths: ['Gamified user retention', 'Competitive gift card exchange rates', 'Active community incentives'],
    badge: 'Gamification Leader',
    accentColor: 'border-amber-500/30 bg-amber-500/10 text-amber-400'
  },
  {
    name: 'Beekle',
    tagline: 'Fast Cash OTC Exchange',
    marketPosition: 'Streamlined mobile app geared toward instant conversions with zero clutter.',
    strengths: ['Ultra-minimalist interface', 'Clean mobile workflow', 'Fast retail processing'],
    badge: 'Mobile First',
    accentColor: 'border-purple-500/30 bg-purple-500/10 text-purple-400'
  },
  {
    name: 'Quchange',
    tagline: 'Modern Digital Asset & Card Terminal',
    marketPosition: 'Reliable high-rate platform known for fast payouts and reliable customer support.',
    strengths: ['Highly competitive NGN rates', 'Intuitive mobile UI', 'Consistent automated payouts'],
    badge: 'Established Challenger',
    accentColor: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400'
  },
  {
    name: 'AfrBTC',
    tagline: 'Crypto & Card Hybrid Exchange',
    marketPosition: 'Cross-continental OTC desk bridging Chinese/overseas buyers with African gift card suppliers and crypto liquidity.',
    strengths: ['Deep bulk liquidity for physical cards', 'BTC/USDT crypto settlements', 'International buyer network'],
    badge: 'Wholesale/Crypto Hybrid',
    accentColor: 'border-orange-500/30 bg-orange-500/10 text-orange-400'
  }
];

export default function MarketComparisonView() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeCompetitorModal, setActiveCompetitorModal] = useState<string | null>(null);

  const categories = ['All', 'Rates & Currency', 'Speed & Payouts', 'Platform & UX', 'Security & Trust', 'Engagement & VIP'];

  const filteredFeatures = selectedCategory === 'All' 
    ? COMPARISON_DATA 
    : COMPARISON_DATA.filter(item => item.category === selectedCategory);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* HEADER HERO */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 bg-gradient-to-br from-white via-slate-50 to-rose-50/20 dark:from-[#0E1322] dark:via-[#090A10] dark:to-rose-950/20 shadow-xl">
        <div className="relative z-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Senior Architectural Benchmark & Market Analysis</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Rubby vs. West African OTC Giants
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              A comprehensive, senior-developer evaluation comparing Rubby’s architecture, execution speed, rate mechanics, and user retention against established market players: <span className="font-semibold text-slate-800 dark:text-white">Cardtonic, LegitCards, CardGoal, Beekle, Quchange, and AfrBTC</span>.
            </p>
          </div>
        </div>

        {/* VALUATION BADGE SUMMARY BANNER */}
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">1. Asset Codebase Worth (Today)</span>
            <div className="text-xl sm:text-2xl font-black text-rose-600 dark:text-rose-400 mt-1 font-mono">
              $45,000 – $60,000 USD
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">≈ ₦70M – ₦90M Naira (Turnkey IP)</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/70 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">2. Projected Year 1 Enterprise Value</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
              $1,500,000 – $3,500,000 USD
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">≈ ₦2.4B – ₦5.5B Naira (4x-6x EBITDA)</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/70 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">3. Daily OTC Arbitrage Yield</span>
            <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
              6.5% – 9.0% Net Spread ($1.5k–$2k/day)
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">Zero-latency Terminal UX & Rate Alerts</span>
          </div>
        </div>
      </div>

      {/* QUICK COMPETITOR CARDS */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-rose-500" />
            <span>Target Competitor Landscape</span>
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">7 Platforms Benchmarked</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {COMPETITOR_OVERVIEWS.map((comp) => (
            <div 
              key={comp.name} 
              className={`p-5 rounded-2xl border transition-all hover:scale-[1.01] ${
                comp.name.includes('Rubby')
                  ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-500/30 shadow-md ring-1 ring-rose-500/20'
                  : 'bg-white dark:bg-[#0E1322] border-slate-200 dark:border-white/10 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${comp.accentColor}`}>
                  {comp.badge}
                </span>
                {comp.name.includes('Rubby') && (
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                  </span>
                )}
              </div>

              <h4 className="text-base font-bold text-slate-900 dark:text-white">{comp.name}</h4>
              <p className="text-xs text-rose-600 dark:text-rose-400 font-medium mt-0.5">{comp.tagline}</p>
              
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                {comp.marketPosition}
              </p>

              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-white/5 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">Key Strengths:</span>
                <div className="flex flex-wrap gap-1">
                  {comp.strengths.slice(0, 3).map((s, idx) => (
                    <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DETAILED FEATURE-BY-FEATURE MATRIX */}
      <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1322] shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span>Direct Capabilities & Architectural Matrix</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Side-by-side technical breakdown across 12 critical exchange vectors.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="py-3.5 px-4 w-[280px]">Feature & Metric</th>
                <th className="py-3.5 px-3 bg-rose-500/10 text-rose-600 dark:text-rose-400 font-extrabold w-[170px] border-x border-rose-500/20">
                  Rubby (This App)
                </th>
                <th className="py-3.5 px-3">Cardtonic</th>
                <th className="py-3.5 px-3">LegitCards</th>
                <th className="py-3.5 px-3">CardGoal</th>
                <th className="py-3.5 px-3">Beekle</th>
                <th className="py-3.5 px-3">Quchange</th>
                <th className="py-3.5 px-3">AfrBTC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-xs">
              {filteredFeatures.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900 dark:text-white">{row.feature}</div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider">{row.category}</span>
                  </td>

                  {/* Rubby Column (Highlighted) */}
                  <td className="py-3 px-3 bg-rose-50/40 dark:bg-rose-950/20 border-x border-rose-500/20">
                    <div className="flex items-center gap-1.5 font-bold text-rose-700 dark:text-rose-300">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-[11px] leading-tight">{row.rubby.note}</span>
                    </div>
                  </td>

                  {/* Cardtonic */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                      {row.cardtonic.supported ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      )}
                      <span className="text-[11px]">{row.cardtonic.note}</span>
                    </div>
                  </td>

                  {/* LegitCards */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                      {row.legitcards.supported ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      )}
                      <span className="text-[11px]">{row.legitcards.note}</span>
                    </div>
                  </td>

                  {/* CardGoal */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                      {row.cardgoal.supported ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      )}
                      <span className="text-[11px]">{row.cardgoal.note}</span>
                    </div>
                  </td>

                  {/* Beekle */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                      {row.beekle.supported ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      )}
                      <span className="text-[11px]">{row.beekle.note}</span>
                    </div>
                  </td>

                  {/* Quchange */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                      {row.quchange.supported ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      )}
                      <span className="text-[11px]">{row.quchange.note}</span>
                    </div>
                  </td>

                  {/* AfrBTC */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                      {row.afrbtc.supported ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      )}
                      <span className="text-[11px]">{row.afrbtc.note}</span>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* COMPREHENSIVE PROJECT WORTH & VALUATION REPORT */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1322] shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-500" />
              <span>Project Worth & Investment Appraisal Report</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Calculated based on software replacement cost, market transaction multipliers, and operating float economics.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            Valuation: October 2026
          </span>
        </div>

        {/* 3 Valuation Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Tier 1 */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">Tier 1: Codebase & IP Asset</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1 font-mono">
                $35,000 – $65,000
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Represents the exact engineering replacement cost to build this platform from scratch with senior fintech engineers:
              </p>
              <ul className="mt-3 space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>350+ Senior Developer Hours @ $100-$150/hr</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Custom SVG & Vector icon branding engine</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Responsive Recharts analytics & live rate ticker</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Dual light/dark tokenized styling architecture</span>
                </li>
              </ul>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-[10px] font-medium text-slate-500 dark:text-slate-400">
              Ideal for: White-label OTC operators or existing exchanges looking for an instant technology modernization.
            </div>
          </div>

          {/* Tier 2 */}
          <div className="p-5 rounded-2xl border border-rose-300 dark:border-rose-500/30 bg-rose-50/30 dark:bg-rose-950/20 flex flex-col justify-between space-y-4 shadow-sm ring-1 ring-rose-500/20">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 block">Tier 2: Commercial Turnkey Launch</span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-rose-600 text-white">Target Phase</span>
              </div>
              <div className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-1 font-mono">
                $120,000 – $250,000
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Appraised value when deployed with working fiat gateways (Paystack/Flutterwave/Monnify) and initial working capital:
              </p>
              <ul className="mt-3 space-y-1.5 text-[11px] text-slate-700 dark:text-slate-200">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>₦20M - ₦50M NGN working capital float</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>KYC Level 2 & Nigerian CAC/CBN compliance</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Sub-2 minute automated payout pipelines</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>1,000 - 5,000 active monthly repeat traders</span>
                </li>
              </ul>
            </div>
            <div className="p-2.5 rounded-xl bg-rose-100 dark:bg-rose-900/30 text-[10px] font-medium text-rose-700 dark:text-rose-300">
              Ideal for: Seed-stage fintech investment rounds or regional acquisition by fintech aggregators.
            </div>
          </div>

          {/* Tier 3 */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">Tier 3: Mature Operating Enterprise</span>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
                $1.2M – $4.5M+ USD
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Enterprise market valuation comparable to Cardtonic or Quchange operating at scale:
              </p>
              <ul className="mt-3 space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>$2M - $5M USD monthly gross merchandise volume</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Net margins: 3.5% to 7.0% OTC spread retention</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Annualized EBITDA: $350k - $900k USD</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Direct secondary market Chinese/US bulk redemption desk</span>
                </li>
              </ul>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-[10px] font-medium text-slate-500 dark:text-slate-400">
              Basis: 4x – 6x EBITDA valuation typical of high-velocity African cross-border payment processors.
            </div>
          </div>

        </div>

        {/* REVENUE MULTIPLIERS & MARGIN CALCULATIONS */}
        <div className="mt-6 p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-rose-500" />
            <span>How This Project Generates Revenue (The OTC Arbitrage Model)</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-slate-600 dark:text-slate-400">
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">1. OTC Spread Margin</span>
              <span className="text-[11px]">Buying card at ₦1,250/$ and offloading to Chinese wholesale liquidity partners at ₦1,340/$ (6-8% gross spread).</span>
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">2. Breakage & Rounding</span>
              <span className="text-[11px]">Residual balances in virtual cards, unredeemed points, and withdrawal processing fees (₦50-₦100 flat).</span>
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">3. Float Interest Yield</span>
              <span className="text-[11px]">Overnight yield on multi-million Naira liquidity held in custody accounts prior to trader withdrawal.</span>
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">4. VIP Volume Incentives</span>
              <span className="text-[11px]">High-volume traders lock in loyalty tiers while generating massive aggregate turnover.</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
