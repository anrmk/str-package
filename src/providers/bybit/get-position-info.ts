import { BYBIT_CONSTANTS } from "./constants";
import {
  IBybitCredentials,
  IBybitApiResponse,
  IBybitApiResponseList,
  IBybitPositionInfo,
} from "../../types/bybit";

import { signBybitRequest } from "../../utils/bybitHelper";

// Query real-time position data, such as position size, cumulative realized PNL, etc.
export async function getPositionInfo(
  credentials: IBybitCredentials,
  category?: string,
  symbol?: string,
  settleCoin?: string,
  cursor?: string,
): Promise<IBybitApiResponse<IBybitApiResponseList<IBybitPositionInfo>>> {
  const { apiKey, apiSecret } = credentials;

  const query = new URLSearchParams({
    category: category ?? "linear",
    limit: "50", //default limit
  });

  if (typeof symbol === "string") {
    query.set("symbol", String(symbol));
  }

  if (typeof settleCoin === "string") {
    query.set("settleCoin", String(settleCoin));
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
      `${BYBIT_CONSTANTS.baseUrl}/v5/position/list?${queryString}`,
      {
        headers: {
          "X-BAPI-API-KEY": apiKey,
          "X-BAPI-SIGN": signature,
          "X-BAPI-SIGN-TYPE": "2",
          "X-BAPI-TIMESTAMP": timestamp,
          "X-BAPI-RECV-WINDOW": BYBIT_CONSTANTS.recvWindowTimeoutMs,
        },
        signal: AbortSignal.timeout(BYBIT_CONSTANTS.fetchTimeoutMs),
        cache: "no-store",
      },
    );
  } catch (error) {
    throw new Error("ByBit Closed PNL API network error", { cause: error });
  }

  if (!bybitRes.ok) {
    throw new Error("ByBit Closed PNL API request failed");
  }

  const bybitJson = (await bybitRes.json()) as IBybitApiResponse<IBybitApiResponseList<IBybitPositionInfo>>;
  
  if (bybitJson.retCode !== 0) {
    throw new Error(bybitJson.retMsg ?? "ByBit error");
  }

  return bybitJson;
}
