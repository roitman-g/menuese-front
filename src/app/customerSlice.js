import { createSlice } from '@reduxjs/toolkit';
import { fetchResourse as fetching } from '../utils.js';

export const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    customer:{ 
            id: localStorage.getItem('id'),
            username: localStorage.getItem('username')},
    orderedDishes: [], 
    ordering: null,
       
  },
  reducers: {
    setCustomer: (state, action) => {
        localStorage.setItem('username', action.payload.username)
        localStorage.setItem('id', action.payload.id)
        return ({...state, customer: {...action.payload}})
    },
    setOrdering: (state, action) => ({...state, ordering: action.payload}),
    addOrderedDishes: (state, action) => ({...state, orderedDishes: [...state.orderedDishes, action.payload]}),
    newOrderedDishes: (state, action) => ({...state, orderedDishes: [...action.payload]})
  }
});

export const { setCustomer, addOrderedDishes, newOrderedDishes, setOrdering } = customerSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getCustomer = customer => dispatch => {

    return fetching('customers', 'GET', (r) => dispatch(setCustomer(r[0])))
}

export const postCustomer = customer => dispatch => {
    return fetching('customers', 'POST', (r) => dispatch(setCustomer(r)), {username: customer.username})
}

export const postOrderedDish = (ordering, dish) => dispatch => {
    return fetching('orderedDishes', 'POST', (r) => dispatch(addOrderedDishes(r)), {ordering, dish})
}

export const getOrderedDishes = ordering => dispatch => {
    return fetching('orderedDishes', 'GET', (r) => dispatch(newOrderedDishes(r)), {ordering})
}

export const deleteOrderedDish = id => dispatch => {
    return fetching('orderedDishes', 'DELETE', (r) => dispatch(deleteOrderedDish(r)), {id})
}

export const postOrdering = (customer, restaurant, place) => dispatch => {
    return fetching('orders', 'POST', (r) => dispatch(setOrdering(r.id)), {customer, restaurant, place})
}

export const getOrdering = (customer, restaurant ) => dispatch => {
    return fetching('orders', 'GET', (r) => dispatch(setOrdering(r[0].id)), {customer, restaurant, status: 'active'})
}

export const changeOrdering = (id, ordering) => dispatch => {
    return fetching('orders', 'PUT', (r) => dispatch(setOrdering(null), {id, ...ordering}))
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
const mainSelector = state => {

    return state.customer
} 

// const mainSelector = state =>  {
//     console.log('here are restaurants in selecror', state.restaurants)
//     return state.restaurants
// }

// export const restaurantsSelector = state => mainSelector(state).restaurants;

export const customerSelector = state => mainSelector(state).customer;
export const orderingSelector = state => mainSelector(state).ordering;
export const orderedDishesSelector = state => mainSelector(state).orderedDishes;
export const countDishes = (dishes, dishId) => dishes.filter(d => dishId == d.id)


export default customerSlice.reducer;
