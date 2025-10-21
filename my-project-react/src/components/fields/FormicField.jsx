import { ErrorMessage, Field } from "formik";
import { FormLabel, Grid } from "@mui/material";
import styles from "./FormicField.module.css";

const FormicField = (props) => {
  const { label, required, name, as, rows, ...otherProps } = props;

  return (
    <Grid className={styles.fieldContainer} sx ={{ minWidth: 200 }}>
      <FormLabel required={required} className={styles.label}>
        {label}
      </FormLabel>

      <Field
        {...otherProps}
        name={name}
        as={as}
        rows={rows}
        className={styles.input}
      />

      <ErrorMessage name={name} component="div" className={styles.errorText} />
    </Grid>
  );
};

export default FormicField;
