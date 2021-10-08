import React, { useState } from "react";
import { Nav, NavItem, Modal, ModalBody, NavLink, TabContent, TabPane, Form, FormGroup, Label, Input, FormFeedback,} from "reactstrap";
import { withRouter, Redirect } from "react-router-dom";
import "./LoginModal.css";
import SingInImage from '../../../assets/signin.svg';
import SingUpImage from '../../../assets/signup.svg';
const LoginModal = (props) => {
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    console.log("Logged in!");
  }
  const handleSignUpSubmit = (event) => {
    event.preventDefault();
    console.log("Signd up!");
  }
  const [userLogin, setUserLogin] = useState({
    "username": '',
    "password": '',
    "remember": false
  })
  const [userSignUp, setUserSignUp] = useState({
    "fname": '',
    "lname": '',
    "username": '',
    "email_id": '',
    "password": '',
    "cpassword": '',
  })
  const [touched, setTouched] = useState({
    username: '',
    email_id: '',
    password: '',
    cpassword: '',
  })
  const loginError ="",signUpError="";
  const [activeTab, setActiveTab] = useState("1");
  const handleBlur = (field) => (event) => {
    setTouched((prevState) => ({...prevState,[field]: true }));
  }
  const validate = (username, email_id, password, cpassword) => {
    const errors = {
      username: '',
      email_id: '',
      password: '',
      cpassword: ''
    };
    if (touched.username && username.length < 3)
      errors.username = 'Username should be greater than 3 characters long';

    const regex_email = /^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+$/;
    if (touched.email_id && !regex_email.test(email_id))
      errors.email_id = 'Enter a valid email address';

    const regex_pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,20}$/;
    if (touched.password && !regex_pass.test(password))
      errors.password = 'Password must have at least 1 number 1 uppercase and lowercase character, 1 special symbol and between 8 to 20 characters';

    if (touched.cpassword && !(password === cpassword))
      errors.cpassword = 'Passwords don\'t match';

    return errors;
  }
  const handleLoginChange = (event) => {
    
    const target = event.target;
    const value = (target.type === 'checkbox') ? target.checked : target.value;
    const name = target.name;
    setUserLogin((prevState) => ({...prevState,[name]: value}));
  }

  const handleSignUpChange = (event) => {
    // event.preventDefault();
    const target = event.target;
    const value = (target.type === 'checkbox') ? target.checked : target.value;
    const name = target.name;
    setUserSignUp((prevState) => ({...prevState,[name]: value}));
  }
  const errors = validate(userSignUp.username, userSignUp.email_id, userSignUp.password, userSignUp.cpassword);
  return (
    <>
      <Modal id="loginSignUp" isOpen={props.isModalOpen} toggle = {props.toggleModal} className="login">
        <ModalBody className="auth-inner pt-5">
          <Nav tabs className="d-flex justify-content-center align-items-center mt-2 mb-2">
            <NavItem className="w-50 text-center">
              <NavLink className={props.activeTab == '1' ? 'active' : ''} onClick={() => setActiveTab('1')} style={{ cursor: "pointer" }}>
                <h5 className="font-weight-bold pb-0 pt-2">Login</h5>
              </NavLink>
            </NavItem>
            <NavItem className="w-50 text-center">
              <NavLink className={props.activeTab == '2' ? 'active' : ''} onClick={() => setActiveTab('2')} style={{ cursor: "pointer" }}>
                <h5 className="font-weight-bold pb-0 pt-2">Sign Up</h5>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab} className="mt-4">
            <TabPane tabId="1">
              {/* SIGN IN */}
              <div className="row">
                <div className="col-md-6 d-none d-md-flex justify-content-center">
                  <img src={SingInImage}/>
                </div>
                <div className="col-12 col-md-6">
                  <Form onSubmit={handleLoginSubmit}>
                    <FormGroup>
                      <Label className="font-weight-bold">Username</Label>
                      <Input type="text" name="username" className="form-control" placeholder="Enter username" value={userLogin.email} onChange={handleLoginChange} required />
                    </FormGroup>
                    <FormGroup>
                      <Label className="font-weight-bold">Password</Label>
                      <Input type="password" id="password" name="password" className="form-control" placeholder="Enter password" value={userLogin.password} onChange={handleLoginChange} required />
                    </FormGroup>
                    <FormGroup>
                      <div className="custom-control custom-checkbox">
                        <Input type="checkbox" className="custom-control-input" id="remember" name="remember" value={userLogin.remember} onChange={handleLoginChange} />
                        <Label className="custom-control-label" htmlFor="remember" >Remember me</Label>
                      </div>
                    </FormGroup>
                    <FormGroup>
                      <FormFeedback className="d-block">{loginError}</FormFeedback>
                    </FormGroup>
                    <button type="submit" className="btn btn-primary btn-block">Login</button>
                    <p className="forgot-password text-right">
                      <a href="password/forgot">Forgot password?</a>
                    </p>
                  </Form>
                </div>
              </div>
              
            </TabPane>
            <TabPane tabId="2">
              {/* SIGN UP */}
              <div className="row">
                <div className="col-12 col-md-6">
                  <Form onSubmit={handleSignUpSubmit}>
                  <FormGroup>
                    <label className="font-weight-bold">First name</label>
                    <input type="text" id="fname" name="fname" className="form-control" placeholder="First name" value={userSignUp.firstname} onChange={handleSignUpChange} required />
                  </FormGroup>
                  <FormGroup>
                    <label className="font-weight-bold">Last name</label>
                    <input type="text" id="lname" name="lname" className="form-control" placeholder="Last name" value={userSignUp.lastname} onChange={handleSignUpChange} required />
                  </FormGroup>
                  <FormGroup>
                    <label className="font-weight-bold">Username</label>
                    <input type="text" id="username" name="username" className="form-control" placeholder="User name" value={userSignUp.username} onChange={handleSignUpChange} required
                      onBlur={handleBlur('username')} valid={errors.username === ''} invalid={errors.username !== ''}
                    />
                    <FormFeedback>{errors.username}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <label className="font-weight-bold">Email address</label>
                    <input type="email" name="email_id" className="form-control" placeholder="Enter email" value={userSignUp.email} onChange={handleSignUpChange} required
                      onBlur={handleBlur('email_id')} valid={errors.email_id === ''} invalid={errors.email_id !== ''}
                    />
                    <FormFeedback>{errors.email_id}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <label className="font-weight-bold">Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Enter password" value={userSignUp.password} onChange={handleSignUpChange} required
                      onBlur={handleBlur('password')} valid={errors.password === ''} invalid={errors.password !== ''}
                    />
                    <FormFeedback>{errors.password}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <label className="font-weight-bold">Confirm Password</label>
                    <input type="password" name="cpassword" className="form-control" placeholder="Confirm password" value={userSignUp.cnfPassword} onChange={handleSignUpChange} required
                      onBlur={handleBlur('cpassword')} valid={errors.cpassword === ''} invalid={errors.cpassword !== ''}
                    />
                    <FormFeedback>{errors.cpassword}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <FormFeedback className="d-block">{signUpError}</FormFeedback>
                  </FormGroup>
                  <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                  <p className="forgot-password text-right">
                    Already registered <a className="or-signin" style={{ color: "#167BFF !important" }} onClick={() => setActiveTab('1')} >sign in?</a>
                  </p>
                </Form>
                </div>
                <div className="col-md-6 d-none d-md-flex justify-content-center">
                  <img src={SingUpImage}/>
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
