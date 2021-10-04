import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useLocation } from 'react-router-dom';
// import {
//     selectUserData,
//     LOGOUT
// } from '../../reduxSlices/authSlice';
import { Link } from 'react-router-dom';
// import Logo from '../../assets/images/Logo.PNG';
// import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import IconButton from '@material-ui/core/IconButton';
import './Header.css';
import Sidedrawer from '../Sidedrawer/Sidedrawer';

const Header = () => {
    const dispatch = useDispatch();
    const [showSidedrawer, setShowSidedrawer] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const userData = useSelector(selectUserData);
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

            <div className={"Header " + (scrolled ? "Header_BoxShadow" : "")}>
                <div className="Header_Container">
                    <div className="Header_Logo">
                        <Link to="/" >
                            {
                                <img src={Logo} alt="Logo" />
                            }
                        </Link>
                    </div>
                    <div className="Header_SideMenuBtn">
                        <IconButton onClick={() => setShowSidedrawer(true)}>
                            <MenuRoundedIcon />
                        </IconButton>
                    </div>
                    <div className="Header_LinksContainer">
                        <ul className="Header_Links">
                            <li>
                                <Link className={location === "/" ? "active" : ""} to="/">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link className={location === "/about" ? "active" : ""} to="/about">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link className={location === "/orders" ? "active" : ""} to='/orders'>
                                    Orders
                                </Link>
                            </li>
                            <li>
                                <Link className={location === "/profile" ? "active" : ""} to="/profile">
                                    Profile
                                </Link>
                            </li>
                            {
                                userData.category === "customer" ? (
                                    <li>
                                        <Link className={location === "/createOrder" ? "active" : ""} to="/createOrder">
                                            Create Order
                                        </Link>
                                    </li>
                                ) : (
                                    <li>
                                        <Link className={location === "/dashboard" ? "active" : ""} to="/dashboard">
                                            Dashboard
                                        </Link>
                                    </li>
                                )
                            }
                        </ul>
                        <div className="Header_Buttons">
                            {/* <button className="Header_CreateAcc">Create Account</button> */}
                                {
                                    !userData.token ? (
                                        <Link to='/login'>
                                            <button className="Header_Login Green_Button">Login
                                            </button>
                                        </Link>
                                    ) :
                                    <button onClick={() => dispatch(LOGOUT())} className="Header_Login Green_Button">Logout</button>
                                }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;