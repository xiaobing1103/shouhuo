import { createSlice } from '@reduxjs/toolkit';

export interface PollingState {
  isRunning: boolean;
}

const initialState: PollingState = {
  isRunning: false,
};

const pollingSlice = createSlice({
  name: 'polling',
  initialState,
  reducers: {
    setPollingRunning(state, action) {
      state.isRunning = action.payload;
    },
  },
});

export const { setPollingRunning } = pollingSlice.actions;
export const pollingReducer = pollingSlice.reducer;
