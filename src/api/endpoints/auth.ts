import { apiClient } from '../request';

export const loginApi = (payload: {
  serverUrl: string;
  storeId: string;
  employeeId: string;
  password: string;
}) => {
  return apiClient.post('/auth/login', payload);
};
