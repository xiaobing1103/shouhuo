import 'react-native-gesture-handler';
import '../global.css';
import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { store } from './store';
import { RootNavigator } from './navigation';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { useAutoLogin } from './hooks/useAutoLogin';
import { usePolling } from './hooks/usePolling';

// 全局轮询组件 - 在登录后自动启动轮询
const PollingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 初始化轮询 hook，它会根据登录状态自动启动/停止轮询
  usePolling();
  return <>{children}</>;
};

// 内部应用组件，处理自动登录逻辑
const AppContent: React.FC = () => {
  const { isLoading, isInitialized } = useAutoLogin();

  // 显示加载界面，等待自动登录验证完成
  if (!isInitialized || isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 16, color: '#666' }}>正在加载...</Text>
      </View>
    );
  }

  return (
    <PollingProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </PollingProvider>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <Provider store={store}>
          <AppContent />
        </Provider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
};

export default App;
