import { TouchableOpacity, View } from "react-native";
import { Text } from "@shared/ui/Text";
import { useTheme } from "@/providers/theme/ThemeContext";
import {
  makeStepperStyles,
  dotStateStyles,
} from "@features/cart/ui/OrderStepper/styles";
import { makeStepCircleStyles } from "./styles";
import type { StepCircleProps } from "./types";

export function StepCircle({
  index,
  state,
  label,
  onPress,
  compact,
  withMargin = true,
}: StepCircleProps) {
  const { currentTheme: scheme } = useTheme();

  // загальні стилі степпера
  const stepperS = makeStepperStyles(scheme, compact);
  const stateS = dotStateStyles(scheme);
  const styles = makeStepCircleStyles(scheme, compact);

  const dotStyle =
    state === "active"
      ? stateS.activeDot
      : state === "done"
      ? stateS.doneDot
      : stateS.pendingDot;

  const textStyle =
    state === "active"
      ? stateS.activeText
      : state === "done"
      ? stateS.doneText
      : stateS.pendingText;

  const content = state === "done" ? "✓" : String(index + 1);

  const Dot = (
    <View style={[stepperS.dotBase, dotStyle]}>
      <Text style={[stepperS.dotText, textStyle]}>{content}</Text>
    </View>
  );

  return (
    <View style={[{ alignItems: "center" }, withMargin ? styles.root : null]}>
      {onPress ? (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
          {Dot}
        </TouchableOpacity>
      ) : (
        Dot
      )}
      {label ? (
        <Text style={[styles.label]} numberOfLines={2}>
          {label}
        </Text>
      ) : null}
    </View>
  );
}
