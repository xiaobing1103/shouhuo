import { createSlice } from '@reduxjs/toolkit';

export interface ConfigState {
  warehouseName: string;
  backgroundImage: string | null;
  backgroundColor: string;
  soldOutWatermark: string;
  paymentBackground: string;
  paymentSuccessImage: string;
}

const initialState: ConfigState = {
  warehouseName: '',
  backgroundImage: null,
  backgroundColor: '#ffffff',
  soldOutWatermark: '',
  paymentBackground: '',
  paymentSuccessImage: '',
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setConfig(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setConfig } = configSlice.actions;
export const configReducer = configSlice.reducer;
