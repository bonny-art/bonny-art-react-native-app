import { StyleSheet } from "react-native";
import { palette } from "@/constants/palette";
import { spacing } from "@/constants/tokens";

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
      borderColor: p.neutral.light.light,
      borderWidth: 2,
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
