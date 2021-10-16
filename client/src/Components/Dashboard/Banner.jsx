import React, { Component } from 'react';
import "./Dashboard.css";

import banner from "../../assets/banner-image2.png";
import lessons from "../../assets/stat1.svg";
import pending from "../../assets/stat3.svg";


const Banner = () => {
  return (
    <>
      <div className="col-12 col-lg-9 px-0 px-md-3">
        <div className="row banner m-0">
            <div className="col-6 d-flex justify-content-center flex-column ps-5">
              <div className="hello-name d-none d-md-block">
                Hello, Rishab!
              </div>
              <p className="hello-description d-none d-md-block">
                Learn anytime, anywhere. Boost your skills flexible, online courses
              </p>
            </div>
            <div className="col-12 col-md-6 d-flex justify-content-center">
              <img src={banner} alt="" srcset="" width="70%"/>
            </div>
        </div>
      </div>
      <div className="d-none d-lg-block col-3 pe-0 d-flex align-items-center justify-content-center">
        <div className="content-box d-flex align-items-center justify-content-center flex-column height-100">
          <div className="heading-2 d-flex justify-content-center pb-3">
            Assignments
          </div>
          <div className="row">
            <div className="col-6 px-4 d-flex flex-column align-items-center justify-content-center">
              <img src={lessons} alt="" srcset="" height="40" />
              <div className="stats pt-2">Total</div>
              <div className="count">123</div>
            </div>
            <div className="col-6 px-4 d-flex flex-column align-items-center justify-content-center">
              <img src={pending} alt="" srcset="" height="40" />
              <div className="stats pt-2">Pending</div>
              <div className="count">76</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;