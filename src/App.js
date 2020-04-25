import React, {useEffect} from 'react';

import Restaurants from "./features/restaurants/Restaurants";
import RestaurantMenu from "./features/menu/Dishes";
import AppNav from "./features/navbar/AppNav";
import Cart from "./features/cart/Cart";
import {HashRouter as Router, Route} from 'react-router-dom';
import {customerSelector, getCustomer, postCustomer} from './app/customerSlice'
import Modal from './features/modal/Modal'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';


function App(props) {
  const {customer, postCustomer, getCustomer} = props
  useEffect(() => getCustomer(customer.username), [])

  return (
    <div>
      <Router basename='/'>
        <AppNav />
        <Route exact path="/" component={Restaurants} />
        <Route exact path="/menu/:id" component={RestaurantMenu} />
        <Route exact path="/cart" component={Cart} />
      </Router>
      {!customer.username && <div style={{'margin-top': '10px'}}>Enter the username, please <Modal submitEntity={postCustomer} fields={{username:{}}}>Enter your username: </Modal></div>}
    </div>
  );
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({
      postCustomer,
      getCustomer
  }, dispatch)
}

function mapStateToProps(store, ownProps) {
  return {
      customer: customerSelector(store, ownProps),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)



