// Normalized closed PnL record returned by internal API (DB).
export type TChallengeClosedPnl = {
  challengeId: string;
  symbol: string;
  orderId: string;
  side: string;
  qty: number;
  orderPrice: string;
  orderType: string;
  execType: string;
  closedSize: number;
  cumEntryValue: number;
  avgEntryPrice: number;
  cumExitValue: number;
  avgExitPrice: number;
  closedPnl: number;
  fillCount: number;
  leverage: number;
  createdTime: string;
  updatedTime: string;
  updatedAt: string;
};