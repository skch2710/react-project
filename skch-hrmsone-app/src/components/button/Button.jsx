import React, { memo } from "react";
import MuiButton from "@mui/material/Button";

const Button = memo(
  ({
    children,
    color = "success",
    disabled = false,
    size = "small",
    variant = "contained",
    startIcon,
    endIcon,
    sx,
    ...props
  }) => {
    console.log(`Button rendered: ${children}`);

    return (
      <MuiButton
        variant={variant}
        color={color}
        size={size}
        startIcon={startIcon}
        endIcon={endIcon}
        disabled={disabled}
        sx={[
          {
            textTransform: "none",
            minWidth: "100px",
            fontSize: "14px",
            fontWeight: 400,
          },
          ...(Array.isArray(sx) ? sx : [sx ?? {}]),
        ]}
        {...props}
      >
        {children}
      </MuiButton>
    );
  },
);

export default Button;
