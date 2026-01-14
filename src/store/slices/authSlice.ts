import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  token: string | null;
  storeId: string | null;
  employeeId: string | null;
}

const initialState: AuthState = {
  token: null,
  storeId: null,
  employeeId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.token = action.payload.token;
      state.storeId = action.payload.storeId;
      state.employeeId = action.payload.employeeId;
    },
    clearCredentials(state) {
      state.token = null;
      state.storeId = null;
      state.employeeId = null;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export const authReducer = authSlice.reducer;
