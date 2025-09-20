import { forwardRef, type ComponentRef } from "react";
import { Text as RNText, type TextProps } from "react-native";

import { styles } from "./styles";

export const Text = forwardRef<ComponentRef<typeof RNText>, TextProps>(
  ({ style, ...rest }, ref) => (
    <RNText ref={ref} style={[styles.base, style]} {...rest} />
  )
);

Text.displayName = "Text";
