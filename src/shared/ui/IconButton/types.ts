import { ReactNode } from "react";
import { ColorValue, StyleProp, ViewStyle } from "react-native";
import type { IconName } from "@shared/ui/IconSymbol";

export type IconButtonVariant = "solid" | "outline" | "ghost";
export type IconButtonSize = "sm" | "md" | "lg";

/**
 * Додатковий вибір тону для іконки та фону.
 * - 'text'       -> p.neutral.light.lightest
 * - 'background' -> p.neutral.dark.darkest
 * - 'highlight'  -> p.highlight.medium
 */
export type ColorTone = "text" | "background" | "highlight" | ColorValue;

export type IconButtonProps = {
  icon?: IconName;
  label?: string | number;
  children?: ReactNode;

  variant?: IconButtonVariant;
  size?: IconButtonSize;
  padded?: boolean;

  selected?: boolean;
  disabled?: boolean;

  badgeCount?: number;

  onPress?: () => void;

  accessibilityLabel?: string;

  style?: StyleProp<ViewStyle>;

  testID?: string;

  toneIcon?: ColorTone;
  toneBg?: ColorTone;
  toneBorder?: ColorTone;
};
