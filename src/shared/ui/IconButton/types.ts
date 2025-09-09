import { StyleProp, ViewStyle } from "react-native";
import type { IconName } from "@shared/ui/IconSymbol";

export type IconButtonVariant = "solid" | "outline" | "ghost";
export type IconButtonSize = "sm" | "md" | "lg";

export type IconButtonProps = {
  icon: IconName;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  selected?: boolean;
  disabled?: boolean;
  badgeCount?: number;
  onPress?: () => void;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};
