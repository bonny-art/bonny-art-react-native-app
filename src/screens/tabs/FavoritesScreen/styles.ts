import { StyleSheet } from "react-native";

import { palette } from "@shared/lib/palette";
import { spacing, typography } from "@shared/lib/tokens";

/**
 * Generates themed styles for the favorites tab, including empty and loading states.
 */
export const makeStyles = (scheme: keyof typeof palette) => {
  const p = palette[scheme];

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: p.neutral.dark.darkest,
    },
    headerWrapper: {
      paddingHorizontal: spacing.xl,
      paddingTop: spacing.lg,
      paddingBottom: spacing.lg,
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    headerTitle: {
      ...typography.heading.h1,
      marginLeft: spacing.md,
      color: p.neutral.light.lightest,
    },
    unauthContainer: {
      flex: 1,
      paddingHorizontal: spacing.xl,
      alignItems: "center",
      justifyContent: "center",
      gap: spacing.md,
    },
    unauthMessage: {
      ...typography.body.m,
      textAlign: "center",
      marginBottom: spacing.md,
      color: p.neutral.light.lightest,
      opacity: 0.88,
    },
    loadingContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    emptyText: {
      ...typography.body.m,
      color: p.neutral.light.lightest,
      opacity: 0.6,
      textAlign: "center",
      marginTop: spacing.xl,
    },
    list: {
      flex: 1,
    },
    listContent: {
      paddingBottom: spacing.xl,
    },
  });
};
