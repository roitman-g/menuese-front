import React from "react";
import "./Dish.scss";

export default function Dish(props) {
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

