import React, { useState, useEffect } from "react";
import "./Classroom.css";
import { useParams, useHistory } from "react-router-dom";
import MobileHeader from "../partials/Header/MobileHeader";
import Header from "../partials/Header/Header";
import FooterNav from "../partials/FooterNav/FooterNav";
import { getDateFromTimestamp, getTimeFromTimestamp } from "../../utilities";
import Discussion from "./Discussion"; 
import Assignments from './Assignments';
import Attendees from "./Attendees";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import VideocamIcon from "@material-ui/icons/Videocam";
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import CreateAssignment from "./CreateAssignment";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { selectUserData} from '../../reduxSlices/authSlice';
import CircularProgress from "@material-ui/core/CircularProgress";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
 
const Classroom = () => {
  const storeData = useSelector(selectUserData);
  const history = useHistory();
  const classCode = useParams().id;
  const [className, setClassName] = useState();
  const [adminName, setAdminName] = useState();
  const [adminEmail, setAdminEmail] = useState();
  const [classYear, setClassYear] = useState();
  const [subject, setSubject] = useState();
  const [meetLink, setMeetLink] = useState();
  const [discussions, setDiscussions] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [seeAll, setSeeAll] = useState(false);
  // const [activeTab, setActiveTab] = useState(useParams().tab);
  const [activeTab, setActiveTab] = useState("discussion");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [show, setShow] = useState(false);
  const toggle = () => setShow(prevState=>!prevState);
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   if (!activeTab) setActiveTab("discussion");
  //   if (activeTab === "discussion") {
  //     history.push('/classes/' + classId);
  //   } else if (activeTab === "assignments") {
  //     history.push('/classes/' + classId + '/assignments');
  //   } else if (activeTab === "attendees") {
  //     history.push('/classes/' + classId + '/attendees');
  //   }
  // }, [activeTab])
  const toggle_dropdown = () => setDropdownOpen(prevState => !prevState);
  useEffect(() => {
    setLoading(true);
    // axios Request for getting className, adminName, adminEmail, year, subject
    axios.post("http://localhost:5000/classes/getClassroom", {
        classCode: classCode
      },{ headers: { Authorization: 'Bearer ' + storeData.token } }
      )
      .then((res)=>{
        console.log(res);
        setClassName(res.data.className);
        setAdminName(res.data.adminName);
        setAdminEmail(res.data.adminEmail);
        setClassYear(res.data.classLevel);
        setSubject(res.data.fieldName);
        setMeetLink(res.data.meetLink);
        setLoading(false);
      })
      .catch(err => {console.log(err.response);setLoading(false);})
      
  }, []);
 
  useEffect(() => {
    if (seeAll) {
      setReminders([
        {
          title: "OS Test",
          dueDate: 1634904000000,
          link: "http://localhost:3000/assgn/12434",
        },
        {
          title: "DBMS Quiz",
          dueDate: 1633878709000,
          link: "http://localhost:3000/assgn/12435",
        },
        {
          title: "CN Assignment1",
          dueDate: 1633792309000,
          link: "http://localhost:3000/assgn/12464",
        },
        {
          title: "CN Assignment1",
          dueDate: 1633792309000,
          link: "http://localhost:3000/assgn/12464",
        },
        {
          title: "CN Assignment1",
          dueDate: 1633792309000,
          link: "http://localhost:3000/assgn/12464",
        },
        {
          title: "CN Assignment1",
          dueDate: 1633792309000,
          link: "http://localhost:3000/assgn/12464",
        },
        {
          title: "CN Assignment1",
          dueDate: 1633792309000,
          link: "http://localhost:3000/assgn/12464",
        }
      ]);
    } else {
      setReminders([
        {
          title: "OS Test",
          dueDate: 1634904000000,
          link: "http://localhost:3000/assgn/12434",
        },
        {
          title: "DBMS Quiz",
          dueDate: 1633878709000,
          link: "http://localhost:3000/assgn/12435",
        },
        {
          title: "CN Assignment1",
          dueDate: 1633792309000,
          link: "http://localhost:3000/assgn/12464",
        }
      ]);
    }
  }, [seeAll])
  const deleteClass = () => {
    axios.delete("http://localhost:5000/classes/deleteClassroom", {
      data : { classCode: classCode }
      },{ headers: { Authorization: 'Bearer ' + storeData.token } }
      )
      .then((res)=>{
        console.log("deleted");
        history.push("/classes");
      })
      .catch(err => {console.log(err.response);})
  }
  return (
    <>
    { (!loading) ? ( 
        <div className="Classroom">
          <div className="d-none d-md-block">
            <Header/>
          </div>
          <div className="d-block d-md-none">
            <MobileHeader/>
          </div>
          <div className="row m-0 justify-content-center">
            <div className="Classroom_Info col-11 col-md-10 col-lg-9 col-xl-8 d-flex justify-content-between content-box mt-4 py-2 px-2 py-sm-3 px-sm-4">
              <div className="d-flex">
                <div className="Horizontal_Line"></div>
                <div className="d-flex flex-column">
                  <div>
                    <h2 className="ClassName ms-1">{className}</h2>
                  </div>
                  <div className="d-flex Classroom_Desc">
                    <div className="Side_Border">{adminName}</div>
                    <div className="Side_Border">{classYear}</div>
                    <div>{subject}</div>
                  </div>
                  <div className="Class_Code mt-4 mb-2">
                    Class Code - <b>{classCode}</b>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column justify-content-between">
                {
                  (adminName === storeData.userName) ? (
                    <Dropdown className="me-2" isOpen={dropdownOpen} toggle={toggle_dropdown}>
                      <DropdownToggle nav>
                        <MoreHorizIcon />
                      </DropdownToggle>
                      <DropdownMenu className="bg-transparent" style={{border:"none"}}>
                          <button className="join-create-btn" onClick={deleteClass}>
                            Delete Classroom
                          </button>
                      </DropdownMenu>
                    </Dropdown>
                  ): ""
                }
                <a href={meetLink} target="_blank">  
                  <VideocamIcon
                  style={{ fontSize: 38, marginLeft: "10px", color: "gray" }}
                  />
                </a>
              </div>
            </div>
            <div className="col-11 col-md-10 col-lg-9 col-xl-8">
              <div className="row d-flex">
                <div className="d-flex justify-content-between Classroom_Navtab mt-3">
                  <div
                    onClick={() => setActiveTab("discussion")}
                    className={activeTab === "discussion" ? "active" : ""}
                  >
                    Discussion
                  </div>
                  <div
                    onClick={() => setActiveTab("assignments")}
                    className={activeTab === "assignments" ? "active" : ""}
                  >
                    Assignments
                  </div>
                  <div
                    onClick={() => setActiveTab("attendees")}
                    className={activeTab === "attendees" ? "active" : ""}
                  >
                    Attendees
                  </div>
                </div>
              </div>
              <div className="row justify-content-between mt-3">
                <div className="Classroom_Body m-0 p-0">
                  {
                    activeTab === "discussion" ? <Discussion classCode={classCode} /> : 
                    activeTab === "assignments" ? <Assignments classCode={classCode} adminEmail={adminEmail}/> : 
                    activeTab === "attendees" ? <Attendees classCode={classCode} adminName={adminName} adminEmail={adminEmail} /> : null 
                  }
                  
                </div>
                <div className="Reminders">
                  <div className="content-box py-3 px-2 px-md-4 py-md-3 mb-3">
                    <h6 className="ms-1">Reminders</h6>
                    {
                      reminders.map((reminder, index) => {
                        let style = {};
                        if (index !== reminders.length - 1) {
                          style.borderBottom = "1px solid #ccc";
                        }
                        return (
                          <a href={reminder.link}>
                            <div
                              className="d-flex flex-column Reminder px-2 py-2 py-md-3"
                              style={style}
                            >
                              <div className="Reminder_Title">{reminder.title}</div>
                              <div className="Reminder_Desc">
                                {getTimeFromTimestamp(reminder.dueDate)} -{" "}
                                {getDateFromTimestamp(reminder.dueDate)}
                              </div>
                            </div>
                          </a>
                        );
                      })
                    }
                    <div className="See_All d-flex justify-content-end">
                      {
                        seeAll ? (
                          <div onClick={() => setSeeAll(false)}>
                            See Less
                          </div>
                        ) : (
                          <div onClick={() => setSeeAll(true)}>
                            See All
                          </div>
                        )
                      }
                    </div>
                  </div>
                  {
                    (adminName===storeData.userName) ? (
                      <div className="d-flex justify-content-center">
                        <Button outline color="primary" className="Button_Hover d-flex align-items-center py-2 px-3 fs-6" onClick={() => setShow(true)}>
                          <AddRoundedIcon style={{fontSize: "28px", margin: "-2px 3px 0 0"}} />
                          Create Assignment
                        </Button>
                      </div>
                    ) :(<></>)
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="d-block d-md-none">
            <FooterNav />
          </div>
          <CreateAssignment isModalOpen={show} toggleModal={toggle} setShow={setShow}/>
        </div>
      ): ( 
        <div className="col-12 d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
          <CircularProgress size={80} className="display-block"/>
        </div>
      )}
    
    </>
  );
};
 
export default Classroom;