import { palette } from "@shared/lib/palette";
import { StyleSheet } from "react-native";

export const makeStyles = (scheme: keyof typeof palette) => {
  const p = palette[scheme];
  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: p.neutral.dark.darkest,
    },
    container: {
      flex: 1,
    },
    footer: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: p.neutral.dark.darkest,
    },
  });
};
