import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/auth/AuthContext";
import { useUserQuery } from "../../services/getUser";
import { deleteUser } from "../../services/deleteUser";
import "./ProfilePage.css";

import { ArrowCircleLeft } from "../../assets/icons/ArrowCircleLeft";
import background_image from "../../assets/images/moviepage_background.png";
import PageFooter from "../../components/pageFooter/PageFooter";

import { navbarColor } from "../../App";
import { effect } from "@preact/signals-react";

/**
 * ProfilePage Component
 *
 * This component renders the user's profile page. It displays the user's username and email, and provides options to log out or delete the user's account. The page includes a confirmation dialog for account deletion and uses a background image for visual appeal.
 *
 * Features:
 * - Displays the username and email of the logged-in user.
 * - Provides a 'Log Out' button to log the user out of the application.
 * - Includes a 'Delete User' button that opens a confirmation dialog for account deletion.
 * - Implements a confirmation dialog using Material-UI `Dialog` component for account deletion.
 * - Uses `useAuth` for authentication logic and `useUserQuery` to fetch user data.
 * - Utilizes `useNavigate` for redirection after logout or account deletion.
 * - 'Back' button to navigate to the previous page.
 * - Incorporates a background image for a visually appealing layout.
 * - Includes the `PageFooter` component to display the page footer.
 * - Applies dynamic navbar color setting using `navbarColor` signal from the main app component.
 */
function ProfilePage() {
  const navigate = useNavigate();
  const { userID, logout } = useAuth();
  const { data: user, isLoading } = useUserQuery(userID);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  /**
   * Open popup to confirm delete user.
   */
  const openDeleteDialog = () => {
    setIsDeleteDialogOpen(!isDeleteDialogOpen);
  };

  /**
   * Close popup to confirm delete user.
   */
  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(!isDeleteDialogOpen);
  };

  effect(() => {
    navbarColor.value = "white";
  });

  /**
   * Handles the login process.
   * @param {React.FormEvent} event
   */
  const handleLogout = (event: React.FormEvent) => {
    event.preventDefault();

    logout();
    navigate("/login");
  };

  /**
   * Handles the delete user.
   */
  const confirmDeleteUser = async () => {
    logout();
    await deleteUser(userID);
    navigate("/login");
  };

  /**
   * Display loading state .
   */
  if (isLoading)
    return (
      <div className="Loader">
        <CircularProgress></CircularProgress>
        <h3 style={{ marginLeft: "10px" }}>Loading...</h3>
      </div>
    );

  // Return =============================================================
  return (
    <>
      <div className="profile-container">
        <div className="overlap-group">
          <div className="ellipse" />
          <img
            className="movie-background"
            alt="Movie background"
            src={background_image}
          />
          <button className="back-button" onClick={() => navigate("../")}>
            <ArrowCircleLeft className="vuesax-linear-arrow" />
          </button>{" "}
          <div className="div">
            <div className="text-wrapper">Welcome {user?.username}</div>
            <div className="div-2">
              <div className="text-wrapper-2">Username</div>
              <div className="text-wrapper-3">{user?.username}</div>
              <div className="text-wrapper-4">E-Mail</div>
              <div className="text-wrapper-3">{user?.email}</div>
            </div>
            <button className="button" onClick={handleLogout}>
              <div className="text-wrapper-5">Log Out</div>
            </button>
            <button
              className="button"
              style={{ backgroundColor: "red" }}
              onClick={openDeleteDialog}
            >
              <div className="text-wrapper-5">Delete Account</div>
            </button>

            {/* Confirmation Dialog for Deleting User */}
            <Dialog open={isDeleteDialogOpen} onClose={closeDeleteDialog}>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete your account? This action
                  cannot be undone.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={closeDeleteDialog}>Cancel</Button>
                <Button
                  onClick={() => void confirmDeleteUser()}
                  style={{ backgroundColor: "red", color: "white" }}
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
      <div className="page-footer">
        <PageFooter></PageFooter>
      </div>
    </>
  );
}

export default ProfilePage;
