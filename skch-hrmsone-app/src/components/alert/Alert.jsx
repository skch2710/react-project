import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import MuiAlert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import React, { memo, useState } from "react";

const Alert = memo(
  ({ severity, showClose = false, children, onClose, ...props }) => {
    const [open, setOpen] = useState(true);

    if (!open) {
      return null;
    }

    const handleClose = (event) => {
      setOpen(false);
      onClose?.(event);
    };

    const alertAction = showClose ? (
      <IconButton
        aria-label="close"
        color="inherit"
        size="small"
        onClick={handleClose}
      >
        <CancelOutlinedIcon fontSize="inherit" />
      </IconButton>
    ) : undefined;

    return (
      <MuiAlert severity={severity} action={alertAction} {...props}>
        {children}
      </MuiAlert>
    );
  },
);

export default Alert;
