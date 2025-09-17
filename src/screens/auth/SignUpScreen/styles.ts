import { StyleSheet } from "react-native";
import { SafeAreaViewProps } from "react-native-safe-area-context";

import { palette } from "@shared/lib/palette";
import { radius, spacing, typography } from "@shared/lib/tokens";

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
    backButton: {
      width: 44,
      height: 44,
      borderRadius: radius.md,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: p.neutral.dark.light,
      marginBottom: spacing.lg,
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
      fontWeight: "700",
    },
  });
};
