import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderData: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderData: (state, action) => {
      state.orderData = action.payload;
    },
    clearOrderData: (state) => {
      state.orderData = null;
    },
  },
});

export const { setOrderData, clearOrderData } = orderSlice.actions;

export default orderSlice.reducer;
