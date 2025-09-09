import { IconSymbol } from "@/shared/ui/IconSymbol";
import { useColorScheme } from "@shared/hooks/useColorScheme";
import { palette } from "@shared/lib/palette";
import { Text, TouchableOpacity, View } from "react-native";

import { HIT_SLOP, ICON } from "./constants";
import { computeColors, makeBaseStyles } from "./styles";
import type { IconButtonProps } from "./types";

export function IconButton({
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
