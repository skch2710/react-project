import React, { useState, useCallback } from "react";
import { Stack } from "@mui/material";
import { Formik, getIn } from "formik";
import * as Yup from "yup";

import Button from "./components/button/Button";
import Popup from "./components/popup/Popup";
import Typography from "./components/typography/Typography";
import Tabs from "./components/tabs/Tabs";

import { tabLkp } from "./utils/testData";

const initialValues = {
  overview: {
    firstName: "",
    email: "",
  },
  users: {
    userName: "",
    role: "",
  },
  settings: {
    theme: "light",
    notifications: true,
  },
};

const validationSchema = Yup.object({
  overview: Yup.object({
    firstName: Yup.string().required("First name is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
  }),

  users: Yup.object({
    userName: Yup.string().required("Username is required"),
    role: Yup.string().required("Role is required"),
  }),

  settings: Yup.object({
    theme: Yup.string().required("Theme is required"),
  }),
});

const App = () => {
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  // Highest unlocked tab index
  const [maxUnlockedStep, setMaxUnlockedStep] = useState(0);

  const handleOpenPopup = useCallback(() => {
    setTabValue(0);
    setMaxUnlockedStep(0);
    setOpen(true);
  }, []);

  const handleClosePopup = useCallback(() => {
    setOpen(false);
  }, []);

  // Allow navigation only to unlocked tabs
  const handleTabChange = useCallback(
    (_, newValue) => {
      if (newValue <= maxUnlockedStep) {
        setTabValue(newValue);
      }
    },
    [maxUnlockedStep]
  );

  // Validate current tab before proceeding
  const handleNext = async (formik) => {
    const currentTab = tabLkp[tabValue];

    const errors = await formik.validateForm();

    // Check only current tab fields
    const currentTabErrors = currentTab.fields.filter(
      (field) => Boolean(getIn(errors, field))
    );

    // Mark current tab fields as touched
    await Promise.all(
      currentTab.fields.map((field) =>
        formik.setFieldTouched(field, true, false)
      )
    );

    if (currentTabErrors.length > 0) {
      return;
    }

    // Final tab: submit entire payload
    if (tabValue === tabLkp.length - 1) {
      await formik.submitForm();
      return;
    }

    // Unlock next tab
    const nextStep = tabValue + 1;

    setMaxUnlockedStep((prev) =>
      Math.max(prev, nextStep)
    );

    setTabValue(nextStep);
  };

  const handleSubmit = (values) => {
    console.log("Final Combined Payload:", values);

    // Integrate your API here
    // await api.post("/your-endpoint", values);

    setOpen(false);
  };

  return (
    <div>
      <Typography variant="h5" color="primary">
        Multi Step Form Testing
      </Typography>

      <Button variant="contained" onClick={handleOpenPopup}>
        Open Form
      </Button>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          const currentTab = tabLkp[tabValue];
          const SelectedComponent = currentTab?.component;

          // Dynamically enable tabs
          const updatedTabs = tabLkp.map((tab, index) => ({
            ...tab,
            disabled: index > maxUnlockedStep,
          }));

          return (
            <Popup
              open={open}
              onClose={handleClosePopup}
              title="Multi Step Form"
              maxWidth="lg"
              contentSx={{
                height: "400px",
              }}
              actions={
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    onClick={handleClosePopup}
                  >
                    Cancel
                  </Button>

                  {tabValue > 0 && (
                    <Button
                      variant="outlined"
                      onClick={() =>
                        setTabValue((prev) => prev - 1)
                      }
                    >
                      Previous
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={() => handleNext(formik)}
                    disabled={formik.isSubmitting}
                  >
                    {tabValue === tabLkp.length - 1
                      ? "Submit"
                      : "Next"}
                  </Button>
                </Stack>
              }
            >
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                tabs={updatedTabs}
              />

              {SelectedComponent && (
                <SelectedComponent />
              )}
            </Popup>
          );
        }}
      </Formik>
    </div>
  );
};

export default App;