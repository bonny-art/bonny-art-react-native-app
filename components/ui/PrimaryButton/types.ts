import { GestureResponderEvent, TextStyle, ViewStyle } from "react-native";

export type Size = "sm" | "md" | "lg";
export type Variant = "solid" | "outline"; // ⬅️ нове

export type PrimaryButtonProps = {
  title: string;
  onPress?: (e: GestureResponderEvent) => void;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  size?: Size;
  /** "solid" за замовчуванням */
  variant?: Variant; // ⬅️ нове
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
};
