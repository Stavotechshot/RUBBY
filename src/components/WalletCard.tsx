import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip 
} from 'recharts';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Building2, 
  Check, 
  PhoneCall, 
  HelpCircle,
  Copy,
  TrendingUp,
  Award,
  Target,
  Edit2,
  Sparkles,
  QrCode,
  Smartphone
} from 'lucide-react';
import { Currency, WalletTransaction, Trade } from '../types';

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 p-2.5 rounded-xl shadow-xl text-[11px] font-sans">
        <p className="text-[9px] font-bold text-slate-500 dark:text-white/50 uppercase tracking-wider mb-0.5">{data.name}</p>
        <p className="font-extrabold text-rose-600 dark:text-rose-400 font-mono text-xs">{data.display}</p>
        <p className="text-[10px] text-slate-600 dark:text-white/70 mt-0.5">Weight: <strong className="text-slate-900 dark:text-white">{data.percentage}%</strong></p>
      </div>
    );
  }
  return null;
};

interface WalletCardProps {
  nairaBalance: number;
  cedisBalance: number;
  rubbyPoints: number;
  onBalanceChange: (currency: Currency, amount: number, isDeposit: boolean, type: WalletTransaction['type'], desc: string) => void;
  trades?: Trade[];
}

export default function WalletCard({ 
  nairaBalance, 
  cedisBalance, 
  rubbyPoints,
  onBalanceChange,
  trades = []
}: WalletCardProps) {
  const [activeTab, setActiveTab] = useState<Currency>(Currency.NGN);
  
  // Dynamic Asset Portfolio distribution values standardized to USD weight for proportional layout representation
  const chartData = React.useMemo(() => {
    const usdNaira = nairaBalance / 1500;
    const usdCedis = cedisBalance / 12;
    const usdPoints = rubbyPoints * 0.1; // 1 RP = 10 cents
    
    const totalUSD = usdNaira + usdCedis + usdPoints;
    
    return [
      { name: 'Naira Wallet', value: nairaBalance, usdVal: usdNaira || 0.001, display: `₦${nairaBalance.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}`, color: '#f43f5e' }, // rose-500
      { name: 'Cedis Wallet', value: cedisBalance, usdVal: usdCedis || 0.001, display: `GH₵${cedisBalance.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}`, color: '#6366f1' },  // indigo-500
      { name: 'Rubby Points', value: rubbyPoints, usdVal: usdPoints || 0.001, display: `${rubbyPoints} RP ($${(rubbyPoints * 0.1).toFixed(2)})`, color: '#10b981' } // emerald-500
    ].map(item => ({
      ...item,
      percentage: totalUSD > 0 ? Math.round((item.usdVal / totalUSD) * 100) : 0
    }));
  }, [nairaBalance, cedisBalance, rubbyPoints]);

  const [showTopupModal, setShowTopupModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrAmountInput, setQrAmountInput] = useState('10000');
  const [isSimulatedScanning, setIsSimulatedScanning] = useState(false);
  const [hasScannedSuccessfully, setHasScannedSuccessfully] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);
  
  // Daily Goal States
  const [dailyGoal, setDailyGoal] = useState(() => {
    return Number(localStorage.getItem('rubby_daily_goal') || '500');
  });
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [editingValue, setEditingValue] = useState(dailyGoal.toString());

  // Compute Volume Completed Today
  const todayVolume = React.useMemo(() => {
    const todayStr = new Date().toDateString();
    return trades.reduce((sum, t) => {
      try {
        const isToday = new Date(t.createdAt).toDateString() === todayStr;
        return isToday ? sum + t.cardValue : sum;
      } catch {
        return sum;
      }
    }, 0);
  }, [trades]);

  const percentage = Math.min(100, Math.round((todayVolume / dailyGoal) * 100)) || 0;

  const saveDailyGoal = (val: string) => {
    const num = Number(val);
    if (!isNaN(num) && num > 0) {
      setDailyGoal(num);
      localStorage.setItem('rubby_daily_goal', num.toString());
      setIsEditingGoal(false);
    }
  };

  useEffect(() => {
    const handleOpenWithdraw = () => {
      setSuccessDetails(null);
      setShowWithdrawModal(true);
    };
    window.addEventListener('trigger-rubby-withdraw', handleOpenWithdraw);
    return () => window.removeEventListener('trigger-rubby-withdraw', handleOpenWithdraw);
  }, []);
  
  // Form States
  const [amount, setAmount] = useState('');
  const [bankName, setBankName] = useState('Providus Bank');
  const [accountNo, setAccountNo] = useState('');
  const [momoProvider, setMomoProvider] = useState('MTN MoMo');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successDetails, setSuccessDetails] = useState<string | null>(null);

  const virtualAccountDetails = {
    bank: 'Rubby Microfinance / Providus Bank',
    accountNumber: '9582048592',
    accountName: 'RUBBY-USER-81734'
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onBalanceChange(
        activeTab, 
        parsedAmount, 
        true, 
        'deposit', 
        activeTab === Currency.NGN 
          ? `Virtual Bank Topup (Ref: ${Math.floor(Math.random() * 1000000)})`
          : `MTN MoMo Deposit (${phoneNumber})`
      );
      setSuccessDetails(`Successfully deposited ${activeTab === Currency.NGN ? '₦' : 'GH₵'}${parsedAmount.toLocaleString()}`);
      setAmount('');
      setPhoneNumber('');
    }, 1500);
  };

  const handleQRDepositSimulated = (amountVal: number) => {
    setIsSimulatedScanning(true);
    setTimeout(() => {
      setIsSimulatedScanning(false);
      setHasScannedSuccessfully(true);
      
      onBalanceChange(
        activeTab,
        amountVal,
        true,
        'deposit',
        activeTab === Currency.NGN
          ? `QR Code Webpay Deposit (Auth Ref: QR-${Math.floor(200000 + Math.random() * 800000)})`
          : `GHS MoMo QR Scan Deposit (Reference: MoMoQR-${Math.floor(100000 + Math.random() * 900000)})`
      );
    }, 1800);
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    const balance = activeTab === Currency.NGN ? nairaBalance : cedisBalance;

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }
    if (parsedAmount > balance) {
      alert('Insufficient wallet balance.');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onBalanceChange(
        activeTab, 
        parsedAmount, 
        false, 
        'withdrawal', 
        activeTab === Currency.NGN 
          ? `Withdrawal to ${bankName} (${accountNo})`
          : `MoMo Cashout to ${momoProvider} (${phoneNumber})`
      );
      setSuccessDetails(`Successfully withdrew ${activeTab === Currency.NGN ? '₦' : 'GH₵'}${parsedAmount.toLocaleString()}. Funds are on their way!`);
      setAmount('');
      setAccountNo('');
      setPhoneNumber('');
    }, 1500);
  };

  const currentBalance = activeTab === Currency.NGN ? nairaBalance : cedisBalance;
  const currencySymbol = activeTab === Currency.NGN ? '₦' : 'GH₵';

  return (
    <div id="rubby-wallet-card-container" className="bg-white dark:bg-[#0E1322] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 shadow-xl dark:shadow-2xl text-slate-900 dark:text-white transition-all duration-300">
      {/* Wallet Selector Tabs */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-full border border-slate-200 dark:border-white/5">
          <button
            type="button"
            id="wallet-tab-ngn"
            onClick={() => setActiveTab(Currency.NGN)}
            className={`px-4 py-2 rounded-full font-medium text-xs transition-all cursor-pointer ${
              activeTab === Currency.NGN
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 dark:text-white/50 dark:hover:text-white'
            }`}
          >
            Naira Wallet
          </button>
          <button
            type="button"
            id="wallet-tab-ghs"
            onClick={() => setActiveTab(Currency.GHS)}
            className={`px-4 py-2 rounded-full font-medium text-xs transition-all cursor-pointer ${
              activeTab === Currency.GHS
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 dark:text-white/50 dark:hover:text-white'
            }`}
          >
            Cedis Wallet
          </button>
        </div>

        {/* Rewards counter */}
        <div className="flex items-center gap-1.5 bg-rose-50 dark:bg-rose-500/10 px-3 py-1.5 rounded-full border border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400">
          <Award className="w-3.5 h-3.5 text-rose-500" />
          <span className="font-mono text-xs font-bold text-rose-600 dark:text-rose-400">
            {rubbyPoints} RP
          </span>
        </div>
      </div>

      {/* Main Balance Card (Radiant Ruby Prestige Card) */}
      <div className="relative overflow-hidden bg-gradient-to-br from-rose-600 via-rose-700 to-rose-900 text-white rounded-2xl p-6 mb-6 shadow-lg shadow-rose-900/25 border border-rose-500/30">
        {/* Subtle Decorative Background Rings */}
        <div className="absolute right-0 top-0 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 w-32 h-32 bg-black/20 rounded-full blur-xl pointer-events-none" />

        <div className="flex items-center justify-between mb-2">
          <span className="text-white/80 text-xs font-medium uppercase tracking-wider">Available Balance</span>
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
            <Wallet className="w-4 h-4 text-white" />
          </div>
        </div>

        <div className="flex items-baseline gap-1 mb-8">
          <span className="text-3xl font-extrabold font-sans">
            {currencySymbol}
          </span>
          <span className="text-4xl font-extrabold font-sans tracking-tight">
            {currentBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        {/* Quick Action Buttons inside Card */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            id="btn-trigger-topup"
            onClick={() => {
              setSuccessDetails(null);
              setShowTopupModal(true);
            }}
            className="flex items-center justify-center gap-2 bg-white text-rose-700 hover:bg-slate-100 font-bold text-xs py-2.5 px-4 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <ArrowUpRight className="w-4 h-4" />
            Top Up
          </button>
          <button
            type="button"
            id="btn-trigger-withdraw"
            onClick={() => {
              setSuccessDetails(null);
              setShowWithdrawModal(true);
            }}
            className="flex items-center justify-center gap-2 bg-black/25 hover:bg-black/35 text-white border border-white/20 font-bold text-xs py-2.5 px-4 rounded-xl transition-all active:scale-95 cursor-pointer backdrop-blur-sm"
          >
            <ArrowDownLeft className="w-4 h-4" />
            Withdraw
          </button>
        </div>
      </div>

      {/* Wealth Distribution Asset Portfolio Donut Chart */}
      <div className="bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-4 mb-6 space-y-3 relative overflow-hidden">
        <div className="absolute right-2 top-2 opacity-[0.03] pointer-events-none">
          <TrendingUp className="w-16 h-16 text-rose-500" />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <span className="text-xs font-extrabold uppercase tracking-wide text-slate-900 dark:text-white/95">Portfolio Metrics</span>
          </div>
          <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-2 py-0.5 rounded-lg font-mono">
            Active Distribution
          </span>
        </div>

        <div className="flex items-center justify-between gap-2.5">
          {/* Recharts Pie Donut visual */}
          <div className="w-[45%] h-28 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={28}
                  outerRadius={45}
                  paddingAngle={4}
                  dataKey="usdVal"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center HUD percentage marker label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
              <span className="text-[8px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">WEIGHT</span>
              <span className="text-[10px] font-black text-rose-600 dark:text-rose-400 font-mono">PORTFOLIO</span>
            </div>
          </div>

          {/* List display legend of percentages */}
          <div className="w-[55%] space-y-2">
            {chartData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-[11px] font-mono bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 p-1.5 rounded-xl shadow-xs dark:shadow-none">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-600 dark:text-white/70 truncate text-[10px] font-sans font-bold">{item.name}</span>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-slate-900 dark:text-white font-extrabold">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Trading Goal Progress Tracker */}
      <div id="daily-trading-goal-container" className="bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-4 mb-6 space-y-3 relative overflow-hidden">
        <div className="absolute right-2 top-2 opacity-[0.03] pointer-events-none">
          <Target className="w-16 h-16 text-rose-500" />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <span className="text-xs font-extrabold uppercase tracking-wide text-slate-900 dark:text-white/95">Daily Trading Goal</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            {isEditingGoal ? (
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  value={editingValue}
                  onChange={(e) => setEditingValue(e.target.value)}
                  className="w-16 px-1.5 py-0.5 text-[10px] font-bold border border-rose-500 bg-white dark:bg-zinc-950 text-slate-900 dark:text-white rounded focus:outline-none"
                  min="10"
                  max="10000"
                />
                <button
                  type="button"
                  onClick={() => saveDailyGoal(editingValue)}
                  className="px-2 py-0.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 rounded transition cursor-pointer"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-2 py-0.5 rounded-lg shadow-xs dark:shadow-none">
                <span className="text-[10px] font-extrabold text-slate-800 dark:text-white font-mono">
                  Goal: ${dailyGoal} USD
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setEditingValue(dailyGoal.toString());
                    setIsEditingGoal(true);
                  }}
                  className="text-slate-400 hover:text-slate-700 dark:hover:text-white transition p-0.5 cursor-pointer"
                  title="Modify Daily Volume Target"
                >
                  <Edit2 className="w-2.5 h-2.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Info row */}
        <div className="flex justify-between items-baseline text-xs">
          <span className="text-slate-500 dark:text-white/40 text-[10px] font-medium font-mono">
            Today's Volume: <strong className="text-slate-900 dark:text-white">${todayVolume.toLocaleString()} USD</strong>
          </span>
          <span className="text-rose-600 dark:text-rose-400 font-extrabold text-[10px] font-mono">
            {percentage}% Complete
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-200 dark:bg-white/5 h-2.5 rounded-full overflow-hidden border border-slate-300 dark:border-white/5 p-0.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-rose-600 via-rose-500 to-rose-400 rounded-full"
          />
        </div>

        {/* Quick select targets */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1">
            <span className="text-[9px] font-mono text-slate-400 dark:text-white/30 uppercase">Set:</span>
            {[250, 500, 1000, 2000].map(val => (
              <button
                key={val}
                type="button"
                onClick={() => {
                  setDailyGoal(val);
                  localStorage.setItem('rubby_daily_goal', val.toString());
                  setIsEditingGoal(false);
                }}
                className={`px-1.5 py-0.5 rounded text-[9px] font-black border transition cursor-pointer ${
                  dailyGoal === val
                    ? 'bg-rose-50 dark:bg-rose-500/15 border-rose-300 dark:border-rose-500/30 text-rose-600 dark:text-rose-400'
                    : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-500 dark:text-white/40 hover:bg-slate-100 dark:hover:bg-white/10'
                }`}
              >
                ${val}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-1 text-[9px] font-semibold text-emerald-600 dark:text-emerald-400">
            <Sparkles className="w-3 h-3" />
            <span>+50 RP on Reach!</span>
          </div>
        </div>

        {/* Motivation Message box */}
        <div className="text-[10px] text-slate-500 dark:text-white/45 leading-normal italic py-0.5 border-t border-slate-200 dark:border-white/5 mt-1">
          {percentage === 0 ? (
            <span>💡 Place trades in the exchange portal above to fill up your volume target.</span>
          ) : percentage < 100 ? (
            <span>🚀 Great momentum! You are <strong>${(dailyGoal - todayVolume).toLocaleString()} USD</strong> away from the target rewards list.</span>
          ) : (
            <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 not-italic">
              🏆 Goal achieved! You managed ${todayVolume} in volume today. +50 RP points bonus is active!
            </span>
          )}
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-white/10 pt-4">
        {activeTab === Currency.NGN ? (
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
              NairaX Automatic Bank Transfer
            </h4>
            <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-200 dark:border-white/5 space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-600 dark:text-white/50">
                <span>Bank Name</span>
                <span className="font-semibold text-slate-900 dark:text-white">{virtualAccountDetails.bank}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600 dark:text-white/50">
                <span>Account Number</span>
                <div className="flex items-center gap-1.5 font-mono font-bold text-slate-900 dark:text-white">
                  <span>{virtualAccountDetails.accountNumber}</span>
                  <button 
                    type="button" 
                    onClick={() => copyToClipboard(virtualAccountDetails.accountNumber)}
                    className="p-1 hover:bg-slate-200 dark:hover:bg-white/10 rounded transition cursor-pointer"
                  >
                    {copiedAccount ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center text-slate-600 dark:text-white/50">
                <span>Account Name</span>
                <span className="font-mono text-slate-800 dark:text-white/80 text-[10px]">{virtualAccountDetails.accountName}</span>
              </div>
              
              <div className="border-t border-slate-200 dark:border-white/5 pt-2.5 mt-1">
                <button
                  type="button"
                  id="btn-generate-qr-ngn"
                  onClick={() => {
                    setHasScannedSuccessfully(false);
                    setIsSimulatedScanning(false);
                    setQrAmountInput('15000');
                    setShowQRModal(true);
                  }}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider bg-rose-50 hover:bg-rose-600 dark:bg-rose-600/15 dark:hover:bg-rose-600 text-rose-600 hover:text-white dark:text-rose-400 dark:hover:text-white transition cursor-pointer border border-rose-200 dark:border-rose-500/10 active:scale-[0.98]"
                >
                  <QrCode className="w-4 h-4" />
                  Generate Deposit QR Code
                </button>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-white/40 leading-normal">
              💳 Send Naira directly to this virtual account to topup your online Rubby balance automatically within seconds. powered secure by NairaX integrations.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
              Ghana Mobile Money (MoMo) Link
            </h4>
            <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-200 dark:border-white/5 space-y-2 text-[11px] text-slate-600 dark:text-white/50">
              <div className="flex justify-between items-center">
                <span>Integration Channel</span>
                <span className="font-semibold text-slate-900 dark:text-white">MTN, Telecel, AirtelTigo</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Shorthand USSD</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-white">*170# or Express Push</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Deposit Status</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Instant Auto-Credited
                </span>
              </div>

              <div className="border-t border-slate-200 dark:border-white/5 pt-2.5 mt-1">
                <button
                  type="button"
                  id="btn-generate-qr-ghs"
                  onClick={() => {
                    setHasScannedSuccessfully(false);
                    setIsSimulatedScanning(false);
                    setQrAmountInput('120');
                    setShowQRModal(true);
                  }}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider bg-rose-50 hover:bg-rose-600 dark:bg-rose-600/15 dark:hover:bg-rose-600 text-rose-600 hover:text-white dark:text-rose-400 dark:hover:text-white transition cursor-pointer border border-rose-200 dark:border-rose-500/10 active:scale-[0.98]"
                >
                  <QrCode className="w-4 h-4" />
                  Generate Deposit QR Code
                </button>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-white/40 leading-normal">
              📱 Link your MoMo wallet. Use prompt triggers on registration to deposit instantly anytime.
            </p>
          </div>
        )}
      </div>

      {/* Topup Modal Selector */}
      <AnimatePresence>
        {showTopupModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-[#0E1322] border border-slate-200 dark:border-white/10 rounded-3xl p-6 w-full max-w-md shadow-2xl relative text-slate-900 dark:text-white"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                Top Up {activeTab === Currency.NGN ? 'Naira Wallet' : 'Cedis Wallet'}
              </h3>

              {successDetails ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-slate-800 dark:text-white/95">{successDetails}</p>
                  <button
                    type="button"
                    onClick={() => setShowTopupModal(false)}
                    className="w-full bg-slate-900 dark:bg-white text-white dark:text-black font-extrabold text-xs py-2.5 rounded-xl transition cursor-pointer hover:bg-slate-800 dark:hover:bg-white/90"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleDepositSubmit} className="space-y-4">
                  {activeTab === Currency.NGN ? (
                    <div className="bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 p-3.5 rounded-xl text-xs text-rose-700 dark:text-rose-400">
                      <strong>Automatic Mode:</strong> You can transfer directly to your Providus Bank account listed outside. To simulate an incoming bank transfer immediately in this playground, specify the simulated transfer amount below:
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-2">
                        {['MTN MoMo', 'Telecel Cash', 'AirtelTigo'].map(provider => (
                          <button
                            type="button"
                            key={provider}
                            onClick={() => setMomoProvider(provider)}
                            className={`py-1.5 px-2 rounded-lg text-[10px] font-medium border text-center transition cursor-pointer ${
                              momoProvider === provider
                                ? 'bg-rose-600 border-rose-600 text-white font-bold'
                                : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-white/70 hover:bg-slate-200 dark:hover:bg-white/10'
                            }`}
                          >
                            {provider}
                          </button>
                        ))}
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-slate-600 dark:text-white/60 mb-1">
                          MoMo Phone Number
                        </label>
                        <input
                          type="tel"
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="e.g. 054 XXXXXXX"
                          className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-white/10 rounded-lg bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-white/60 mb-1">
                      Deposit Amount ({currencySymbol})
                    </label>
                    <input
                      type="number"
                      required
                      min="10"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder={`Enter amount to top up`}
                      className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-white/10 rounded-lg bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-rose-500 font-bold"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowTopupModal(false)}
                      className="flex-1 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/70 font-medium text-xs py-2.5 rounded-xl transition hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer bg-transparent"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
                    >
                      {isProcessing ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          Processing...
                        </>
                      ) : (
                        'Confirm Deposit'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Withdraw Modal */}
      <AnimatePresence>
        {showWithdrawModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-[#0E1322] border border-slate-200 dark:border-white/10 rounded-3xl p-6 w-full max-w-md shadow-2xl relative text-slate-900 dark:text-white"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Withdraw to Bank / MoMo
              </h3>
              <p className="text-xs text-slate-500 dark:text-white/45 mb-4 flex items-center gap-1">
                <span>Available balance to withdraw: </span>
                <span className="font-bold text-slate-900 dark:text-white/80">
                  {currencySymbol}{currentBalance.toLocaleString()}
                </span>
              </p>

              {successDetails ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-12 h-12 bg-rose-50 dark:bg-rose-500/15 border border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-slate-800 dark:text-white/90">{successDetails}</p>
                  <button
                    type="button"
                    onClick={() => setShowWithdrawModal(false)}
                    className="w-full bg-slate-900 dark:bg-white text-white dark:text-black font-extrabold text-xs py-2.5 rounded-xl transition cursor-pointer hover:bg-slate-800 dark:hover:bg-white/90"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleWithdrawSubmit} className="space-y-4">
                  {activeTab === Currency.NGN ? (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-600 dark:text-white/60 mb-1">
                          Select Recipient Bank
                        </label>
                        <select
                          value={bankName}
                          onChange={(e) => setBankName(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-white/10 rounded-lg bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                        >
                          <option value="Providus Bank">Providus Bank</option>
                          <option value="Access Bank">Access Bank PLC</option>
                          <option value="GTBank">Guaranty Trust Bank</option>
                          <option value="Zenith Bank">Zenith Bank Plc</option>
                          <option value="Kuda Bank">Kuda Microfinance</option>
                          <option value="OPay">OPay Digital Services</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600 dark:text-white/60 mb-1">
                          Account Number (10 Digits)
                        </label>
                        <input
                          type="text"
                          required
                          pattern="\d{10}"
                          maxLength={10}
                          value={accountNo}
                          onChange={(e) => setAccountNo(e.target.value.replace(/\D/g, ''))}
                          placeholder="0123456789"
                          className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-white/10 rounded-lg bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-rose-500 font-mono"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-600 dark:text-white/60 mb-1">
                          MoMo Network Operator
                        </label>
                        <select
                          value={momoProvider}
                          onChange={(e) => setMomoProvider(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-white/10 rounded-lg bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                        >
                          <option value="MTN MoMo">MTN Mobile Money</option>
                          <option value="Telecel Cash">Telecel Cash</option>
                          <option value="AirtelTigo Money">AirtelTigo Money</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600 dark:text-white/60 mb-1">
                          MoMo Phone Number
                        </label>
                        <input
                          type="tel"
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="e.g. 054 XXXXXXX"
                          className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-white/10 rounded-lg bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white focus:outline-none font-mono"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-white/60 mb-1">
                      Withdraw Amount ({currencySymbol})
                    </label>
                    <input
                      type="number"
                      required
                      min="50"
                      max={currentBalance}
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder={`Min ${currencySymbol}${activeTab === Currency.NGN ? '1,000' : '20'}`}
                      className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-white/10 rounded-lg bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white focus:outline-none font-bold"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowWithdrawModal(false)}
                      className="flex-1 border border-slate-200 dark:border-white/15 text-slate-600 dark:text-white/70 font-medium text-xs py-2.5 rounded-xl transition hover:bg-slate-100 dark:hover:bg-white/5 bg-transparent cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
                    >
                      {isProcessing ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          Withdrawing...
                        </>
                      ) : (
                        'Process Payout'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Interactive QR Code Generator & simulated payment modal popup */}
      <AnimatePresence>
        {showQRModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-[#0E1322] border border-slate-200 dark:border-white/10 rounded-3xl p-6 w-full max-w-sm shadow-2xl relative text-slate-900 dark:text-white text-center"
            >
              {/* Close Button top-right */}
              <button
                type="button"
                onClick={() => setShowQRModal(false)}
                className="absolute right-4 top-4 hover:bg-slate-100 dark:hover:bg-white/10 p-1.5 rounded-full text-slate-400 hover:text-slate-800 dark:text-white/50 dark:hover:text-white transition cursor-pointer bg-transparent border-0 text-lg"
              >
                ✕
              </button>

              <div className="flex items-center justify-center gap-2 mb-3">
                <QrCode className="w-5 h-5 text-rose-600 dark:text-rose-400 animate-pulse" />
                <span className="text-xs uppercase font-extrabold tracking-widest text-rose-600 dark:text-rose-400">Rubby Pay QR Code</span>
              </div>

              {!hasScannedSuccessfully ? (
                <div className="space-y-4">
                  <p className="text-xs text-slate-600 dark:text-white/60">
                    Set your deposit amount to generate an instant auto-credited QR payload:
                  </p>

                  <div className="bg-slate-50 dark:bg-white/5 p-3 rounded-2xl border border-slate-200 dark:border-white/5 space-y-2">
                    <label className="block text-[10px] text-slate-500 dark:text-white/40 font-bold uppercase tracking-wider text-left">
                      Dynamic Deposit Amount ({currencySymbol})
                    </label>
                    <input
                      type="number"
                      required
                      min="5"
                      value={qrAmountInput}
                      onChange={(e) => setQrAmountInput(e.target.value)}
                      placeholder={`Enter amount`}
                      className="w-full px-3 py-1.5 text-sm border border-slate-200 dark:border-rose-500/10 rounded-xl bg-white dark:bg-zinc-950 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-rose-500 text-center font-bold"
                    />
                  </div>

                  {/* Simulated Intricate SVG QR Code */}
                  <div className="relative w-48 h-48 bg-white p-3 rounded-2xl mx-auto shadow-md dark:shadow-inner border border-slate-200 dark:border-none flex items-center justify-center group overflow-hidden">
                    {/* Glowing pulse aura */}
                    <div className="absolute inset-0 bg-transparent border-2 border-rose-500/10 group-hover:border-rose-500/50 transition-all pointer-events-none" />
                    
                    {/* Pulsing Scanline Sweep overlay */}
                    {!isSimulatedScanning && (
                      <motion.div 
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                        className="absolute left-0 right-0 h-0.5 bg-rose-500 shadow-lg shadow-rose-500/80 z-10 pointer-events-none"
                      />
                    )}

                    {isSimulatedScanning && (
                      <div className="absolute inset-0 bg-black/80 z-20 flex flex-col items-center justify-center space-y-2">
                        <span className="w-8 h-8 border-3 border-rose-500 border-t-transparent rounded-full animate-spin"></span>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-rose-400 font-mono animate-pulse">Scanning Transfer...</span>
                      </div>
                    )}

                    {/* Procedural SVG QR code vector mosaic */}
                    <svg className="w-full h-full text-zinc-900" viewBox="0 0 100 100" fill="currentColor">
                      {/* Top-Left Corner Anchor */}
                      <rect x="5" y="5" width="22" height="22" rx="2" fill="currentColor" />
                      <rect x="9" y="9" width="14" height="14" rx="1" fill="#fff" />
                      <rect x="12" y="12" width="8" height="8" rx="0.5" fill="currentColor" />
                      
                      {/* Top-Right Corner Anchor */}
                      <rect x="73" y="5" width="22" height="22" rx="2" fill="currentColor" />
                      <rect x="77" y="9" width="14" height="14" rx="1" fill="#fff" />
                      <rect x="80" y="12" width="8" height="8" rx="0.5" fill="currentColor" />
                      
                      {/* Bottom-Left Corner Anchor */}
                      <rect x="5" y="73" width="22" height="22" rx="2" fill="currentColor" />
                      <rect x="9" y="77" width="14" height="14" rx="1" fill="#fff" />
                      <rect x="12" y="80" width="8" height="8" rx="0.5" fill="currentColor" />

                      {/* Align markers */}
                      <rect x="77" y="77" width="8" height="8" rx="1" fill="currentColor" />
                      <rect x="79" y="79" width="4" height="4" rx="0.5" fill="#fff" />
                      
                      {/* Semi-random intricate QR block design matrix */}
                      <path d="
                        M 32,5 h 4 v 4 h -4 z M 40,5 h 8 v 4 h -8 z M 52,5 h 4 v 8 h -4 z M 60,5 h 8 v 4 h -8 z
                        M 32,13 h 8 v 4 h -8 z M 44,13 h 4 v 8 h -4 z M 52,17 h 8 v 4 h -8 z M 64,13 h 4 v 4 h -4 z
                        M 32,21 h 4 v 4 h -4 z M 40,25 h 4 v 4 h -4 z M 48,21 h 8 v 4 h -8 z M 60,21 h 12 v 4 h -12 z
                        M 5,32 h 8 v 4 h -8 z M 17,32 h 4 v 8 h -4 z M 25,32 h 12 v 4 h -12 z M 41,32 h 8 v 4 h -8 z M 53,32 h 16 v 4 h -16 z M 73,32 h 12 v 4 h -12 z
                        M 5,40 h 4 v 8 h -4 z M 13,44 h 8 v 4 h -8 z M 25,40 h 4 v 4 h -4 z M 33,40 h 12 v 4 h -12 z M 49,44 h 16 v 4 h -16 z M 71,40 h 8 v 4 h -8 z
                        M 5,52 h 12 v 4 h -12 z M 21,52 h 4 v 8 h -4 z M 29,52 h 8 v 4 h -8 z M 41,52 h 12 v 4 h -12 z M 57,52 h 8 v 4 h -8 z M 69,52 h 12 v 4 h -12 z
                        M 5,60 h 4 v 4 h -4 z M 13,60 h 12 v 4 h -12 z M 29,64 h 4 v 8 h -4 z M 37,60 h 16 v 4 h -16 z M 57,60 h 4 v 12 h -4 z M 65,60 h 8 v 4 h -8 z M 77,60 h 12 v 4 h -12 z
                        M 32,73 h 12 v 4 h -12 z M 48,73 h 4 v 8 h -4 z M 56,77 h 8 v 4 h -8 z M 68,73 h 4 v 4 h -4 z
                        M 32,81 h 4 v 8 h -4 z M 40,85 h 8 v 4 h -8 z M 52,81 h 12 v 4 h -12 z M 68,85 h 4 v 4 h -4 z
                        M 32,89 h 12 v 4 h -12 z M 48,89 h 4 v 4 h -4 z M 56,89 h 16 v 4 h -16 z
                      " fill="currentColor" />

                      {/* Small Center rubby wallet badge logo */}
                      <rect x="42" y="42" width="16" height="16" rx="4" fill="#e11d48" />
                      <path d="M 46,46 h 8 v 2 h -8 z M 46,50 h 6 v 2 h -6 z M 46,54 h 4 v 2 h -4 z" fill="#fff" />
                    </svg>
                  </div>

                  <div className="text-[11px] space-y-1 font-mono text-slate-600 dark:text-white/50 bg-slate-50 dark:bg-black/40 p-2.5 rounded-xl border border-slate-200 dark:border-white/5">
                    <p className="text-slate-900 dark:text-white text-xs font-bold font-sans">
                      Recipient Bank: <strong className="text-rose-600 dark:text-rose-400">Rubby Instant Pay</strong>
                    </p>
                    <p>Reference: <strong className="text-slate-900 dark:text-white">PAY-QR-{activeTab === Currency.NGN ? 'NG' : 'GH'}-{9823 + Math.floor(Math.random()*8000)}</strong></p>
                    <p>Payload: <span className="text-[10px] text-rose-600 dark:text-rose-300">rubby://deposit?amt={qrAmountInput || '0'}</span></p>
                  </div>

                  <p className="text-[10px] text-slate-500 dark:text-white/40 leading-relaxed italic px-2">
                    💡 Scan using any banking application, Google Wallet, or MoMo code scanner to simulate native instant credit resolution.
                  </p>

                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowQRModal(false)}
                      className="flex-1 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/60 py-2.5 rounded-xl text-xs hover:bg-slate-100 dark:hover:bg-white/5 transition cursor-pointer bg-transparent"
                    >
                      Cancel
                    </button>
                    
                    <button
                      type="button"
                      disabled={isSimulatedScanning || !qrAmountInput || parseFloat(qrAmountInput) <= 0}
                      onClick={() => {
                        const parsedAmount = parseFloat(qrAmountInput);
                        if (!isNaN(parsedAmount) && parsedAmount > 0) {
                          handleQRDepositSimulated(parsedAmount);
                        }
                      }}
                      className="flex-1 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white text-xs font-bold py-2.5 rounded-xl transition shadow-md shadow-rose-600/25 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      Simulate Scan!
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-6 space-y-4">
                  <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">Payment Resolution Auto-Approved!</h4>
                    <p className="text-xs text-slate-600 dark:text-white/60">
                      Successfully credited <span className="text-emerald-600 dark:text-emerald-400 font-bold">{currencySymbol}{parseFloat(qrAmountInput).toLocaleString()}</span> into your Rubby {activeTab === Currency.NGN ? 'Naira' : 'Cedis'} wallet!
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5 text-[10px] font-mono text-left space-y-1 text-slate-600 dark:text-white/50">
                    <div className="flex justify-between"><span className="text-slate-400 dark:text-white/30">STATUS</span> <span className="text-emerald-600 dark:text-emerald-400 font-bold">SETTLED</span></div>
                    <div className="flex justify-between"><span className="text-slate-400 dark:text-white/30">CHANNEL</span> <span>QR CORE INSTANT WIRE</span></div>
                    <div className="flex justify-between"><span className="text-slate-400 dark:text-white/30">DEPOSITED</span> <span className="text-slate-900 dark:text-white font-black">{currencySymbol}{parseFloat(qrAmountInput).toLocaleString()}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400 dark:text-white/30">DATED</span> <span className="text-slate-900 dark:text-white">{new Date().toLocaleTimeString()}</span></div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setShowQRModal(false);
                      setHasScannedSuccessfully(false);
                    }}
                    className="w-full bg-slate-900 dark:bg-white text-white dark:text-zinc-950 font-black text-xs py-2.5 rounded-xl hover:bg-slate-800 dark:hover:bg-white/90 transition cursor-pointer"
                  >
                    Return to Dashboard
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
