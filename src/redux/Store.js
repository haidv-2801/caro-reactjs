import { configureStore } from '@reduxjs/toolkit';
import reducer from './slices/CaroSlice';

const rootReducer = {
  caro: reducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
