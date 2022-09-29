import React, { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { SiMinutemailer } from "react-icons/si"
import { useDispatch, useSelector } from "react-redux";
import "./Contact.css";
import { contactUs } from "../../actions/user.js";
import { useAlert } from "react-alert";


const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();

  const {
    loading,
    message: alertMessage,
    error,
  } = useSelector((state) => state.update);

  const contactFormHandler = (e) => {
    e.preventDefault();
    dispatch(contactUs(name, email, message));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }
    if (alertMessage) {
      alert.success(alertMessage);
      dispatch({ type: "CLEAR_MESSAGE" });
    }
  }, [alert, error, alertMessage, dispatch]);

  return (
    <div className="contact">
      <div className="contactCanvasContainer">
        <div id='stars'></div>
        <div id='stars2'></div>
        <div id='stars3'></div>
      <div className="contactRightBar"></div>

      <div className="contactContainer">

        <form className="contactContainerForm" onSubmit={contactFormHandler}>
          <Typography variant="h4"><p>C</p>
                                   <p>o</p>
                                   <p>n</p>
                                   <p>t</p>
                                   <p>a</p>
                                   <p>c</p>
                                   <p style={{ marginRight: "2vmax" }}>t</p>
                                   
                                   <p>M</p>
                                   <p>e</p></Typography>

          <input type="text" placeholder="Name" required value={name} onChange={(e) => setName(e.target.value)}/>
          <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>

          <textarea placeholder="Message" required cols="30" rows="10" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
          <Button variant="contained" type="submit" disabled={loading}>
          SEND <SiMinutemailer style={{color: "white"}}/>
          </Button>
        </form>
      </div>
    </div>
  </div>
  );
};

export default Contact;