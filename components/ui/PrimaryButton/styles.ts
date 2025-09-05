import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { radius, spacing, typography } from "@/constants/tokens";
import { palette } from "@/constants/palette";
import type { Size } from "./types";
import { HEIGHT, PADDING_H } from "./constants";
import { mscale, scale } from "@/constants/responsive";

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
      borderWidth: 2,
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
