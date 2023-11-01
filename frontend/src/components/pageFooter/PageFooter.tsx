import React from "react";
import "./PageFooter.css";
import { FacebookIcon } from "../../assets/icons/FacebookIcon";
import { InstagramIcon } from "../../assets/icons/InstagramIcon";
import { TwitterIcon } from "../../assets/icons/TwitterIcon";
import { LinkedInIcon } from "../../assets/icons/LinkedInIcon";
import logo from "../../assets/icons/logo_black.svg";

const PageFooter = () => {
  return (
    <div className="footerOuterContainer">
      <div className="join-us-container">
        <div className="div">
          <div className="text-wrapper">Join Us Today!</div>
          <div className="text-wrapper-2">Description here</div>
          <div className="div-wrapper">
            <button className="join-now-button">Join Now</button>
          </div>
        </div>
      </div>
      <div className="bottomFooter">
        <div className="content">
          <img className="logo" alt="Logo" src={logo} />
          <div className="footer-links">
            <div className="link">Link One</div>
            <div className="link">Link Two</div>
            <div className="link">Link Three</div>
            <div className="link">Link Four</div>
            <div className="link">Link Five</div>
          </div>
          <div className="social-links">
            <FacebookIcon className="icon-instance-node" color="#0A0A0A" />
            <InstagramIcon className="icon-instance-node" color="#0A0A0A" />
            <TwitterIcon className="icon-instance-node" color="#0A0A0A" />
            <LinkedInIcon className="icon-instance-node" />
          </div>
        </div>
        <div className="credits">
          <div className="divider" />
          <div className="div">
            <p className="text">2023 Møvie Inc. All rights reserved.</p>
            <div className="div">
              <div className="text-wrapper">Privacy Policy</div>
              <div className="text-wrapper">Terms of Service</div>
              <div className="text-wrapper">Cookies Settings</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageFooter;
