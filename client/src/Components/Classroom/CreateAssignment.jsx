import React, { useState, useEffect, useRef } from 'react'
import autosize from 'autosize';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import DescriptionIcon from '@material-ui/icons/Description';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import AssignmentIcon from '@material-ui/icons/Assignment';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, ModalBody} from "reactstrap";
import './CreateAssignment.css'

const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center", 
      marginTop: "10px",
      "& .MuiInputLabel-formControl ": {
        top: "-6px",
        fontSize: "18px",
        color: "gray",
        // fontWeight: 'bold'
      },
      "& .MuiInputBase-input::placeholder": {
        fontSize: "14px",
      },
      "& .MuiFormLabel-filled": {
        backgroundColor: "transaprent !important",
      },
      "& .MuiInputBase-root": {
        paddingBottom: "5px",
      },
      "& .MuiSelect-root": {
        paddingBottom: "0px",
        fontSize: "16px",
      },
      "& > .MuiButtonBase-root": {
        width: "90%",
        marginTop: "20px !important",
      },
    },
    margin: {
      margin: 0,
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
        // backgroundColor:"white !important",
      width: "100%",
    },
  }));

const CreateAssignment = (props) => {
    let TextArea = useRef(null);
    const classes = useStyles();
    const [values, setValues] = useState({
        name: "",
        description: "",
        dueDate: "",
    });

    const [fileInput, setFileInput] = useState(null);
    const [pdfFileError, setPdfFileError] = useState('');

    const handleChange = (prop) => (event) => {
        if (prop === "fileInput") {
            if (!event.target.files[0]) {
                return
            }
            setFileInput({ [prop]: event.target.files[0] });
            const fileType = ['application/pdf'];
            let selectedFile = event.target.files[0];
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
        setValues({ ...values, [prop]: event.target.value });


    };
    console.log(values.dueDate)

    const handleSubmit = () => {
        setValues({
            name: "",
            description: "",
            dueDate: ""
        });
        setFileInput(null)
    }
    useEffect(() => {
        autosize(TextArea);
    }, [])

    return (
        <>
            <Modal
            isOpen={props.isModalOpen}
            toggle={props.toggleModal}
            >

            <ModalBody >
                <div style={{backgroundColor:"white"}}>
                    <div className="container">
                        <div className="row justify-content-sm-center">
                            <div className="col-12 pb-3">
                                <h1 style={{color:"rgb(90,90,90)"}} className="text-center pt-3 mb-4 fs-2">Create Assignment</h1>
                                <form onSubmit={handleSubmit}>
                                <FormControl className={clsx(classes.margin, classes.textField)}>
                                    <InputLabel htmlFor="name"></InputLabel>
                                    <Input
                                        placeholder="Type Assignment name"
                                        fullWidth
                                        id="name"
                                        type="text"
                                        margin="normal"
                                        required
                                        value={values.name}

                                        onChange={handleChange("name")}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <PermIdentityIcon />
                                            </InputAdornment>
                                        }
                                        />
                                </FormControl>

                                <FormControl className={clsx(classes.margin, classes.textField)}>
                                    <InputLabel htmlFor="description"></InputLabel>
                                    <Input
                                        style={{outline:"none",border:"none" ,borderBottom:"1px solid black", marginTop:"30px"}}
                                        placeholder="Enter Assignment Description (Max 20 characters)"
                                        // type
                                        id="description"
                                        ref={c => (TextArea = c)}
                                        rows={1}
                                        // margin="normal"
                                        value={values.description}

                                        onChange={handleChange("description")}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <AssignmentIcon />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>

                                <FormControl className={clsx(classes.margin, classes.textField)}>
                                    <InputLabel htmlFor="dueDate"></InputLabel>
                                    <Input
                                        style={{marginTop:"30px"}}
                                        placeholder="Enter DueDate &amp; Time"
                                        type = "datetime-local"
                                        id="dueDate"
                                        marginTop="10px"
                                        value={values.dueDate}
                                        
                                        onChange={handleChange("dueDate")}
                                        // startAdornment={
                                        //     <InputAdornment position="start">
                                        //         <PictureAsPdfIcon />
                                        //     </InputAdornment>
                                        // }
                                    />
                                </FormControl>

                                {/* <div class="mt-3 form-group">
                                    <label class="col-form-label">Due Date &amp; Time</label>
                                    <input type="datetime-local" class="form-control" placeholder="Enter Due Date" value={values.dueDate} onChange={handleChange("dueDate")} required />
                                </div> */}
                                {/* <div class="mt-3 form-group">
                                    <label class="col-form-label">Pdf File</label>
                                    <input type="file" class="form-control" accept="application/pdf,application/vnd.ms-excel" onChange={handleChange("fileInput")} />
                                </div> */}
                                <FormControl className={clsx(classes.margin, classes.textField)}>
                                    <InputLabel htmlFor="file"></InputLabel>
                                    <Input
                                        style={{marginTop:"30px"}}
                                        placeholder="Upload pdf file"
                                        accept=".pdf"
                                        fullWidth
                                        id="pdf"
                                        type="file"
                                        marginTop="30px"

                                        onChange={handleChange("fileInput")}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <PictureAsPdfIcon />
                                            </InputAdornment>
                                        }
                                        />
                                </FormControl>
                                {!pdfFileError ?
                                    <button type="submit" class="btn btn-primary mt-4">Create</button> :
                                    <button type="submit" class="btn btn-primary mt-4 disabled">Create</button>
                                }
                                {pdfFileError && <div className='error-msg text-danger'>{pdfFileError}</div>}
                            </form>
                        </div>
                    </div>
                </div>
                </div >
            </ModalBody>
            </Modal>
        </>
    )
}

export default CreateAssignment
