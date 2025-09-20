import { forwardRef, type ComponentRef } from "react";
import { StyleSheet, Text as RNText, type TextProps } from "react-native";
import { typography } from "@/shared/lib/tokens";

const styles = StyleSheet.create({
  base: { fontFamily: typography.body.m.fontFamily },
});

export const Text = forwardRef<ComponentRef<typeof RNText>, TextProps>(
  ({ style, ...rest }, ref) => (
    <RNText ref={ref} style={[styles.base, style]} {...rest} />
  )
);

Text.displayName = "Text";
