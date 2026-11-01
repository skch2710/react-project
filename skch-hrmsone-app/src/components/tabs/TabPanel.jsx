import { Box } from "@mui/material";
import { memo } from "react";

const TabPanel = memo(({ children, value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: "10px" }}>{children}</Box>}
    </div>
  );
});

export default TabPanel;
