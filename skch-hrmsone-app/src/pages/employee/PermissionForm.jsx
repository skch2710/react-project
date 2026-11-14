
import React from "react";
import { Formik, Form } from "formik";
import { Stack } from "@mui/material";

import Button from "../../components/button/Button";
import PermissionGrid from "./PermissionGrid";

const permissionInitialValues = {
  permissions: [
    {
      id: 1,
      moduleName: "Employee",
      read: true,
      write: true,
      terminate: false,
    },
    {
      id: 2,
      moduleName: "Department",
      read: true,
      write: false,
      terminate: false,
    },
    {
      id: 3,
      moduleName: "Role",
      read: true,
      write: true,
      terminate: true,
    },
    {
      id: 4,
      moduleName: "User",
      read: true,
      write: false,
      terminate: false,
    },
  ],
};

const PermissionForm = () => {
  const handlePermissionSubmit = (values) => {
    console.log("Permission Payload:", values.permissions);
  };

  return (
    <Formik
      initialValues={permissionInitialValues}
      onSubmit={handlePermissionSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Stack spacing={2}>
            <PermissionGrid name="permissions" height={400} />

            <Stack direction="row">
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                Save Permissions
              </Button>
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default PermissionForm;
