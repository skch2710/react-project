import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Stack } from "@mui/material";

import Button from "../../components/button/Button";
import Popup from "../../components/popup/Popup";
import EmployeeForm from "./EmployeeForm";
import { DATE_FORMAT } from "../../utils/constants";
import DataGrid from "../../components/datagrid/DataGrid";
import { employeeRows, employeeColumns } from "./employeeHelper";
import PermissionForm from "./PermissionForm";
import EmployeeGridForm from "./EmployeeGridForm";

const isEmployeeRowSelectable = ({ row }) => row.inActive !== "Y";

const getRowId = (row) => row.employeeId;

const INITIAL_EMPLOYEE_QUERY = {
  pageNumber: 1,
  pageSize: 25,
  sortBy: "employeeId",
  sortOrder: "asc",
  filters: [],
};
const INITIAL_EMPLOYEE_SORT = {
  field: INITIAL_EMPLOYEE_QUERY.sortBy,
  direction: INITIAL_EMPLOYEE_QUERY.sortOrder,
};

const getMockEmployeePage = (rows, query) => {
  const filteredRows = rows.filter((row) =>
    query.filters.every(({ field, value }) =>
      String(row[field] ?? "")
        .toLowerCase()
        .startsWith(String(value).toLowerCase()),
    ),
  );
  const direction = query.sortOrder === "desc" ? -1 : 1;
  const sortedRows = [...filteredRows].sort((left, right) =>
    direction *
    String(left[query.sortBy] ?? "").localeCompare(
      String(right[query.sortBy] ?? ""),
      undefined,
      { numeric: true, sensitivity: "base" },
    ),
  );
  const start = (query.pageNumber - 1) * query.pageSize;

  return {
    rows: sortedRows.slice(start, start + query.pageSize),
    rowCount: filteredRows.length,
  };
};

const EmployeePage = () => {
  const [formPopup, setFormPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [queryPayload, setQueryPayload] = useState(INITIAL_EMPLOYEE_QUERY);

  useEffect(() => {
    console.log("Query Payload changed:", queryPayload);
  }, [queryPayload]);

  const handleSelectionChange = useCallback((selectedRows) => {
    console.log("Selected Rows:", selectedRows);
  }, []);

  const handlePaginationModelChange = useCallback(({ page, pageSize }) => {
    setQueryPayload((current) => ({
      ...current,
      pageNumber: page + 1,
      pageSize,
    }));
  }, []);

  const handleSortChange = useCallback(({ field, direction }) => {
    setQueryPayload((current) => ({
      ...current,
      pageNumber: 1,
      sortBy: field,
      sortOrder: direction,
    }));
  }, []);

  const handleFilterChange = useCallback((filterValues) => {
    const filters = Object.entries(filterValues)
      .filter(([, value]) => value != null && String(value).trim() !== "")
      .map(([field, value]) => ({ field, type: "startWith", value }));

    setQueryPayload((current) => ({
      ...current,
      pageNumber: 1,
      filters,
    }));
  }, []);

  const paginationModel = useMemo(
    () => ({
      page: queryPayload.pageNumber - 1,
      pageSize: queryPayload.pageSize,
    }),
    [queryPayload.pageNumber, queryPayload.pageSize],
  );
  
  const { rows, rowCount } = useMemo(
    () => getMockEmployeePage(employeeRows, queryPayload),
    [queryPayload],
  );

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

  const toolbarActions = useMemo(
    () => [
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
        label: "Export ZIP",
        onClick: handleExcel,
        variant: "outlined",
        tooltip: "Export employee data to ZIP",
      },
    ],
    [handleOpenPopup, handleExcel],
  );

  return (
    <>
      <Button onClick={handleOpenPopup}>Open Popup</Button>

      {/* <PermissionForm /> */}

      <DataGrid
        title={`Employee List (${rowCount})`}
        rows={rows}
        columns={employeeColumns}
        getRowId={getRowId}
        checkboxSelection
        onSelectionChange={handleSelectionChange}
        isRowSelectable={isEmployeeRowSelectable}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationModelChange}
        initialPageSize={INITIAL_EMPLOYEE_QUERY.pageSize}
        sortingMode="server"
        initialSort={INITIAL_EMPLOYEE_SORT}
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
        rowCount={rowCount}
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
