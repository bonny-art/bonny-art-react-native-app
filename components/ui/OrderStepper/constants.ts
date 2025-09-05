import { mscale, scale } from "@/constants/responsive";

export const DOT_DIAMETER = {
  normal: mscale(32),
  compact: mscale(26),
} as const;

export const LINE_THICKNESS = scale(2);
export const H_GAP = scale(12); // горизонтальна щілина між кружечком і лінією
export const LABEL_TOP = scale(6); // відступ підпису від кружечка
