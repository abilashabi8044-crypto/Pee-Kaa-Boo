// Re-export from cartReducer for backward compatibility
export {
  default,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  selectCartItems,
  selectCartCount,
  selectCartSubtotal,
} from './cartReducer.js';
