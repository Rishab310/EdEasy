import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from 'react-redux';
// import {
//     selectUserData,
//     LOGOUT
// } from '../../reduxSlices/authSlice';
import { useLocation } from "react-router-dom";
import "./Sidedrawer.css";
import Backdrop from "../Backdrop/Backdrop";
// import Logo from '../../assets/images/Logo.PNG';
import { Link } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import LoginModal from '../LoginModal/LoginModal';
const Sidedrawer = ({ show, closeSidedrawer }) => {
  // const dispatch = useDispatch();
  const [closing, setClosing] = useState(false);
  const location = useLocation().pathname;
  // const userData = useSelector(selectUserData);
  console.log(location);

  const closeSidedrawerUtil = () => {
    setClosing(true);
    setTimeout(() => closeSidedrawer(), 300);
  };

  useEffect(() => {
    return () => {
      setClosing(false);
    };
  }, [show]);
  const [showModal, setShowModal] = useState(false);
  const toggle = () => setShowModal(prevState=>!prevState);
  return (
    <>
      <Backdrop closeSidedrawer={closeSidedrawerUtil} />
      <div
        className={
          "Sidedrawer " + (closing ? "Sidedrawer_Close" : "Sidedrawer_Open")
        }
      >
        <div className="side-drawer h-100">
          <div className="d-flex justify-content-end ">
            <div className="d-flex flex-column">
              <IconButton onClick={closeSidedrawerUtil}>
                <CloseIcon fontSize="large" />
              </IconButton>
            </div>
          </div>
          <ul className="d-flex flex-column mt-3 side-drawer-links">
            <li >
              <Link
                className={location === "/" ? "active" : ""}
                onClick={closeSidedrawerUtil}
                to="/"
              >
                Home
              </Link>
            </li>
            <li >
              <Link
                className={location === "/about" ? "active" : ""}
                onClick={closeSidedrawerUtil}
                to="/about"
              >
                About
              </Link>
            </li>
            <li style={{marginLeft:"-8px"}}>
              {/* {!userData.token ? (
                <Link to="/login"> */}
                  <button className="login-btn mt-2 m-0" onClick={toggle}>
                    Login
                  </button>
                {/* </Link>
                ) : (
                <button
                  onClick={() => dispatch(LOGOUT())}
                  className="Header_Login mt-2 m-0 Green_Button"
                >
                  Logout
                </button>
              )} */}
            </li>
          </ul>
        </div>
        <LoginModal isModalOpen={showModal} toggleModal={toggle}/>
      </div>
    </>
  );
};

export default Sidedrawer;
