import { useTheme } from "@/providers/theme/ThemeContext";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { Text } from "@shared/ui/Text";
import { makeStyles } from "./styles";
import type { PrimaryButtonProps } from "./types";

/**
 * Provides a versatile primary button with loading and variant support.
 */
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
    accessibilityLabel,
  } = props;

  const { currentTheme: scheme } = useTheme();

  const styles = makeStyles(
    scheme,
    size,
    fullWidth,
    variant,
    disabled,
    loading
  );

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      testID={testID}
      style={[
        styles.container,
        styles.containerVariant,
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      {leftIcon ? <View>{leftIcon}</View> : null}

      <Text style={[styles.label, textStyle]}>{title}</Text>

      {loading ? (
        <ActivityIndicator
          style={styles.spinner}
          size="small"
          color={styles.labelColor}
        />
      ) : null}
    </TouchableOpacity>
  );
}
