import { useCallback, useRef, useState } from "react";
import { Grid, IconButton, Stack } from "@mui/material";

import Button from "../../components/button/Button";
import Popup from "../../components/popup/Popup";
import EmployeeForm from "./EmployeeForm";
import { DATE_FORMAT } from "../../utils/constants";
import DataGrid from "../../components/datagrid/DataGrid";
import { employeeRows, employeeColumns } from "./employeeHelper";
import { RiFileExcel2Fill } from "react-icons/ri";
import { FaRegFilePdf } from "react-icons/fa";

const EmployeePage = () => {
  const [formPopup, setFormPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowSelection = useCallback((selectionModel) => {
    setSelectedRows(selectionModel);
  }, []);

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
    const formattedPayload = {
      ...payload,
      startDate: payload.startDate?.format(DATE_FORMAT) ?? "",
      endDate: payload.endDate?.format(DATE_FORMAT) ?? "",
    };
    console.log("API called:", formattedPayload);
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }, []);

  const handleExcel = useCallback(() => {
    console.log("Export to Excel clicked");
  }, []);

  return (
    <>
      <Button onClick={handleOpenPopup}>Open Popup</Button>
      <DataGrid
        title={`Employee List (${employeeRows.length})`}
        rows={employeeRows}
        columns={employeeColumns}
        checkboxSelection
        onRowSelectionModelChange={handleRowSelection}
        // pageSizeOptions={[5, 10, 25]}
        // initialPageSize={5}
        height={450}
        loading={false}
        showPagination={false}
        toolbarActions={
          <Stack direction="row" spacing={1}>
            <Button onClick={handleOpenPopup}>
              Add Employee
            </Button>
            <IconButton onClick={handleExcel} aria-label="Export to Excel">
              <RiFileExcel2Fill />
            </IconButton>
            <IconButton onClick={handleExcel} aria-label="Export to Pdf">
              <FaRegFilePdf />
            </IconButton>
          </Stack>
        }
      />

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
