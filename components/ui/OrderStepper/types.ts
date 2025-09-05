export type StepState = "pending" | "active" | "done";

export type StepItem = {
  key: string;
  label?: string; // короткий підпис під кружечком (опційно)
  state?: StepState; // якщо не задавати — визначиться автоматично за currentStep
};

export type OrderStepperProps = {
  steps: StepItem[] | string[]; // простий варіант: ['Cart','Address','Payment',...]
  currentStep: number; // індекс активного кроку (0..n-1)
  onStepPress?: (index: number) => void; // зробити крок клікабельним (опційно)
  showLabels?: boolean; // показувати підписи під кружечками
  compact?: boolean; // трохи менші кружечки/відступи
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
  label?: string; // ⬅️ тепер опційна
  state: StepState;
};
