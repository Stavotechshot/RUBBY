import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  BellRing,
  Award,
  DollarSign,
  TrendingUp,
  X,
  Languages,
  Calculator,
  ArrowDownLeft,
  MessageSquare,
  Tag,
  Activity,
  ArrowRightLeft,
  Sun,
  Moon,
  Wallet,
  ArrowUpRight,
  CheckCircle2,
  Search,
  Trophy,
  Lock,
  BarChart3,
  Layers,
  ChevronRight,
  Check,
  Scale,
  Smartphone,
  Building2,
  Coins,
  Eye,
  EyeOff,
  MoreHorizontal,
  Home,
  CreditCard,
  Lightbulb,
  ChevronDown,
  Send
} from 'lucide-react';
import { Currency, SUPPORTED_BRANDS, Trade, WalletTransaction, RateAlert } from './types';
import TradeForm from './components/TradeForm';
import WalletCard from './components/WalletCard';
import RateAlerts from './components/RateAlerts';
import Leaderboard from './components/Leaderboard';
import SecurityPanel from './components/SecurityPanel';
import TransactionHistory from './components/TransactionHistory';
import VolumeTrendChart from './components/VolumeTrendChart';
import LiveChat from './components/LiveChat';
import CurrencyCalculator from './components/CurrencyCalculator';
import WeeklySummaryModal from './components/WeeklySummaryModal';
import BrandLogo from './components/BrandLogo';
import MarketComparisonView from './components/MarketComparisonView';
import BillPaymentsView from './components/BillPaymentsView';
import KycVerificationView from './components/KycVerificationView';
import CryptoDepositView from './components/CryptoDepositView';
import VirtualAccountsView from './components/VirtualAccountsView';
import WhatsAppBotView from './components/WhatsAppBotView';
import AccountsView from './components/AccountsView';
import RubbyLogo from './components/RubbyLogo';
import RealCardsCatalog from './components/RealCardsCatalog';
import ClientShowcaseBar from './components/ClientShowcaseBar';
import TransactionReceiptModal, { ReceiptData } from './components/TransactionReceiptModal';
import ClientDueDiligenceModal from './components/ClientDueDiligenceModal';
import Header from './components/Header';
import Footer from './components/Footer';
import { getInitialTrades, getInitialWalletTransactions } from './initialTrades';

// Active Workspace View Types
export type WorkspaceView = 'overview' | 'exchange' | 'cards_catalog' | 'bills' | 'accounts' | 'rates' | 'ledger' | 'kyc' | 'whatsapp_bot' | 'vip' | 'security' | 'comparison' | 'wallets';

export default function App() {
  // CLIENT PRESENTATION & PROOF MODAL STATES
  const [activeReceipt, setActiveReceipt] = useState<ReceiptData | null>(null);
  const [showDueDiligenceModal, setShowDueDiligenceModal] = useState<boolean>(false);

  // THEME STATE
  const [isLightMode, setIsLightMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('rubby_theme');
    return saved === 'light';
  });

  // ACTIVE WORKSPACE VIEW STATE
  const [activeView, setActiveView] = useState<WorkspaceView>(() => {
    const saved = localStorage.getItem('rubby_active_view');
    if (saved && ['overview', 'exchange', 'bills', 'accounts', 'rates', 'ledger', 'kyc', 'whatsapp_bot', 'vip', 'security', 'comparison', 'wallets'].includes(saved)) {
      return saved as WorkspaceView;
    }
    return 'overview';
  });

  const [isBalanceHidden, setIsBalanceHidden] = useState<boolean>(() => {
    return localStorage.getItem('rubby_hide_bal') === 'true';
  });

  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState<boolean>(false);

  const toggleHideBalance = () => {
    setIsBalanceHidden(prev => {
      const next = !prev;
      localStorage.setItem('rubby_hide_bal', next.toString());
      return next;
    });
  };

  const handleSelectView = (view: WorkspaceView) => {
    setActiveView(view);
    setIsMoreMenuOpen(false);
    localStorage.setItem('rubby_active_view', view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [showWeeklySummaryModal, setShowWeeklySummaryModal] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('rubby_theme', isLightMode ? 'light' : 'dark');
    if (isLightMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, [isLightMode]);

  // WALLET STATES
  const [nairaBalance, setNairaBalance] = useState(() => {
    const saved = localStorage.getItem('rubby_naira_bal');
    return saved ? parseFloat(saved) : 48500; // ₦48,500 NGN starter balance
  });
  
  const [cedisBalance, setCedisBalance] = useState(() => {
    const saved = localStorage.getItem('rubby_cedis_bal');
    return saved ? parseFloat(saved) : 620; // ₵620 GHS starter balance
  });

  const [rubbyPoints, setRubbyPoints] = useState(() => {
    const saved = localStorage.getItem('rubby_points_bal');
    return saved ? parseInt(saved, 10) : 250; // 250 RP starter points
  });

  const [userTradeVolume, setUserTradeVolume] = useState(() => {
    const saved = localStorage.getItem('rubby_trade_volume');
    return saved ? parseFloat(saved) : 1200; // $1,200 starter trade volume
  });

  // Live Activity Feed Rotator State
  const [currentActivityIdx, setCurrentActivityIdx] = useState(0);
  useEffect(() => {
    const handle = setInterval(() => {
      setCurrentActivityIdx((prev) => (prev + 1) % 5);
    }, 4500);
    return () => clearInterval(handle);
  }, []);

  // LEDGERS & TRADES
  const [trades, setTrades] = useState<Trade[]>(() => {
    const saved = localStorage.getItem('rubby_trades');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length >= 50) return parsed;
    }
    return getInitialTrades();
  });

  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>(() => {
    const saved = localStorage.getItem('rubby_wallet_txs');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length >= 20) return parsed;
    }
    return getInitialWalletTransactions();
  });

  // RATE ALERTS & TARGET FEEDS
  const [rateAlerts, setRateAlerts] = useState<RateAlert[]>(() => {
    const saved = localStorage.getItem('rubby_rate_alerts');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'alert-init1',
        brandId: 'steam',
        brandName: 'Steam Wallet',
        targetRate: 885,
        currency: Currency.NGN,
        condition: 'above',
        isActive: true,
        createdAt: new Date().toISOString()
      }
    ];
  });

  const [liveRates, setLiveRates] = useState<Record<string, { NGN: number; GHS: number }>>(() => {
    const initialRates: Record<string, { NGN: number; GHS: number }> = {};
    SUPPORTED_BRANDS.forEach(b => {
      initialRates[b.id] = { ...b.rates };
    });
    return initialRates;
  });

  const [ratesHistory, setRatesHistory] = useState<Record<string, number[]>>(() => {
    const initialHist: Record<string, number[]> = {};
    SUPPORTED_BRANDS.forEach(b => {
      const base = b.rates.NGN;
      initialHist[b.id] = [
        base - 14, 
        base - 8, 
        base - 11, 
        base - 3, 
        base - 7, 
        base - 2,
        base
      ];
    });
    return initialHist;
  });

  const computeSparklinePath = (points: number[], width = 45, height = 15) => {
    if (!points || points.length < 2) return '';
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min === 0 ? 1 : max - min;
    
    return points
      .map((val, index) => {
        const x = (index / (points.length - 1)) * width;
        const y = height - ((val - min) / range) * height;
        return `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  };

  // SYSTEM TARGET ALERTS TOAST
  const [toastNotification, setToastNotification] = useState<{ 
    id: string; 
    title: string; 
    body: string;
    actionLabel?: string;
    onAction?: () => void;
  } | null>(null);

  // CONSOLE DENSITY CURRENCY SWITCH LINK
  const [globalPayoutCurrency, setGlobalPayoutCurrency] = useState<Currency>(Currency.NGN);

  // SAVE PROGRESS TO LOCALSTORAGE ON RE-RENDER
  useEffect(() => {
    localStorage.setItem('rubby_naira_bal', nairaBalance.toString());
    localStorage.setItem('rubby_cedis_bal', cedisBalance.toString());
    localStorage.setItem('rubby_points_bal', rubbyPoints.toString());
    localStorage.setItem('rubby_trade_volume', userTradeVolume.toString());
    localStorage.setItem('rubby_trades', JSON.stringify(trades));
    localStorage.setItem('rubby_wallet_txs', JSON.stringify(walletTransactions));
    localStorage.setItem('rubby_rate_alerts', JSON.stringify(rateAlerts));
  }, [nairaBalance, cedisBalance, rubbyPoints, userTradeVolume, trades, walletTransactions, rateAlerts]);

  // SYSTEM TOAST HELPER
  const triggerSystemNotification = (
    title: string, 
    body: string, 
    actionLabel?: string, 
    onAction?: () => void
  ) => {
    setToastNotification({
      id: Math.random().toString(),
      title,
      body,
      actionLabel,
      onAction
    });
    setTimeout(() => {
      setToastNotification(null);
    }, 7000);
  };

  // WALLET DEPOSIT & WITHDRAW CONTROLLERS
  const handleBalanceChange = (
    curr: Currency, 
    amount: number, 
    isDeposit: boolean, 
    type: WalletTransaction['type'], 
    description: string
  ) => {
    if (curr === Currency.NGN) {
      setNairaBalance(prev => isDeposit ? prev + amount : Math.max(0, prev - amount));
    } else {
      setCedisBalance(prev => isDeposit ? prev + amount : Math.max(0, prev - amount));
    }

    const newTx: WalletTransaction = {
      id: `tx-${Math.random().toString(36).substring(3, 9)}`,
      type,
      amount,
      currency: curr,
      status: 'completed',
      description,
      createdAt: new Date().toISOString()
    };

    setWalletTransactions(prev => [newTx, ...prev]);
  };

  // NEW TRADE EVENT CREATION FLOW
  const handleTradeCreated = (newTradeData: Omit<Trade, 'id' | 'createdAt' | 'receiptNumber' | 'status'>) => {
    const generatedId = `tr-${Math.random().toString(36).substring(3, 9)}`;
    const receiptCode = `RX-${Math.floor(10000 + Math.random() * 90000)}-${newTradeData.currencyOutput}`;
    
    const newPendingTrade: Trade = {
      ...newTradeData,
      id: generatedId,
      status: 'pending',
      createdAt: new Date().toISOString(),
      receiptNumber: receiptCode
    };

    setTrades(prev => [newPendingTrade, ...prev]);

    // Simulate verification delay (3.2 seconds)
    setTimeout(() => {
      triggerSystemNotification(
        "Settlement Completed · Funds Credited",
        `Card conversion for ${newTradeData.brandName} ($${newTradeData.cardValue}) completed. Payout of ${newTradeData.currencyOutput === Currency.NGN ? '₦' : 'GH₵'}${newTradeData.payoutAmount.toLocaleString()} has been credited to your wallet. Ref: ${receiptCode}`,
        "View Receipt",
        () => {
          setActiveReceipt({
            id: generatedId,
            receiptNumber: receiptCode,
            type: 'card_trade',
            title: `Sold ${newTradeData.brandName} ($${newTradeData.cardValue})`,
            amount: newTradeData.payoutAmount,
            currency: newTradeData.currencyOutput,
            status: 'completed',
            timestamp: new Date().toISOString(),
            cardBrand: newTradeData.brandName,
            cardValue: newTradeData.cardValue,
            rateApplied: newTradeData.rate,
            beneficiaryBank: newTradeData.currencyOutput === Currency.NGN ? 'Providus Bank (NIP)' : 'Bank of Ghana / MoMo'
          });
        }
      );

      setTrades(currentTrades => {
        return currentTrades.map(t => {
          if (t.id === generatedId) {
            setRubbyPoints(points => points + Math.floor(newTradeData.cardValue * 2.5));
            setUserTradeVolume(vol => vol + newTradeData.cardValue);
            
            if (newTradeData.currencyOutput === Currency.NGN) {
              setNairaBalance(bal => bal + newTradeData.payoutAmount);
            } else {
              setCedisBalance(bal => bal + newTradeData.payoutAmount);
            }

            setWalletTransactions(prevTxs => [
              {
                id: `tx-${Math.random().toString(36).substring(3, 9)}`,
                type: 'trade_payout',
                amount: newTradeData.payoutAmount,
                currency: newTradeData.currencyOutput,
                status: 'completed',
                description: `Card Trade Payout: ${newTradeData.brandName} ($${newTradeData.cardValue})`,
                createdAt: new Date().toISOString()
              },
              ...prevTxs
            ]);

            return { ...t, status: 'completed' as const };
          }
          return t;
        });
      });
    }, 3200);
  };

  // CLIENT PRESENTATION SIMULATION SUITE
  const handleSimulateDemoTrade = () => {
    const brandName = 'Apple Gift Card & iTunes';
    const cardValue = 100;
    const rate = liveRates['apple']?.[globalPayoutCurrency] || (globalPayoutCurrency === Currency.NGN ? 885 : 11.8);
    const payout = cardValue * rate;
    const refCode = `RX-${Math.floor(10000 + Math.random() * 90000)}-${globalPayoutCurrency}`;

    handleTradeCreated({
      brandId: 'apple',
      brandName,
      cardValue,
      currencyOutput: globalPayoutCurrency,
      rate,
      payoutAmount: payout,
      codeOrPin: 'X79Q 4812 9043 8129',
      customTag: 'Client Demonstration Verification'
    });

    triggerSystemNotification(
      "Client Demo: Card Settlement Verified 💳",
      `Simulated $100 Apple Card liquidated at ${globalPayoutCurrency === Currency.NGN ? '₦' : 'GH₵'}${rate}/$. Credited ${globalPayoutCurrency === Currency.NGN ? '₦' : 'GH₵'}${payout.toLocaleString()}.`,
      "View Receipt",
      () => {
        setActiveReceipt({
          id: `demo-trade-${Date.now()}`,
          receiptNumber: refCode,
          type: 'card_trade',
          title: `Sold ${brandName} ($${cardValue})`,
          amount: payout,
          currency: globalPayoutCurrency,
          status: 'completed',
          timestamp: new Date().toISOString(),
          cardBrand: brandName,
          cardValue,
          rateApplied: rate,
          beneficiaryBank: globalPayoutCurrency === Currency.NGN ? 'Providus Bank (NIP)' : 'Bank of Ghana / MoMo'
        });
      }
    );

    setTimeout(() => {
      setActiveReceipt({
        id: `demo-trade-${Date.now()}`,
        receiptNumber: refCode,
        type: 'card_trade',
        title: `Sold ${brandName} ($${cardValue})`,
        amount: payout,
        currency: globalPayoutCurrency,
        status: 'completed',
        timestamp: new Date().toISOString(),
        cardBrand: brandName,
        cardValue,
        rateApplied: rate,
        beneficiaryBank: globalPayoutCurrency === Currency.NGN ? 'Providus Bank (NIP)' : 'Bank of Ghana / MoMo'
      });
    }, 1500);
  };

  const handleSimulateDemoDeposit = () => {
    const depositAmt = 50000;
    const refCode = `NIP-PROV-${Math.floor(100000 + Math.random() * 900000)}`;
    handleBalanceChange(Currency.NGN, depositAmt, true, 'deposit', `Inbound NIP Transfer from Zenith Bank (Ref: ${refCode})`);
    
    triggerSystemNotification(
      "Inbound NIP Deposit Received 🏦",
      `+₦${depositAmt.toLocaleString()} credited to your Providus Virtual NUBAN from Bryan Wyatt.`,
      "View Receipt",
      () => {
        setActiveReceipt({
          id: `demo-dep-${Date.now()}`,
          receiptNumber: refCode,
          type: 'deposit',
          title: 'Inbound NIP Instant Transfer',
          amount: depositAmt,
          currency: Currency.NGN,
          status: 'completed',
          timestamp: new Date().toISOString(),
          beneficiaryBank: 'Providus Bank · Account: 9928172910'
        });
      }
    );

    setActiveReceipt({
      id: `demo-dep-${Date.now()}`,
      receiptNumber: refCode,
      type: 'deposit',
      title: 'Inbound NIP Instant Transfer',
      amount: depositAmt,
      currency: Currency.NGN,
      status: 'completed',
      timestamp: new Date().toISOString(),
      beneficiaryBank: 'Providus Bank · Account: 9928172910'
    });
  };

  const handleSimulateDemoBill = () => {
    const billAmt = 5000;
    const tokenPin = '4910-8291-0492-8192-3819';
    const refCode = `AEDC-${Math.floor(100000 + Math.random() * 900000)}`;
    handleBalanceChange(Currency.NGN, billAmt, false, 'withdrawal', `Utility Payment: AEDC Electricity (Token: ${tokenPin})`);
    
    triggerSystemNotification(
      "Electricity Token Purchased ⚡",
      `₦${billAmt.toLocaleString()} deducted for AEDC Prepaid. Token: ${tokenPin}`,
      "View Receipt",
      () => {
        setActiveReceipt({
          id: `demo-bill-${Date.now()}`,
          receiptNumber: refCode,
          type: 'utility',
          title: 'AEDC Prepaid Power Recharge (38.4 kWh)',
          amount: billAmt,
          currency: Currency.NGN,
          status: 'completed',
          timestamp: new Date().toISOString(),
          tokenPin,
          beneficiaryBank: 'AEDC Transmission Grid'
        });
      }
    );

    setActiveReceipt({
      id: `demo-bill-${Date.now()}`,
      receiptNumber: refCode,
      type: 'utility',
      title: 'AEDC Prepaid Power Recharge (38.4 kWh)',
      amount: billAmt,
      currency: Currency.NGN,
      status: 'completed',
      timestamp: new Date().toISOString(),
      tokenPin,
      beneficiaryBank: 'AEDC Transmission Grid'
    });
  };

  // Pulse animation indicators for live rates change
  const [ratesFlash, setRatesFlash] = useState<Record<string, 'up' | 'down' | null>>({});

  useEffect(() => {
    const handleRatesFluctuation = setInterval(() => {
      const bIndex = Math.floor(Math.random() * SUPPORTED_BRANDS.length);
      const targetBrand = SUPPORTED_BRANDS[bIndex];
      
      const isUp = Math.random() > 0.45;
      const changeAmountNGN = Math.floor(1 + Math.random() * 8);
      const changeAmountGHS = parseFloat((0.05 + Math.random() * 0.2).toFixed(2));
      
      setLiveRates(prev => {
        const currentBrandRates = prev[targetBrand.id] || { NGN: 800, GHS: 11 };
        const newNGN = isUp 
          ? currentBrandRates.NGN + changeAmountNGN
          : Math.max(500, currentBrandRates.NGN - changeAmountNGN);
        const newGHS = isUp
          ? parseFloat((currentBrandRates.GHS + changeAmountGHS).toFixed(2))
          : Math.max(5, parseFloat((currentBrandRates.GHS - changeAmountGHS).toFixed(2)));

        setRatesHistory(hPrev => {
          const prevArr = hPrev[targetBrand.id] || [];
          const newVal = globalPayoutCurrency === Currency.NGN ? newNGN : newGHS;
          const updated = [...prevArr, newVal];
          if (updated.length > 15) {
            updated.shift();
          }
          return {
            ...hPrev,
            [targetBrand.id]: updated
          };
        });

        return {
          ...prev,
          [targetBrand.id]: { NGN: newNGN, GHS: newGHS }
        };
      });

      setRatesFlash(prev => ({
        ...prev,
        [targetBrand.id]: isUp ? 'up' : 'down'
      }));

      setTimeout(() => {
        setRatesFlash(prev => ({
          ...prev,
          [targetBrand.id]: null
        }));
      }, 2000);

    }, 3800);

    return () => clearInterval(handleRatesFluctuation);
  }, [globalPayoutCurrency]);

  // GLOBAL KEYBOARD SHORTCUTS FOR POWER USERS
  useEffect(() => {
    const handleGlobalShortcuts = (e: KeyboardEvent) => {
      // Numbers 1-6 for switching tabs
      if (!['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        if (e.key === '1') handleSelectView('exchange');
        if (e.key === '2') handleSelectView('wallets');
        if (e.key === '3') handleSelectView('rates');
        if (e.key === '4') handleSelectView('ledger');
        if (e.key === '5') handleSelectView('vip');
        if (e.key === '6') handleSelectView('comparison');
        if (e.key === '7') handleSelectView('overview');
      }

      // Search History shortcut: Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        handleSelectView('ledger');
        setTimeout(() => {
          const searchInput = document.getElementById('transaction-search-input') as HTMLInputElement;
          if (searchInput) {
            searchInput.focus();
            searchInput.select();
          }
        }, 150);
      }

      // Wallet panel shortcut: Cmd+W, Ctrl+W, or Alt+W
      if ((e.metaKey || e.ctrlKey || e.altKey) && e.key.toLowerCase() === 'w') {
        e.preventDefault();
        handleSelectView('wallets');
      }

      // Trade form shortcut: Cmd+T or Ctrl+T or Alt+T
      if ((e.altKey) && e.key.toLowerCase() === 't') {
        e.preventDefault();
        handleSelectView('exchange');
      }
    };

    window.addEventListener('keydown', handleGlobalShortcuts);
    return () => window.removeEventListener('keydown', handleGlobalShortcuts);
  }, []);

  // RATE ALERT HANDLERS
  const handleAddAlert = (newAlertData: Omit<RateAlert, 'id' | 'createdAt'>) => {
    const alert: RateAlert = {
      ...newAlertData,
      id: `alert-${Math.random().toString(36).substring(3, 9)}`,
      createdAt: new Date().toISOString()
    };
    setRateAlerts(prev => [alert, ...prev]);
  };

  const handleDeleteAlert = (id: string) => {
    setRateAlerts(prev => prev.filter(al => al.id !== id));
  };

  const handleToggleAlert = (id: string, active: boolean) => {
    setRateAlerts(prev => prev.map(al => al.id === id ? { ...al, isActive: active } : al));
  };

  const primaryNavTabs: { id: WorkspaceView; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'exchange', label: 'Sell Cards', icon: <ArrowRightLeft className="w-4 h-4" /> },
    { id: 'cards_catalog', label: 'Real Cards', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'bills', label: 'Pay Bills', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'accounts', label: 'Accounts & Deposits', icon: <Building2 className="w-4 h-4" /> },
    { id: 'rates', label: 'Market Rates', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'ledger', label: 'Activity', icon: <Layers className="w-4 h-4" /> },
  ];

  const moreServicesList: { id: WorkspaceView; label: string; desc: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'cards_catalog', label: 'Real Cards Vault & Specs', desc: 'Inspect physical card specimens & live payout rates', icon: <CreditCard className="w-4 h-4 text-rose-400" />, badge: 'Real Photos' },
    { id: 'kyc', label: 'Identity Verification (KYC)', desc: 'Tier 1, Tier 2 (BVN/NIN) & Tier 3 limits', icon: <ShieldCheck className="w-4 h-4 text-emerald-500" />, badge: 'Tier 2 Active' },
    { id: 'whatsapp_bot', label: 'WhatsApp OTC Desk', desc: 'Direct trade channel over verified WhatsApp', icon: <MessageSquare className="w-4 h-4 text-emerald-400" />, badge: 'OTC Desk' },
    { id: 'vip', label: 'VIP Traders League', desc: 'Compete for monthly ₦250,000 cash pool', icon: <Trophy className="w-4 h-4 text-amber-400" />, badge: 'Rank #4' },
    { id: 'security', label: 'Security & 2FA Vault', desc: 'Two-factor authenticator, fraud locks & pins', icon: <Lock className="w-4 h-4 text-rose-500" /> },
    { id: 'comparison', label: 'Market Benchmark', desc: 'Live spread & fee transparency matrix', icon: <Scale className="w-4 h-4 text-sky-400" /> },
  ];

  return (
    <div className={`min-h-screen ${isLightMode ? 'bg-[#F8FAFC] text-slate-900 selection:bg-rose-500/10 selection:text-rose-700' : 'bg-[#090A10] text-slate-100 selection:bg-rose-500/20 selection:text-rose-300'} font-sans relative overflow-x-hidden pb-24 transition-colors duration-200`}>
      
      {/* Subtle luxury ambient lighting */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[350px] bg-rose-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[400px] bg-amber-600/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Global Toast Notifier */}
      <AnimatePresence>
        {toastNotification && (
          <motion.div
            initial={{ opacity: 0, y: -24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 w-full max-w-md bg-[#0F121D]/95 text-white p-4 rounded-2xl shadow-2xl z-[70] border border-rose-500/30 backdrop-blur-xl flex items-start gap-3.5"
          >
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4 text-rose-400" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-white tracking-tight">{toastNotification.title}</h4>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">{toastNotification.body}</p>
              {toastNotification.actionLabel && toastNotification.onAction && (
                <button
                  type="button"
                  onClick={() => {
                    toastNotification.onAction?.();
                    setToastNotification(null);
                  }}
                  className="mt-2 px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-[10px] flex items-center gap-1.5 transition cursor-pointer shadow-sm shadow-rose-600/30"
                >
                  <span>{toastNotification.actionLabel}</span>
                  <ArrowRightLeft className="w-3 h-3" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setToastNotification(null)}
              className="p-1 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP HEADER: Clean, Executive Fintech Topbar */}
      <Header
        activeView={activeView}
        onSelectView={handleSelectView}
        isLightMode={isLightMode}
        onToggleTheme={() => setIsLightMode(p => !p)}
        globalPayoutCurrency={globalPayoutCurrency}
        onChangeCurrency={setGlobalPayoutCurrency}
        onOpenDueDiligence={() => setShowDueDiligenceModal(true)}
        userTradeVolume={userTradeVolume}
        rubbyPoints={rubbyPoints}
      />

      {/* MOBILE BOTTOM NAVIGATION BAR: Native Mobile Banking Standard */}
      <nav className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 px-2 py-2 border-t backdrop-blur-xl flex items-center justify-around shadow-2xl transition-colors ${
        isLightMode ? 'bg-white/95 border-slate-200 text-slate-700' : 'bg-[#090A10]/95 border-white/10 text-slate-300'
      }`}>
        {primaryNavTabs.slice(0, 5).map(tab => {
          const isActive = activeView === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleSelectView(tab.id)}
              className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition cursor-pointer ${
                isActive 
                  ? 'text-rose-500 font-bold scale-105' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.icon}
              <span className="text-[10px] leading-none">{tab.label.split(' ')[0]}</span>
            </button>
          );
        })}

        {/* Mobile More Button */}
        <button
          type="button"
          onClick={() => setIsMoreMenuOpen(p => !p)}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition cursor-pointer ${
            ['kyc', 'whatsapp_bot', 'vip', 'security', 'comparison', 'ledger'].includes(activeView) || isMoreMenuOpen
              ? 'text-rose-500 font-bold scale-105' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <MoreHorizontal className="w-4 h-4" />
          <span className="text-[10px] leading-none">More</span>
        </button>
      </nav>

      {/* MOBILE MORE SERVICES SLIDE-UP DRAWER */}
      <AnimatePresence>
        {isMoreMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end">
            <div 
              className="flex-1"
              onClick={() => setIsMoreMenuOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`p-5 rounded-t-3xl border-t shadow-2xl max-h-[80vh] overflow-y-auto ${
                isLightMode ? 'bg-white border-slate-200' : 'bg-[#0D101C] border-white/10'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5 mb-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">More Banking Services</h3>
                <button
                  type="button"
                  onClick={() => setIsMoreMenuOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                {/* Activity link */}
                <button
                  type="button"
                  onClick={() => handleSelectView('ledger')}
                  className={`w-full p-3 rounded-2xl flex items-center justify-between text-left transition cursor-pointer ${
                    activeView === 'ledger'
                      ? 'bg-rose-500/15 text-rose-500 font-bold'
                      : isLightMode ? 'hover:bg-slate-50 text-slate-800' : 'hover:bg-white/5 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-black/10 dark:bg-white/5">
                      <Layers className="w-4 h-4 text-rose-500" />
                    </div>
                    <div>
                      <span className="text-xs font-bold block">Activity & Transactions</span>
                      <span className="text-[10px] text-slate-400 block">Complete settlement ledger & receipts</span>
                    </div>
                  </div>
                </button>

                {moreServicesList.map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectView(item.id)}
                    className={`w-full p-3 rounded-2xl flex items-center justify-between text-left transition cursor-pointer ${
                      activeView === item.id
                        ? 'bg-rose-500/15 text-rose-500 font-bold'
                        : isLightMode ? 'hover:bg-slate-50 text-slate-800' : 'hover:bg-white/5 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-black/10 dark:bg-white/5">
                        {item.icon}
                      </div>
                      <div>
                        <span className="text-xs font-bold block">{item.label}</span>
                        <span className="text-[10px] text-slate-400 block">{item.desc}</span>
                      </div>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MAIN CONTAINER VIEWPORT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 space-y-6 pb-28 sm:pb-24">
        
        {/* CLIENT DEMO & VERIFICATION CONSOLE */}
        <ClientShowcaseBar
          onSimulateTrade={handleSimulateDemoTrade}
          onSimulateDeposit={handleSimulateDemoDeposit}
          onSimulateBill={handleSimulateDemoBill}
          onOpenDueDiligence={() => setShowDueDiligenceModal(true)}
          onOpenBrandSpec={() => {
            const brandBtn = document.querySelector('[title*="Brand Identity"]') as HTMLElement;
            if (brandBtn) brandBtn.click();
            else setShowDueDiligenceModal(true);
          }}
          isLightMode={isLightMode}
        />

        {/* LIVE MARKET RATE TICKER & PLATFORM EVENT ROTATOR */}
        <div className={`rounded-2xl border p-2.5 text-xs transition-colors ${isLightMode ? 'bg-white border-slate-200 shadow-xs' : 'bg-[#0F121D]/80 border-white/10 shadow-lg'}`}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Live Market Prices Marquee */}
            <div className="col-span-1 md:col-span-8 flex items-center gap-3 overflow-hidden relative">
              <div className="flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 font-bold text-[10px] uppercase font-mono tracking-wider">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Live Rates</span>
              </div>
              
              <div className="flex-1 overflow-hidden relative">
                <div className="animate-marquee gap-3 items-center flex">
                  {[...SUPPORTED_BRANDS, ...SUPPORTED_BRANDS].map((brand, i) => {
                    const currentNGN = liveRates[brand.id]?.NGN || brand.rates.NGN;
                    const currentGHS = liveRates[brand.id]?.GHS || brand.rates.GHS;
                    const isNaira = globalPayoutCurrency === Currency.NGN;
                    const activePrice = isNaira ? currentNGN : currentGHS;
                    const activeSymbol = isNaira ? '₦' : 'GH₵';
                    const flashStatus = ratesFlash[brand.id];
                    const history = ratesHistory[brand.id] || [activePrice, activePrice];

                    return (
                      <React.Fragment key={`${brand.id}-topbar-${i}`}>
                        {i > 0 && <span className="text-slate-400/40 select-none font-mono mx-1">·</span>}
                        <div
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-mono transition-all shrink-0 ${
                            flashStatus === 'up' 
                              ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10' 
                              : flashStatus === 'down'
                              ? 'border-rose-500/50 text-rose-400 bg-rose-500/10'
                              : isLightMode 
                                ? 'border-slate-200 bg-slate-50 text-slate-700'
                                : 'border-white/5 bg-white/5 text-slate-300'
                          }`}
                        >
                          <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                            <BrandLogo brandId={brand.id} className="w-3.5 h-3.5" />
                          </div>
                          <span className="font-semibold">{brand.name.split(' ')[0]}:</span>
                          <strong className="font-bold">
                            {activeSymbol}{activePrice}
                          </strong>
                          
                          <svg className="w-9 h-3 select-none pointer-events-none" viewBox="0 0 45 15" fill="none">
                            <path
                              d={computeSparklinePath(history, 45, 15)}
                              stroke={flashStatus === 'down' ? '#f87171' : flashStatus === 'up' ? '#34d399' : isLightMode ? '#94a3b8' : 'rgba(255,255,255,0.4)'}
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>

                          {flashStatus === 'up' && <span className="text-[9px] font-black text-emerald-400">↑</span>}
                          {flashStatus === 'down' && <span className="text-[9px] font-black text-rose-400">↓</span>}
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Live Settlement Activity Rotator */}
            <div className={`col-span-1 md:col-span-4 flex items-center justify-between border-t md:border-t-0 md:border-l ${isLightMode ? 'border-slate-200' : 'border-white/10'} pt-2 md:pt-0 md:pl-3`}>
              <div className="flex items-center gap-2 overflow-hidden w-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-ping" />
                <div className="text-[11px] truncate">
                  <span className="text-emerald-500 font-bold mr-1.5 font-mono">Live Settlement:</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentActivityIdx}
                      initial={{ y: 6, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -6, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`font-medium ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}
                    >
                      {([
                        { text: 'Tunde A. swapped $200 Steam → ₦174,000 settled to Bank' },
                        { text: 'Amara K. withdrew GH₵1,850 completed via MoMo' },
                        { text: 'Kwame O. swapped $100 iTunes → GH₵1,280 settled' },
                        { text: 'Ezenwa C. withdrew ₦125,000 paid to Kuda Bank' },
                        { text: 'Ruphina D. triggered +890 Razer Gold Target Alert' }
                      ])[currentActivityIdx].text}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* WORKSPACE CONTENT ROUTER */}
        {/* VIEW 1: INSTANT EXCHANGE TERMINAL */}
        {activeView === 'exchange' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-lg font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  Instant Card Exchange Terminal
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Select your card brand, verify code authenticity, and settle directly to your Naira or Cedis wallet.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleSelectView('overview')}
                className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
              >
                <span>View Full Overview</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7" id="trade-form-container">
                <TradeForm 
                  onTradeCreated={handleTradeCreated} 
                  currency={globalPayoutCurrency}
                  onCurrencyChange={setGlobalPayoutCurrency}
                  liveRates={liveRates}
                />
              </div>

              <div className="lg:col-span-5 space-y-6">
                <CurrencyCalculator />

                {/* Popular Rates Quick Matrix */}
                <div className={`p-5 rounded-3xl border ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0F121D] border-white/10'}`}>
                  <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                    Active Liquidity Quotes ({globalPayoutCurrency})
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {SUPPORTED_BRANDS.slice(0, 8).map(brand => {
                      const rate = liveRates[brand.id]?.[globalPayoutCurrency] || brand.rates[globalPayoutCurrency];
                      const symbol = globalPayoutCurrency === Currency.NGN ? '₦' : 'GH₵';
                      return (
                        <div key={brand.id} className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/5'}`}>
                          <div className="flex items-center gap-2 truncate mr-2">
                            <div className="w-5 h-5 rounded-md bg-black/40 border border-white/10 flex items-center justify-center p-0.5 shrink-0">
                              <BrandLogo brandId={brand.id} className="w-3.5 h-3.5" />
                            </div>
                            <span className="font-medium truncate">{brand.name}</span>
                          </div>
                          <span className="font-mono font-bold text-rose-500 tabular-nums shrink-0">{symbol}{rate}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: MULTI-CURRENCY VAULT & WALLETS */}
        {activeView === 'wallets' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-lg font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  Multi-Currency Vault & Balances
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Manage your dual fiat balances, asset weight distribution, daily goals, and bank/MoMo cashouts.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleSelectView('overview')}
                className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
              >
                <span>View Full Overview</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7">
                <WalletCard 
                  nairaBalance={nairaBalance}
                  cedisBalance={cedisBalance}
                  rubbyPoints={rubbyPoints}
                  onBalanceChange={handleBalanceChange}
                  trades={trades}
                />
              </div>

              <div className="lg:col-span-5 space-y-6">
                <VolumeTrendChart trades={trades} />
                
                {/* Security Status Panel */}
                <SecurityPanel />
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: MARKET RATES & ALERTS */}
        {activeView === 'rates' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-lg font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  Market Rates & Alert Engine
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Monitor real-time card rate fluctuations and set automatic triggers for optimal conversions.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleSelectView('overview')}
                className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
              >
                <span>View Full Overview</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7">
                <RateAlerts 
                  alerts={rateAlerts}
                  onAddAlert={handleAddAlert}
                  onDeleteAlert={handleDeleteAlert}
                  onToggledAlert={handleToggleAlert}
                  liveRates={liveRates}
                  onRatesUpdate={setLiveRates}
                  triggerSystemNotification={triggerSystemNotification}
                />
              </div>

              <div className="lg:col-span-5 space-y-6">
                <CurrencyCalculator />
                <VolumeTrendChart trades={trades} />
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: LEDGER & AUDIT TRAIL */}
        {activeView === 'ledger' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-lg font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  Ledger & Transaction Audit Trail
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Search, verify receipts, filter by currency and status, and export historical settlement statements.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleSelectView('overview')}
                className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
              >
                <span>View Full Overview</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="w-full">
              <TransactionHistory 
                trades={trades}
                walletTransactions={walletTransactions}
                onViewReceipt={(receipt) => setActiveReceipt(receipt)}
              />
            </div>
          </div>
        )}

        {/* VIEW 5: TRADER VIP CLUB & LEADERBOARD */}
        {activeView === 'vip' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-lg font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  Trader VIP League & Tournament
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Compete for the monthly ₦250,000 + GH₵2,500 prize pool, check volume tiers, and redeem Rubby Points.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleSelectView('overview')}
                className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
              >
                <span>View Full Overview</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7">
                <Leaderboard userTradeVolume={userTradeVolume} />
              </div>

              <div className="lg:col-span-5 space-y-6">
                <SecurityPanel />
                
                {/* VIP Perks Card */}
                <div className={`p-6 rounded-3xl border ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0F121D] border-white/10'}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="w-5 h-5 text-amber-400" />
                    <h4 className={`text-sm font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                      Gold VIP Trader Tier Benefits
                    </h4>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Dedicated concierge line on 24/7 Priority Support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>+₦15/$ incentive on all Physical Card conversions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Zero transaction fees on instant bank withdrawals</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Automatic entry into the Monthly Top-5 Cash Pool</span>
                    </li>
                  </ul>
                  <button
                    type="button"
                    onClick={() => setShowWeeklySummaryModal(true)}
                    className="mt-5 w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition cursor-pointer"
                  >
                    View Weekly Analytics Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: REAL CARDS CATALOG & AUTHENTIC SPECIMENS */}
        {activeView === 'cards_catalog' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-lg font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  Real Cards Vault & Specimen Catalog
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Inspect authentic retail gift cards, physical back security barcodes, scratch-off PINs, and live exchange payouts.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleSelectView('overview')}
                className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
              >
                <span>Back to Home</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <RealCardsCatalog
              onSelectTradeCard={(brandId, cardName, rate) => {
                handleSelectView('exchange');
                triggerSystemNotification(
                  'Card Selected for Liquidation 💳',
                  `Trading ${cardName} at ${rate}/$. Upload photo or paste code.`
                );
              }}
              isLightMode={isLightMode}
            />
          </div>
        )}

        {/* VIEW: COMPETITOR MARKET BENCHMARK & ARCHITECTURAL COMPARISON */}
        {activeView === 'comparison' && (
          <MarketComparisonView />
        )}

        {/* VIEW: VALUE-ADDED SERVICES (AIRTIME, DATA, POWER, CABLE TV, BETTING) */}
        {activeView === 'bills' && (
          <BillPaymentsView
            nairaBalance={nairaBalance}
            cedisBalance={cedisBalance}
            onPayBill={(curr, amt, cat, title) => {
              handleBalanceChange(curr, amt, false, 'withdrawal', `Utility Payment: ${title}`);
              triggerSystemNotification(
                'Recharge Successful ⚡',
                `Paid ${curr === Currency.NGN ? `₦${amt.toLocaleString()}` : `GH₵${amt.toLocaleString()}`} for ${title}`
              );
            }}
            isLightMode={isLightMode}
          />
        )}

        {/* VIEW: ACCOUNTS & DEPOSITS (UNIFIED NUBAN, MOMO, CRYPTO & VIRTUAL CARD) */}
        {(activeView === 'accounts' || activeView === 'virtual_accounts' || activeView === 'crypto_deposit') && (
          <AccountsView
            nairaBalance={nairaBalance}
            cedisBalance={cedisBalance}
            onDepositSimulated={(curr, amt, sender, bank) => {
              handleBalanceChange(curr, amt, true, 'deposit', `Bank Transfer from ${sender} via ${bank}`);
              triggerSystemNotification(
                'Inbound NIP Deposit Received 🏦',
                `+${curr === Currency.NGN ? `₦${amt.toLocaleString()}` : `GH₵${amt.toLocaleString()}`} credited from ${sender}`
              );
            }}
            onCryptoCredited={(curr, fiatAmt, cryptoAmt, assetDesc) => {
              handleBalanceChange(curr, fiatAmt, true, 'deposit', `Crypto Auto-Sweep: ${cryptoAmt} (${assetDesc})`);
              triggerSystemNotification(
                'Crypto Deposit Swept 🪙',
                `+${curr === Currency.NGN ? `₦${fiatAmt.toLocaleString()}` : `GH₵${fiatAmt.toLocaleString()}`} credited (${cryptoAmt})`
              );
            }}
            isLightMode={isLightMode}
          />
        )}

        {/* VIEW: WALLETS & VAULT */}
        {activeView === 'wallets' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-lg font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  Multi-Currency Vault & Balances
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Manage your dual fiat balances, asset weight distribution, and bank/MoMo withdrawals.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleSelectView('overview')}
                className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
              >
                <span>Back to Home</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <WalletCard 
              nairaBalance={nairaBalance}
              cedisBalance={cedisBalance}
              rubbyPoints={rubbyPoints}
              onBalanceChange={handleBalanceChange}
              trades={trades}
            />
          </div>
        )}

        {/* VIEW: TIERED KYC & IDENTITY VERIFICATION */}
        {activeView === 'kyc' && (
          <KycVerificationView isLightMode={isLightMode} />
        )}

        {/* VIEW: WHATSAPP OTC TRADING DESK */}
        {activeView === 'whatsapp_bot' && (
          <WhatsAppBotView isLightMode={isLightMode} />
        )}

        {/* VIEW: SECURITY & 2FA VAULT */}
        {activeView === 'security' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-lg font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  Security & 2FA Vault
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Protect withdrawals with Google Authenticator, device biometric lock, and account security.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleSelectView('overview')}
                className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
              >
                <span>Back to Home</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <SecurityPanel />
          </div>
        )}

        {/* VIEW: EXECUTIVE HOME DASHBOARD */}
        {activeView === 'overview' && (
          <div className="space-y-6">
            
            {/* 1. TRADER PROFILE & COMPLIANCE BAR */}
            <div className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 ${
              isLightMode ? 'bg-white border-slate-200 shadow-xs' : 'bg-[#0E1322] border-white/10 shadow-lg'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 p-0.5">
                  <img 
                    src="/src/assets/images/avatar_trader_vip_1791674394339.jpg" 
                    alt="Trader Profile" 
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Bryan Wyatt
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 font-bold text-[10px] flex items-center gap-1 border border-emerald-500/20">
                      <ShieldCheck className="w-3 h-3" />
                      Tier 2 Verified
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Providus NUBAN · BoG MoMo Channel Active
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSelectView('vip')}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 dark:text-amber-400 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer border border-amber-500/20"
                >
                  <Trophy className="w-3.5 h-3.5" />
                  <span>Gold VIP · Rank #4</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowWeeklySummaryModal(true)}
                  className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 dark:text-rose-400 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer border border-rose-500/20"
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Weekly Summary</span>
                </button>
              </div>
            </div>

            {/* 2. EXECUTIVE MULTI-CURRENCY BALANCE CARD */}
            <div className={`p-6 md:p-8 rounded-3xl text-white relative overflow-hidden shadow-2xl transition-all ${
              isLightMode 
                ? 'bg-gradient-to-br from-rose-900 via-slate-900 to-black border border-slate-200' 
                : 'bg-gradient-to-br from-[#121626] via-[#0E1220] to-[#080A12] border border-white/10'
            }`}>
              {/* Subtle ambient lighting */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                {/* Balance Header */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold mb-1">
                      <span>Total Net Balance</span>
                      <button
                        type="button"
                        onClick={toggleHideBalance}
                        className="p-1 rounded-md hover:bg-white/10 text-slate-300 hover:text-white transition cursor-pointer"
                        title={isBalanceHidden ? 'Show balance' : 'Hide balance'}
                      >
                        {isBalanceHidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <div className="flex items-baseline gap-3">
                      <h2 className="text-3xl md:text-4xl font-extrabold font-mono tracking-tight text-white tabular-nums">
                        {isBalanceHidden ? (
                          '••••••••••'
                        ) : globalPayoutCurrency === Currency.NGN ? (
                          `₦${(nairaBalance + (cedisBalance * 115)).toLocaleString()}`
                        ) : (
                          `GH₵${(cedisBalance + (nairaBalance / 115)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                        )}
                      </h2>
                      {!isBalanceHidden && (
                        <span className="text-xs text-emerald-400 font-mono font-semibold">
                          ≈ ${((nairaBalance / 1500) + (cedisBalance / 12)).toFixed(2)} USD
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Sub-Wallet Balances Chips */}
                  <div className="flex flex-wrap gap-2">
                    <div className="px-3 py-2 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md">
                      <span className="text-[10px] text-slate-400 block font-mono">Naira (NGN)</span>
                      <span className="text-xs font-bold font-mono text-white">
                        {isBalanceHidden ? '••••••' : `₦${nairaBalance.toLocaleString()}`}
                      </span>
                    </div>

                    <div className="px-3 py-2 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md">
                      <span className="text-[10px] text-slate-400 block font-mono">Cedis (GHS)</span>
                      <span className="text-xs font-bold font-mono text-white">
                        {isBalanceHidden ? '••••••' : `GH₵${cedisBalance.toLocaleString()}`}
                      </span>
                    </div>

                    <div className="px-3 py-2 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md">
                      <span className="text-[10px] text-slate-400 block font-mono">Rubby Points</span>
                      <span className="text-xs font-bold font-mono text-rose-400">
                        {isBalanceHidden ? '••••••' : `${rubbyPoints} RP`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 4 PRIMARY ACTION BUTTONS */}
                <div className="pt-2 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button
                    type="button"
                    onClick={() => handleSelectView('exchange')}
                    className="py-3 px-4 rounded-2xl bg-rose-600 hover:bg-rose-500 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-rose-600/30 cursor-pointer"
                  >
                    <ArrowRightLeft className="w-4 h-4" />
                    <span>Sell Gift Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectView('accounts')}
                    className="py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer border border-white/10"
                  >
                    <ArrowDownLeft className="w-4 h-4 text-emerald-400" />
                    <span>Add Money</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handleSelectView('wallets');
                      setTimeout(() => {
                        window.dispatchEvent(new CustomEvent('trigger-rubby-withdraw'));
                      }, 100);
                    }}
                    className="py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer border border-white/10"
                  >
                    <ArrowUpRight className="w-4 h-4 text-rose-400" />
                    <span>Withdraw Funds</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectView('bills')}
                    className="py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer border border-white/10"
                  >
                    <Smartphone className="w-4 h-4 text-amber-400" />
                    <span>Pay Bills</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 3. QUICK SERVICES TILES */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className={`text-xs font-bold uppercase tracking-wider ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  Quick Services & Solutions
                </h3>
                <span className="text-[11px] text-slate-400">Zero commission · Instant credit</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                <button
                  type="button"
                  onClick={() => handleSelectView('exchange')}
                  className={`p-4 rounded-2xl border text-left transition-all hover:scale-102 cursor-pointer ${
                    isLightMode ? 'bg-white hover:bg-slate-50 border-slate-200 shadow-xs' : 'bg-[#0E1322] hover:bg-white/10 border-white/10'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-500 flex items-center justify-center mb-3">
                    <Tag className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Sell Gift Cards</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Top rates up to ₦890/$</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectView('bills')}
                  className={`p-4 rounded-2xl border text-left transition-all hover:scale-102 cursor-pointer ${
                    isLightMode ? 'bg-white hover:bg-slate-50 border-slate-200 shadow-xs' : 'bg-[#0E1322] hover:bg-white/10 border-white/10'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center mb-3">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Airtime & Data</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">MTN, Airtel, Glo 3% off</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectView('bills')}
                  className={`p-4 rounded-2xl border text-left transition-all hover:scale-102 cursor-pointer ${
                    isLightMode ? 'bg-white hover:bg-slate-50 border-slate-200 shadow-xs' : 'bg-[#0E1322] hover:bg-white/10 border-white/10'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center mb-3">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Electricity & TV</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">AEDC, EKEDC, DSTV</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectView('accounts')}
                  className={`p-4 rounded-2xl border text-left transition-all hover:scale-102 cursor-pointer ${
                    isLightMode ? 'bg-white hover:bg-slate-50 border-slate-200 shadow-xs' : 'bg-[#0E1322] hover:bg-white/10 border-white/10'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-500 flex items-center justify-center mb-3">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Virtual NUBAN</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Providus Bank account</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectView('accounts')}
                  className={`p-4 rounded-2xl border text-left transition-all hover:scale-102 cursor-pointer ${
                    isLightMode ? 'bg-white hover:bg-slate-50 border-slate-200 shadow-xs' : 'bg-[#0E1322] hover:bg-white/10 border-white/10'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-500/15 text-sky-500 flex items-center justify-center mb-3">
                    <Coins className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Crypto Auto-Sweep</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">USDT, BTC, Solana</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectView('whatsapp_bot')}
                  className={`p-4 rounded-2xl border text-left transition-all hover:scale-102 cursor-pointer ${
                    isLightMode ? 'bg-white hover:bg-slate-50 border-slate-200 shadow-xs' : 'bg-[#0E1322] hover:bg-white/10 border-white/10'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-500/15 text-teal-500 flex items-center justify-center mb-3">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">WhatsApp Desk</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Direct OTC trade bot</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectView('cards_catalog')}
                  className={`p-4 rounded-2xl border text-left transition-all hover:scale-102 cursor-pointer ${
                    isLightMode ? 'bg-white hover:bg-slate-50 border-slate-200 shadow-xs' : 'bg-[#0E1322] hover:bg-white/10 border-white/10'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-400 flex items-center justify-center mb-3">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Real Cards Vault</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Physical photos & rates</p>
                </button>
              </div>
            </div>

            {/* 4. LIVE MARKET RATES SNAPSHOT (TOP 4 CARDS) */}
            <div className={`p-6 rounded-3xl border ${isLightMode ? 'bg-white border-slate-200 shadow-xs' : 'bg-[#0E1322] border-white/10 shadow-xl'}`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-rose-500" />
                    <span>Top Market Card Quotes ({globalPayoutCurrency})</span>
                  </h3>
                  <p className="text-[11px] text-slate-400">Guaranteed highest liquidation rates updated every 5 seconds</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleSelectView('rates')}
                  className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
                >
                  <span>See All Rates</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {SUPPORTED_BRANDS.slice(0, 4).map(brand => {
                  const rate = liveRates[brand.id]?.[globalPayoutCurrency] || brand.rates[globalPayoutCurrency];
                  const symbol = globalPayoutCurrency === Currency.NGN ? '₦' : 'GH₵';
                  const history = ratesHistory[brand.id] || [rate, rate];
                  
                  return (
                    <div 
                      key={brand.id}
                      className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                        isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center p-1">
                            <BrandLogo brandId={brand.id} className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-900 dark:text-white block leading-tight">
                              {brand.name}
                            </span>
                            <span className="text-[10px] text-slate-400 block">{brand.category}</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 font-bold">
                          +2.4%
                        </span>
                      </div>

                      <div className="flex items-end justify-between pt-2 border-t border-slate-200 dark:border-white/5">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-mono">Today's Rate</span>
                          <span className="font-mono text-base font-extrabold text-rose-500">
                            {symbol}{rate} <span className="text-[10px] text-slate-400 font-normal">/ $1</span>
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleSelectView('exchange')}
                          className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold transition cursor-pointer"
                        >
                          Trade
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5. SPLIT INTELLIGENCE: RECENT ACTIVITY & FAST TOOLS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Recent Settlements Activity */}
              <div className="lg:col-span-7 space-y-4">
                <div className={`p-6 rounded-3xl border ${isLightMode ? 'bg-white border-slate-200 shadow-xs' : 'bg-[#0E1322] border-white/10 shadow-xl'}`}>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-white/5">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Layers className="w-4 h-4 text-rose-500" />
                        <span>Recent Settlements & Transactions</span>
                      </h3>
                      <p className="text-[11px] text-slate-400">Live verified disbursements to bank & MoMo</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSelectView('ledger')}
                      className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Full Statement</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Transaction items */}
                  <div className="space-y-2">
                    {walletTransactions.slice(0, 5).map(tx => {
                      const isCredit = tx.type === 'deposit' || tx.type === 'trade_payout';
                      const symbol = tx.currency === Currency.NGN ? '₦' : 'GH₵';

                      return (
                        <div
                          key={tx.id}
                          onClick={() => {
                            setActiveReceipt({
                              id: tx.id,
                              receiptNumber: tx.id.startsWith('tx-') ? `RX-${tx.id.slice(3, 11).toUpperCase()}-2026` : tx.id,
                              type: tx.type === 'deposit' ? 'deposit' : tx.type === 'trade_payout' ? 'card_trade' : 'withdrawal',
                              title: tx.description,
                              amount: tx.amount,
                              currency: tx.currency,
                              status: tx.status,
                              timestamp: tx.createdAt,
                              beneficiaryBank: tx.currency === Currency.NGN ? 'Providus Bank (NIP)' : 'Bank of Ghana / MoMo'
                            });
                          }}
                          className={`p-3 rounded-2xl border flex items-center justify-between transition cursor-pointer group ${
                            isLightMode ? 'bg-slate-50 border-slate-200 hover:bg-slate-100' : 'bg-white/5 border-white/5 hover:bg-white/10'
                          }`}
                          title="Click to view official printable receipt"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                              isCredit ? 'bg-emerald-500/15 text-emerald-500' : 'bg-rose-500/15 text-rose-500'
                            }`}>
                              {isCredit ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                            </div>
                            <div className="truncate">
                              <span className="text-xs font-bold text-slate-900 dark:text-white block truncate group-hover:text-rose-500 transition-colors">
                                {tx.description}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">
                                {new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {new Date(tx.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          <div className="text-right shrink-0 ml-2">
                            <span className={`font-mono text-xs font-extrabold block ${
                              isCredit ? 'text-emerald-500' : 'text-slate-900 dark:text-white'
                            }`}>
                              {isCredit ? '+' : '-'}{symbol}{tx.amount.toLocaleString()}
                            </span>
                            <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-wider">
                              Completed 📄
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Rate Calculator & 7-Day Trading Velocity */}
              <div className="lg:col-span-5 space-y-6">
                <CurrencyCalculator />
                <VolumeTrendChart trades={trades} />
              </div>
            </div>

          </div>
        )}

      </main>

      {/* INSTITUTIONAL EXECUTIVE FOOTER */}
      <Footer
        isLightMode={isLightMode}
        onSelectView={handleSelectView}
        onOpenDueDiligence={() => setShowDueDiligenceModal(true)}
        onOpenWeeklySummary={() => setShowWeeklySummaryModal(true)}
      />

      {/* WEEKLY PERFORMANCE INSIGHTS MODAL */}
      <WeeklySummaryModal 
        isOpen={showWeeklySummaryModal}
        onClose={() => setShowWeeklySummaryModal(false)}
        trades={trades}
      />

      {/* TRANSACTION OFFICIAL RECEIPT MODAL */}
      <TransactionReceiptModal
        isOpen={Boolean(activeReceipt)}
        onClose={() => setActiveReceipt(null)}
        data={activeReceipt}
        isLightMode={isLightMode}
      />

      {/* CLIENT DUE DILIGENCE AUDIT MODAL */}
      <ClientDueDiligenceModal
        isOpen={showDueDiligenceModal}
        onClose={() => setShowDueDiligenceModal(false)}
        isLightMode={isLightMode}
      />

      {/* EMBEDDED CONCIERGE LIVE CHAT */}
      <LiveChat />
    </div>
  );
}
