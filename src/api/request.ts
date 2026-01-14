import axios from 'axios';

export const apiClient = axios.create({
  timeout: 10000,
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
