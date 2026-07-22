import {
  TChallengeClosedPnl,
  TChallengeProgress,
  TChallengeWalletBalance,
} from "../types/challenge";
import { IBybitAccountType, IBybitCoinType } from "../types/bybit/enums";
import { isSameUtcDay } from "./helper";

export const createDefaultWallet = (
  challengeId: string = "",
  capital: number = 0,
): TChallengeWalletBalance =>
  ({
    challengeId,
    accountType: IBybitAccountType.UNIFIED,
    totalEquity: 0,
    totalPerpUpl: 0,
    totalWalletBalance: 0,
    totalAvailableBalance: 0,
    capital,

    equity: 0,
    usdValue: 0,
    unrealisedPnl: 0,
    walletBalance: 0,
    availableToWithdraw: 0,
    coin: IBybitCoinType.USDT,
    updatedAt: new Date().toISOString(),
  }) as TChallengeWalletBalance;

export const createDefaultProgress = (
  challengeId: string = "",
  currentEquity: number = 0,
): TChallengeProgress =>
  ({
    id: new Date().getTime().toString(),
    challengeId,
    currentEquity,
    totalLoss: 0,
    tradingDays: 0,
    dailyDrawdown: 0,
    profitTarget: 0,
    dailyStartingEquity: 0,
    dailyStartingUpdatedAt: new Date().toISOString(),
    dailyMaxEquity: 0,
    dailyMinEquity: 0,
    dailyMaxUpdatedAt: new Date().toISOString(),
    dailyMinUpdatedAt: new Date().toISOString(),
  }) as TChallengeProgress;

  // A trading day counts if you open and close at least one trade 
// that day with a position size ≥ 5% of the initial balance and a PnL of ±1% or more.
export const tradingDaysCountCalculation = async (
  closedPnlData: TChallengeClosedPnl[] | null,
  minPositionSize: number,
): Promise<number> => {
  if (!closedPnlData || closedPnlData.length === 0) {
    return 0;
  }

  const closedPnlGrouped = closedPnlData.reduce(
    (acc, trade) => {
      const day = trade.updatedTime.split("T")[0];
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(trade);
      return acc;
    },
    {} as Record<string, TChallengeClosedPnl[]>,
  );

  return await Object.values(closedPnlGrouped).reduce((count, dayTrades) => {
    // Check if any trade closed today met the minimum size requirement
    const hasQualifyingTrade = dayTrades.some((trade) => {
      const entryValue = trade.cumEntryValue;
      const closedPnL = trade.closedPnl;

      // 1. Position size must be >= 5% of initial balance
      const passesSize = entryValue >= minPositionSize;

      // 2. PnL must be >= 1% of the position size itself
      const minRequiredPnL = entryValue * 0.01;
      const passesPnL = Math.abs(closedPnL) >= minRequiredPnL;

      return passesSize && passesPnL;
    });

    return hasQualifyingTrade ? count + 1 : count;
  }, 0);
};

export const currentDailyEquity = (
  wallet: TChallengeWalletBalance,
  progress: TChallengeProgress
) => {
  const today = new Date().toISOString();
  const startDate = new Date().setUTCHours(0, 0, 0, 0);
  const startDateStr = new Date(startDate).toISOString();

  const { equity, unrealisedPnl } = wallet;
  const { dailyStartingEquity, dailyMaxEquity, dailyMinEquity, 
       dailyStartingUpdatedAt, dailyMaxUpdatedAt, dailyMinUpdatedAt } = progress;
  
  // Determine if the daily starting equity should be updated based on whether it's a new day
  let isSameDay = isSameUtcDay(dailyStartingUpdatedAt, startDateStr)
  const newDailyStartingUpdatedAt = isSameDay ? dailyStartingUpdatedAt : startDateStr;
  const newDailyStartingEquity = isSameDay ? dailyStartingEquity : equity;

  // Determine if the max and min daily equity should be updated based on whether it's a new day
  isSameDay = isSameUtcDay(dailyMaxUpdatedAt, today);
  let newMaxUpdatedAt = isSameDay ? dailyMaxUpdatedAt : today;
  const newdailyMaxEquity = Math.max(isSameDay ? dailyMaxEquity : equity , equity);
    
  // Determine if the min daily equity should be updated based on whether it's a new day
  isSameDay = isSameUtcDay(dailyMinUpdatedAt, today);
  const newMinUpdatedAt = isSameDay ? dailyMinUpdatedAt : today;
  const newdailyMinEquity = Math.min(isSameDay ? dailyMinEquity : equity, equity);

  //Trailing Drawdown: The difference between the day’s highest equity and the lowest equity reached afterward, both including unrealized P&L.
  const dailyEquityDrawdown = equity - newdailyMaxEquity;
  
  return {
    currentEquity: equity,
    dailyDrawdown: dailyEquityDrawdown,

    dailyStartingEquity: newDailyStartingEquity,
    dailyStartingUpdatedAt: newDailyStartingUpdatedAt.slice(0, 10),

    dailyMaxEquity: newdailyMaxEquity,
    dailyMaxUpdatedAt: newMaxUpdatedAt,

    dailyMinEquity: newdailyMinEquity,
    dailyMinUpdatedAt: newMinUpdatedAt,
  };
};