import React, { useState, useRef } from 'react'
import './StudentSubmission.css'
import Avatar from '@material-ui/core/Avatar';
import Header from '../partials/Header/Header'
import MobileHeader from '../partials/Header/MobileHeader'
import FooterNav from '../partials/FooterNav/FooterNav'

const StudentSubmission = () => {
    let btn_class = '';
    let btn_class_1 = '';
    let text = '';
    let btnClick = null;
    let btnClick_back = null;

    // const [pdfFile, setPdfFile] = useState([])

    const uploadFile = () => {
        fileInput.current.click();
        // setUploadState(1);
    }
    const submitFile = () => {
        setUploadState(2);
    }
    const unSubmitFile = () => {
        setUploadState(0);
    }
    const [pdfFileError, setPdfFileError] = useState('');

    const [uploadState, setUploadState] = useState(0);
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

    // const [pdfFile, setPdfFile] = useState(null);
    const fileInput = useRef(null);
    const [inputFile, setInputFile] = useState(null);

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
    console.log(inputFile);

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
                        Assignment - 01 DS-OS
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
                                            11 October 2021
                                        </div>
                                        <div className="Assignment_Time_student">
                                            2:00 PM
                                        </div>
                                    </div>
                                    <div className="Assignment_Box_student d-flex flex-column justify-content-center px-3 py-2">
                                        <div className="d-flex mb-2">
                                            <div className="Avatar_Container">
                                                <div className="MuiAvatar-root MuiAvatar-circular MuiAvatar-colorDefault">
                                                    M
                                                </div>
                                            </div>
                                            <div className="Post_Author d-flex flex-column justify-content-center mx-3">
                                                <div className="Post_AuthorName">
                                                    Manish Dhameja
                                                </div>
                                                <div className="Post_AdminName">
                                                    Admin
                                                </div>
                                            </div>
                                        </div>
                                        <div className="Assignment_Img">
                                            <img src="https://media.istockphoto.com/photos/health-care-billing-statement-with-stethoscope-picture-id1224851166?b=1&amp;k=20&amp;m=1224851166&amp;s=170667a&amp;w=0&amp;h=xBJfeOFCnBG5Z6zgI2OFicnvgMF-idwwu3TuRvtq1y8=" alt="" />
                                            <div className="Assignment_Name">
                                                Lab_Assignment-1
                                            </div>
                                        </div>
                                        <div className="Assignment_Desc mb-0">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veni"</p>
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

                                {uploadState == 1 && (<>
                                    {!pdfFileError ? <div className="content-box px-0 pt-3 pb-3">
                                        <div className="Assignment_Img ">
                                            <img src="https://media.istockphoto.com/photos/health-care-billing-statement-with-stethoscope-picture-id1224851166?b=1&amp;k=20&amp;m=1224851166&amp;s=170667a&amp;w=0&amp;h=xBJfeOFCnBG5Z6zgI2OFicnvgMF-idwwu3TuRvtq1y8=" alt="" />
                                            <div className="Assignment_Name">
                                                {inputFile ? inputFile.name : null}
                                            </div>
                                        </div>
                                        </div>
                                        : null
                                    }
                                    <div className="d-flex justify-content-between">
                                        <button onClick={btnClick} type="button" className={btn_class}><strong>{text}</strong></button>
                                        <button onClick={btnClick_back} type="button" className={btn_class_1}><strong>ReUpload</strong></button>
                                    </div>
                                </>)
                                }

                                {uploadState == 2 && (<>
                                    <div className="Assignment_Img">
                                        <img src="https://media.istockphoto.com/photos/health-care-billing-statement-with-stethoscope-picture-id1224851166?b=1&amp;k=20&amp;m=1224851166&amp;s=170667a&amp;w=0&amp;h=xBJfeOFCnBG5Z6zgI2OFicnvgMF-idwwu3TuRvtq1y8=" alt="" />
                                        <div className="Assignment_Name">
                                            {inputFile.name}
                                        </div>
                                    </div>
                                    <button onClick={btnClick} type="button" className={btn_class}><strong>{text}</strong></button> </>)
                                }
                            </form>
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </div>
        </div>
    )
}

export default StudentSubmission;
