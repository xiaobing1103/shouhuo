import axios from 'axios';
import { apiClient } from '../request';
import type { TaskGetResponse, YhtImageResponse, ScreenshotUploadResponse } from '../../types/models.types';

/**
 * 获取轮询任务
 */
export const fetchTaskApi = () => {
  return apiClient.get<TaskGetResponse>('/task_get');
};

/**
 * 获取图片配置 - get_image 任务
 */
export const fetchImageApi = (warehouseId: string) => {
  return apiClient.get<YhtImageResponse>('/yht_image', {
    params: { warehouse_id: warehouseId },
  });
};

/**
 * 上传截图 - screenshot 任务
 * 使用 form-data 格式
 */
export const uploadScreenshotApi = (imageFile: any, warehouseId: string) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('warehouse_id', warehouseId);
  
  return apiClient.post<ScreenshotUploadResponse>('/screenshot', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

/**
 * 转发请求到机器人 - request 任务
 * @param robotBaseUrl 机器人服务器基础地址
 * @param route 路由路径
 * @param jsonData 请求数据
 */
export const forwardToRobotApi = (robotBaseUrl: string, route: string, jsonData: any[]) => {
  const url = `${robotBaseUrl}${route}`;
  return axios.post(url, jsonData, {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  });
};

// 保留旧的 API 以保持向后兼容
export const pollingTaskApi = () => {
  return apiClient.get('/api/polling');
};
