import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  Check, 
  QrCode, 
  Smartphone, 
  AlertCircle,
  TrendingDown
} from 'lucide-react';

export default function SecurityPanel() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);

  const secretKey = 'RUBBY-Y7A9-K52L-91X3-SECURE';

  const handleToggleClick = () => {
    if (is2FAEnabled) {
      // Promptly disable it
      setIs2FAEnabled(false);
      setShowSetup(false);
    } else {
      setShowSetup(true);
    }
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVerificationError(null);

    if (authCode.length < 6) {
      setVerificationError('Authenticating code must be 6 digits.');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      // Let's accept any 6-digit numeric input code as demonstration
      setIs2FAEnabled(true);
      setShowSetup(false);
      setAuthCode('');
    }, 1500);
  };

  return (
    <div className="bg-white dark:bg-[#0E1322] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 shadow-xl space-y-4 text-slate-900 dark:text-white transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-slate-400 dark:text-white/40 font-bold text-[10px] tracking-widest uppercase flex items-center gap-1.5">
            <ShieldCheck className="w-5 h-5 text-rose-500 fill-rose-500/10" />
            Voucher Safe-Vault Protocols
          </span>
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">
            Two-Factor Security (2FA)
          </h3>
        </div>

        {/* Status Indicator */}
        <span className={`px-2.5 py-1 text-[9px] uppercase tracking-wider font-bold rounded-full ${
          is2FAEnabled 
            ? 'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/25'
            : 'bg-amber-50 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/25 animate-pulse'
        }`}>
          {is2FAEnabled ? '● Secured' : '○ Not Protected'}
        </span>
      </div>

      <p className="text-[11px] text-slate-500 dark:text-white/50 leading-relaxed">
        Activate 2FA security to secure your cash-out wallet balances and prevent unauthorized access to your codes and bank details.
      </p>

      {/* Primary Toggle Action */}
      <div className="flex items-center justify-between bg-slate-50 dark:bg-white/[0.04] p-4 rounded-2xl border border-slate-200 dark:border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-rose-50 dark:bg-rose-500/15 text-rose-600 dark:text-rose-400 rounded-xl flex items-center justify-center border border-rose-200 dark:border-rose-500/20">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Authenticator Protocols</h4>
            <span className="text-[10px] text-slate-500 dark:text-white/45 block">Google Authenticator or Duo App</span>
          </div>
        </div>

        <button
          type="button"
          id="btn-toggle-2fa"
          onClick={handleToggleClick}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 ease-in-out focus:outline-none ${
            is2FAEnabled ? 'bg-rose-600' : 'bg-slate-300 dark:bg-white/20'
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-300 ease-in-out ${
              is2FAEnabled ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* 2FA SETUP MODAL DRAWER INSIDE CARDS */}
      <AnimatePresence>
        {showSetup && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-200 dark:border-white/10 pt-4 mt-2 space-y-4">
              <div className="bg-rose-50 dark:bg-rose-500/10 p-3.5 rounded-xl border border-rose-200 dark:border-rose-500/20 flex gap-2.5 text-xs">
                <Smartphone className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0" />
                <div>
                  <strong className="text-slate-900 dark:text-white block mb-0.5">Link Google Authenticator</strong>
                  <span className="text-slate-600 dark:text-white/60 leading-relaxed text-[10px] block">
                    Install or open an authenticator token generator on your device. Scan the barcode below or type the manual alphanumeric key to get codes.
                  </span>
                </div>
              </div>

              {/* QR Code and Key details */}
              <div className="flex items-center justify-center gap-6 p-3 bg-slate-50 dark:bg-white/[0.04] rounded-xl border border-slate-200 dark:border-white/5">
                {/* Simulated QR Code SVG block */}
                <div className="w-24 h-24 bg-white dark:bg-zinc-950 border border-slate-200 dark:border-white/10 rounded-xl p-2 flex items-center justify-center shadow-inner relative group">
                  <QrCode className="w-20 h-20 text-slate-900 dark:text-white" />
                  <div className="absolute inset-0 bg-rose-600/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200">
                    <span className="text-[8px] font-bold text-slate-900 dark:text-white bg-white dark:bg-zinc-950 p-1 rounded border border-slate-200 dark:border-white/10">Rubby Setup</span>
                  </div>
                </div>

                <div className="space-y-1.5 flex-1 select-all">
                  <span className="text-[9px] uppercase text-slate-400 dark:text-white/40 font-bold block">Manual Secret Key Setup</span>
                  <code className="text-[10px] leading-tight font-mono text-slate-800 dark:text-white/80 block bg-white dark:bg-zinc-950 p-1.5 rounded border border-slate-200 dark:border-white/10">
                    {secretKey}
                  </code>
                </div>
              </div>

              {/* Activation Code input */}
              <form onSubmit={handleVerifySubmit} className="space-y-3 pt-1">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 dark:text-white/65 mb-1">
                    Enter Mock 6-Digit Verification Token Code
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    pattern="\d{6}"
                    value={authCode}
                    onChange={(e) => setAuthCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="e.g. 123456"
                    className="w-full px-3 py-2 text-center text-sm font-semibold tracking-widest border border-slate-300 dark:border-white/15 rounded-lg bg-white dark:bg-zinc-950 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                  />
                  {verificationError && (
                    <span className="text-[10px] text-rose-600 dark:text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {verificationError}
                    </span>
                  )}
                </div>

                <div className="flex gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowSetup(false)}
                    className="flex-1 border border-slate-300 dark:border-white/15 text-slate-700 dark:text-white/70 font-medium text-xs py-2 rounded-xl transition hover:bg-slate-100 dark:hover:bg-white/5 bg-transparent cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs py-2 rounded-xl transition flex items-center justify-center gap-1.5 disabled:opacity-50 font-bold cursor-pointer shadow-md shadow-rose-600/25"
                  >
                    {isVerifying ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Verifying...
                      </>
                    ) : (
                      'Activate Safe'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
