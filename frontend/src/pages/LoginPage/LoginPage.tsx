import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { useAuth } from '../../AuthContext';

/**
 * LoginPage component - User authentication login page.
 */
const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();  // Get the login method
    const navigate = useNavigate();
  
    /**
     * Handles the login process.
     * @param {React.FormEvent} event
     */
    const handleLogin = async (event: React.FormEvent) => {
      event.preventDefault();
  
      const response = await fetch('/users.json');
      const users = await response.json();
  
      const user = users.find((user: any) => user.email === email && user.password === password);
  
      if (user) {
        login();  // Use the login method
        navigate('/profile');
      } else {
        alert('Invalid email or password');
      }
    };

  return (
    <Container component="main" maxWidth="xs" className="login-container">
      <Box className="login-box">
        <Typography component="h1" variant="h5" className="login-title">
          Login to your account
        </Typography>
        <Box component="form" noValidate className="login-form" onSubmit={handleLogin}>
          
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
