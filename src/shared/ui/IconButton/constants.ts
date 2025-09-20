import { mscale, scale } from "@shared/lib/responsive";
import { sizes, spacing, stroke } from "@/shared/lib/tokens";

export const DIAMETER = {
  sm: mscale(sizes.iconButton.diameter.sm),
  md: mscale(sizes.iconButton.diameter.md),
  lg: mscale(sizes.iconButton.diameter.lg),
} as const;

export const ICON = {
  sm: mscale(sizes.iconButton.icon.sm),
  md: mscale(sizes.iconButton.icon.md),
  lg: mscale(sizes.iconButton.icon.lg),
} as const;

export const BORDER_WIDTH = scale(stroke.medium);

export const BADGE = {
  size: mscale(sizes.iconButton.badgeSize),
  padX: scale(sizes.iconButton.badgePaddingX),
} as const;

export const HIT_SLOP = {
  top: spacing.sm,
  bottom: spacing.sm,
  left: spacing.sm,
  right: spacing.sm,
} as const;
