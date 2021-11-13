import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useHistory } from "react-router-dom";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { LOGOUT, selectUserData} from '../../../reduxSlices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function MobileHeader() {
  const storeData = useSelector(selectUserData);
  let history = useHistory();
  const dispatch = useDispatch();

  const ConditionalBtn = () => {
      return (
          <UncontrolledDropdown className="p-0">
            <DropdownToggle nav className="py-0">
              <div className="class-avatar pe-2">
                <Avatar style={{height:"35px",width:"35px"}}>{storeData.userName && storeData.userName.slice(0,1).toUpperCase()}</Avatar>
              </div>
            </DropdownToggle>
            <DropdownMenu className="my-0 py-0" right>
              <DropdownItem className="my-0 ml-0 pl-3">
                <div className="py-1 comp-nav mx-1 text-secondary fw-500"disabled >{storeData.userName}</div>
              </DropdownItem>
              <DropdownItem className="my-0 ml-0 pl-3">
                <div className="py-1 comp-nav mx-1 text-secondary fw-500" disabled >{storeData.userEmail}</div>
              </DropdownItem>
              <DropdownItem className="my-0 ml-0 pl-3" divider />
              <DropdownItem className="my-0 ml-0 pl-3" onClick={() => {dispatch(LOGOUT())}}>
                <Link className="py-1 mx-1 logout">Logout</Link>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
      );
  }
  return ( 
    <>
		  <nav className="navbar bg-light rounded-0">
        <div className="container px-2 pe-4">
            <div className="col-9 col-sm-10 ps-4">
              <p className="pb-0 mb-0">Hello,</p> 
              <h3 className="heading-2">{storeData.userName} 👋</h3>
            </div>
            <div className="col-1 d-flex justify-content-center">
                <NotificationsIcon onClick={()=>history.push('/classes/reminders')} style={{ fontSize: 30 }}/>
            </div>
            <div className="col-1 d-flex justify-content-center">
              <ConditionalBtn/> 
              </div>
        </div>
      </nav>
    </>
   );
}

export default MobileHeader;