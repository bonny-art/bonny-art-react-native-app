import { StyleSheet } from "react-native";
import { palette } from "@/constants/palette";
import { DOT_SPACING } from "./constants";

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
      height: 6,
      width: 6,
      borderRadius: 3,
      backgroundColor: p.neutral.light.dark,
      opacity: 0.28,
    },
    dotActive: {
      opacity: 1,
      backgroundColor: p.highlight.medium,
    },
  });
};
