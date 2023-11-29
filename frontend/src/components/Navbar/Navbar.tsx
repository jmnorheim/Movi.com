import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../services/auth/AuthContext";
import "../../../fonts.css";
import logo_white from "../../assets/icons/logo_white.svg";
import logo_black from "../../assets/icons/logo_black.svg";
import { Signal } from "@preact/signals-react";

/**
 * Render navbar.
 *
 * @returns {JSX.Element}
 */

interface Props {
  textColor: Signal<string>;
}

/**
 * NavBar Component
 *
 * This component renders the navigation bar of the application. It provides links to different pages like Home, Library, and Profile/Login. The NavBar changes its text color and logo based on a signal value, allowing dynamic styling.
 *
 * Props:
 * @param {Signal<string>} textColor - A signal value determining the text color and logo variant of the navbar (either 'black' or 'white').
 *
 * Features:
 * - Displays the application's logo, which is clickable and navigates to the home page.
 * - Provides navigation links to the Home, Library (if logged in), and Profile/Login pages.
 * - Dynamically changes the text color and logo based on the provided `textColor` signal.
 * - Uses `useAuth` hook from `../../services/auth/AuthContext` to determine the user's authentication status.
 * - Implements `useNavigate` from `react-router-dom` for navigation functionality.
 */
const NavBar: React.FC<Props> = ({ textColor }) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const textClass = textColor.value === "black" ? "text-black" : "";
  const logo = textColor.value === "black" ? logo_black : logo_white;

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
