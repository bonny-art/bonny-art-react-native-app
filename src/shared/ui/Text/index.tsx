import { forwardRef, type ComponentRef } from "react";
import { Text as RNText, type TextProps } from "react-native";
import { typography } from "@/shared/lib/tokens";

export const Text = forwardRef<ComponentRef<typeof RNText>, TextProps>(
  ({ style, ...rest }, ref) => (
    <RNText
      ref={ref}
      style={[{ fontFamily: typography.body.m.fontFamily }, style]}
      {...rest}
    />
  )
);

Text.displayName = "Text";
