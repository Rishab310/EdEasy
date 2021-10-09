import React, { Component } from 'react';
import Header from '../partials/Header/Header';
import MobileHeader from '../partials/Header/MobileHeader';
import FooterNav from '../partials/FooterNav/FooterNav';
import "./Dashboard.css";

import banner from "../../assets/banner-image2.png";
import lessons from "../../assets/stat1.svg";
import pending from "../../assets/stat3.svg";
import SideDash from './SideDash';
import Banner from './Banner';
import ClassList from './ClassList';


class Dashboard extends React.Component {
  render() { 
    return (
      <div className="dashboard">
        <div className="d-none d-md-block">
          <Header/>
        </div>
        <div className="d-block d-md-none">
          <MobileHeader/>
        </div>
        <div className="row mx-0">
            <SideDash/>
          <div className="col-12 col-md-9 width-80 padding-sx-0 margin-sx-0 pos">
            <div className="row m-3">
              <Banner/>
            </div>
            <div className="row m-3">
              <ClassList/>
            </div>
          </div>
        </div>
        <div className="d-block d-md-none">
          <FooterNav/>
        </div>
      </div>
    );
  }
}
 
export default Dashboard;

