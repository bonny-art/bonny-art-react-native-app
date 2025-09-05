import { mscale, scale } from "@/constants/responsive";

export const DIAMETER = {
  sm: mscale(32),
  md: mscale(40),
  lg: mscale(48),
} as const;

export const ICON = {
  sm: mscale(16),
  md: mscale(20),
  lg: mscale(24),
} as const;

export const BORDER_WIDTH = scale(2);

export const BADGE = {
  size: mscale(16),
  padX: scale(4),
} as const;

export const HIT_SLOP = { top: 8, bottom: 8, left: 8, right: 8 } as const;
