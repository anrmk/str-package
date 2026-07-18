import type { IBybitCoinType } from "./enums";

// Request Demo Trading Funds
// https://bybit-exchange.github.io/docs/v5/demo#request-demo-trading-funds
export type IBybitDemoApplyMoneyItem = {
  coin: IBybitCoinType;
  amountStr: string;
};

export type IBybitDemoApplyMoneyRequest = {
  adjustType?: 0 | 1;
  utaDemoApplyMoney: IBybitDemoApplyMoneyItem[];
};

export type IBybitDemoApplyMoneyPayload = IBybitDemoApplyMoneyRequest & {
  challengeId?: string;
};

export type IBybitDemoApplyMoney = {
    resultCode: string;
    utaDemoApplyMoneyConfig: IBybitDemoApplyMoneyItem[];
    orderStatus: string;
    retMsg: string;
}