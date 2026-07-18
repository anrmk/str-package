import { BYBIT_CONSTANTS } from "./constants";
import { IBybitCredentials, IBybitApiResponse, IBybitApiResponseList, IBybitClosedPnl } from "../../types/bybit";
import { signBybitRequest } from "../../utils/bybitHelper";

// GET /api/bybit/wallet-balance?accountType=UNIFIED
export async function getClosedPnl(
  credentials: IBybitCredentials,
  startTime?: number,
  cursor?: string,
): Promise<IBybitApiResponse<IBybitApiResponseList<IBybitClosedPnl>>> {
  const { apiKey, apiSecret } = credentials;
  const query = new URLSearchParams({
    category: "linear",
    //symbol: "BTCUSDT",
    limit: "50", //default limit
  });

  if (typeof startTime === "number") {
    query.set("startTime", String(startTime));
  }

  if (typeof cursor === "string") {
    query.set("cursor", String(cursor));
  }

  const queryString = query.toString();

  const { signature, timestamp } = signBybitRequest(
    apiSecret,
    apiKey,
    queryString,
  );

  let bybitRes: Response;
  try {
    bybitRes = await fetch(
      `${BYBIT_CONSTANTS.baseUrl}/v5/position/closed-pnl?${queryString}`,
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
    throw new Error("ByBit Closed PNL API network error", { cause: error });
  }

  if (!bybitRes.ok) {
    throw new Error("ByBit Closed PNL API request failed");
  }

  const bybitJson = (await bybitRes.json()) as IBybitApiResponse<IBybitApiResponseList<IBybitClosedPnl>>;

  if (bybitJson.retCode !== 0) {
    throw new Error(bybitJson.retMsg ?? "ByBit error");
  }

  return bybitJson;
}
