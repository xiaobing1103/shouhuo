import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';
import type { RootState } from '../store';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  // 从 Redux store 获取登录状态
  const { token, employee_id } = useSelector((state: RootState) => state.auth);
  // 暂时使用 employee_id 判断登录状态，后续 token 逻辑上线后再改回
  const isAuthenticated = !!employee_id;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        // 已登录：显示主应用
        <Stack.Screen name="Main" component={MainNavigator} />
      ) : (
        // 未登录：显示登录页
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};
