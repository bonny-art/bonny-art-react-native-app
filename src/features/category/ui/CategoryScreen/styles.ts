import { spacing } from "@/shared/lib/tokens";
import { palette } from "@shared/lib/palette";
import { StyleSheet } from "react-native";

/**
 * Configures the category screen layout styles for lists and empty states.
 */
export const makeStyles = (scheme: keyof typeof palette) => {
  const p = palette[scheme];

  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: p.neutral.dark.darkest,
    },
    columnWrapper: {
      gap: spacing.lg,
      paddingHorizontal: spacing.xl,
    },
    listContent: {
      gap: spacing.lg,
      paddingBottom: spacing.xl,
      backgroundColor: p.neutral.dark.darkest,
    },
    emptyWrap: {
      padding: spacing.xl,
    },
    emptyText: {
      opacity: 0.7,
      color: p.neutral.light.dark,
    },
  });
};
