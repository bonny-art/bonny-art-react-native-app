import { StyleSheet } from "react-native";

import { palette } from "@shared/lib/palette";
import { radius, sizes, spacing, stroke, typography } from "@shared/lib/tokens";

export const makeStyles = (scheme: keyof typeof palette) => {
  const p = palette[scheme];

  return StyleSheet.create({
    container: {
      width: "100%",
    },
    fieldWrapper: {
      position: "relative",
    },
    label: {
      ...typography.body.s,
      color: p.neutral.light.lightest,
      marginBottom: spacing.xs,
    },
    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: radius.md,
      borderWidth: stroke.hairline,
      borderColor: p.neutral.dark.lightest,
      paddingHorizontal: spacing.lg,
      minHeight: sizes.textField.minHeight,
    },
    input: {
      flex: 1,
      ...typography.body.m,
      color: p.neutral.light.lightest,
      paddingVertical: spacing.sm,
    },
    toggle: {
      marginLeft: spacing.sm,
    },
    errorText: {
      ...typography.body.s,
      color: p.support.error.medium,
      position: "absolute",
      right: 0,
      bottom: -spacing.lg - spacing.xs,
      textAlign: "right",
    },
    helperText: {
      ...typography.body.s,
      color: p.neutral.light.darkest,
      marginTop: spacing.xs,
    },
    focused: {
      borderColor: p.highlight.medium,
    },
    errorBorder: {
      borderColor: p.support.error.medium,
    },
    disabled: {
      backgroundColor: p.neutral.dark.light,
      borderColor: p.neutral.dark.light,
    },
  });
};
