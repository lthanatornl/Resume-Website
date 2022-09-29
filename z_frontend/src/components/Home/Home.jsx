import React from "react";
import "./Home.css";
import { Typography } from "@mui/material";


const Home = () => {
    
    return (
    <div className="home">
      <div className="homeCanvasContainer">
        <div className="area" >
         <img src="https://res.cloudinary.com/thanatorn001100/image/upload/v1663676602/resume/thanatorn_njexuf.png" alt="profile" className="profile"/> 
         <div className="Typingwrapper">
         <div className="static-txt">I'm want to be</div>
            <ul class="dynamic-txts">
              <li><span>Software Engineer</span></li>
              <li><span>Frontend Developer</span></li>
              <li><span>FullStack Developer</span></li>
              <li><span>Game Developer</span></li>
            </ul>
          </div>
        <div id='stars'></div>
        <div id='stars2'></div>
        <div id='stars3'></div>
            <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
        <div className="homeCanvasBox">
          <div className="typing">
          <Typography variant="h2">Thanatorn Dontreethai.
          </Typography>
          <Typography variant="h3">CPE SWU#8</Typography>
          </div>
        </div>
      </div>
    </div>
    </div >
    );
};

export default Home;