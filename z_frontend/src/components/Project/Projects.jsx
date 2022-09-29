import React from 'react';
import { Button, Typography } from "@mui/material";
import {SiGitbook} from "react-icons/si";
import { Delete } from "@mui/icons-material";
import { deleteProject, getUser } from "../../actions/user.js";
import { useDispatch } from "react-redux";
import "./Project.css";

export const ProjectCard = ({
    url,
    projectImage,
    projectTitle,
    description,
    tool,
    isAdmin = false,
    id,
}) => {
    const dispatch = useDispatch();
    const deleteHandler = async (id) => {
        await dispatch(deleteProject(id));
        dispatch(getUser());
    };

    return (
        <>
          <a href={url} className="projectCard" target="black">
        <div>
          <img src={projectImage} alt="Project" />
          <Typography variant="h5">{projectTitle}</Typography>
        </div>
        <div>
          <Typography variant="h4" style={{ letterSpacing: "1px", wordSpacing: "1px"}}>Discription</Typography>
          <Typography>{description}</Typography>
          <Typography variant="h6">Tool: {tool}</Typography>
        </div>
      </a>

      {isAdmin && (
        <Button style={{ color: "rgba(40,40,40,0.7)" }} onClick={() => deleteHandler(id)}>
          <Delete />
        </Button>
      )} 
        </>
    );    
};

const Projects = ({ projects }) => {
  return (
    <div className="projects">
      <Typography variant="h3">
        Projects <SiGitbook/>
      </Typography>
      <div className="projectsWrapper">
        {projects.map((item) => (
          <ProjectCard
            id={item._id}
            key={item._id}
            url={item.url}
            projectImage={item.image.url}
            projectTitle={item.title}
            description={item.description}
            tool={item.tool}
          />
        ))}
      </div>
    </div>
  );
};


export default Projects;