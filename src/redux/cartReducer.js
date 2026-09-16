import {
  CART_ADD_ITEM,
  CART_UPDATE_QUANTITY,
  CART_REMOVE_ITEM,
  CART_CLEAR,
} from './actionTypes.js';

const initialState = {
  items: [],
};

// Cart Reducer
export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case CART_ADD_ITEM: {
      const { product, quantity = 1, size = '24', color = 'Gold' } = action.payload || {};
      if (!product) return state;

      const existingIndex = state.items.findIndex(item =>
        (item.id && product.id ? item.id === product.id : item.title === product.title) &&
        item.size === size &&
        item.color === color
      );

      let updatedItems;
      if (existingIndex > -1) {
        updatedItems = state.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedItems = [...state.items, { ...product, quantity, size, color }];
      }

      return {
        ...state,
        items: updatedItems,
      };
    }

    case CART_UPDATE_QUANTITY: {
      const { itemToUpdate, delta } = action.payload || {};
      if (!itemToUpdate || typeof delta !== 'number') return state;

      const updatedItems = state.items
        .map(item => {
          const isMatch = (item.id && itemToUpdate.id)
            ? item.id === itemToUpdate.id && item.size === itemToUpdate.size && item.color === itemToUpdate.color
            : item.title === itemToUpdate.title && item.size === itemToUpdate.size && item.color === itemToUpdate.color;

          if (isMatch) {
            return { ...item, quantity: item.quantity + delta };
          }
          return item;
        })
        .filter(item => item.quantity > 0);

      return {
        ...state,
        items: updatedItems,
      };
    }

    case CART_REMOVE_ITEM: {
      const { id, title, size, color } = action.payload || {};
      const updatedItems = state.items.filter(item => !(
        (item.id && id ? item.id === id : item.title === title) &&
        item.size === size &&
        item.color === color
      ));

      return {
        ...state,
        items: updatedItems,
      };
    }

    case CART_CLEAR: {
      return {
        ...state,
        items: [],
      };
    }

    default:
      return state;
  }
}

// Action Creators
export const addToCart = (payload) => ({
  type: CART_ADD_ITEM,
  payload,
});

export const updateQuantity = (payload) => ({
  type: CART_UPDATE_QUANTITY,
  payload,
});

export const removeFromCart = (payload) => ({
  type: CART_REMOVE_ITEM,
  payload,
});

export const clearCart = () => ({
  type: CART_CLEAR,
});

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) => state.cart.items.reduce((acc, item) => acc + item.quantity, 0);
export const selectCartSubtotal = (state) => state.cart.items.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0);
