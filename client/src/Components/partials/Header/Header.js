import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//     selectUserData,
//     LOGOUT
// } from '../../reduxSlices/authSlice';
import { Link } from 'react-router-dom';
// import Logo from '../../assets/images/Logo.PNG';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import IconButton from '@material-ui/core/IconButton';
import './Header.css';
import Sidedrawer from '../Sidedrawer/Sidedrawer';

const Header = () => {
  // const dispatch = useDispatch();
  const [showSidedrawer, setShowSidedrawer] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // const userData = useSelector(selectUserData);
  const location = useLocation().pathname;
  const closeShowSidedrawer = () => {
      setShowSidedrawer(false);
  }
  window.onscroll = () => {
      if(window.scrollY) {
          setScrolled(true);
      } else {
          setScrolled(false);
      }
  }
  return (
    <>
      {
          showSidedrawer ? <Sidedrawer show={showSidedrawer} closeSidedrawer={closeShowSidedrawer} /> : null
      }
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <>
            <Link to="/" class="navbar-brand ms-5 fw-bold" href="#">EdEasy</Link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
            aria-expanded="false" aria-label="Toggle navigation">
                  <IconButton onClick={() => setShowSidedrawer(true)}>
                      <MenuRoundedIcon />
                  </IconButton>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
                <li class="nav-item mx-3">
                  <Link to="/" class="nav-link" aria-current="page" href="#">Home</Link>
                </li>
                <li class="nav-item mx-3">
                  <Link to="/" class="nav-link" href="#">About</Link>
                </li>
                <li class="nav-item mx-3">
                  <button className="login-btn">Login</button>
                </li>
              </ul>
            </div>
          </>
        </div>
      </nav>
    </>
  )
}

export default Header;