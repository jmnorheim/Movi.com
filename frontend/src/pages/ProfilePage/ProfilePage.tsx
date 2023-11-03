import React from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { useUserQuery } from "../../services/getUser";
import "./ProfilePage.css";

/**
 * Render the ProfilePage component.
 * @returns {React.FC}
 */
function ProfilePage() {
  const navigate = useNavigate();
  const { userID, logout } = useAuth();
  const { data: user, isLoading } = useUserQuery(userID);

  /**
   * Handles the login process.
   * @param {React.FormEvent} event
   */
  const handleLogout = (event: React.FormEvent) => {
    event.preventDefault();

    logout();
    navigate("/login");
  };

  /**
   * Display loading state.
   */
  if (isLoading) {
    return <div> isLoading ... </div>;
  }

  return (
    <Container component="main" maxWidth="xs" className="login-container">
      <Box className="login-box">
        {/* Display Welcome + username */}
        <Typography component="h1" variant="h5" className="login-title">
          Welcome, {user?.username}
        </Typography>
        <Box component="div" className="login-form">
          {/* Displaying username */}
          <Typography variant="body1">Username: {user?.username}</Typography>

          {/* Displaying email */}
          <Typography variant="body1">Email: {user?.email}</Typography>
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
