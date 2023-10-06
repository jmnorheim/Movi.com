import React from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import './LoginPage.css';

/**
 * Render the LoginPage component.
 * @returns {React.FC}
 */
const LoginPage: React.FC = () => {
  return (
    <Container component="main" maxWidth="xs" className="login-container">
      <Box className="login-box">

        <Typography component="h1" variant="h5" className="login-title">
          Login to your account
        </Typography>

        <Box component="form" noValidate className="login-form">
          {/* Email input textfield */}
          <TextField
            variant="outlined"
            margin="normal"
            required fullWidth id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          {/* Password input textfield */}
          <TextField
            variant="outlined"
            margin="normal"
            required fullWidth name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          {/* Login button */}
          <Button type="submit" fullWidth variant="contained" className="login-btn">
            Login
          </Button>

          {/* Link to register page */}
          <Box className="register-link-box">
            <Typography variant="body2" className="register-link-text">
              Don't have an account? <Link to="/register">Register</Link>
            </Typography>
          </Box>

        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
