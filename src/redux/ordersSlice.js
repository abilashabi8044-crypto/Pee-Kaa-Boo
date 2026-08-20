import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrders: (state, action) => {
      // action.payload is array of cart items to turn into orders
      const newOrders = action.payload.map(item => ({
        ...item,
        id: item.id || Math.random().toString().substring(2, 11),
        status: 'active',
        date: new Date().toISOString()
      }));
      state.items.push(...newOrders);
    },
    cancelOrder: (state, action) => {
      const order = state.items.find(o => o.id === action.payload);
      if (order) {
        order.status = 'cancelled';
      }
    },
  },
});

export const { addOrders, cancelOrder } = ordersSlice.actions;

export const selectOrders = (state) => state.orders.items;

export default ordersSlice.reducer;
