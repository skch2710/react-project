import React from "react";
import RadioGroup from "./RadioGroup";
import { FastField } from "formik";

const FormicRadioGroup = ({
  name,
  label,
  options,
  valueKey = "value",
  labelKey = "label",
  ...props
}) => (
  <FastField name={name}>
    {({ field, meta, form }) => (
      <RadioGroup
        {...props}
        name={field.name}
        label={label}
        options={options}
        valueKey={valueKey}
        labelKey={labelKey}
        value={field.value}
        onChange={(option) => form.setFieldValue(field.name, option[valueKey])}
        onBlur={field.onBlur}
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error}
      />
    )}
  </FastField>
);

export default FormicRadioGroup;
