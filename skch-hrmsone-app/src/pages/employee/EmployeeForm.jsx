import { Grid, Stack } from "@mui/material";
import { memo, useEffect } from "react";

import { Form, Formik, useFormikContext } from "formik";

import Button from "../../components/button/Button";
import FormikTextField from "../../components/form/FormikTextField";

import {
  departmentLkp,
  employeeInitialValues,
  employeeValidationSchema,
  genderLkp,
  skillsLkp,
} from "./employeeHelper";

import FormikDropDown from "../../components/dropdown/FormikDropDown";
import FormicRadioGroup from "../../components/radiogroup/FormicRadioGroup";
import { REGEX } from "../../utils/constants";
import FormikDatePicker from "../../components/datepicker/FormikDatePicker";
import FormikToggle from "../../components/toggle/FormikToggle";
import FormikCheckBox from "../../components/checkbox/FormikCheckBox";

// Notify parent about submission status
const SubmitStatus = memo(({ onChange }) => {
  const { isSubmitting } = useFormikContext();
  useEffect(() => {
    onChange(isSubmitting);
  }, [isSubmitting, onChange]);
  return null;
});

const EmployeeForm = memo(
  ({ formikRef, onSubmit, onSuccess, onSubmittingChange }) => {
    return (
      <Formik
        innerRef={formikRef}
        initialValues={employeeInitialValues}
        validationSchema={employeeValidationSchema}
        onSubmit={async (values, formikHelpers) => {
          await onSubmit(values, formikHelpers);
          onSuccess?.();
        }}
      >
        {({ resetForm, submitForm, isSubmitting, errors, touched }) => {
          // console.log("Errors:", errors);
          // console.log("Touched:", touched);
          return (
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
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <FormicRadioGroup
                    name="gender"
                    label="Gender"
                    options={genderLkp}
                    valueKey="genderId"
                    labelKey="genderName"
                  />
                </Grid>

                {/* Department Single DropDown */}
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <FormikDropDown
                    name="department"
                    label="Department"
                    options={departmentLkp}
                    placeholder="Select Department"
                    labelKey="departmentName"
                    valueKey="departmentId"
                    required
                  />
                </Grid>

                {/* Skills Multi Select DropDown */}
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <FormikDropDown
                    name="skills"
                    label="Skills"
                    multiple
                    options={skillsLkp}
                    placeholder="Select Skills"
                    labelKey="skillName"
                    valueKey="skillId"
                  />
                </Grid>

                {/* Start Date and End Date */}
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Stack direction="row" spacing={2}>
                    <FormikDatePicker
                      name="startDate"
                      label="Start Date"
                      required
                    />

                    <FormikDatePicker
                      name="endDate"
                      label="End Date"
                      required
                    />
                  </Stack>
                </Grid>

                {/* Active Toggle and Term Checkbox */}
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Stack direction="row" spacing={2}>
                    <FormikToggle name="active" label="Active" />

                    <FormikCheckBox
                      name="acceptTerms"
                      label="Accept Terms"
                      required
                    />
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

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Submit Form
                </Button>
              </Stack>
            </Form>
          );
        }}
      </Formik>
    );
  },
);

export default EmployeeForm;
