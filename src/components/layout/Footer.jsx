import React from "react";
import facebook from "../../assets/images/facebook.png";
import instagram from "../../assets/images/instagram.png";
import twitter from "../../assets/images/twitter.png";
import linkedin from "../../assets/images/linkedin.png";
import "../styles/layout-styles/Footer.scss"

const Footer = () => {
  return (
    <footer>
      <div className="container"> 
      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <p>Finstreet 118 2561 Fintown</p>
          <p>Hello@finsweet.com 020 7993 2905</p>
        </div>
        <div className="footer-bottom-right">
          <a href="https://www.facebook.com/">
            <img src={facebook} alt="" />
          </a>
          <a href="https://www.twitter.com/">
            <img src={twitter} alt="" />
          </a>
          <a href="https://www.instagram.com/">
            <img src={instagram} alt="" />
          </a>
          <a href="https://www.linkedin.com/">
            <img src={linkedin} alt="" />
          </a>
        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
