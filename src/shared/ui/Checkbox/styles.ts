import { StyleSheet } from "react-native";

import { palette } from "@shared/lib/palette";
import { stroke } from "@/shared/lib/tokens";

export const makeStyles = (scheme: keyof typeof palette) => {
  const p = palette[scheme];

  return StyleSheet.create({
    box: {
      borderWidth: stroke.thin,
      borderColor: p.neutral.light.darkest,
      backgroundColor: "transparent",
      alignItems: "center",
      justifyContent: "center",
    },
    checked: {
      backgroundColor: p.highlight.medium,
      borderColor: p.highlight.medium,
    },
    disabled: {
      opacity: 0.5,
    },
  });
};
