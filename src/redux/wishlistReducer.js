import {
  WISHLIST_TOGGLE,
  WISHLIST_ADD,
  WISHLIST_REMOVE,
} from './actionTypes.js';
import product1Img from '../assets/shop/product1.jpg';
import prod2Img from '../assets/shop/e6d33d54f4b94cee7f7fa20b4b7d7c16f7b1464d.png';

const defaultWishlist = [
  { id: 101, image: product1Img, title: 'Gold Eternity Bangle', price: '3710', oldPrice: '5000', category: 'Girls Collections' },
  { id: 102, image: prod2Img, title: 'Three Stone Ring', price: '2710', oldPrice: '4000', category: 'Boys Collections' },
  { id: 103, image: product1Img, title: 'Gem Stone Earrings', price: '3710', oldPrice: '4000', category: 'Just Born Collections' },
  { id: 104, image: prod2Img, title: 'Diamond Bracelet', price: '6710', oldPrice: '8000', category: 'Girls Collections' },
  { id: 105, image: product1Img, title: 'Gold Crown Bangle', price: '5710', oldPrice: '7000', category: 'Boys Collections' },
];

const getInitialWishlist = () => {
  try {
    const saved = localStorage.getItem('userWishlist');
    return saved ? JSON.parse(saved) : defaultWishlist;
  } catch {
    return defaultWishlist;
  }
};

const initialState = {
  items: getInitialWishlist(),
};

// Wishlist Reducer
export default function wishlistReducer(state = initialState, action) {
  switch (action.type) {
    case WISHLIST_TOGGLE: {
      const product = action.payload;
      if (!product) return state;

      const exists = state.items.some(item =>
        item.id && product.id ? item.id === product.id : item.title === product.title
      );

      const updatedItems = exists
        ? state.items.filter(item =>
            !(item.id && product.id ? item.id === product.id : item.title === product.title)
          )
        : [...state.items, product];

      try {
        localStorage.setItem('userWishlist', JSON.stringify(updatedItems));
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('wishlistUpdated'));
        }
      } catch (e) {
        console.error(e);
      }

      return {
        ...state,
        items: updatedItems,
      };
    }

    case WISHLIST_ADD: {
      const product = action.payload;
      if (!product) return state;

      const exists = state.items.some(item =>
        item.id && product.id ? item.id === product.id : item.title === product.title
      );

      if (exists) return state;

      const updatedItems = [...state.items, product];
      try {
        localStorage.setItem('userWishlist', JSON.stringify(updatedItems));
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('wishlistUpdated'));
        }
      } catch (e) {
        console.error(e);
      }

      return {
        ...state,
        items: updatedItems,
      };
    }

    case WISHLIST_REMOVE: {
      const product = action.payload;
      if (!product) return state;

      const updatedItems = state.items.filter(item =>
        !(item.id && product.id ? item.id === product.id : item.title === product.title)
      );

      try {
        localStorage.setItem('userWishlist', JSON.stringify(updatedItems));
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('wishlistUpdated'));
        }
      } catch (e) {
        console.error(e);
      }

      return {
        ...state,
        items: updatedItems,
      };
    }

    default:
      return state;
  }
}

// Action Creators
export const toggleWishlist = (payload) => ({
  type: WISHLIST_TOGGLE,
  payload,
});

export const addToWishlist = (payload) => ({
  type: WISHLIST_ADD,
  payload,
});

export const removeFromWishlist = (payload) => ({
  type: WISHLIST_REMOVE,
  payload,
});

// Selectors
export const selectWishlistItems = (state) => state.wishlist.items;
export const selectWishlistCount = (state) => state.wishlist.items.length;
