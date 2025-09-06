export type StepState = "pending" | "active" | "done";

export type StepItem = {
  key: string;
  label?: string;
  state?: StepState;
};

export type OrderStepperProps = {
  steps: StepItem[] | string[];
  currentStep: number; // індекс активного кроку (0..n-1)
  onStepPress?: (index: number) => void;
  showLabels?: boolean;
  compact?: boolean;
  style?: any;
  testID?: string;
};

export type StepCircleProps = {
  index: number;
  state: StepState;
  label?: string;
  onPress?: () => void;
  compact?: boolean;
};

export type NormalizedStep = {
  key: string;
  label?: string;
  state: StepState;
};
