import { createSlice } from '@reduxjs/toolkit';
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
  } catch (e) {
    return defaultWishlist;
  }
};

const initialState = {
  items: getInitialWishlist(),
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.items.some(item =>
        item.id && product.id ? item.id === product.id : item.title === product.title
      );

      if (exists) {
        state.items = state.items.filter(item =>
          !(item.id && product.id ? item.id === product.id : item.title === product.title)
        );
      } else {
        state.items.push(product);
      }

      try {
        localStorage.setItem('userWishlist', JSON.stringify(state.items));
        window.dispatchEvent(new Event('wishlistUpdated'));
      } catch (e) {
        console.error(e);
      }
    },
    addToWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.items.some(item =>
        item.id && product.id ? item.id === product.id : item.title === product.title
      );

      if (!exists) {
        state.items.push(product);
        try {
          localStorage.setItem('userWishlist', JSON.stringify(state.items));
          window.dispatchEvent(new Event('wishlistUpdated'));
        } catch (e) {
          console.error(e);
        }
      }
    },
    removeFromWishlist: (state, action) => {
      const product = action.payload;
      state.items = state.items.filter(item =>
        !(item.id && product.id ? item.id === product.id : item.title === product.title)
      );

      try {
        localStorage.setItem('userWishlist', JSON.stringify(state.items));
        window.dispatchEvent(new Event('wishlistUpdated'));
      } catch (e) {
        console.error(e);
      }
    },
  },
});

export const { toggleWishlist, addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export const selectWishlistItems = (state) => state.wishlist.items;
export const selectWishlistCount = (state) => state.wishlist.items.length;

export default wishlistSlice.reducer;
