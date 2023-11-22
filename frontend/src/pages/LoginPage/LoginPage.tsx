import React, { useState } from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Alert,
  AlertTitle,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../services/auth/AuthContext";
import { getUserByEmail } from "../../services/getUser";
import "./LoginPage.css";

import { navbarColor } from "../../App";
import { effect } from "@preact/signals-react";

import background_image from "../../assets/images/moviepage_background.png";
import "./LoginPage.css";
import { verifyPassword } from "../../services/utilities/hashFunction";

// Regex used to check email format
const emailRegex = /\S+@\S+\.\S+/;

/**
 * Render the LoginPage component.
 * @returns {React.FC}
 */
const LoginPage: React.FC = () => {
  // State for user inputs
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  // State for any error messages
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
  });

  effect(() => {
    navbarColor.value = "white";
  });

  /**
   * Validates the user input fields for login.
   */
  const validateFields = () => {
    const errors = {
      email: inputEmail
        ? emailRegex.test(inputEmail)
          ? ""
          : "Please enter a valid email"
        : "Email is required",
      password: inputPassword ? "" : "Password is required",
    };

    setValidationErrors(errors);
    return Object.values(errors).some((error) => error !== "");
  };

  /**
   * Handles the login logic.
   * @param {React.FormEvent} event
   */
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    setError("");

    if (validateFields()) {
      return;
    }

    /**
     * Try to login. Catch error if not possible.
     */
    try {
      const { userID } = await getUserByEmail(inputEmail);
      // Check if the password is correct from backend with alot of hashing goodness there :)
      if (await verifyPassword(inputEmail, inputPassword)) {
        login(inputEmail, userID);
        navigate("/profile");
      } else {
        setError("Invalid email or password.");
      }
    } catch (error) {
      setError("User does not exist.");
    }
  };

  /**
   * Submits the login process.
   */
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleLogin(event).catch(console.error);
  };

  // Return =============================================================
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
          onSubmit={handleSubmit}
        >
          {/* Email input textfield */}
          <TextField
            error={!!validationErrors.email}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            helperText={validationErrors.email}
            onChange={(e) => {
              const newEmail = e.target.value;
              setInputEmail(newEmail);
              setValidationErrors((prev) => ({
                ...prev,
                email: newEmail
                  ? !emailRegex.test(newEmail)
                    ? "Please enter a valid email"
                    : ""
                  : "",
              }));
            }}
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
            error={!!validationErrors.password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            helperText={validationErrors.password}
            onChange={(e) => {
              const newPassword = e.target.value;
              setInputPassword(newPassword);
              setValidationErrors((prev) => ({
                ...prev,
                password: "",
              }));
            }}
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

      {/* Alert for error messages */}
      {error && (
        <div className="error-login">
          <Alert severity="error" style={{ marginTop: "20px" }}>
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        </div>
      )}
    </Container>
  );
};

export default LoginPage;
