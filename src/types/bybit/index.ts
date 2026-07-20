import type { IBybitWalletAccount, IBybitCoinBalance } from "./IBybitWalletBalance";
import type { IBybitClosedPnl } from "./IBybitClosedPnl";
import type { IBybitCredentials } from "./IBybitCredentials";

export { IBybitAccountType, IBybitCoinType, IBybitApiKeyVipLevel } from "./enums";
export type { IBybitClosedPnl } from "./IBybitClosedPnl";
export type { IBybitApiKeyInfo } from "./IBybitApiKeyInfo";
export type { IBybitAccountInfo } from "./IBybitAccountInfo";
export type { IBybitWalletAccount, IBybitCoinBalance } from "./IBybitWalletBalance";
export type { IBybitPositionInfo } from "./IBybitPositionInfo";
export type { IBybitCredentials } from "./IBybitCredentials";
export type { IBybitDemoApplyMoneyItem, 
  IBybitDemoApplyMoneyRequest, 
  IBybitDemoApplyMoneyPayload,
  IBybitDemoApplyMoney as IBybitDemoApplyMoneyResponse
 } from "./IBybitDemoApplyMoney";

export type IBybitApiResponse<T> = {
  retCode: number;
  retMsg?: string;
  result?: T | any;
  time: number;
};

export type IBybitApiResponseList<T> = {
  nextPageCursor?: string;
  list?: T[];
};

// remove others

type IBybitResponse = {
  updatedAt: number;
};
export type IBybitWalletResponse = IBybitResponse & {
  topic: string;
  list?: IBybitWalletAccount[];
};

export type IBybitClosedPnlRequest = {
  credentials: IBybitCredentials;
  category: string;
  symbol?: string;
  startTime?: number;
  endTime?: number;
  limit?: number;
  cursor?: string;
};

// https://bybit-exchange.github.io/docs/v5/pre-upgrade/close-pnl
export type IBybitClosedPnlResponse = {
  category: string;
  list?: IBybitClosedPnl[];
  nextPageCursor?: string;
};

