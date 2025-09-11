import { StyleSheet } from "react-native";
import { palette } from "@shared/lib/palette";
import { spacing, typography } from "@shared/lib/tokens";

export const makeStyles = (scheme: keyof typeof palette) => {
  const p = palette[scheme];

  return StyleSheet.create({
    root: {
      flex: 1,
      gap: spacing.lg,
      backgroundColor: p.neutral.dark.dark,
    },
    content: {
      paddingHorizontal: spacing.xl,
      gap: spacing.lg,
      flex: 1,
    },
    headerText: {
      color: p.neutral.light.lightest,
      ...typography.heading.h1,
    },
    itemRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingVertical: 8,
    },
    itemText: {
      color: p.neutral.light.lightest,
      ...typography.body.m,
    },
  });
};
