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

  toneIcon?: ColorTone;
  toneBg?: ColorTone;
  toneBorder?: ColorTone;
};
