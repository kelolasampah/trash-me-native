import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import { configureStore } from '@reduxjs/toolkit'

import cartItems from '../reducers/cartItem';

// const reducers = combineReducers({
//   cartItems: cartItems,
// });

// const store = createStore(
//   reducers,
//   composeWithDevTools(applyMiddleware(thunkMiddleware)),
// );

const store = configureStore({
    reducer: {
      cartItems: cartItems
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      //immutableCheck: false,
      //serializableCheck: false,
    })
  })

export default store;
