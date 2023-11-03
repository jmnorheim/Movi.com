import { useState } from "react";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import { User } from "../../interfaces";
import { useAuth } from "../../AuthContext";

import background_image from "../../assets/images/moviepage_background.png";

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
  const { login } = useAuth();

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
    const user: User = { username, email, password, favorites, library: [] };
    console.log("User = ", user);
    users.push(user);
    // console.log(users);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered successfully!");
    login(email);
    navigate("/profile");
  };

  return (
    <Container component="main" maxWidth="xs" className="register-container">
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
      <Box className="register-box">
        <Typography component="h1" variant="h4" className="register-title">
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
                marginBottom: "1rem",
              },
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
            <Typography
              variant="body1"
              className="login-link-text"
              style={{ fontSize: 18 }}
            >
              Already have an account?{" "}
              <Link style={{ color: "white" }} to="/login">
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
