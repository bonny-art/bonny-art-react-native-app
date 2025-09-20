import { StyleSheet, type TextStyle, type ViewStyle } from "react-native";

import { palette } from "@/shared/lib/palette";
import { spacing, typography } from "@/shared/lib/tokens";

export type CartScreenStyles = {
  safeArea: ViewStyle;
  listContainer: ViewStyle;
  centered: ViewStyle;
  footer: ViewStyle;
  totalsRow: ViewStyle;
  totalLabel: TextStyle;
  totalValue: TextStyle;
  loginPrompt: ViewStyle;
  loginPromptText: TextStyle;
  emptyMessage: TextStyle;
};

type ThemeName = keyof typeof palette;

export const makeStyles = (theme: ThemeName): CartScreenStyles => {
  const colors = palette[theme];

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      padding: spacing.xl,
    },
    listContainer: {
      flex: 1,
    },
    centered: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    footer: {
      paddingTop: spacing.md,
      gap: spacing.md,
    },
    totalsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    totalLabel: {
      ...typography.body.m,
      color: colors.neutral.light.light,
    },
    totalValue: {
      ...typography.body.m,
      color: colors.neutral.light.light,
    },
    loginPrompt: {},
    loginPromptText: {
      ...typography.body.m,
      color: colors.neutral.light.light,
      opacity: 0.8,
    },
    emptyMessage: {
      ...typography.body.m,
      color: colors.neutral.light.light,
    },
  });
};
