import React, { useCallback } from "react";
import { Field, useFormikContext } from "formik";
import debounce from "lodash.debounce";

const DebouncedField = ({ name, ...props }) => {
  const { setFieldValue } = useFormikContext();

  // Debounced setter for Formik state
  const debouncedChange = useCallback(
    debounce((value) => {
      setFieldValue(name, value);
      console.log("Debounced Input (Formik updated):", value);
    }, 800),
    [name, setFieldValue]
  );

  return (
    <Field name={name}>
      {({ field }) => (
        <input
          {...props}
          {...field} // gives us value + immediate onChange
          onChange={(e) => {
            field.onChange(e);          // ✅ update UI immediately
            debouncedChange(e.target.value); // ✅ delayed update to Formik
          }}
        />
      )}
    </Field>
  );
};

export default DebouncedField;
