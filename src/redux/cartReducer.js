import {
  CART_ADD_ITEM,
  CART_UPDATE_QUANTITY,
  CART_REMOVE_ITEM,
  CART_CLEAR,
} from './actionTypes.js';

const getInitialCart = () => {
  try {
    const saved = localStorage.getItem('pkb_cart') || localStorage.getItem('userCart');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveCartToStorage = (items) => {
  try {
    localStorage.setItem('pkb_cart', JSON.stringify(items));
    localStorage.setItem('userCart', JSON.stringify(items));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('cartUpdated'));
    }
  } catch (e) {
    console.error(e);
  }
};

const initialState = {
  items: getInitialCart(),
};

// Cart Reducer
export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case CART_ADD_ITEM: {
      const payload = action.payload;
      if (!payload) return state;

      // Extract product whether payload is { product, quantity, size, color } or product object itself
      const product = (payload.product && typeof payload.product === 'object') ? payload.product : payload;
      if (!product || (!product.id && !product.title && !product.name)) return state;

      const quantity = typeof payload.quantity === 'number'
        ? payload.quantity
        : (typeof payload.qty === 'number'
            ? payload.qty
            : (typeof product.quantity === 'number' ? product.quantity : 1));

      const size = payload.size || product.size || '24';
      const color = payload.color || product.color || 'Gold';

      const productId = product.id ?? product._id;
      const productTitle = product.title || product.name;

      const existingIndex = state.items.findIndex(item => {
        const itemId = item.id ?? item._id;
        const itemTitle = item.title || item.name;
        const sameIdOrTitle = (itemId != null && productId != null)
          ? String(itemId) === String(productId)
          : itemTitle === productTitle;

        const sameSize = size && item.size ? item.size === size : true;
        const sameColor = color && item.color ? item.color === color : true;

        return sameIdOrTitle && sameSize && sameColor;
      });

      let updatedItems;
      if (existingIndex > -1) {
        updatedItems = state.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: (item.quantity || 1) + quantity }
            : item
        );
      } else {
        const itemToAdd = {
          ...product,
          quantity,
          size,
          color,
        };
        updatedItems = [...state.items, itemToAdd];
      }

      saveCartToStorage(updatedItems);

      return {
        ...state,
        items: updatedItems,
      };
    }

    case CART_UPDATE_QUANTITY: {
      const payload = action.payload;
      if (!payload) return state;

      const itemToUpdate = payload.itemToUpdate || payload.item || (typeof payload === 'object' && ('id' in payload || 'title' in payload) ? payload : null);
      const delta = typeof payload.delta === 'number'
        ? payload.delta
        : (typeof payload.quantity === 'number' ? payload.quantity : (typeof payload === 'number' ? payload : 0));

      if (!itemToUpdate || typeof delta !== 'number') return state;

      const targetId = itemToUpdate.id ?? itemToUpdate._id;
      const targetTitle = itemToUpdate.title || itemToUpdate.name;

      const updatedItems = state.items
        .map(item => {
          const itemId = item.id ?? item._id;
          const itemTitle = item.title || item.name;

          const isMatch = (targetId != null && itemId != null)
            ? String(itemId) === String(targetId)
            : itemTitle === targetTitle;

          const sizeMatch = itemToUpdate.size && item.size ? item.size === itemToUpdate.size : true;
          const colorMatch = itemToUpdate.color && item.color ? item.color === itemToUpdate.color : true;

          if (isMatch && sizeMatch && colorMatch) {
            return { ...item, quantity: (item.quantity || 1) + delta };
          }
          return item;
        })
        .filter(item => (item.quantity || 0) > 0);

      saveCartToStorage(updatedItems);

      return {
        ...state,
        items: updatedItems,
      };
    }

    case CART_REMOVE_ITEM: {
      const payload = action.payload;
      if (payload == null) return state;

      const targetId = typeof payload === 'object' ? (payload.id ?? payload._id) : payload;
      const targetTitle = typeof payload === 'object' ? (payload.title || payload.name) : null;
      const targetSize = typeof payload === 'object' ? payload.size : null;
      const targetColor = typeof payload === 'object' ? payload.color : null;

      const updatedItems = state.items.filter(item => {
        const itemId = item.id ?? item._id;
        const itemTitle = item.title || item.name;

        const isMatch = (targetId != null && itemId != null)
          ? String(itemId) === String(targetId)
          : (targetTitle && itemTitle ? itemTitle === targetTitle : false);

        if (!isMatch) return true;

        if (targetSize && item.size && item.size !== targetSize) return true;
        if (targetColor && item.color && item.color !== targetColor) return true;

        return false;
      });

      saveCartToStorage(updatedItems);

      return {
        ...state,
        items: updatedItems,
      };
    }

    case CART_CLEAR: {
      saveCartToStorage([]);
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

// Selectors
export const selectCartItems = (state) => state?.cart?.items || [];
export const selectCartCount = (state) => (state?.cart?.items || []).reduce((acc, item) => acc + (item.quantity || 1), 0);
export const selectCartSubtotal = (state) => (state?.cart?.items || []).reduce((acc, item) => acc + ((parseFloat(item.price) || 0) * (item.quantity || 1)), 0);
