import { IconSymbol } from "@/shared/ui/IconSymbol";
import { useTheme } from "@/providers/theme/ThemeContext";
import { TouchableOpacity, View } from "react-native";
import { Text } from "@shared/ui/Text";
import { HIT_SLOP, ICON } from "./constants";
import { computeColors, makeBaseStyles } from "./styles";
import type { IconButtonProps } from "./types";

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
}: IconButtonProps) {
  const { currentTheme: scheme } = useTheme();
  const s = makeBaseStyles(scheme, size, padded);
  const colors = computeColors(scheme, { variant, selected, disabled });
  const iconSize = ICON[size];

  // Вміст усередині кнопки: пріоритет children > label > icon
  let inner: React.ReactNode;
  if (children != null) {
    inner = children;
  } else if (label != null) {
    inner = (
      <Text style={[s.contentText, { color: colors.icon }]} numberOfLines={1}>
        {label}
      </Text>
    );
  } else {
    inner = <IconSymbol name={icon!} size={iconSize} color={colors.icon} />;
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
          backgroundColor: colors.bg,
          borderColor: colors.borderColor,
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
