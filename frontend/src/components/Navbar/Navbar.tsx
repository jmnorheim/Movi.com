import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../services/auth/AuthContext";
import "../../../fonts.css";
import logo from "../../assets/icons/logo_white.svg";
import { Signal } from "@preact/signals-react";

/**
 * Render navbar.
 *
 * @returns {JSX.Element}
 */

interface Props {
  textColor: Signal<string>;
}

const NavBar: React.FC<Props> = ({ textColor }) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const textClass = textColor.value === "black" ? "text-black" : "";

  return (
    <>
      <div className={`navbar ${textClass}`}>
        <div className="navContainer">
          <img
            className="logo"
            alt="LOGO HER"
            src={logo}
            onClick={() => navigate("../")}
          />
          <div className="navbar-wrapper">
            <div className="div">
              <Link to="/" className={`link ${textClass}`}>
                Home
              </Link>
              {isLoggedIn && (
                <Link to="/my-library" className={`text-wrapper ${textClass}`}>
                  Library
                </Link>
              )}
              <Link
                to={isLoggedIn ? "/profile" : "/login"}
                className={`text-wrapper ${textClass}`}
              >
                {isLoggedIn ? "Profile" : "Login"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
