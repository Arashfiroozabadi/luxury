import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';


const middlewares = [thunk];

const initialState = {
  lastUpdate: 0,
  light: false,
  theme: false,
  count: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'product':
      return {
        data: action.data,

      };
    case 'changeTheme':
      return {
        theme: action.theme,
      };
    default:
      return state;
  }
};

const store = (preloadedState = initialState) => {
  const dev = process.env.NODE_ENV;
  if (dev === 'production') {
    return createStore(
      reducer,
      preloadedState,
      applyMiddleware(...middlewares),
    );
  }
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );
};

export default store;
