import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { addProject, getUser } from "../../actions/user.js";
import { MdKeyboardBackspace } from "react-icons/md";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ProjectCard } from "../Project/Projects";

const Project = () => {
  const { message, error, loading } = useSelector((state) => state.update);
  const { message: loginMessage } = useSelector((state) => state.login);

  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const alert = useAlert();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [tool, setTool] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(addProject(title, url, image, description, tool));
    dispatch(getUser());
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();

    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
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
        <div className="adminPanelAbout">
            <fieldset>
              <legend>Projects</legend>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="adminPanelInputs"
          />
          <input
            type="text"
            placeholder="Link"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="adminPanelInputs"
          />

          <textarea
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="adminPanelInputs"
          />

          <input
            type="text"
            placeholder="Tool"
            value={tool}
            onChange={(e) => setTool(e.target.value)}
            className="adminPanelInputs"
          />
          <input
            type="file"
            onChange={handleImage}
            className="adminPanelFileUpload"
            accept="image/*"
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

        <div className=".adminPanelDisplay">
          {user &&
            user.projects &&
            user.projects.map((item) => (
              <ProjectCard
                id={item._id}
                key={item._id}
                url={item.url}
                projectImage={item.image.url}
                projectTitle={item.title}
                description={item.description}
                tool={item.tool}
                isAdmin={true}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Project;