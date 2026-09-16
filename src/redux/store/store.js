import { legacy_createStore as createStore, compose } from 'redux';
import rootReducer from '../reducers/index.js';

export { rootReducer };

const composeEnhancers =
  (typeof window !== 'undefined' &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })) ||
  compose;

let enhancer;
try {
  if (typeof window !== 'undefined' && typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
    enhancer = composeEnhancers();
  } else if (typeof window !== 'undefined' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'function') {
    const devtools = window.__REDUX_DEVTOOLS_EXTENSION__();
    if (typeof devtools === 'function') {
      enhancer = devtools;
    }
  }
} catch {
  enhancer = undefined;
}

export const store = enhancer
  ? createStore(rootReducer, enhancer)
  : createStore(rootReducer);

export default store;
