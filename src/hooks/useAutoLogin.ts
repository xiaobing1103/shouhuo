import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials, clearCredentials, AuthState } from '../store/slices/authSlice';
import { setRobotBaseUrl } from '../store/slices/configSlice';
import { verifyTokenApi } from '../api/endpoints/auth';
import { storage } from '../utils/storage';
import { STORAGE_KEYS } from '../config/constants';

interface StoredCredentials {
  token: string | null;
  warehouse_id: string;
  employee_id: string;
  employee_name: string | null;
  employee_role: string | null;
  phone: string | null;
  password?: string; // 可选：存储密码用于自动登录验证
}

interface UseAutoLoginResult {
  isLoading: boolean;
  isInitialized: boolean;
  autoLoginError: string | null;
}

/**
 * 自动登录 Hook
 * 
 * 功能：
 * - 在应用启动时检查本地存储的登录凭据
 * - 如果存在凭据，自动调用验证接口
 * - 验证成功：更新 Redux 状态，进入主应用
 * - 验证失败：清除状态，显示登录页面
 */
export const useAutoLogin = (): UseAutoLoginResult => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [autoLoginError, setAutoLoginError] = useState<string | null>(null);

  const performAutoLogin = useCallback(async () => {
    try {
      setIsLoading(true);
      setAutoLoginError(null);

      // 从本地存储读取凭据
      const storedCredentials = await storage.get<StoredCredentials>(
        STORAGE_KEYS.AUTH_CREDENTIALS
      );
      
      // 加载机器人服务器地址
      const savedRobotUrl = await storage.get<string>(STORAGE_KEYS.ROBOT_BASE_URL);
      if (savedRobotUrl) {
        dispatch(setRobotBaseUrl(savedRobotUrl));
        console.log('[AutoLogin] 已加载机器人服务器地址:', savedRobotUrl);
      }

      if (!storedCredentials) {
        // 没有存储的凭据，直接显示登录页面
        console.log('[AutoLogin] 没有找到存储的凭据');
        setIsInitialized(true);
        setIsLoading(false);
        return;
      }

      const { warehouse_id, employee_id, token } = storedCredentials;

      // 检查必要字段是否存在
      if (!warehouse_id || !employee_id) {
        console.log('[AutoLogin] 凭据不完整，需要重新登录');
        setIsInitialized(true);
        setIsLoading(false);
        return;
      }

      console.log('[AutoLogin] 找到存储的凭据，开始验证...');
      console.log('[AutoLogin] warehouse_id:', warehouse_id);
      console.log('[AutoLogin] employee_id:', employee_id);

      try {
        // 调用验证接口
        const response = await verifyTokenApi({
          warehouse_id,
          employee_id,
          token: token || '',
        });

        const responseData = response.data;
        const userData = responseData.data;

        if (responseData.code === 200 && userData) {
          // 验证成功，更新 Redux 状态
          console.log('[AutoLogin] 验证成功，自动登录');
          dispatch(
            setCredentials({
              token: userData.token || token,
              warehouse_id: userData.warehouse_id || warehouse_id,
              employee_id: userData.employee_id || employee_id,
              employee_name: userData.employee_name || storedCredentials.employee_name,
              employee_role: userData.employee_role || storedCredentials.employee_role,
              phone: userData.phone || storedCredentials.phone,
            })
          );
        } else {
          // 验证失败，清除凭据
          console.log('[AutoLogin] 验证失败:', responseData.message);
          setAutoLoginError(responseData.message || '自动登录验证失败');
          // 不清除本地存储，只是不自动登录，让用户手动登录
        }
      } catch (apiError: any) {
        // API 调用失败
        const errorMessage =
          apiError?.response?.data?.message ||
          apiError?.message ||
          '网络请求失败';
        console.log('[AutoLogin] API 错误:', errorMessage);
        setAutoLoginError(errorMessage);
        // 不清除本地存储，让用户可以重试或手动登录
      }
    } catch (error: any) {
      console.error('[AutoLogin] 自动登录异常:', error);
      setAutoLoginError('自动登录过程发生异常');
    } finally {
      setIsInitialized(true);
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    performAutoLogin();
  }, [performAutoLogin]);

  return {
    isLoading,
    isInitialized,
    autoLoginError,
  };
};

/**
 * 保存登录凭据到本地存储
 * 在登录成功后调用此函数
 */
export const saveCredentials = async (credentials: StoredCredentials): Promise<void> => {
  try {
    await storage.set(STORAGE_KEYS.AUTH_CREDENTIALS, credentials);
    console.log('[Auth] 凭据已保存到本地存储');
  } catch (error) {
    console.error('[Auth] 保存凭据失败:', error);
  }
};

/**
 * 清除本地存储的登录凭据
 * 在登出时调用此函数
 */
export const clearStoredCredentials = async (): Promise<void> => {
  try {
    await storage.remove(STORAGE_KEYS.AUTH_CREDENTIALS);
    console.log('[Auth] 凭据已从本地存储清除');
  } catch (error) {
    console.error('[Auth] 清除凭据失败:', error);
  }
};
