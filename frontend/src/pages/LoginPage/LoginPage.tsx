import React, { useState } from "react";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { useAuth } from "../../AuthContext";
import { User } from "../../interfaces";

import background_image from "../../assets/images/moviepage_background.png";

/**
 * Render the LoginPage component.
 * @returns {React.FC}
 */
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // Get the login method
  const navigate = useNavigate();

  /**
   * Handles the login process.
   * @param {React.FormEvent} event
   */
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    const usersJSON = localStorage.getItem("users");
    if (!usersJSON) {
      alert("Invalid email or password");
      return;
    }

    let users: User[] = [];
    if (usersJSON && typeof JSON.parse(usersJSON) === typeof users) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      users = JSON.parse(usersJSON);
    }
    const userExists = users.some(
      (user: User) => user.email === email && user.password === password
    );

    if (userExists) {
      login(email); // Use the login method
      navigate("/profile");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <Container component="main" maxWidth="xs" className="login-container">
      <img
        src={background_image}
        alt="Background"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: "0",
          left: "0",
          zIndex: "-1", // Ensures the image stays behind other content
        }}
      />
      <Box className="login-box">
        <Typography component="h1" variant="h4" className="login-title">
          Login to your account
        </Typography>
        <Box
          component="form"
          noValidate
          className="login-form"
          onSubmit={handleLogin}
        >
          {/* Email input textfield */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{
              style: { color: "#fff" }, // White label
            }}
            InputProps={{
              style: { color: "#fff" }, // White input text
              classes: {
                notchedOutline: "white-outline",
              },
            }}
            sx={{
              "& label.Mui-focused": {
                color: "#fff", // White label when focused
              },
              "& .MuiInput-underline:before": {
                borderBottomColor: "#fff", // White underline before focus
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "#fff", // White underline after focus
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#fff", // White border
                },
                "&:hover fieldset": {
                  borderColor: "#fff", // White border when hovered
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#fff", // White border when focused
                },
                "& .MuiInputBase-input": {
                  color: "#fff", // White text
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(255, 255, 255, 0.7)", // White label with transparency
                },
              },
            }}
          />

          {/* Password input textfield */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{
              style: { color: "#fff" }, // White label
            }}
            InputProps={{
              style: { color: "#fff" }, // White input text
              classes: {
                notchedOutline: "white-outline",
              },
            }}
            sx={{
              "& label.Mui-focused": {
                color: "#fff", // White label when focused
              },
              "& .MuiInput-underline:before": {
                borderBottomColor: "#fff", // White underline before focus
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "#fff", // White underline after focus
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#fff", // White border
                },
                "&:hover fieldset": {
                  borderColor: "#fff", // White border when hovered
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#fff", // White border when focused
                },
                "& .MuiInputBase-input": {
                  color: "#fff", // White text
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(255, 255, 255, 0.7)", // White label with transparency
                },
              },
            }}
          />

          {/* Login button */}
          <Button
            style={{ backgroundColor: "#001f3f" }}
            type="submit"
            fullWidth
            variant="contained"
            className="login-btn"
          >
            Login
          </Button>

          {/* Link to register page */}
          <Box className="register-link-box">
            <Typography
              variant="body1"
              className="register-link-text"
              style={{ fontSize: 18 }}
            >
              Dont have an account?{" "}
              <Link style={{ fontSize: 18, color: "white" }} to="/register">
                Register
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
