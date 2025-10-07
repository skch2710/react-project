import { ErrorMessage, Field } from "formik";
import { FormLabel, Grid } from "@mui/material";
import styles from "./FormicField.module.css";

const FormicField = (props) => {
  const { label, required, name } = props;

  return (
    <Grid className={styles.fieldContainer}>
      <FormLabel required={required} className={styles.label}>
        {label}
      </FormLabel>

      <Field {...props} className={styles.input} />

      <ErrorMessage name={name} component="div" className={styles.errorText} />
    </Grid>
  );
};

export default FormicField;
