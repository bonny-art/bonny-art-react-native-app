import { StyleSheet } from "react-native";

import { palette } from "@shared/lib/palette";
import { spacing, typography } from "@shared/lib/tokens";

export const makeStyles = (scheme: keyof typeof palette) => {
  const p = palette[scheme];

  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: p.neutral.dark.darkest,
    },
    message: {
      ...typography.body.s,
      color: p.neutral.light.lightest,
      marginTop: spacing.md,
    },
  });
};
