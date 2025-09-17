import { StyleSheet } from "react-native";

import { spacing } from "@shared/lib/tokens";

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
