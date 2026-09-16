// Action Types for Redux Store

// Cart Action Types
export const CART_ADD_ITEM = 'cart/addToCart';
export const CART_UPDATE_QUANTITY = 'cart/updateQuantity';
export const CART_REMOVE_ITEM = 'cart/removeFromCart';
export const CART_CLEAR = 'cart/clearCart';

// Wishlist Action Types
export const WISHLIST_TOGGLE = 'wishlist/toggleWishlist';
export const WISHLIST_ADD = 'wishlist/addToWishlist';
export const WISHLIST_REMOVE = 'wishlist/removeFromWishlist';

// Orders Action Types
export const ORDERS_ADD = 'orders/addOrders';
export const ORDERS_REMOVE = 'orders/removeOrder';
export const ORDERS_CANCEL = 'orders/cancelOrder';

// Auth Action Types
export const AUTH_SET_LOGGED_IN = 'auth/setLoggedIn';
export const AUTH_LOGOUT = 'auth/logout';
