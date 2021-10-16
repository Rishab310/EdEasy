import React, { useState, useEffect } from 'react';
import Header from '../partials/Header/Header';
import MobileHeader from '../partials/Header/MobileHeader';
import FooterNav from '../partials/FooterNav/FooterNav';
import "./Dashboard.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import SideDash from './SideDash';
import Banner from './Banner';
import ClassList from './ClassList';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUserData} from '../../reduxSlices/authSlice';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import CreateClassroom from '../Classroom/CreateClassroom'; 
import JoinClassroom from '../Classroom/JoinClassroom';

const Dashboard = () => {
  const [owned, setOwned] = useState([]);
  const [enrolled, setEnrolled] = useState([]);
  const [loading,setLoading] = useState(false);
  const storeData = useSelector(selectUserData);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);
  const [show, setShow] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const toggle = () => setShow(prevState=>!prevState);
  const toggleJoin = () => setShowJoin(prevState=>!prevState);
  useEffect(async () => {
    if (storeData.token){
      setLoading(true);
      console.log(storeData);
      await axios.post("http://localhost:5000/classes/getClassrooms", {
        userEmail: storeData.userEmail,
        type:"owned"
      },{ headers: { Authorization: 'Bearer ' + storeData.token } }
      )
      .then((res)=>{
        console.log(res);
        setOwned(res.data);
      })
      .catch(err => console.log(err));
      await axios.post("http://localhost:5000/classes/getClassrooms", {
        userEmail: storeData.userEmail,
        type:"enrolled"
      },{ headers: { Authorization: 'Bearer ' + storeData.token } }
      )
      .then((res)=>{
        console.log(res);
        setEnrolled(res.data);
      })
      .catch(err => console.log(err));
      setLoading(false);
    }
  }, [storeData.token]);
  return (
    <>
      {
        (loading) ? (
          <div className="col-12 d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
            <CircularProgress size={80} className="display-block"/>
          </div>
        ) : (
          <div className="dashboard">
            <div className="d-none d-md-block">
              <Header/>
            </div>
            <div className="d-block d-md-none">
              <MobileHeader/>
            </div>
            <div className="row mx-0">
                <SideDash setLoading={setLoading} owned={owned} enrolled={enrolled} />
              <div className="col-12 col-md-9 width-80 padding-sx-0 margin-sx-0 pos">
                <div className="row mx-0 m-t-0 m-md-3">
                  <Banner/>
                </div>
                <div className="row m-3 mx-0 mx-md-3">
                  <ClassList setLoading={setLoading} owned={owned} enrolled={enrolled} />
                </div>
              </div>
            </div>
            <div className="d-block d-md-none">
              <FooterNav/>
            </div>
            <div className="floating-btn d-block d-md-none">
              <Dropdown direction="up" isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle nav>
                  <Fab style={{color:'white', backgroundColor:"#1B559C" }}>
                    <AddIcon style={{}} />  
                  </Fab>
                </DropdownToggle>
                <DropdownMenu className="bg-transparent" style={{border:"none"}}>
                  <DropdownItem>
                    <button className="join-create-btn" onClick={() => setShow(true)}>
                      <AddIcon className="pe-1 mb-1"></AddIcon>
                      Create Class
                    </button>
                  </DropdownItem>
                  <DropdownItem>
                    <button className="join-create-btn" onClick={() => setShowJoin(true)}>
                      <AddIcon className="pe-1 mb-1"></AddIcon>
                      Join Class
                    </button>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <CreateClassroom isModalOpen={show} toggleModal={toggle} setShow={setShow}/>
            <JoinClassroom isModalOpen={showJoin} toggleModal={toggleJoin} setShow={setShowJoin}/>
          </div>
        ) 
      }
    </>
  );
}
export default Dashboard;

