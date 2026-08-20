import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import wishlistReducer from './wishlistSlice';
import ordersReducer from './ordersSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    orders: ordersReducer,
    auth: authReducer,
  },
});
