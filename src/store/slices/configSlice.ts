import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeMode } from '../../config/colors.config';

export interface ConfigState {
  warehouseName: string;
  backgroundImage: string | null;
  backgroundColor: string;
  soldOutWatermark: string;
  paymentBackground: string;
  paymentSuccessImage: string;
  // 主题相关配置
  themeMode: ThemeMode;
  customTextColor?: string;           // 自定义文字颜色
  customBackgroundColor?: string;     // 自定义背景颜色
  customComponentBackground?: string; // 自定义组件背景颜色
  textLetterSpacing?: number;         // 全局文字间距（字间距）
  textLineHeight?: number;            // 全局文字行高
}

const initialState: ConfigState = {
  warehouseName: '',
  backgroundImage: null,
  backgroundColor: '#ffffff',
  soldOutWatermark: '',
  paymentBackground: '',
  paymentSuccessImage: '',
  // 主题相关默认配置
  themeMode: 'light',
  customTextColor: undefined,
  customBackgroundColor: undefined,
  customComponentBackground: undefined,
  textLetterSpacing: 0,      // 默认正常字间距
  textLineHeight: 1.5,       // 默认正常行高
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setConfig(state, action: PayloadAction<Partial<ConfigState>>) {
      return { ...state, ...action.payload };
    },
    // 设置主题模式
    setThemeMode(state, action: PayloadAction<ThemeMode>) {
      state.themeMode = action.payload;
    },
    // 设置自定义颜色
    setCustomColors(state, action: PayloadAction<{
      textColor?: string;
      backgroundColor?: string;
      componentBackground?: string;
    }>) {
      if (action.payload.textColor !== undefined) {
        state.customTextColor = action.payload.textColor;
      }
      if (action.payload.backgroundColor !== undefined) {
        state.customBackgroundColor = action.payload.backgroundColor;
      }
      if (action.payload.componentBackground !== undefined) {
        state.customComponentBackground = action.payload.componentBackground;
      }
    },
    // 设置文字间距配置
    setTextSpacing(state, action: PayloadAction<{
      letterSpacing?: number;
      lineHeight?: number;
    }>) {
      if (action.payload.letterSpacing !== undefined) {
        state.textLetterSpacing = action.payload.letterSpacing;
      }
      if (action.payload.lineHeight !== undefined) {
        state.textLineHeight = action.payload.lineHeight;
      }
    },
  },
});

export const { 
  setConfig, 
  setThemeMode, 
  setCustomColors, 
  setTextSpacing 
} = configSlice.actions;
export const configReducer = configSlice.reducer;
