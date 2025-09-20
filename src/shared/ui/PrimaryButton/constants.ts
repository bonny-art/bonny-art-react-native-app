import { sizes, spacing } from "@/shared/lib/tokens";
import { Size } from "./types";

export const HEIGHT: Record<Size, number> = sizes.primaryButton.heights;
export const PADDING_H: Record<Size, number> = {
  sm: spacing.lg,
  md: spacing.xl,
  lg: spacing.xl,
};
