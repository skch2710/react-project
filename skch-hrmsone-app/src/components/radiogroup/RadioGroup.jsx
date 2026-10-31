import React, { memo, useId } from "react";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup as MuiRadioGroup,
} from "@mui/material";

const RadioGroup = memo(
  ({
    options = [],
    value,
    onChange,
    label = "",
    name,
    labelKey = "label",
    valueKey = "value",
    row = true,
    disabled = false,
    required = false,
    error = false,
    helperText = "",
    size = "small",
    color = "primary",
    labelPlacement = "end",
    sx,
    radioSx,
    ...props
  }) => {
    const generatedId = useId();
    const groupLabelId = `${generatedId}-label`;

    const getOptionValue = (option) =>
      option?.[valueKey] == null ? "" : String(option[valueKey]);

    const handleChange = (event) => {
      const selectedValue = event.target.value;
      const selectedOption = options.find(
        (option) => getOptionValue(option) === selectedValue,
      );
      if (!selectedOption) return;
      onChange?.(selectedOption);
    };

    console.log(">>>>>>RadioGroup render:", name);

    return (
      <FormControl
        component="fieldset"
        disabled={disabled}
        required={required}
        error={error}
        sx={sx}
      >
        {label && (
          <FormLabel id={groupLabelId} component="legend">
            {label}
          </FormLabel>
        )}

        <MuiRadioGroup
          name={name ?? generatedId}
          aria-labelledby={label ? groupLabelId : undefined}
          value={value == null ? "" : String(value)}
          onChange={handleChange}
          row={row}
          {...props}
        >
          {options.map((option) => {
            if (option == null) return null;
            const optionValue = getOptionValue(option);
            return (
              <FormControlLabel
                key={optionValue}
                value={optionValue}
                label={option?.[labelKey] ?? optionValue}
                disabled={disabled || Boolean(option?.disabled)}
                labelPlacement={labelPlacement}
                control={<Radio size={size} color={color} sx={radioSx} />}
              />
            );
          })}
        </MuiRadioGroup>

        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  },
);

RadioGroup.displayName = "RadioGroup";

export default RadioGroup;
