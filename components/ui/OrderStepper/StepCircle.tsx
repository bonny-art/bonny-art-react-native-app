// components/ui/OrderStepper/StepCircle.tsx
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { palette } from "@/constants/palette";
import { dotStateStyles, makeStepperStyles } from "./styles";
import type { StepCircleProps } from "./types";
import { H_GAP } from "./constants";

export default function StepCircle({
  index,
  state,
  label,
  onPress,
  compact,
  // ⬇️ нове
  withMargin = true,
}: StepCircleProps & { withMargin?: boolean }) {
  const scheme = (useColorScheme() ?? "light") as keyof typeof palette;
  const styles = makeStepperStyles(scheme, compact);
  const stateS = dotStateStyles(scheme);

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

  const wrapperStyle = withMargin ? { marginHorizontal: H_GAP } : null;

  const Dot = (
    <View style={[styles.dotBase, dotStyle]}>
      <Text style={[styles.dotText, textStyle]}>{content}</Text>
    </View>
  );

  return (
    <View style={[{ alignItems: "center" }, wrapperStyle]}>
      {onPress ? (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
          {Dot}
        </TouchableOpacity>
      ) : (
        Dot
      )}
      {label ? (
        <Text style={styles.label} numberOfLines={2}>
          {label}
        </Text>
      ) : null}
    </View>
  );
}
