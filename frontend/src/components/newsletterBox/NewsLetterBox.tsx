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

  const handleSendEmail = async () => {
    try {
      await sendEmail(email);
      console.log(email);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="footerOuterContainer">
        <div className="join-us-container">
          <div className="text-wrapper">Join Us Today!</div>
          <div className="text-wrapper-2">Description here</div>
          <div className="div-wrapper">
            <button
              className="join-now-button"
              onClick={() => setDialogForm(true)}
            >
              Join Now
            </button>
          </div>
        </div>
      </div>
      <Dialog open={dialogForm} onClose={() => setDialogForm(false)}>
        <DialogTitle>News Letter</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your email to join our newsletter
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
                  console.log(err);
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
