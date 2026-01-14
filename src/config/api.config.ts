// 环境配置
type Environment = 'development' | 'production';

// 当前环境 - 修改这里来切换环境
const CURRENT_ENV: Environment = 'development';

// 环境配置
const ENV_CONFIG = {
  development: {
    baseURL: 'https://dev-api.jushuitan.com',
    name: '测试环境',
  },
  production: {
    baseURL: 'https://dev-api.jushuitan.com',
    name: '正式环境',
  },
};

// 导出当前环境配置
export const apiConfig = {
  baseURL: ENV_CONFIG[CURRENT_ENV].baseURL,
  environment: CURRENT_ENV,
  environmentName: ENV_CONFIG[CURRENT_ENV].name,
};

// 导出所有环境配置供其他地方使用
export const environments = ENV_CONFIG;
