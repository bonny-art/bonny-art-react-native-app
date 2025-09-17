import type { StyleProp, ViewStyle } from "react-native";

import type { CHECKBOX_SIZE } from "./constants";

export type CheckboxSize = keyof typeof CHECKBOX_SIZE;

export type CheckboxProps = {
  checked: boolean;
  onChange?: (next: boolean) => void;
  disabled?: boolean;
  size?: CheckboxSize;
  style?: StyleProp<ViewStyle>;
};
