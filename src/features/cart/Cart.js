import React, {useEffect} from "react";
import "./Cart.scss";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {orderedDishesSelector, orderingSelector, getOrderedDishes} from "../../app/customerSlice";
import {dishesSelector, getDishes} from '../../app/dishesSlice'
import {restaurantSelector} from '../../app/restaurantsSlice'

function Cart(props) {
  const {orderedDishes, dishes, ordering, getOrderedDishes, restaurant} = props

  useEffect(() => {getOrderedDishes(ordering)
                    getDishes(restaurant.id)}, [])
  const countDishes = (list, dish) => list.filter(d => dish == d.id).length
  const byDish = dishes => dishes.reduce((acc, curr) => ({...acc, [curr.dish]: curr}), {})
  let byDishOrdered = byDish(orderedDishes)
  for (let dish in byDishOrdered) {
    const count = orderedDishes.filter(d => dish == d.dish).length
    const d = dishes.find(d => d.id == dish)
    byDishOrdered = {...byDishOrdered, [dish]:{...byDishOrdered[dish], price:d.price, count, name: d.name}}
  }
  const check = Object.keys(byDishOrdered).map(dish => byDishOrdered[dish])
  const neededDish = (dishes, dishId) => dishes.find(d => d.id == dishId)
  return ( 
    <div id="cart-container">
      <div id="restaurant-info">
        <div id="title">{props.title}</div>
        <div id="address">{props.address}</div>
        <div id="category">{props.category}</div>
      </div>

      <ul id="cart-list">
      {check.map((c) => {

        const dish = neededDish(dishes, c.id)

        return (<li>
                       <  div class="count">{c.count}<ExpandMoreIcon/></div>
                         <div class="title">{c.name}</div>
                          <div class="price">${c.price}</div>
                      </li>)
      })}
      </ul>
      <button id="cart-submit">Place Order</button>
      
    </div>
  );
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({
    getOrderedDishes
  }, dispatch)
}

function mapStateToProps(store, ownProps) {
  return {
    ordering: orderingSelector(store, ownProps),
      dishes: dishesSelector(store, ownProps),
      orderedDishes: orderedDishesSelector(store, ownProps),
      restaurant: restaurantSelector(store, ownProps)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
