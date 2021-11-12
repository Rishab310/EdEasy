import React, { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import './StudentSubmission.css';
import Avatar from '@material-ui/core/Avatar';
import Header from '../partials/Header/Header';
import MobileHeader from '../partials/Header/MobileHeader';
import FooterNav from '../partials/FooterNav/FooterNav';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getDateFromTimestamp, getTimeFromTimestamp } from '../../utilities';

import db, { storage } from '../../firebase';
import axios from 'axios';

import { useSelector } from 'react-redux';
import { selectUserData } from '../../reduxSlices/authSlice';

const StudentSubmission = () => {
    const fileInput = useRef(null);
    const [inputFile, setInputFile] = useState(null);
    const [pdfFileError, setPdfFileError] = useState('');
    const [uploadState, setUploadState] = useState(0);
    const assignmentId = useParams().assignId;
    const classCode = useParams().id;
    const [submissionDetails, setSubmissionDetails] = useState(null);
    const userData = useSelector(selectUserData);
    const [loading, setLoading] = useState(false);
    const [assignmentDetails, setAssignmentDetails] = useState({});
    const [pageLoading, setPageLoading] = useState(false);

    const getSubmission = () => {
        setLoading(true);
        axios.post("https://edeasy.herokuapp.com/classes/getSubmission", {
            assignmentId: assignmentId,
            userEmail: userData.userEmail
        },
        {
            headers: {
                Authorization: "Bearer " + userData.token
            }
        })
        .then(res => {
            setSubmissionDetails(res.data);
            setUploadState(2);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        })
    }

    const getAssignment = () => {
        setPageLoading(true);
        axios.post("https://edeasy.herokuapp.com/classes/getAssignment", {
            assignmentId: assignmentId
        }, 
        {
            headers: {
                Authorization: "Bearer " + userData.token
            }
        })
        .then(res => {
            setAssignmentDetails(res.data);
            setPageLoading(false);
        })
        .catch(err => {
            console.log(err);
            setPageLoading(false);
        })
    }

    useEffect(() => {
        getAssignment();
        getSubmission();
    }, [])

    const uploadFile = () => {
        fileInput.current.click();
    }
    
    const submitFile = () => {
        setLoading(true);
        console.log(inputFile.name);
        const fileName = new Date().getTime() + "-" + inputFile.name;
        const uploadTask = storage.ref(`submissions/${fileName}`).put(inputFile);
        uploadTask.on('state_changed', console.log, console.error, () => {
            storage.ref('submissions').child(fileName).getDownloadURL()
                    .then(firebaseURL => {
                    return axios.post('https://edeasy.herokuapp.com/classes/submitAssignment', {
                        assignmentId: assignmentId,
                        studentName: userData.userName,
                        studentEmail: userData.userEmail,
                        classCode: classCode,
                        fileLink: firebaseURL,
                        fileName: inputFile.name
                    }, 
                    {
                        headers: {
                            Authorization: "Bearer " + userData.token
                        }
                    })
                })
                .then(res => {
                    getSubmission();
                    setUploadState(2);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                })
            })
    }

    const unSubmitFile = () => {
        setLoading(true);
        axios.delete("https://edeasy.herokuapp.com/classes/deleteSubmission", {
            data: {
                assignmentId: assignmentId,
                userEmail: userData.userEmail
            }
        },
        {
            headers: {
                Authorization: "Bearer " + userData.token
            }
        })
        .then(res => {
            setUploadState(0);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        })
    }
    
    const onUploadClick = (e) => {
        if (!e.target.files[0]) {
            return
        }
        setInputFile(e.target.files[0]);
        setUploadState(1);
        const fileType = ['application/pdf'];
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && fileType.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = (e) => {
                    setPdfFileError('');
                }
            }
            else {
                setPdfFileError('Please select valid pdf file');
            }
        }
    }

    let btn_class = '';
    let btn_class_1 = '';
    let text = '';
    let btnClick = null;
    let btnClick_back = null;
    
    switch (uploadState % 3) {
        case 0: {
            btnClick = uploadFile;
            btn_class = 'button_hover btn btn-outline-primary fs-6';
            text = 'Upload';
        }
        break;
        case 1: {
            btnClick = submitFile;
            btnClick_back = uploadFile;
            if (pdfFileError) {
                btn_class = 'btn btn-outline-success fs-6 d-flex mt-3 disabled';
            }
            else {
                btn_class = 'btn btn-outline-success fs-6 d-flex mt-3';
            }
            btn_class_1 = 'button_hover btn btn-outline-primary fs-6 d-flex mt-3';
            text = 'Submit';
        }
        break;
        case 2: {
            btnClick = unSubmitFile;
            btn_class = 'btn btn-outline-danger fs-6 d-flex mx-auto mt-3';
            text = 'Unsubmit';
        }
        break;
    }

    if (pageLoading) {
        return (
            <div className="col-12 d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
                <CircularProgress size={80} className="display-block"/>
            </div>
        )
    }

    return (
        <div style={{ marginTop: "90px" }}>
            <div className="d-none d-md-block">
                <Header />
            </div>
            <div className="d-block d-md-none">
                <MobileHeader />
            </div>
            <div className="d-block d-md-none">
                <FooterNav />
            </div>
            <div className="container mt-3">
                <div className="row">
                    <div className="col d-flex mt-5 fs-3 justify-content-left border-bot">
                        {assignmentDetails.name}
                    </div>
                </div>
                <div className="row justify-content-between mt-3">
                    {/* <div className="col-11 col-md-9 col-lg-8"> */}
                    <div className="Classroom_Body_student mt-4 m-0 p-0">
                        <div className="Assignments content-box py-3 px-4 pt-4 justify-content-around">
                            <a href="https://media.istockphoto.com/photos/health-care-billing-statement-with-stethoscope-picture-id1224851166?b=1&amp;k=20&amp;m=1224851166&amp;s=170667a&amp;w=0&amp;h=xBJfeOFCnBG5Z6zgI2OFicnvgMF-idwwu3TuRvtq1y8=" target="_blank">
                                <div className="d-flex flex-column">
                                    <div className="d-flex justify-content-between">
                                        <div className="Assignment_Date_student">
                                            {getDateFromTimestamp(assignmentDetails.dueDate)}
                                        </div>
                                        <div className="Assignment_Time_student">
                                            {getTimeFromTimestamp(assignmentDetails.dueDate)}
                                        </div>
                                    </div>
                                    <div className="Assignment_Box_student d-flex flex-column justify-content-center px-3 py-2">
                                        <div className="d-flex mb-2">
                                            <div className="Avatar_Container">
                                                <div className="MuiAvatar-root MuiAvatar-circular MuiAvatar-colorDefault">
                                                    {assignmentDetails.creatorName?.slice(0, 1)}
                                                </div>
                                            </div>
                                            <div className="Post_Author d-flex flex-column justify-content-center mx-3">
                                                <div className="Post_AuthorName">
                                                    {assignmentDetails.creatorName}
                                                </div>
                                                <div className="Post_AdminName">
                                                    Admin
                                                </div>
                                            </div>
                                        </div>
                                        <div className="Assignment_Img">
                                            <img src="https://media.istockphoto.com/photos/health-care-billing-statement-with-stethoscope-picture-id1224851166?b=1&amp;k=20&amp;m=1224851166&amp;s=170667a&amp;w=0&amp;h=xBJfeOFCnBG5Z6zgI2OFicnvgMF-idwwu3TuRvtq1y8=" alt="" />
                                            <div className="Assignment_Name">
                                                {assignmentDetails.name}
                                            </div>
                                        </div>
                                        <div className="Assignment_Desc mb-0 mt-2">
                                            <p className="mb-1">{assignmentDetails.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-md-4">
                        {uploadState == 2 ?
                            <div className="col d-flex mt-4 pt-3 justify-content-between border-bot fs-5">
                                <div>
                                    Your Submission
                                </div>
                                <div className="mt-1 fs-6 fw-bold text-success">
                                    Submitted
                                </div>
                            </div>
                            :
                            <div className="col d-flex mt-4 pt-3 justify-content-left border-bot fs-5 col-fs-6">
                                Your Submission
                            </div>
                        }
                        <div className="mt-3">
                            <form className='form-group' >
                                <input onChange={onUploadClick} className="display_pdf" ref={fileInput} type="file" name="upload" accept="application/pdf,application/vnd.ms-excel" />
                                {pdfFileError && <div className='error-msg text-danger'>{pdfFileError}</div>}
                                {/* <br></br> */}
                                {uploadState == 0 && (<button onClick={btnClick} type="button" className={btn_class}><strong>{text}</strong></button>)}

                                {
                                    uploadState == 1 && (
                                        <>
                                            {!pdfFileError ? ( 
                                                <div className="content-box px-2 py-2">
                                                    <div className="Assignment_Img ">
                                                        <img src="https://media.istockphoto.com/photos/health-care-billing-statement-with-stethoscope-picture-id1224851166?b=1&amp;k=20&amp;m=1224851166&amp;s=170667a&amp;w=0&amp;h=xBJfeOFCnBG5Z6zgI2OFicnvgMF-idwwu3TuRvtq1y8=" alt="" />
                                                        <div className="Assignment_Name">
                                                            {inputFile ? inputFile.name : null}
                                                        </div>
                                                    </div>
                                                </div>
                                                ) : null
                                            }
                                            {
                                                loading ? (
                                                    <div className="d-flex justify-content-center mt-3">
                                                        <CircularProgress />
                                                    </div>
                                                ) : (
                                                    <div className="d-flex justify-content-between">
                                                        <button onClick={btnClick} type="button" className={btn_class}><strong>{text}</strong></button>
                                                        <button onClick={btnClick_back} type="button" className={btn_class_1}><strong>ReUpload</strong></button>
                                                    </div>
                                                )
                                            }
                                            
                                        </>
                                    )
                                }

                                {uploadState == 2 && (
                                    <>
                                        <div className="content-box px-2 py-2">
                                            <a href={submissionDetails?.fileLink} target="_blank">
                                                <div className="Assignment_Img">
                                                    <img src="https://media.istockphoto.com/photos/health-care-billing-statement-with-stethoscope-picture-id1224851166?b=1&amp;k=20&amp;m=1224851166&amp;s=170667a&amp;w=0&amp;h=xBJfeOFCnBG5Z6zgI2OFicnvgMF-idwwu3TuRvtq1y8=" alt="" />
                                                    <div className="Assignment_Name">
                                                        {submissionDetails?.fileName}
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <button 
                                            onClick={btnClick} 
                                            type="button" 
                                            className={btn_class}>
                                                <strong>{text}</strong>
                                        </button> 
                                    </>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentSubmission;
