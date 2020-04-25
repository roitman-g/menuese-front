import React from "react";
import "./AppNav.scss";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { NavLink, Link } from 'react-router-dom';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {setCustomer, customerSelector, orderingSelector} from '../../app/customerSlice'



function AppNav(props) {
  const {customer, ordering} = props
  return (
    <div id="nav-container">
      <NavLink tag={Link} to='/'>
        <div id="brand"><span class="red">Menu</span>ese</div>
      </NavLink>
      <div id="nav-right-container">
            <div class="nav-item"><AccountCircleIcon id="account-icon"/>{customer.username}</div>
          <div class="nav-item">
            {ordering ? <NavLink  tag={Link} to='/cart'>
                          <ShoppingBasketIcon id="cart-icon"/>
                        </NavLink> :
                        <ShoppingBasketIcon id="cart-icon"/>}
         </div>
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({
      setCustomer,
  }, dispatch)
}

function mapStateToProps(store, ownProps) {
  return {
      customer: customerSelector(store, ownProps),
      ordering: orderingSelector(store, ownProps)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNav)

