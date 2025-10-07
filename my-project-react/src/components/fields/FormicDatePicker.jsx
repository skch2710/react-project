import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, FormLabel, Grid, TextField } from "@mui/material";
import { ErrorMessage, useField, useFormikContext } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import styles from "./FormicField.module.css";
import dayjs from "dayjs";
import { DATE_FORMAT } from "../../utils/constants";

const FormicDatePicker = ({ name, label, required, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  return (
    <Grid className={styles.fieldContainer}>
      <FormLabel required={required} className={styles.label}>
        {label}
      </FormLabel>
      <Grid>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            {...props}
            views={["year", "month", "day"]}
            disableHighlightToday={false}
            value={field.value ? dayjs(field.value, DATE_FORMAT) : null}
            onChange={(date) =>
              setFieldValue(name, date ? date.format(DATE_FORMAT) : "")
            }
            slotProps={{
              openPickerIcon: {
                sx: {
                  fontSize: 14,
                },
              },
              clearIcon: {
                sx: {
                  fontSize: 14,
                },
              },
              popper: {
                placement: "top-start",
                sx: { height: 100 },
              },
              textField: {
                size: "small",
                fullWidth: true,
              },
              field: {
                clearable: true,
                onClear: () => setFieldValue(name, null),
              },
              actionBar: {
                actions: ["clear", "today"],
              },
            }}
            sx={{ maxWidth: 200, padding: "0px 0px 0px 0px", fontSize: 12 }}
          />
        </LocalizationProvider>
      </Grid>
      <ErrorMessage name={name} component="div" className={styles.errorText} />
    </Grid>
  );
};

export default FormicDatePicker;
