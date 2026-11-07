import React, { memo } from "react";
import { FormControl, FormLabel } from "@mui/material";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { formLabelStyles } from "../form/formStyles";
import { DATE_FORMAT } from "../../utils/constants";

const DatePicker = memo(
  ({
    label,
    required = false,
    fullWidth = true,
    size = "small",
    error = false,
    helperText,
    sx,
    ...props
  }) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormControl fullWidth={fullWidth} required={required}>
          {label && <FormLabel sx={formLabelStyles}>{label}</FormLabel>}

          <MuiDatePicker
            format={DATE_FORMAT}
            views={["year", "month", "day"]}
            {...props}
            slotProps={{
              ...props.slotProps,
              textField: {
                ...props.slotProps?.textField,
                size,
                fullWidth,
                error,
                helperText,
                sx: [
                  props.slotProps?.textField?.sx,
                  {
                    "& .MuiIconButton-root": {
                      padding: 0.5,
                    },
                  },
                ],
              },
              field: {
                clearable: true,
                onClear: () => props.onChange(null),
              },
              actionBar: {
                actions: ["clear", "today"],
                sx: {
                  borderTop: () => `1px solid gray`,
                  textTransform: "none",
                },
              },
              //   openPickerIcon: {
              //     sx: {
              //       fontSize: 16,
              //     },
              //   },
              //   clearIcon: {
              //     sx: {
              //       fontSize: 16,
              //     },
              //   },
            }}
            sx={sx}
          />
        </FormControl>
      </LocalizationProvider>
    );
  },
);

export default DatePicker;
