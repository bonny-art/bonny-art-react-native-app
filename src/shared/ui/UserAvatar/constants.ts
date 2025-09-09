import { mscale } from "@shared/lib/responsive";
import type { UserAvatarSize } from "./types";

const BASE = {
  lg: { w: 80, h: 80, r: 32, pad: { t: 12, r: 10, b: 0, l: 10 } },
  md: { w: 56, h: 56, r: 20, pad: { t: 10, r: 8, b: 0, l: 8 } },
  sm: { w: 40, h: 40, r: 16, pad: { t: 8, r: 8, b: 0, l: 8 } },
} as const;

export type AvatarMetrics = {
  w: number;
  h: number;
  r: number;
  pad: { t: number; r: number; b: number; l: number };
};

export const metricsForSize = (size: UserAvatarSize): AvatarMetrics => {
  const m = BASE[size];
  return {
    w: mscale(m.w),
    h: mscale(m.h),
    r: mscale(m.r),
    pad: {
      t: mscale(m.pad.t),
      r: mscale(m.pad.r),
      b: mscale(m.pad.b),
      l: mscale(m.pad.l),
    },
  };
};

export const PLACEHOLDER_SVG_SIZE: Record<
  UserAvatarSize,
  { w: number; h: number }
> = {
  sm: { w: mscale(24), h: mscale(42) },
  md: { w: mscale(40), h: mscale(65) },
  lg: { w: mscale(60), h: mscale(97.76) },
};

export const svgSizeFor = (size: UserAvatarSize) => PLACEHOLDER_SVG_SIZE[size];

export const BADGE = { size: mscale(24) } as const;
