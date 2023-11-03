import React from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { User } from "../../interfaces";
import { useAuth } from "../../AuthContext";
import "./ProfilePage.css"; // This will house the CSS you've shown before

import { ArrowCircleLeft } from "../../assets/icons/ArrowCircleLeft";
import background_image from "../../assets/images/moviepage_background.png";

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
    <div className="profile-container">
      <div className="overlap-group">
        <div className="ellipse" />
        <img
          className="movie-background"
          alt="Movie background"
          src={background_image}
        />
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowCircleLeft className="vuesax-linear-arrow" />
        </button>{" "}
        <div className="div">
          <div className="text-wrapper">Welcome {username}</div>
          <div className="div-2">
            <div className="text-wrapper-2">Username</div>
            <div className="text-wrapper-3">{username}</div>
            <div className="text-wrapper-4">E-Mail</div>
            <div className="text-wrapper-3">{email}</div>
          </div>
          <button className="button" onClick={handleLogout}>
            <div className="text-wrapper-5">Log Out</div>
          </button>
        </div>
      </div>
    </div>
    // <Container component="main" maxWidth="xs" className="login-container">
    //   <Box className="login-box">
    //     {/* Display Welcome + username */}
    //     <Typography component="h1" variant="h5" className="login-title">
    //       Welcome, {username}
    //     </Typography>
    //     <Box component="div" className="login-form">
    //       {/* Displaying username */}
    //       <Typography variant="body1">Username: {username}</Typography>

    //       {/* Displaying email */}
    //       <Typography variant="body1">Email: {email}</Typography>
    //     </Box>

    //     {/* Logout button */}
    //     <Button
    //       style={{ backgroundColor: "#001f3f" }}
    //       fullWidth
    //       variant="contained"
    //       className="login-btn"
    //       onClick={handleLogout}
    //     >
    //       Logout
    //     </Button>
    //   </Box>
    // </Container>
  );
}

export default ProfilePage;
