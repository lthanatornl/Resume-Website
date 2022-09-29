import { Typography } from '@mui/material';
import React from "react";
import TimeLine from "../TimeLine/TimeLine";
import {
    SiPython,
    SiJavascript,
    SiNodedotjs,
    SiPhp,
    SiExpress,
    SiCss3,
    SiHtml5,
  } from "react-icons/si";
import { FaPhoneSquareAlt} from "react-icons/fa";
import { BsGithub, BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";
import "./About.css";

const About = ({about, graduation}) => {
    
    return (
        <div className='about'>
                    <div className="skillsBox" id="skillsBox">
                        <h2>My Skills</h2>
                        <SiHtml5 alt="HTML5"/>
                        <SiCss3 />
                        <SiJavascript />
                        <SiPython />
                        <SiExpress />
                        <SiNodedotjs/>
                        <SiPhp />
                    </div>
                <div className='aboutContainer'>
                    <Typography>{about.quote}</Typography>
                </div>

            <div className="aboutContainer2">
                <div>
                    <img src={about.avatar.url} alt="Thanatorn" className='aboutAvatar'/>
                    <Typography variant='=h4' style={{ margin: "1vmax 0", color: "black"}}><b>Name:</b> {about.name}</Typography>
                    <Typography style={{margin: "1vmav 0", textAlign: "center"}}>{about.title}</Typography>
                    <Typography style={{margin: "1vmav 0", textAlign: "center"}}>{about.subtitle}</Typography>
                </div>
                <div>
                    <Typography style={{ wordSpacing: "5px", lineHeight: "50px", letterSpacing: "1px", textAlign: "right", }}>{about.description}</Typography>
                    <Typography variant = "h5" style={{margin: "1vmav 0", textAlign: "center"}}> Graduation</Typography>
                    <TimeLine graduation={graduation}  />
                </div>
            </div>
            
            <div className="footer">
                <div>
                    <p><img src="https://res.cloudinary.com/thanatorn001100/image/upload/v1663740469/resume/C_C_C_ywjoav.png" alt="inc"/> &copy; 2022 C•C•C, Inc.</p>
                </div>
                <div className='socialFooter'>
                    <Typography variant="h6">Social Media </Typography>
                    <a href="https://www.facebook.com/profile.php?id=100078300043092" target="black">
                    <BsFacebook />
                    </a>
                    <a href="https://www.instagram.com/ll0oom0ll/" target="black">
                    <BsInstagram />
                    </a>
                    <a href="https://github.com/lthanatornl" target="black">
                    <BsGithub />
                    </a>
                    <a href="https://www.linkedin.com/in/ธนธรณ์-ดนตรีไทย-a98528204/" target="black">
                    <BsLinkedin />
                    </a>
            </div>
        </div>
    </div>
    );
};

export default About;