export type StepState = "pending" | "active" | "done";

export type StepItem = {
  key?: string;
  label?: string;
  state?: StepState;
};

export type NormalizedStep = {
  key: string;
  label?: string;
  state: StepState;
};

export type OrderStepperProps = {
  steps: (StepItem | string)[];
  currentStep: number;
  onStepPress?: (index: number) => void;
  showLabels?: boolean;
  compact?: boolean;
  style?: any;
  testID?: string;
};
