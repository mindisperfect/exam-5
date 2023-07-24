import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import "../styles/layout-styles/Nav.scss";

const Header = () => {
  return (
    <nav id="navbar" className="navbarshrink">
      <div className="container navcontainer">
        <div className="navlogo">
          <img src={Logo} alt="" />
        </div>
        <div className="hamburger">
          <i className="uil uil-bars"></i>
        </div>
        <div className="navlinks">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/posts">Posts</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/login"><button className="navbutton">Login</button></NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Header;
