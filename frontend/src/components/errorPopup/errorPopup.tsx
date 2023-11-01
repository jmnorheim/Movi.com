// ErrorPopup.tsx
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import "./ErrorPopup.css";

/**
 * Interface ErrorPopup component.
 */
interface ErrorPopupProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

/**
 * A simple and modern error popup component.
 */
const ErrorPopup: React.FC<ErrorPopupProps> = ({
  isOpen,
  onClose,
  message,
}) => (
  <Dialog open={isOpen} onClose={onClose}>
    <DialogContent className="dialogContent">
      <div style={{ display: "flex", alignItems: "center" }}>
        <ErrorOutlineIcon className="errorIcon" />
        <Typography>{message}</Typography>
      </div>
    </DialogContent>
    <DialogActions className="dialogActions">
      <Button
        onClick={onClose}
        variant="contained"
        className="okButton"
        style={{ backgroundColor: "#001f3f" }}
      >
        Ok
      </Button>
    </DialogActions>
  </Dialog>
);

export default ErrorPopup;
