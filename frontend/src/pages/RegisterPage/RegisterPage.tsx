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

import background_image from "../../assets/images/moviepage_background.png";
import { createUser } from "../../services/createUser";

import { navbarColor } from "../../App";
import { effect } from "@preact/signals-react";

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

  effect(() => {
    navbarColor.value = "white";
  });

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
        : "Confirm Password is required",
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

  const handleUsername = (username: string) => {
    setInputUsername(username);
    setValidationErrors((prev) => ({
      ...prev,
      username: "",
    }));
  };

  const handleEmail = (email: string) => {
    setInputEmail(email);
    setValidationErrors((prev) => ({
      ...prev,
      email: email
        ? !emailRegex.test(email)
          ? "Please enter a valid email"
          : ""
        : "",
    }));
  };

  const handlePassword = (password: string) => {
    setInputPassword(password);
    setValidationErrors((prev) => ({
      ...prev,
      password: password
        ? password.length >= 8
          ? containsNumberRegex.test(password)
            ? containsSpecialCharRegex.test(password)
              ? ""
              : "Password must include at least one special character"
            : "Password must include at least one number"
          : "Password must be at least 8 characters"
        : "",
    }));
  };

  const handleConfirmPassword = (confirmPassword: string) => {
    setInputConfirmPassword(confirmPassword);

    setValidationErrors((prev) => ({
      ...prev,
      confirmPassword:
        confirmPassword === ""
          ? ""
          : confirmPassword !== inputPassword
          ? "Passwords do not match"
          : "",
    }));
  };

  // Return =============================================================
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
              handleUsername(newUsername);
            }}
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
              handleEmail(newEmail);
            }}
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
              handlePassword(newPassword);
            }}
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
              handleConfirmPassword(newConfirmPassword);
            }}
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

      {/* Alert for error messages */}
      {error && (
        <div className="error-register">
          <Alert severity="error" style={{ marginTop: "20px" }}>
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        </div>
      )}
    </Container>
  );
};

export default RegisterPage;
