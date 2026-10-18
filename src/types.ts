export enum Currency {
  NGN = 'NGN',
  GHS = 'GHS',
}

export interface GiftCardBrand {
  id: string;
  name: string;
  category: string; // 'Gaming', 'Retail', 'Digital'
  iconCode: string; // code to resolve icon
  color: string; // Tailind class for brand background/border
  popular: boolean;
  rates: {
    [Currency.NGN]: number; // Rate per $ in Naira
    [Currency.GHS]: number; // Rate per $ in Cedis
  };
}

export interface Trade {
  id: string;
  brandId: string;
  brandName: string;
  cardValue: number; // Face value of the card in USD/EUR etc
  currencyOutput: Currency;
  rate: number;
  payoutAmount: number;
  codeOrPin?: string;
  cardImage?: string; // Mock Base64 or placeholder url
  status: 'pending' | 'completed' | 'declined';
  createdAt: string;
  receiptNumber: string;
  customTag?: string;
}

export interface WalletTransaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'trade_payout' | 'reward';
  amount: number;
  currency: Currency;
  status: 'pending' | 'completed' | 'failed';
  description: string;
  createdAt: string;
}

export interface RateAlert {
  id: string;
  brandId: string;
  brandName: string;
  targetRate: number;
  currency: Currency;
  condition: 'above' | 'below';
  isActive: boolean;
  createdAt: string;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  tradeVolumeUSD: number;
  rewardAmount: string;
  isCurrentUser?: boolean;
}

export interface SupportMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  createdAt: string;
}

export const SUPPORTED_BRANDS: GiftCardBrand[] = [
  {
    id: 'steam',
    name: 'Steam Wallet',
    category: 'Gaming',
    iconCode: 'Gamepad2',
    color: 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-950/20 dark:border-indigo-800/30 dark:text-indigo-400',
    popular: true,
    rates: {
      [Currency.NGN]: 870,
      [Currency.GHS]: 13.5,
    },
  },
  {
    id: 'apple',
    name: 'Apple & iTunes',
    category: 'Digital',
    iconCode: 'Apple',
    color: 'bg-zinc-50 border-zinc-200 text-zinc-800 dark:bg-zinc-900/40 dark:border-zinc-800/50 dark:text-zinc-300',
    popular: true,
    rates: {
      [Currency.NGN]: 850,
      [Currency.GHS]: 12.8,
    },
  },
  {
    id: 'razer',
    name: 'Razer Gold',
    category: 'Gaming',
    iconCode: 'Coins',
    color: 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/20 dark:border-emerald-800/30 dark:text-emerald-400',
    popular: true,
    rates: {
      [Currency.NGN]: 890,
      [Currency.GHS]: 14.1,
    },
  },
  {
    id: 'vanilla',
    name: 'Vanilla Visa',
    category: 'Retail',
    iconCode: 'CreditCard',
    color: 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/20 dark:border-amber-800/30 dark:text-amber-400',
    popular: true,
    rates: {
      [Currency.NGN]: 820,
      [Currency.GHS]: 12.2,
    },
  },
  {
    id: 'amazon',
    name: 'Amazon',
    category: 'Retail',
    iconCode: 'ShoppingBag',
    color: 'bg-orange-50 border-orange-200 text-orange-700 dark:bg-orange-950/20 dark:border-orange-800/30 dark:text-orange-400',
    popular: true,
    rates: {
      [Currency.NGN]: 780,
      [Currency.GHS]: 11.5,
    },
  },
  {
    id: 'walmart',
    name: 'Walmart',
    category: 'Retail',
    iconCode: 'Store',
    color: 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/20 dark:border-blue-800/30 dark:text-blue-400',
    popular: false,
    rates: {
      [Currency.NGN]: 795,
      [Currency.GHS]: 11.8,
    },
  },
  {
    id: 'playstation',
    name: 'PlayStation Network',
    category: 'Gaming',
    iconCode: 'Tv',
    color: 'bg-sky-50 border-sky-200 text-sky-700 dark:bg-sky-950/20 dark:border-sky-800/30 dark:text-sky-400',
    popular: false,
    rates: {
      [Currency.NGN]: 810,
      [Currency.GHS]: 12.0,
    },
  },
  {
    id: 'xbox',
    name: 'Xbox',
    category: 'Gaming',
    iconCode: 'MonitorPlay',
    color: 'bg-green-50 border-green-200 text-green-700 dark:bg-green-950/20 dark:border-green-800/30 dark:text-green-400',
    popular: false,
    rates: {
      [Currency.NGN]: 800,
      [Currency.GHS]: 11.9,
    },
  },
  {
    id: 'starbucks',
    name: 'Starbucks',
    category: 'Retail',
    iconCode: 'Coffee',
    color: 'bg-teal-50 border-teal-200 text-teal-700 dark:bg-teal-950/20 dark:border-teal-800/30 dark:text-teal-400',
    popular: false,
    rates: {
      [Currency.NGN]: 710,
      [Currency.GHS]: 10.2,
    },
  },
  {
    id: 'googleplay',
    name: 'Google Play',
    category: 'Digital',
    iconCode: 'Play',
    color: 'bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-950/20 dark:border-rose-800/30 dark:text-rose-400',
    popular: true,
    rates: {
      [Currency.NGN]: 830,
      [Currency.GHS]: 12.6,
    },
  },
  {
    id: 'sephora',
    name: 'Sephora',
    category: 'Retail',
    iconCode: 'Sparkles',
    color: 'bg-pink-50 border-pink-200 text-pink-700 dark:bg-pink-950/20 dark:border-pink-800/30 dark:text-pink-400',
    popular: false,
    rates: {
      [Currency.NGN]: 840,
      [Currency.GHS]: 12.9,
    },
  },
  {
    id: 'ebay',
    name: 'eBay',
    category: 'Retail',
    iconCode: 'ShoppingBag',
    color: 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/20 dark:border-amber-800/30 dark:text-amber-400',
    popular: false,
    rates: {
      [Currency.NGN]: 790,
      [Currency.GHS]: 11.4,
    },
  },
  {
    id: 'nike',
    name: 'Nike',
    category: 'Retail',
    iconCode: 'Zap',
    color: 'bg-red-50 border-red-200 text-red-700 dark:bg-red-950/20 dark:border-red-800/30 dark:text-red-400',
    popular: false,
    rates: {
      [Currency.NGN]: 810,
      [Currency.GHS]: 11.9,
    },
  },
  {
    id: 'nordstrom',
    name: 'Nordstrom',
    category: 'Retail',
    iconCode: 'Shirt',
    color: 'bg-violet-50 border-violet-200 text-violet-700 dark:bg-violet-950/20 dark:border-violet-800/30 dark:text-violet-400',
    popular: false,
    rates: {
      [Currency.NGN]: 815,
      [Currency.GHS]: 12.1,
    },
  },
  {
    id: 'target',
    name: 'Target Group',
    category: 'Retail',
    iconCode: 'Target',
    color: 'bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-950/25 dark:border-rose-800/40 dark:text-rose-400',
    popular: false,
    rates: {
      [Currency.NGN]: 805,
      [Currency.GHS]: 12.0,
    },
  },
  {
    id: 'nintendo',
    name: 'Nintendo eShop',
    category: 'Gaming',
    iconCode: 'Tv',
    color: 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-950/20 dark:border-indigo-800/30 dark:text-indigo-400',
    popular: false,
    rates: {
      [Currency.NGN]: 835,
      [Currency.GHS]: 12.7,
    }
  }
];

export const INITIAL_LEADERBOARD: LeaderboardUser[] = [
  { rank: 1, name: 'Tunde Alfred', avatar: '', tradeVolumeUSD: 24500, rewardAmount: '₦150,050' },
  { rank: 2, name: 'Amara Koffi', avatar: '', tradeVolumeUSD: 19800, rewardAmount: 'GH₵1,800' },
  { rank: 3, name: 'Ezenwa Chidi', avatar: '', tradeVolumeUSD: 15400, rewardAmount: '₦80,000' },
  { rank: 4, name: 'You (Rubby Trader)', avatar: '/src/assets/images/avatar_trader_vip_1791674394339.jpg', tradeVolumeUSD: 0, rewardAmount: '₦0', isCurrentUser: true },
  { rank: 5, name: 'Grace Danso', avatar: '', tradeVolumeUSD: 12200, rewardAmount: 'GH₵900' },
  { rank: 6, name: 'Olukayode J.', avatar: '', tradeVolumeUSD: 9800, rewardAmount: '₦40,000' },
];
