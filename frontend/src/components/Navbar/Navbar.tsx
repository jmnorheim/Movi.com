import { useState } from "react";
import { AppBar, Toolbar, Box, IconButton, Typography } from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
import "./navbar.css";

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

          {/* "Movie" in middle of navbar */}
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
            Movie
          </Typography>
          <Box style={{ display: "flex", gap: "16px" }}>
            {/* My library icon with text */}
            <IconButton
              color="inherit"
              component={Link}
              to="/my-library"
              className="icon-button"
            >
              <LibraryBooksIcon fontSize="small" />
              <Typography variant="caption">My Library</Typography>
            </IconButton>

            {/* Profile or Login icon with text */}
            <IconButton
              color="inherit"
              component={Link}
              to={isLoggedIn ? "/profile" : "/login"}
              className="icon-button"
            >
              {isLoggedIn ? (
                <AccountCircleIcon fontSize="small" />
              ) : (
                <LoginIcon />
              )}
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
