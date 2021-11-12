import React, { useState, useEffect, useRef } from 'react'
import autosize from 'autosize';
import { useSelector } from 'react-redux';
import DescriptionIcon from '@material-ui/icons/Description';
import SubjectIcon from '@material-ui/icons/Subject';
import ClassIcon from '@material-ui/icons/Class';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import VideocamIcon from '@material-ui/icons/Videocam';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, ModalBody} from "reactstrap";
import axios from 'axios';
import { selectUserData} from '../../reduxSlices/authSlice';

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
        width: "100%",
    },
}));

const CreateClassroom = (props) => {
    let TextArea = useRef(null);
    const classes = useStyles();
    const [values, setValues] = useState({
        description: "",
        className: "",
        fieldName: "",
        classLevel: "",
        meetLink: ""
    });
    const [error, setError] = useState(null);
    const storeData = useSelector(selectUserData);
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        axios.post("https://edeasy-server.herokuapp.com/classes/createClassroom", {
            adminName: storeData.userName,
            adminEmail: storeData.userEmail,
            desc: values.description,
            className: values.className,
            meetLink: values.meetLink,
            fieldName: values.fieldName,
            classLevel: values.classLevel
        },{ headers: { Authorization: 'Bearer ' + storeData.token } }
        )
        .then((res)=>{
            console.log(res);
            console.log("Created");
            props.setShow(false);
            window.location.reload(false);
        })
        .catch(err => setError(err.response.data.message));
    }
    useEffect(() => {
        autosize(TextArea);
    }, [])

    return (
        <>
        <Modal
        className="assignment_modal"
            isOpen={props.isModalOpen}
            toggle={props.toggleModal}
            >
            <ModalBody>

        <div style={{ backgroundColor: "white" }}>
            <div className="container">
                <div className="row justify-content-sm-center"> 
                    <div className="col-12 pb-0">
                        <h1 style={{color:"rgb(90,90,90)"}} className="text-center mb-4 fs-2">Create Classroom</h1>
                        <form onSubmit={handleSubmit}  >
                            <FormControl className={clsx(classes.margin, classes.textField)}>
                                <InputLabel htmlFor="classname"></InputLabel>
                                <Input
                                    style={{marginBottom:"10px"}}
                                    placeholder="Enter Class Name"
                                    fullWidth
                                    id="classname"
                                    type="text"
                                    margin="normal"
                                    required
                                    value={values.className}
                                    onChange={handleChange("className")}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <ClassIcon />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <FormControl className={clsx(classes.margin, classes.textField)}>
                                <InputLabel htmlFor="description"></InputLabel>
                                <Input
                                    style={{marginBottom:"10px"}}
                                    placeholder="Enter Class Description (Max 20 characters)"
                                    fullWidth
                                    id="description"
                                    type="textarea"
                                    margin="normal"
                                    required
                                    value={values.description}
                                    ref={c => (TextArea = c)}
                                    rows={1}
                                    onChange={handleChange("description")}
                
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <DescriptionIcon />
                                        </InputAdornment>
                                    }
                                    />
                            </FormControl>
                            <FormControl className={clsx(classes.margin, classes.textField)}>
                                <InputLabel htmlFor="field"></InputLabel>
                                <Input
                                    style={{marginBottom:"10px"}}
                                    placeholder="Enter Field Name"
                                    fullWidth
                                    id="field"
                                    type="text"
                                    margin="normal"
                                    required
                                    value={values.fieldName}
                                    onChange={handleChange("fieldName")}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <SubjectIcon />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>

                            <FormControl className={clsx(classes.margin, classes.textField)}>
                                <InputLabel htmlFor="classlevel"></InputLabel>
                                <Input
                                    style={{marginBottom:"10px"}}
                                    placeholder="Enter Class Level"
                                    fullWidth
                                    id="classlevel"
                                    type="text"
                                    margin="normal"
                                    required
                                    value={values.classLevel}
                                    onChange={handleChange("classLevel")}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <MenuBookIcon />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>

                            <FormControl className={clsx(classes.margin, classes.textField)}>
                                <InputLabel htmlFor="meet"></InputLabel>
                                <Input
                                    style={{marginBottom:"10px"}}
                                    placeholder="Enter Meeting Link"
                                    fullWidth
                                    id="meetlink"
                                    type="text"
                                    margin="normal"
                                    value={values.meetLink}
                                    onChange={handleChange("meetLink")}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <VideocamIcon />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <FormControl className={clsx(classes.margin, classes.textField)}>
                                {error && <div className='error-msg text-danger'>{error}</div>}
                            </FormControl>

                            <button type="submit" style={{display:"flex",justifyContent:"center"}} className="m-auto mt-2 form-btn">Create</button> 
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

export default CreateClassroom
