import React, { memo } from "react";
import MuiTextField from "@mui/material/TextField";
import { FormControl, FormLabel } from "@mui/material";
import { formLabelStyles } from "./formStyles";

const TextField = memo(
  ({
    label,
    type = "text",
    size = "small",
    fullWidth = true,
    required = false,
    sx,
    ...props
  }) => {
    console.log(`TextField rendered: ${props.name}`);

    return (
      <FormControl fullWidth required={required}>
        {label && <FormLabel sx={formLabelStyles}>{label}</FormLabel>}

        <MuiTextField
          type={type}
          size={size}
          fullWidth={fullWidth}
          placeholder={`Enter ${label}`}
          sx={sx}
          {...props}
        />
      </FormControl>
    );
  },
);

export default TextField;
