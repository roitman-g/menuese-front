import React  from "react";
import "./Cart.scss";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function Cart(props) {
  const {orderedDishes, dishes } = props

  const neededDish = (dishes, dishId) => dishes.find(d => d.id == dishId)
  return ( 
    <div id="cart-container">
      <div id="restaurant-info">
        <div id="title">{props.title}</div>
        <div id="address">{props.address}</div>
        <div id="category">{props.category}</div>
      </div>

      <ul id="cart-list">
      {orderedDishes.map((c) => {

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
