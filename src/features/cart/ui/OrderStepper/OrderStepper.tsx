import { Fragment } from "react";
import { View } from "react-native";
import { Text } from "@shared/ui/Text";
import { useTheme } from "@/providers/theme/ThemeContext";
import { StepCircle } from "@features/cart/ui/StepCircle";
import { dotStateStyles, makeStepperStyles } from "./styles";
import type {
  NormalizedStep,
  OrderStepperProps,
  StepItem,
  StepState,
} from "./types";

export function OrderStepper({
  steps,
  currentStep,
  onStepPress,
  showLabels = true,
  compact = false,
  style,
  testID,
}: OrderStepperProps) {
  const { currentTheme: scheme } = useTheme();
  const styles = makeStepperStyles(scheme, compact);
  const stateS = dotStateStyles(scheme);

  const normalize = (s: StepItem | string, idx: number): NormalizedStep => {
    const item = typeof s === "string" ? { key: s, label: s } : s;
    let state: StepState = "pending";
    if (typeof item.state === "string") state = item.state;
    else if (idx < currentStep) state = "done";
    else if (idx === currentStep) state = "active";

    const label = showLabels ? item.label : undefined;
    return { key: item.key ?? `step-${idx}`, label, state };
  };

  const items = (steps as (StepItem | string)[]).map(normalize);

  return (
    <View style={[styles.container, style]} testID={testID}>
      {/* верхній ряд: кружечки + лінії */}
      <View style={styles.row}>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          const lineStyle =
            item.state === "done"
              ? stateS.doneLine
              : item.state === "active"
              ? stateS.activeLine
              : stateS.pendingLine;

          return (
            <Fragment key={item.key}>
              <View style={styles.stepBox}>
                <StepCircle
                  index={idx}
                  state={item.state}
                  label={undefined}
                  compact={compact}
                  withMargin={false}
                  onPress={onStepPress ? () => onStepPress(idx) : undefined}
                />
              </View>
              {!isLast && <View style={[styles.lineBase, lineStyle]} />}
            </Fragment>
          );
        })}
      </View>

      {/* нижній ряд: підписи з такими ж «осередками» + спейсери між ними */}
      {showLabels && (
        <View style={styles.labelsRow}>
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <Fragment key={`label-${item.key}`}>
                <View style={styles.labelBox}>
                  {!!item.label && (
                    <Text style={styles.label} numberOfLines={2}>
                      {item.label}
                    </Text>
                  )}
                </View>
                {!isLast && <View style={{ flex: 1 }} />}
              </Fragment>
            );
          })}
        </View>
      )}
    </View>
  );
}
