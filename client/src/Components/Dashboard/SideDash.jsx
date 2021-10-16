import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import "./Dashboard.css";
import {Link} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import CreateClassroom from '../Classroom/CreateClassroom';
import axios from 'axios';
import { selectUserData} from '../../reduxSlices/authSlice';
const SideDash = () => {
  const [show, setShow] = useState(false);
  const toggle = () => setShow(prevState=>!prevState);
  const storeData = useSelector(selectUserData);
  const [owned, setOwned] = useState([]);
  const [enrolled, setEnrolled] = useState([]);
  useEffect(() => {
    if (storeData.token){
      console.log(storeData);
      axios.post("http://localhost:5000/classes/getClassrooms", {
        userEmail: storeData.userEmail,
        type:"owned"
      },{ headers: { Authorization: 'Bearer ' + storeData.token } }
      )
      .then((res)=>{
        console.log(res);
        setOwned(res.data);
      })
      .catch(err => console.log(err))
      axios.post("http://localhost:5000/classes/getClassrooms", {
        userEmail: storeData.userEmail,
        type:"enrolled"
      },{ headers: { Authorization: 'Bearer ' + storeData.token } }
      )
      .then((res)=>{
        console.log(res);
        setEnrolled(res.data);
      })
      .catch(err => console.log(err))
  }
  }, [storeData.token]);
  const [seeAllOwned , setSeeAllOwned] = useState(false);
  const [seeAllEnrolled , setSeeAllEnrolled] = useState(false);
  const renderClassName = (list, seeAllOwned) => {
    return (
      <div>

      </div>
    );
  }
  return (
    <div className="col-3 d-none d-md-block Dashboard_Sidedrawer px-1 ps-4 width-20">
      <div className="owned">
        <h6 className="ms-2 fw-bold">Owned</h6>
        {
          owned.slice(0,(seeAllOwned)?owned.length:Math.min(2,owned.length)).map((sub,index) => {
            return (
              <Link key={index} to={"/classes/"+sub.classCode}> 
                <div className="Sidedrawer_Class active d-flex p-2 ps-2">
                  <div>
                    <div className="class-avatar">
                      <Avatar>{sub.adminName.slice(0,1).toUpperCase()}</Avatar>
                    </div>
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
                  <div className="class-avatar">
                      <Avatar>{sub.adminName.slice(0,1).toUpperCase()}</Avatar>
                    </div>
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
      </div>
      <div className="row join-links pt-3">
        <div className="col-12 d-flex justify-content-center pb-3">
          <button className="join-create-btn">
            <AddIcon className="pe-1 mb-1"></AddIcon>
            Join Class
          </button>
        </div>
        <div className="col-12 d-flex justify-content-center pb-3">
          <button className="join-create-btn" onClick={() => setShow(true)}>
          <AddIcon className="pe-1 mb-1"></AddIcon>
            Create Class
          </button>
        </div>
      </div>
      <CreateClassroom isModalOpen={show} toggleModal={toggle} setShow={setShow}/>
    </div>
  );
}

export default SideDash;



// const owned = [
  //   {
  //     "adminName": "Rishab Goyal",
  //     "adminEmail": "rishab420@gmail.com",
  //     "desc": "Join this class for learning and fun.",
  //     "className": "Operating System",
  //     "meetLink": "https://meet.google.com/koz-zufe-zxp",
  //     "fieldName": "Information Technology",
  //     "classLevel": "PHD",
  //     "classCode" : "78495"
  //   },
  //   {
  //     "adminName": "Jatin Bajaj",
  //     "adminEmail": "jatin420@gmail.com",
  //     "desc": "Join this class for learning and fun.",
  //     "className": "Database",
  //     "meetLink": "https://meet.google.com/koz-zufe-zxp",
  //     "fieldName": "Information Technology",
  //     "classLevel": "PHD",
  //     "classCode" : "78495"
  //   },
  //   {
  //     "adminName": "Manish Dhameja",
  //     "adminEmail": "rishab420@gmail.com",
  //     "desc": "Join this class for learning and fun.",
  //     "className": "Mathamatics",
  //     "meetLink": "https://meet.google.com/koz-zufe-zxp",
  //     "fieldName": "Information Technology",
  //     "classLevel": "PHD",
  //     "classCode" : "78495"
  //   },
  //   {
  //     "adminName": "Shobhit Dhameja",
  //     "adminEmail": "shobhit420@gmail.com",
  //     "desc": "Join this class for learning and fun.",
  //     "className": "English",
  //     "meetLink": "https://meet.google.com/koz-zufe-zxp",
  //     "fieldName": "Information Technology",
  //     "classLevel": "PHD",
  //     "classCode" : "78495"
  //   }
  // ]
  // const enrolled = [
  //   {
  //     "adminName": "Rishab Goyal",
  //     "adminEmail": "rishab69@gmail.com",
  //     "desc": "Join this class for learning and fun.",
  //     "className": "Computer Networks",
  //     "meetLink": "https://meet.google.com/koz-zufe-zxp",
  //     "fieldName": "Information Technology",
  //     "classLevel": "PHD",
  //     "classCode" : "78495"
  //   },
  //   {
  //     "adminName": "Jatin Bajaj",
  //     "adminEmail": "jatin69@gmail.com",
  //     "desc": "Join this class for learning and fun.",
  //     "className": "Theory of Computation",
  //     "meetLink": "https://meet.google.com/koz-zufe-zxp",
  //     "fieldName": "Information Technology",
  //     "classLevel": "PHD",
  //     "classCode" : "78495"
  //   },
  //   {
  //     "adminName": "Manish Dhameja",
  //     "adminEmail": "rishab69@gmail.com",
  //     "desc": "Join this class for learning and fun.",
  //     "className": "Mathamatics",
  //     "meetLink": "https://meet.google.com/koz-zufe-zxp",
  //     "fieldName": "Information Technology",
  //     "classLevel": "PHD",
  //     "classCode" : "78495"
  //   },
  //   {
  //     "adminName": "Shobhit Dhameja",
  //     "adminEmail": "shobhit69@gmail.com",
  //     "desc": "Join this class for learning and fun.",
  //     "className": "English",
  //     "meetLink": "https://meet.google.com/koz-zufe-zxp",
  //     "fieldName": "Information Technology",
  //     "classLevel": "PHD",
  //     "classCode" : "78495"
  //   }
  // ]