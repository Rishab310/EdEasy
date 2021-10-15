import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { NavLink, Link } from 'react-router-dom';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import IconButton from '@material-ui/core/IconButton';
import './Header.css';
import Sidedrawer from '../Sidedrawer/Sidedrawer';
import LoginModal from '../LoginModal/LoginModal';
const Header = () => {
  const [showSidedrawer, setShowSidedrawer] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
  const [show, setShow] = useState(false);
  const toggle = () => setShow(prevState=>!prevState);
  return (
    <>
      {
          showSidedrawer ? <Sidedrawer show={showSidedrawer} closeSidedrawer={closeShowSidedrawer} /> : null
      }
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <>
            <NavLink to="/" className="navbar-brand ms-5 fw-bold" href="#">EdEasy</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
            aria-expanded="false" aria-label="Toggle navigation">
              <IconButton onClick={() => setShowSidedrawer(true)}>
                  <MenuRoundedIcon />
              </IconButton>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
                <li className="nav-item mx-3">
                  <NavLink to="/" className="nav-link" activeClassName="selected" exact>Home</NavLink>
                </li>
                <li className="nav-item mx-3">
                  <NavLink to="/about" className="nav-link" activeClassName="selected" exact>About</NavLink>
                </li>
                <li className="nav-item mx-3">
                  <NavLink to="/classes" className="nav-link" activeClassName="selected" exact>Classes</NavLink>
                </li>
                <li className="nav-item mx-3">
                  <button className="login-btn" onClick={() => setShow(true)}>Login</button>
                </li>
              </ul>
            </div>
          </>
        </div>
      </nav>
      <LoginModal isModalOpen={show} toggleModal={toggle}/>
    </>
  )
}

export default Header;