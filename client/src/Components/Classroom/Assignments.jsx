import React, { useState, useEffect } from 'react';
import { getDateStringFromTimestamp, getTimeFromTimestamp } from '../../utilities';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { selectUserData} from '../../reduxSlices/authSlice';
import CircularProgress from "@material-ui/core/CircularProgress";
const Assignments = (props) => {
    const storeData = useSelector(selectUserData);
    const [assignments, setAssignments] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    useEffect(() => {
        setAssignments([
            {
                id: "2125",
                authorName: "Rishab Goyal",
                authorEmail: "123@gmail.com",
                imgLink: "https://media.istockphoto.com/photos/health-care-billing-statement-with-stethoscope-picture-id1224851166?b=1&k=20&m=1224851166&s=170667a&w=0&h=xBJfeOFCnBG5Z6zgI2OFicnvgMF-idwwu3TuRvtq1y8=",
                assignmentName: "Lab Assgn1.pdf",
                assignmentLink: "https://media.istockphoto.com/photos/health-care-billing-statement-with-stethoscope-picture-id1224851166?b=1&k=20&m=1224851166&s=170667a&w=0&h=xBJfeOFCnBG5Z6zgI2OFicnvgMF-idwwu3TuRvtq1y8=",
                dueDate: 1633941000000,
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veni"
            },
            {
                id: "2126",
                authorName: "Rishab Goyal",
                authorEmail: "123@gmail.com",
                imgLink: "https://media.istockphoto.com/photos/health-care-billing-statement-with-stethoscope-picture-id1224851166?b=1&k=20&m=1224851166&s=170667a&w=0&h=xBJfeOFCnBG5Z6zgI2OFicnvgMF-idwwu3TuRvtq1y8=",
                assignmentName: "Lab Assgn1.pdf",
                assignmentLink: "https://media.istockphoto.com/photos/health-care-billing-statement-with-stethoscope-picture-id1224851166?b=1&k=20&m=1224851166&s=170667a&w=0&h=xBJfeOFCnBG5Z6zgI2OFicnvgMF-idwwu3TuRvtq1y8=",
                dueDate: 1633941000000,
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veni"
            },
            {
                id: "2127",
                authorName: "Rishab Goyal",
                authorEmail: "123@gmail.com",
                imgLink: "https://media.istockphoto.com/photos/health-care-billing-statement-with-stethoscope-picture-id1224851166?b=1&k=20&m=1224851166&s=170667a&w=0&h=xBJfeOFCnBG5Z6zgI2OFicnvgMF-idwwu3TuRvtq1y8=",
                assignmentName: "Lab Assgn1.pdf",
                assignmentLink: "https://media.istockphoto.com/photos/health-care-billing-statement-with-stethoscope-picture-id1224851166?b=1&k=20&m=1224851166&s=170667a&w=0&h=xBJfeOFCnBG5Z6zgI2OFicnvgMF-idwwu3TuRvtq1y8=",
                dueDate: 1633941000000,
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veni"
            },
        ])
    }, []);
    // const goToAssign = (assignId) => {
    //     if( storeData.userData === props.adminEmail ) {
    //         <Redirect to={"/classes/"+props.classCode+"/assignment/"+assignId+"/admin"} />
    //     }
    //     else {
    //         <Redirect to={"/classes/"+props.classCode+"/assignment/"+assignId} />
    //     }
    // }
    console.log(props.adminEmail, storeData.userEmail);
    return (
        <div className="Assignments content-box py-3 px-4 pt-4 mb-5">
            {
                assignments.map(assignment => {
                    return (
                        <>
                            <a href={( storeData.userEmail=== props.adminEmail ) ?
                                "/classes/"+props.classCode+"/assignment/"+assignment.id+"/admin" :
                                "/classes/"+props.classCode+"/assignment/"+assignment.id
                            } >
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
                                    <div className="Assignment_Desc">
                                        {assignment.desc}
                                    </div>
                                </div>
                            </a>
                        </>
                    )
                })
            }
            {
                ( storeData.userEmail=== props.adminEmail ) ? (
                    <div className="floating-btn d-block d-md-none">
                        <Dropdown direction="up" isOpen={dropdownOpen} toggle={toggle}>
                            <DropdownToggle nav>
                                <Fab style={{color:'white', backgroundColor:"#1B559C" }}>
                                    <AddIcon style={{}} />
                                </Fab>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>Create Assignment</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                ) : ("")
            }
        </div>
    )
}

export default Assignments;