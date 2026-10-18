import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Upload, 
  UserCheck, 
  Lock, 
  FileText, 
  Clock, 
  Sparkles,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface KycViewProps {
  isLightMode?: boolean;
}

export type KycTier = 1 | 2 | 3;

export default function KycVerificationView({ isLightMode = false }: KycViewProps) {
  const [currentTier, setCurrentTier] = useState<KycTier>(() => {
    const saved = localStorage.getItem('rubby_kyc_tier');
    return saved ? (parseInt(saved, 10) as KycTier) : 1;
  });

  // Tier 2 Form State (BVN / NIN / Ghana Card)
  const [govIdType, setGovIdType] = useState<'bvn' | 'nin' | 'ghana_card'>('bvn');
  const [govIdNumber, setGovIdNumber] = useState<string>('22948102941');
  const [fullName, setFullName] = useState<string>('Bryan Wyatt');
  const [dateOfBirth, setDateOfBirth] = useState<string>('1996-08-14');
  
  // Tier 3 Form State (Address & Liveness Selfie)
  const [addressLine, setAddressLine] = useState<string>('Plot 12, Admiralty Way, Lekki Phase 1, Lagos');
  const [proofDocName, setProofDocName] = useState<string | null>(null);
  const [selfieTaken, setSelfieTaken] = useState<boolean>(false);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);

  const handleUpgradeTier2 = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionSuccess(null);

    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentTier(2);
      localStorage.setItem('rubby_kyc_tier', '2');
      setSubmissionSuccess('Tier 2 Approved! Verified in real-time via Smile Identity & NIBSS Gateway. Daily limit elevated to ₦1,000,000 / GH₵15,000.');
    }, 1500);
  };

  const handleUpgradeTier3 = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionSuccess(null);

    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentTier(3);
      localStorage.setItem('rubby_kyc_tier', '3');
      setSubmissionSuccess('Tier 3 Verified! Liveness facial biometric & Proof of Address cleared. You now hold UNLIMITED institutional trading and payout limits.');
    }, 1800);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className={`p-6 rounded-3xl border ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0E1322] border-white/10'} shadow-xl relative overflow-hidden`}>
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 dark:text-rose-400 font-bold text-[11px] uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Anti-Money Laundering & Identity Shield</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Tiered KYC & Automated Identity Verification
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Automated compliance verification compliant with CBN (Nigeria) and BoG (Ghana) banking regulations. Verify your identity in 30 seconds to scale your daily trade and payout limits.
          </p>
        </div>

        {/* Tier Cards Progression */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {/* Tier 1 */}
          <div className={`p-4 rounded-2xl border transition-all ${
            currentTier >= 1 
              ? 'bg-rose-500/10 border-rose-500/30' 
              : isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/5'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-rose-500">Tier 1 · Starter</span>
              {currentTier >= 1 && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Phone & Email</h4>
            <p className="text-[11px] text-slate-400 mt-1">Daily Limit: <strong>₦50,000 / GH₵500</strong></p>
            <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500">
              Active by Default
            </span>
          </div>

          {/* Tier 2 */}
          <div className={`p-4 rounded-2xl border transition-all ${
            currentTier >= 2 
              ? 'bg-indigo-500/10 border-indigo-500/30 ring-2 ring-indigo-500/20' 
              : isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/5'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-indigo-500">Tier 2 · Verified</span>
              {currentTier >= 2 ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Lock className="w-4 h-4 text-slate-400" />}
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">BVN / NIN / Ghana Card</h4>
            <p className="text-[11px] text-slate-400 mt-1">Daily Limit: <strong>₦1,000,000 / GH₵15,000</strong></p>
            <span className={`inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${
              currentTier >= 2 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
            }`}>
              {currentTier >= 2 ? 'Verified' : 'Recommended'}
            </span>
          </div>

          {/* Tier 3 */}
          <div className={`p-4 rounded-2xl border transition-all ${
            currentTier === 3 
              ? 'bg-amber-500/10 border-amber-500/30 ring-2 ring-amber-500/20' 
              : isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/5'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-amber-500">Tier 3 · Institutional VIP</span>
              {currentTier === 3 ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Lock className="w-4 h-4 text-slate-400" />}
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Proof of Address & Liveness</h4>
            <p className="text-[11px] text-slate-400 mt-1">Daily Limit: <strong>UNLIMITED</strong></p>
            <span className={`inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${
              currentTier === 3 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-500/10 text-slate-400'
            }`}>
              {currentTier === 3 ? 'Whitelisted' : 'High Volume'}
            </span>
          </div>
        </div>
      </div>

      {/* Success Banner */}
      <AnimatePresence>
        {submissionSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>{submissionSuccess}</span>
            </div>
            <button
              type="button"
              onClick={() => setSubmissionSuccess(null)}
              className="text-xs underline cursor-pointer"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Verification Action Forms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Tier 2 Form: BVN / NIN Verification */}
        <div className={`p-6 rounded-3xl border ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0E1322] border-white/10'} shadow-xl space-y-4`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Tier 2: Government Identity Linkage
              </h3>
              <p className="text-[11px] text-slate-400">Instant lookup via Prembly / Smile Identity</p>
            </div>
            {currentTier >= 2 ? (
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-bold text-xs flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-500 font-bold text-xs">
                Pending
              </span>
            )}
          </div>

          <form onSubmit={handleUpgradeTier2} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-white/60 mb-1">
                Select Identity Document
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'bvn', label: '🇳🇬 BVN (Bank Verification)' },
                  { id: 'nin', label: '🇳🇬 NIN (National ID)' },
                  { id: 'ghana_card', label: '🇬🇭 Ghana Card' }
                ].map(idDoc => (
                  <button
                    key={idDoc.id}
                    type="button"
                    onClick={() => setGovIdType(idDoc.id as any)}
                    className={`py-2 px-2 rounded-xl text-[10px] font-bold border transition cursor-pointer text-center ${
                      govIdType === idDoc.id
                        ? 'bg-rose-600 text-white border-rose-600'
                        : isLightMode ? 'bg-slate-50 text-slate-600 border-slate-200' : 'bg-white/5 text-slate-400 border-white/5'
                    }`}
                  >
                    {idDoc.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-white/60 mb-1">
                {govIdType === 'bvn' ? '11-Digit Bank Verification Number (BVN)' : govIdType === 'nin' ? '11-Digit National Identification Number (NIN)' : 'Ghana Card Pin (e.g. GHA-000000000-0)'}
              </label>
              <input
                type="text"
                value={govIdNumber}
                onChange={(e) => setGovIdNumber(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <span className="text-[10px] text-slate-400 block mt-1">
                🔒 Does NOT grant access to your bank accounts. Used solely for identity confirmation.
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-white/60 mb-1">
                  Full Legal Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-white/60 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || currentTier >= 2}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying with Government Database...</span>
                </>
              ) : currentTier >= 2 ? (
                <span>Tier 2 Already Active</span>
              ) : (
                <span>Verify & Elevate Limit to ₦1,000,000 / GH₵15,000</span>
              )}
            </button>
          </form>
        </div>

        {/* Tier 3 Form: Proof of Address & Liveness */}
        <div className={`p-6 rounded-3xl border ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0E1322] border-white/10'} shadow-xl space-y-4`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Tier 3: Institutional Whitelist
              </h3>
              <p className="text-[11px] text-slate-400">Utility Bill & Biometric 3D Liveness</p>
            </div>
            {currentTier === 3 ? (
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-bold text-xs flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Unlimited VIP
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 font-bold text-xs">
                Optional
              </span>
            )}
          </div>

          <form onSubmit={handleUpgradeTier3} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-white/60 mb-1">
                Residential Street Address
              </label>
              <input
                type="text"
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-white/60 mb-1">
                Upload Utility Bill or Bank Statement (PDF/JPG)
              </label>
              <div 
                onClick={() => setProofDocName('EKEDC_Utility_Receipt_OCT2026.pdf')}
                className={`p-4 rounded-xl border border-dashed text-center cursor-pointer transition ${
                  proofDocName ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-300 dark:border-white/20 hover:bg-slate-50 dark:hover:bg-white/5'
                }`}
              >
                <Upload className="w-5 h-5 mx-auto text-slate-400 mb-1" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  {proofDocName ? `Attached: ${proofDocName}` : 'Click to simulate attaching utility bill'}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Max 5MB · Must not be older than 3 months</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-white/60 mb-1">
                3D Facial Biometric Liveness Check
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelfieTaken(true)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition cursor-pointer flex items-center justify-center gap-1.5 ${
                    selfieTaken 
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500' 
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-500 hover:bg-rose-500/20'
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>{selfieTaken ? 'Liveness Score: 99.8% Passed' : 'Simulate 3D Camera Scan'}</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || currentTier === 3 || currentTier < 2}
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-amber-600/20"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Auditing Proof of Address...</span>
                </>
              ) : currentTier === 3 ? (
                <span>Tier 3 Already Active</span>
              ) : currentTier < 2 ? (
                <span>Complete Tier 2 First</span>
              ) : (
                <span>Submit For Unlimited VIP Limit</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
