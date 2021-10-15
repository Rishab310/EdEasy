import React,{useState, useEffect} from 'react'
import { getDateFromTimestamp, getTimeFromTimestamp } from "../../../utilities";
import './MobileReminders.css'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useHistory } from "react-router-dom";

const MobileReminder = () => {
    let history = useHistory();
    // var browserHistory = ReactRouter.browserHistory;
    const [reminders, setReminders] = useState([]);
    const [seeAll, setSeeAll] = useState(false);

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
                },
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
                },
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

    return (
        <div>
            <div className="Reminders_mobile d-flex flex-column justify-content-center align-items-center mx-auto my-3">
                <div className="content-box py-3 px-3 px-md-4 py-md-3 mb-3" style={{width:"100%"}}>
                    <ArrowBackIosIcon onClick={history.goBack} style={{fontSize:30, position:"absolute"}}/>
                    <h6 className="d-flex justify-content-center ms-1 mb-4 fs-5">Reminders</h6>
                    {
                        reminders.map((reminder, index) => {
                            let style = {};
                            if (index !== reminders.length - 1) {
                                style.borderBottom = "1px solid #ccc";
                            }
                            return (
                                <a href={reminder.link}>
                                    <div
                                        className="d-flex justify-content-between Reminder px-2 py-3 py-md-3"
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
            </div>
        </div>
    )
}

export default MobileReminder
