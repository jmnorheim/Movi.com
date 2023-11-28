import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
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
 * Render the ProfilePage component.
 * @returns {React.FC}
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
  if (isLoading) {
    return <div> isLoading ... </div>;
  }

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
