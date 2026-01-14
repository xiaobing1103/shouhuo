import { NativeModules } from 'react-native';

const { ScreenCaptureModule } = NativeModules;

export class ScreenshotService {
  async captureAndUpload(): Promise<void> {
    // TODO: 调用原生截屏模块并上传
    try {
      const filePath = await ScreenCaptureModule.captureScreen();
      // TODO: 上传 filePath
      void filePath;
    } catch (error) {
      console.error('Screenshot failed:', error);
    }
  }
}
