import type { StepState } from "@features/cart/ui/OrderStepper/types";

export type StepCircleProps = {
  index: number;
  state: StepState;
  label?: string;
  onPress?: () => void;
  compact?: boolean;
  withMargin?: boolean;
};
