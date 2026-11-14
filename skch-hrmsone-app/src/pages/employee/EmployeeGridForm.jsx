import React from "react";
import { Formik, Form } from "formik";
import { Stack } from "@mui/material";
import GridForm from "./GridForm";
import Button from "../../components/button/Button";

const departmentOptions = [
  { label: "IT", value: "IT" },
  { label: "HR", value: "HR" },
  { label: "Finance", value: "Finance" },
];

const initialValues = {
  employees: [
    {
      id: 1,
      employeeName: "Sathish",
      department: { label: "IT", value: "IT" },
      active: true,
    },
    {
      id: 2,
      employeeName: "Ravi",
      department: { label: "HR", value: "HR" },
      active: false,
    },
    {
      id: 3,
      employeeName: "Kumar",
      department: { label: "Finance", value: "Finance" },
      active: true,
    },
  ],
};

const employeeColumns = [
  {
    field: "employeeName",
    headerName: "Employee Name",
    flex: 1,
    minWidth: 180,
    type: "text",
  },
  {
    field: "department",
    headerName: "Department",
    flex: 1,
    minWidth: 180,
    type: "dropdown",
    options: departmentOptions,
    labelKey: "label",
    valueKey: "value",
  },
  {
    field: "active",
    headerName: "Active",
    width: 100,
    align: "center",
    headerAlign: "center",
    type: "checkbox",
  },
];

const EmployeeGridForm = () => {
  const handleSubmit = async (values) => {
    console.log("Employee Payload:", values.employees);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <Stack spacing={2}>
            <GridForm name="employees" columns={employeeColumns} height={400} />

            <Stack direction="row" justifyContent="flex-end">
              <Button type="submit" disabled={isSubmitting}>
                Save
              </Button>
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default EmployeeGridForm;
