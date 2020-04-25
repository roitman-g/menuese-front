import { createSlice } from '@reduxjs/toolkit';
import { fetchResourse as fetching } from '../utils.js';
import { useDispatch, useSelector } from 'react-redux';

export const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState: {
    restaurants: [],
    restaurant: {name: '', address: '', description: ''},
  },
  reducers: {
    newRestaurants: (state, action) => ({...state, restaurants: [...action.payload]}),
    addRestaurant: (state, action) => ({...state, restaurants: [...state.restaurants, action.payload]}), 
    _setRestaurant: (state, action) => {

        return {...state, restaurant: [...state.restaurants].find(r => r.id == action.payload)}
    }
  },
});

const { newRestaurants, addRestaurant, _setRestaurant } = restaurantsSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const postRestaurant = restaurant => dispatch => {

    fetching('restaurants', 'POST', (r) => dispatch(addRestaurant(r)), restaurant)
}

export const getRestaurants = () => dispatch => {
    return fetching('restaurants', 'GET', (r) => dispatch(newRestaurants(r)))
}

export const setRestaurant = (id) => dispatch => {
    return fetching('restaurants', 'GET', (r) => dispatch(newRestaurants(r))).then(() => dispatch(_setRestaurant(id)))
}


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
const mainSelector = state => {

    return state.restaurants
} 

export const restaurantsSelector = state => mainSelector(state).restaurants;
export const restaurantSelector = state => mainSelector(state).restaurant

export default restaurantsSlice.reducer;
