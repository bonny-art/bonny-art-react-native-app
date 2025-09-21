import React from "react";
import { TouchableOpacity, View } from "react-native";
import { IconSymbol } from "@/shared/ui/IconSymbol";
import { useTheme } from "@/providers/theme/ThemeContext";
import { Text } from "@shared/ui/Text";
import { HIT_SLOP, ICON } from "./constants";
import { computeColors, makeBaseStyles } from "./styles";
import type { IconButtonProps, ColorTone } from "./types";
import { palette } from "@shared/lib/palette";

/**
 * Resolves a tone token into an actual color value from the palette.
 */
function resolveToneColor(
  p: (typeof palette)[keyof typeof palette],
  tone?: ColorTone
) {
  if (tone == null) {
    return undefined;
  }

  if (tone === "text") {
    return p.neutral.light.light;
  }

  if (tone === "background") {
    return p.neutral.dark.dark;
  }

  if (tone === "highlight") {
    return p.highlight.medium;
  }

  return tone;
}

/**
 * Renders an icon-focused button that supports tones, badges, and accessibility labels.
 */
export function IconButton({
  icon,
  label,
  children,
  variant = "solid",
  size = "md",
  padded = true,
  selected = false,
  disabled = false,
  badgeCount,
  onPress,
  accessibilityLabel,
  style,
  testID,
  toneIcon,
  toneBg,
  toneBorder,
}: IconButtonProps) {
  const { currentTheme: scheme } = useTheme();
  const s = makeBaseStyles(scheme, size, padded);

  const colors = computeColors(scheme, { variant, selected, disabled });
  const iconSize = ICON[size];

  const p = palette[scheme];

  const overrideIconColor = resolveToneColor(p, toneIcon);
  const overrideBgColor = resolveToneColor(p, toneBg);
  const overrideBorderColor = resolveToneColor(p, toneBorder);

  let inner: React.ReactNode;
  if (children != null) {
    inner = children;
  } else if (label != null) {
    inner = (
      <Text
        style={[s.contentText, { color: overrideIconColor ?? colors.icon }]}
        numberOfLines={1}
      >
        {label}
      </Text>
    );
  } else {
    inner = (
      <IconSymbol
        name={icon!}
        size={iconSize}
        color={overrideIconColor ?? colors.icon}
      />
    );
  }

  const a11yLabel =
    accessibilityLabel ??
    (typeof label === "number" || typeof label === "string"
      ? String(label)
      : icon ?? "button");

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={a11yLabel}
      hitSlop={HIT_SLOP}
      style={[
        s.root,
        {
          backgroundColor: overrideBgColor ?? colors.bg,
          borderColor: overrideBorderColor ?? colors.borderColor,
          borderWidth: colors.borderWidth,
        },
        style,
      ]}
      testID={testID}
    >
      {inner}

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
