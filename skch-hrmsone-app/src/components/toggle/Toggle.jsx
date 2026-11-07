import React, { memo } from "react";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch,
} from "@mui/material";

const Toggle = memo(
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
            <Switch
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

export default Toggle;
