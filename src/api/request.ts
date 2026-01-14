import axios from 'axios';
import { apiConfig } from '../config/api.config';
import { API_TIMEOUT } from '../config/constants';

export const apiClient = axios.create({
  baseURL: apiConfig.baseURL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    if (config.url && config.url.startsWith('http://')) {
      console.warn('检测到HTTP请求，已自动升级为HTTPS');
      config.url = config.url.replace('http://', 'https://');
    }
    return config;
  },
  (error) => Promise.reject(error)
);
