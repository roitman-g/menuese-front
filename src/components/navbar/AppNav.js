import React, {useState} from "react";
import "./AppNav.scss";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Modal from '../../shared/modal/Modal'
import { NavLink, Link } from 'react-router-dom';
import Auth from '../auth/Auth'

const {keys} = Object

const AccountNavButton = (props) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="nav-item">
      <AccountCircleIcon onClick = {() => setShowModal(true)} id="account-icon"/>
      <Modal showModal = {showModal} hideModal={() => setShowModal(false)}>
        <Auth />
      </Modal>
  </div>
  )
} 

function AppNav(props) {
  const {customer, ordering} = props

  return (
    <div id="nav-container">
      <NavLink tag={Link} to='/'>
        <div id="brand"><span className="red">Menu</span>ese</div>
      </NavLink>
      <div id="nav-right-container">
          <AccountNavButton />
          <div className="nav-item">
            {ordering ? (
              <NavLink tag={Link} to='/cart'>
                <ShoppingBasketIcon id="cart-icon"/>
              </NavLink>
             ) : (
              <ShoppingBasketIcon id="cart-icon"/>
             )}
         </div>
      </div>
    </div>
  );
}

export default AppNav; 