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

  // State for any error messages
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

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

    // Clear the error message
    setError("");

    //  Check if the input fields are valid
    if (validateFields()) {
      return;
    }

    /**
     * Try to login. Catch error if not possible.
     */
    try {
      const { userID, password } = await getUserByEmail(inputEmail);
      if (userID && password === inputPassword) {
        login(inputEmail, userID);
        navigate("/profile");
      } else {
        setError("Invalid email or password");
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
      <Box className="login-box">
        <Typography component="h1" variant="h5" className="login-title">
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
          <Box className="login-link-box">
            <Typography variant="body2" className="login-link-text">
              Do not have an account? <Link to="/register">Register</Link>
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Alert for error messages */}
      {error && (
        <Alert severity="error" style={{ marginTop: "20px" }}>
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
    </Container>
  );
};

export default LoginPage;
