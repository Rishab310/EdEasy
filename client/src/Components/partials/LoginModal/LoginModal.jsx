import React, { useState } from "react";
import { Nav, NavItem, Modal, ModalBody, NavLink, TabContent, TabPane, Form, FormGroup, Label, Input, FormFeedback,} from "reactstrap";
import { withRouter, Redirect } from "react-router-dom";
import "./LoginModal.css";
import { YouTube } from "@material-ui/icons";

const LoginModal = (props) => {
  const [activeTab, setActiveTab] = useState("1");
  return (
    <>
      <Modal id="loginSignUp" isOpen={props.isModalOpen} toggle = {props.toggleModal} className="login">
        <ModalBody className="auth-inner pt-5">
          
        </ModalBody>
      </Modal>
    </>
  );
};

export default LoginModal;
