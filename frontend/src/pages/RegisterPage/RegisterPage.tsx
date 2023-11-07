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
import "./RegisterPage.css";
import { useAuth } from "../../services/auth/AuthContext";
import { createUser } from "../../services/createUser";

// Regex
const emailRegex = /\S+@\S+\.\S+/;
const containsNumberRegex = /\d/;
const containsSpecialCharRegex = /[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]+/;

/**
 * Render the RegisterPage component.
 * @returns {React.FC}
 */
const RegisterPage: React.FC = () => {
  // State for user inputs
  const [inputUsername, setInputUsername] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputConfirmPassword, setInputConfirmPassword] = useState("");

  // State for any error messages
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  /**
   * Validates the user input fields for registration.
   */
  const validateFields = () => {
    const errors = {
      username: inputUsername ? "" : "Username is required",
      email: inputEmail
        ? emailRegex.test(inputEmail)
          ? ""
          : "Please enter a valid email"
        : "Email is required",
      password: inputPassword
        ? inputPassword.length < 8
          ? "Password must be at least 8 characters"
          : !containsNumberRegex.test(inputPassword)
          ? "Password must include at least one number"
          : !containsSpecialCharRegex.test(inputPassword)
          ? "Password must include at least one special character"
          : ""
        : "Password is required",
      confirmPassword: inputConfirmPassword
        ? inputPassword !== inputConfirmPassword
          ? "Passwords do not match"
          : ""
        : "Confirming password is required",
    };

    setValidationErrors(errors);
    return Object.values(errors).some((error) => error !== "");
  };

  /**
   * Handles the registration process.
   * @param {React.FormEvent} event
   */
  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    // Clear the error message
    setError("");

    //  Check if the input fields are valid
    if (validateFields()) {
      return;
    }

    /**
     * Create an account. Catch error if not possible.
     */
    try {
      const { userID } = await createUser(
        inputUsername,
        inputEmail,
        inputPassword
      );
      login(inputEmail, userID);
      navigate("/profile");
    } catch (error) {
      setError(
        "Failed to create an account. Email or username might already exist."
      );
    }
  };

  /**
   * Submits the registration process.
   */
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleRegister(event).catch(console.error);
  };

  // Return =============================================================
  return (
    <Container component="main" maxWidth="xs" className="register-container">
      <Box className="register-box">
        <Typography component="h1" variant="h5" className="register-title">
          Create your account
        </Typography>

        <Box
          component="form"
          noValidate
          className="register-form"
          onSubmit={handleSubmit}
        >
          {/* Username textfield */}
          <TextField
            error={!!validationErrors.username}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            helperText={validationErrors.username}
            onChange={(e) => {
              const newUsername = e.target.value;
              setInputUsername(newUsername);
              setValidationErrors((prev) => ({
                ...prev,
                username: "",
              }));
            }}
          />

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
            autoComplete="new-password"
            helperText={validationErrors.password}
            onChange={(e) => {
              const newPassword = e.target.value;
              setInputPassword(newPassword);
              setValidationErrors((prev) => ({
                ...prev,
                password: newPassword
                  ? newPassword.length >= 8
                    ? containsNumberRegex.test(newPassword)
                      ? containsSpecialCharRegex.test(newPassword)
                        ? ""
                        : "Password must include at least one special character"
                      : "Password must include at least one number"
                    : "Password must be at least 8 characters"
                  : "Password is required",
              }));
            }}
          />
          {/* Confirm password input textfield */}
          <TextField
            error={!!validationErrors.confirmPassword}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirm-password"
            label="Confirm Password"
            type="password"
            id="confirm-password"
            autoComplete="new-password"
            helperText={validationErrors.confirmPassword}
            onChange={(e) => {
              const newConfirmPassword = e.target.value;
              setInputConfirmPassword(newConfirmPassword);

              setValidationErrors((prev) => ({
                ...prev,
                confirmPassword:
                  newConfirmPassword === ""
                    ? ""
                    : newConfirmPassword !== inputPassword
                    ? "Passwords do not match"
                    : "",
              }));
            }}
          />

          {/* Register button */}
          <Button
            style={{ backgroundColor: "#001f3f" }}
            type="submit"
            fullWidth
            variant="contained"
            className="register-btn"
          >
            Register
          </Button>

          {/* Link to login page */}
          <Box className="login-link-box">
            <Typography variant="body2" className="login-link-text">
              Already have an account? <Link to="/login">Login</Link>
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

export default RegisterPage;
