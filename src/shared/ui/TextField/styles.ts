import { StyleSheet } from "react-native";

import { palette } from "@shared/lib/palette";
import { radius, spacing, typography } from "@shared/lib/tokens";

export const makeStyles = (scheme: keyof typeof palette) => {
  const p = palette[scheme];

  return StyleSheet.create({
    container: {
      width: "100%",
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
      borderWidth: 1,
      borderColor: p.neutral.dark.lightest,
      backgroundColor: p.neutral.dark.medium,
      paddingHorizontal: spacing.lg,
      minHeight: 56,
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
      marginTop: spacing.xs,
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
