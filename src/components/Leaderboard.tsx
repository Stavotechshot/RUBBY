import { useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, 
  Award, 
  TrendingUp, 
  ArrowUp, 
  Sparkles,
  Zap,
  UserCheck
} from 'lucide-react';
import { LeaderboardUser, INITIAL_LEADERBOARD } from '../types';

interface LeaderboardProps {
  userTradeVolume: number; // User's volume in USD
}

export default function Leaderboard({ userTradeVolume }: LeaderboardProps) {

  // Dynamically calculate and sort leaderboard when user finishes trade actions
  const leaderboardData = useMemo(() => {
    // Clone list
    const list = [...INITIAL_LEADERBOARD];
    const userIndex = list.findIndex(u => u.isCurrentUser);
    
    if (userIndex !== -1) {
      list[userIndex] = {
        ...list[userIndex],
        tradeVolumeUSD: userTradeVolume,
        // Calculate a dynamic reward amount based on NGN volume tier
        rewardAmount: userTradeVolume > 15000 
          ? '₦110,000' 
          : userTradeVolume > 5000 
            ? '₦50,300' 
            : userTradeVolume > 1000 
              ? '₦12,500' 
              : '₦0'
      };
    }

    // Retrospectively re-sort list
    const sorted = list.sort((a, b) => b.tradeVolumeUSD - a.tradeVolumeUSD);

    // Re-assign ranks
    return sorted.map((user, idx) => ({
      ...user,
      rank: idx + 1
    }));
  }, [userTradeVolume]);

  const currentUserData = useMemo(() => {
    return leaderboardData.find(u => u.isCurrentUser);
  }, [leaderboardData]);

  return (
    <div className="bg-white dark:bg-[#0E1322] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between text-slate-900 dark:text-white transition-colors">
      
      <div>
        {/* Header section detailing prizes */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-slate-400 dark:text-white/40 font-bold text-[10px] tracking-widest uppercase flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              Rubby Traders Tournament
            </span>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">
              Monthly Leaderboard
            </h3>
          </div>

          <div className="bg-rose-50 dark:bg-rose-500/10 px-3 py-1 rounded-full border border-rose-200 dark:border-rose-500/25">
            <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400">
              🏆 ₦250,000 + GH₵2,500 Prize Pool
            </span>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 dark:text-white/50 leading-normal mb-4">
          Trade unused gift cards to increase your monthly volume. The top 5 traders receive direct cash bonuses to their wallets on the 1st of every month!
        </p>

        {/* List of ranks */}
        <div className="space-y-2">
          {leaderboardData.map((user) => {
            const isRank1 = user.rank === 1;
            const isRank2 = user.rank === 2;
            const isRank3 = user.rank === 3;
            
            return (
              <div 
                key={user.name} 
                className={`flex items-center justify-between px-3 py-2 rounded-xl border transition ${
                  user.isCurrentUser 
                    ? 'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/25 shadow-xs' 
                    : 'bg-slate-50 dark:bg-white/[0.03] border-slate-200 dark:border-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {/* Rank Display Medal */}
                  <div className="w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold">
                    {isRank1 ? (
                      <span className="text-lg">🥇</span>
                    ) : isRank2 ? (
                      <span className="text-lg">🥈</span>
                    ) : isRank3 ? (
                      <span className="text-lg">🥉</span>
                    ) : (
                      <span className="text-slate-400 dark:text-white/40">{user.rank}</span>
                    )}
                  </div>

                  {/* Avatar or Placeholder */}
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-8 h-8 rounded-full border border-slate-200 dark:border-white/20 bg-slate-100 dark:bg-white/5 object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-600 to-amber-700 text-white flex items-center justify-center font-bold text-xs uppercase shadow-inner">
                      {user.name.charAt(0)}
                    </div>
                  )}

                  {/* Name and Tag */}
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5 animate-fadeIn">
                      {user.name}
                      {user.isCurrentUser && (
                        <span className="bg-rose-100 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400 text-[8px] font-bold px-1.5 py-0.2 rounded-full flex items-center gap-0.5 border border-rose-200 dark:border-rose-500/10">
                          <UserCheck className="w-2.5 h-2.5" />
                          You
                        </span>
                      )}
                    </span>
                    <span className="text-[9px] text-slate-400 dark:text-white/40 uppercase tracking-widest font-mono">
                      Volume: ${user.tradeVolumeUSD.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Estimate payouts prizes */}
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-slate-900 dark:text-white block">
                    {user.rewardAmount}
                  </span>
                  <span className="text-[9px] text-slate-400 dark:text-white/40 uppercase tracking-tight block">
                    {user.rank <= 5 ? 'Eligible' : 'Out of range'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer detailing user's standing */}
      {currentUserData && (
        <div className="mt-4 bg-slate-50 dark:bg-[#131A2E] text-slate-900 dark:text-white rounded-2xl p-4 flex items-center justify-between border border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <Zap className="w-5 h-5 text-rose-500 fill-rose-500" />
            <div>
              <span className="text-[9px] text-slate-400 dark:text-white/40 uppercase tracking-widest block font-mono">Your Current Rank</span>
              <span className="text-xs font-extrabold font-sans">
                {currentUserData.rank === 1 ? '1st Place Leader!' : `${currentUserData.rank}th out of 6 Traders`}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[9px] text-slate-400 dark:text-white/40 uppercase tracking-widest block font-mono text-right">My Pending Reward</span>
            <span className="text-xs font-extrabold text-rose-600 dark:text-rose-400">
              {currentUserData.rewardAmount === '₦0' ? 'Trade more to qualify' : currentUserData.rewardAmount}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
