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

/**
 * Render the RegisterPage component.
 * @returns {React.FC}
 */
const RegisterPage: React.FC = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputConfirmPassword, setInputConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  /**
   * Handles the registration process.
   * @param {React.FormEvent} event
   */
  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    // Clear the error message
    setError("");

    /**
     * Check that all inputfields are filled.
     */
    if (
      !inputUsername ||
      !inputEmail ||
      !inputPassword ||
      !inputConfirmPassword
    ) {
      setError("All fields are required.");
      return;
    }

    /**
     * Check that inputPassword is equal to inputConfirmPassword
     */
    if (inputPassword !== inputConfirmPassword) {
      setError("Passwords do not match!");
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
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(e) => setInputUsername(e.target.value)}
          />

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
            onChange={(e) => setInputEmail(e.target.value)}
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
            autoComplete="new-password"
            onChange={(e) => setInputPassword(e.target.value)}
          />

          {/* Confirm password input textfield */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirm-password"
            label="Confirm Password"
            type="password"
            id="confirm-password"
            autoComplete="new-password"
            onChange={(e) => setInputConfirmPassword(e.target.value)}
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
