import React from "react";
import "./Restaurants.scss";
import Restaurant from "./restaurant/Restaurant";
import { connect } from "react-redux";
import { bindActionCreators} from 'redux';
import { NavLink, Link } from 'react-router-dom';
import { restaurantsSelector, addRestaurants, getRestaurants, postRestaurant } from '../../app/restaurantsSlice';
import { useEffect, useState } from 'react'
import Modal from '../modal/Modal'


function Restaurants(props) {
  const { restaurants, addRestaurants, getRestaurants, postRestaurant, getOrdering } = props
  const fields = {name: {}, address: {}, description: {}}

  const [showModal, setShowModal] = useState(false)
  
  useEffect(() => {
    getRestaurants()

  }, [])


  
  return (
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

function mapDispatchToProps(dispatch) {

  return bindActionCreators({
      getRestaurants,
      postRestaurant, 
  }, dispatch)
}

function mapStateToProps(store, ownProps) {
  return {
      restaurants: restaurantsSelector(store, ownProps),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants)
