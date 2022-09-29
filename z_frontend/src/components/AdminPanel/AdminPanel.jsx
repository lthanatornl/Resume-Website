import React, { useEffect, useState } from "react";
import "./AdminPanel.css";
import { Button, Typography } from "@mui/material";
import { SiGitbook, SiGooglescholar } from "react-icons/si";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateUser } from "../../actions/user.js";
import { useAlert } from "react-alert";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { message: loginMessage } = useSelector((state) => state.login);
  const { message, error, loading } = useSelector((state) => state.update);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [about, setAbout] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser(name, email, password, about));

    console.log(name, email, password, about);
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  const handleAboutImage = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();

    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAbout({ ...about, avatar: Reader.result });
      }
    };
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
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="adminPanelInputs"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="adminPanelInputs"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="adminPanelInputs"
          />

          <div className="adminPanelAbout">
            <fieldset>
              <legend>About</legend>
              <input
                type="text"
                placeholder="Name"
                value={about.name}
                onChange={(e) => setAbout({ ...about, name: e.target.value })}
                className="adminPanelInputs"
              />
              <input
                type="text"
                placeholder="Date Of Birth"
                value={about.title}
                onChange={(e) => setAbout({ ...about, title: e.target.value })}
                className="adminPanelInputs"
              />
              <input
                type="text"
                placeholder="Subtitle"
                value={about.subtitle}
                onChange={(e) =>
                  setAbout({ ...about, subtitle: e.target.value })
                }
                className="adminPanelInputs"
              />
              <textarea
                type="text"
                placeholder="Description"
                cols="30" 
                rows="10"
                value={about.description}
                onChange={(e) =>
                  setAbout({ ...about, description: e.target.value })
                }
                className="adminPanelInputs"
              />
              <textarea
                type="text"
                placeholder="Experience"
                cols="30" 
                rows="10"
                value={about.quote}
                onChange={(e) => setAbout({ ...about, quote: e.target.value })}
                className="adminPanelInputs"
              />

              <input
                type="file"
                onChange={handleAboutImage}
                className="adminPanelFileUpload"
                placeholder="Choose Avatar"
                accept="image/*"
              />
            </fieldset>
          </div>

          <Link to="/thanatorn/graduation">
            GRADUATION <SiGooglescholar />
          </Link>
          <Link to="/thanatorn/project">
            PROJECTS <SiGitbook />
          </Link>

          <Button type="submit" variant="contained" disabled={loading}>
            Update
          </Button>
        </form>

        <Button
          variant="contained"
          color="error"
          style={{ display: "block", margin: "4vmax auto" }}
          onClick={logoutHandler}
        >
          LOGOUT
        </Button>
      </div>
    </div>
  );
};

export default AdminPanel;