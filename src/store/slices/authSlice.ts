import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  token: string | null;
  warehouse_id: string | null;
  employee_id: string | null;
  employee_name: string | null;
  employee_role: string | null;
  phone: string | null;
}

const initialState: AuthState = {
  token: null,
  warehouse_id: null,
  employee_id: null,
  employee_name: null,
  employee_role: null,
  phone: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.token = action.payload.token;
      state.warehouse_id = action.payload.warehouse_id;
      state.employee_id = action.payload.employee_id;
      state.employee_name = action.payload.employee_name;
      state.employee_role = action.payload.employee_role;
      state.phone = action.payload.phone;
    },
    clearCredentials(state) {
      state.token = null;
      state.warehouse_id = null;
      state.employee_id = null;
      state.employee_name = null;
      state.employee_role = null;
      state.phone = null;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export const authReducer = authSlice.reducer;
