import { StyleSheet } from "react-native";

import { spacing } from "@shared/lib/tokens";

/**
 * Provides spacing helpers for the login form layout.
 */
export const makeStyles = () => {
  return StyleSheet.create({
    container: {
      gap: spacing.lg,
    },
    actions: {
      marginTop: spacing.sm,
    },
  });
};
