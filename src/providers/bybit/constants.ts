export const BYBIT_CONSTANTS = {
    baseUrl: process.env.BYBIT_BASE_URL || "https://api-demo.bybit.com",
    fetchTimeoutMs: Number(process.env.BYBIT_FETCH_TIMEOUT_MS) || 10000,
    recvWindowTimeoutMs: process.env.BYBIT_RECV_WINDOW_TIMEOUT_MS || "20000",
}