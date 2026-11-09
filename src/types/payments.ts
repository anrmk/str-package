export type TPaymentProviderId = "FREE" | "CONFIRMO" | "MOONPAY" | "NOWPAYMENTS" | "ZEN";

export type TPaymentStatus = "CREATED" | "PENDING" | "COMPLETED" | "FAILED";

export type TCreatePaymentRequest = {
  amount: number;
  currency: string;
  description?: string;
  orderId?: string;
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
};
