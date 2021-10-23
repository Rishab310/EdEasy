import { Avatar } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../reduxSlices/authSlice';
import CircularProgress from '@material-ui/core/CircularProgress';

const Attendees = ({adminName, adminEmail, classCode}) => {
    const [attendees, setAttendees] = useState([]);
    const userData = useSelector(selectUserData);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.post("http://localhost:5000/classes/getAttendees", {
            classCode: classCode
        },
        {
            headers: {
                Authorization: "Bearer " + userData.token
            }   
        })
        .then(res => {
            setAttendees(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        })
    }, [])

    return (
        <div className="content-box py-3 px-4 pb-4 mb-5">
            <div className="Attendees_Title mt-3">Admin</div>
            <hr className="m-0"></hr>
            <div className="d-flex mt-3">
                <div className="Avatar_Container Avatar_Small">
                    <Avatar> 
                        {adminName ? adminName[0] : null}
                    </Avatar>
                </div>
                <div className="d-flex flex-column justify-content-center Member_Name ms-3 fw-bold">
                    {adminName}
                </div>
            </div>
            <div className="Attendees_Title mt-4">Members</div>
            <hr className="m-0"></hr>
            {
                loading ? <div className="d-flex justify-content-center mt-4 mb-2"><CircularProgress /></div> : attendees.length !== 0 ? 
                    attendees.map(member => {
                        return (
                            <div key={member._id} className="d-flex mt-3">
                                <div className="Avatar_Container Avatar_Small">
                                    <Avatar> 
                                        {member.name ? member.name[0] : null}
                                    </Avatar>
                                </div>
                                <div className="d-flex flex-column justify-content-center Member_Name ms-3 fw-bold">
                                    {member.name}
                                </div>
                            </div>
                        )
                    }) : <div className="mt-2">Currently there are no members in this classroom.</div>
            }
        </div>
    )
}

export default Attendees;