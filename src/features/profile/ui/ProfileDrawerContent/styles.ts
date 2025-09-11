import { StyleSheet } from "react-native";
import { palette } from "@shared/lib/palette";
import { typography } from "@/shared/lib/tokens";

export const makeStyles = (scheme: keyof typeof palette) => {
  const p = palette[scheme];

  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: p.neutral.dark.darkest,
    },
    content: {
      paddingHorizontal: 16,
    },
    headerText: {
      ...typography.heading.h2,
      color: p.neutral.light.lightest,
      marginBottom: 8,
    },

    headerBlock: {
      alignItems: "center",
      marginTop: 8,
      marginBottom: 16,
    },
    userName: {
      ...typography.body.l,
      color: p.neutral.light.lightest,
      marginTop: 8,
    },

    itemRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingVertical: 12,
    },
    itemText: {
      ...typography.body.m,
      color: p.neutral.light.lightest,
    },

    divider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: p.neutral.light.darkest,
      opacity: 0.4,
      marginVertical: 8,
    },
  });
};
