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
    keyboard: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      backgroundColor: p.neutral.dark.darkest,
    },
    heroSection: {
      paddingTop: spacing.xl,
      marginBottom: spacing.xxl,
    },
    body: {
      flex: 1,
      paddingHorizontal: spacing.xl,
    },
    header: {
      gap: spacing.sm,
      marginBottom: spacing.xl,
    },
    title: {
      ...typography.heading.h1,
      color: p.neutral.light.lightest,
    },
    subtitle: {
      ...typography.body.m,
      color: p.neutral.light.lightest,
      opacity: 0.76,
      maxWidth: "88%",
    },
    form: {
      marginBottom: spacing.xl,
    },
    registerRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: spacing.xs,
    },
    promptText: {
      ...typography.body.s,
      color: p.neutral.light.lightest,
      opacity: 0.88,
    },
    promptLink: {
      ...typography.body.s,
      color: p.highlight.medium,
    },
  });
};
