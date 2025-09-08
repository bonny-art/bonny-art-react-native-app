import { StyleSheet } from "react-native";
import { palette } from "@/constants/palette";
import { spacing } from "@/constants/tokens";

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
      fontSize: 18,
      fontWeight: "600",
      color: p.neutral.light.lightest,
    },
    seeMore: {
      fontSize: 14,
      fontWeight: "600",
      color: p.highlight.medium,
    },
    listContent: {
      gap: spacing.lg,
      paddingHorizontal: spacing.xl,
    },
  });
};
