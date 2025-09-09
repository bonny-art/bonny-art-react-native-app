import { IconName } from "@shared/ui/IconSymbol";
import React from "react";

export type FilterChipProps = {
  label: string;
  selected: boolean; // для variant="chip"
  onPress: () => void;
  disabled?: boolean;
  iconLeft?: IconName | React.ReactNode;
  counter?: number;
  // chip = вибірка (toggle), trigger = кнопка, що відкриває фільтри
  variant?: "chip" | "trigger";
  testID?: string;
  allowFontScaling?: boolean;
};
