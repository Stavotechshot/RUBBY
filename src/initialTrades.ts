import { Trade, WalletTransaction, Currency } from './types';

// Helper to get formatted dates
const getPastDateISO = (hoursAgo: number): string => {
  return new Date(Date.now() - 3600000 * hoursAgo).toISOString();
};

const RANDOM_TAGS = ['rent', 'savings', 'groceries', 'gas', 'tuition', 'gift', 'freelance', 'business', 'vacation', 'crypto-seed', 'subscription', 'bills', 'mom-birthday'];

const BRAND_DATA = [
  { id: 'steam', name: 'Steam Wallet', rates: { NGN: 870, GHS: 13.5 } },
  { id: 'apple', name: 'Apple & iTunes', rates: { NGN: 850, GHS: 12.8 } },
  { id: 'razer', name: 'Razer Gold', rates: { NGN: 890, GHS: 14.1 } },
  { id: 'vanilla', name: 'Vanilla Visa', rates: { NGN: 820, GHS: 12.4 } },
  { id: 'amazon', name: 'Amazon Gift Card', rates: { NGN: 780, GHS: 11.9 } }
];

export function getInitialTrades(): Trade[] {
  const list: Trade[] = [];
  
  // Seed a core set of 80 unique trade histories
  for (let i = 1; i <= 80; i++) {
    const brand = BRAND_DATA[(i * 3 + 7) % BRAND_DATA.length];
    const currency = i % 2 === 0 ? Currency.NGN : Currency.GHS;
    const rate = currency === Currency.NGN ? brand.rates.NGN : brand.rates.GHS;
    
    // Choose custom values: $20, $25, $50, $100, $150, $200, $250, $300, $500
    const cardValues = [25, 50, 100, 120, 150, 200, 250, 300, 500];
    const cardValue = cardValues[(i * 11) % cardValues.length];
    const payoutAmount = Math.round(cardValue * rate);
    
    // Distribute time: older as i increases (up to 30 days)
    // 1h to 720h (30 days ago)
    const hoursAgo = Math.floor(1 + (i * 8.5));
    const createdAt = getPastDateISO(hoursAgo);
    
    // Status distribution: 90% completed, 5% pending, 5% declined
    let status: 'completed' | 'pending' | 'declined' = 'completed';
    if (i % 17 === 0) status = 'pending';
    else if (i % 23 === 0) status = 'declined';
    
    const regionSuffix = currency === Currency.NGN ? 'NG' : 'GH';
    const receiptNumber = `RX-${70000 + i * 37}-${regionSuffix}`;
    
    // 70% of entries get a custom tag
    const customTag = i % 3 !== 0 ? RANDOM_TAGS[(i * 7) % RANDOM_TAGS.length] : undefined;
    
    list.push({
      id: `trade-seeded-${i}`,
      brandId: brand.id,
      brandName: brand.name,
      cardValue,
      currencyOutput: currency,
      rate,
      payoutAmount,
      status,
      createdAt,
      receiptNumber,
      customTag,
      codeOrPin: i % 2 === 0 ? `CLAIM-${Math.floor(1003 * i + 8710)}-PIN` : undefined,
      cardImage: i % 2 !== 0 ? 'physical_receipt_scan.png' : undefined
    });
  }
  
  return list;
}

export function getInitialWalletTransactions(): WalletTransaction[] {
  const list: WalletTransaction[] = [];
  
  // Seed 20 unique wallet transactions (desposits and withdrawals)
  for (let i = 1; i <= 20; i++) {
    const isDeposit = i % 2 === 0;
    const currency = i % 3 === 0 ? Currency.GHS : Currency.NGN;
    
    // Distribute over past 15 days
    const hoursAgo = Math.floor(2 + (i * 18));
    const createdAt = getPastDateISO(hoursAgo);
    
    let amount = 0;
    let description = '';
    
    if (isDeposit) {
      amount = currency === Currency.NGN ? 25000 + (i * 7500) : 150 + (i * 45);
      description = currency === Currency.NGN ? 'Auto Bank Transfer Topup (Providus Ref)' : 'Direct Cedi deposit via Hub';
    } else {
      amount = currency === Currency.NGN ? 15000 + (i * 6000) : 100 + (i * 35);
      description = currency === Currency.NGN ? 'Auto Cashout Paid to Kuda Bank' : 'Instant MoMo Payout (*170#)';
    }
    
    list.push({
      id: `tx-seeded-${i}`,
      type: isDeposit ? 'deposit' : 'withdrawal',
      amount,
      currency,
      status: 'completed',
      createdAt,
      description
    });
  }
  
  return list;
}
