import { useState } from "react";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
import "./navbar.css";
import { AppBar, Toolbar, Box, IconButton, Typography } from "@mui/material";

/**
 * Render navbar.
 *
 * @returns {JSX.Element}
 */
const NavBar: React.FC = (): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <>
      <AppBar
        position="static"
        className="app-bar"
        sx={{ backgroundColor: "#001F3F" }}
      >
        <Toolbar className="toolbar">
          <Box />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            className="movie-brand"
          >
            Møvie
          </Typography>
          <Box style={{ display: "flex", gap: "16px" }}>
            <IconButton
              color="inherit"
              component={Link}
              to="/my-library"
              className="icon-button"
            >
              <LibraryBooksIcon />
              <Typography variant="caption">My Library</Typography>
            </IconButton>
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
      </AppBar>
    </>
  );
};

export default NavBar;
