import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";
import type { IconName } from "@shared/ui/IconSymbol";

export type IconButtonVariant = "solid" | "outline" | "ghost";
export type IconButtonSize = "sm" | "md" | "lg";

export type IconButtonProps = {
  icon?: IconName;
  label?: string | number;
  children?: ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  /**
   * Controls whether the button keeps the default padding around the icon.
   * When set to false the circular background hugs the icon more tightly.
   */
  padded?: boolean;
  selected?: boolean;
  disabled?: boolean;
  badgeCount?: number;
  onPress?: () => void;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};
