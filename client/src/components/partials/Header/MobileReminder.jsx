import React,{useState, useEffect} from 'react'
import { getDateFromTimestamp, getTimeFromTimestamp } from "../../../utilities";
import './MobileReminders.css'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { selectUserData} from '../../../reduxSlices/authSlice';

const MobileReminder = () => {
    let history = useHistory();
    const storeData = useSelector(selectUserData);
    const [reminders, setReminders] = useState([]);
    const [seeAll, setSeeAll] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reminderLoading, setReminderLoading] = useState(false);

    useEffect(async () => {
        if (storeData.token){
          setReminderLoading(true);
          axios.post("https://edeasy.onrender.com/classes/getReminders", {
              userEmail : storeData.userEmail
            },{ headers: { Authorization: 'Bearer ' + storeData.token } }
            )
            .then(async (res)=>{
              let reminders = [];
              for (let reminder of res.data) {
                await axios.post("https://edeasy.onrender.com/classes/getClassroom", {
                  classCode: reminder.classCode
                })
                .then(classDetails => {
                  reminders.push({...reminder, className: classDetails.data.className});
                })
                .catch(err => {
                  console.log(err);
                })
              }
              setReminders(reminders);
              setReminderLoading(false);
            })
            .catch(err => {
              console.log(err.response);
              setReminderLoading(false);
            })
        }
      }, [storeData.token])

    return ( 
        <>
            <div className="Reminders_mobile d-flex flex-column justify-content-center align-items-center mx-auto my-3">
                <div className="content-box py-3 px-3 px-md-4 py-md-3 mb-3" style={{width:"100%"}}>
                    <ArrowBackIosIcon onClick={history.goBack} style={{fontSize:30, position:"absolute", marginLeft:"5px"}}/>
                    <h6 className="d-flex justify-content-center ms-1 mb-4 fs-5">Reminders</h6>
                    {
                        reminders.slice(0, (seeAll ? reminders.length : 3)).map((reminder, index) => {
                            let style = {};
                            if (index !== reminders.length - 1 && !(!seeAll && index == 2)) {
                              style.borderBottom = "1px solid #ccc";
                            }
                            return (
                                <a key={reminder._id} href={"/classes/" + reminder.classCode + "/assignment/" + reminder._id}>
                                    <div
                                        className="d-flex flex-column Reminder px-2 py-2"
                                    >
                                        <div className="Reminder_mobile_className">{reminder.className}</div>
                                        <div className="d-flex justify-content-between">
                                          <div className="Reminder_Title_mobile">{reminder.name}</div>
                                          <div className="Reminder_Desc_mobile">
                                              {getTimeFromTimestamp(reminder.dueDate)} -{" "}
                                              {getDateFromTimestamp(reminder.dueDate)}
                                          </div>
                                        </div>
                                    </div>
                                    <hr style={{margin:'0.5rem'}}></hr>
                                </a>
                            );
                        })
                    }
                    {
                        reminderLoading ? (
                            <div className="d-flex justify-content-center mt-3">
                            <CircularProgress size={30}/>
                            </div>
                        ) : 
                        reminders.length > 3 ? (
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
                          ) : reminders.length == 0 ? (
                            <div className="ms-1 mt-2 d-flex justify-content-center" style={{fontSize: "13px", color: "gray"}}>
                              No work due!
                            </div>
                      ) : null
                    }
                </div>
            </div>
        </>
    )
}

export default MobileReminder
