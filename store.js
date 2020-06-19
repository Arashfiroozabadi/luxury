import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';


const middlewares = [thunk];

const initialState = {
  lastUpdate: 0,
  light: false,
  theme: false,
  auth: { auth: false },
  count: 0,
  err: {
    err: false, msg: '',
  },
  loginForm: {
    userName: '',
    password: '',
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'product':
      return {
        ...state,
        data: action.data,

      };
    case 'changeTheme':
      return {
        ...state,
        theme: action.theme,
      };
    case 'authStatus':
      return {
        ...state,
        auth: action.auth,
      };
    case 'err':
      return {
        ...state,
        err: action.err,
      };
    case 'login':
      return {
        ...state,
        loginForm: action.loginForm,
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
