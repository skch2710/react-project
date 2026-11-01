import React from "react";
import { useFormikContext } from "formik";
import { TextField, Stack } from "@mui/material";

const Overview = () => {
  const { values, handleChange, errors, touched } =
    useFormikContext();

  return (
    <Stack spacing={2}>
      <TextField
        name="overview.firstName"
        label="First Name"
        value={values.overview.firstName}
        onChange={handleChange}
        error={Boolean(
          touched.overview?.firstName &&
          errors.overview?.firstName
        )}
        helperText={
          touched.overview?.firstName &&
          errors.overview?.firstName
        }
      />

      <TextField
        name="overview.email"
        label="Email"
        value={values.overview.email}
        onChange={handleChange}
        error={Boolean(
          touched.overview?.email &&
          errors.overview?.email
        )}
        helperText={
          touched.overview?.email &&
          errors.overview?.email
        }
      />
    </Stack>
  );
};

export default Overview;