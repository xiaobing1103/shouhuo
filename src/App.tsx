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
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
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
