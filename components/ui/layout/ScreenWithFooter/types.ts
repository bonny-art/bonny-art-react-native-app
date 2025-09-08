import { PropsWithChildren } from "react";
import { StyleProp, ViewStyle, TextStyle } from "react-native";

export type FooterBtn = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  variant?: "solid" | "outline";
  size?: "sm" | "md" | "lg";
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export type ScreenWithFooterProps = PropsWithChildren<{
  scroll?: boolean;
  contentPadding?: number;
  footer: FooterBtn;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  footerStyle?: StyleProp<ViewStyle>;
  testID?: string;
}>;
