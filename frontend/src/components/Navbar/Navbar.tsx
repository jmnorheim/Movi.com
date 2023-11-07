import { useEffect, useState } from "react";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { AppBar, Toolbar, Box, IconButton, Typography } from "@mui/material";
import { useAuth } from "../../services/auth/AuthContext";
import "../../../fonts.css";
import logo from "../../assets/icons/logo_white.svg";

/**
 * Render navbar.
 *
 * @returns {JSX.Element}
 */
const NavBar: React.FC = ({ textColor }): JSX.Element => {
  const { isLoggedIn } = useAuth();
  const textClass = textColor.value === "black" ? "text-black" : "";

  return (
    <>
      <div className={`navbar ${textClass}`}>
        <div className="navContainer">
          <img className="column" alt="LOGO HER" src={logo} />
          <div className="navbar-wrapper">
            <div className="div">
              <Link to="/" className={`link ${textClass}`}>
                Home
              </Link>
              <Link to="/my-library" className={`text-wrapper ${textClass}`}>
                Library
              </Link>
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
      {/* <AppBar
        position="static"
        className="app-bar"
        sx={{ backgroundColor: "#001F3F" }}
      >
        <Toolbar className="toolbar">
          <Box />
          <Typography
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            variant="h6"
            component={Link}
            to="/"
            className="movie-brand"
          >
            Møvie
          </Typography>
          <Box style={{ display: "flex", gap: "16px" }}>
            {isLoggedIn && (
              <IconButton
                color="inherit"
                component={Link}
                to="/my-library"
                className="icon-button"
              >
                <LibraryBooksIcon />
                <Typography variant="caption">My Library</Typography>
              </IconButton>
            )}
            <IconButton
              color="inherit"
              component={Link}
              to={isLoggedIn ? "/profile" : "/login"}
              className="icon-button"
            >
              {isLoggedIn ? <AccountCircleIcon /> : <LoginIcon />}
              <Typography variant="caption">
                {isLoggedIn ? "Profile" : "Login"}
              </Typography>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar> */}
    </>
  );
};

export default NavBar;
