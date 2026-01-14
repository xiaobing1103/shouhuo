import { createSlice } from '@reduxjs/toolkit';

export interface ProductState {
  // 商品列表等
}

const initialState: ProductState = {};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
});

export const productReducer = productSlice.reducer;
