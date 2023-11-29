import { useState } from "react";
import "./NewsLetterBox.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { sendEmail } from "../../services/utilities/mailHandler";

const NewsLetterBox = () => {
  const [dialogForm, setDialogForm] = useState(false);
  const [email, setEmail] = useState("");

  /**
   * Asynchronously sends an email to the provided email address.
   *
   * This function invokes the `sendEmail` service, passing the current state's email address.
   * If the email sending process fails, it throws an error.
   *
   * @remarks
   * - This function is triggered when the user clicks the 'Join' button in the newsletter dialog.
   * - It uses the `sendEmail` service from `../../services/utilities/mailHandler`.
   * - Error handling is implemented to catch and throw errors during the email sending process.
   *
   * @throws {Error} Throws an error with the message "Error sending email" if the email sending process fails.
   */
  const handleSendEmail = async () => {
    try {
      await sendEmail(email);
    } catch (error) {
      throw Error("Error sending email");
    }
  };

  return (
    <>
      <div className="footerOuterContainer">
        <div className="join-us-container">
          <div className="text-wrapper">Join Us Today!</div>
          <div className="text-wrapper-2">
            Subscribe to receive Møvi`s top movie picks for this christmas!
          </div>
          <button
            className="join-now-button"
            onClick={() => setDialogForm(true)}
          >
            <p className="join-now-button-text">Join Now</p>
          </button>
        </div>
      </div>
      <Dialog
        open={dialogForm}
        onClose={() => setDialogForm(false)}
        style={{ zIndex: 100 }}
      >
        <DialogTitle>News Letter</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your email to join our newsletter (not ntnu-email)
          </DialogContentText>
          <DialogContentText>
            Remember to check your spam folder!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogForm(false)}>Cancel</Button>
          <Button
            onClick={() => {
              handleSendEmail()
                .then(() => setEmail(""))
                .catch((err) => {
                  console.error(err);
                });
              setDialogForm(false);
            }}
          >
            Join
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewsLetterBox;
