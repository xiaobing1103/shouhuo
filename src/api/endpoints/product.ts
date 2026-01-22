import { apiClient } from '../request';

export const fetchProductsApi = (warehouse_id?: string) => {
  return apiClient.get('/inventory', {
    params: { warehouse_id },
  });
};
