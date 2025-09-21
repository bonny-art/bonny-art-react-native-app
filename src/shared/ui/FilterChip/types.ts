import { IconName } from "@shared/ui/IconSymbol";
import React from "react";

export type FilterChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
  disabled?: boolean;
  iconLeft?: IconName | React.ReactNode;
  counter?: number;
  variant?: "chip" | "trigger";
  testID?: string;
  allowFontScaling?: boolean;
};
