import { useCallback, useState } from "react";
import Button from "./components/button/Button";
import Typography from "./components/typography/Typography";
import Popup from "./components/popup/Popup";
import { Stack } from "@mui/material";

const App = () => {
  const [open, setOpen] = useState(false);

  const handleOpenPopup = useCallback((event) => {
    event.currentTarget.blur();
    setOpen(true);
  }, []);

  const handleClosePopup = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSave = useCallback(() => {
    console.log(">>>>>>Save action triggered");
    setOpen(false);
  }, []);

  return (
    <div>
      <Typography variant="h5" color="primary">
        Popup Testing
      </Typography>

      <Button variant="contained" onClick={handleOpenPopup}>
        Open Dialog
      </Button>

      <Popup
        open={open}
        onClose={handleClosePopup}
        title="Test Popup"
        maxWidth="md"
        actions={
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" onClick={handleClosePopup}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </Stack>
        }
      >
        <Typography>This is a simple popup for testing purposes.</Typography>
      </Popup>
    </div>
  );
};

export default App;
