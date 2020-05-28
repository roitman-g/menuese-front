import React from 'react';

import Restaurants from "./components/restaurants/Restaurants";
import RestaurantMenu from "./components/menu/Dishes";
import AppNav from "./components/navbar/AppNav";
import Cart from "./components/cart/Cart";
import {HashRouter as Router, Route} from 'react-router-dom';
import {auth} from './gql'
import './App.scss'



const App = (props) => {
  const { user } = props  
  return (
    <div className={'main'}>
      <Router basename='/'>
        <AppNav />
        <Route exact path="/" component={Restaurants} />
        <Route exact path="/menu/:id" component={RestaurantMenu} />
        <Route exact path="/cart" component={Cart} />
      </Router>
      <div>{user.error && user.error.toString()}</div>
    </div>
  );
}

export default auth(App)


