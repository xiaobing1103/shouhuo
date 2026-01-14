import { createSlice } from '@reduxjs/toolkit';

export interface CartState {
  // 购物车条目等
}

const initialState: CartState = {};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
});

export const cartReducer = cartSlice.reducer;
