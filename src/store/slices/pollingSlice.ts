import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PollingState {
  isRunning: boolean;
  isAuthenticated: boolean; // 用户是否已登录
  lastPollTime: number | null; // 上次轮询时间
  errorCount: number; // 连续错误次数
  lastError: string | null; // 最后一次错误信息
}

const initialState: PollingState = {
  isRunning: false,
  isAuthenticated: false,
  lastPollTime: null,
  errorCount: 0,
  lastError: null,
};

const pollingSlice = createSlice({
  name: 'polling',
  initialState,
  reducers: {
    setPollingRunning(state, action: PayloadAction<boolean>) {
      state.isRunning = action.payload;
    },
    setPollingAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
      // 登出时重置轮询状态
      if (!action.payload) {
        state.isRunning = false;
        state.lastPollTime = null;
        state.errorCount = 0;
        state.lastError = null;
      }
    },
    updatePollStatus(state, action: PayloadAction<{ success: boolean; error?: string }>) {
      state.lastPollTime = Date.now();
      if (action.payload.success) {
        state.errorCount = 0;
        state.lastError = null;
      } else {
        state.errorCount += 1;
        state.lastError = action.payload.error || '未知错误';
      }
    },
    resetPollingState(state) {
      state.isRunning = false;
      state.lastPollTime = null;
      state.errorCount = 0;
      state.lastError = null;
    },
  },
});

export const { 
  setPollingRunning, 
  setPollingAuthenticated,
  updatePollStatus,
  resetPollingState,
} = pollingSlice.actions;
export const pollingReducer = pollingSlice.reducer;
