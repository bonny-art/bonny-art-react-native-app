// components/ui/OrderStepper/styles.ts
import { StyleSheet, TextStyle, ViewStyle } from "react-native";
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
      borderColor: p.neutral.light.darkest,
      backgroundColor: p.neutral.dark.lightest,
    },

    dotText: {
      ...typography.action.m,
    },

    label: {
      ...typography.caption.m,
      color: p.neutral.light.lightest,
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
      backgroundColor: p.neutral.dark.darkest,
      borderColor: p.neutral.light.light,
    },
    activeDot: {
      backgroundColor: p.highlight.medium,
      borderColor: p.highlight.medium,
    },
    doneDot: {
      backgroundColor: p.highlight.medium,
      borderColor: p.highlight.dark,
    },

    // ⬇️ Замість opacity — конкретні кольори
    pendingText: { color: p.neutral.light.lightest },
    activeText: { color: p.neutral.dark.darkest },
    doneText: { color: p.neutral.dark.darkest },

    // лінії між кроками
    doneLine: { backgroundColor: p.highlight.medium },
    activeLine: { backgroundColor: p.highlight.medium },
    pendingLine: { backgroundColor: pendingLineColor },
  });
}
