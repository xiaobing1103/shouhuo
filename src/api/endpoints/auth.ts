import { apiClient } from '../request';

export const loginApi = (payload: {
  warehouse_id: string;
  employee_id: string;
  password: string;
}) => {
  return apiClient.post('/auth/login', payload);
};
