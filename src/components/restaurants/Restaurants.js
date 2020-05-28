import React from "react";
import "./Restaurants.scss";
import Restaurant from "./restaurant/Restaurant";
import { NavLink} from 'react-router-dom';
import { useState } from 'react'
import Modal from '../../shared/entity/Entity'


export default function Restaurants({restaurants, postRestaurant}) {

  const fields = {name: {}, address: {}, description: {}}

  const [showModal, setShowModal] = useState(false)
  
  return false && (
    <div>
      {/* <button onClick={() => postRestaurant({name: 'Black Iris', description:'Some sushi restaurant', address: 'Gainasborough'})}>Add restaurant</button> */}
      <div id="restaurants-container">
          {restaurants.map((card) => <NavLink to={`/menu/${card.id}`}>
                                    <Restaurant {...card}/>
                              </NavLink>
                      )
        }
      </div>
      {showModal && <Modal setShowModal={setShowModal} submitEntity={postRestaurant} fields={fields}/>}
      <button onClick={() => setShowModal(true)}>Add restaurant</button>
    </div>
    
  );
}
