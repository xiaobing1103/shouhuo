import { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, AppStateStatus } from 'react-native';

import { 
  setPollingRunning, 
  updatePollStatus,
} from '../store/slices/pollingSlice';
import { setConfig } from '../store/slices/configSlice';
import { setProducts, setCategories } from '../store/slices/productSlice';
import { 
  fetchTaskApi, 
  fetchImageApi, 
  uploadScreenshotApi, 
  forwardToRobotApi 
} from '../api/endpoints/polling';
import { fetchProductsApi } from '../api/endpoints/product';
import { POLLING_INTERVAL, MAX_ERROR_COUNT } from '../config/constants';
import { ScreenshotService } from '../services/ScreenshotService';
import type { RootState } from '../store';
import type { TaskGetResponse, InventoryItem, Product, Category } from '../types/models.types';

/**
 * 全局轮询 Hook
 * 负责定期调用 /task_get 接口并处理各类任务
 */
export const usePolling = () => {
  const dispatch = useDispatch();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPollingRef = useRef<boolean>(false);
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);
  
  // 从 Redux 获取状态
  const { token, warehouse_id } = useSelector((state: RootState) => state.auth);
  const { robotBaseUrl } = useSelector((state: RootState) => state.config);
  const { errorCount } = useSelector((state: RootState) => state.polling);

  /**
   * 处理库存任务 - inventory
   */
  const handleInventoryTask = useCallback(async () => {
    try {
      console.log('[Polling] 处理库存任务...');
      const response = await fetchProductsApi(warehouse_id || undefined);
      const inventoryResponse = response.data;

      if (inventoryResponse.code === 200 && inventoryResponse.data) {
        // 转换库存数据为产品数据
        const products: Product[] = inventoryResponse.data.map((item: InventoryItem) => ({
          id: item.product_id,
          name: item.product_name,
          price: item.product_price,
          stock: item.quantity,
          categoryId: item.category,
          categoryName: item.category,
          categorySort: item.category_soft,
          productSort: item.p_sort,
          imageUrl: item.product_image && item.product_image.length > 0 ? item.product_image[0] : undefined,
          isSoldOut: item.quantity <= 0 || item.status !== 'normal',
          warehouse_id: item.warehouse_id,
          warehouse_name: item.warehouse_name,
          status: item.status,
        }));

        // 提取分类信息
        const categoryMap = new Map<string, Category>();
        products.forEach(product => {
          if (!categoryMap.has(product.categoryId)) {
            categoryMap.set(product.categoryId, {
              id: product.categoryId,
              name: product.categoryName,
              sort: product.categorySort,
            });
          }
        });
        const categories = Array.from(categoryMap.values()).sort((a, b) => a.sort - b.sort);

        // 更新 Redux 状态
        dispatch(setProducts(products));
        dispatch(setCategories(categories));
        console.log('[Polling] 库存更新成功，商品数量:', products.length);
      }
    } catch (error) {
      console.error('[Polling] 处理库存任务失败:', error);
    }
  }, [dispatch, warehouse_id]);

  /**
   * 处理图片获取任务 - get_image
   */
  const handleGetImageTask = useCallback(async () => {
    if (!warehouse_id) {
      console.warn('[Polling] 获取图片失败: warehouse_id 为空');
      return;
    }

    try {
      console.log('[Polling] 处理图片获取任务...');
      const response = await fetchImageApi(warehouse_id);
      
      if (response.data.code === 200 && response.data.data && response.data.data.length > 0) {
        const imageConfig = response.data.data[0];
        
        // 更新配置到 Redux
        dispatch(setConfig({
          backgroundImage: imageConfig.background || null,
          soldOutWatermark: imageConfig.sold_out || '',
          paymentBackground: imageConfig.payment_background || '',
          paymentSuccessImage: imageConfig.payment_success || '',
        }));
        
        console.log('[Polling] 图片配置更新成功');
      }
    } catch (error) {
      console.error('[Polling] 处理图片获取任务失败:', error);
    }
  }, [dispatch, warehouse_id]);

  /**
   * 处理截图任务 - screenshot
   */
  const handleScreenshotTask = useCallback(async () => {
    if (!warehouse_id) {
      console.warn('[Polling] 截图任务失败: warehouse_id 为空');
      return;
    }

    try {
      console.log('[Polling] 处理截图任务...');
      
      // 使用全局截图服务
      if (ScreenshotService.isAvailable()) {
        const uri = await ScreenshotService.capture();
        
        if (uri) {
          const imageFile = {
            uri: uri,
            type: 'image/png',
            name: 'screenshot.png',
          };
          
          const response = await uploadScreenshotApi(imageFile, warehouse_id);
          
          if (response.data.code === 200) {
            console.log('[Polling] 截图上传成功');
          } else {
            console.warn('[Polling] 截图上传失败:', response.data.message);
          }
        }
      } else {
        console.warn('[Polling] 截图服务不可用（Products 页面未激活）');
      }
    } catch (error) {
      console.error('[Polling] 处理截图任务失败:', error);
    }
  }, [warehouse_id]);

  /**
   * 处理机器人请求任务 - request
   */
  const handleRequestTask = useCallback(async (route: string, jsonData: any[]) => {
    if (!robotBaseUrl) {
      console.warn('[Polling] 机器人请求失败: robotBaseUrl 未配置');
      return;
    }

    try {
      console.log('[Polling] 处理机器人请求任务...', { route, jsonData });
      
      const response = await forwardToRobotApi(robotBaseUrl, route, jsonData);
      console.log('[Polling] 机器人请求成功:', response.data);
    } catch (error) {
      console.error('[Polling] 处理机器人请求任务失败:', error);
    }
  }, [robotBaseUrl]);

  /**
   * 执行一次轮询
   */
  const poll = useCallback(async () => {
    // 如果正在轮询中，跳过
    if (isPollingRef.current) {
      return;
    }

    // 如果没有 token，不执行轮询
    if (!token) {
      return;
    }

    // 如果错误次数过多，暂停轮询
    if (errorCount >= MAX_ERROR_COUNT) {
      console.warn('[Polling] 错误次数过多，暂停轮询');
      return;
    }

    isPollingRef.current = true;

    try {
      console.log('[Polling] 开始轮询 /task_get...');
      const response = await fetchTaskApi();
      const taskData: TaskGetResponse = response.data;

      if (taskData.code === 200 && taskData.data) {
        const { inventory, get_image, screenshot, request } = taskData.data;

        // 处理库存任务
        if (inventory && inventory.status) {
          await handleInventoryTask();
        }

        // 处理图片获取任务
        if (get_image && get_image.status) {
          await handleGetImageTask();
        }

        // 处理截图任务
        if (screenshot && screenshot.status) {
          await handleScreenshotTask();
        }

        // 处理机器人请求任务
        if (request && request.status && request.data) {
          const { route, json_data } = request.data;
          if (route) {
            await handleRequestTask(route, json_data);
          }
        }

        dispatch(updatePollStatus({ success: true }));
      } else {
        dispatch(updatePollStatus({ success: false, error: taskData.message || '未知错误' }));
      }
    } catch (error: any) {
      console.error('[Polling] 轮询失败:', error);
      dispatch(updatePollStatus({ 
        success: false, 
        error: error.message || '网络错误' 
      }));
    } finally {
      isPollingRef.current = false;
    }
  }, [
    token, 
    errorCount, 
    dispatch, 
    handleInventoryTask, 
    handleGetImageTask, 
    handleScreenshotTask, 
    handleRequestTask
  ]);

  /**
   * 启动轮询
   */
  const startPolling = useCallback(() => {
    if (timerRef.current) {
      return;
    }

    console.log('[Polling] 启动轮询，间隔:', POLLING_INTERVAL, 'ms');
    dispatch(setPollingRunning(true));

    // 立即执行一次
    poll();

    // 设置定时器
    timerRef.current = setInterval(() => {
      poll();
    }, POLLING_INTERVAL);
  }, [dispatch, poll]);

  /**
   * 停止轮询
   */
  const stopPolling = useCallback(() => {
    if (timerRef.current) {
      console.log('[Polling] 停止轮询');
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    dispatch(setPollingRunning(false));
  }, [dispatch]);

  // 监听应用状态变化
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (
        appStateRef.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // 应用回到前台，重新启动轮询
        console.log('[Polling] 应用回到前台');
        if (token) {
          startPolling();
        }
      } else if (nextAppState.match(/inactive|background/)) {
        // 应用进入后台，停止轮询
        console.log('[Polling] 应用进入后台');
        stopPolling();
      }
      appStateRef.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [token, startPolling, stopPolling]);

  // 根据登录状态自动启动/停止轮询
  useEffect(() => {
    if (token) {
      startPolling();
    } else {
      stopPolling();
    }

    return () => {
      stopPolling();
    };
  }, [token, startPolling, stopPolling]);

  return {
    startPolling,
    stopPolling,
    poll,
  };
};
