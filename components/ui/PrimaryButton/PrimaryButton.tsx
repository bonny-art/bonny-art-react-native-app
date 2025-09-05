import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { palette } from "@/constants/palette";
import { makeStyles } from "./styles";
import type { PrimaryButtonProps } from "./types";

export default function PrimaryButton(props: PrimaryButtonProps) {
  const {
    title,
    onPress,
    loading = false,
    disabled = false,
    fullWidth = false,
    leftIcon,
    size = "md",
    style,
    textStyle,
    testID,
  } = props;

  const scheme = (useColorScheme() ?? "light") as keyof typeof palette;
  const styles = makeStyles(scheme, size, fullWidth);
  const labelColor = palette[scheme].neutral.dark.lightest;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      testID={testID}
      style={[
        styles.container,
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      {leftIcon ? <View>{leftIcon}</View> : null}
      <Text style={[styles.label, textStyle]}>{title}</Text>
      {loading ? (
        <ActivityIndicator
          style={{ marginLeft: 6 }}
          size="small"
          color={labelColor}
        />
      ) : null}
    </TouchableOpacity>
  );
}
