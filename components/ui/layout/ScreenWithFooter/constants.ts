export const FOOTER_H = 64;
export const FOOTER_PADDING_V = 12;

export const BTN_H = {
  sm: 44,
  md: 52,
  lg: 56,
} as const;

export type BtnSizeKey = keyof typeof BTN_H;
