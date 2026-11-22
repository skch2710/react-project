import { useCallback, useRef, useState } from "react";
import { Stack } from "@mui/material";

import Button from "../../components/button/Button";
import Popup from "../../components/popup/Popup";
import EmployeeForm from "./EmployeeForm";
import { DATE_FORMAT } from "../../utils/constants";
import DataGrid from "../../components/datagrid/DataGrid";
import { employeeRows, employeeColumns } from "./employeeHelper";
import PermissionForm from "./PermissionForm";
import EmployeeGridForm from "./EmployeeGridForm";

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

  const emptyRows = [];

  const toolbarActions = [
          {
            type: "add",
            label: "Add Employee",
            onClick: handleOpenPopup,
            variant: "contained",
            tooltip: "Add a new employee",
          },
          {
            type: "exportExcel",
            label: "Export Excel",
            onClick: handleExcel,
            variant: "outlined",
            tooltip: "Export employee data to Excel",
          },
          {
            type: "exportPdf",
            label: "Export PDF",
            onClick: handleExcel,
            variant: "outlined",
            tooltip: "Export employee data to PDF",
          },
           {
            type: "exportZip",
            // label: "Export ZIP",
            onClick: handleExcel,
            variant: "outlined",
            tooltip: "Export employee data to ZIP",
          },
        ];

  return (
    <>
      <Button onClick={handleOpenPopup}>Open Popup</Button>

      {/* <PermissionForm /> */}

      <DataGrid
        title={`Employee List (${employeeRows.length})`}
        rows={employeeRows}
        columns={employeeColumns}
        checkboxSelection
        onRowSelectionModelChange={handleRowSelection}
        minHeight={250}
        maxHeight={600}
        loading={false}
        showPagination={true}
        toolbarActions={toolbarActions}
      />

      {/* <EmployeeGridForm /> */}

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
