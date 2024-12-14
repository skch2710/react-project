import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Avatar, Checkbox, FormControlLabel, Typography, Box } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AxiosApi from '../utils/AxiosApi';
import { encrypt } from '../utils/Aes';

const LoginPage = ({ setIsAuthenticated }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = async (values) => {
    setErrorMessage('');
    const encryptedPwd = await encrypt(values.password);

    const loginPayload = {
      emailId: values.email,
      password: encryptedPwd,
    };

    try {
      const response = await AxiosApi(
        'http://localhost:8061/api/authenticate/login',
        'post',
        loginPayload
      );

      if (response && response.data) {
        if (response.data.errorMessage) {
          setErrorMessage(response.data.errorMessage);
        } else {
          console.log('Login successful:', response.data);
          setIsAuthenticated(true); // Update authentication state
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Login failed. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Avatar sx={{ bgcolor: 'secondary.main', mr: 1 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
      </Box>

      {errorMessage && (
        <Box
          sx={{
            color: 'red',
            mb: 2,
            mt: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'lightblue',
            padding: '4px',
            borderRadius: '4px',
          }}
        >
          {errorMessage}
        </Box>
      )}

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                name="email"
                placeholder="Enter your email"
                style={{ display: 'block', width: '100%', padding: '8px' }}
              />
              <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                name="password"
                placeholder="Enter your password"
                style={{ display: 'block', width: '100%', padding: '8px' }}
              />
              <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
            </div>

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              style={{ width: '100%', padding: '10px', fontSize: '16px' }}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
