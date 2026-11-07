
//Parent
<Grid container spacing={2}>

//Four Fields in one Row
<Grid size={{ xs: 12, sm: 6, md: 3 }}>

//Three Columns in One Row
  <Grid size={{ xs: 12, sm: 6, md: 4 }}>

//Three Columns Inside Two Fields
<Grid size={{ xs: 12, sm: 6, md: 4 }}>
  <Stack direction="row" spacing={2}>
    >>Field-1
    >>Field-2
  </Stack>
</Grid>


import { useCallback, useRef, useState } from "react";
import { Stack } from "@mui/material";

import Button from "../../components/button/Button";
import Popup from "../../components/popup/Popup";
import EmployeeForm from "./EmployeeForm";

const EmployeePage = () => {
  const [formPopup, setFormPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formikRef = useRef(null);

  const handleOpenPopup = useCallback(() => {
    setFormPopup(true);
  }, []);

  const handleClosePopup = useCallback(() => {
    setFormPopup(false);
  }, []);

  // Called by the external Save button
  const handleSaveClick = useCallback(async () => {
    formikRef.current?.submitForm();
  }, []);

  const handleClear = useCallback(() => {
    formikRef.current?.resetForm();
  }, []);

  // Called by Formik after validation succeeds
  const handleEmployeeSubmit = useCallback(async (payload) => {
    console.log("API called:", payload);
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }, []);

  return (
    <>
      <Button onClick={handleOpenPopup}>Open Popup</Button>

      <Popup
        open={formPopup}
        onClose={handleClosePopup}
        title="Add Employee"
        maxWidth="lg"
        actions={
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" onClick={handleClosePopup}>
              Cancel
            </Button>

            <Button variant="outlined" onClick={handleClear}>
              Reset Form
            </Button>

            <Button
              variant="contained"
              onClick={handleSaveClick}
              disabled={isSubmitting}
            >
             Save
            </Button>
          </Stack>
        }
        contentSx={{
          height: "400px",
        }}
      >
        <EmployeeForm
          formikRef={formikRef}
          onSubmit={handleEmployeeSubmit}
          onSuccess={handleClosePopup}
          onSubmittingChange={setIsSubmitting}
        />
      </Popup>
    </>
  );
};

export default EmployeePage;


import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { Field, Form, Formik, useFormikContext } from "formik";
import { memo, useCallback, useEffect } from "react";

import Button from "../../components/button/Button";
import {
  employeeDepartmentOptions,
  employeeGenderOptions,
  employeeInitialValues,
  employeeValidationSchema,
  getEmployeePayload,
} from "./employeeHelper";
import Typography from "../../components/typography/Typography";

const SubmitStatus = ({ onChange }) => {
  const { isSubmitting } = useFormikContext();

  useEffect(() => {
    onChange(isSubmitting);
  }, [isSubmitting, onChange]);

  return null;
};

const EmployeeForm = memo(
  ({ onSubmit, onSuccess, formikRef, onSubmittingChange }) => {
    const handleSubmit = useCallback(
      async (values) => {
        const payload = getEmployeePayload(values);
        await onSubmit?.(payload);
        onSuccess?.();
      },
      [onSubmit, onSuccess],
    );

    console.log(">>>Form is rendered..");

    return (
      <Formik
        innerRef={formikRef}
        initialValues={employeeInitialValues}
        validationSchema={employeeValidationSchema}
        onSubmit={handleSubmit}
        // enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
          resetForm,
        }) => (
          <Form>
            <SubmitStatus onChange={onSubmittingChange} />
            <Box sx={{ p: 1 }}>
              <Typography>
                Employee Details
              </Typography>

              <Grid container spacing={2} sx={{mt: 2}}>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Field
                    as={TextField}
                    fullWidth
                    size="small"
                    name="employeeName"
                    label="Employee Name"
                    value={values.employeeName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.employeeName && Boolean(errors.employeeName)}
                    helperText={touched.employeeName && errors.employeeName}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Field
                    as={TextField}
                    fullWidth
                    size="small"
                    name="email"
                    label="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Field
                    as={TextField}
                    fullWidth
                    size="small"
                    name="mobile"
                    label="Mobile"
                    value={values.mobile}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.mobile && Boolean(errors.mobile)}
                    helperText={touched.mobile && errors.mobile}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    name="department"
                    label="Department"
                    value={values.department}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.department && Boolean(errors.department)}
                    helperText={touched.department && errors.department}
                  >
                    {employeeDepartmentOptions.map((item) => (
                      <MenuItem
                        key={item.departmentId}
                        value={item.departmentId}
                      >
                        {item.departmentName}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Field
                    as={TextField}
                    fullWidth
                    size="small"
                    name="designation"
                    label="Designation"
                    value={values.designation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.designation && Boolean(errors.designation)}
                    helperText={touched.designation && errors.designation}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <TextField
                    fullWidth
                    size="small"
                    name="salary"
                    label="Salary"
                    type="number"
                    value={values.salary}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.salary && Boolean(errors.salary)}
                    helperText={touched.salary && errors.salary}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Stack direction="row" spacing={2}>
                    <TextField
                      fullWidth
                      size="small"
                      name="joiningDate"
                      label="Joining Start Date"
                      type="date"
                      slotProps={{
                        inputLabel: { shrink: true },
                      }}
                      value={values.joiningDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.joiningDate && Boolean(errors.joiningDate)}
                      helperText={touched.joiningDate && errors.joiningDate}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      name="joiningDate"
                      label="Joining End Date"
                      type="date"
                      slotProps={{
                        inputLabel: { shrink: true },
                      }}
                      value={values.joiningDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.joiningDate && Boolean(errors.joiningDate)}
                      helperText={touched.joiningDate && errors.joiningDate}
                    />
                  </Stack>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    name="gender"
                    label="Gender"
                    value={values.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.gender && Boolean(errors.gender)}
                    helperText={touched.gender && errors.gender}
                  >
                    {employeeGenderOptions.map((item) => (
                      <MenuItem key={item.genderId} value={item.genderId}>
                        {item.genderName}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="isActive"
                        checked={values.isActive}
                        onChange={handleChange}
                      />
                    }
                    label="Active Employee"
                  />
                </Grid>
              </Grid>

              {/* Optional form-level buttons */}
              <Stack direction="row" spacing={2} mt={2}>
                <Button type="submit" disabled={isSubmitting}>
                  Submit Form
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={resetForm}
                  disabled={isSubmitting}
                >
                  Clear Form
                </Button>
              </Stack>
            </Box>
          </Form>
        )}
      </Formik>
    );
  },
);

export default EmployeeForm;

