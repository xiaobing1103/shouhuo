import { apiClient } from '../request';

export const fetchProductsApi = () => {
  return apiClient.get('/api/products');
};
