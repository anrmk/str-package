// Raw row returned by Bybit /v5/position/closed-pnl.
export type IBybitClosedPnl = {
  symbol: string;
  orderId: string;
  side: string;
  qty: string;
  orderPrice: string;
  orderType: string; // change to enum IBybitOrderType
  execType: string;
  closedSize: string;
  cumEntryValue: string;
  avgEntryPrice: string;
  cumExitValue: string;
  avgExitPrice: string;
  closedPnl: string;
  fillCount: string;
  leverage: string;
  createdTime: string;
  updatedTime: string;
  openFee: string; //deprecated?
  closeFee: string; //deprecated?
};
