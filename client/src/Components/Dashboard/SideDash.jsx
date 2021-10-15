import React, { Component, useState } from 'react';
import "./Dashboard.css";
import {Link} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
const SideDash = () => {
  const owned = [
    {
      "adminName": "Rishab Goyal",
      "adminEmail": "rishab420@gmail.com",
      "desc": "Join this class for learning and fun.",
      "className": "Operating System",
      "meetLink": "https://meet.google.com/koz-zufe-zxp",
      "fieldName": "Information Technology",
      "classLevel": "PHD",
      "classCode" : "753269"
    },
    {
      "adminName": "Jatin Bajaj",
      "adminEmail": "jatin420@gmail.com",
      "desc": "Join this class for learning and fun.",
      "className": "Database",
      "meetLink": "https://meet.google.com/koz-zufe-zxp",
      "fieldName": "Information Technology",
      "classLevel": "PHD",
      "classCode" : "753269"
    },
    {
      "adminName": "Manish Dhameja",
      "adminEmail": "rishab420@gmail.com",
      "desc": "Join this class for learning and fun.",
      "className": "Mathamatics",
      "meetLink": "https://meet.google.com/koz-zufe-zxp",
      "fieldName": "Information Technology",
      "classLevel": "PHD",
      "classCode" : "753269"
    },
    {
      "adminName": "Shobhit Dhameja",
      "adminEmail": "shobhit420@gmail.com",
      "desc": "Join this class for learning and fun.",
      "className": "English",
      "meetLink": "https://meet.google.com/koz-zufe-zxp",
      "fieldName": "Information Technology",
      "classLevel": "PHD",
      "classCode" : "753269"
    }
  ]
  const enrolled = [
    {
      "adminName": "Rishab Goyal",
      "adminEmail": "rishab69@gmail.com",
      "desc": "Join this class for learning and fun.",
      "className": "Computer Networks",
      "meetLink": "https://meet.google.com/koz-zufe-zxp",
      "fieldName": "Information Technology",
      "classLevel": "PHD",
      "classCode" : "753269"
    },
    {
      "adminName": "Jatin Bajaj",
      "adminEmail": "jatin69@gmail.com",
      "desc": "Join this class for learning and fun.",
      "className": "Theory of Computation",
      "meetLink": "https://meet.google.com/koz-zufe-zxp",
      "fieldName": "Information Technology",
      "classLevel": "PHD",
      "classCode" : "753269"
    },
    {
      "adminName": "Manish Dhameja",
      "adminEmail": "rishab69@gmail.com",
      "desc": "Join this class for learning and fun.",
      "className": "Mathamatics",
      "meetLink": "https://meet.google.com/koz-zufe-zxp",
      "fieldName": "Information Technology",
      "classLevel": "PHD",
      "classCode" : "753269"
    },
    {
      "adminName": "Shobhit Dhameja",
      "adminEmail": "shobhit69@gmail.com",
      "desc": "Join this class for learning and fun.",
      "className": "English",
      "meetLink": "https://meet.google.com/koz-zufe-zxp",
      "fieldName": "Information Technology",
      "classLevel": "PHD",
      "classCode" : "753269"
    }
  ]
  const [seeAllOwned , setSeeAllOwned] = useState(false);
  const [seeAllEnrolled , setSeeAllEnrolled] = useState(false);
  const renderClassName = (list, seeAllOwned) => {
    return (
      <div>

      </div>
    );
  }
  return (
    <div className="col-3 d-none d-md-block Dashboard_Sidedrawer px-0 ps-2 width-20">
      <div className="owned">
        <h6 className="ms-2 fw-bold">Owned</h6>
        {
          owned.slice(0,(seeAllOwned)?owned.length:Math.min(2,owned.length)).map((sub,index) => {
            return (
              <Link key={index} to={"/classes/"+sub.classCode}> 
                <div className="Sidedrawer_Class active d-flex p-2 ps-2">
                  <div>
                    <Avatar>{sub.adminName.slice(0,1).toUpperCase()}</Avatar>
                  </div>
                  <div className="ms-2 d-flex flex-column">
                    <div className="Class_Title">{sub.className}</div>
                    <div className="Class_Desc">{sub.classLevel}</div>
                  </div>
                </div>
              </Link>
            );
            })
        }
        <div className="See_All d-flex justify-content-end pt-2">
          {
            seeAllOwned ? (
              <div onClick={() => setSeeAllOwned(false)}>
                See Less
              </div>
            ) : (
              <div onClick={() => {setSeeAllOwned(true); setSeeAllEnrolled(false);}}>
                See All
              </div>
            )
          }
        </div>
      </div>

      <div className="enrolled">
        <h6 className="ms-2 mt-3 fw-bold">Enrolled</h6>
        {
          enrolled.slice(0,(seeAllEnrolled)?enrolled.length:Math.min(2,enrolled.length)).map((sub,index) => {
            return (
              <Link key={index} to={"/classes/"+sub.classCode}> 
                <div className="Sidedrawer_Class active d-flex p-2 ps-2">
                  <div>
                    <Avatar>{sub.adminName.slice(0,1).toUpperCase()}</Avatar>
                  </div>
                  <div className="ms-2 d-flex flex-column">
                    <div className="Class_Title">{sub.className}</div>
                    <div className="Class_Desc">{sub.classLevel}</div>
                  </div>
                </div>
              </Link>
            );
            })
        }
        <div className="See_All d-flex justify-content-end pt-2">
          {
            seeAllEnrolled ? (
              <div onClick={() => setSeeAllEnrolled(false)}>
                See Less
              </div>
            ) : (
              <div onClick={() => {setSeeAllOwned(false); setSeeAllEnrolled(true);}}>
                See All
              </div>
            )
          }
        </div>
        {/* <a href="/"> 
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
        </a> */}
      </div>
    </div>
  );
}

export default SideDash;