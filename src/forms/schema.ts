import * as yup from "yup";

export const categorySchema = yup.object().shape({
  id: yup.string().required("this field is required"),
  category: yup.string().required("this field is required"),
});

export const expenseSchema = yup.object().shape({
  id: yup.string().required("this field is required"),
  description: yup.string().required("description is required"),
  amount: yup
    .number()
    .typeError("Amount must be a number") // Custom error for non-number input
    .positive("Amount must be greater than zero") // Ensure the number is positive
    .required("Amount is required"),
  category: yup.string().required("this field is required"),
});
