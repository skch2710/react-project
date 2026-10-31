import { memo } from "react";
import { LinearProgress as MuiLinearProgress } from "@mui/material";
import { linearProgressStyle } from "./linearProgressStyle";

const LinearProgress = memo((props) => {
  const { value = 0, variant = "determinate" } = props;
  return (
    <MuiLinearProgress
      variant={variant}
      value={value}
      sx={linearProgressStyle}
    />
  );
});

export default LinearProgress;
