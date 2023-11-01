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
import { useAuth } from "../../AuthContext";
import { getUserByEmail } from "../../services/getUser";

/**
 * Render the LoginPage component.
 * @returns {React.FC}
 */
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  /**
   * Handles the login logic.
   */
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    // Clear the error message
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    getUserByEmail(email)
      .then((userByEmail) => {
        if (userByEmail && userByEmail.password === password) {
          login(userByEmail.email, userByEmail.userID);
          navigate("/profile");
        } else {
          setError("Invalid email or password");
        }
      })
      .catch((error) => {
        setError("User does not exist.");
      });
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
