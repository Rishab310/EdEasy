import React, { Component } from 'react';
import "./Dashboard.css";

import Avatar from '@material-ui/core/Avatar';
const SideDash = () => {
  return (
    <div className="col-3 d-none d-md-block Dashboard_Sidedrawer px-0 ps-2 width-20">
      <h6 className="ms-2 fw-bold">Owned</h6>
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
      <h6 className="ms-2 mt-5 fw-bold">Enrolled</h6>
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
  );
}

export default SideDash;