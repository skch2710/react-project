import React, { memo } from "react";
import { FastField } from "formik";
import TextField from "./TextField";

const FormikTextField = memo(
  ({
    name,
    label,
    required = false,
    type = "text",
    inputProps,
    regex,
    ...props
  }) => {
    return (
      <FastField name={name}>
        {({ field, meta, form }) => {
          const handleChange = (event) => {
            let value = event.target.value;
            if (regex && !regex.test(value)) {
              return;
            }
            form.setFieldValue(name, value);
          };

          return (
            <TextField
              {...field}
              {...props}
              name={name}
              label={label}
              type={type}
              required={required}
              onChange={handleChange}
              slotProps={{
                ...props.slotProps,
                htmlInput: {
                  ...inputProps,
                  ...props.slotProps?.htmlInput,
                },
              }}
              error={meta.touched && Boolean(meta.error)}
              helperText={meta.touched && meta.error}
            />
          );
        }}
      </FastField>
    );
  },
);

export default FormikTextField;
