import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Tags, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  XCircle,
  TrendingDown,
  Search,
  Download,
  Copy,
  Check
} from 'lucide-react';
import { Trade, WalletTransaction, Currency } from '../types';
import BrandLogo from './BrandLogo';

const EmptyHistoryGraphic = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 border border-dashed border-slate-200 dark:border-white/10 rounded-2xl bg-slate-50 dark:bg-white/[0.02]">
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Pulsing glow background */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-16 h-16 rounded-full bg-rose-500/20 blur-md"
        />
        {/* Sonar circles */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border border-dashed border-slate-300 dark:border-white/10"
        />
        
        {/* Animated receipt/ledger document */}
        <motion.div
          animate={{ 
            y: [0, -5, 0],
            rotate: [0, 2, -2, 0]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: 'easeInOut' 
          }}
          className="relative bg-white dark:bg-[#131A2E] border border-slate-200 dark:border-white/10 p-3.5 rounded-2xl shadow-xl w-12 h-14"
        >
          {/* Mock text lines inside doc */}
          <div className="w-full h-1 bg-slate-200 dark:bg-white/20 rounded-full mb-1.5" />
          <div className="w-4/5 h-1 bg-slate-200 dark:bg-white/15 rounded-full mb-1.5" />
          <div className="w-3/5 h-1 bg-slate-200 dark:bg-white/15 rounded-full mb-2" />
          {/* Circular check dot container */}
          <div className="flex justify-end">
            <motion.div 
              animate={{ scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-4 h-4 rounded-full bg-rose-500/30 flex items-center justify-center border border-rose-500/40"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            </motion.div>
          </div>
        </motion.div>

        {/* Floating particles around ledger illustration */}
        <motion.div
          animate={{ y: [-3, -12, -3], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-0 top-3 text-rose-500 text-xs font-mono font-bold select-none"
        >
          $
        </motion.div>
        <motion.div
          animate={{ y: [4, -6, 4], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, delay: 0.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-1 bottom-3 text-emerald-500 text-[10px] font-mono font-bold select-none"
        >
          ₦
        </motion.div>
      </div>

      <div className="max-w-[280px] space-y-1.5">
        <p className="text-xs font-extrabold text-slate-900 dark:text-white">Your transaction history is clear</p>
        <p className="text-[10px] text-slate-500 dark:text-white/40 leading-relaxed font-medium">
          Your trades, claims, and payout channels will list here as soon as you complete your first trade action!
        </p>
      </div>
    </div>
  );
};

interface TransactionHistoryProps {
  trades: Trade[];
  walletTransactions: WalletTransaction[];
  onViewReceipt?: (data: any) => void;
}

export default function TransactionHistory({ trades, walletTransactions, onViewReceipt }: TransactionHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Combine both arrays and sort by date descending
  const combinedHistory = [
    ...trades.map(t => ({
      id: t.id,
      timestamp: t.createdAt,
      type: 'trade' as const,
      title: `Sold ${t.brandName}`,
      amount: t.payoutAmount,
      currency: t.currencyOutput,
      status: t.status,
      extra: `Face Value: $${t.cardValue} @ ${t.currencyOutput === Currency.NGN ? '₦' : 'GH₵'}${t.rate}/$`,
      receiptNumber: t.receiptNumber || t.id,
      brandId: t.brandId,
      cardValue: t.cardValue,
      tradeType: t.codeOrPin ? ('e-code' as const) : ('physical' as const),
      customTag: t.customTag,
    })),
    ...walletTransactions.map(w => ({
      id: w.id,
      timestamp: w.createdAt,
      type: w.type === 'deposit' ? ('deposit' as const) : ('withdrawal' as const),
      title: w.description,
      amount: w.amount,
      currency: w.currency,
      status: w.status,
      extra: w.type === 'deposit' ? 'Ref: Direct Credit' : 'Ref: Cashout Payout',
      receiptNumber: w.id.startsWith('tx-') ? `RC-${w.id.slice(3, 11).toUpperCase()}` : w.id,
      brandId: undefined,
      cardValue: undefined,
      tradeType: undefined,
      customTag: undefined,
    }))
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  // Apply filters symmetrically
  const filteredHistory = combinedHistory.filter(item => {
    // 1. Full-text search
    if (searchTerm.trim() !== '') {
      const query = searchTerm.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(query);
      const matchExtra = item.extra.toLowerCase().includes(query);
      const matchId = item.id.toLowerCase().includes(query);
      const matchReceipt = item.receiptNumber.toLowerCase().includes(query);
      if (!matchTitle && !matchExtra && !matchId && !matchReceipt) {
        return false;
      }
    }

    // 2. Transaction Type
    if (filterType !== 'all') {
      if (item.type !== filterType) {
        return false;
      }
    }

    // 3. Status filter matching
    if (filterStatus !== 'all') {
      if (filterStatus === 'completed' && item.status !== 'completed') return false;
      if (filterStatus === 'pending' && item.status !== 'pending') return false;
      if (filterStatus === 'failed' && item.status !== 'failed' && item.status !== 'declined') return false;
    }

    // 4. Date filter matching
    if (filterDate !== 'all') {
      const txDate = new Date(item.timestamp);
      const now = new Date();
      const diffMs = now.getTime() - txDate.getTime();
      const diffDays = diffMs / (1000 * 60 * 60 * 24);

      if (filterDate === 'today') {
        const isSameDay = txDate.toDateString() === now.toDateString();
        if (!isSameDay) return false;
      } else if (filterDate === '3days') {
        if (diffDays > 3) return false;
      } else if (filterDate === '7days') {
        if (diffDays > 7) return false;
      }
    }

    return true;
  });

  const handleCopyReceipt = (e: React.MouseEvent, receipt: string, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(receipt).then(() => {
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId(null);
      }, 1500);
    });
  };

  // Export to CSV helper
  const handleExportCSV = () => {
    const headers = ['Transaction ID', 'Receipt Number', 'Date & Time', 'Type', 'Description', 'Details', 'Amount', 'Currency', 'Status'];
    const rows = filteredHistory.map(item => [
      item.id,
      item.receiptNumber,
      new Date(item.timestamp).toISOString(),
      item.type,
      `"${item.title.replace(/"/g, '""')}"`,
      `"${item.extra.replace(/"/g, '""')}"`,
      item.amount,
      item.currency,
      item.status
    ]);

    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `rubby_payout_ledger_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status: 'pending' | 'completed' | 'declined' | 'failed') => {
    switch (status) {
      case 'completed':
        return (
          <motion.span 
            initial={{ scale: 0.94, opacity: 0.85 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="relative flex items-center gap-1 bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full text-[10px] font-bold border border-emerald-500/25 overflow-hidden shadow-inner shrink-0"
          >
            {/* Shimmer overlay effect */}
            <motion.div
              animate={{ x: ['-200%', '300%'] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
            />
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Paid
          </motion.span>
        );
      case 'pending':
        return (
          <motion.span 
            animate={{ 
              boxShadow: [
                '0 0 0 0px rgba(245, 158, 11, 0)',
                '0 0 0 4px rgba(245, 158, 11, 0.12)',
                '0 0 0 0px rgba(245, 158, 11, 0)'
              ]
            }}
            transition={{ repeat: Infinity, duration: 2.0, ease: 'easeInOut' }}
            className="relative flex items-center gap-1 bg-amber-500/15 text-amber-500 px-2.5 py-1 rounded-full text-[10px] font-bold border border-amber-500/35 overflow-hidden shrink-0"
          >
            {/* Soft inner glow shimmer */}
            <motion.div
              animate={{ x: ['-200%', '300%'] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeOut' }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/15 to-transparent pointer-events-none"
            />
            <Clock className="w-3 h-3 text-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
            Checking
          </motion.span>
        );
      default:
        return (
          <motion.span 
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="relative flex items-center gap-1 bg-rose-500/15 text-rose-400 px-2.5 py-1 rounded-full text-[10px] font-bold border border-rose-500/25 overflow-hidden shrink-0"
          >
            <XCircle className="w-3 h-3 text-rose-400" />
            Failed
          </motion.span>
        );
    }
  };

  const getActionIcon = (type: string, brandId?: string) => {
    switch (type) {
      case 'trade':
        if (brandId) {
          return (
            <div className="w-8 h-8 rounded-xl bg-white dark:bg-black/60 border border-slate-200 dark:border-white/10 flex items-center justify-center p-1.5 shrink-0 shadow-xs dark:shadow-inner">
              <BrandLogo brandId={brandId} className="w-4 h-4 text-slate-800 dark:text-white" />
            </div>
          );
        }
        return (
          <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center">
            <Tags className="w-4 h-4" />
          </div>
        );
      case 'deposit':
        return (
          <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <ArrowDownLeft className="w-4 h-4" />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        );
    }
  };

  const currencySymbol = (c: Currency) => c === Currency.NGN ? '₦' : 'GH₵';

  return (
    <div className="bg-white dark:bg-[#0E1322] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 shadow-xl text-slate-900 dark:text-white transition-colors space-y-4">
      
      {/* Title Header with Export Action */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
          Transaction Ledger
        </h3>
        
        {combinedHistory.length > 0 && (
          <span className="bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white px-2 py-0.5 rounded-full text-[10px] font-mono font-bold">
            Showing {filteredHistory.length} of {combinedHistory.length}
          </span>
        )}
      </div>

      {combinedHistory.length > 0 && (
        <div className="space-y-2.5">
          {/* Search bar & export key combo */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400 dark:text-white/40" />
              <input
                type="text"
                id="transaction-search-input"
                placeholder="Search history... (or press ⌘K)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs pl-8.5 pr-14 py-2 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-rose-500 font-medium transition-all"
              />
              <div className="absolute right-3 top-2 flex items-center gap-1 opacity-50 pointer-events-none select-none">
                <kbd className="bg-slate-200 dark:bg-white/10 px-1 py-0.5 rounded text-[8px] font-mono leading-none border border-slate-300 dark:border-white/10 font-bold">⌘K</kbd>
              </div>
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')} 
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700 dark:hover:text-white text-xs bg-transparent border-0 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={handleExportCSV}
              disabled={filteredHistory.length === 0}
              title="Export filtered records to CSV"
              className="px-3 py-2 border border-rose-200 dark:border-rose-500/25 bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 disabled:opacity-40 text-rose-600 dark:text-rose-400 rounded-xl transition cursor-pointer flex items-center gap-1.5 font-bold text-xs shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>

          {/* Quick Filters Row */}
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-0.5">
              <label className="block text-[8px] uppercase tracking-wider font-bold text-slate-500 dark:text-white/45">Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full text-[10px] font-semibold px-2 py-1.5 border border-slate-200 dark:border-white/10 rounded-lg bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white focus:outline-none cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="trade">Trades</option>
                <option value="deposit">Deposits</option>
                <option value="withdrawal">Withdrawals</option>
              </select>
            </div>

            <div className="space-y-0.5">
              <label className="block text-[8px] uppercase tracking-wider font-bold text-slate-500 dark:text-white/45">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full text-[10px] font-semibold px-2 py-1.5 border border-slate-200 dark:border-white/10 rounded-lg bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white focus:outline-none cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="completed">Paid</option>
                <option value="pending">Checking</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            <div className="space-y-0.5">
              <label className="block text-[8px] uppercase tracking-wider font-bold text-slate-500 dark:text-white/45">Date</label>
              <select
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full text-[10px] font-semibold px-2 py-1.5 border border-slate-200 dark:border-white/10 rounded-lg bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white focus:outline-none cursor-pointer"
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="3days">Last 3 Days</option>
                <option value="7days">Last 7 Days</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {combinedHistory.length === 0 ? (
        <EmptyHistoryGraphic />
      ) : filteredHistory.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-slate-200 dark:border-white/10 rounded-2xl bg-slate-50 dark:bg-white/5 space-y-1">
          <p className="text-xs font-bold text-slate-600 dark:text-white/60">No matched entries found</p>
          <p className="text-[10px] text-slate-400 dark:text-white/30">Adjust your keywords or dashboard search/filters above</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setFilterType('all');
              setFilterStatus('all');
              setFilterDate('all');
            }}
            className="text-[10px] font-bold text-rose-600 dark:text-rose-400 hover:underline mt-2 block mx-auto bg-transparent border-0 cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="space-y-3.5 max-h-96 overflow-y-auto pr-1">
          {filteredHistory.map((item: any) => (
            <div 
              key={item.id} 
              onClick={() => {
                if (onViewReceipt) {
                  onViewReceipt({
                    id: item.id,
                    receiptNumber: item.receiptNumber,
                    type: item.type === 'trade' ? 'card_trade' : item.type,
                    title: item.title,
                    amount: item.amount,
                    currency: item.currency,
                    status: item.status,
                    timestamp: item.timestamp,
                    cardBrand: item.brandId ? item.title.replace('Sold ', '') : undefined,
                    cardValue: item.cardValue,
                    beneficiaryBank: item.currency === Currency.NGN ? 'Providus Bank (NIP)' : 'Bank of Ghana / MoMo'
                  });
                }
              }}
              className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-all cursor-pointer shadow-xs dark:shadow-none group"
            >
              <div className="flex items-center gap-3">
                {getActionIcon(item.type, item.brandId)}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5 flex-wrap">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-slate-600 dark:text-white/55 font-mono block">
                    {item.extra}
                  </span>
                  <span className="text-[9px] text-slate-400 dark:text-white/40 font-mono block">
                    {new Date(item.timestamp).toLocaleString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                  {/* Copy Receipt Badge Section */}
                  <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                    <span className="text-[10px] text-rose-600 dark:text-rose-400 font-mono bg-rose-50 dark:bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-200 dark:border-rose-500/10 font-bold">
                      Ref: {item.receiptNumber}
                    </span>
                    {item.customTag && (
                      <span className="text-[10px] text-amber-700 dark:text-amber-400 font-mono bg-amber-50 dark:bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-200 dark:border-amber-500/10 font-medium">
                        🔖 {item.customTag}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onViewReceipt) {
                          onViewReceipt({
                            id: item.id,
                            receiptNumber: item.receiptNumber,
                            type: item.type === 'trade' ? 'card_trade' : item.type,
                            title: item.title,
                            amount: item.amount,
                            currency: item.currency,
                            status: item.status,
                            timestamp: item.timestamp,
                            cardBrand: item.brandId ? item.title.replace('Sold ', '') : undefined,
                            cardValue: item.cardValue,
                            beneficiaryBank: item.currency === Currency.NGN ? 'Providus Bank (NIP)' : 'Bank of Ghana / MoMo'
                          });
                        }
                      }}
                      className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition cursor-pointer border border-rose-500/20"
                      title="View Official Printable Transaction Receipt"
                    >
                      📄 Receipt
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleCopyReceipt(e, item.receiptNumber, item.id)}
                      className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-white/60 hover:text-slate-900 dark:hover:text-white transition cursor-pointer border border-slate-200 dark:border-white/5 active:scale-95 shadow-xs dark:shadow-none"
                      title="Copy receipt tag ID to share with support"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-2.5 h-2.5 text-emerald-500 animate-bounce" />
                          <span className="text-emerald-600 dark:text-emerald-400 font-black">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-2.5 h-2.5 text-slate-400 dark:text-white/50" />
                          <span>Copy Rec</span>
                        </>
                      )}
                    </button>
                    {item.type === 'trade' && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.dispatchEvent(new CustomEvent('repeat-rubby-trade', {
                            detail: {
                              brandId: item.brandId,
                              cardValue: item.cardValue,
                              tradeType: item.tradeType,
                              customTag: item.customTag
                            }
                          }));
                        }}
                        className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded bg-rose-50 hover:bg-rose-600 dark:bg-rose-600/15 dark:hover:bg-rose-600 text-rose-600 hover:text-white dark:text-rose-400 dark:hover:text-white transition cursor-pointer border border-rose-200 dark:border-rose-500/10 active:scale-95"
                        title="Repeat this successful trade setup instantly"
                      >
                        ⚡ Repeat
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between self-stretch py-1 gap-1.5 text-right shrink-0">
                <span className={`text-xs font-mono font-bold ${
                  item.type === 'deposit' || item.type === 'trade' 
                    ? 'text-emerald-600 dark:text-emerald-400' 
                    : 'text-slate-900 dark:text-white'
                }`}>
                  {item.type === 'deposit' || item.type === 'trade' ? '+' : '-'}{currencySymbol(item.currency)}{item.amount.toLocaleString(undefined, { minimumFractionDigits: 1 })}
                </span>
                {getStatusBadge(item.status)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
