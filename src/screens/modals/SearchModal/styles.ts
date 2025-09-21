import { StyleSheet, type TextStyle, type ViewStyle } from "react-native";

import { palette } from "@/shared/lib/palette";
import { spacing, typography } from "@/shared/lib/tokens";

import {
  SEARCH_BAR_HEIGHT,
  SEARCH_BAR_PADDING_HORIZONTAL,
  SEARCH_BAR_RADIUS,
} from "./constants";

export type SearchModalStyles = {
  safeArea: ViewStyle;
  container: ViewStyle;
  searchWrapper: ViewStyle;
  searchIconButton: ViewStyle;
  searchInput: TextStyle;
  clearButton: ViewStyle;
  headerRow: ViewStyle;
  headerTitle: TextStyle;
  recentList: ViewStyle;
  recentRow: ViewStyle;
  recentButton: ViewStyle;
  recentText: TextStyle;
  emptyText: TextStyle;
};

type ThemeName = keyof typeof palette;

/**
 * Generates styles for the search modal, covering input, history, and layout.
 */
export const makeStyles = (theme: ThemeName): SearchModalStyles => {
  const colors = palette[theme];

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.neutral.dark.darkest,
    },
    container: {
      flex: 1,
      paddingHorizontal: spacing.xl,
      paddingTop: spacing.md,
    },
    searchWrapper: {
      height: SEARCH_BAR_HEIGHT,
      borderRadius: SEARCH_BAR_RADIUS,
      backgroundColor: colors.neutral.dark.dark,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: SEARCH_BAR_PADDING_HORIZONTAL,
    },
    searchIconButton: {
      paddingVertical: spacing.xs,
    },
    searchInput: {
      flex: 1,
      marginHorizontal: spacing.sm,
      ...typography.body.m,
      color: colors.neutral.light.lightest,
    },
    clearButton: {
      padding: spacing.xs,
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: spacing.xl,
      gap: spacing.sm,
    },
    headerTitle: {
      ...typography.body.l,
      color: colors.neutral.light.lightest,
    },
    recentList: {
      marginTop: spacing.lg,
    },
    recentRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: spacing.sm,
    },
    recentButton: {
      flex: 1,
      marginRight: spacing.sm,
    },
    recentText: {
      ...typography.body.m,
      color: colors.neutral.light.lightest,
    },
    emptyText: {
      ...typography.body.m,
      color: colors.neutral.light.dark,
      opacity: 0.7,
      marginTop: spacing.md,
    },
  });
};
