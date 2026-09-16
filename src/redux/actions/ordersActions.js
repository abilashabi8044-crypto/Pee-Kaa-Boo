import {
  ORDERS_ADD,
  ORDERS_REMOVE,
  ORDERS_CANCEL,
} from './actionTypes.js';

// Action Creators for Orders
export const addOrders = (payload) => ({
  type: ORDERS_ADD,
  payload,
});

export const removeOrder = (payload) => ({
  type: ORDERS_REMOVE,
  payload,
});

export const cancelOrder = (payload) => ({
  type: ORDERS_CANCEL,
  payload,
});
