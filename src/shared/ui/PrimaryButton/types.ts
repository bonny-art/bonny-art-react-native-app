import React from "react";
import { GestureResponderEvent, TextStyle, ViewStyle } from "react-native";

export type Size = "sm" | "md" | "lg";
export type Variant = "solid" | "outline";

export type PrimaryButtonProps = {
  title: string;
  onPress?: (e: GestureResponderEvent) => void;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  size?: Size;
  variant?: Variant;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
};
