import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coins, 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  ArrowDownLeft, 
  ArrowUpRight, 
  RefreshCw,
  Clock,
  Sparkles,
  Info,
  QrCode
} from 'lucide-react';
import { Currency } from '../types';
import DepositQRCodeModal from './DepositQRCodeModal';

interface CryptoDepositViewProps {
  nairaBalance: number;
  cedisBalance: number;
  onCryptoCredited: (currency: Currency, amountFiat: number, cryptoAmount: string, asset: string) => void;
  isLightMode?: boolean;
}

interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;
  icon: string;
  networks: {
    name: string;
    networkId: string;
    address: string;
    memo?: string;
    fee: string;
    confirmations: number;
    explorer: string;
  }[];
  rateNGN: number;
  rateGHS: number;
}

const SUPPORTED_CRYPTO: CryptoAsset[] = [
  {
    id: 'usdt',
    symbol: 'USDT',
    name: 'Tether USD',
    icon: '₮',
    rateNGN: 1530,
    rateGHS: 15.4,
    networks: [
      {
        name: 'TRON (TRC-20)',
        networkId: 'trc20',
        address: 'TYp7xU8aN31K9L2wV4bC7QzE6mY8X1zTRX',
        fee: '~$1.00 Network Fee · Fastest',
        confirmations: 12,
        explorer: 'https://tronscan.org'
      },
      {
        name: 'BNB Smart Chain (BEP-20)',
        networkId: 'bep20',
        address: '0x81b7a2d48c035652da24d266e74b3f114c02919c',
        fee: '~$0.15 Network Fee · Ultra Cheap',
        confirmations: 15,
        explorer: 'https://bscscan.com'
      },
      {
        name: 'Polygon (POL/MATIC)',
        networkId: 'polygon',
        address: '0x81b7a2d48c035652da24d266e74b3f114c02919c',
        fee: '~$0.05 Network Fee',
        confirmations: 20,
        explorer: 'https://polygonscan.com'
      },
      {
        name: 'Ethereum (ERC-20)',
        networkId: 'erc20',
        address: '0x81b7a2d48c035652da24d266e74b3f114c02919c',
        fee: '~$4.50 Network Fee',
        confirmations: 12,
        explorer: 'https://etherscan.io'
      }
    ]
  },
  {
    id: 'btc',
    symbol: 'BTC',
    name: 'Bitcoin',
    icon: '₿',
    rateNGN: 142500000,
    rateGHS: 1450000,
    networks: [
      {
        name: 'Native SegWit (Bech32)',
        networkId: 'btc_segwit',
        address: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
        fee: 'Low Fee · 1 Confirmation Required',
        confirmations: 1,
        explorer: 'https://mempool.space'
      },
      {
        name: 'Lightning Network',
        networkId: 'btc_lightning',
        address: 'lnbc100u1pn9...rubby-instant-lightning-hash',
        fee: 'Sub-cent Instant Settlement',
        confirmations: 0,
        explorer: 'https://mempool.space/lightning'
      }
    ]
  },
  {
    id: 'sol',
    symbol: 'SOL',
    name: 'Solana',
    icon: '◎',
    rateNGN: 295000,
    rateGHS: 2980,
    networks: [
      {
        name: 'Solana Mainnet',
        networkId: 'solana',
        address: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
        fee: '< $0.01 · 400ms finality',
        confirmations: 32,
        explorer: 'https://solscan.io'
      }
    ]
  }
];

export default function CryptoDepositView({
  nairaBalance,
  cedisBalance,
  onCryptoCredited,
  isLightMode = false
}: CryptoDepositViewProps) {
  const [selectedAsset, setSelectedAsset] = useState<CryptoAsset>(SUPPORTED_CRYPTO[0]);
  const [selectedNetwork, setSelectedNetwork] = useState(SUPPORTED_CRYPTO[0].networks[0]);
  const [payoutCurrency, setPayoutCurrency] = useState<Currency>(Currency.NGN);
  
  // Copy feedback
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  
  // Simulation of inbound crypto transaction
  const [testDepositAmount, setTestDepositAmount] = useState('100'); // $100 USDT
  const [isSimulatingTx, setIsSimulatingTx] = useState(false);
  const [confirmedTx, setConfirmedTx] = useState<{
    hash: string;
    amount: string;
    fiatPayout: number;
    currency: Currency;
    network: string;
  } | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleSimulateDeposit = () => {
    const amountNum = parseFloat(testDepositAmount);
    if (isNaN(amountNum) || amountNum <= 0) return;

    setIsSimulatingTx(true);
    setConfirmedTx(null);

    // Compute fiat value
    const unitRate = payoutCurrency === Currency.NGN ? selectedAsset.rateNGN : selectedAsset.rateGHS;
    const fiatPayout = selectedAsset.symbol === 'USDT' 
      ? amountNum * unitRate 
      : selectedAsset.symbol === 'BTC'
        ? amountNum * unitRate
        : amountNum * unitRate;

    setTimeout(() => {
      setIsSimulatingTx(false);
      const tx = {
        hash: `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}...`,
        amount: `${amountNum} ${selectedAsset.symbol}`,
        fiatPayout,
        currency: payoutCurrency,
        network: selectedNetwork.name
      };

      onCryptoCredited(payoutCurrency, fiatPayout, `${amountNum} ${selectedAsset.symbol}`, `${selectedAsset.symbol} Auto-Sweep via ${selectedNetwork.networkId.toUpperCase()}`);
      setConfirmedTx(tx);
    }, 2200);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className={`p-6 rounded-3xl border ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0E1322] border-white/10'} shadow-xl relative overflow-hidden`}>
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 dark:text-rose-400 font-bold text-[11px] uppercase tracking-wider">
            <Coins className="w-3.5 h-3.5" />
            <span>Multi-Network Blockchain Inbound Engine</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Deposit USDT, Bitcoin & Solana With Instant Auto-Sweep
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Deposit via <strong>TRC-20, BEP-20, Polygon, or Native Bitcoin</strong>. As soon as on-chain confirmations clear, our institutional liquidity pool auto-converts your crypto to Naira (₦) or Cedis (GH₵) at wholesale arbitrage rates.
          </p>
        </div>

        {/* Live Rates Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
          {SUPPORTED_CRYPTO.map(asset => (
            <div key={asset.id} className={`p-3 rounded-2xl border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/5'} flex items-center justify-between`}>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold text-sm">
                  {asset.icon}
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">{asset.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{asset.networks.length} Networks</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold font-mono text-emerald-500 block">₦{asset.rateNGN.toLocaleString()}</span>
                <span className="text-[10px] font-mono text-slate-400">GH₵{asset.rateGHS.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Asset/Network Selector + QR & Address Vault */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Asset Selection & Network Picker */}
        <div className="lg:col-span-5 space-y-4">
          <div className={`p-6 rounded-3xl border ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0E1322] border-white/10'} shadow-xl space-y-4`}>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              1. Choose Crypto Asset
            </h3>
            
            <div className="grid grid-cols-3 gap-2">
              {SUPPORTED_CRYPTO.map(asset => {
                const isSelected = selectedAsset.id === asset.id;
                return (
                  <button
                    key={asset.id}
                    type="button"
                    onClick={() => {
                      setSelectedAsset(asset);
                      setSelectedNetwork(asset.networks[0]);
                      setConfirmedTx(null);
                    }}
                    className={`p-3 rounded-2xl border text-center transition cursor-pointer ${
                      isSelected
                        ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/20'
                        : isLightMode
                          ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                          : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
                    }`}
                  >
                    <span className="text-xl block mb-1">{asset.icon}</span>
                    <span className="text-xs font-bold block">{asset.symbol}</span>
                    <span className={`text-[9px] block ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                      {asset.name}
                    </span>
                  </button>
                );
              })}
            </div>

            <h3 className="text-sm font-bold text-slate-900 dark:text-white pt-2">
              2. Select Settlement Network
            </h3>

            <div className="space-y-2">
              {selectedAsset.networks.map(net => {
                const isNetSelected = selectedNetwork.networkId === net.networkId;
                return (
                  <button
                    key={net.networkId}
                    type="button"
                    onClick={() => {
                      setSelectedNetwork(net);
                      setConfirmedTx(null);
                    }}
                    className={`w-full p-3.5 rounded-2xl border text-left transition cursor-pointer flex items-center justify-between ${
                      isNetSelected
                        ? 'bg-rose-500/10 border-rose-500 ring-2 ring-rose-500/20'
                        : isLightMode
                          ? 'bg-white hover:bg-slate-50 border-slate-200'
                          : 'bg-white/5 hover:bg-white/10 border-white/5'
                    }`}
                  >
                    <div>
                      <span className={`text-xs font-bold block ${isNetSelected ? 'text-rose-600 dark:text-rose-400' : 'text-slate-900 dark:text-white'}`}>
                        {net.name}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {net.fee}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-white/60 font-semibold">
                      {net.confirmations > 0 ? `${net.confirmations} Confs` : 'Instant'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Target Payout Currency */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-slate-600 dark:text-white/60 mb-1.5">
                Target Auto-Sweep Payout Currency
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPayoutCurrency(Currency.NGN)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    payoutCurrency === Currency.NGN
                      ? 'bg-rose-600 text-white border-rose-600'
                      : isLightMode ? 'bg-slate-50 text-slate-600 border-slate-200' : 'bg-white/5 text-slate-400 border-white/5'
                  }`}
                >
                  Auto-Convert to Naira (₦)
                </button>
                <button
                  type="button"
                  onClick={() => setPayoutCurrency(Currency.GHS)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    payoutCurrency === Currency.GHS
                      ? 'bg-rose-600 text-white border-rose-600'
                      : isLightMode ? 'bg-slate-50 text-slate-600 border-slate-200' : 'bg-white/5 text-slate-400 border-white/5'
                  }`}
                >
                  Auto-Convert to Cedis (GH₵)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Address, QR Simulation & Test Inbound Trigger */}
        <div className="lg:col-span-7 space-y-4">
          <div className={`p-6 rounded-3xl border ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0E1322] border-white/10'} shadow-xl space-y-5`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-rose-500 font-bold block">
                  Dedicated Inbound Address
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Send {selectedAsset.symbol} on {selectedNetwork.name}
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-bold text-[10px] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Fireblocks Protected
              </span>
            </div>

            {/* Address Box */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 space-y-3">
              <span className="text-[10px] text-slate-400 block font-semibold">
                Permanent Deposit Address (Assigned to your Rubby account):
              </span>
              <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 font-mono text-xs text-slate-900 dark:text-white break-all">
                <span>{selectedNetwork.address}</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setShowQRModal(true)}
                    className="p-1.5 px-2.5 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 font-sans font-bold text-xs transition cursor-pointer flex items-center gap-1"
                    title="Generate QR code for instant scanning"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>QR Code</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopy(selectedNetwork.address)}
                    className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 transition cursor-pointer"
                    title="Copy address"
                  >
                    {copiedAddress ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Explorer Link */}
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Network Protocol: <strong>{selectedNetwork.networkId.toUpperCase()}</strong></span>
                <a
                  href={selectedNetwork.explorer}
                  target="_blank"
                  rel="noreferrer"
                  className="text-rose-500 hover:text-rose-600 flex items-center gap-1 font-semibold"
                >
                  <span>Block Explorer</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Confirmation of Inbound Transfer */}
            <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-rose-500" />
                  Direct Crypto Deposit Confirmation
                </span>
                <span className="text-[10px] font-mono text-emerald-500 font-semibold">Auto-Sweep Active</span>
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="text-[10px] text-slate-400 block mb-1">
                    Amount ({selectedAsset.symbol}):
                  </label>
                  <input
                    type="number"
                    value={testDepositAmount}
                    onChange={(e) => setTestDepositAmount(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 font-mono text-slate-900 dark:text-white"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-end">
                  <button
                    type="button"
                    onClick={handleSimulateDeposit}
                    disabled={isSimulatingTx}
                    className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-rose-600/20"
                  >
                    {isSimulatingTx ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Confirming Blockchain TX...</span>
                      </>
                    ) : (
                      <>
                        <ArrowDownLeft className="w-4 h-4" />
                        <span>Confirm Crypto Deposit</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Confirmed Transaction Feedback */}
            <AnimatePresence>
              {confirmedTx && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs space-y-2 font-mono"
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="flex items-center gap-1.5">
                      <Check className="w-4 h-4" />
                      Blockchain Deposit Cleared!
                    </span>
                    <span className="text-[10px] text-slate-400">Hash: {confirmedTx.hash}</span>
                  </div>
                  <div className="text-[11px] text-slate-700 dark:text-slate-300">
                    Credited: <strong className="text-emerald-500">+{confirmedTx.currency === Currency.NGN ? `₦${confirmedTx.fiatPayout.toLocaleString()}` : `GH₵${confirmedTx.fiatPayout.toLocaleString()}`}</strong> ({confirmedTx.amount} on {confirmedTx.network})
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Crypto Deposit QR Code Modal */}
      <DepositQRCodeModal
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        data={{
          title: `${selectedAsset.symbol} Deposit QR`,
          subtitle: `Scan with TrustWallet, Binance, MetaMask, or Phantom to send ${selectedAsset.name} via ${selectedNetwork.name}.`,
          depositType: 'crypto',
          currency: payoutCurrency,
          cryptoSymbol: selectedAsset.symbol,
          addressOrAccount: selectedNetwork.address,
          bankOrNetworkName: selectedNetwork.name,
          defaultAmount: parseFloat(testDepositAmount) || 100
        }}
        onSimulateDeposit={(amount, currency, sender, network) => {
          const rate = currency === Currency.NGN ? selectedAsset.rateNGN : selectedAsset.rateGHS;
          const fiatPayout = Math.round(amount * rate);
          onCryptoCredited(currency, fiatPayout, `${amount} ${selectedAsset.symbol}`, selectedAsset.symbol);
          setConfirmedTx({
            hash: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`,
            amount: `${amount} ${selectedAsset.symbol}`,
            fiatPayout,
            currency,
            network
          });
        }}
        isLightMode={isLightMode}
      />
    </div>
  );
}
