import { mscale } from "@shared/lib/responsive";
import { sizes } from "@/shared/lib/tokens";
import type { UserAvatarSize } from "./types";

const BASE = {
  lg: {
    w: sizes.avatar.diameter.lg,
    h: sizes.avatar.diameter.lg,
    r: sizes.avatar.radius.lg,
    pad: sizes.avatar.padding.lg,
  },
  md: {
    w: sizes.avatar.diameter.md,
    h: sizes.avatar.diameter.md,
    r: sizes.avatar.radius.md,
    pad: sizes.avatar.padding.md,
  },
  sm: {
    w: sizes.avatar.diameter.sm,
    h: sizes.avatar.diameter.sm,
    r: sizes.avatar.radius.sm,
    pad: sizes.avatar.padding.sm,
  },
} as const;

export type AvatarMetrics = {
  w: number;
  h: number;
  r: number;
  pad: { top: number; right: number; bottom: number; left: number };
};

export const metricsForSize = (size: UserAvatarSize): AvatarMetrics => {
  const m = BASE[size];
  return {
    w: mscale(m.w),
    h: mscale(m.h),
    r: mscale(m.r),
    pad: {
      top: mscale(m.pad.top),
      right: mscale(m.pad.right),
      bottom: mscale(m.pad.bottom),
      left: mscale(m.pad.left),
    },
  };
};

export const PLACEHOLDER_SVG_SIZE: Record<
  UserAvatarSize,
  { w: number; h: number }
> = {
  sm: {
    w: mscale(sizes.avatar.placeholder.sm.width),
    h: mscale(sizes.avatar.placeholder.sm.height),
  },
  md: {
    w: mscale(sizes.avatar.placeholder.md.width),
    h: mscale(sizes.avatar.placeholder.md.height),
  },
  lg: {
    w: mscale(sizes.avatar.placeholder.lg.width),
    h: mscale(sizes.avatar.placeholder.lg.height),
  },
};

export const svgSizeFor = (size: UserAvatarSize) => PLACEHOLDER_SVG_SIZE[size];

export const BADGE = {
  size: mscale(sizes.avatar.badge.size),
  overlap: sizes.avatar.badge.overlap,
} as const;
