import React, { useState, useEffect } from 'react';
import { getDateStringFromTimestamp, getTimeFromTimestamp } from '../../utilities';

import Avatar from '@material-ui/core/Avatar';

const Assignments = () => {
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        setAssignments([
            {
                authorName: "Rishab Goyal",
                authorEmail: "123@gmail.com",
                imgLink: "https://media.istockphoto.com/photos/health-care-billing-statement-with-stethoscope-picture-id1224851166?b=1&k=20&m=1224851166&s=170667a&w=0&h=xBJfeOFCnBG5Z6zgI2OFicnvgMF-idwwu3TuRvtq1y8=",
                assignmentName: "Lab Assgn1.pdf",
                assignmentLink: "https://media.istockphoto.com/photos/health-care-billing-statement-with-stethoscope-picture-id1224851166?b=1&k=20&m=1224851166&s=170667a&w=0&h=xBJfeOFCnBG5Z6zgI2OFicnvgMF-idwwu3TuRvtq1y8=",
                dueDate: 1633941000000
            },
            {
                authorName: "Rishab Goyal",
                authorEmail: "123@gmail.com",
                imgLink: "https://media.istockphoto.com/photos/health-care-billing-statement-with-stethoscope-picture-id1224851166?b=1&k=20&m=1224851166&s=170667a&w=0&h=xBJfeOFCnBG5Z6zgI2OFicnvgMF-idwwu3TuRvtq1y8=",
                assignmentName: "Lab Assgn1.pdf",
                assignmentLink: "https://media.istockphoto.com/photos/health-care-billing-statement-with-stethoscope-picture-id1224851166?b=1&k=20&m=1224851166&s=170667a&w=0&h=xBJfeOFCnBG5Z6zgI2OFicnvgMF-idwwu3TuRvtq1y8=",
                dueDate: 1633941000000
            },
            {
                authorName: "Rishab Goyal",
                authorEmail: "123@gmail.com",
                imgLink: "https://media.istockphoto.com/photos/health-care-billing-statement-with-stethoscope-picture-id1224851166?b=1&k=20&m=1224851166&s=170667a&w=0&h=xBJfeOFCnBG5Z6zgI2OFicnvgMF-idwwu3TuRvtq1y8=",
                assignmentName: "Lab Assgn1.pdf",
                assignmentLink: "https://media.istockphoto.com/photos/health-care-billing-statement-with-stethoscope-picture-id1224851166?b=1&k=20&m=1224851166&s=170667a&w=0&h=xBJfeOFCnBG5Z6zgI2OFicnvgMF-idwwu3TuRvtq1y8=",
                dueDate: 1633941000000
            },
        ])
    }, []);

    return (
        <div className="Assignments content-box py-3 px-4 pt-4 mb-5">
            {
                assignments.map(assignment => {
                    return (
                        <a href={assignment.assignmentLink} target="_blank">
                            <div className="d-flex flex-column">
                                <div className="d-flex justify-content-between">
                                    <div className="Assignment_Date">
                                        {getDateStringFromTimestamp(assignment.dueDate)}
                                    </div>
                                    <div className="Assignment_Time">
                                        {getTimeFromTimestamp(assignment.dueDate)}
                                    </div>
                                </div>
                                <div className="Assignment_Box d-flex flex-column justify-content-center p-1">
                                    <div className="Assignment_Img">
                                        <img src={assignment.imgLink} alt="" />
                                        <div className="Assignment_Name">
                                            {assignment.assignmentName}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    )
                })
            }
        </div>
    )
}

export default Assignments;