import { mscale } from "@shared/lib/responsive";
import { sizes, spacing } from "@/shared/lib/tokens";

export const ICON_SIZE = mscale(sizes.icon.lg);
export const HIT_SLOP = spacing.sm;

export const LOGOUT_SUCCESS_TITLE = "Logged out";
export const LOGOUT_SUCCESS_MESSAGE =
  "You have been logged out. Keep exploring new art!";
export const LOGOUT_ERROR_TITLE = "Logout failed";
export const LOGOUT_ERROR_MESSAGE =
  "Something went wrong while logging out. Please try again.";
export const LOGOUT_MODAL_TITLE = "Log out";
export const LOGOUT_MODAL_MESSAGE =
  "Are you sure you want to log out? You'll need to log in again to use all the benefits of the app.";
export const LOGOUT_MODAL_CANCEL_LABEL = "Cancel";
export const LOGOUT_MODAL_CONFIRM_LABEL = "Log out";
export const LOGOUT_MODAL_DISMISS_LABEL = "Dismiss log out confirmation";
