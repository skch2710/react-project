import * as Yup from "yup";

export const initialValues = {
  fullName: "",
  emailId: "",
  phoneNumber: "",
  dob: "",
  fee: "",
  joiningDate: "",
  address: "",
  proof: "",
  reason: "",
};

export const validationSchema = Yup.object({
  fullName: Yup.string()
    .required("Full Name is required")
    .max(50, "Maximum 50 characters allowed"),
  emailId: Yup.string()
    .email("Invalid email format")
    .required("Email ID is required"),
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .matches(/^\d{10}$/, "Phone Number must be 10 digits"),
  dob: Yup.string().required("Date of Birth is required"),
  fee: Yup.number().required("Fee is required").min(0, "Fee must be positive"),
  joiningDate: Yup.string().required("Joining Date is required"),
  address: Yup.string().required("Address is required"),
  proof: Yup.string().required("Proof is required"),
  reason: Yup.string().required("Reason is required"),
});
