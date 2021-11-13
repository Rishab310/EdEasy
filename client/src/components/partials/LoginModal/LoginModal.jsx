import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Modal, ModalBody, TabContent, TabPane } from "reactstrap";
import { withRouter, Redirect } from "react-router-dom";
import "./LoginModal.css";
import SingInImage from "../../../assets/signin.svg";
import SingUpImage from "../../../assets/signup.svg";
import CircularProgress from "@material-ui/core/CircularProgress";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ContactPhoneOutlinedIcon from "@material-ui/icons/ContactPhoneOutlined";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import axios from "axios";
import { ASYNC_LOGIN, ASYNC_SIGNUP, selectUserData, SET_ERROR_NULL } from '../../../reduxSlices/authSlice';
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
      backgroundColor: "transparent !important",
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
    margin: theme.spacing(2),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "100%",
  },
}));

function validateEmail(email) {
  // console.log(email);
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
  const regex_pass =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,20}$/;
  return regex_pass.test(password);
}

const LoginModal = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectorData = useSelector(selectUserData);
  const error = selectorData.error;
  const logging = selectorData.logging;
  const [contactError, setContactError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    showPassword: false,
  });

  useEffect(() => {
    dispatch(SET_ERROR_NULL());
    setContactError(false);
    setPasswordError(false);
    setEmailError(false);
    setValues({
      name: "",
      email: "",
      password: "",
      contact: "",
      showPassword: false,
    });
  }, [activeTab]);

  useEffect(() => {
    // console.log(selectorData);
    if (selectorData.token) {
      props.setShow(false);
    }
  }, [selectorData.token]);

  const handleChange = (prop) => (event) => {
    if (prop === "contact" && isNaN(event.target.value)) {
      return;
    }
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    // console.log("Inside form submit");
    let flag = 0;

    if (!validateEmail(values.email)) {
      setEmailError(true);
      flag = 1;
    } else {
      setEmailError(false);
    }

    if (!validatePassword(values.password)) {
      setPasswordError(true);
      flag = 1;
    } else {
      setPasswordError(false);
    }

    if (activeTab === "2" && values.contact.length !== 10) {
      setContactError(true);
      flag = 1;
    } else {
      setContactError(false);
    }

    if (flag) return;

    if (activeTab === "1") {
      dispatch(
        ASYNC_LOGIN({
          email: values.email,
          password: values.password,
          logging: true,
        }));
    } else {
      dispatch(
        ASYNC_SIGNUP({
          email: values.email,
          password: values.password,
          name: values.name,
          contact:values.contact
        })); 
    }
  };
  
  return (
    <>
      <Modal
        id="loginSignUp"
        isOpen={props.isModalOpen}
        toggle={props.toggleModal}
        className="login"
      >
        <ModalBody className="auth-inner pt-5">
          <div className="row">
            <div className="col-6 d-flex justify-content-center">
              <button
                className={
                  activeTab == "1" ? "active navigation-btn" : "navigation-btn"
                }
                onClick={() => setActiveTab("1")}
                style={{ cursor: "pointer" }}
              >
                <h5 className="font-weight-bold pb-0 pt-2">Login</h5>
              </button>
            </div>
            <div className="col-6 d-flex justify-content-center">
              <button
                className={
                  activeTab == "2" ? "active navigation-btn" : "navigation-btn"
                }
                onClick={() => setActiveTab("2")}
                style={{ cursor: "pointer" }}
              >
                <h5 className="font-weight-bold pb-0 pt-2">Sign Up</h5>
              </button>
            </div>
          </div> 
          <TabContent activeTab={activeTab} className="mt-4">
            <TabPane tabId="1">
              {/* SIGN IN */}
              <div className="row pb-5">
                <div className="col-lg-6 d-none d-lg-block px-md-5">
                  <div className="row">
                    <div className="col-12 d-flex justify-content-center align-items-center  ">
                      <img src={SingUpImage} width="80%" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 d-flex justify-content-center align-items-center  forgot-password text-center pt-4">
                      Don't have an account{" "}
                      <a
                        className="or-signin pt-0 ps-1"
                        style={{ color: "#167BFF !important" }}
                        onClick={() => setActiveTab("2")}
                      >
                        {" "}
                        sign up?
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6 px-md-5 mt-4">
                  <form className={classes.root}>
                    <FormControl
                      error={emailError}
                      className={clsx(classes.margin, classes.textField)}
                    >
                      <InputLabel htmlFor="email">Email</InputLabel>
                      <Input
                        placeholder="Type your email"
                        fullWidth
                        id="email"
                        type="email"
                        margin="normal"
                        value={values.email}
                        onChange={handleChange("email")}
                        startAdornment={
                          <InputAdornment position="start">
                            <PermIdentityIcon />
                          </InputAdornment>
                        }
                      />
                      {emailError ? (
                        <FormHelperText>Enter a valid Email ID</FormHelperText>
                      ) : null}
                    </FormControl>
                    <FormControl
                      error={passwordError}
                      className={clsx(
                        classes.margin,
                        classes.textField,
                        classes.formControl
                      )}
                    >
                      <InputLabel htmlFor="password">Password</InputLabel>
                      <Input
                        fullWidth
                        placeholder="Type your password"
                        id="password"
                        type={values.showPassword ? "text" : "password"}
                        value={values.password}
                        onChange={handleChange("password")}
                        startAdornment={
                          <InputAdornment position="start">
                            <LockOutlinedIcon />
                          </InputAdornment>
                        }
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {values.showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {passwordError ? (
                        <FormHelperText>
                          Password must have at least 1 number 1 uppercase and
                          lowercase character, 1 special symbol and between 8 to
                          20 characters
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                    <div className="d-flex flex-column align-items-center">
                      {
                        logging ? <CircularProgress className="display-block"/> : error ? <p className="text-center text-danger mb-0 mt-3">{error}</p> : null
                      }
                      <button onClick={formSubmitHandler} className="form-btn mx-auto">
                        Sign In
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </TabPane>
            <TabPane tabId="2">
              {/* SIGN UP */}
              <div className="row pb-4 mb-1">
                <div className="col-12 col-lg-6 px-md-5">
                  <form className={classes.root}>
                    <FormControl
                      error={emailError}
                      className={clsx(classes.margin, classes.textField)}
                    >
                      <InputLabel htmlFor="email">Full Name</InputLabel>
                      <Input
                        placeholder="Type your name"
                        fullWidth
                        id="name"
                        type="name"
                        margin="normal"
                        value={values.name}
                        onChange={handleChange("name")}
                        startAdornment={
                          <InputAdornment position="start">
                            <PermIdentityIcon />
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                    <FormControl
                      error={emailError}
                      className={clsx(classes.margin, classes.textField)}
                    >
                      <InputLabel htmlFor="email">Email</InputLabel>
                      <Input
                        placeholder="Type your email"
                        fullWidth
                        id="email"
                        type="email"
                        margin="normal"
                        value={values.email}
                        onChange={handleChange("email")}
                        startAdornment={
                          <InputAdornment position="start">
                            <PermIdentityIcon />
                          </InputAdornment>
                        }
                      />
                      {emailError ? (
                        <FormHelperText>Enter a valid Email ID</FormHelperText>
                      ) : null}
                    </FormControl>
                    <FormControl
                      error={passwordError}
                      className={clsx(
                        classes.margin,
                        classes.textField,
                        classes.formControl
                      )}
                    >
                      <InputLabel htmlFor="password">Password</InputLabel>
                      <Input
                        fullWidth
                        placeholder="Type your password"
                        id="password"
                        type={values.showPassword ? "text" : "password"}
                        value={values.password}
                        onChange={handleChange("password")}
                        startAdornment={
                          <InputAdornment position="start">
                            <LockOutlinedIcon />
                          </InputAdornment>
                        }
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {values.showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {passwordError ? (
                        <FormHelperText>
                          Password must have at least 1 number 1 uppercase and
                          lowercase character, 1 special symbol and between 8 to
                          20 characters
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                    <FormControl
                      error={contactError}
                      className={clsx(classes.margin, classes.textField)}
                    >
                      <InputLabel htmlFor="contact">Contact Number</InputLabel>
                      <Input
                        placeholder="Type your Contact Number"
                        fullWidth
                        id="contact"
                        type="text"
                        margin="normal"
                        value={values.contact}
                        onChange={handleChange("contact")}
                        startAdornment={
                          <InputAdornment position="start">
                            <ContactPhoneOutlinedIcon />
                          </InputAdornment>
                        }
                      />
                      {contactError ? (
                        <FormHelperText>
                          Enter a Valid Contact Number (10 digits only)
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                    <div className="d-flex flex-column align-items-center">
                    {
                      logging ? <CircularProgress /> : error ? <p className="text-center text-danger mb-0 mt-3">{error}</p> : null
                    }
                      <button onClick={formSubmitHandler} className="form-btn mx-auto">
                        Sign Up
                      </button>
                    </div>
                  </form>
                </div>
                <div className="col-lg-6 d-none d-lg-block px-md-5">
                  <div className="row">
                    <div className="col-12 d-flex justify-content-center align-items-center pt-2">
                      <img src={SingInImage} width="95%" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 d-flex justify-content-center align-items-center  forgot-password text-center pt-4">
                      Already registered{" "}
                      <a
                        className="or-signin pt-0 ps-1"
                        style={{ color: "#167BFF !important" }}
                        onClick={() => setActiveTab("1")}
                      >
                        {" "}
                        sign in?
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </TabPane>
          </TabContent>
        </ModalBody>
      </Modal>
    </>
  );
};

export default LoginModal;
