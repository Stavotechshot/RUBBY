import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Building2, 
  Zap, 
  ArrowRight, 
  Award, 
  FileText, 
  ExternalLink,
  Smartphone,
  CreditCard,
  TrendingUp,
  MessageSquare,
  Trophy,
  Scale,
  Sparkles,
  CheckCircle2,
  Mail,
  Check,
  Globe,
  Radio,
  Clock,
  Users,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import RubbyLogo, { RubbyVectorMark } from './RubbyLogo';
import { WorkspaceView } from '../App';

interface FooterProps {
  isLightMode: boolean;
  onSelectView: (view: WorkspaceView) => void;
  onOpenDueDiligence: () => void;
  onOpenWeeklySummary: () => void;
}

export default function Footer({
  isLightMode,
  onSelectView,
  onOpenDueDiligence,
  onOpenWeeklySummary
}: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [newsletterError, setNewsletterError] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setNewsletterError(true);
      return;
    }
    setNewsletterError(false);
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 2000);
  };

  return (
    <footer className={`mt-24 border-t transition-colors relative overflow-hidden ${
      isLightMode 
        ? 'bg-[#F8FAFC] border-slate-200/90 text-slate-800' 
        : 'bg-[#06080F] border-white/[0.08] text-slate-200'
    }`}>
      {/* Subtle Ambient Radial Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-rose-600/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] bg-amber-600/5 rounded-full blur-[160px] pointer-events-none" />

      {/* 1. INSTITUTIONAL SOCIAL PROOF & PERFORMANCE BENCHMARKS STRIP */}
      <div className="border-b border-slate-200 dark:border-white/[0.06] bg-slate-100/60 dark:bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            
            {/* Metric 1 */}
            <div className="space-y-1 border-l-2 border-rose-500 pl-4">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-mono uppercase tracking-wider">
                <TrendingUp className="w-3.5 h-3.5 text-rose-500" />
                <span>Liquidated Volume</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black font-sans tracking-tight text-slate-900 dark:text-white">
                ₦4.85B<span className="text-rose-500">+</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                Cumulative card & digital asset clearance across Nigeria & Ghana.
              </p>
            </div>

            {/* Metric 2 */}
            <div className="space-y-1 border-l-2 border-emerald-500 pl-4">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-mono uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5 text-emerald-500" />
                <span>Settlement Velocity</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black font-sans tracking-tight text-slate-900 dark:text-white">
                118<span className="text-xs font-mono text-emerald-500 ml-1">seconds</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                Automated validation to direct Providus NIP / Mobile Money credit.
              </p>
            </div>

            {/* Metric 3 */}
            <div className="space-y-1 border-l-2 border-amber-500 pl-4">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-mono uppercase tracking-wider">
                <Users className="w-3.5 h-3.5 text-amber-500" />
                <span>Active Traders</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black font-sans tracking-tight text-slate-900 dark:text-white">
                24,500<span className="text-amber-500">+</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                Verified high-volume merchants, corporate desks & retail traders.
              </p>
            </div>

            {/* Metric 4 */}
            <div className="space-y-1 border-l-2 border-sky-500 pl-4">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-mono uppercase tracking-wider">
                <Radio className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
                <span>Settlement Uptime</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black font-sans tracking-tight text-slate-900 dark:text-white">
                99.98<span className="text-sky-400">%</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                Redundant bank switches ensuring 24/7 round-the-clock liquidity.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* 2. CORPORATE PARTNER RAILS & COMPLIANCE ENDORSEMENT BANNER */}
      <div className="border-b border-slate-200 dark:border-white/[0.06] py-6 bg-slate-50/50 dark:bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider font-mono text-slate-400">
              Institutional Infrastructure:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-mono text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
              <Building2 className="w-4 h-4 text-rose-500" />
              <span>Providus Bank PLC Partner</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
              <Zap className="w-4 h-4 text-emerald-500" />
              <span>NIBSS Instant Payment (NIP)</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
              <Smartphone className="w-4 h-4 text-amber-500" />
              <span>Bank of Ghana MoMo Rails</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>NDPR Data Privacy Certified</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
              <Lock className="w-4 h-4 text-rose-500" />
              <span>256-Bit Hardware Escrow</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MAIN CORPORATE DIRECTORY (5 CATEGORIZED COLUMNS + BRAND MONOLITH) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Brand Monolith & Enterprise Mission (Cols 1-4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 shrink-0">
                <RubbyVectorMark className="w-full h-full" isLightMode={isLightMode} />
              </div>
              <div className="flex flex-col select-none">
                <div className="flex items-center gap-2 leading-none">
                  <span className={`text-2xl font-black tracking-[0.16em] font-sans ${
                    isLightMode ? 'text-slate-950' : 'text-white'
                  }`}>
                    RUBBY
                  </span>
                  <span className="w-1.5 h-1.5 rotate-45 bg-gradient-to-r from-rose-500 to-amber-500 rounded-[1px]" />
                </div>
                <span className={`text-[9.5px] font-bold tracking-[0.22em] uppercase font-sans mt-0.5 leading-none ${
                  isLightMode ? 'text-slate-500' : 'text-rose-400'
                }`}>
                  Capital & Asset Exchange
                </span>
              </div>
            </div>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              Rubby Financial Technologies Inc. is the leading institutional-grade digital liquidity and card liquidation platform in West Africa. Engineered for instant cross-border settlement, virtual NUBAN corporate banking, and programmatic utility automation with zero counterparty friction.
            </p>

            {/* Live Operational Status Box */}
            <div className={`p-4 rounded-2xl border text-xs space-y-2.5 ${
              isLightMode ? 'bg-white border-slate-200 shadow-xs' : 'bg-white/[0.03] border-white/10'
            }`}>
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400">Core Settlement Engine:</span>
                <span className="text-emerald-500 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Operational (38ms)
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400">Providus NIP Switch:</span>
                <span className="text-emerald-500 font-bold">100% Instant</span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400">Ghana MoMo Gateway:</span>
                <span className="text-emerald-500 font-bold">Online</span>
              </div>
            </div>

            {/* Institutional Due Diligence Deck Button */}
            <button
              type="button"
              onClick={onOpenDueDiligence}
              className="w-full p-3 rounded-2xl bg-rose-500/10 hover:bg-rose-500/15 border border-rose-500/20 text-rose-500 hover:text-rose-600 dark:text-rose-400 text-xs font-bold transition flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-rose-500" />
                <span>Institutional Due Diligence Deck</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Categorized Directory: 4 Specialized Corporate Columns (Cols 5-12) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            
            {/* Category 1: Products & Liquidity */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-black uppercase tracking-wider font-mono text-slate-900 dark:text-white">
                Liquidity
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                <li>
                  <button 
                    type="button" 
                    onClick={() => onSelectView('exchange')} 
                    className="hover:text-rose-500 transition cursor-pointer text-left font-medium"
                  >
                    Gift Card Exchange
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={() => onSelectView('cards_catalog')} 
                    className="hover:text-rose-500 transition cursor-pointer text-left font-medium flex items-center gap-1.5"
                  >
                    <span>Card Vault Specs</span>
                    <span className="px-1.5 py-0.2 rounded text-[8px] bg-rose-500/15 text-rose-500 font-bold font-mono">Live</span>
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={() => onSelectView('rates')} 
                    className="hover:text-rose-500 transition cursor-pointer text-left font-medium"
                  >
                    Live Market Rates
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={() => onSelectView('whatsapp_bot')} 
                    className="hover:text-rose-500 transition cursor-pointer text-left font-medium flex items-center gap-1 text-emerald-600 dark:text-emerald-400"
                  >
                    <span>WhatsApp OTC ($50k)</span>
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={() => onSelectView('rates')} 
                    className="hover:text-rose-500 transition cursor-pointer text-left font-medium"
                  >
                    Rate Movement Alerts
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={() => onSelectView('comparison')} 
                    className="hover:text-rose-500 transition cursor-pointer text-left font-medium"
                  >
                    Spread Benchmark
                  </button>
                </li>
              </ul>
            </div>

            {/* Category 2: Banking & Rails */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-black uppercase tracking-wider font-mono text-slate-900 dark:text-white">
                Banking Rails
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                <li>
                  <button 
                    type="button" 
                    onClick={() => onSelectView('accounts')} 
                    className="hover:text-rose-500 transition cursor-pointer text-left font-medium"
                  >
                    Virtual NUBAN Account
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={() => onSelectView('accounts')} 
                    className="hover:text-rose-500 transition cursor-pointer text-left font-medium"
                  >
                    Providus Bank Inflows
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={() => onSelectView('accounts')} 
                    className="hover:text-rose-500 transition cursor-pointer text-left font-medium"
                  >
                    Ghana MoMo Settlement
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={() => onSelectView('wallets')} 
                    className="hover:text-rose-500 transition cursor-pointer text-left font-medium"
                  >
                    Multi-Currency Vault
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={() => onSelectView('bills')} 
                    className="hover:text-rose-500 transition cursor-pointer text-left font-medium"
                  >
                    Utility Bill Automation
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={() => onSelectView('bills')} 
                    className="hover:text-rose-500 transition cursor-pointer text-left font-medium"
                  >
                    Prepaid Power & Airtime
                  </button>
                </li>
              </ul>
            </div>

            {/* Category 3: Security & Compliance */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-black uppercase tracking-wider font-mono text-slate-900 dark:text-white">
                Compliance
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                <li>
                  <button 
                    type="button" 
                    onClick={() => onSelectView('kyc')} 
                    className="hover:text-rose-500 transition cursor-pointer text-left font-medium"
                  >
                    Tiered KYC (BVN/NIN)
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={() => onSelectView('security')} 
                    className="hover:text-rose-500 transition cursor-pointer text-left font-medium"
                  >
                    Hardware PIN & 2FA
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={onOpenDueDiligence} 
                    className="hover:text-rose-500 transition cursor-pointer text-left font-medium text-rose-500 dark:text-rose-400"
                  >
                    Due Diligence Audit
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={() => onSelectView('ledger')} 
                    className="hover:text-rose-500 transition cursor-pointer text-left font-medium"
                  >
                    Proof of Payout Receipts
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={() => onSelectView('security')} 
                    className="hover:text-rose-500 transition cursor-pointer text-left font-medium"
                  >
                    AML & CFT Safeguards
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={() => onSelectView('ledger')} 
                    className="hover:text-rose-500 transition cursor-pointer text-left font-medium"
                  >
                    Transaction Ledger
                  </button>
                </li>
              </ul>
            </div>

            {/* Category 4: Corporate & Intelligence */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-black uppercase tracking-wider font-mono text-slate-900 dark:text-white">
                Corporate
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                <li>
                  <button 
                    type="button" 
                    onClick={() => onSelectView('vip')} 
                    className="hover:text-rose-500 transition cursor-pointer text-left font-medium flex items-center gap-1.5"
                  >
                    <Trophy className="w-3.5 h-3.5 text-amber-500" />
                    <span>VIP Traders League</span>
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={onOpenWeeklySummary} 
                    className="hover:text-rose-500 transition cursor-pointer text-left font-medium"
                  >
                    Weekly FX Analytics
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={() => onSelectView('overview')} 
                    className="hover:text-rose-500 transition cursor-pointer text-left font-medium"
                  >
                    Executive Overview
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={() => {
                      const chatBtn = document.querySelector('[title*="LiveChat"]') as HTMLElement;
                      if (chatBtn) chatBtn.click();
                    }} 
                    className="hover:text-rose-500 transition cursor-pointer text-left font-medium flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>24/7 Human Concierge</span>
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={() => onSelectView('whatsapp_bot')} 
                    className="hover:text-rose-500 transition cursor-pointer text-left font-medium"
                  >
                    Institutional Telegram
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={onOpenDueDiligence} 
                    className="hover:text-rose-500 transition cursor-pointer text-left font-medium"
                  >
                    Capital Adequacy Policy
                  </button>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* 4. CORPORATE MARKET INTELLIGENCE DISPATCH NEWSLETTER BAR */}
        <div className={`mt-14 p-6 sm:p-8 rounded-3xl border transition-all ${
          isLightMode 
            ? 'bg-gradient-to-r from-slate-900 via-rose-950 to-slate-950 text-white border-slate-300' 
            : 'bg-gradient-to-r from-[#101424] via-[#160E22] to-[#0D101C] text-white border-white/10'
        }`}>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-1 max-w-xl">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider font-mono text-rose-400">
                  Rubby Institutional Morning Dispatch
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-sans tracking-tight text-white">
                Receive Daily West African FX & Gift Card Spread Briefings
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Delivered every weekday at 08:00 WAT. Real-time merchant rates, parallel exchange rate trends, and institutional OTC depth analysis directly to your desk.
              </p>
            </div>

            {/* Newsletter Input Form */}
            <form onSubmit={handleSubscribe} className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row gap-2.5">
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="trader@institution.com"
                  className="w-full sm:w-72 pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-xs focus:outline-hidden focus:border-rose-500 transition"
                />
              </div>

              <button
                type="submit"
                disabled={newsletterSubscribed}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 active:scale-97 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-rose-600/30 cursor-pointer disabled:opacity-80"
              >
                {newsletterSubscribed ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
          {newsletterError && (
            <p className="text-rose-400 text-[11px] mt-2 font-mono">
              Please enter a valid corporate email address.
            </p>
          )}
        </div>

        {/* 5. OFFICIAL REGULATORY DISCLOSURE & SAFEKEEPING POLICY */}
        <div className={`mt-10 p-6 rounded-3xl border text-[11px] leading-relaxed transition-colors ${
          isLightMode 
            ? 'bg-slate-100/70 border-slate-200 text-slate-600' 
            : 'bg-white/[0.02] border-white/[0.06] text-slate-400'
        }`}>
          <div className="flex items-center gap-2 mb-2 font-mono font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[10px]">
            <Building2 className="w-3.5 h-3.5 text-rose-500" />
            <span>Corporate Operating Entity & Regulatory Disclosure</span>
          </div>
          <p>
            Rubby Financial Technologies Inc. (RC: 1849204) operates as a registered financial technology software provider and non-custodial secondary asset liquidity gateway. Banking infrastructure, dedicated virtual NUBAN accounts, and automated NIBSS Instant Payment (NIP) settlements are provided through direct integration with <strong>Providus Bank PLC</strong> (Licensed and regulated by the Central Bank of Nigeria). Mobile Money settlements in Ghana are processed through authorized payment service providers licensed by the <strong>Bank of Ghana</strong>. Rubby provides cryptographic verification and point-of-sale retail validation escrow; digital asset and gift card liquidation payouts are disbursed via automated programmatic bank switches within seconds of redemption confirmation.
          </p>
        </div>

        {/* 6. REFINED CORPORATE COPYRIGHT & REGIONAL RAIL STATUS */}
        <div className="mt-10 pt-8 border-t border-slate-200 dark:border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500 dark:text-slate-400">
          
          <div className="space-y-1 text-center md:text-left">
            <p className="font-medium">
              © {new Date().getFullYear()} Rubby Financial Technologies Inc. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[11px]">
              <button type="button" onClick={onOpenDueDiligence} className="hover:text-rose-500 transition cursor-pointer">
                Privacy Policy (NDPR)
              </button>
              <span>·</span>
              <button type="button" onClick={onOpenDueDiligence} className="hover:text-rose-500 transition cursor-pointer">
                Terms of Execution
              </button>
              <span>·</span>
              <button type="button" onClick={onOpenDueDiligence} className="hover:text-rose-500 transition cursor-pointer">
                AML/CFT Policy
              </button>
              <span>·</span>
              <button type="button" onClick={onOpenDueDiligence} className="hover:text-rose-500 transition cursor-pointer">
                Security Disclosures
              </button>
              <span>·</span>
              <button type="button" onClick={onOpenDueDiligence} className="hover:text-rose-500 transition cursor-pointer">
                Whistleblower Portal
              </button>
            </div>
          </div>

          {/* Regional Rails Real-Time Latency Monometer */}
          <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-[11px]">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 border border-slate-200 dark:border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>🇳🇬 Lagos NIP (41ms)</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 border border-slate-200 dark:border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>🇬🇭 Accra MoMo (68ms)</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 border border-slate-200 dark:border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>🌐 Global OTC Desk</span>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
