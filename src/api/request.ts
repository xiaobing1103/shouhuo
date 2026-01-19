import axios from 'axios';
import { apiConfig, getDynamicBaseURL } from '../config/api.config';
import { API_TIMEOUT } from '../config/constants';

export const apiClient = axios.create({
  baseURL: apiConfig.baseURL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器：动态更新 baseURL
apiClient.interceptors.request.use(
  async (config) => {
    // 动态获取 baseURL
    const dynamicBaseURL = await getDynamicBaseURL();
    config.baseURL = dynamicBaseURL;
    
    console.log('=== API Request Debug ===');
    console.log('Base URL:', config.baseURL);
    console.log('Request URL:', config.url);
    console.log('Full URL:', `${config.baseURL}${config.url}`);
    console.log('Method:', config.method);
    console.log('Data:', JSON.stringify(config.data));
    console.log('========================');
    
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器：记录返回数据
apiClient.interceptors.response.use(
  (response) => {
    console.log('=== API Response Debug ===');
    console.log('URL:', response.config.url);
    console.log('Status:', response.status);
    console.log('Data:', JSON.stringify(response.data, null, 2));
    console.log('=========================');
    return response;
  },
  (error) => {
    console.log('=== API Error Debug ===');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.log('Error Message:', error.message);
    }
    console.log('=======================');
    return Promise.reject(error);
  }
);
