import { StyleSheet, type TextStyle, type ViewStyle } from "react-native";

import { palette } from "@/shared/lib/palette";
import { radius, spacing, typography } from "@/shared/lib/tokens";

export type SuccessScreenStyles = {
  container: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  card: ViewStyle;
  cardTitle: TextStyle;
  cardText: TextStyle;
  description: TextStyle;
};

type ThemeName = keyof typeof palette;

/**
 * Builds themed styles for the cart success confirmation screen.
 */
export const makeStyles = (theme: ThemeName): SuccessScreenStyles => {
  const colors = palette[theme];

  return StyleSheet.create({
    container: {
      marginTop: spacing.xl,
      gap: spacing.lg,
    },
    title: {
      ...typography.heading.h2,
      color: colors.neutral.light.light,
    },
    subtitle: {
      ...typography.body.m,
      color: colors.neutral.light.dark,
    },
    card: {
      backgroundColor: colors.neutral.dark.medium,
      padding: spacing.lg,
      borderRadius: radius.sm,
      gap: spacing.xs,
    },
    cardTitle: {
      ...typography.heading.h4,
      color: colors.neutral.light.light,
    },
    cardText: {
      ...typography.body.m,
      color: colors.neutral.light.light,
    },
    description: {
      ...typography.body.m,
      color: colors.neutral.light.dark,
    },
  });
};
