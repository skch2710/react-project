import React from "react";
import { useFormikContext } from "formik";
import { TextField, Stack } from "@mui/material";

const Users = () => {
  const { values, handleChange } = useFormikContext();

  return (
    <Stack spacing={2}>
      <TextField
        name="users.userName"
        label="User Name"
        value={values.users.userName}
        onChange={handleChange}
      />

      <TextField
        name="users.role"
        label="Role"
        value={values.users.role}
        onChange={handleChange}
      />
    </Stack>
  );
};

export default Users;