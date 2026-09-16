import {
  WISHLIST_TOGGLE,
  WISHLIST_ADD,
  WISHLIST_REMOVE,
} from './actionTypes.js';

// Action Creators for Wishlist
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
