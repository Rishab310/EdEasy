import React from 'react'
import './StudentSubmission.css'
import Avatar from '@material-ui/core/Avatar';

const StudentSubmission = () => {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col d-flex mt-5 fs-3 justify-content-left border-bot">
                        Assignment - 01 DS-OS
                    </div>
                </div>
                <div class="row justify-content-between mt-3">
                    {/* <div class="col-11 col-md-9 col-lg-8"> */}
                    <div class="Classroom_Body_student mt-4 m-0 p-0">
                        <div class="Assignments content-box py-3 px-4 pt-4 justify-content-around">
                            <a href="https://media.istockphoto.com/photos/health-care-billing-statement-with-stethoscope-picture-id1224851166?b=1&amp;k=20&amp;m=1224851166&amp;s=170667a&amp;w=0&amp;h=xBJfeOFCnBG5Z6zgI2OFicnvgMF-idwwu3TuRvtq1y8=" target="_blank">
                                <div class="d-flex flex-column">
                                    <div class="d-flex justify-content-between">
                                        <div class="Assignment_Date">
                                            11 October 2021
                                        </div>
                                        <div class="Assignment_Time">
                                            2:00 PM
                                        </div>
                                    </div>
                                    <div class="Assignment_Box_student d-flex flex-column justify-content-center px-3 py-2">
                                    <div class="d-flex mb-2">
                                        <div class="Avatar_Container">
                                            <div class="MuiAvatar-root MuiAvatar-circular MuiAvatar-colorDefault">
                                                M
                                            </div>
                                        </div>
                                        <div class="Post_Author d-flex flex-column justify-content-center mx-3">
                                            <div class="Post_AuthorName">
                                                Manish Dhameja
                                                </div>
                                            <div class="Post_AdminName">
                                                Admin
                                            </div>
                                        </div>
                                    </div>
                                        <div class="Assignment_Img">
                                            <img src="https://media.istockphoto.com/photos/health-care-billing-statement-with-stethoscope-picture-id1224851166?b=1&amp;k=20&amp;m=1224851166&amp;s=170667a&amp;w=0&amp;h=xBJfeOFCnBG5Z6zgI2OFicnvgMF-idwwu3TuRvtq1y8=" alt="" />
                                            <div class="Assignment_Name">
                                                Lab Assgn1.pdf
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="col d-flex mt-4 pt-3 justify-content-left border-bot fs-5">
                            Your Submission
                        </div>
                        <div className="mt-3">
                            <button type="button" class="btn btn-outline-primary fs-6"><strong>Upload Work</strong></button>
                        </div>
                    </div>
                </div>
            {/* </div> */}
            </div>
        </div>    
    )        
}

export default StudentSubmission;
