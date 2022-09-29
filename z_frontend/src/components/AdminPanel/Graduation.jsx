import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { addGraduation, deleteGraduation, getUser } from "../../actions/user.js";
import { MdKeyboardBackspace } from "react-icons/md";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { SiGooglescholar } from "react-icons/si";

const Graduation = () => {
  const { message, error, loading } = useSelector((state) => state.update);
  const { message: loginMessage } = useSelector((state) => state.login);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const alert = useAlert();

  const [place, setPlace] = useState("");
  const [degree, setDegree] = useState("");
  const [date, setDate] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(addGraduation(place, degree, date));
    dispatch(getUser());
  };
  const deleteHandler = async (id) => {
    await dispatch(deleteGraduation(id));
    dispatch(getUser());
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "CLEAR_MESSAGE" });
    }

    if (loginMessage) {
      alert.success(loginMessage);
      dispatch({ type: "CLEAR_MESSAGE" });
    }
  }, [alert, error, message, dispatch, loginMessage]);

  return (
    <div className="adminPanel">
      <div className="adminPanelContainer">
        <Typography variant="h4">
          <p>O</p>
          <p>O</p>
          <p>M</p>
          <p style={{ marginRight: "1vmax" }}>'s</p>

          <p>P</p>
          <p>A</p>
          <p>N</p>
          <p>E</p>
          <p>L</p>
        </Typography>
        
        <form onSubmit={submitHandler}>
          <div className="adminPanelAbout">
            <fieldset>
              <legend>Graduation</legend>
          <input
            type="text"
            placeholder="School"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            className="adminPanelInputs"
          />
          <input
            type="text"
            placeholder="Degree"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            className="adminPanelInputs"
          />
          <input
            type="date"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="adminPanelInputs"
          />
          </fieldset>
        </div>
          <Link to="/account">
            BACK <MdKeyboardBackspace />
          </Link>

          <Button type="submit" variant="contained" disabled={loading}>
            Add
          </Button>
          
        </form>
        
        <div className="adminPanelDisplay">
          {user &&
            user.graduation &&
            user.graduation.map((item) => (
              
              <div className="DisplayCard" key={item._id}>
                <Typography variant="h6">
                   <SiGooglescholar /> {item.place}
                  </Typography>
                <Typography variant="body1" style={{ letterSpacing: "2px" }}>
                  {item.degree}
                </Typography>
                <Typography variant="body1" style={{ fontWeight: 600 }}>
                  {item.date.toString().split("T")[0]}
                </Typography>
                
                <Button
                  style={{
                    margin: "auto",
                    display: "block",
                    color: "rgba(40,40,40,0.7)",
                  }}
                  onClick={() => deleteHandler(item._id)}
                >
                  <FaTrash />
                </Button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Graduation;