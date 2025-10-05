import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Button from "../button/Button";

const Popup = (props) => {
  const { open, handleClose, title, onSubmit, children } = props;

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
      <DialogTitle>
        <Typography>{title}</Typography>
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{ position: "absolute", right: 8, top: 8 }}
      >
        <Tooltip title="close">
          <CancelOutlinedIcon fontSize="small" />
        </Tooltip>
      </IconButton>
      <Divider />
      <DialogContent
        sx={{
          height: "400px", // fixed height
          overflowY: "auto", // scroll if content is long
        }}
      >
        {children}
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button label="Save" onClick={onSubmit} color="success" />
        <Button variant="outlined" label="Cancel" onClick={handleClose} />
      </DialogActions>
    </Dialog>
  );
};
export default Popup;
