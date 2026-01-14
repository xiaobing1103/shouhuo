import { apiClient } from '../request';

export const updateCartApi = (payload: unknown) => {
  return apiClient.post('/api/cart', payload);
};
