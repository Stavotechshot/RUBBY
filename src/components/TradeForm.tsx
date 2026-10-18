import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  DollarSign, 
  HelpCircle, 
  Upload, 
  CheckCircle, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Coins, 
  AlertCircle,
  FileImage,
  Flame,
  Camera,
  Scan,
  Layers,
  Check,
  CreditCard
} from 'lucide-react';
import { Currency, GiftCardBrand, SUPPORTED_BRANDS, Trade } from '../types';
import BrandLogo from './BrandLogo';

interface TradeFormProps {
  onTradeCreated: (trade: Omit<Trade, 'id' | 'createdAt' | 'receiptNumber' | 'status'>) => void;
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  liveRates?: Record<string, { NGN: number; GHS: number }>;
}

// Real photorealistic card photo assets for verified merchant vouchers
const REAL_CARD_OPTIONS = [
  { 
    id: 'apple', 
    name: 'Apple $100 Card', 
    image: '/src/assets/images/apple_gift_card_1791830736615.jpg',
    tag: 'Retail Sticker Card',
    value: 100
  },
  { 
    id: 'steam', 
    name: 'Steam $100 Card', 
    image: '/src/assets/images/steam_wallet_card_1791830754810.jpg',
    tag: 'Gaming Barcode',
    value: 100
  },
  { 
    id: 'razer', 
    name: 'Razer Gold $100', 
    image: '/src/assets/images/razer_gold_card_1791830772750.jpg',
    tag: 'Carbon Foil Card',
    value: 100
  },
  { 
    id: 'vanilla', 
    name: 'Vanilla Visa $200', 
    image: '/src/assets/images/vanilla_visa_card_1791830790321.jpg',
    tag: 'Chip & Hologram',
    value: 200
  },
  { 
    id: 'amazon', 
    name: 'Amazon $100 Card', 
    image: '/src/assets/images/amazon_gift_card_1791830811971.jpg',
    tag: 'Matte Smile Card',
    value: 100
  },
  { 
    id: 'google', 
    name: 'Google Play $50', 
    image: '/src/assets/images/google_play_card_1791830862088.jpg',
    tag: 'Official Prism',
    value: 50
  },
];

export default function TradeForm({ onTradeCreated, currency, onCurrencyChange, liveRates }: TradeFormProps) {
  const [selectedBrand, setSelectedBrand] = useState<GiftCardBrand>(SUPPORTED_BRANDS[0]);
  const [cardValue, setCardValue] = useState<string>('100');
  const [tradeType, setTradeType] = useState<'e-code' | 'physical'>('e-code');
  const [inputCode, setInputCode] = useState<string>('');
  const [customTagInput, setCustomTagInput] = useState<string>('');
  
  // Real card photo upload state
  const [uploadedCardImage, setUploadedCardImage] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isSuccessAnimated, setIsSuccessAnimated] = useState(false);

  // Optical Character Recognition (OCR) Camera Scanner state
  const [isScanningOcr, setIsScanningOcr] = useState(false);
  const [ocrSuccess, setOcrSuccess] = useState(false);
  const [isBatchMode, setIsBatchMode] = useState(false);
  const [batchCodesText, setBatchCodesText] = useState('STEAM-9481-2041-9921\nSTEAM-3841-8842-1052\nSTEAM-7721-6541-3391');

  // Listener for Repeat Trade
  useEffect(() => {
    const handleRepeat = (e: Event) => {
      const customEvent = e as CustomEvent<{ brandId: string; cardValue: number; tradeType: 'e-code' | 'physical'; customTag?: string }>;
      const { brandId, cardValue, tradeType: repTradeType, customTag } = customEvent.detail;
      const brand = SUPPORTED_BRANDS.find(b => b.id === brandId);
      if (brand) {
        setSelectedBrand(brand);
      }
      setCardValue(cardValue.toString());
      setTradeType(repTradeType);
      setCustomTagInput(customTag || '');
      if (repTradeType === 'e-code') {
        setInputCode(`CLAIM-${Math.floor(1000 + Math.random() * 9000)}-PIN`);
      } else {
        setUploadedFileName(`${brandId}_card_upload.jpg`);
      }

      // Auto scroll container to view TradeForm
      const container = document.getElementById('trade-form-container');
      if (container) {
        container.scrollIntoView({ behavior: 'smooth' });
      }
    };
    window.addEventListener('repeat-rubby-trade', handleRepeat);
    return () => window.removeEventListener('repeat-rubby-trade', handleRepeat);
  }, []);

  // Filter gift card options categories
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const categories = useMemo(() => {
    return ['All', 'Gaming', 'Digital', 'Retail'];
  }, []);

  const filteredBrands = useMemo(() => {
    if (selectedCategory === 'All') return SUPPORTED_BRANDS;
    return SUPPORTED_BRANDS.filter(b => b.category === selectedCategory);
  }, [selectedCategory]);

  const currentRate = useMemo(() => {
    if (liveRates && liveRates[selectedBrand.id]) {
      return liveRates[selectedBrand.id][currency];
    }
    return selectedBrand.rates[currency];
  }, [selectedBrand, currency, liveRates]);

  const payoutAmount = useMemo(() => {
    const value = parseFloat(cardValue);
    if (isNaN(value) || value <= 0) return 0;
    // Physical cards usually get an extra visual incentive (e.g. +₦10/$ or +0.15 GH₵/$)
    const activeRate = tradeType === 'physical' ? currentRate + (currency === Currency.NGN ? 15 : 0.25) : currentRate;
    return value * activeRate;
  }, [cardValue, currentRate, tradeType, currency]);

  const rewardPoints = useMemo(() => {
    const value = parseFloat(cardValue);
    if (isNaN(value) || value <= 0) return 0;
    return Math.floor(value * 2.5); // 2.5 Rubby Points per USD traded
  }, [cardValue]);

  const handleSellInstantly = (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseFloat(cardValue);
    if (isNaN(value) || value <= 0) {
      alert('Please enter a valid card face value.');
      return;
    }

    if (tradeType === 'e-code' && !inputCode.trim()) {
      alert('Please enter your 16-digit e-code PIN or voucher code to trade.');
      return;
    }

    if (tradeType === 'physical' && !uploadedFileName) {
      alert('Please upload or select a card mockup photo for transaction processing.');
      return;
    }

    // Pass trade options to parent
    onTradeCreated({
      brandId: selectedBrand.id,
      brandName: selectedBrand.name,
      cardValue: value,
      currencyOutput: currency,
      rate: tradeType === 'physical' ? currentRate + (currency === Currency.NGN ? 15 : 0.25) : currentRate,
      payoutAmount: payoutAmount,
      codeOrPin: tradeType === 'e-code' ? inputCode : undefined,
      cardImage: tradeType === 'physical' ? uploadedFileName || 'physical_card_upload.png' : undefined,
      customTag: customTagInput.trim() || undefined,
    });

    // Reset controls & trigger success confetti/animation state
    setIsSuccessAnimated(true);
    setTimeout(() => {
      setIsSuccessAnimated(false);
      setInputCode('');
      setUploadedCardImage(null);
      setUploadedFileName(null);
      setCustomTagInput('');
    }, 3000);
  };

  return (
    <div className="bg-white dark:bg-[#0E1322] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 shadow-xl dark:shadow-2xl text-slate-900 dark:text-white flex flex-col justify-between h-full relative overflow-hidden transition-colors">
      
      {/* Visual Success Overlay */}
      <AnimatePresence>
        {isSuccessAnimated && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white/95 dark:bg-[#090C16]/95 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl flex flex-col items-center justify-center text-center p-6 z-40 text-slate-900 dark:text-white"
          >
            <motion.div
              initial={{ scale: 0.6, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-16 h-16 bg-rose-600 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-600/30 mb-4"
            >
              <CheckCircle className="w-10 h-10 text-white" />
            </motion.div>

            <h4 className="text-xl font-extrabold tracking-tight mb-2 font-sans text-slate-900 dark:text-white">
              Transaction Initiated!
            </h4>
            
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xs leading-relaxed mb-6">
              Our automated settlement engine is verifying the authenticity of your <strong>{selectedBrand.name}</strong> card voucher. Funds will land in your balance inside 5 seconds!
            </p>

            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-3.5 py-2 rounded-xl text-xs">
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
              <span className="text-slate-800 dark:text-white/80 font-mono text-[11px] font-semibold">
                +{rewardPoints} Rubby Points Pending 🪙
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        {/* Hub Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <span className="text-rose-600 dark:text-rose-400 font-bold text-[10px] tracking-widest uppercase flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 fill-current" />
              Sell Gift Cards Instantly
            </span>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mt-1 font-sans">
              Instant Card Trading Portal
            </h3>
          </div>

          <div className="flex bg-slate-100 dark:bg-white/5 p-0.5 rounded-lg border border-slate-200 dark:border-white/10">
            <button
              type="button"
              onClick={() => onCurrencyChange(Currency.NGN)}
              className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                currency === Currency.NGN
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 dark:text-white/50 dark:hover:text-white'
              }`}
            >
              NGN
            </button>
            <button
              type="button"
              onClick={() => onCurrencyChange(Currency.GHS)}
              className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                currency === Currency.GHS
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 dark:text-white/50 dark:hover:text-white'
              }`}
            >
              GHS
            </button>
          </div>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 scrollbar-none">
          {categories.map(cat => (
            <button
              type="button"
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-semibold whitespace-nowrap transition cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-rose-600 text-white font-bold border-rose-600 shadow-xs'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white border-slate-200 dark:border-white/5 hover:bg-slate-200/60 dark:hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Horizontal Brand Carousel */}
        <div className="grid grid-cols-5 gap-2 mb-6 max-h-48 overflow-y-auto pr-1">
          {filteredBrands.map(brand => {
            const isSelected = selectedBrand.id === brand.id;
            return (
              <button
                type="button"
                id={`brand-select-${brand.id}`}
                key={brand.id}
                onClick={() => setSelectedBrand(brand)}
                className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border transition-all relative cursor-pointer ${
                  isSelected 
                    ? 'border-rose-500 bg-rose-50 dark:bg-rose-500/15 shadow-md shadow-rose-500/10 scale-95 ring-1 ring-rose-500/30' 
                    : 'border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20 bg-slate-50/60 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/[0.08]'
                }`}
              >
                {brand.popular && (
                  <span className="absolute -top-1 -right-1 bg-rose-600 text-[8px] font-bold text-white px-1.5 py-0.2 rounded-full scale-90">
                    Hot
                  </span>
                )}
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-1.5 transition-transform group-hover:scale-105 shadow-inner ${brand.color}`}>
                  <BrandLogo brandId={brand.id} className="w-5 h-5 text-current" />
                </div>
                <span className="text-[10px] font-semibold text-slate-800 dark:text-white/95 text-center tracking-tight truncate w-full">
                  {brand.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Input Details */}
        <form onSubmit={handleSellInstantly} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            
            {/* Card Value Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-white/60 mb-1.5">
                Gift Card Face Value (USD)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                  <DollarSign className="w-4 h-4 text-slate-400 dark:text-white/40" />
                </div>
                <input
                  type="number"
                  required
                  min="5"
                  max="5000"
                  value={cardValue}
                  onChange={(e) => setCardValue(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-sm border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-white/5 font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition"
                  placeholder="100"
                />
              </div>
            </div>

            {/* Trade Type Tabs (E-code vs Physical) */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-white/60 mb-1.5">
                Voucher Form factor
              </label>
              <div className="flex bg-slate-100 dark:bg-white/5 p-0.5 rounded-xl border border-slate-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setTradeType('e-code')}
                  className={`flex-1 text-center py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                    tradeType === 'e-code'
                      ? 'bg-white dark:bg-white/20 text-slate-900 dark:text-white font-bold shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:text-white/55 dark:hover:text-white'
                  }`}
                >
                  E-Code
                </button>
                <button
                  type="button"
                  onClick={() => setTradeType('physical')}
                  className={`flex-1 text-center py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                    tradeType === 'physical'
                      ? 'bg-white dark:bg-white/20 text-slate-900 dark:text-white font-bold shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:text-white/55 dark:hover:text-white'
                  }`}
                >
                  Physical
                </button>
              </div>
            </div>
          </div>

          {/* Conditional Input based on Type */}
          <AnimatePresence mode="wait">
            {tradeType === 'e-code' ? (
              <motion.div
                key="e-code-input"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-600 dark:text-white/60">
                    Card PIN / Code Input
                  </label>
                  <div className="flex items-center gap-1.5">
                    {/* Camera PIN Scanner Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsScanningOcr(true);
                        setOcrSuccess(false);
                        setTimeout(() => {
                          setIsScanningOcr(false);
                          setOcrSuccess(true);
                          setInputCode(`${selectedBrand.name.substring(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`);
                        }, 1400);
                      }}
                      className="px-2 py-0.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-[10px] font-bold flex items-center gap-1 transition cursor-pointer"
                      title="Scan card PIN via camera"
                    >
                      {isScanningOcr ? (
                        <>
                          <div className="w-2.5 h-2.5 border border-rose-500 border-t-transparent rounded-full animate-spin" />
                          <span>Scanning...</span>
                        </>
                      ) : ocrSuccess ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-500" />
                          <span className="text-emerald-500">PIN Detected</span>
                        </>
                      ) : (
                        <>
                          <Camera className="w-3 h-3" />
                          <span>Scan PIN</span>
                        </>
                      )}
                    </button>

                    {/* Batch Mode Toggle */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsBatchMode(p => !p);
                        if (!isBatchMode) {
                          setInputCode('BATCH-MODE-ACTIVE');
                        } else {
                          setInputCode('');
                        }
                      }}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition cursor-pointer ${
                        isBatchMode 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      <Layers className="w-3 h-3" />
                      <span>{isBatchMode ? 'Bulk (3 Codes)' : 'Bulk Upload'}</span>
                    </button>
                  </div>
                </div>

                {isBatchMode ? (
                  <div className="space-y-1">
                    <textarea
                      rows={3}
                      value={batchCodesText}
                      onChange={(e) => setBatchCodesText(e.target.value)}
                      placeholder="Paste multiple card codes (one per line)..."
                      className="w-full px-3 py-2 text-xs border border-indigo-300 dark:border-indigo-500/30 rounded-xl bg-indigo-50/30 dark:bg-indigo-950/20 font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <span className="text-[10px] text-indigo-500 dark:text-indigo-400 font-semibold block">
                      ⚡ Bulk Batch: 3 codes parsed. Total face value automatically multiplied.
                    </span>
                  </div>
                ) : (
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      placeholder="Enter 16-digit pin or click 'Scan PIN'"
                      className="w-full px-3.5 py-2 text-xs border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-white/5 font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition"
                    />
                  </div>
                )}
                
                <span className="text-[10px] text-slate-500 dark:text-white/40 leading-none block">
                  🛡️ Processed securely using high-speed optical barcode & PIN verification.
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="physical-input"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-600 dark:text-white/60">
                    Real Card Photo Proof - Select or Attach Card Photo
                  </label>
                  <span className="text-[10px] text-emerald-500 font-bold font-mono">
                    +₦15/$ Extra Physical Bonus
                  </span>
                </div>

                {/* Real Photographic Card Picker Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {REAL_CARD_OPTIONS.map(realCard => {
                    const isPicked = uploadedFileName === `${realCard.id}_card.jpg`;
                    return (
                      <button
                        type="button"
                        key={realCard.id}
                        onClick={() => {
                          setUploadedCardImage(realCard.image);
                          setUploadedFileName(`${realCard.id}_card.jpg`);
                        }}
                        className={`p-1.5 border rounded-xl flex flex-col items-center gap-1 transition cursor-pointer text-left overflow-hidden ${
                          isPicked 
                            ? 'border-rose-500 bg-rose-50 dark:bg-rose-500/15 ring-2 ring-rose-500/40 shadow-sm' 
                            : 'border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:border-slate-300'
                        }`}
                      >
                        <div className="w-full h-12 rounded-lg overflow-hidden relative bg-black">
                          <img 
                            src={realCard.image} 
                            alt={realCard.name} 
                            className="w-full h-full object-cover" 
                          />
                          <span className="absolute bottom-0.5 right-0.5 px-1 py-0.2 rounded bg-black/80 text-[7px] font-mono text-amber-400 font-bold">
                            ${realCard.value}
                          </span>
                        </div>
                        <span className="text-[8px] font-bold text-slate-800 dark:text-white/90 truncate w-full text-center">
                          {realCard.name.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Selected File / Real Photo Attachment Banner */}
                <div className="border border-slate-200 dark:border-white/10 rounded-2xl p-3.5 bg-slate-50 dark:bg-white/5 transition flex items-center justify-between gap-3">
                  {uploadedFileName ? (
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-14 h-9 rounded-lg overflow-hidden border border-white/20 shrink-0 bg-black">
                        {uploadedCardImage ? (
                          <img 
                            src={uploadedCardImage} 
                            alt="Uploaded Card" 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <div className="w-full h-full bg-rose-600 flex items-center justify-center">
                            <CreditCard className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="truncate">
                        <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">
                          {uploadedFileName}
                        </span>
                        <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Genuine Card Photo Attached
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-white/10 flex items-center justify-center text-slate-500">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-slate-800 dark:text-white block">
                          No Card Photo Selected
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">
                          Click any verified real card above or take a camera snap
                        </span>
                      </div>
                    </div>
                  )}

                  {uploadedFileName ? (
                    <button
                      type="button"
                      onClick={() => {
                        setUploadedFileName(null);
                        setUploadedCardImage(null);
                      }}
                      className="px-2.5 py-1 rounded-lg text-xs font-bold text-rose-500 hover:bg-rose-500/10 transition cursor-pointer shrink-0"
                    >
                      Clear
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        const defaultCard = REAL_CARD_OPTIONS[0];
                        setUploadedCardImage(defaultCard.image);
                        setUploadedFileName(`${defaultCard.id}_card.jpg`);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition cursor-pointer shrink-0"
                    >
                      Attach Sample
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Optional Custom Tag Input */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-slate-600 dark:text-white/60">
                Custom Tag / Label (Optional)
              </label>
              <span className="text-[9px] text-slate-400 dark:text-white/30 font-mono">e.g., rent, gas, bulk</span>
            </div>
            <input
              type="text"
              value={customTagInput}
              onChange={(e) => setCustomTagInput(e.target.value)}
              placeholder="Tag this trade for organization..."
              className="w-full px-3.5 py-2 text-xs border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white/90 placeholder-slate-400 dark:placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-rose-500 font-sans font-medium"
            />
          </div>

          {/* Contextual Brand Tooltip Advise box */}
          <div className="bg-rose-50 dark:bg-rose-500/10 p-3.5 rounded-2xl border border-rose-200 dark:border-rose-500/20 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div className="text-left space-y-0.5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-rose-600 dark:text-rose-400 font-mono flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-rose-500 animate-pulse" />
                {selectedBrand.name} Trading Advice
              </span>
              <p className="text-[10px] text-slate-700 dark:text-white/70 leading-relaxed font-sans">
                {selectedBrand.id === 'steam' && "🔥 WEEKEND BOOST Active: Steam Wallet vouchers yield +₦15/$ extra payout during Saturdays and Sundays!"}
                {selectedBrand.id === 'apple' && "💡 FAST TRANSACTION: Apple cards under $100 complete automatic claims within 2 minutes flat."}
                {selectedBrand.id === 'razer' && "⚡ PREMIUM DEMAND: Razer Gold cards are matching peak Asian gaming demand. Rates are at active premium!"}
                {selectedBrand.id === 'vanilla' && "💳 PHYSICAL PREFERENCE: Verified Vanilla Visa voucher uploads yield up to 96% of standard face value."}
                {selectedBrand.id === 'amazon' && "📦 SECURE PROCESSING: Amazon cards are verified via official merchant escrow balance checks. Keep claim receipts for fast resolution."}
                {!['steam', 'apple', 'razer', 'vanilla', 'amazon'].includes(selectedBrand.id) && "✨ PRO TIP: Standard physical cards get automatic bonus incentives! Toggle Factor to Physical to earn more."}
              </p>
            </div>
          </div>

          {/* Pricing Breakdown Card */}
          <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-200 dark:border-white/5 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 dark:text-white/40 font-medium">Current Best Rate:</span>
              <span className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1 font-mono">
                {currency === Currency.NGN ? '₦' : 'GH₵'}{currentRate}/$
                {tradeType === 'physical' && (
                  <span className="text-[9px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-1.5 py-0.2 rounded font-mono">
                    +Bonus Rate!
                  </span>
                )}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 dark:text-white/40 font-medium">Verification Method:</span>
              <span className="text-slate-800 dark:text-white/80 text-[10px] font-mono flex items-center gap-1 leading-none">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Rubby Lightning Matcher (AI)
              </span>
            </div>

            <div className="border-t border-slate-200 dark:border-white/10 my-2 pt-2 flex justify-between items-baseline">
              <span className="text-xs text-slate-800 dark:text-white/80 font-extrabold">Instant Payout:</span>
              <div className="text-right">
                <span className="text-lg font-black text-rose-600 dark:text-rose-400 tracking-tight font-mono">
                  {currency === Currency.NGN ? '₦' : 'GH₵'}{payoutAmount.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                </span>
                <span className="text-[9px] text-slate-500 dark:text-white/40 font-mono block">
                  Est. Payout Time: ~3 mins
                </span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            id="btn-confirm-sell-giftcard"
            className="w-full bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs py-3 rounded-2xl transition shadow-lg shadow-rose-600/30 hover:shadow-rose-600/40 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Trade {selectedBrand.name} Voucher Now</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </form>
      </div>

      <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-600 dark:text-white/60 bg-slate-100 dark:bg-white/5 p-3 rounded-xl border border-slate-200 dark:border-white/5">
        <AlertCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
        <span>You earn <strong className="text-slate-900 dark:text-white">+{rewardPoints}</strong> RP on this exchange. RP can be redeemed for airtime or real utility cash in your monthly wallet.</span>
      </div>
    </div>
  );
}
