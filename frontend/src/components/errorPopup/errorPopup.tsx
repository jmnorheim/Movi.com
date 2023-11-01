import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

/**
 * Interface ErrorPopup component.
 */
interface ErrorPopupProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

/**
 * A simple error popup component.
 */
const ErrorPopup: React.FC<ErrorPopupProps> = ({
  isOpen,
  onClose,
  message,
}) => (
  <Dialog open={isOpen} onClose={onClose}>
    <DialogContent className="dialogContent">
      <ErrorOutlineIcon className="errorIcon" color="error" />
      <Typography>{message}</Typography>
    </DialogContent>
    <DialogActions className="dialogActions">
      <Button onClick={onClose} variant="contained" className="okButton">
        Ok
      </Button>
    </DialogActions>
  </Dialog>
);

export default ErrorPopup;
