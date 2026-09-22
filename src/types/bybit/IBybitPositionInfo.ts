import { IBybitPositionSide } from "./enums";
import { IBybitCredentials } from "./IBybitCredentials";

// Raw row returned by Bybit /v5/position/list.
export type IBybitPositionInfo = {
  positionIdx: number;
  riskId: number;
  riskLimitValue: string;
  symbol: string;
  side: IBybitPositionSide ;
  size: string;
  avgPrice: string;
  positionValue: string;
  autoAddMargin: number;
  positionStatus: string;
  leverage: string;
  breakEvenPrice: string;
  markPrice: string;
  liqPrice: string;
  positionIM: string;
  positionIMByMp: string;
  positionMM: string;
  positionMMByMp: string;
  takeProfit: string;
  stopLoss: string;
  trailingStop: string;
  sessionAvgPrice: string;
  unrealisedPnl: string;
  curRealisedPnl: string;
  cumRealisedPnl: string;
  adlRankIndicator: number;
  createdTime: string;
  updatedTime: string;
  openTime: number;
  seq: number;
  isReduceOnly: boolean;
  mmrSysUpdatedTime: string;
  leverageSysUpdatedTime: string;
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