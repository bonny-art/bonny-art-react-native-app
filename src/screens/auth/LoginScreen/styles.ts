import { StyleSheet } from "react-native";
import { SafeAreaViewProps } from "react-native-safe-area-context";

import { palette } from "@shared/lib/palette";
import { spacing, typography } from "@shared/lib/tokens";

export const makeStyles = (scheme: keyof typeof palette) => {
  const p = palette[scheme];

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: p.neutral.dark.darkest,
    } satisfies SafeAreaViewProps["style"],
    container: {
      flex: 1,
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.xl,
      justifyContent: "space-between",
    },
    header: {
      gap: spacing.sm,
      marginTop: spacing.xl,
    },
    title: {
      ...typography.heading.h1,
      color: p.neutral.light.lightest,
    },
    subtitle: {
      ...typography.body.m,
      color: p.neutral.light.lightest,
      opacity: 0.72,
      maxWidth: "80%",
    },
    actions: {
      gap: spacing.md,
    },
  });
};
