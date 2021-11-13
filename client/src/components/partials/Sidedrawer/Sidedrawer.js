import React, { useState, useEffect } from "react";
import "./Sidedrawer.css";
import Backdrop from "../Backdrop/Backdrop";
import { Link } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import LoginModal from '../LoginModal/LoginModal';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT, selectUserData} from '../../../reduxSlices/authSlice';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
 
const Sidedrawer = ({ show, closeSidedrawer }) => {
  const [closing, setClosing] = useState(false);
  const dispatch = useDispatch();
 
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
  const storeData = useSelector(selectUserData);
  const userName = storeData.userName;
  const token = storeData.token;
  const userEmail = storeData.userEmail;
  const ConditionalBtn = () => {
    if(token) {
      return (
        <li className="nav-item text-start">
          <UncontrolledDropdown nav className="p-0">
            <DropdownToggle nav caret className="py-0 px-0">
              {/* <div className="class-avatar pe-2">
                <Avatar style={{height:"25px",width:"25px"}}>{userName.slice(0,1).toUpperCase()}</Avatar>
              </div> */}
              {userName}
            </DropdownToggle>
            <DropdownMenu className="my-0 py-0">
              <DropdownItem className="my-0 ml-0 pl-3">
                <div className="py-1 comp-nav mx-1 text-secondary fw-500"disabled >{userName}</div>
              </DropdownItem>
              <DropdownItem className="my-0 ml-0 pl-3">
                <div className="py-1 comp-nav mx-1 text-secondary fw-500" disabled >{userEmail}</div>
              </DropdownItem>
              <DropdownItem className="my-0 ml-0 pl-3" divider />
              <DropdownItem className="my-0 ml-0 pl-3" onClick={() => {dispatch(LOGOUT())}}>
                <Link className="py-1 mx-1 logout">Logout</Link>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </li>
      );
    }
    else {
      return (
        <li style={{marginLeft:"-8px"}}><button className="login-btn mt-2 m-0" onClick={() => setShowModal(true)}>Login</button></li>
      );
    }
  }
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
                // className={location === "/" ? "active" : ""}
                onClick={closeSidedrawerUtil}
                to="/"
              >
                Home
              </Link>
            </li>
            {
              (token) ? (
                <li>
                  <Link to="/classes" activeClassName="selected" exact>Classes</Link>
                </li>
              ) : ""
            }
            <ConditionalBtn/>
          </ul>
        </div>
        <LoginModal isModalOpen={showModal} toggleModal={toggle} setShow={setShowModal}/>
      </div>
    </>
  );
};
 
export default Sidedrawer;