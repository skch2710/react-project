import { Grid } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { initialValues, validationSchema } from "./helper";
import FormicField from "../../components/fields/FormicField";
import FormicDatePicker from "../../components/fields/FormicDatePicker";

const HospitalForm = ({onSubmit }) => {
  
  const handleSubmit = (values) => {
    onSubmit(values);
    console.log("Form values:", values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <Grid>
            <Grid container spacing={4}>
              <Grid>
                <FormicField
                  type="text"
                  name="hospitalName"
                  label="Hospital Name"
                  placeholder="Enter hospital name"
                  required
                  maxLength="150"
                />
              </Grid>

              <Grid>
                <FormicField
                  type="email"
                  name="hospitalEmail"
                  label="Hospital Email"
                  placeholder="Enter hospital email"
                  required
                  maxLength="50"
                />
              </Grid>

              <Grid sx={{ width: "50%" }}>
                <FormicField
                  type="text"
                  name="hospitalAddress"
                  label="Hospital Address"
                  placeholder="Enter hospital address"
                  required
                />
              </Grid>
            </Grid>
            <Grid container spacing={4} paddingTop={2}>
              <Grid>
                <FormicField
                  type="text"
                  name="phoneNumber"
                  label="Hospital Number"
                  placeholder="Enter hospital number"
                  maxLength="15"
                  //   disabled
                />
              </Grid>
            </Grid>
            <Grid container spacing={4} paddingTop={2}>
              <Grid>
                <FormicDatePicker
                  name="startDate"
                  label="Hospital Start Date"
                  required={true}
                />
              </Grid>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default HospitalForm;
