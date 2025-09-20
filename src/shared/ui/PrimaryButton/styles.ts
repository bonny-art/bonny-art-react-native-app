import { radius, spacing, stroke, typography } from "@/shared/lib/tokens";
import { palette } from "@shared/lib/palette";
import { mscale, scale } from "@shared/lib/responsive";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { HEIGHT, PADDING_H } from "./constants";
import type { Size, Variant } from "./types";

type ThemeName = keyof typeof palette;

type StyleConfig = {
  container: ViewStyle;
  containerVariant: ViewStyle;
  label: TextStyle;
  disabled: ViewStyle;
  spinner: ViewStyle;
};

export type Styles = StyleSheet.NamedStyles<StyleConfig> & {
  labelColor: string;
};

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

  const containerVariant = isOutline
    ? { backgroundColor: "transparent", borderColor: accent }
    : { backgroundColor: accent, borderColor: accent };

  const containerDisabledVariant = isOutline
    ? {
        backgroundColor: "transparent",
        borderColor: paletteByTheme.highlight.light,
      }
    : {
        backgroundColor: paletteByTheme.highlight.lightest,
        borderColor: paletteByTheme.highlight.lightest,
      };

  const labelColor = isOutline ? accent : paletteByTheme.neutral.dark.darkest;

  return {
    ...StyleSheet.create<StyleConfig>({
      container: {
        height: mscale(HEIGHT[size]),
        paddingHorizontal: scale(PADDING_H[size]),
        borderRadius: radius.md,
        borderWidth: stroke.medium,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: spacing.sm,
        ...(fullWidth ? { alignSelf: "stretch" } : { alignSelf: "flex-start" }),
      },
      containerVariant: disabledOrLoading
        ? containerDisabledVariant
        : containerVariant,
      label: {
        ...typography.action.l,
        color: labelColor,
      },
      disabled: { opacity: 0.6 },
      spinner: { marginLeft: spacing.xsPlus },
    }),
    labelColor,
  };
}
