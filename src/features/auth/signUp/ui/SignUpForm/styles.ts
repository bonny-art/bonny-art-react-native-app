import { StyleSheet } from "react-native";

import { palette } from "@shared/lib/palette";
import { spacing, typography } from "@shared/lib/tokens";

export const makeStyles = (scheme: keyof typeof palette) => {
  const p = palette[scheme];

  return StyleSheet.create({
    container: {
      gap: spacing.xl,
    },
    checkboxSection: {
      gap: spacing.xs,
    },
    checkboxRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: spacing.md,
    },
    checkboxLabel: {
      flex: 1,
    },
    legalText: {
      ...typography.body.s,
      color: p.neutral.light.lightest,
      opacity: 0.88,
      lineHeight: 18,
    },
    legalHighlight: {
      color: p.highlight.medium,
      fontWeight: "700",
    },
    checkboxError: {
      ...typography.body.s,
      color: p.support.error.medium,
      marginTop: spacing.xs,
    },
  });
};
