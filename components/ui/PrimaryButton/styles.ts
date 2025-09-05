import { Platform, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { radius, spacing, typography } from "@/constants/tokens";
import { palette } from "@/constants/palette";
import type { Size } from "./types";
import { HEIGHT, PADDING_H } from "./constants";
import { mscale, scale } from "@/constants/responsive";

type ThemeName = keyof typeof palette; // 'light' | 'dark'

export type Styles = {
  container: ViewStyle;
  label: TextStyle;
  disabled: ViewStyle;
};

export function makeStyles(
  theme: ThemeName,
  size: Size,
  fullWidth: boolean
): Styles {
  const p = palette[theme];

  return StyleSheet.create({
    container: {
      height: mscale(HEIGHT[size]),
      paddingHorizontal: scale(PADDING_H[size]),
      borderRadius: radius.md,
      backgroundColor: p.highlight.medium,
      borderWidth: 1,
      borderColor: p.neutral.light.dark,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      gap: spacing.sm,
      ...(fullWidth ? { alignSelf: "stretch" } : { alignSelf: "flex-start" }),
      ...Platform.select({
        android: { elevation: 2 },
        ios: {
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 3 },
        },
        default: {},
      }),
    },
    label: {
      ...typography.action.l,
      color: p.neutral.dark.lightest,
    },
    disabled: { opacity: 0.6 },
  });
}
