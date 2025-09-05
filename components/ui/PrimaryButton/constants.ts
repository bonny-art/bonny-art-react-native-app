import { Size } from "./types";
import { spacing } from "@/constants/tokens";

export const HEIGHT: Record<Size, number> = { sm: 40, md: 48, lg: 56 };
export const PADDING_H: Record<Size, number> = {
  sm: spacing.lg,
  md: spacing.xl,
  lg: spacing.xl,
};
