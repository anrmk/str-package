import { BYBIT_CONSTANTS } from "./constants";
import {
  IBybitCredentials,
  IBybitApiResponse,
  IBybitApiResponseList,
  IBybitPositionInfo,
  IBybitPositionInfoRequest,
} from "../../types/bybit";

import { signBybitRequest } from "../../utils/bybitHelper";

const DEFAULT_SETTLE_COIN = "USDT";
const DEFAULT_CATEGORY = "linear";

// Query real-time position data, such as position size, cumulative realized PNL, etc.
export async function getPositionInfo(
  credentials: IBybitCredentials,
  payload: IBybitPositionInfoRequest,
  timeOffset?: number,
): Promise<IBybitApiResponse<IBybitApiResponseList<IBybitPositionInfo>>> {
  const query = new URLSearchParams({
    settleCoin: payload.settleCoin ?? DEFAULT_SETTLE_COIN,
    category: payload.category ?? DEFAULT_CATEGORY,
    limit: "50", //default limit
  });

  if (typeof payload?.symbol === "string") {
    query.set("symbol", String(payload.symbol));
  }

  if (typeof payload?.cursor === "string") {
    query.set("cursor", String(payload.cursor));
  }

  const queryString = query.toString();

  const { signature, timestamp } = signBybitRequest({
    credentials,
    queryString,
    timeOffset,
  });

  let bybitRes: Response;
  try {
    bybitRes = await fetch(
      `${BYBIT_CONSTANTS.baseUrl}/v5/position/list?${queryString}`,
      {
        headers: {
          "X-BAPI-API-KEY": credentials.apiKey,
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
    console.error("ByBit Position Info API network error", { cause: error });
    throw new Error("ByBit Position Info API network error", { cause: error });
  }

  if (!bybitRes.ok) {
    console.error("ByBit Position Info API request failed", bybitRes);
    throw new Error("ByBit Position Info API request failed");
  }

  const bybitJson = (await bybitRes.json()) as IBybitApiResponse<IBybitApiResponseList<IBybitPositionInfo>>;
  
  if (bybitJson.retCode !== 0) {
    console.error("ByBit Position Info API error", bybitJson);
    throw new Error(bybitJson.retMsg ?? "ByBit error");
  }

  return bybitJson;
}
