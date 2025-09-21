import { radius, spacing, stroke, typography } from "@/shared/lib/tokens";
import { palette } from "@shared/lib/palette";
import { mscale, scale } from "@shared/lib/responsive";
import { TextStyle, ViewStyle } from "react-native";
import { HEIGHT, PADDING_H } from "./constants";
import type { Size, Variant } from "./types";

type ThemeName = keyof typeof palette;

export type Styles = {
  container: ViewStyle;
  containerVariant: ViewStyle;
  label: TextStyle;
  disabled: ViewStyle;
  spinner: ViewStyle;
  labelColor: string;
};

/**
 * Computes themed styles for the primary button across sizes and variants.
 */
export function makeStyles(
  theme: ThemeName,
  size: Size,
  fullWidth: boolean,
  variant: Variant,
  disabled: boolean,
  loading: boolean
): Styles {
  const paletteByTheme = palette[theme];
  const accent = paletteByTheme.highlight.medium;
  const isOutline = variant === "outline";
  const disabledOrLoading = disabled || loading;

  const containerVariant: ViewStyle = isOutline
    ? { backgroundColor: "transparent", borderColor: accent }
    : { backgroundColor: accent, borderColor: accent };

  const containerDisabledVariant: ViewStyle = isOutline
    ? {
        backgroundColor: "transparent",
        borderColor: paletteByTheme.highlight.light,
      }
    : {
        backgroundColor: paletteByTheme.highlight.lightest,
        borderColor: paletteByTheme.highlight.lightest,
      };

  const labelColor = isOutline ? accent : paletteByTheme.neutral.dark.darkest;

  const container: ViewStyle = {
    height: mscale(HEIGHT[size]),
    paddingHorizontal: scale(PADDING_H[size]),
    borderRadius: radius.md,
    borderWidth: stroke.medium,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: spacing.sm,
    ...(fullWidth ? { alignSelf: "stretch" } : { alignSelf: "flex-start" }),
  };

  const containerVariantStyle: ViewStyle = disabledOrLoading
    ? containerDisabledVariant
    : containerVariant;

  const label: TextStyle = {
    ...typography.action.l,
    color: labelColor,
  };

  const disabledStyle: ViewStyle = { opacity: 0.6 };

  const spinner: ViewStyle = { marginLeft: spacing.xsPlus };

  return {
    container,
    containerVariant: containerVariantStyle,
    label,
    disabled: disabledStyle,
    spinner,
    labelColor,
  };
}
