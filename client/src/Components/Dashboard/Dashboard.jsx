import React, { Component } from 'react';
import Header from '../partials/Header/Header';
import "./Dashboard.css";

import Avatar from '@material-ui/core/Avatar';

import banner from "../../assets/banner-image2.png";
import lessons from "../../assets/stat1.svg";
import progress from "../../assets/stat2.svg";
import pending from "../../assets/stat3.svg";

class Dashboard extends React.Component {
  render() { 
    return (
      <div className="dashboard">
        <Header/>
        <div className="row mx-0">
          <div className="col-2 d-none d-md-block Dashboard_Sidedrawer px-0 ps-2">
            <h6 className="ms-2">Owned</h6>
            <a href="/"> 
              <div className="Sidedrawer_Class active d-flex p-2 ps-2">
                <div>
                  <Avatar src="https://lh3.googleusercontent.com/ogw/ADea4I6x0ZHE2E2fnUt-X2aXAKqdRzAFLMchsbuvaxxQ=s32-c-mo" />
                </div>
                <div className="ms-2 d-flex flex-column">
                  <div className="Class_Title">Operating System</div>
                  <div className="Class_Desc">BE III year</div>
                </div>
              </div>
            </a>
            <a href="/"> 
              <div className="Sidedrawer_Class d-flex p-2 ps-2">
                <div>
                  <Avatar src="https://lh3.googleusercontent.com/ogw/ADea4I6x0ZHE2E2fnUt-X2aXAKqdRzAFLMchsbuvaxxQ=s32-c-mo" />
                </div>
                <div className="ms-2 d-flex flex-column">
                  <div className="Class_Title">Operating System</div>
                  <div className="Class_Desc">BE III year</div>
                </div>
              </div>
            </a>
            <a href="/"> 
              <div className="Sidedrawer_Class d-flex p-2 ps-2">
                <div>
                  <Avatar src="https://lh3.googleusercontent.com/ogw/ADea4I6x0ZHE2E2fnUt-X2aXAKqdRzAFLMchsbuvaxxQ=s32-c-mo" />
                </div>
                <div className="ms-2 d-flex flex-column">
                  <div className="Class_Title">Operating System</div>
                  <div className="Class_Desc">BE III year</div>
                </div>
              </div>
            </a>
            <h6 className="ms-2 mt-5">Enrolled</h6>
            <a href="/"> 
              <div className="Sidedrawer_Class d-flex p-2 ps-2">
                <div>
                  <Avatar src="https://lh3.googleusercontent.com/ogw/ADea4I6x0ZHE2E2fnUt-X2aXAKqdRzAFLMchsbuvaxxQ=s32-c-mo" />
                </div>
                <div className="ms-2 d-flex flex-column">
                  <div className="Class_Title">Operating System</div>
                  <div className="Class_Desc">BE III year</div>
                </div>
              </div>
            </a>
            <a href="/"> 
              <div className="Sidedrawer_Class d-flex p-2 ps-2">
                <div>
                  <Avatar src="https://lh3.googleusercontent.com/ogw/ADea4I6x0ZHE2E2fnUt-X2aXAKqdRzAFLMchsbuvaxxQ=s32-c-mo" />
                </div>
                <div className="ms-2 d-flex flex-column">
                  <div className="Class_Title">Operating System</div>
                  <div className="Class_Desc">BE III year</div>
                </div>
              </div>
            </a>
            <a href="/"> 
              <div className="Sidedrawer_Class d-flex p-2 ps-2">
                <div>
                  <Avatar src="https://lh3.googleusercontent.com/ogw/ADea4I6x0ZHE2E2fnUt-X2aXAKqdRzAFLMchsbuvaxxQ=s32-c-mo" />
                </div>
                <div className="ms-2 d-flex flex-column">
                  <div className="Class_Title">Operating System</div>
                  <div className="Class_Desc">BE III year</div>
                </div>
              </div>
            </a>
          </div>
          <div className="col-12 col-md-10 px-0">
            <div className="row m-3">
              <div className="col-9 pe-0">
                <div className="row banner">
                  <div className="col-6 ps-4 d-flex justify-content-center flex-column">
                    <div className="hello-name mb-1">
                      Hello, Rishab!
                    </div>
                    <p className="hello-description">
                      Learn anytime, anywhere. Boost your skills flexible, online courses
                    </p>
                  </div>
                  <div className="col-6 d-flex justify-content-center">
                    <div className="Banner_Img">
                      <img src={banner} alt="" srcset=""/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-3 m-0 p-0">
                <div className="content-box pb-2 pt-2">
                      <div className="heading-2 d-flex pb-2 mb-3 justify-content-center">
                        Statistics
                      </div>
                      <div className="d-flex">
                        <div className="col-6 d-flex flex-column align-items-center">
                          <img src={lessons} alt="" srcset="" height="40" />
                          <div className="stats pt-3">Total Lessons</div>
                          <div className="count">123</div>
                        </div>
                        <div className="col-6 d-flex flex-column align-items-center">
                          <img src={pending} alt="" srcset="" height="40" />
                          <div className="stats pt-3">Pending Assignments</div>
                          <div className="count">76</div>
                        </div>
                      </div>
                  </div>
                </div>
            </div>
            
            <div className="row m-3">
              <div className="col-9 pe-0 pt-0 mt-0">
                <div className="classes">
                  <div className="row content-box me-0 py-2 mt-0" style={{width:"100%"}}>
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
              <div className="col-3 content-box mt-0 pb-4 px-2 py-1 d-flex flex-column align-items-center">
                <div className="heading-2 mt-2 mb-2">Upcoming Assignments</div>
                 
                  <div className="Upcoming_Assignment">
                    <a href="/">
                      <div className="Assgn_Title">Due 26/10/2021</div>
                      <div className="Assgn_Desc">OS quiz - Operating System</div>
                    </a>
                  </div>
                  <div className="Upcoming_Assignment">
                    <a href="/">
                      <div className="Assgn_Title">Due 26/10/2021</div>
                      <div className="Assgn_Desc">OS quiz - Operating System</div>
                    </a>
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