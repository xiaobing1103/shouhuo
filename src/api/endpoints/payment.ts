import { apiClient } from '../request';

export const createPaymentApi = (payload: { amount: number; paymentType: 'wechat' | 'alipay' }) => {
  return apiClient.post('/api/payment', payload);
};

export const pollPaymentStatusApi = (orderId: string) => {
  return apiClient.get(`/api/payment/${orderId}`);
};
