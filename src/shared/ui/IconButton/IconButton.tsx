import React from "react";
import { TouchableOpacity, View } from "react-native";
import { IconSymbol } from "@/shared/ui/IconSymbol";
import { useTheme } from "@/providers/theme/ThemeContext";
import { Text } from "@shared/ui/Text";
import { HIT_SLOP, ICON } from "./constants";
import { computeColors, makeBaseStyles } from "./styles";
import type { IconButtonProps, ColorTone } from "./types";
import { palette } from "@shared/lib/palette";

/** Перекладаємо умовний тон у конкретний колір з palette */
function resolveToneColor(
  p: (typeof palette)[keyof typeof palette],
  tone?: ColorTone
) {
  if (!tone) return undefined;
  switch (tone) {
    case "text":
      return p.neutral.light.lightest;
    case "background":
      return p.neutral.dark.darkest;
    case "highlight":
      return p.highlight.medium;
    default:
      return undefined;
  }
}

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

  // Базові кольори з теми/станів
  const colors = computeColors(scheme, { variant, selected, disabled });
  const iconSize = ICON[size];

  // Палітра теми
  const p = palette[scheme];

  // Перекриття кольорів через нові пропси, якщо задані
  const overrideIconColor = resolveToneColor(p, toneIcon);
  const overrideBgColor = resolveToneColor(p, toneBg);
  const overrideBorderColor = resolveToneColor(p, toneBorder);

  // Вміст усередині кнопки: пріоритет children > label > icon
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

  // ARIA/Accessibility за замовчуванням
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
