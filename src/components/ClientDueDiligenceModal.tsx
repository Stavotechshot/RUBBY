import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Building2, 
  Zap, 
  Lock, 
  ArrowRight, 
  Award, 
  FileText, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Percent,
  Layers,
  Scale
} from 'lucide-react';
import { RubbyVectorMark } from './RubbyLogo';

interface ClientDueDiligenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
}

export default function ClientDueDiligenceModal({
  isOpen,
  onClose,
  isLightMode = false
}: ClientDueDiligenceModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={`relative w-full max-w-3xl rounded-3xl p-6 sm:p-8 shadow-2xl border overflow-hidden max-h-[92vh] overflow-y-auto ${
            isLightMode ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#090C17] border-white/10 text-white'
          }`}
        >
          {/* Subtle ambient lighting */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-rose-600/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-600/10 rounded-full blur-[90px] pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#101424] border border-rose-500/40 p-2 flex items-center justify-center shrink-0">
                <RubbyVectorMark className="w-full h-full" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Institutional Due Diligence & Audit Deck
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 uppercase font-mono">
                    Client Ready
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Operational capabilities, partner rails, liquidity reserves, and compliance standards.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-black/10 dark:bg-white/5 hover:bg-white/10 transition cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Key Executive Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className={`p-4 rounded-2xl border text-left ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/5'}`}>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Average Payout Time</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-emerald-500 mt-1 block">&lt; 118s</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 block">Automated NIP rail</span>
            </div>

            <div className={`p-4 rounded-2xl border text-left ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/5'}`}>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Processed Volume</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-rose-500 mt-1 block">₦4.85 Billion</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 block">Zero failed disbursements</span>
            </div>

            <div className={`p-4 rounded-2xl border text-left ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/5'}`}>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">System SLA</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-amber-500 mt-1 block">99.98%</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 block">Multi-region redundancy</span>
            </div>

            <div className={`p-4 rounded-2xl border text-left ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/5'}`}>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">OTC Single Limit</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-sky-400 mt-1 block">$50,000</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 block">Same-day desk wire</span>
            </div>
          </div>

          {/* 4 Pillars of Institutional Trust */}
          <div className="space-y-4 mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Institutional Framework & Compliance
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className={`p-4 rounded-2xl border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/5'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-500">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">Regulatory & AML/CFT Controls</h5>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Tier-1 BVN and NIN automatic identity resolution with fraud blacklists, NDPR data privacy compliance, and strict anti-money-laundering transaction monitoring.
                </p>
              </div>

              <div className={`p-4 rounded-2xl border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/5'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg bg-rose-500/15 text-rose-500">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">Partner Banking Rails</h5>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Direct API integrations with Providus Bank NUBAN virtual accounts, NIBSS Instant Payments, and Bank of Ghana Mobile Money Switch (MTN, Telecel, AT).
                </p>
              </div>

              <div className={`p-4 rounded-2xl border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/5'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg bg-amber-500/15 text-amber-500">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">Automated Card Balance Verification</h5>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Direct retail vendor API connectivity for Apple, Steam, Razer, and Vanilla Visa PIN queries, eliminating manual delays and verifying authenticity in seconds.
                </p>
              </div>

              <div className={`p-4 rounded-2xl border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/5'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg bg-indigo-500/15 text-indigo-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">Institutional Security & Escrow</h5>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Zero-custody risk with instantaneous escrow lock and automated release. Multi-factor authentication (TOTP 2FA) required for high-tier balance sweeps.
                </p>
              </div>
            </div>
          </div>

          {/* Client Presentation Q&A Quick FAQ */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/5 mb-6">
            <h5 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
              Common Client & Investor Questions
            </h5>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white/5">
                <span className="font-bold text-white block">Q: Can corporate clients execute high-volume OTC liquidations?</span>
                <span className="text-slate-400 text-[11px] block mt-0.5">A: Yes. Verified VIP traders and businesses have access to the WhatsApp OTC desk with customized bulk spreads and dedicated liquidity managers.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5">
                <span className="font-bold text-white block">Q: How are currency rates established?</span>
                <span className="text-slate-400 text-[11px] block mt-0.5">A: Rubby dynamically indexes global secondary market liquidity, providing real-time spreads with transparent zero-fee execution.</span>
              </div>
            </div>
          </div>

          {/* Close button */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition cursor-pointer shadow-md shadow-rose-600/30"
            >
              Understood & Verified
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
