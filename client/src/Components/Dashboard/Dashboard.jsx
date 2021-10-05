import React, { Component } from 'react';
import Header from '../partials/Header/Header';
import "./Dashboard.css";
import banner from "../../assets/banner-image.png";
import lessons from "../../assets/stat1.svg";
import progress from "../../assets/stat2.svg";
import pending from "../../assets/stat3.svg";

class Dashboard extends React.Component {
  render() { 
    return (
      <div className="dashboard">
        <Header/>
        <div className="row mx-0">
          <div className="col-3 d-none d-md-block" style={{background:"red",height:"200vh"}}>
          </div>
          <div className="col-12 col-md-9 px-0">
            <div className="row banner m-3 p-4 px-5">
                <div className="col-6 d-flex justify-content-center flex-column">
                  <div className="hello-name">
                    Hello, Rishab!
                  </div>
                  <p className="hello-description">
                    Learn anytime, anywhere. Boost your skills flexible, online courses
                  </p>
                </div>
                <div className="col-6 d-flex justify-content-center">
                  <img src={banner} alt="" srcset="" width="80%"/>
                </div>
            </div>
            <div className="row m-3">
              <div className="col-8 pe-0">
                <div className="statistics">
                  <div className="row content-box me-0 py-2 mt-2" style={{width:"100%"}}>
                    <div className="heading-2 d-flex pb-2 justify-content-center">
                      Statistics
                    </div>
                    <div className="col-4 d-flex flex-column align-items-center">
                      <img src={lessons} alt="" srcset="" height="80" />
                      <div className="stats pt-3">Total Lessons</div>
                      <div className="count">123</div>
                    </div>
                    <div className="col-4 d-flex flex-column align-items-center">
                      <img src={progress} alt="" srcset="" height="90" />
                      <div className="stats pt-2">On Progress</div>
                      <div className="count">15</div>
                    </div>
                    <div className="col-4 d-flex flex-column align-items-center">
                      <img src={pending} alt="" srcset="" height="80" />
                      <div className="stats pt-3">Pending Assignments</div>
                      <div className="count">76</div>
                    </div>
                  </div>

                  <div className="classes">
                    <div className="row content-box me-0 py-2 mt-4" style={{width:"100%"}}>
                      <div className="heading-2 d-flex pb-2 justify-content-center">
                        Classes
                      </div>
                      <div className="col-4 d-flex flex-column align-items-center">
                        <img src={lessons} alt="" srcset="" height="80" />
                        <div className="stats pt-3">Total Lessons</div>
                        <div className="count">123</div>
                      </div>
                      <div className="col-4 d-flex flex-column align-items-center">
                        <img src={progress} alt="" srcset="" height="90" />
                        <div className="stats pt-2">On Progress</div>
                        <div className="count">15</div>
                      </div>
                      <div className="col-4 d-flex flex-column align-items-center">
                        <img src={pending} alt="" srcset="" height="80" />
                        <div className="stats pt-3">Pending Assignments</div>
                        <div className="count">76</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4" style={{background:"red",height:"200vh"}}>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
 
export default Dashboard;