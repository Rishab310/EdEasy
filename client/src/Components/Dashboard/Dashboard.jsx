import React, { Component } from 'react';
import Header from '../partials/Header/Header';
import "./Dashboard.css";

import banner from "../../assets/banner-image2.png";
import lessons from "../../assets/stat1.svg";
import pending from "../../assets/stat3.svg";
import SideDash from './SideDash';
import Banner from './Banner';


class Dashboard extends React.Component {
  render() { 
    return (
      <div className="dashboard">
        <Header/>
        <div className="row mx-0">
          <div className="col-3 d-none d-md-block Dashboard_Sidedrawer px-0 ps-2 width-20">
            <SideDash/>
          </div>
          <div className="col-12 col-md-9 width-80">
            <div className="row m-3">
              <Banner/>
            </div>
            <div className="row m-3">
              <div className="col-12">
                  <div class="row my-3 ms-0 content-box">
                    <div className="col-12 heading-2 d-flex py-3 pb-4 justify-content-center">
                      Classes
                    </div>
                    <div className="col-12">

                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
 
export default Dashboard;

