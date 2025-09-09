import { useColorScheme } from "@shared/hooks/useColorScheme";
import { palette } from "@shared/lib/palette";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { makeStyles } from "./styles";
import type { PrimaryButtonProps } from "./types";

export function PrimaryButton(props: PrimaryButtonProps) {
  const {
    title,
    onPress,
    loading = false,
    disabled = false,
    fullWidth = false,
    leftIcon,
    size = "md",
    variant = "solid",
    style,
    textStyle,
    testID,
  } = props;

  const scheme = (useColorScheme() ?? "light") as keyof typeof palette;
  const p = palette[scheme];
  const styles = makeStyles(scheme, size, fullWidth);

  // Кольори під варіант
  const isOutline = variant === "outline";
  const accent = p.highlight.medium;

  const dynamicContainerStyle = isOutline
    ? { backgroundColor: "transparent", borderColor: accent }
    : { backgroundColor: accent, borderColor: accent };

  // Disabled (поверх базових)
  const disabledContainerStyle =
    disabled || loading
      ? isOutline
        ? { borderColor: p.highlight.light }
        : {
            backgroundColor: p.highlight.lightest,
            borderColor: p.highlight.lightest,
          }
      : null;

  // Текст/спінер
  const labelColor = isOutline ? accent : p.neutral.dark.darkest;
  const spinnerColor = labelColor;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      testID={testID}
      style={[
        styles.container,
        dynamicContainerStyle,
        disabledContainerStyle,
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      {leftIcon ? <View>{leftIcon}</View> : null}

      <Text style={[styles.label, { color: labelColor }, textStyle]}>
        {title}
      </Text>

      {loading ? (
        <ActivityIndicator
          style={{ marginLeft: 6 }}
          size="small"
          color={spinnerColor}
        />
      ) : null}
    </TouchableOpacity>
  );
}
