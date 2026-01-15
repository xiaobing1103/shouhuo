import { storage } from '../utils/storage';

// 环境配置
type Environment = 'development' | 'production';

// 当前环境 - 修改这里来切换环境
const CURRENT_ENV: Environment = 'development';

// 环境配置
const ENV_CONFIG = {
  development: {
    baseURL: 'https://dev-api.jushuitan.com',
    robotBaseURL: 'https://dev-robot.jushuitan.com',
    name: '测试环境',
  },
  production: {
    baseURL: 'http://prod-cn.your-api-server.com',
    robotBaseURL: 'http://prod-robot.your-api-server.com',
    name: '正式环境',
  },
};

// 存储键
const STORAGE_KEYS = {
  SERVER_BASE_URL: 'server_base_url',
  ROBOT_BASE_URL: 'robot_base_url',
};

// 获取动态配置的URL（优先使用用户设置的值）
export const getDynamicBaseURL = async (): Promise<string> => {
  try {
    const customUrl = await storage.get<string>(STORAGE_KEYS.SERVER_BASE_URL);
    return customUrl || ENV_CONFIG[CURRENT_ENV].baseURL;
  } catch (error) {
    console.error('获取服务器地址失败:', error);
    return ENV_CONFIG[CURRENT_ENV].baseURL;
  }
};

export const getDynamicRobotBaseURL = async (): Promise<string> => {
  try {
    const customUrl = await storage.get<string>(STORAGE_KEYS.ROBOT_BASE_URL);
    return customUrl || ENV_CONFIG[CURRENT_ENV].robotBaseURL;
  } catch (error) {
    console.error('获取机器人地址失败:', error);
    return ENV_CONFIG[CURRENT_ENV].robotBaseURL;
  }
};

// 导出当前环境配置（默认值）
export const apiConfig = {
  baseURL: ENV_CONFIG[CURRENT_ENV].baseURL,
  robotBaseURL: ENV_CONFIG[CURRENT_ENV].robotBaseURL,
  environment: CURRENT_ENV,
  environmentName: ENV_CONFIG[CURRENT_ENV].name,
};

// 导出所有环境配置供其他地方使用
export const environments = ENV_CONFIG;
