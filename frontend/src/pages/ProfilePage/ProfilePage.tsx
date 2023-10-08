import React from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { User } from "../../interfaces";
import { useAuth } from "../../AuthContext";
import "./ProfilePage.css"; // This will house the CSS you've shown before

/**
 * Render the ProfilePage component.
 * @returns {React.FC}
 */
function ProfilePage() {
  const navigate = useNavigate();
  const { email, logout } = useAuth();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
  const username = users.find((user) => user.email === email)?.username;

  /**
   * Handles the login process.
   * @param {React.FormEvent} event
   */
  const handleLogout = (event: React.FormEvent) => {
    event.preventDefault();

    logout();
    navigate("/login");
  };

  return (
    <Container component="main" maxWidth="xs" className="login-container">
      <Box className="login-box">
        {/* Display Welcome + username */}
        <Typography component="h1" variant="h5" className="login-title">
          Welcome, {username}
        </Typography>
        <Box component="div" className="login-form">
          {/* Displaying username */}
          <Typography variant="body1">Username: {username}</Typography>

          {/* Displaying email */}
          <Typography variant="body1">Email: {email}</Typography>
        </Box>

        {/* Logout button */}
        <Button
          style={{ backgroundColor: "#001f3f" }}
          fullWidth
          variant="contained"
          className="login-btn"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
}

export default ProfilePage;
