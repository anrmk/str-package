import { IBybitApiResponse, IBybitApiResponseList } from "../..";
import type {
  IBybitOrderType,
  IBybitPositionSide,
  IBybitCategory,
} from "./enums";

export type IBybitOrderCreateBatchPayload = {
  symbol: string;
  isLeverage?: 0 | 1;
  side: IBybitPositionSide.BUY | IBybitPositionSide.SELL;
  orderType: IBybitOrderType;
  qty: string;
  marketUnit?: "baseCoin" | "quoteCoin";
  price?: string;
  triggerDirection?: 1 | 2;
  orderFilter?: "Order" | "tpslOrder" | "StopOrder";
  triggerPrice?: string;
  triggerBy?: "LastPrice" | "IndexPrice" | "MarkPrice";
  orderIv?: string;
  timeInForce?: "GTC" | "IOC" | "FOK" | "PostOnly";
  positionIdx?: 0 | 1 | 2;
  orderLinkId?: string;
  takeProfit?: string;
  stopLoss?: string;
  tpTriggerBy?: "LastPrice" | "IndexPrice" | "MarkPrice";
  slTriggerBy?: "LastPrice" | "IndexPrice" | "MarkPrice";
  reduceOnly?: boolean;
  closeOnTrigger?: boolean;
  smpType?: string;
  mmp?: boolean;
  tpslMode?: "Full" | "Partial";
  tpLimitPrice?: string;
  slLimitPrice?: string;
  tpOrderType?: IBybitOrderType;
  slOrderType?: IBybitOrderType;
};

export type IBybitOrderCreateBatch = {
  category: IBybitCategory;
  symbol: string;
  orderId: string;
  orderLinkId: string;
  createAt: string;
};

export type IBybitOrderCreateBatchExtInfo = {
  code: number;
  msg: string;
};

export type IBybitOrderCreateBatchRequest = {
  category: IBybitCategory;
  request: IBybitOrderCreateBatchPayload[];
};

export type IBybitOrderCreateBatchResponse = IBybitApiResponse<
  IBybitApiResponseList<IBybitOrderCreateBatch>
> & {
  retExtInfo: {
    list: IBybitOrderCreateBatchExtInfo[];
  };
};
