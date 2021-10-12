import React, { Component, use, useState } from 'react';
import "./Dashboard.css";
import Card1 from "../../assets/card1.svg";
import Card2 from "../../assets/card2.svg";
import Card3 from "../../assets/card3.svg";
import Card4 from "../../assets/card4.svg";
import Card5 from "../../assets/card5.svg";

const ClassList = () => {
  const classes = [
    {
      "name":"Operating System",
      "admin":"Rishab Goyal",
      "desc":"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio, a!",
      "link":"https://meet.google.com/"
    },
    {
      "name":"Computer Networks",
      "admin":"Manish Dhameja",
      "desc":"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio, a!",
      "link":"https://meet.google.com/"
    },
    {
      "name":"Artificial Intelligence",
      "admin":"Jati Bajaj",
      "desc":"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio, a!",
      "link":"https://meet.google.com/"
    },
    {
      "name":"Database",
      "admin":"Manish Dhameja",
      "desc":"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio, a!",
      "link":"https://meet.google.com/"
    },
    {
      "name":"Theory of Computation",
      "admin":"Manish Dhameja",
      "desc":"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio, a!",
      "link":"https://meet.google.com/"
    },
  ]
  const RenderClasses = () => {
    return (  
      classes.map((sub,index) => {
        let backgroundStyle ={};
        let card = Card1;
        switch (index%5) {
          case 0 : {
            backgroundStyle = {backgroundColor:"#E5F8F0",borderRadius:"12px"};
            card=Card1;
          }
          break;
          case 1 : {
            backgroundStyle = {backgroundColor:"#FFF3DA",borderRadius:"12px"};
            card=Card2;
          }
          break;
          case 2 : {
            backgroundStyle = {backgroundColor:"#E9E9FF",borderRadius:"12px"};
            card=Card3;
          }
          break;
          case 3 : {
            backgroundStyle = {backgroundColor:"#FFE9E9",borderRadius:"12px"};
            card=Card4;
          }
          break;
          case 4 : {
            backgroundStyle = {backgroundColor:"#FEE2FF",borderRadius:"12px"};
            card=Card5;
          }
        }
        return (
          <div key={index} className="col-12 col-md-6 col-lg-4 d-flex justify-content-center pb-md-5 px-md-4">
            <div class="d-none d-md-block card class-card" style={{width: "90%"}} style={backgroundStyle}>
              <img src={card} class="mx-auto p-3" height="180px"/>
              <div class="card-body m-3 mx-md-4 rounded-3" style={{backgroundColor:"#fff"}}>
                <h5 class="card-title heading-3">{sub.name}</h5>
                <p class="card-text">{sub.desc}</p>
                <a href={sub.link} target="_blank" class="card-link text-primary">{sub.link}</a>
              </div>
            </div>
            <div class="d-block d-md-none card mb-4 w-100" style={backgroundStyle}>
              <div class="row g-0">
                <div class="col-4 d-flex justify-content-center">
                  <img src={card} class="img-fluid rounded-start px-2" width="100%"/>
                </div>
                <div class="col-8">
                  <div class="card-body">
                    <h5 class="card-title heading-3 text-start px-0">{sub.name}</h5>
                    <p class="card-text">{sub.desc}</p>
                    <p class="card-text"><small class="text-muted">{sub.admin}</small></p>
                    {/* <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })
    );
  }
  
  const [activeTab, setActiveTab] = useState("1");

  return ( 
    <>
    <div className="col-12">
      <div class="row my-3 ms-0 content-box d-none d-md-block">
        <div className="col-12 heading-2 d-flex py-3 pb-4 justify-content-center">
          Classes 
        </div>
        <div className="col-12">
          <div className="row">
            <RenderClasses/>
          </div>
        </div>
      </div>
    </div>
    <div class="row my-3 px-0 ms-0 d-block d-md-none">
        <div className="heading-2 ps-4">Classes</div>
        <div className="classes-navs ps-4">
          <button
            className={
              activeTab == "1" ? "active classes-nav-btn ps-0" : "classes-nav-btn ps-0"
            }
            onClick={() => setActiveTab("1")}
            style={{ cursor: "pointer" }}
          >
            Owned
          </button>
          <button
            className={
              activeTab == "2" ? "active classes-nav-btn" : "classes-nav-btn"
            }
            onClick={() => setActiveTab("2")}
            style={{ cursor: "pointer" }}
          >
            Enrolled
          </button>
        </div>
        <div className="col-12 content-box py-4 mobile-classlist">
          <div className="row px-3 pt-2">
            <RenderClasses/>
          </div>
        </div>
      </div>
    </>
   );
}

export default ClassList;