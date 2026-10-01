import { IBybitCategory, IBybitPositionSide } from "./enums";

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
  category: IBybitCategory.LINEAR | IBybitCategory.INVERSE | IBybitCategory.OPTION;
  symbol?: string;
  baseCoin?: string;
  settleCoin?: string;
  limit?: number;
  cursor?: string;
};

export type IBybitPositionInfoResponse = {
  category: IBybitCategory;
  list?: IBybitPositionInfo[];
  nextPageCursor?: string;
};