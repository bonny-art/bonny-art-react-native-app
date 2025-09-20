import { spacing } from "@/shared/lib/tokens";
import { palette } from "@shared/lib/palette";
import { StyleSheet } from "react-native";

export const makeStyles = (scheme: keyof typeof palette) => {
  const p = palette[scheme];

  return StyleSheet.create({
    wrap: {
      backgroundColor: p.neutral.dark.darkest,
      paddingHorizontal: spacing.xl,
      paddingTop: spacing.md,
      paddingBottom: spacing.md,
      zIndex: 2,
    },
    searchPill: {
      height: 40,
      borderRadius: 20,
      backgroundColor: p.neutral.dark.dark,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
    },
    searchPlaceholder: {
      marginLeft: 8,
      color: p.neutral.light.light,
      opacity: 0.7,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: spacing.md,
    },
  });
};
