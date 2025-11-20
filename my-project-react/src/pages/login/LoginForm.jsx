import React from "react";
import FormicField from "../../components/fields/FormicField";
import { Form, Formik } from "formik";
import { Grid, Typography } from "@mui/material";
import { loginForm } from "./helper";
import MailLockOutlinedIcon from "@mui/icons-material/MailLockOutlined";
import LockOutlineIcon from "@mui/icons-material/LockOutline";
import Button from "../../components/button/Button";

const LoginForm = () => {
  const handleSubmit = (values) => {
    console.log("Login Form Values:", values);
  };

  return (
    <Formik
      initialValues={loginForm}
      onSubmit={(values) => handleSubmit(values)}
      enableReinitialize
    >
      {({ handleSubmit, resetForm }) => (
        <Form id="loginForm">
          <Grid container spacing={2} flexDirection={"column"}>
            <Typography variant="h5" mb={2}>
              Login to Your Account !
            </Typography>
            {/* EmailId Field */}
            <Grid size={6}>
              <FormicField
                startIcon={<MailLockOutlinedIcon fontSize="small" />}
                type="email"
                name="emailId"
                label="Email ID"
                placeholder="Enter Email ID"
                maxLength={100}
                required
              />
            </Grid>
            {/* Password Field */}
            <Grid size={6}>
              <FormicField
                startIcon={<LockOutlineIcon fontSize="small" />}
                type="password"
                name="password"
                label="Password"
                placeholder="Enter Password"
                maxLength={50}
                required
              />
            </Grid>
            {/* Remember Me Field */}
            {/* <Grid size={6}>
              <FormicField
                type="checkbox"
                name="rememberMe"
                label="Remember Me"
              />
            </Grid> */}
            {/* Submit Button */}
            <Grid size={7} justifyContent="flex-end" container display="flex">
              <Button label="Login" color="primary" onClick={handleSubmit} />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
