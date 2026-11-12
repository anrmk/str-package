export type TPaymentProviderId = "FREE" | "CONFIRMO" | "MOONPAY" | "NOWPAYMENTS" | "ZEN";

export type TPaymentStatus = "WAITING" | "CONFIRMING" | "CONFIRMED" | "BLOCKED" | "SENDING" | "PENDING" | "PARTIALLY_PAID" | "COMPLETED" | "FINISHED" | "FAILED" | "EXPIRED";

export type TCreatePaymentRequest = {
  amount: number;
  currency: string;
  description?: string;
  orderId?: string;
  customerEmail?: string;
};

export type TCreatePaymentResult = {
  provider: TPaymentProviderId;
  paymentId?: string;
  checkoutUrl: string;
  status: TPaymentStatus;
};

export type TPaymentProvider = {
  readonly id: TPaymentProviderId;
  createPayment(request: TCreatePaymentRequest): Promise<TCreatePaymentResult>;
  getPayment(paymentId: string): Promise<any>;
};
