import { IBybitAccountType } from "../bybit/enums";

export type TChallengeWalletBalance = {
  readonly challengeId: string;

  accountType: IBybitAccountType;
  totalEquity: number;
  totalPerpUpl: number;
  totalWalletBalance: number;
  totalAvailableBalance: number;
  capital: number;
  
  /** Coin-specific balance details */
  equity: number;
  totalPositionMm?: number;
  totalPositionIm?: number;
  usdValue: number;
  unrealisedPnl: number;
  walletBalance: number;
  availableToWithdraw: number;
  cumRealisedPnl?: number;
  bonus?: number;
  coin: string;

  readonly createdAt: string;
  readonly updatedAt: string;
}