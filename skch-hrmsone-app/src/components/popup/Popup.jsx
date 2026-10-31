import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { memo } from "react";

const Popup = memo(
  ({
    open = false,
    onClose,
    title,
    children,
    actions,
    maxWidth = "sm",
    fullWidth = true,
    fullScreen = false,
    showCloseButton = true,
    contentSx,
    titleSx,
    actionsSx,
    ...dialogProps
  }) => {
    return (
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        fullScreen={fullScreen}
        aria-labelledby={title ? "common-popup-title" : undefined}
        {...dialogProps}
      >
        {title && (
          <DialogTitle
            id="common-popup-title"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              fontSize: 18,
              fontWeight: 600,
              ...titleSx,
            }}
          >
            {title}

            {showCloseButton && (
              <IconButton
                aria-label="Close dialog"
                onClick={onClose}
                size="small"
              >
                <CancelOutlinedIcon />
              </IconButton>
            )}
          </DialogTitle>
        )}

        <DialogContent
          dividers
          sx={{
            p: 2,
            ...contentSx,
          }}
        >
          {children}
        </DialogContent>

        {actions && (
          <DialogActions
            sx={{
              p: 2,
              ...actionsSx,
            }}
          >
            {actions}
          </DialogActions>
        )}
      </Dialog>
    );
  },
);

Popup.displayName = "Popup";

export default Popup;
