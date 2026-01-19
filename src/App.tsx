import 'react-native-gesture-handler';
import '../global.css';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { store } from './store';
import { RootNavigator } from './navigation';
import { ErrorBoundary } from './components/common/ErrorBoundary';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <Provider store={store}>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </Provider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
};

export default App;
