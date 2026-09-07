import type {
  IBybitApiKeyInfo,
  IBybitApiResponse,
  IBybitClosedPnlRequest,
  IBybitCredentials,
  IBybitDemoApplyMoneyRequest,
} from "../types/bybit";
import { syncBybitServerTime } from "../utils/bybitHelper";

import {
  getApiKeyInfo,
  getClosedPnl,
  getAccountInfo,
  getWalletBalance,
  applyDemoMoney,
} from "../providers/bybit";

export class BybitClient {
  private timeOffset = 0;
  private readonly ready: Promise<void>;

  constructor() {
    this.ready = (async () => {
      this.timeOffset = await syncBybitServerTime();
    })();
  }

  async applyDemoMoney(
    credentials: IBybitCredentials,
    payload: IBybitDemoApplyMoneyRequest,
  ) {
    await this.ready;
    // Implement the logic to apply demo money to the Bybit account using the provided payload
    return await applyDemoMoney(credentials, payload, this.timeOffset);
  }

  async getAccountInfo(
    credentials: IBybitCredentials,
  ) {
    await this.ready;
    return await getAccountInfo(credentials, this.timeOffset);
  }

  async getApiKeyInfo(
    credentials: IBybitCredentials,
  ): Promise<IBybitApiResponse<IBybitApiKeyInfo>> {
    await this.ready;
    return await getApiKeyInfo(credentials, this.timeOffset);
  }

  async getClosedPnl(
    credentials: IBybitCredentials,
    payload: IBybitClosedPnlRequest
  ) {
    await this.ready;
    return await getClosedPnl(credentials, payload, this.timeOffset);
  }

  async getWalletBalance(credentials: IBybitCredentials) {
    await this.ready;
    return await getWalletBalance(credentials, this.timeOffset);
  }
}
