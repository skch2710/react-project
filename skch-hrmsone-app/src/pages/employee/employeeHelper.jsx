import * as Yup from "yup";

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
  isActive: true,
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

  isActive: Yup.boolean(),

  acceptTerms: Yup.boolean().oneOf([true], "You must accept the terms and conditions"),
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
