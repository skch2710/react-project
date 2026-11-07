import { Grid, MenuItem, Stack } from "@mui/material";
import { memo, useEffect } from "react";

import { FastField, Form, Formik, useFormikContext } from "formik";

import Button from "../../components/button/Button";
import FormikTextField from "../../components/form/FormikTextField";

import {
  employeeInitialValues,
  employeeValidationSchema,
  genderLkp,
} from "./employeeHelper";

import { REGEX } from "../../utils/constants";
import RadioGroup from "../../components/radiogroup/RadioGroup";
import TextField from "../../components/form/TextField";

// Notify parent about submission status
const SubmitStatus = memo(({ onChange }) => {
  const { isSubmitting } = useFormikContext();
  useEffect(() => {
    onChange(isSubmitting);
  }, [isSubmitting, onChange]);
  return null;
});

const EmployeeForm = memo(({ formikRef, onSubmit, onSubmittingChange }) => {
  return (
    <Formik
      innerRef={formikRef}
      initialValues={employeeInitialValues}
      validationSchema={employeeValidationSchema}
      onSubmit={onSubmit}
    >
      {({ resetForm, isSubmitting }) => (
        <Form>
          <SubmitStatus onChange={onSubmittingChange} />

          <Grid container spacing={2} sx={{ mt: 2 }}>
            {/* Employee Name */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <FormikTextField
                name="employeeName"
                label="Employee Name"
                required
                inputProps={{
                  maxLength: 100,
                }}
              />
            </Grid>

            {/* Email */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <FormikTextField name="email" label="Email" required />
            </Grid>

            {/* Mobile */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <FormikTextField
                name="mobile"
                label="Mobile"
                regex={REGEX.tenDigitNumber}
                inputProps={{
                  inputMode: "numeric",
                }}
              />
            </Grid>

            {/* Salary */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <FormikTextField
                name="salary"
                label="Salary"
                regex={REGEX.numericTwoDecimal}
                inputProps={{
                  inputMode: "decimal",
                }}
              />
            </Grid>

            {/* Gender Radio Button Group */}

            {/* Gender Radio Button Group */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <FastField name="gender">
                {({ field, meta, form }) => (
                  <RadioGroup
                    name={field.name}
                    label="Gender"
                    options={genderLkp}
                    valueKey="genderId"
                    labelKey="genderName"
                    value={field.value}
                    onChange={(option) =>
                      form.setFieldValue(field.name, option.genderId)
                    }
                    onBlur={field.onBlur}
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                  />
                )}
              </FastField>
            </Grid>

            {/* Department */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <FastField name="department">
                {({ field, meta }) => (
                  <TextField
                    {...field}
                    select
                    label="Department"
                    required
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                  >
                    <MenuItem value="IT">IT</MenuItem>
                    <MenuItem value="HR">HR</MenuItem>
                    <MenuItem value="Finance">Finance</MenuItem>
                  </TextField>
                )}
              </FastField>
            </Grid>

            {/* Start Date and End Date */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Stack direction="row" spacing={2}>
                <FormikTextField name="startDate" label="Start Date" />

                <FormikTextField name="endDate" label="End Date" />
              </Stack>
            </Grid>
          </Grid>

          <Stack
            direction="row"
            spacing={2}
            sx={{ mt: 3, justifyContent: "flex-end" }}
          >
            <Button
              type="button"
              variant="outlined"
              disabled={isSubmitting}
              onClick={resetForm}
            >
              Clear Form
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              Submit Form
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
});

export default EmployeeForm;
