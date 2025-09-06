import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchema } from "./yupValidation";
import DebouncedField from "../debounced-field/DebouncedField";
import "./style.css";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
};

const handleSubmit = (values, { setSubmitting, resetForm }) => {
  console.log("Form submitted:", values);
  setTimeout(() => {
    setSubmitting(false);
    // resetForm();
  }, 1000);
};

const FormicExample = () => {
  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h3>Formik Form Example with Yup Validation</h3>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            {/* First Name Field with Debounce */}
            <div className="form-group">
              <label htmlFor="firstName">First Name * : </label>
              <DebouncedField
                type="text"
                id="firstName"
                name="firstName"
                className="form-field"
                placeholder="Enter your first name"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="error"
              />
            </div>

            {/* Last Name Field */}
            <div className="form-group">
              <label htmlFor="lastName">Last Name * : </label>
              <Field
                type="text"
                id="lastName"
                name="lastName"
                className="form-field"
                placeholder="Enter your last name"
              />
              <ErrorMessage name="lastName" component="div" className="error" />
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email">Email * : </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="form-field"
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            {/* Submit Button */}
            <div>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormicExample;
