import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Coins, 
  CreditCard, 
  ShieldCheck, 
  ArrowDownLeft, 
  Lock, 
  Eye, 
  EyeOff, 
  Copy, 
  Check, 
  Sparkles,
  Zap
} from 'lucide-react';
import { Currency } from '../types';
import VirtualAccountsView from './VirtualAccountsView';
import CryptoDepositView from './CryptoDepositView';

interface AccountsViewProps {
  nairaBalance: number;
  cedisBalance: number;
  onDepositSimulated: (currency: Currency, amount: number, senderName: string, bank: string) => void;
  onCryptoCredited: (currency: Currency, amountFiat: number, cryptoAmount: string, asset: string) => void;
  isLightMode?: boolean;
}

export default function AccountsView({
  nairaBalance,
  cedisBalance,
  onDepositSimulated,
  onCryptoCredited,
  isLightMode = false
}: AccountsViewProps) {
  const [activeAccountTab, setActiveAccountTab] = useState<'bank' | 'crypto' | 'cards'>('bank');

  // Virtual Dollar Card State
  const [isCardFrozen, setIsCardFrozen] = useState(false);
  const [showCvv, setShowCvv] = useState(false);
  const [spendingLimit, setSpendingLimit] = useState(1500);
  const [copiedCardNum, setCopiedCardNum] = useState(false);

  const handleCopyCard = () => {
    navigator.clipboard.writeText('5399 4182 9012 4892');
    setCopiedCardNum(true);
    setTimeout(() => setCopiedCardNum(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Segmented Navigation Switcher */}
      <div className={`p-1.5 rounded-2xl border flex flex-wrap gap-1 ${isLightMode ? 'bg-slate-100 border-slate-200' : 'bg-white/5 border-white/10'}`}>
        <button
          type="button"
          onClick={() => setActiveAccountTab('bank')}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
            activeAccountTab === 'bank'
              ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
              : isLightMode ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Virtual Bank & MoMo</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveAccountTab('crypto')}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
            activeAccountTab === 'crypto'
              ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
              : isLightMode ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Coins className="w-4 h-4" />
          <span>Crypto Auto-Sweep (USDT / BTC)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveAccountTab('cards')}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
            activeAccountTab === 'cards'
              ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
              : isLightMode ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Virtual Dollar Card</span>
        </button>
      </div>

      {/* TAB 1: BANK & MOMO ACCOUNTS */}
      {activeAccountTab === 'bank' && (
        <VirtualAccountsView
          nairaBalance={nairaBalance}
          cedisBalance={cedisBalance}
          onDepositSimulated={onDepositSimulated}
          isLightMode={isLightMode}
        />
      )}

      {/* TAB 2: CRYPTO AUTO-SWEEP */}
      {activeAccountTab === 'crypto' && (
        <CryptoDepositView
          nairaBalance={nairaBalance}
          cedisBalance={cedisBalance}
          onCryptoCredited={onCryptoCredited}
          isLightMode={isLightMode}
        />
      )}

      {/* TAB 3: VIRTUAL DOLLAR CARD VAULT */}
      {activeAccountTab === 'cards' && (
        <div className="space-y-6">
          <div className={`p-6 rounded-3xl border ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0E1322] border-white/10'} shadow-xl`}>
            <div className="max-w-3xl space-y-2 mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 font-bold text-[11px] uppercase tracking-wider">
                <CreditCard className="w-3.5 h-3.5" />
                <span>Instant International Spending</span>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Virtual Dollar Mastercard / Visa
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Fund international payments, SaaS subscriptions, Apple Music, Spotify, Steam, AWS, and online stores directly using your Naira or Cedis balance.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Virtual Card Visual Mockup */}
              <div className="lg:col-span-6 flex flex-col items-center">
                
                {/* Real Card Visual Switcher */}
                <div className="w-full max-w-sm flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Real Metal Obsidian Dollar Card</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/20">
                    3D Secure 2.0
                  </span>
                </div>

                {/* Real Card Presentation */}
                <div className={`w-full max-w-sm aspect-[1.586/1] rounded-3xl text-white shadow-2xl relative overflow-hidden transition-all duration-300 border border-amber-500/30 ${
                  isCardFrozen ? 'opacity-50 grayscale' : 'hover:scale-102'
                }`}>
                  <img
                    src="/src/assets/images/rubby_virtual_card_1791830834821.jpg"
                    alt="Rubby Real Metal Obsidian Card"
                    className="w-full h-full object-cover"
                  />

                  {/* Dynamic interactive overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 p-5 flex flex-col justify-between pointer-events-auto">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-black tracking-widest text-amber-300 drop-shadow-md uppercase">
                        RUBBY OBSIDIAN PLATINUM
                      </span>
                      <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20">
                        <span className={`w-2 h-2 rounded-full ${isCardFrozen ? 'bg-rose-500' : 'bg-emerald-400 animate-pulse'}`} />
                        <span className="text-[9px] font-mono font-bold tracking-wider text-white uppercase">
                          {isCardFrozen ? 'FROZEN' : 'ACTIVE'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-base md:text-lg font-black tracking-widest text-amber-200 drop-shadow-lg">
                          5399 4182 9012 4892
                        </span>
                        <button
                          type="button"
                          onClick={handleCopyCard}
                          className="p-1.5 rounded-lg bg-black/60 hover:bg-black/90 border border-white/20 transition cursor-pointer text-white"
                          title="Copy Card Number"
                        >
                          {copiedCardNum ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-300" />}
                        </button>
                      </div>

                      <div className="flex items-end justify-between pt-1">
                        <div>
                          <span className="text-[8px] font-mono text-slate-300 block uppercase">Cardholder</span>
                          <span className="font-mono text-[11px] font-bold tracking-wider text-white">BRYAN WYATT</span>
                        </div>
                        <div>
                          <span className="text-[8px] font-mono text-slate-300 block uppercase">Expires</span>
                          <span className="font-mono text-[11px] font-bold text-white">09/28</span>
                        </div>
                        <div>
                          <span className="text-[8px] font-mono text-slate-300 block uppercase">CVV</span>
                          <span className="font-mono text-[11px] font-bold text-amber-300">
                            {showCvv ? '481' : '•••'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full max-w-sm flex items-center justify-between mt-3 text-xs text-slate-500">
                  <span className="font-mono">Balance: <strong className="text-emerald-500 font-extrabold">$1,000.00 USD</strong></span>
                  <button
                    type="button"
                    onClick={() => setShowCvv(p => !p)}
                    className="flex items-center gap-1 text-rose-500 font-semibold hover:underline cursor-pointer"
                  >
                    {showCvv ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{showCvv ? 'Hide CVV' : 'Reveal CVV'}</span>
                  </button>
                </div>
              </div>

              {/* Card Controls */}
              <div className="lg:col-span-6 space-y-4">
                <div className={`p-5 rounded-2xl border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/5'} space-y-4`}>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    Card Security & Spending Controls
                  </h4>

                  <div className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-white/5">
                    <div>
                      <span className="text-xs font-semibold block text-slate-900 dark:text-white">Freeze Virtual Card</span>
                      <span className="text-[11px] text-slate-400">Instantly block all incoming international debits</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsCardFrozen(p => !p)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                        isCardFrozen 
                          ? 'bg-rose-600 text-white' 
                          : 'bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {isCardFrozen ? 'Unfreeze Card' : 'Freeze Card'}
                    </button>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-slate-900 dark:text-white">Monthly Spend Ceiling</span>
                      <span className="text-xs font-mono font-bold text-rose-500">${spendingLimit} USD</span>
                    </div>
                    <input
                      type="range"
                      min="200"
                      max="5000"
                      step="100"
                      value={spendingLimit}
                      onChange={(e) => setSpendingLimit(Number(e.target.value))}
                      className="w-full accent-rose-600"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                      <span>$200 Min</span>
                      <span>$5,000 Max</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                    <span className="text-[11px]">
                      Zero FX markup fee. 3D Secure 2.0 OTP authentication delivers code via SMS & registered email.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
