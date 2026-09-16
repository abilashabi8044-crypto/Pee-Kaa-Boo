import {
  CART_ADD_ITEM,
  CART_UPDATE_QUANTITY,
  CART_REMOVE_ITEM,
  CART_CLEAR,
} from './actionTypes.js';

// Action Creators for Cart
export const addToCart = (productOrPayload, quantity = 1, size = '24', color = 'Gold') => {
  if (productOrPayload && typeof productOrPayload === 'object' && productOrPayload.product) {
    return {
      type: CART_ADD_ITEM,
      payload: productOrPayload,
    };
  }
  return {
    type: CART_ADD_ITEM,
    payload: {
      product: productOrPayload,
      quantity: typeof quantity === 'number' ? quantity : 1,
      size: size || productOrPayload?.size || '24',
      color: color || productOrPayload?.color || 'Gold',
    },
  };
};

export const updateQuantity = (itemOrPayload, delta) => {
  if (itemOrPayload && typeof itemOrPayload === 'object' && 'itemToUpdate' in itemOrPayload) {
    return {
      type: CART_UPDATE_QUANTITY,
      payload: itemOrPayload,
    };
  }
  return {
    type: CART_UPDATE_QUANTITY,
    payload: {
      itemToUpdate: itemOrPayload,
      delta: typeof delta === 'number' ? delta : (itemOrPayload?.delta || 0),
    },
  };
};

export const removeFromCart = (payload) => ({
  type: CART_REMOVE_ITEM,
  payload,
});

export const clearCart = () => ({
  type: CART_CLEAR,
});
