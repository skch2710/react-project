import React, { memo } from "react";
import MuiTypography from "@mui/material/Typography";

const Typography = memo(({ children, ...props }) => {
  console.log(`Typography rendered: ${children}`);
  return <MuiTypography {...props}>{children}</MuiTypography>;
});

export default Typography;
