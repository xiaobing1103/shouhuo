/**
 * 全局截图服务
 * 用于在轮询等后台任务中触发截图
 */

type CaptureFunction = () => Promise<string | null>;

class ScreenshotServiceClass {
  private captureFunction: CaptureFunction | null = null;

  /**
   * 注册截图函数（由 Products 页面调用）
   */
  registerCapture(fn: CaptureFunction) {
    this.captureFunction = fn;
    console.log('[ScreenshotService] 截图函数已注册');
  }

  /**
   * 注销截图函数（页面卸载时调用）
   */
  unregisterCapture() {
    this.captureFunction = null;
    console.log('[ScreenshotService] 截图函数已注销');
  }

  /**
   * 执行截图
   * @returns 截图文件 URI，如果不可用则返回 null
   */
  async capture(): Promise<string | null> {
    if (!this.captureFunction) {
      console.warn('[ScreenshotService] 截图函数未注册');
      return null;
    }

    try {
      return await this.captureFunction();
    } catch (error) {
      console.error('[ScreenshotService] 截图失败:', error);
      return null;
    }
  }

  /**
   * 检查截图功能是否可用
   */
  isAvailable(): boolean {
    return this.captureFunction !== null;
  }
}

export const ScreenshotService = new ScreenshotServiceClass();
