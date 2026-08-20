import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1, size = '24', color = 'Gold' } = action.payload;
      const existing = state.items.find(item =>
        (item.id && product.id ? item.id === product.id : item.title === product.title) &&
        item.size === size &&
        item.color === color
      );

      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ ...product, quantity, size, color });
      }
    },
    updateQuantity: (state, action) => {
      const { itemToUpdate, delta } = action.payload;
      const target = state.items.find(item =>
        (item.id && itemToUpdate.id)
          ? item.id === itemToUpdate.id && item.size === itemToUpdate.size && item.color === itemToUpdate.color
          : item.title === itemToUpdate.title && item.size === itemToUpdate.size && item.color === itemToUpdate.color
      );

      if (target) {
        target.quantity += delta;
      }
      state.items = state.items.filter(item => item.quantity > 0);
    },
    removeFromCart: (state, action) => {
      const { id, title, size, color } = action.payload;
      state.items = state.items.filter(item => !(
        (item.id && id ? item.id === id : item.title === title) &&
        item.size === size &&
        item.color === color
      ));
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) => state.cart.items.reduce((acc, item) => acc + item.quantity, 0);
export const selectCartSubtotal = (state) => state.cart.items.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0);

export default cartSlice.reducer;
