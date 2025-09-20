import * as yup from "yup";

import type { OrderFormValues } from "./types";

export const ORDER_STEPS: string[] = ["Your cart", "Order", "Success"];

export const DEFAULT_COUNTRY = "Ukraine";

export const ORDER_FORM_INITIAL_VALUES: OrderFormValues = {
  email: "",
  country: DEFAULT_COUNTRY,
  comments: "",
  agreed: false,
};

export const ORDER_FORM_VALIDATION_SCHEMA = yup.object({
  email: yup
    .string()
    .trim()
    .email("Enter a valid email")
    .required("Email is required"),
  country: yup.string().trim().required("Country is required"),
  comments: yup.string().optional(),
  agreed: yup
    .boolean()
    .oneOf([true], "You must agree to the terms")
    .required("You must agree to the terms"),
});
