export {
  IBybitAccountType,
  IBybitCoinType,
  IBybitApiKeyVipLevel,
  IBybitCategory,
  IBybitMarginMode
} from "./enums";

export type { IBybitSignRequest } from "./IBybitSignRequest";
export type { IBybitAccountInfo } from "./IBybitAccountInfo";
export type { IBybitCredentials } from "./IBybitCredentials";
export type { IBybitServerTime } from "./IBybitServerTime";

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

// Bybit API Key Info
export type {
  IBybitApiKeyInfo,
  IBybitApiKeyPermissions,
} from "./IBybitApiKeyInfo";

// Bybit Wallet Balance
export type {
  IBybitWalletAccount,
  IBybitCoinBalance,
} from "./IBybitWalletBalance";

// Bybit Demo Apply Money
export type {
  IBybitDemoApplyMoneyItem,
  IBybitDemoApplyMoneyRequest,
  IBybitDemoApplyMoney,
} from "./IBybitDemoApplyMoney";

// Bybit Closed PNL
export type {
  IBybitClosedPnl,
  IBybitClosedPnlRequest,
} from "./IBybitClosedPnl";

// Bybit Position Info
export type {
  IBybitPositionInfo,
  IBybitPositionInfoRequest,
  IBybitPositionInfoResponse,
} from "./IBybitPositionInfo";

// Bybit Order Create Batch
export type {
  IBybitOrderCreateBatchPayload,
  IBybitOrderCreateBatchRequest,
  IBybitOrderCreateBatchResponse,
} from "./IBybitOrderCreateBatch";
