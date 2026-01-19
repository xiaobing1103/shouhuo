import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ProductsScreen } from '../screens/Products';
import { PaymentScreen } from '../screens/Payment';

export type MainStackParamList = {
  Products: undefined;
  Payment: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
    </Stack.Navigator>
  );
};
