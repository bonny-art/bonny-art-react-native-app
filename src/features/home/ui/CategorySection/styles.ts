import { spacing, typography } from "@/shared/lib/tokens";
import { palette } from "@shared/lib/palette";
import { StyleSheet } from "react-native";

export const makeStyles = (scheme: keyof typeof palette) => {
  const p = palette[scheme];
  return StyleSheet.create({
    root: {
      paddingTop: spacing.lg,
      backgroundColor: "transparent",
    },
    headerRow: {
      paddingHorizontal: spacing.xl,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: spacing.md,
    },
    title: {
      ...typography.heading.h2,
      fontWeight: "600",
      color: p.neutral.light.lightest,
    },
    seeMore: {
      ...typography.body.m,
      fontWeight: "600",
      color: p.highlight.medium,
    },
    listContent: {
      gap: spacing.lg,
      paddingHorizontal: spacing.xl,
    },
  });
};
