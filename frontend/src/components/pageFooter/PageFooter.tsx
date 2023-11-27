import "./PageFooter.css";
import { FacebookIcon } from "../../assets/icons/FacebookIcon";
import { InstagramIcon } from "../../assets/icons/InstagramIcon";
import { TwitterIcon } from "../../assets/icons/TwitterIcon";
import { LinkedInIcon } from "../../assets/icons/LinkedInIcon";
import logo from "../../assets/icons/logo_black.svg";
import { useNavigate } from "react-router-dom";

const PageFooter = () => {
  const navigate = useNavigate();
  return (
    <div className="bottomFooter">
      <div className="content">
        <div className="logo-container">
          <img
            className="logo"
            alt="Logo"
            src={logo}
            onClick={() => navigate("../")}
          />
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
        <div className="legal-info-outer-container">
          <p className="text">2023 Møvi Inc. All rights reserved.</p>
          <div className="legal-stuff">
            <a
              href="https://en.wikipedia.org/wiki/Privacy_policy"
              target="Privacy Policy"
              rel="noopener noreferrer"
            >
              <div className="text-wrapper">Privacy Policy</div>
            </a>
            <a
              href="https://www.minecraft.net/en-us/eula"
              target="Terms of Service"
              rel="noopener noreferrer"
            >
              <div className="text-wrapper">Terms of Service</div>
            </a>
            <a
              href="https://www.vg.no/rabattkode/cookie-policy"
              target="Cookies Settings"
              rel="noopener noreferrer"
            >
              <div className="text-wrapper">Cookies Settings</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageFooter;
