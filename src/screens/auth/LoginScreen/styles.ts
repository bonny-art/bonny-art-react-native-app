import { StyleSheet } from "react-native";
import { SafeAreaViewProps } from "react-native-safe-area-context";

import { palette } from "@shared/lib/palette";
import { spacing, typography } from "@shared/lib/tokens";

/**
 * Generates themed styles for the login screen layout and prompts.
 */
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
      position: "relative",
    },
    backButton: {
      position: "absolute",
      top: spacing.xl + spacing.md,
      left: spacing.xl,
      zIndex: 1,
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
      fontFamily: typography.body.s.fontFamily,
    },
    skipButton: {
      marginTop: spacing.lg,
      alignSelf: "center",
    },
    skipText: {
      ...typography.body.s,
      color: p.highlight.medium,
    },
  });
};
