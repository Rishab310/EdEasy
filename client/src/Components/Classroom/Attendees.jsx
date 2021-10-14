import { Avatar } from '@material-ui/core';
import React, { useState, useEffect } from 'react';

const Attendees = ({adminName, adminEmail, classId}) => {
    const [attendees, setAttendees] = useState([]);

    useEffect(() => {
        setAttendees([
            {
                name: "Virat Kohli",
                email: "12@gmail.com"
            },
            {
                name: "Rohit Sharma",
                email: "122@gmail.com"
            },
            {
                name: "Mohit Sharma",
                email: "12312@gmail.com"
            },
            {
                name: "Vishal Singh",
                email: "1224@gmail.com"
            },
            {
                name: "Chetan Jain",
                email: "12212@gmail.com"
            },
        ])
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
                <div className="d-flex flex-column justify-content-center fs-6 fs-md-5 ms-3 fw-bold">
                    {adminName}
                </div>
            </div>
            <div className="Attendees_Title mt-4">Members</div>
            <hr className="m-0"></hr>
            {
                attendees.map(member => {
                    return (
                        <div className="d-flex mt-3">
                            <div className="Avatar_Container Avatar_Small">
                                <Avatar> 
                                    {member.name ? member.name[0] : null}
                                </Avatar>
                            </div>
                            <div className="d-flex flex-column justify-content-center fs-6 fs-md-5 ms-3 fw-bold">
                                {member.name}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Attendees;