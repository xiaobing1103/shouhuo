import { apiClient } from '../request';

export const pollingTaskApi = () => {
  return apiClient.get('/api/polling');
};
