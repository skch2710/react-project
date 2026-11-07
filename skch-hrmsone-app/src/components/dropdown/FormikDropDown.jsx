import React, { memo, useCallback } from "react";
import { FastField } from "formik";
import DropDown from "./DropDown";

const FormikDropDown = memo(({ name, ...props }) => {
  return (
    <FastField name={name}>
      {({ field, meta, form }) => (
        <DropDown
          {...props}
          value={field.value}
          onChange={(value) => form.setFieldValue(name, value)}
          onBlur={() => form.setFieldTouched(name, true)}
          error={meta.touched && Boolean(meta.error)}
          helperText={meta.touched && meta.error}
        />
      )}
    </FastField>
  );
});

export default FormikDropDown;
