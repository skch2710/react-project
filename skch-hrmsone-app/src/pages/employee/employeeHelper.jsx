import * as Yup from "yup";
import { Link } from "@mui/material";

import GridActions from "../../components/datagrid/GridActions";

export const employeeInitialValues = {
  employeeName: "Sathish Kumar",
  email: "",
  mobile: "",
  department: null,
  skills: [],
  designation: "",
  salary: "",
  startDate: "",
  endDate: "",
  gender: "",
  isActive: null,
  acceptTerms: false,
};

export const employeeValidationSchema = Yup.object({
  employeeName: Yup.string()
    .trim()
    .required("Employee name is required")
    .min(3, "Minimum 3 characters")
    .max(100, "Maximum 200 characters"),

  email: Yup.string()
    .trim()
    .email("Enter a valid email address")
    .required("Email is required"),

  mobile: Yup.string()
    .matches(/^\d{10}$/, "Mobile must contain exactly 10 digits")
    .required("Mobile number is required"),

  department: Yup.object().nullable().required("Department is required"),

  skills: Yup.array()
    .min(1, "Select at least one skill")
    .required("Skills are required"),

  // designation: Yup.string().trim().required("Designation is required"),

  salary: Yup.number()
    .typeError("Salary must be a number")
    .positive("Salary must be greater than zero")
    .required("Salary is required"),

  startDate: Yup.date()
    .typeError("Select a valid Start date")
    .required("Start date is required"),

  endDate: Yup.date()
    .typeError("Select a valid End date")
    .required("End date is required")
    .min(Yup.ref("startDate"), "End date cannot be before Start date"),

  gender: Yup.string()
    .oneOf(["1", "2", "3"], "Select a valid gender")
    .required("Gender is required"),

  isActive: Yup.boolean().nullable().required("Active status is required"),

  acceptTerms: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions",
  ),
});

export const departmentLkp = [
  { departmentId: 1, departmentName: "IT" },
  { departmentId: 2, departmentName: "HR" },
  { departmentId: 3, departmentName: "Finance" },
  { departmentId: 4, departmentName: "Sales" },
];

export const genderLkp = [
  { genderId: 1, genderName: "Male" },
  { genderId: 2, genderName: "Female" },
  { genderId: 3, genderName: "Other" },
];

export const skillsLkp = [
  { skillId: 1, skillName: "JavaScript" },
  { skillId: 2, skillName: "React" },
  { skillId: 3, skillName: "Node.js" },
  { skillId: 4, skillName: "Python" },
  { skillId: 5, skillName: "Java" },
  { skillId: 6, skillName: "Spring Boot" },
];

export const getEmployeePayload = (values) => ({
  ...values,
  salary: Number(values.salary),
});

const handleEdit = (row) => {
  console.log("Edit employee:", row);
};

const handleView = (row) => {
  console.log("View employee:", row);
};

const handleTerminate = (row) => {
  console.log("Terminate employee:", row);
};

const handleEmployeeClick = (row) => {
  console.log("Employee clicked:", row);
};

const employeeActions = [
  { type: "edit", tooltip: "Edit", onClick: handleEdit },
  { type: "view", tooltip: "View", onClick: handleView },
  { type: "terminate", tooltip: "Terminate", onClick: handleTerminate, disabled: (row) => !row.isActive },
  { type: "plus", tooltip: "More Actions", onClick: () => console.log("More actions clicked") },
];

export const employeeColumns = [
  {
    field: "actions",
    headerName: "Actions",
    width: 120,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: ({ row }) => (
      <GridActions actions={employeeActions} row={row} />
    ),
  },
  {
    field: "employeeId",
    headerName: "Employee ID",
    renderCell: (params) => (
      <Link
        component="button"
        underline="hover"
        sx={{
          color: "orange",
          cursor: "pointer",
        }}
        onClick={() => handleEmployeeClick(params.row)}
      >
        {params.value}
      </Link>
    ),
  },
  {
    field: "employeeName",
    headerName: "Employee Name",
    flex: 1,
    minWidth: 200,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1.5,
    minWidth: 200,
  },
  {
    field: "department",
    headerName: "Department",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "salary",
    headerName: "Salary",
    type: "number",
    minWidth: 120,
  },
  {
    field: "startDate",
    headerName: "Start Date",
  },
  {
    field: "endDate",
    headerName: "End Date",
  },
  {
    field: "gender",
    headerName: "Gender",
  },
  {
    field: "isActive",
    headerName: "Is Active",
  },
  {
    field: "skills",
    headerName: "Skills",
  },
  {
    field: "designation",
    headerName: "Designation",
  },
];

export const employeeRows = [
  {
    id: 1,
    employeeId: "EMP001",
    employeeName: "Sathish Kumar Chittipothula",
    email: "sathish@example.com",
    department: "IT",
    salary: 12584000,
  },
  {
    id: 2,
    employeeId: "EMP002",
    employeeName: "Ravi",
    email: "ravi@example.com",
    department: "HR",
    salary: 60000,
    inActive: "Y",
  },
  {
    id: 3,
    employeeId: "EMP003",
    employeeName: "Kumar",
    email: "kumar@example.com",
    department: "Finance",
    salary: 70000,
  },
  {
    id: 4,
    employeeId: "EMP004",
    employeeName: "Anita",
    email: "anita@example.com",
    department: "Sales",
    salary: 75000,
  },
  {
    id: 5,
    employeeId: "EMP005",
    employeeName: "Priya",
    email: "priya@example.com",
    department: "IT",
    salary: 85000,
  },
  {
    id: 6,
    employeeId: "EMP006",
    employeeName: "Raj",
    email: "raj@example.com",
    department: "Finance",
    salary: 70000,
  },
  {
    id: 7,
    employeeId: "EMP007",
    employeeName: "Meera",
    email: "meera@example.com",
    department: "HR",
    salary: 65000,
  },
  {
    id: 8,
    employeeId: "EMP008",
    employeeName: "Vikram",
    email: "vikram@example.com",
    department: "Sales",
    salary: 75000,
  },
  {
    id: 9,
    employeeId: "EMP009",
    employeeName: "Nisha",
    email: "nisha@example.com",
    department: "IT",
    salary: 80000,
  },
  {
    id: 10,
    employeeId: "EMP010",
    employeeName: "Arjun",
    email: "arjun@example.com",
    department: "HR",
    salary: 60000,
  },
  {
    id: 11,
    employeeId: "EMP011",
    employeeName: "Priya",
    email: "priya@example.com",
    department: "IT",
    salary: 85000,
  },
  {
    id: 12,
    employeeId: "EMP012",
    employeeName: "Raj",
    email: "raj@example.com",
    department: "Finance",
    salary: 70000,
  },
];
