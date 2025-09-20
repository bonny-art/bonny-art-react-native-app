import type { StepItem } from "@/features/cart/ui/OrderStepper/types";

export const ORDER_STEPS: (string | StepItem)[] = [
  "Your cart",
  "Order",
  "Success",
];
export const CURRENT_STEP_INDEX = 2;
export const FOOTER_LABEL = "Go to Home";
export const ORDER_INFO_TITLE = "Order info";
export const ORDER_NUMBER = "#PS-2025-184";
export const ORDER_STATUS_TEXT = "Status: Pending confirmation";
export const SUCCESS_TITLE = "Order Confirmed!";
export const SUCCESS_SUBTITLE = "Your order has been successfully placed.";
export const SUCCESS_DESCRIPTION =
  "Our manager will contact you shortly to provide payment details and complete the process. Please check your email and phone for updates.";
