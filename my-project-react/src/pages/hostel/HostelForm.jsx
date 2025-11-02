import { Grid } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { initialValues, validationSchema } from "./helper";
import FormicField from "../../components/fields/FormicField";
import FormicDatePicker from "../../components/fields/FormicDatePicker";

const HostelForm = ({ onSubmit, formikRef }) => {
  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {() => (
        <Form id="hostelForm">
          <Grid container spacing={3} flexDirection={"column"}>
            {/* First Row */}
            <Grid container spacing={3}>
              <Grid size={3}>
                <FormicField
                  type="text"
                  name="fullName"
                  label="Full Name"
                  placeholder="Enter Full Name"
                  required
                  maxLength={200}
                />
              </Grid>

              <Grid size={3}>
                <FormicField
                  type="email"
                  name="emailId"
                  label="Email ID"
                  placeholder="Enter Email ID"
                  required
                  maxLength={150}
                />
              </Grid>

              <Grid size={2}>
                <FormicField
                  type="number"
                  name="phoneNumber"
                  label="Phone Number"
                  placeholder="Enter Phone Number"
                  required
                  maxLength={10}
                />
              </Grid>

              <Grid size={4}>
                <FormicField
                  type="text"
                  name="address"
                  label="Address"
                  placeholder="Enter address"
                  required
                  maxLength={250}
                />
              </Grid>
            </Grid>

            {/* Second Row */}
            <Grid container spacing={3}>
              <Grid size={2}>
                <FormicDatePicker
                  name="dob"
                  label="Date of Birth"
                  required={true}
                />
              </Grid>

              <Grid size={3}>
                <FormicField
                  type="text"
                  name="fee"
                  label="Hostel Fee"
                  placeholder="Enter Hostel Fee"
                  maxLength={15}
                />
              </Grid>

              <Grid size={2}>
                <FormicDatePicker
                  name="joiningDate"
                  label="Joining Date"
                  required={true}
                />
              </Grid>

              <Grid size={3}>
                <FormicField
                  type="text"
                  name="reason"
                  label="Reason for Joining"
                  placeholder="Enter Reason for Joining"
                  maxLength={15}
                />
              </Grid>
            </Grid>

            {/* Third Row */}
            <Grid>
              <Grid size={2}>
                <FormicField
                  type="text"
                  name="proof"
                  label="Proof of Address"
                  placeholder="Enter proof of address"
                  required
                  maxLength={50}
                />
              </Grid>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default HostelForm;
