import React from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import './RegisterPage.css';

/**
 * Render the RegisterPage component.
 * @returns {React.FC}
 */
const RegisterPage: React.FC = () => {
  return (
    <Container component="main" maxWidth="xs" className="register-container">
      <Box className="register-box">

        <Typography component="h1" variant="h5" className="register-title">
          Create your account
        </Typography>

        <Box component="form" noValidate className="register-form">

          {/* Username textfield */}
          <TextField
            variant="outlined"
            margin="normal"
            required fullWidth id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />

          {/* Email input textfield */}
          <TextField
            variant="outlined"
            margin="normal"
            required fullWidth id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />

          {/* Password input textfield */}
          <TextField
            variant="outlined"
            margin="normal"
            required fullWidth name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
          />

          {/* Confirm password input textfield */}
          <TextField
            variant="outlined"
            margin="normal"
            required fullWidth name="confirm-password"
            label="Confirm Password"
            type="password"
            id="confirm-password"
            autoComplete="new-password"
          />

          {/* Register button */}
          <Button type="submit" fullWidth variant="contained" className="register-btn">
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
    </Container>
  );
};

export default RegisterPage;
