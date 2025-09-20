import * as yup from "yup";

import { validators } from "@/shared/lib/validators";

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
  email: validators.email(),
  country: yup.string().trim().required("Country is required"),
  comments: yup.string().optional(),
  agreed: yup
    .boolean()
    .oneOf([true], "You must agree to the terms to continue")
    .required("You must agree to the terms to continue"),
});
