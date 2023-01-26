import React, { useState, useEffect } from 'react';
import { getDateStringFromTimestamp, getTimeFromTimestamp } from '../../utilities';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { selectUserData} from '../../reduxSlices/authSlice';
import CircularProgress from "@material-ui/core/CircularProgress";
import CreateAssignment from "./CreateAssignment";

const Assignments = ({classCode, adminEmail, isAssignmentCreated, setIsAssignmentCreated}) => {
    const storeData = useSelector(selectUserData);
    const [assignments, setAssignments] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const [showCreate, setShowCreate] = useState(false);
    const toggleCreate = () => setShowCreate(prevState=>!prevState);
    const [loading, setLoading] = useState(false);

    const getAssignments = () => {
        setLoading(true);
        axios.post("https://edeasy.onrender.com/classes/getAssignments", {
            classCode: classCode
        },{ headers: { Authorization: 'Bearer ' + storeData.token } }
        )
        .then((res)=>{
            setAssignments(res.data);
            setLoading(false);
        })
        .catch(err => {console.log(err.response);setLoading(false);})
    }

    useEffect(async () => {
        getAssignments();
    }, []);

    useEffect(() => {
        if (isAssignmentCreated) {
            getAssignments();
            window.scrollTo(0, 0);
        }
        setIsAssignmentCreated(false);
    }, [isAssignmentCreated]);

    return (
        <div className="Assignments content-box py-3 px-4 pt-4">
            {
                (loading) ? (
                    <div className="col-12 d-flex justify-content-center align-items-center mt-4 mb-4">
                        <CircularProgress size={50} className="display-block"/>
                    </div>
                ) : assignments.length !== 0 ? (
                    <>
                    {
                        assignments.map(assignment => {
                            return (
                                <div key={assignment._id}>
                                    <a href={( storeData.userEmail=== adminEmail ) ?
                                        "/classes/"+classCode+"/assignment/"+assignment._id+"/admin" :
                                        "/classes/"+classCode+"/assignment/"+assignment._id
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
                                                <img src="https://firebasestorage.googleapis.com/v0/b/edeasy-90583.appspot.com/o/assignments%2FWhatsApp%20Image%202021-10-17%20at%204.55.04%20AM.jpeg?alt=media&token=db78b70d-2b09-4cbb-b5ac-d47e2392bd31" alt="" />
                                                <div className="Assignment_Name">
                                                    {assignment.name}
                                                </div>
                                            </div>
                                            <div className="Assignment_Desc">
                                                {assignment.desc}
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            )
                        })
                    }
                    </>
                 ) : <div>No assignments posted yet.</div>
            } 
            {
                ( storeData.userEmail=== adminEmail ) ? (
                    <div className="floating-btn d-block d-md-none">
                        <Dropdown direction="up" isOpen={dropdownOpen} toggle={toggle}>
                            <DropdownToggle nav>
                                <Fab style={{color:'white', backgroundColor:"#1B559C"}}>
                                    <AddIcon style={{fontSize: "28px"}} />
                                </Fab>
                            </DropdownToggle>
                            <DropdownMenu className="bg-transparent" style={{border:"none"}}>
                            <button className="join-create-btn" onClick={() => setShowCreate(true)}>
                                Create Assignment
                            </button>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                ) : ("")
            }
            <CreateAssignment 
                setIsAssignmentCreated={setIsAssignmentCreated} 
                isModalOpen={showCreate} 
                toggleModal={toggleCreate} 
                setShow={setShowCreate}
                classCode={classCode}
            />
        </div>
    )
}

export default Assignments;