import { sizes } from "@/shared/lib/tokens";

export const FOOTER_H = sizes.screenFooter.height;
export const FOOTER_PADDING_V = sizes.screenFooter.paddingVertical;

export const BTN_H = {
  sm: sizes.control.mdPlus,
  md: sizes.control.lgPlus,
  lg: sizes.control.xl,
} as const;

export type BtnSizeKey = keyof typeof BTN_H;
