import React from "react";
import "./Dish.scss";
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {dishesSelector} from '../../../app/dishesSlice'
import {orderedDishesSelector, postOrderedDish, orderingSelector, deleteOrderedDish } from '../../../app/customerSlice'

function Dish(props) {
  const {postOrderedDish, dishes, ordering, deleteOrderedDish, orderedDishes, id} = props
  const orderedDish = orderedDishes.find(d => id == d.dish)


  return (
    <div id="menu-item-container">
      <div id="image"></div>  
      <div id="title">{props.title}</div>
      <div id="description">{props.description}</div>
      <div id="price">{"$" + props.price}</div>
      <button onClick={() => (ordering && postOrderedDish(ordering, props.id))} id="add">+</button>| <button onClick={() => (ordering && deleteOrderedDish(orderedDish.id))}>-</button>
    </div>
  );
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({
    postOrderedDish, 
    deleteOrderedDish
  }, dispatch)
}

function mapStateToProps(store, ownProps) {
  return {
      dishes: dishesSelector(store, ownProps),
      orderedDishes: orderedDishesSelector(store, ownProps),
      ordering: orderingSelector(store, ownProps), 
      // restaurant: restaurantSelector(store, ownProps)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dish)


