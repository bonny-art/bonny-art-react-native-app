import { palette } from "@shared/lib/palette";
import { StyleSheet } from "react-native";
import { DOT_SIZE, DOT_SPACING } from "./constants";

export const makeStyles = (scheme: keyof typeof palette) => {
  const p = palette[scheme];
  return StyleSheet.create({
    root: {
      backgroundColor: p.neutral.dark.darkest,
    },
    image: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
    dotsWrapper: {
      position: "absolute",
      left: 0,
      right: 0,
      alignItems: "center",
      justifyContent: "center",
    },
    dotsRow: {
      flexDirection: "row",
      gap: DOT_SPACING,
    },
    dot: {
      height: DOT_SIZE,
      width: DOT_SIZE,
      borderRadius: DOT_SIZE / 2,
      backgroundColor: p.highlight.medium,
      opacity: 0.28,
    },
  });
};
