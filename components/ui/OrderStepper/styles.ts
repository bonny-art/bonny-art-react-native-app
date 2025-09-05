// components/ui/OrderStepper/styles.ts
import { StyleSheet, Platform, TextStyle, ViewStyle } from "react-native";
import { palette } from "@/constants/palette";
import { DOT_DIAMETER, LINE_THICKNESS, H_GAP } from "./constants";
import { typography } from "@/constants/tokens";

type ThemeName = keyof typeof palette;

export type StepperStyles = {
  container: ViewStyle;
  row: ViewStyle;
  labelsRow: ViewStyle;
  stepBox: ViewStyle; // ⬅️ нове
  labelBox: ViewStyle; // ⬅️ нове
  dotBase: ViewStyle;
  dotText: TextStyle;
  label: TextStyle;
  lineBase: ViewStyle;
};

export function makeStepperStyles(
  theme: ThemeName,
  compact?: boolean
): StepperStyles {
  const p = palette[theme];
  const diameter = compact ? DOT_DIAMETER.compact : DOT_DIAMETER.normal;

  const fixedWidth = diameter + H_GAP * 2;

  return StyleSheet.create({
    container: { alignSelf: "stretch" },

    row: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
    },

    labelsRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      width: "100%",
      marginTop: 6,
    },

    stepBox: {
      width: fixedWidth, // ⬅️ однакова ширина під кожен кружечок
      alignItems: "center",
      paddingHorizontal: H_GAP, // відступи сюди
    },

    labelBox: {
      width: fixedWidth, // ⬅️ те саме для підписів (щоб бути чітко під кружком)
      alignItems: "center",
    },

    dotBase: {
      width: diameter,
      height: diameter,
      borderRadius: diameter / 2,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: p.neutral.light.dark,
      backgroundColor: p.neutral.light.medium,
      ...Platform.select({
        android: { elevation: 1 },
        ios: {
          shadowColor: "#000",
          shadowOpacity: 0.06,
          shadowRadius: 3,
          shadowOffset: { width: 0, height: 2 },
        },
        default: {},
      }),
    },

    dotText: {
      ...typography.action.m,
      color: p.neutral.dark.lightest,
    },

    label: {
      ...typography.caption.m,
      color: p.neutral.dark.lightest,
      textAlign: "center",
    },

    lineBase: {
      height: LINE_THICKNESS,
      flex: 1,
      borderRadius: LINE_THICKNESS / 2,
      backgroundColor: p.neutral.light.dark,
      minWidth: 8,
    },
  });
}

export function dotStateStyles(theme: ThemeName) {
  const p = palette[theme];
  const pendingLineColor =
    theme === "dark" ? p.neutral.light.darkest : p.neutral.light.dark;

  return StyleSheet.create({
    pendingDot: {
      backgroundColor: p.neutral.light.medium,
      borderColor: p.neutral.light.dark,
      opacity: 0.9,
    },
    activeDot: {
      backgroundColor: p.highlight.medium,
      borderColor: p.highlight.medium,
    },
    doneDot: {
      backgroundColor: p.highlight.medium,
      borderColor: p.highlight.dark,
    },
    pendingText: { opacity: 0.6 },
    activeText: { opacity: 1 },
    doneText: { opacity: 1 },
    doneLine: { backgroundColor: p.highlight.medium },
    activeLine: { backgroundColor: p.highlight.medium },
    pendingLine: { backgroundColor: pendingLineColor },
  });
}
