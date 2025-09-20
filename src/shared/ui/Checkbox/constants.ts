import { mscale } from "@shared/lib/responsive";
import { sizes, spacing } from "@/shared/lib/tokens";

export const CHECKBOX_SIZE = {
  sm: mscale(sizes.checkbox.sm),
  md: mscale(sizes.checkbox.md),
} as const;

export const CHECKBOX_HIT_SLOP = spacing.sm;
