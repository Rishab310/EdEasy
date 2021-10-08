import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const ErrorPage = (props) => {
  const wrapper = {
    height: "100vh",
    maxWidth: "100%",
    background: "linear-gradient(180deg, #000429, #010b32, #00113b, #001544, #00194d, #011e56, #02245f, #022968, #023272, #023b7d, #014487, #004d91)",
  }
  return (
    <div className="align-self-center row d-flex justify-content-center align-items-center px-0 mx-0" style={wrapper}>
      <div className=" row d-flex justify-content-center align-items-center">
        <div className="col-12 text-center text-light">
          <h1 className="font-weight-bold" style={{ fontSize: "4rem" }}>404</h1>
          <h2 className="font-weight-bold">Page Not Found !!</h2>
        </div>
        <div className="col-12 text-center mt-5">
          <img src="./assets/img/codeium_logo_bg.png" alt="Codeium" width="280px" height="auto" />
        </div>
        <div className="col-12 text-center mt-5">
          <div className="">
            <button className="btn-custom-light" onClick={()=>props.history.goBack()}><div >RETRY</div></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
