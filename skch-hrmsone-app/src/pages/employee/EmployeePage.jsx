import { useCallback, useRef, useState } from "react";
import { Stack } from "@mui/material";

import Button from "../../components/button/Button";
import Popup from "../../components/popup/Popup";
import EmployeeForm from "./EmployeeForm";

const EmployeePage = () => {
  const [formPopup, setFormPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formikRef = useRef(null);

  const handleOpenPopup = useCallback(() => {
    setFormPopup(true);
  }, []);

  const handleClosePopup = useCallback(() => {
    setFormPopup(false);
  }, []);

  // Called by the external Save button
  const handleSaveClick = useCallback(async () => {
    formikRef.current?.submitForm();
  }, []);

  const handleClear = useCallback(() => {
    formikRef.current?.resetForm();
  }, []);

  // Called by Formik after validation succeeds
  const handleEmployeeSubmit = useCallback(async (payload) => {
    console.log("API called:", payload);
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }, []);

  return (
    <>
      <Button onClick={handleOpenPopup}>Open Popup</Button>

      <Popup
        open={formPopup}
        onClose={handleClosePopup}
        title="Add Employee"
        maxWidth="lg"
        actions={
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" onClick={handleClosePopup}>
              Cancel
            </Button>

            <Button variant="outlined" onClick={handleClear}>
              Reset Form
            </Button>

            <Button
              variant="contained"
              onClick={handleSaveClick}
              disabled={isSubmitting}
            >
              Save
            </Button>
          </Stack>
        }
        contentSx={{
          height: "400px",
        }}
      >
        <EmployeeForm
          formikRef={formikRef}
          onSubmit={handleEmployeeSubmit}
          onSuccess={handleClosePopup}
          onSubmittingChange={setIsSubmitting}
        />
      </Popup>
    </>
  );
};

export default EmployeePage;
