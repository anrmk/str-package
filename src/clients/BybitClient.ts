import { IBybitApiKeyInfo, IBybitApiResponse, IBybitCredentials } from "../types/bybit";
import { syncBybitServerTime } from "../utils/bybitHelper";

import { getApiKeyInfo } from "../providers/bybit";

export class BybitClient {
    private timeOffset = 0;
    private readonly ready: Promise<void>;

    constructor() {
        this.ready = (async () => {
            this.timeOffset = await syncBybitServerTime();
        })();
    }

    async applyDemoMoney() {
        // Implement the logic to apply demo money to the Bybit account
    }

    async getAccountInfo() {
        // Implement the logic to get account info from Bybit API
    }

    async getApiKeyInfo(credentials: IBybitCredentials): Promise<IBybitApiResponse<IBybitApiKeyInfo>> {
        await this.ready;
        console.log(credentials, this.timeOffset);
        return await getApiKeyInfo(credentials, this.timeOffset);
    }

    async getClosedPnl() {
        // Implement the logic to get closed PnL from Bybit API
    }

    async getPositionInfo() {
        // Implement the logic to get position info from Bybit API
    }

    async getWalletBalance() {
        // Implement the logic to get wallet balance from Bybit API
    }
}