import React, { useState, useEffect } from 'react';
import Header from '../partials/Header/Header';
import MobileHeader from '../partials/Header/MobileHeader';
import FooterNav from '../partials/FooterNav/FooterNav';
import "./Dashboard.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import banner from "../../assets/banner-image2.png";
import lessons from "../../assets/stat1.svg";
import pending from "../../assets/stat3.svg";
import SideDash from './SideDash';
import Banner from './Banner';
import ClassList from './ClassList';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUserData} from '../../reduxSlices/authSlice';

const Dashboard = () => {
  const [owned, setOwned] = useState([]);
  const [enrolled, setEnrolled] = useState([]);
  const [loading,setLoading] = useState(false);
  const storeData = useSelector(selectUserData);
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
          </div>
        ) 
      }
    </>
  );
}
 
export default Dashboard;

