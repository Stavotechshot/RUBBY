import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  Check, 
  QrCode, 
  Smartphone, 
  AlertCircle,
  ScanFace,
  Fingerprint,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  X,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function SecurityPanel() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);

  // Biometric Verification States (FaceID / TouchID)
  const [isBiometricEnabled, setIsBiometricEnabled] = useState<boolean>(() => {
    return localStorage.getItem('rubby_biometrics_enabled') === 'true';
  });
  const [showBiometricEnrollment, setShowBiometricEnrollment] = useState(false);
  const [isEnrollingBiometric, setIsEnrollingBiometric] = useState(false);
  const [biometricEnrollmentSuccess, setBiometricEnrollmentSuccess] = useState(false);
  const [showTestPrompt, setShowTestPrompt] = useState(false);
  const [isTestScanning, setIsTestScanning] = useState(false);
  const [testSuccess, setTestSuccess] = useState(false);

  const secretKey = 'RUBBY-Y7A9-K52L-91X3-SECURE';

  const handleToggle2FA = () => {
    if (is2FAEnabled) {
      setIs2FAEnabled(false);
      setShowSetup(false);
    } else {
      setShowSetup(true);
    }
  };

  const handleVerify2FASubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVerificationError(null);

    if (authCode.length < 6) {
      setVerificationError('Authenticating code must be 6 digits.');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIs2FAEnabled(true);
      setShowSetup(false);
      setAuthCode('');
    }, 1200);
  };

  // Toggle Biometrics (FaceID / TouchID)
  const handleToggleBiometrics = () => {
    if (isBiometricEnabled) {
      setIsBiometricEnabled(false);
      localStorage.setItem('rubby_biometrics_enabled', 'false');
    } else {
      setShowBiometricEnrollment(true);
      setBiometricEnrollmentSuccess(false);
    }
  };

  const handleEnrollBiometrics = () => {
    setIsEnrollingBiometric(true);
    setTimeout(() => {
      setIsEnrollingBiometric(false);
      setBiometricEnrollmentSuccess(true);
      setIsBiometricEnabled(true);
      localStorage.setItem('rubby_biometrics_enabled', 'true');
      setTimeout(() => {
        setShowBiometricEnrollment(false);
      }, 1500);
    }, 1800);
  };

  const handleRunTestScan = () => {
    setShowTestPrompt(true);
    setIsTestScanning(true);
    setTestSuccess(false);

    setTimeout(() => {
      setIsTestScanning(false);
      setTestSuccess(true);
      setTimeout(() => {
        setShowTestPrompt(false);
      }, 1400);
    }, 1600);
  };

  return (
    <div className="bg-white dark:bg-[#0E1322] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 shadow-xl space-y-6 text-slate-900 dark:text-white transition-colors">
      
      {/* 1. Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-slate-400 dark:text-white/40 font-bold text-[10px] tracking-widest uppercase flex items-center gap-1.5 font-mono">
            <ShieldCheck className="w-4 h-4 text-rose-500" />
            Security & Cryptographic Vault
          </span>
          <h3 className="text-base font-black text-slate-900 dark:text-white mt-1">
            Institutional Account Protection
          </h3>
        </div>

        {/* Status Indicator */}
        <span className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider font-bold rounded-full ${
          is2FAEnabled || isBiometricEnabled
            ? 'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/25'
            : 'bg-amber-50 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/25 animate-pulse'
        }`}>
          {is2FAEnabled && isBiometricEnabled 
            ? '● Tier-3 Hardware Secured' 
            : isBiometricEnabled 
              ? '● Biometrics Enforced' 
              : is2FAEnabled 
                ? '● 2FA Active' 
                : '○ Standard Level'}
        </span>
      </div>

      <p className="text-xs text-slate-500 dark:text-white/50 leading-relaxed">
        Enforce cryptographic and biometric safeguards for high-volume gift card settlements, NUBAN cashouts, and sensitive beneficiary withdrawals.
      </p>

      {/* 2. BIOMETRIC VERIFICATION (FACEID / TOUCHID) MODULE */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-500/5 via-slate-50 to-amber-500/5 dark:from-rose-500/10 dark:via-white/[0.03] dark:to-amber-500/10 border border-rose-500/20 space-y-4">
        
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-600/30 shrink-0">
              <ScanFace className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Biometric Verification
                </h4>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-rose-500/15 text-rose-500 border border-rose-500/20">
                  FaceID / TouchID
                </span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                Require Apple FaceID, TouchID, or Windows Hello for withdrawal confirmations.
              </span>
            </div>
          </div>

          {/* Toggle Switch */}
          <button
            type="button"
            id="btn-toggle-biometrics"
            onClick={handleToggleBiometrics}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 ease-in-out focus:outline-hidden ${
              isBiometricEnabled ? 'bg-rose-600' : 'bg-slate-300 dark:bg-white/20'
            }`}
            title="Toggle Biometric Verification"
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-250 ease-in-out ${
                isBiometricEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Hardware Status & Test Simulation Action */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/60 dark:border-white/10 text-xs">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400">
            <Fingerprint className="w-3.5 h-3.5 text-emerald-500" />
            <span>Hardware: <strong>Apple Secure Enclave (FIDO2)</strong></span>
          </div>

          {isBiometricEnabled && (
            <button
              type="button"
              onClick={handleRunTestScan}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-white/10 hover:bg-slate-100 dark:hover:bg-white/15 border border-slate-200 dark:border-white/10 text-[11px] font-bold text-rose-600 dark:text-rose-400 transition cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <ScanFace className="w-3.5 h-3.5" />
              <span>Test FaceID Prompt</span>
            </button>
          )}
        </div>

      </div>

      {/* 3. TWO-FACTOR AUTHENTICATOR (2FA) PROTOCOL */}
      <div className="flex items-center justify-between bg-slate-50 dark:bg-white/[0.04] p-4 rounded-2xl border border-slate-200 dark:border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-rose-50 dark:bg-rose-500/15 text-rose-600 dark:text-rose-400 rounded-xl flex items-center justify-center border border-rose-200 dark:border-rose-500/20">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Authenticator Protocols (TOTP)</h4>
            <span className="text-[10px] text-slate-500 dark:text-white/45 block">Google Authenticator or 1Password</span>
          </div>
        </div>

        <button
          type="button"
          id="btn-toggle-2fa"
          onClick={handleToggle2FA}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 ease-in-out focus:outline-hidden ${
            is2FAEnabled ? 'bg-rose-600' : 'bg-slate-300 dark:bg-white/20'
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-250 ease-in-out ${
              is2FAEnabled ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* 2FA SETUP DRAWER */}
      <AnimatePresence>
        {showSetup && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-200 dark:border-white/10 pt-4 space-y-4">
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
              <form onSubmit={handleVerify2FASubmit} className="space-y-3 pt-1">
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
                    className="w-full px-3 py-2 text-center text-sm font-semibold tracking-widest border border-slate-300 dark:border-white/15 rounded-lg bg-white dark:bg-zinc-950 text-slate-900 dark:text-white font-mono focus:outline-hidden focus:ring-2 focus:ring-rose-500/50"
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

      {/* BIOMETRICS ENROLLMENT MODAL */}
      <AnimatePresence>
        {showBiometricEnrollment && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm p-6 rounded-3xl bg-[#0E1322] border border-rose-500/30 text-white text-center shadow-2xl relative overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setShowBiometricEnrollment(false)}
                className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Viewfinder Face Scanner */}
              <div className="w-28 h-28 mx-auto my-4 relative flex items-center justify-center">
                {/* Viewfinder corners */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-rose-500 rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-rose-500 rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-rose-500 rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-rose-500 rounded-br-lg" />

                {/* Laser animation */}
                {isEnrollingBiometric && (
                  <motion.div
                    animate={{ top: ['10%', '90%', '10%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute left-2 right-2 h-0.5 bg-rose-500 shadow-lg shadow-rose-500"
                  />
                )}

                {biometricEnrollmentSuccess ? (
                  <CheckCircle2 className="w-16 h-16 text-emerald-400 animate-in zoom-in" />
                ) : (
                  <ScanFace className={`w-16 h-16 ${isEnrollingBiometric ? 'text-rose-400 animate-pulse' : 'text-slate-400'}`} />
                )}
              </div>

              <h4 className="text-base font-bold text-white">
                {biometricEnrollmentSuccess 
                  ? 'Biometric Key Enrolled!' 
                  : isEnrollingBiometric 
                    ? 'Scanning Face & Secure Enclave...' 
                    : 'Enroll FaceID / TouchID'}
              </h4>

              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                {biometricEnrollmentSuccess
                  ? 'FaceID is now paired to this browser session. All future payouts will require biometric authorization.'
                  : 'Pair your device biometric sensor to authorize fast, instant one-tap cashouts with zero password fatigue.'}
              </p>

              {!biometricEnrollmentSuccess && (
                <div className="mt-5 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowBiometricEnrollment(false)}
                    className="flex-1 py-2.5 rounded-xl border border-white/10 text-xs font-bold hover:bg-white/5 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleEnrollBiometrics}
                    disabled={isEnrollingBiometric}
                    className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-lg shadow-rose-600/30"
                  >
                    <Fingerprint className="w-4 h-4" />
                    <span>Scan & Enroll</span>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TEST BIOMETRIC SCAN POPUP */}
      <AnimatePresence>
        {showTestPrompt && (
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-xs p-6 rounded-3xl bg-[#090C18] border border-rose-500/40 text-white text-center shadow-2xl relative"
            >
              <div className="w-20 h-20 mx-auto mb-3 relative flex items-center justify-center">
                {/* Viewfinder frame */}
                <div className="absolute inset-0 border-2 border-dashed border-rose-500/60 rounded-2xl animate-spin" style={{ animationDuration: '6s' }} />
                {testSuccess ? (
                  <Check className="w-10 h-10 text-emerald-400 stroke-[3]" />
                ) : (
                  <ScanFace className="w-10 h-10 text-rose-400 animate-pulse" />
                )}
              </div>

              <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400 font-bold block mb-1">
                Rubby Capital Vault
              </span>
              <h4 className="text-sm font-bold text-white">
                {testSuccess ? 'FaceID Verified!' : 'Authenticating Biometrics...'}
              </h4>
              <p className="text-[11px] text-slate-400 mt-1">
                {testSuccess ? 'Withdrawal confirmation token signed via Secure Enclave.' : 'Looking for Bryan Wyatt...'}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
