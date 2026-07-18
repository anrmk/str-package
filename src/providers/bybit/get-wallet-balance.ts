import { BYBIT_CONSTANTS } from "./constants";
import { IBybitApiResponse, IBybitWalletAccount, IBybitCredentials } from "../../types/bybit";

import { signBybitRequest } from "../../utils/bybitHelper";

// GET /api/bybit/wallet-balance?accountType=UNIFIED
export async function getWalletBalance(
  credentials: IBybitCredentials
): Promise<IBybitApiResponse<IBybitWalletAccount>> {
  const { apiKey, apiSecret } = credentials;

  const query = new URLSearchParams({
    accountType: "UNIFIED",
    coin: "USDT",
  });
  const queryString = query.toString();

  const { signature, timestamp } = signBybitRequest(
    apiSecret,
    apiKey,
    queryString,
  );

  let bybitRes: Response;
  try {
    bybitRes = await fetch(
      `${BYBIT_CONSTANTS.baseUrl}/v5/account/wallet-balance?${queryString}`,
      {
        headers: {
          "X-BAPI-API-KEY": apiKey,
          "X-BAPI-SIGN": signature,
          "X-BAPI-SIGN-TYPE": "2",
          "X-BAPI-TIMESTAMP": timestamp,
          "X-BAPI-RECV-WINDOW": BYBIT_CONSTANTS.recvWindowTimeoutMs,
        },
      },
    );
  } catch (error) {
    throw new Error("ByBit Wallet API network error", { cause: error });
  }

  if (!bybitRes.ok) {
    throw new Error("ByBit Wallet API request failed: " + bybitRes.statusText);
  }

  const bybitJson = (await bybitRes.json()) as IBybitApiResponse<IBybitWalletAccount>;

  if (bybitJson.retCode !== 0) {
    throw new Error(bybitJson.retMsg ?? "ByBit error");
  }

  return bybitJson;
}
