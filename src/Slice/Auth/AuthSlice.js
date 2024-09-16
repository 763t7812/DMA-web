// src/Slice/Auth/AuthSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  userId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
    clearAuthData: (state) => {
      state.token = null;
      state.userId = null;
    },
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;
export default authSlice.reducer;
