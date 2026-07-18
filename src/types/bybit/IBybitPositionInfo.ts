import { IBybitCredentials } from "./IBybitCredentials";

// Raw row returned by Bybit /v5/position/list.
export type IBybitPositionInfo = {
  challengeId: string;
  positionIdx: number;
  riskId: number;
  riskLimitValue: string;
  symbol: string;
  side: string;
  size: string;
  avgPrice: string;
  positionValue: string;
  tradeMode: number;
  positionStatus: string;
  autoAddMargin: number;
  adlRankIndicator: number;
  leverage: string;
  positionBalance: string;
  markPrice: string;
  liqPrice: string;
  bustPrice: string;
  positionMM: string;
  positionIM: string;
  tpslMode: string;
  takeProfit: string;
  stopLoss: string;
  trailingStop: string;
  unrealisedPnl: string;
  curRealisedPnl: string;
  cumRealisedPnl: string;
  seq: number;
  isReduceOnly: boolean;
  mmrSysUpdatedTime: string;
  leverageSysUpdatedTime: string;
  sessionAvgPrice: string;
  createdTime: string;
  updatedTime: string;
};

export type IBybitPositionInfoRequest = {
  credentials: IBybitCredentials;
  category: string;
  symbol?: string;
  settleCoin?: string;
  limit?: number;
  cursor?: string;
};

export type IBybitPositionInfoResponse = {
  category: string;
  list?: IBybitPositionInfo[];
  nextPageCursor?: string;
  time?: number;
};