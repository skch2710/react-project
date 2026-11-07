import * as Yup from "yup";

export const employeeInitialValues = {
  employeeName: "",
  email: "",
  mobile: "",
  department: "",
  designation: "",
  salary: "",
  joiningDate: "",
  gender: "",
  isActive: true,
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

  // department: Yup.string().required("Department is required"),

  // designation: Yup.string().trim().required("Designation is required"),

  salary: Yup.number()
    .typeError("Salary must be a number")
    .positive("Salary must be greater than zero")
    .required("Salary is required"),

  // joiningDate: Yup.date()
  //   .typeError("Select a valid joining date")
  //   .required("Joining date is required"),

  gender: Yup.string()
    .oneOf(["1", "2", "3"], "Select a valid gender")
    .required("Gender is required"),

  // isActive: Yup.boolean(),
});

export const employeeDepartmentOptions = [
  { departmentId: "IT", departmentName: "IT" },
  { departmentId: "HR", departmentName: "HR" },
  { departmentId: "FINANCE", departmentName: "Finance" },
  { departmentId: "SALES", departmentName: "Sales" },
];

export const genderLkp = [
  { genderId: 1, genderName: "Male" },
  { genderId: 2, genderName: "Female" },
  { genderId: 3, genderName: "Other" },
];

export const getEmployeePayload = (values) => ({
  ...values,
  salary: Number(values.salary),
});
