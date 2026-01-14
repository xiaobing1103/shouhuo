import { combineReducers } from '@reduxjs/toolkit';

import { authReducer } from './slices/authSlice';
import { productReducer } from './slices/productSlice';
import { cartReducer } from './slices/cartSlice';
import { paymentReducer } from './slices/paymentSlice';
import { configReducer } from './slices/configSlice';
import { pollingReducer } from './slices/pollingSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  cart: cartReducer,
  payment: paymentReducer,
  config: configReducer,
  polling: pollingReducer,
});
