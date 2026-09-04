import { BYBIT_CONSTANTS } from "./constants";

import {
  IBybitCredentials,
  IBybitApiResponse,
  IBybitAccountInfo,
  IBybitDemoApplyMoneyRequest,
} from "../../types/bybit";
import { signBybitRequest } from "../../utils/bybitHelper";
import { IBybitDemoApplyMoney } from "../../types/bybit/IBybitDemoApplyMoney";

// POST /api/bybit/apply-money
export async function applyDemoMoney(
  credentials: IBybitCredentials,
  payload: IBybitDemoApplyMoneyRequest,
): Promise<IBybitApiResponse<IBybitDemoApplyMoney>> {
  const { apiKey, apiSecret } = credentials;

  const requestBody = JSON.stringify(payload);
  const { signature, timestamp } = signBybitRequest(apiSecret, apiKey, requestBody);
  
  let bybitRes: Response;
  try {
    bybitRes = await fetch(
      `${BYBIT_CONSTANTS.baseUrl}/v5/account/demo-apply-money`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-BAPI-API-KEY": apiKey,
          "X-BAPI-SIGN": signature,
          "X-BAPI-SIGN-TYPE": "2",
          "X-BAPI-TIMESTAMP": timestamp,
          "X-BAPI-RECV-WINDOW": BYBIT_CONSTANTS.recvWindowTimeoutMs,
        },
        body: requestBody,
        signal: AbortSignal.timeout(BYBIT_CONSTANTS.fetchTimeoutMs),
        cache: "no-store",
      },
    );
  } catch (error) {
    throw new Error("ByBit Apply Money API network error", { cause: error });
  }

  if (!bybitRes.ok) {
    throw new Error("ByBit Apply Money API request failed");
  }

  const bybitJson =
    (await bybitRes.json()) as IBybitApiResponse<IBybitAccountInfo>;

  if (bybitJson.retCode !== 0) {
    throw new Error(bybitJson.retMsg ?? "ByBit error");
  }

  return bybitJson;
}
