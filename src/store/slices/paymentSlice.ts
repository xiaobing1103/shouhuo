import { createSlice } from '@reduxjs/toolkit';

export interface PaymentState {
  // 支付状态、倒计时、重试次数等
}

const initialState: PaymentState = {};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
});

export const paymentReducer = paymentSlice.reducer;
