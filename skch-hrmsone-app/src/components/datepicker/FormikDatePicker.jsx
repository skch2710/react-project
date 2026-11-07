import React, { memo } from "react";
import { FastField } from "formik";

import DatePicker from "./DatePicker";

const FormikDatePicker = memo(({ name, ...props }) => {
  return (
    <FastField name={name}>
      {({ field, meta, form }) => (
        <DatePicker
          {...props}
          name={name}
          value={field.value || null}
          onChange={(value) => form.setFieldValue(name, value)}
          onBlur={() => form.setFieldTouched(name, true)}
          error={meta.touched && Boolean(meta.error)}
          helperText={meta.touched && meta.error}
        />
      )}
    </FastField>
  );
});

export default FormikDatePicker;
