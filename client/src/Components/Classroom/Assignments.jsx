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
const Assignments = (props) => {
    const storeData = useSelector(selectUserData);
    const [assignments, setAssignments] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const [showCreate, setShowCreate] = useState(false);
    const toggleCreate = () => setShowCreate(prevState=>!prevState);
    const [loading, setLoading] = useState(false);
    useEffect(async () => {
        setLoading(true);
        axios.post("http://localhost:5000/classes/getAssignments", {
            classCode: props.classCode
        },{ headers: { Authorization: 'Bearer ' + storeData.token } }
        )
        .then((res)=>{
            console.log(res.data);
            setAssignments(res.data);
            setLoading(false);
        })
        .catch(err => {console.log(err.response);setLoading(false);})
    }, []);
    return (
        <div className="Assignments content-box py-3 px-4 pt-4 mb-5">
            {
                (loading) ? (
                    <div className="col-12 d-flex justify-content-center align-items-center mt-5">
                        <CircularProgress size={50} className="display-block"/>
                    </div>
                ) : (
                    <>
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
                                                <img src="https://media.istockphoto.com/photos/health-care-billing-statement-with-stethoscope-picture-id1224851166?b=1&k=20&m=1224851166&s=170667a&w=0&h=xBJfeOFCnBG5Z6zgI2OFicnvgMF-idwwu3TuRvtq1y8=" alt="" />
                                                <div className="Assignment_Name">
                                                    {assignment.name}
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
                    </>
                 )
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
                            <DropdownMenu className="bg-transparent" style={{border:"none"}}>
                            <button className="join-create-btn" onClick={() => setShowCreate(true)}>
                                Create Assignment
                            </button>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                ) : ("")
            }
            <CreateAssignment isModalOpen={showCreate} toggleModal={toggleCreate} setShow={setShowCreate}/>
        </div>
    )
}

export default Assignments;