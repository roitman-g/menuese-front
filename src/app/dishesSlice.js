import { createSlice } from '@reduxjs/toolkit';
import { fetchResourse as fetching } from '../utils.js';

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState: {
    dishes: [],
    restaurant: {name: '', address: '', description: ''},
  },
  reducers: {
    setRestaurant: (state, action) => ({...state, restaurant: action}),
    newDishes: (state, action) => ({...state, dishes: [...action.payload]}),
    addDishes: (state, action) => ({...state, dishes: [...state.dishes, ...action.payload]})
  }
});

export const { newDishes, addDishes } = dishesSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getDishes = restaurantId => dispatch => {

    fetching(`dishes`, 'GET', (r) => dispatch(newDishes(r)), {restaurant: restaurantId})
}

export const postDish = (restaurantId, dish) => dispatch => {

    fetching('dishes', 'POST', (r) => dispatch(addDishes([r])), {...dish, restaurant: restaurantId})
}


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
const mainSelector = state => {

    return state.dishes
} 

// const mainSelector = state =>  {
//     console.log('here are restaurants in selecror', state.restaurants)
//     return state.restaurants
// }

// export const restaurantsSelector = state => mainSelector(state).restaurants;

export const dishesSelector = state => mainSelector(state).dishes;

export default dishesSlice.reducer;
