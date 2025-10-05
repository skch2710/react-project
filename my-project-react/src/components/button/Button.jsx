import React from "react";
import { Button as MuiButton } from "@mui/material";

const Button = (props) => {
  const {
    label,
    onClick,
    variant = "contained",
    color,
    size = "small",
    disabled = false,
  } = props;
  return (
    <MuiButton
      onClick={onClick}
      variant={variant}
      color={color}
      size={size}
      disabled={disabled}
      {...props}
      sx={{ textTransform: "none", minWidth: 100, width: "auto" }}
    >
      {label}
    </MuiButton>
  );
};

export default Button;
