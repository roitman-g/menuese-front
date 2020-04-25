import { configureStore, combineReducers } from '@reduxjs/toolkit';
import restaurantsSlice from './restaurantsSlice';
import dishesSlice from './dishesSlice';
import customerSlice from './customerSlice';

export default configureStore({
  reducer: {
    restaurants: restaurantsSlice,
    dishes: dishesSlice, 
    customer: customerSlice
  },
});
