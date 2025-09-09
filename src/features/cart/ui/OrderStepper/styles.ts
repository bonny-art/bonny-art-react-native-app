import { StyleSheet } from "react-native";
import { palette } from "@shared/lib/palette";
import {
  DOT_SIZE,
  DOT_SIZE_COMPACT,
  LABEL_FONT_SIZE,
  LINE_THICKNESS,
  ROW_GAP_V,
  LABEL_ROW_GAP_V,
  STEP_BOX_MIN_W,
} from "./constants";

export const makeStepperStyles = (
  scheme: keyof typeof palette,
  compact?: boolean
) => {
  const p = palette[scheme];

  const DOT = compact ? DOT_SIZE_COMPACT : DOT_SIZE;

  return StyleSheet.create({
    container: {
      width: "100%",
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginVertical: ROW_GAP_V,
    },
    labelsRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginTop: LABEL_ROW_GAP_V,
    },
    stepBox: {
      minWidth: STEP_BOX_MIN_W,
      alignItems: "center",
    },
    lineBase: {
      height: LINE_THICKNESS,
      flex: 1,
      borderRadius: LINE_THICKNESS,
    },
    labelBox: {
      minWidth: STEP_BOX_MIN_W,
      alignItems: "center",
    },
    label: {
      textAlign: "center",
      fontSize: LABEL_FONT_SIZE,
      color: p.neutral.dark.medium,
    },

    dotBase: {
      width: DOT,
      height: DOT,
      borderRadius: DOT / 2,
      alignItems: "center",
      justifyContent: "center",
    },
    dotText: {
      fontWeight: "600",
    },
  });
};

export const dotStateStyles = (scheme: keyof typeof palette) => {
  const p = palette[scheme];

  return StyleSheet.create({
    activeDot: {
      backgroundColor: p.highlight.medium,
    },
    doneDot: {
      backgroundColor: p.highlight.dark,
    },
    pendingDot: {
      backgroundColor: p.neutral.light.darkest,
    },

    activeText: {
      color: p.highlight.lightest,
    },
    doneText: {
      color: p.highlight.lightest,
    },
    pendingText: {
      color: p.neutral.dark.darkest,
    },

    activeLine: {
      backgroundColor: p.highlight.medium,
    },
    doneLine: {
      backgroundColor: p.highlight.dark,
    },
    pendingLine: {
      backgroundColor: p.neutral.light.darkest,
    },
  });
};
