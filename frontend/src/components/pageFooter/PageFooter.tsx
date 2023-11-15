import React from "react";
import "./PageFooter.css";
import { FacebookIcon } from "../../assets/icons/FacebookIcon";
import { InstagramIcon } from "../../assets/icons/InstagramIcon";
import { TwitterIcon } from "../../assets/icons/TwitterIcon";
import { LinkedInIcon } from "../../assets/icons/LinkedInIcon";
import logo from "../../assets/icons/logo_black.svg";

const PageFooter = () => {
  return (
    <div className="bottomFooter">
      <div className="content">
        <div className="logo-container">
          <img className="logo" alt="Logo" src={logo} />
        </div>
        <div className="social-links">
          <a
            href="https://youtu.be/dQw4w9WgXcQ?si=siGc2B1EIqWWztmP"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon className="icon-instance-node" color="#0A0A0A" />
          </a>
          <a
            href="https://youtu.be/dQw4w9WgXcQ?si=siGc2B1EIqWWztmP"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon className="icon-instance-node" color="#0A0A0A" />
          </a>
          <a
            href="https://youtu.be/dQw4w9WgXcQ?si=siGc2B1EIqWWztmP"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon className="icon-instance-node" color="#0A0A0A" />
          </a>
          <a
            href="https://youtu.be/dQw4w9WgXcQ?si=siGc2B1EIqWWztmP"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon className="icon-instance-node" />
          </a>
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
  );
};

export default PageFooter;
