import { IBybitAccountType } from "./enums";

// Account-level wallet totals returned by ByBit before normalization.
export type IBybitWalletAccount = {
  accountIMRate: string;
  totalMaintenanceMarginByMp: string;
  totalInitialMargin: string;
  accountType: IBybitAccountType;
  accountMMRate: string;
  accountMMRateByMp: string;
  accountIMRateByMp: string;
  totalInitialMarginByMp: string;
  totalMaintenanceMargin: string;
  totalEquity: string;
  totalMarginBalance: string;
  totalAvailableBalance: string;
  totalPerpUPL: string;
  totalWalletBalance: string;
  accountLTV: string;
  coin: IBybitCoinBalance[];
};

// Per-coin balance details as returned by /v5/account/wallet-balance.
export type IBybitCoinBalance = {
  availableToBorrow: string;
  bonus: string;
  accruedInterest: string;
  availableToWithdraw: string;
  totalOrderIM: string;
  equity: string;
  totalPositionMM: string;
  usdValue: string;
  spotHedgingQty: string;
  unrealisedPnl: string;
  collateralSwitch: boolean;
  borrowAmount: string;
  totalPositionIM: string;
  walletBalance: string;
  cumRealisedPnl: string;
  locked: string;
  marginCollateral: boolean;
  coin: string;
  spotBorrow: string;
};