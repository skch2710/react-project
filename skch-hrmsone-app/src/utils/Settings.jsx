import React from "react";
import { useFormikContext } from "formik";
import { Stack, Switch, FormControlLabel } from "@mui/material";

const Settings = () => {
  const { values, setFieldValue } = useFormikContext();

  return (
    <Stack spacing={2}>
      <FormControlLabel
        control={
          <Switch
            checked={values.settings.notifications}
            onChange={(e) =>
              setFieldValue(
                "settings.notifications",
                e.target.checked
              )
            }
          />
        }
        label="Enable Notifications"
      />
    </Stack>
  );
};

export default Settings;