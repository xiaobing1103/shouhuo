import { apiClient } from '../request';

// 登录接口
export const loginApi = (payload: {
  warehouse_id: string;
  employee_id: string;
  password: string;
}) => {
  return apiClient.post('/auth/login', payload);
};

// 验证 Token 接口（用于自动登录验证）
export const verifyTokenApi = (payload: {
  warehouse_id: string;
  employee_id: string;
  token: string;
}) => {
  return apiClient.post('/auth/verify', payload);
};
