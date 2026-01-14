import { apiClient } from '../request';

export const loginApi = (payload: {
  serverUrl: string;
  storeId: string;
  employeeId: string;
  password: string;
}) => {
  return apiClient.post('/api/login', payload);
};
