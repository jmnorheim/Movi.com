import { useState } from "react";
<<<<<<< frontend/src/components/Navbar/Navbar.tsx
import { AppBar, Toolbar, Box, IconButton, Typography } from "@mui/material";
=======
>>>>>>> frontend/src/components/Navbar/Navbar.tsx
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
import "./navbar.css";
<<<<<<< frontend/src/components/Navbar/Navbar.tsx
=======
import { AppBar, Toolbar, Box, IconButton, Typography } from "@mui/material";
import { useAuth } from "../../AuthContext";
>>>>>>> frontend/src/components/Navbar/Navbar.tsx

/**
 * Render navbar.
 *
 * @returns {JSX.Element}
 */
const NavBar: React.FC = (): JSX.Element => {
<<<<<<< frontend/src/components/Navbar/Navbar.tsx
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
=======
  const { isLoggedIn } = useAuth();

>>>>>>> frontend/src/components/Navbar/Navbar.tsx
  return (
    <>
      <AppBar
        position="static"
        className="app-bar"
        sx={{ backgroundColor: "#001F3F" }}
      >
        <Toolbar className="toolbar">
          <Box />
<<<<<<< frontend/src/components/Navbar/Navbar.tsx

          {/* "Movie" in middle of navbar */}
          <Typography
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
=======
          <Typography
>>>>>>> frontend/src/components/Navbar/Navbar.tsx
            variant="h6"
            component={Link}
            to="/"
            className="movie-brand"
          >
<<<<<<< frontend/src/components/Navbar/Navbar.tsx
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
              <LibraryBooksIcon/>
              <Typography variant="caption">My Library</Typography>
            </IconButton>

            {/* Profile or Login icon with text */}
=======
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
>>>>>>> frontend/src/components/Navbar/Navbar.tsx
            <IconButton
              color="inherit"
              component={Link}
              to={isLoggedIn ? "/profile" : "/login"}
              className="icon-button"
            >
<<<<<<< frontend/src/components/Navbar/Navbar.tsx
              {isLoggedIn ? (
                <AccountCircleIcon/>
              ) : (
                <LoginIcon />
              )}
=======
              {isLoggedIn ? <AccountCircleIcon /> : <LoginIcon />}
>>>>>>> frontend/src/components/Navbar/Navbar.tsx
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
