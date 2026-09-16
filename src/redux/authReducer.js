import {
  AUTH_SET_LOGGED_IN,
  AUTH_LOGOUT,
} from './actionTypes.js';

const getInitialAuth = () => {
  try {
    return localStorage.getItem('isLoggedIn') === 'true';
  } catch {
    return false;
  }
};

const initialState = {
  isLoggedIn: getInitialAuth(),
};

// Auth Reducer
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SET_LOGGED_IN: {
      const isLoggedIn = Boolean(action.payload);
      try {
        if (isLoggedIn) {
          localStorage.setItem('isLoggedIn', 'true');
        } else {
          localStorage.removeItem('isLoggedIn');
        }
      } catch (e) {
        console.error(e);
      }

      return {
        ...state,
        isLoggedIn,
      };
    }

    case AUTH_LOGOUT: {
      try {
        localStorage.removeItem('isLoggedIn');
      } catch (e) {
        console.error(e);
      }

      return {
        ...state,
        isLoggedIn: false,
      };
    }

    default:
      return state;
  }
}

// Action Creators
export const setLoggedIn = (payload) => ({
  type: AUTH_SET_LOGGED_IN,
  payload,
});

export const logout = () => ({
  type: AUTH_LOGOUT,
});

// Selectors
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
