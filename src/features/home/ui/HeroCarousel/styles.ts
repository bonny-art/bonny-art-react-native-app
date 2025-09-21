import { palette } from "@shared/lib/palette";
import { StyleSheet } from "react-native";
import { DOT_BOTTOM, DOT_SIZE, DOT_SPACING } from "./constants";

/**
 * Creates responsive styles for the hero carousel frame and indicators.
 */
export const makeStyles = (
  scheme: keyof typeof palette,
  pageWidth: number,
  frameHeight: number
) => {
  const p = palette[scheme];
  return StyleSheet.create({
    root: {
      backgroundColor: p.neutral.dark.darkest,
    },
    frame: {
      width: pageWidth,
      height: frameHeight,
    },
    slide: {
      width: pageWidth,
      height: frameHeight,
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
      bottom: DOT_BOTTOM,
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
