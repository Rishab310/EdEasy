import React, { useState, useRef } from 'react'
import './StudentSubmission.css'
import Avatar from '@material-ui/core/Avatar';

const StudentSubmission = () => {
    let btn_class = '';
    let text = '';
    let btnClick = null;

    const uploadFile = ()=>{
        fileInput.current.click();
        // setUploadState(1);
    }
    const submitFile = ()=>{
        
    }
    const unSubmitFile = (e)=>{

    }

    const [uploadState, setUploadState] = useState(0);
    switch (uploadState % 3) {
        case 0: {
            btnClick = uploadFile;
            btn_class = 'btn btn-outline-primary fs-6';
            text = 'Upload';
        }
            break;
        case 1: {
            btnClick = submitFile;
            btn_class = 'btn btn-outline-success fs-6';
            text = 'Submit';
        }
            break;
        case 2: {
            btnClick = unSubmitFile;
            btn_class = 'btn btn-outline-danger fs-6';
            text = 'Unsubmit';
        }
            break;
    }

    const [pdfFile, setPdfFile] = useState(null);
    const [pdfFileError, setPdfFileError] = useState('');
    const fileInput = useRef(null);
    const [inputFile, setInputFile] = useState(null);

    const onUploadClick = (e) =>{
        setInputFile(e.target.files[0]);
        setUploadState(1);
    }
    console.log(inputFile);

    const fileType = ['application/pdf'];
    const handlePdfFileChange = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && fileType.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = (e) => {
                    setPdfFile(e.target.result);
                    setPdfFileError('');
                }
            }
            else {
                setPdfFile(null);
                setPdfFileError('Please select valid pdf file');
            }
        }    
            else{
                console.log('select your file');
            }
        
    }

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
                            <form className='form-group' >
                                <input onChange={onUploadClick} className="display_pdf" ref={fileInput} type="file" name="upload" accept="application/pdf,application/vnd.ms-excel" />
                                {pdfFileError && <div className='error-msg'>{pdfFileError}</div>}
                                <br></br>
                                <button onClick={btnClick} type="button" class={btn_class}><strong>{text}</strong></button>
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
