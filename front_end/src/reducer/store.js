// store.js
import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './SessionSlice';

const store = configureStore({
  reducer: {
    session: sessionReducer,
  },
});

export default store;
