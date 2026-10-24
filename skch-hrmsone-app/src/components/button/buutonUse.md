import { Box } from "@mui/material";
import Button from "./components/button/Button";
import {
  addButtonStyles,
  closeButtonStyles,
} from "./components/button/buttonStyle";
import { useCallback, useEffect, useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(">>>APP Renderd....");
  }, []);

  const handleCounter = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const handleSave = useCallback(() => {
    setCount(0);
    alert("Reset to 0 Count!");
  }, []);

  return (
    <Box>
      <p>Count : {count}</p>
      <p>Customized MUI Button Test</p>
      <Button sx={addButtonStyles} onClick={handleSave}>
        Login
      </Button>
      <p>Normal MUI Button</p>
      <Button onClick={handleCounter}>Normal MUI Button</Button>
      <p>Close Custom</p>
      <Button sx={closeButtonStyles}>Close</Button>
    </Box>
  );
};

export default App;
