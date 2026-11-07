import React, { memo } from "react";
import { FastField } from "formik";
import Toggle from "./Toggle";

const FormikToggle = memo(({ name, ...props }) => {
  return (
    <FastField name={name}>
      {({ field, meta, form }) => (
        <Toggle
          {...props}
          checked={field.value}
          onChange={(checked) => form.setFieldValue(name, checked)}
          onBlur={() => form.setFieldTouched(name, true)}
          error={meta.touched && Boolean(meta.error)}
          helperText={meta.touched && meta.error}
        />
      )}
    </FastField>
  );
});

export default FormikToggle;
