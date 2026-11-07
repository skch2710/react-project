import React, { memo } from "react";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Checkbox,
} from "@mui/material";

const CheckBox = memo(
  ({
    label,
    checked = false,
    onChange,
    onBlur,
    required = false,
    disabled = false,
    error = false,
    helperText,
    ...props
  }) => {
    return (
      <FormControl error={error} required>
        <FormControlLabel
          label={label}
          control={
            <Checkbox
              checked={Boolean(checked)}
              onChange={(event) => onChange?.(event.target.checked)}
              onBlur={onBlur}
              disabled={disabled}
              {...props}
            />
          }
        />

        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  },
);

export default CheckBox;
