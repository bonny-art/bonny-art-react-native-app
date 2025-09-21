import { StyleSheet } from "react-native";
import { SafeAreaViewProps } from "react-native-safe-area-context";

import { palette } from "@shared/lib/palette";
import { spacing, typography } from "@shared/lib/tokens";

/**
 * Generates themed spacing and typography for the sign-up screen layout.
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
    contentContainer: {
      flexGrow: 1,
      paddingHorizontal: spacing.xl,
      paddingBottom: spacing.xxl,
    },
    header: {
      gap: spacing.xs,
      marginBottom: spacing.lg,
    },
    titleRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.md,
    },
    title: {
      ...typography.heading.h1,
      color: p.neutral.light.lightest,
    },
    subtitle: {
      ...typography.body.m,
      color: p.neutral.light.lightest,
      opacity: 0.76,
      marginTop: spacing.xs,
    },
    formWrapper: {
      marginTop: spacing.xxl,
      gap: spacing.lg,
    },
    loginPrompt: {
      marginTop: spacing.xl,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: spacing.xs,
    },
    promptText: {
      ...typography.body.s,
      color: p.neutral.light.lightest,
      opacity: 0.75,
    },
    promptLink: {
      ...typography.body.s,
      color: p.highlight.medium,
    },
    continueButton: {
      marginTop: spacing.lg,
      alignSelf: "center",
    },
    continueText: {
      ...typography.body.s,
      color: p.highlight.medium,
    },
  });
};
