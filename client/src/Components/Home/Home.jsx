import React from 'react';
import './home.css';
import landingVector from "../../assets/landing-vector.svg";
import Header from '../partials/Header/Header';

const Home = () => {
    return (
      <div className="">
        <Header/>
        <div className="container mt-5 pt-5 pt-md-3">
          <div className="row">
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center order-md-last">
              <img src={landingVector} alt="" style={{width:"90%",height:"auto"}}/>
            </div>
            <div className="col-12 col-md-6">
              
            </div>
          </div>
        </div>
      </div>
    );
}

export default Home;
