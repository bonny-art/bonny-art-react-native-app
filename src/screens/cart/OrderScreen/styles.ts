import { StyleSheet } from "react-native";

import { palette } from "@shared/lib/palette";
import { sizes, spacing, typography } from "@/shared/lib/tokens";

export const makeStyles = (scheme: keyof typeof palette) => {
  const p = palette[scheme];

  return StyleSheet.create({
    content: {
      flex: 1,
    },
    cancelButton: {
      alignSelf: "flex-start",
    },
    cancelText: {
      ...typography.action.m,
      color: p.highlight.medium,
    },
    stepper: {
      marginTop: spacing.md,
    },
    scroll: {
      flex: 1,
      marginTop: spacing.xl,
    },
    scrollContent: {
      flexGrow: 1,
      gap: spacing.xl,
    },
    introBlock: {
      gap: spacing.sm,
    },
    introTitle: {
      ...typography.heading.h2,
      color: p.neutral.light.light,
    },
    introSubtitle: {
      ...typography.body.m,
      color: p.neutral.light.dark,
    },
    formBlock: {
      gap: spacing.lg,
    },
    commentsInput: {
      minHeight: sizes.textarea.minHeight,
      paddingTop: spacing.sm,
      paddingBottom: spacing.sm,
    },
    checkboxRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: spacing.md,
    },
    checkboxTextWrapper: {
      flex: 1,
      gap: spacing.xs,
    },
    checkboxText: {
      ...typography.body.m,
      color: p.neutral.light.light,
    },
    readMoreText: {
      ...typography.body.m,
      color: p.highlight.medium,
    },
    checkboxError: {
      ...typography.body.s,
      color: p.support.error.medium,
    },
  });
};
