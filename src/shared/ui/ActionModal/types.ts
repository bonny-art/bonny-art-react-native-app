import type { Variant } from "@/shared/ui/PrimaryButton/types";

export type ActionModalAction = {
  label: string;
  onPress: () => void;
  variant?: Variant;
  testID?: string;
  accessibilityLabel?: string;
};

export type ActionModalProps = {
  visible: boolean;
  title?: string;
  message?: string;
  confirmAction: ActionModalAction;
  cancelAction?: ActionModalAction;
  onRequestClose?: () => void;
  dismissAccessibilityLabel?: string;
  testID?: string;
};
