import {
  ORDERS_ADD,
  ORDERS_REMOVE,
  ORDERS_CANCEL,
} from '../actions/actionTypes.js';

const getInitialOrders = () => {
  try {
    const saved = localStorage.getItem('pkb_orders');
    const orders = saved ? JSON.parse(saved) : [];
    const cleaned = orders.filter(o => o.orderId !== '973675159' && o.id !== '973675159');
    if (orders.length !== cleaned.length) {
      localStorage.setItem('pkb_orders', JSON.stringify(cleaned));
    }
    return cleaned;
  } catch (e) {
    return [];
  }
};

const getInitialLatestOrder = () => {
  try {
    const saved = localStorage.getItem('pkb_latest_order');
    const order = saved ? JSON.parse(saved) : null;
    if (order && (order.orderId === '973675159' || order.id === '973675159')) {
      localStorage.removeItem('pkb_latest_order');
      return null;
    }
    return order;
  } catch (e) {
    return null;
  }
};

const initialState = {
  items: getInitialOrders(),
  latestOrder: getInitialLatestOrder(),
};

// Orders Reducer
export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case ORDERS_ADD: {
      let orderObj;
      if (Array.isArray(action.payload)) {
        const items = action.payload.map(item => ({
          ...item,
          id: item.id || Math.random().toString().substring(2, 11),
          status: 'active',
          date: new Date().toISOString(),
        }));
        orderObj = {
          orderId: Math.floor(100000000 + Math.random() * 900000000).toString(),
          items,
          status: 'active',
          date: new Date().toISOString(),
        };
      } else if (action.payload && typeof action.payload === 'object') {
        orderObj = {
          ...action.payload,
          orderId: action.payload.orderId || Math.floor(100000000 + Math.random() * 900000000).toString(),
          status: action.payload.status || 'active',
          date: action.payload.date || new Date().toISOString(),
        };
      }

      if (orderObj && orderObj.orderId !== '973675159' && orderObj.id !== '973675159') {
        const alreadyExists = state.items.some(
          o => (o.orderId && o.orderId === orderObj.orderId) || (o.id && o.id === orderObj.id)
        );

        const updatedItems = alreadyExists ? state.items : [orderObj, ...state.items];
        const updatedLatestOrder = orderObj;

        try {
          localStorage.setItem('pkb_orders', JSON.stringify(updatedItems));
          localStorage.setItem('pkb_latest_order', JSON.stringify(updatedLatestOrder));
        } catch (e) {
          console.error(e);
        }

        return {
          ...state,
          items: updatedItems,
          latestOrder: updatedLatestOrder,
        };
      }

      return state;
    }

    case ORDERS_REMOVE: {
      const targetId = action.payload;
      const updatedItems = state.items.filter(
        order => order.id !== targetId && order.orderId !== targetId
      );

      let updatedLatestOrder = state.latestOrder;
      if (state.latestOrder && (state.latestOrder.orderId === targetId || state.latestOrder.id === targetId)) {
        updatedLatestOrder = updatedItems[0] || null;
      }

      try {
        localStorage.setItem('pkb_orders', JSON.stringify(updatedItems));
        if (updatedLatestOrder) {
          localStorage.setItem('pkb_latest_order', JSON.stringify(updatedLatestOrder));
        } else {
          localStorage.removeItem('pkb_latest_order');
        }
      } catch (e) {
        console.error(e);
      }

      return {
        ...state,
        items: updatedItems,
        latestOrder: updatedLatestOrder,
      };
    }

    case ORDERS_CANCEL: {
      const targetId = action.payload;
      const updatedItems = state.items.map(order => {
        if (order.id === targetId || order.orderId === targetId) {
          return { ...order, status: 'cancelled' };
        }
        if (order.items && Array.isArray(order.items)) {
          const hasItem = order.items.some(i => i.id === targetId);
          if (hasItem) {
            return { ...order, status: 'cancelled' };
          }
        }
        return order;
      });

      let updatedLatestOrder = state.latestOrder;
      if (state.latestOrder && (state.latestOrder.orderId === targetId || state.latestOrder.id === targetId)) {
        updatedLatestOrder = { ...state.latestOrder, status: 'cancelled' };
      }

      try {
        localStorage.setItem('pkb_orders', JSON.stringify(updatedItems));
        if (updatedLatestOrder) {
          localStorage.setItem('pkb_latest_order', JSON.stringify(updatedLatestOrder));
        }
      } catch (e) {
        console.error(e);
      }

      return {
        ...state,
        items: updatedItems,
        latestOrder: updatedLatestOrder,
      };
    }

    default:
      return state;
  }
}

// Selectors
export const selectOrders = (state) => state?.orders?.items || [];
export const selectLatestOrder = (state) => state?.orders?.latestOrder || null;
