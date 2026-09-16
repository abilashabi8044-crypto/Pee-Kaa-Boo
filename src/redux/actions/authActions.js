import {
  AUTH_SET_LOGGED_IN,
  AUTH_LOGOUT,
} from './actionTypes.js';

// Action Creators for Auth
export const setLoggedIn = (payload) => ({
  type: AUTH_SET_LOGGED_IN,
  payload,
});

export const logout = () => ({
  type: AUTH_LOGOUT,
});
