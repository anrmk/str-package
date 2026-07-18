export type TSyncResponse<T> = {
  success: boolean;
  message?: string;
  data?: T | null;
  timestamp?: string | number;
};