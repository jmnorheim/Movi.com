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
import { useAuth } from "../../AuthContext";
import { createUser } from "../../services/createUser";
import { getUserByEmail } from "../../services/getUser";

/**
 * Render the RegisterPage component.
 * @returns {React.FC}
 */
const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      const { userID } = await createUser(username, email, password);
      console.log(userID);
      login(email, userID);
      navigate("/profile");
    } catch (error) {
      console.log("Fungerer ikke");

      setError(
        "Failed to create an account. Email or username might already exist."
      );
    }
    // try {
    // createUser(username, email, password)
    //   .then(() => {
    //     login(email);
    //     navigate("/profile");
    //   })
    //   .catch((err) => {
    //     setError(
    //       "Failed to create an account. Email or username might already exist."
    //     );
    //   });
    // };
  };

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
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleRegister}
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
            onChange={(e) => setUsername(e.target.value)}
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
            onChange={(e) => setConfirmPassword(e.target.value)}
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
