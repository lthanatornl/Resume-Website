import React from "react";
import logo from "../../images/logo.png";
import { ReactNavbar } from "overlay-navbar";
import { FaUserAlt } from "react-icons/fa";

const Header = () => {
    return <ReactNavbar 
    logo={logo}
    logowidth="250px"
    logoHoverColor="hsl(1, 90%, 70%)"
    navColor1="skyblue"
    navColor2="hsl(219, 48%, 8%)"
    burgerColor="white"
    burgerColorHover="hsl(190, 100%, 75%)"
    nav2justifyContent="space-around"
    nav3justifyContent="space-around"
    link1Text="Home"
    link2Text="About"
    link3Text="Projects"
    link4Text="Contact"
    link1Url="/"
    link2Url="/about"
    link3Url="/projects"
    link4Url="/contact"
    link1ColorHover="white"
    link1Color="HSL(190, 100%, 75%)"
    link1Size="1.5rem"
    link1Padding="3vmax"
    profileIcon={true}
    ProfileIconElement={FaUserAlt}
    profileIconColor="HSL(190, 100%, 75%)"
    profileIconColorHover="white"
     />;
};

export default Header;