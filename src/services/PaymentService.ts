export type PaymentStatus = 'idle' | 'pending' | 'success' | 'failed' | 'timeout';

export interface PaymentOrder {
  id: string;
  amount: number;
  qrCode: string;
}

export class PaymentService {
  async createPayment(amount: number, paymentType: 'wechat' | 'alipay'): Promise<PaymentOrder> {
    // TODO: 调用创建支付订单接口
    return {
      id: 'mock-id',
      amount,
      qrCode: 'mock-qrcode',
    };
  }

  async pollPaymentStatus(orderId: string): Promise<PaymentStatus> {
    // TODO: 调用支付状态轮询接口
    return 'idle';
  }
}
