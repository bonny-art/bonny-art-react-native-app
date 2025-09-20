import { radius, spacing, stroke, typography } from "@/shared/lib/tokens";
import { palette } from "@shared/lib/palette";
import { mscale, scale } from "@shared/lib/responsive";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { HEIGHT, PADDING_H } from "./constants";
import type { Size } from "./types";

type ThemeName = keyof typeof palette;

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
  return StyleSheet.create({
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
    label: {
      ...typography.action.l,
    },
    disabled: { opacity: 0.6 },
  });
}
