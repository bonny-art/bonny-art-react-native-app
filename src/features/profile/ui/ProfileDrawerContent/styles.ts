import { StyleSheet } from "react-native";
import { palette } from "@shared/lib/palette";
import { spacing, typography } from "@/shared/lib/tokens";

export const makeStyles = (scheme: keyof typeof palette) => {
  const p = palette[scheme];

  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: p.neutral.dark.darkest,
    },
    content: {
      paddingHorizontal: spacing.lg,
    },
    headerText: {
      ...typography.heading.h2,
      color: p.neutral.light.lightest,
      marginBottom: spacing.sm,
    },

    headerBlock: {
      alignItems: "center",
      marginTop: spacing.sm,
      marginBottom: spacing.lg,
    },
    userName: {
      ...typography.body.l,
      color: p.neutral.light.lightest,
      marginTop: spacing.sm,
    },

    itemRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.md,
      paddingVertical: spacing.md,
    },
    itemText: {
      ...typography.body.m,
      color: p.neutral.light.lightest,
    },

    divider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: p.neutral.light.darkest,
      opacity: 0.4,
      marginVertical: spacing.sm,
    },
    switchRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: spacing.md,
    },
    authActions: {
      marginTop: spacing.xl,
      gap: spacing.md,
    },
  });
};
