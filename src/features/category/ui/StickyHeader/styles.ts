import { radius, sizes, spacing } from "@/shared/lib/tokens";
import { palette } from "@shared/lib/palette";
import { StyleSheet } from "react-native";

/**
 * Produces the sticky header styling for search and action controls.
 */
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
      height: sizes.searchBar.height,
      borderRadius: radius.xl,
      backgroundColor: p.neutral.dark.dark,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: spacing.md,
    },
    searchPlaceholder: {
      marginLeft: spacing.sm,
      color: p.neutral.light.light,
      opacity: 0.7,
    },
    searchValue: {
      opacity: 1,
      color: p.neutral.light.lightest,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: spacing.md,
    },
  });
};
