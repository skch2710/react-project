import React, { useState } from "react";
import FormicField from "../../components/fields/FormicField";
import { Form, Formik } from "formik";
import { Alert, Grid, Typography } from "@mui/material";
import { loginForm, validationSchema } from "./helper";
import MailLockOutlinedIcon from "@mui/icons-material/MailLockOutlined";
import LockOutlineIcon from "@mui/icons-material/LockOutline";
import Button from "../../components/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/slices/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { login } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    console.log("Login Form Values:", values);
    try {
      const result = await dispatch(loginUser(values));
      console.log("Dispatch Response:", result);
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Login successful!");
        console.log("Logged in User:", login.data);
        navigate("/home", { replace: true });
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Formik
      initialValues={loginForm}
      validationSchema={validationSchema}
      onSubmit={(values) => handleSubmit(values)}
      enableReinitialize
    >
      {({ handleSubmit, resetForm }) => (
        <Form id="loginForm">
          <Grid container spacing={2} flexDirection={"column"}>
            {login.error && <Alert severity="error">{login.error}</Alert>}

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
            {/* Submit Button */}
            <Grid size={7} justifyContent="flex-end" container display="flex">
              <Button
                label="Login"
                color="primary"
                onClick={handleSubmit}
                loading={login.loading}
                disabled={login.loading}
              />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
