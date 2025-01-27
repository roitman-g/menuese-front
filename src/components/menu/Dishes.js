import React, {useEffect, useState}from "react";
import "./Dishes.scss";
import Dish from "./dish/Dish";
import Modal from '../../shared/entity/Entity'

const places = [1, 2, 3, 4, 5 , 6, 7]

export default function Dishes(props) {
  const { dishes, location, getDishes, postDish, restaurant, setRestaurant, getOrdering, customer, ordering, postOrdering} = props
  const restaurantId = location.pathname.split('/').reverse()[0]
  const [isSet, set] = useState(false)
  
  useEffect(() => {
      setRestaurant(restaurantId).then(() => getOrdering(customer.id, restaurantId)).then(() => set(true))
      getDishes(restaurantId); 
    })
  const [showModal, setShowModal] = useState(false)
  

  const fields = {name: {}, description: {}, price: {type: 'number'}}

  return isSet && (
    <div id="menu-container">
      <div style={{'font-size': '60px'}}>{restaurant.name}</div>
      <div id="restaurant-info">
        <div id="title">{props.title}</div>
        <div id="address">{props.address}</div> 
        <div id="category">{props.category}</div>
      </div>
      <div id="menu-items-container">
        {dishes.map((dish) => <Dish {...dish}/>)}
      </div>
      {!ordering && <button onClick = {() => postOrdering(customer.id, restaurantId, places[0])}>Start order</button>}
      {!showModal && <button onClick={() => setShowModal(true)}>Add dish</button>}
      {showModal && <Modal setShowModal={setShowModal} submitEntity={(dish) => postDish(restaurantId, dish)} fields={fields}/>}
    </div>
  );
}