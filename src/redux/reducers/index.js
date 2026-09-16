import { combineReducers } from 'redux';
import cartReducer from './cartReducer.js';
import wishlistReducer from './wishlistReducer.js';
import ordersReducer from './ordersReducer.js';
import authReducer from './authReducer.js';

export const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
  orders: ordersReducer,
  auth: authReducer,
});

export default rootReducer;

export {
  cartReducer,
  wishlistReducer,
  ordersReducer,
  authReducer,
};
