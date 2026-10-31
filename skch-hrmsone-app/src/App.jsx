import { Stack } from "@mui/material";
import { useCallback, useState } from "react";
import Button from "./components/button/Button";
import Popup from "./components/popup/Popup";
import Typography from "./components/typography/Typography";
import LinearProgress from "./components/linearprogress/LinearProgress";

const App = () => {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

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

  const handleIncrementProgress = useCallback(() => {
    console.log(">>>>>>Increment progress action triggered");
    setProgress((prev) => Math.min(prev + 10, 100));
  }, []);

  return (
    <div>
      <Typography variant="h5" color="primary">
        Popup Testing
      </Typography>

      <Button variant="contained" onClick={handleOpenPopup}>
        Open Dialog
      </Button>

      {/* Popup Component :
        Sizes : xs, sm, md, lg, xl
        fullWidth : true/false
        fullScreen : true/false
        showCloseButton : true/false
        title : string
        actions : ReactNode (Buttons or any other components)
      */}

      <Popup
        open={open}
        onClose={handleClosePopup}
        title="Test Popup"
        maxWidth="lg"
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
        contentSx={{
          height: "400px",
        }}
      >
        <LinearProgress value={progress} />
        <Typography>This is a simple popup for testing purposes.</Typography>
        <Button variant="contained" onClick={handleIncrementProgress}>
          Increment Progress
        </Button>
      </Popup>
    </div>
  );
};

export default App;
