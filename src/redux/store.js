import { legacy_createStore as createStore, combineReducers } from 'redux';
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

let enhancer;
try {
  if (typeof window !== 'undefined' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'function') {
    const devtools = window.__REDUX_DEVTOOLS_EXTENSION__();
    if (typeof devtools === 'function') {
      enhancer = devtools;
    }
  }
} catch {
  enhancer = undefined;
}

export const store = enhancer
  ? createStore(rootReducer, enhancer)
  : createStore(rootReducer);

export default store;
