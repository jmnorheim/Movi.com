import { useState } from "react";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import { User } from "../../interfaces";

/**
 * Render the RegisterPage component.
 * @returns {React.FC}
 */
const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  /**
   * Handles the registration process.
   * @param {React.FormEvent} event
   */
  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const usersJSON = localStorage.getItem("users");
    console.log(usersJSON);

    let users: User[] = [];
    if (usersJSON && typeof JSON.parse(usersJSON) === typeof users) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      users = JSON.parse(usersJSON);
    }
    // const users: User[] = usersJSON ? JSON.parse(usersJSON) : [];
    console.log(users);

    // Check that username or email not exist in the list
    const userExists = users.some(
      (user: User) => user.username === username || user.email === email
    );

    console.log(userExists);

    if (userExists) {
      alert("Username or Email already exists!");
      return;
    }

    const favorites: string[] = [];
    const user: User = { username, email, password, favorites };
    console.log("User = ", user);
    users.push(user);
    // console.log(users);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered successfully!");
    navigate("/login");
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
    </Container>
  );
};

export default RegisterPage;
