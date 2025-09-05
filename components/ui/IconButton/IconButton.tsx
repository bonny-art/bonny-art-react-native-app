import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { palette } from "@/constants/palette";
import { IconSymbol } from "@/components/ui/IconSymbol";

import { makeBaseStyles, computeColors } from "./styles";
import { ICON, HIT_SLOP } from "./constants";
import type { IconButtonProps } from "./types";

export default function IconButton({
  icon,
  variant = "solid",
  size = "md",
  selected = false,
  disabled = false,
  badgeCount,
  onPress,
  accessibilityLabel,
  style,
  testID,
}: IconButtonProps) {
  const scheme = (useColorScheme() ?? "light") as keyof typeof palette;
  const s = makeBaseStyles(scheme, size);
  const colors = computeColors(scheme, { variant, selected, disabled });

  const iconSize = ICON[size];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? icon}
      hitSlop={HIT_SLOP}
      style={[
        s.root,
        {
          backgroundColor: colors.bg,
          borderColor: colors.borderColor,
          borderWidth: colors.borderWidth,
        },
        style,
      ]}
      testID={testID}
    >
      <IconSymbol name={icon} size={iconSize} color={colors.icon} />

      {typeof badgeCount === "number" && badgeCount > 0 && (
        <View style={s.badge}>
          <Text style={s.badgeText} numberOfLines={1}>
            {badgeCount > 99 ? "99+" : String(badgeCount)}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
