import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CreditCard, 
  Sparkles, 
  RotateCw, 
  Eye, 
  EyeOff, 
  Copy, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2,
  TrendingUp,
  Tag,
  Zap
} from 'lucide-react';
import { Currency } from '../types';
import BrandLogo from './BrandLogo';

export interface RealCardItem {
  id: string;
  name: string;
  category: string;
  image: string;
  country: string;
  flag: string;
  denominations: number[];
  ngnRate: number;
  ghsRate: number;
  physicalBonus: number;
  badge?: string;
  pinSample: string;
  barcode: string;
  description: string;
}

export const REAL_CARDS_DATA: RealCardItem[] = [
  {
    id: 'apple',
    name: 'Apple Gift Card & iTunes',
    category: 'Digital & Retail',
    image: '/src/assets/images/apple_gift_card_1791830736615.jpg',
    country: 'United States',
    flag: '🇺🇸',
    denominations: [25, 50, 100, 200, 500],
    ngnRate: 885,
    ghsRate: 11.80,
    physicalBonus: 15,
    badge: 'Top Liquidity',
    pinSample: 'X79Q 4812 9043 8129',
    barcode: '6014 9182 0482 1923',
    description: 'Authentic multi-color Apple sticker card. Valid for App Store, iTunes, Apple hardware and subscriptions.'
  },
  {
    id: 'steam',
    name: 'Steam Wallet Card',
    category: 'Gaming',
    image: '/src/assets/images/steam_wallet_card_1791830754810.jpg',
    country: 'Global / USA',
    flag: '🇺🇸',
    denominations: [20, 50, 100, 200],
    ngnRate: 890,
    ghsRate: 11.95,
    physicalBonus: 20,
    badge: 'Highest Rate',
    pinSample: 'STM9-4820-KLP2-9184',
    barcode: '4091 8294 0192 4819',
    description: 'Valve Steam gaming voucher. Instant auto-redemption for games, software, and in-game cosmetics.'
  },
  {
    id: 'razer',
    name: 'Razer Gold Gift Card',
    category: 'Gaming',
    image: '/src/assets/images/razer_gold_card_1791830772750.jpg',
    country: 'Global / USA',
    flag: '🇺🇸',
    denominations: [10, 25, 50, 100, 250],
    ngnRate: 875,
    ghsRate: 11.65,
    physicalBonus: 15,
    badge: 'Popular',
    pinSample: 'RZRG-9182-4019-4810',
    barcode: '9182 4019 4810 5928',
    description: 'Signature carbon-fiber black card with glowing neon green acid logo. Instant PIN settlement.'
  },
  {
    id: 'vanilla',
    name: 'Vanilla Visa Prepaid Card',
    category: 'Prepaid Banking',
    image: '/src/assets/images/vanilla_visa_card_1791830790321.jpg',
    country: 'United States',
    flag: '🇺🇸',
    denominations: [50, 100, 200, 500],
    ngnRate: 865,
    ghsRate: 11.50,
    physicalBonus: 25,
    badge: 'Fast Cashout',
    pinSample: '4123 4567 8901 2345',
    barcode: '5019 4819 2841 0192',
    description: 'Authentic metallic silver debit card with embossed chip and hologram. 4000/4118 BIN accepted.'
  },
  {
    id: 'amazon',
    name: 'Amazon Gift Card',
    category: 'E-Commerce',
    image: '/src/assets/images/amazon_gift_card_1791830811971.jpg',
    country: 'United States',
    flag: '🇺🇸',
    denominations: [25, 50, 100, 250, 500],
    ngnRate: 880,
    ghsRate: 11.70,
    physicalBonus: 15,
    badge: 'Zero Slippage',
    pinSample: 'AQ91-8401-9284-KL91',
    barcode: '7606 5678 2000 3019',
    description: 'Iconic matte obsidian black Amazon card with golden smile arrow. Physical receipt cards earn top tier.'
  },
  {
    id: 'google',
    name: 'Google Play Gift Card',
    category: 'Digital Content',
    image: '/src/assets/images/google_play_card_1791830862088.jpg',
    country: 'United States',
    flag: '🇺🇸',
    denominations: [15, 25, 50, 100, 200],
    ngnRate: 860,
    ghsRate: 11.45,
    physicalBonus: 10,
    badge: 'Instant',
    pinSample: 'GPLY-9481-2048-9182',
    barcode: '3019 4810 5928 4019',
    description: 'Clean retail card with official 4-color prism triangle. Accepted for all Google Play Store purchases.'
  }
];

export interface RealCardsCatalogProps {
  currency?: Currency;
  onSelectCardForTrade?: (brandId: string) => void;
  onSelectTradeCard?: (brandId: string, cardName: string, rate: number) => void;
  isLightMode?: boolean;
}

export default function RealCardsCatalog({
  currency = Currency.NGN,
  onSelectCardForTrade,
  onSelectTradeCard,
  isLightMode = false
}: RealCardsCatalogProps) {
  const [selectedCard, setSelectedCard] = useState<RealCardItem>(REAL_CARDS_DATA[0]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [revealedPin, setRevealedPin] = useState(false);
  const [copiedPin, setCopiedPin] = useState(false);
  const [activeDenomination, setActiveDenomination] = useState<number>(100);

  const rate = currency === Currency.NGN ? selectedCard.ngnRate : selectedCard.ghsRate;
  const symbol = currency === Currency.NGN ? '₦' : 'GH₵';
  const payout = activeDenomination * rate;

  const handleCopyPin = () => {
    navigator.clipboard.writeText(selectedCard.pinSample);
    setCopiedPin(true);
    setTimeout(() => setCopiedPin(false), 2000);
  };

  return (
    <div className={`p-6 md:p-8 rounded-3xl border transition-colors ${
      isLightMode ? 'bg-white border-slate-200 shadow-md' : 'bg-[#0E1322] border-white/10 shadow-2xl'
    }`}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200 dark:border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-500 font-bold text-[10px] tracking-wider uppercase flex items-center gap-1 border border-rose-500/20">
              <Sparkles className="w-3 h-3" />
              Verified Authentic Assets
            </span>
            <span className="text-[11px] text-emerald-500 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Real Card Inspector Active
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-white mt-1">
            Real Physical & E-Code Cards Catalog
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Inspect genuine card artwork, scratch-off security foil, barcode numbers, and instant live payout rates.
          </p>
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono">
            <span className="text-slate-400 mr-1.5">Payout:</span>
            <strong className="text-rose-600 dark:text-rose-400 font-extrabold">{currency}</strong>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Real Card 3D Viewer */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-rose-500" />
              <span>Card Examination Stage ({selectedCard.name})</span>
            </span>

            <button
              type="button"
              onClick={() => {
                setIsFlipped(p => !p);
                setRevealedPin(false);
              }}
              className="text-xs font-bold text-rose-500 hover:text-rose-600 flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 transition cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>{isFlipped ? 'Show Front Cover' : 'Flip to Back (PIN & Barcode)'}</span>
            </button>
          </div>

          {/* 3D Card Display Container */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-slate-300 dark:border-white/15 shadow-2xl bg-black group">
            <AnimatePresence mode="wait">
              {!isFlipped ? (
                /* FRONT: Real Photorealistic Card Image */
                <motion.div
                  key="front"
                  initial={{ opacity: 0, rotateY: -90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: 90 }}
                  transition={{ duration: 0.35 }}
                  className="w-full h-full relative"
                >
                  <img
                    src={selectedCard.image}
                    alt={selectedCard.name}
                    className="w-full h-full object-cover"
                  />

                  {/* High-Resolution Overlay Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white font-mono text-xs font-bold border border-white/20 shadow-md">
                      {selectedCard.flag} {selectedCard.country}
                    </span>
                    {selectedCard.badge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px] uppercase tracking-wider shadow-md">
                        {selectedCard.badge}
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20 text-right">
                    <span className="text-[10px] text-slate-300 block font-mono">Face Denomination</span>
                    <span className="text-base font-black font-mono text-amber-400">
                      ${activeDenomination} USD
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
                    <span className="text-[10px] text-slate-300 block font-mono">Instant Rate</span>
                    <span className="text-sm font-extrabold font-mono text-emerald-400">
                      {symbol}{rate} / $1
                    </span>
                  </div>
                </motion.div>
              ) : (
                /* BACK: Authentic Scratch-Off PIN, Magnetic Stripe & Barcode */
                <motion.div
                  key="back"
                  initial={{ opacity: 0, rotateY: 90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: -90 }}
                  transition={{ duration: 0.35 }}
                  className="w-full h-full bg-[#151928] p-6 text-white flex flex-col justify-between relative overflow-hidden"
                >
                  {/* Magnetic Stripe */}
                  <div className="-mx-6 -mt-1 h-12 bg-black border-y border-white/10" />

                  {/* Center Scratch Area & Barcode */}
                  <div className="space-y-4 my-auto">
                    {/* Scratch-off PIN Box */}
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-white/15 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                          Official Scratch-off Claim Code / PIN
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setRevealedPin(p => !p)}
                            className="text-[11px] text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1 cursor-pointer"
                          >
                            {revealedPin ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            <span>{revealedPin ? 'Conceal' : 'Scratch & Reveal'}</span>
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-lg bg-black/60 border border-white/10">
                        <span className="font-mono text-sm md:text-base font-black tracking-widest text-emerald-400">
                          {revealedPin ? selectedCard.pinSample : '•••• •••• •••• ••••'}
                        </span>
                        <button
                          type="button"
                          onClick={handleCopyPin}
                          className="p-1 rounded-md bg-white/10 hover:bg-white/20 transition cursor-pointer"
                          title="Copy voucher pin"
                        >
                          {copiedPin ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-300" />}
                        </button>
                      </div>
                    </div>

                    {/* Barcode Mockup */}
                    <div className="flex items-center justify-between bg-black/40 p-2.5 rounded-xl border border-white/10">
                      <div className="space-y-0.5">
                        <div className="h-6 flex items-center gap-0.5">
                          {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 4, 1, 3, 2, 4, 1, 2].map((w, i) => (
                            <span 
                              key={i} 
                              className="h-full bg-white rounded-xs inline-block" 
                              style={{ width: `${w * 1.5}px` }} 
                            />
                          ))}
                        </div>
                        <span className="text-[9px] font-mono text-slate-400 tracking-wider">
                          SERIAL: {selectedCard.barcode}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">
                        VERIFIED BARCODE
                      </span>
                    </div>
                  </div>

                  {/* Legal Terms Footer */}
                  <p className="text-[9px] text-slate-400 leading-tight border-t border-white/10 pt-2">
                    Card valid for redemption on official merchant servers. Do not share scratched PIN with unauthorized parties. Rubby provides instant automated escrow settlement.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Denomination Picker */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-semibold text-slate-500">Pick Denomination:</span>
            <div className="flex items-center gap-1.5">
              {selectedCard.denominations.map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setActiveDenomination(val)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer border ${
                    activeDenomination === val
                      ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                      : isLightMode 
                        ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700' 
                        : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
                  }`}
                >
                  ${val}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Card Details & Direct Trade Trigger */}
        <div className="lg:col-span-5 space-y-5">
          <div className={`p-5 rounded-2xl border ${
            isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/5'
          } space-y-4`}>
            {/* Brand Header */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center p-2 shrink-0">
                <BrandLogo brandId={selectedCard.id} className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {selectedCard.name}
                </h3>
                <span className="text-xs text-slate-400 block font-mono">
                  {selectedCard.category} · {selectedCard.country}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedCard.description}
            </p>

            {/* Payout Calculation Box */}
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-2">
              <div className="flex justify-between items-baseline text-xs">
                <span className="text-slate-600 dark:text-slate-300">Base Exchange Rate:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {symbol}{rate} / $1 USD
                </span>
              </div>

              <div className="flex justify-between items-baseline text-xs">
                <span className="text-slate-600 dark:text-slate-300">Physical Card Incentive:</span>
                <span className="font-mono font-bold text-emerald-500">
                  +{currency === Currency.NGN ? `₦${selectedCard.physicalBonus}` : `GH₵0.20`}/$ Extra
                </span>
              </div>

              <div className="pt-2 border-t border-rose-500/20 flex justify-between items-baseline">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Instant Liquidation Payout:
                </span>
                <span className="font-mono text-xl font-black text-rose-600 dark:text-rose-400">
                  {symbol}{payout.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Direct Action Button */}
            <button
              type="button"
              onClick={() => {
                if (onSelectTradeCard) {
                  onSelectTradeCard(selectedCard.id, selectedCard.name, rate);
                } else if (onSelectCardForTrade) {
                  onSelectCardForTrade(selectedCard.id);
                }
              }}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 active:scale-98 transition cursor-pointer"
            >
              <span>Sell {selectedCard.name} Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero network deductions · Bank credit under 5s</span>
            </div>
          </div>

          {/* Catalog Thumbnail Selector Bar */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-900 dark:text-white block">
              Switch Card Asset:
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {REAL_CARDS_DATA.map(c => {
                const isSelected = c.id === selectedCard.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setSelectedCard(c);
                      setIsFlipped(false);
                      setRevealedPin(false);
                    }}
                    className={`p-1.5 rounded-xl border text-center transition cursor-pointer flex flex-col items-center gap-1 ${
                      isSelected
                        ? 'border-rose-500 bg-rose-500/15 ring-2 ring-rose-500/30'
                        : isLightMode
                          ? 'border-slate-200 bg-white hover:bg-slate-100'
                          : 'border-white/5 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-black/40 flex items-center justify-center p-1">
                      <BrandLogo brandId={c.id} className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold truncate w-full text-slate-800 dark:text-white">
                      {c.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
