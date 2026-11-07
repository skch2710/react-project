import React, { memo } from "react";
import { FastField } from "formik";
import CheckBox from "./CheckBox";

const FormikCheckBox = memo(({ name, ...props }) => {
  return (
    <FastField name={name}>
      {({ field, meta, form }) => (
        <CheckBox
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

export default FormikCheckBox;
