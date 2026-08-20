import { createSlice } from '@reduxjs/toolkit';

const getInitialAuth = () => {
  try {
    return localStorage.getItem('isLoggedIn') === 'true';
  } catch (e) {
    return false;
  }
};

const initialState = {
  isLoggedIn: getInitialAuth(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
      try {
        if (action.payload) {
          localStorage.setItem('isLoggedIn', 'true');
        } else {
          localStorage.removeItem('isLoggedIn');
        }
      } catch (e) {
        console.error(e);
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      try {
        localStorage.removeItem('isLoggedIn');
      } catch (e) {
        console.error(e);
      }
    },
  },
});

export const { setLoggedIn, logout } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export default authSlice.reducer;
