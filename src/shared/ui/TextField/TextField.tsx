import { forwardRef, useCallback, useMemo, useState } from "react";
import {
  Pressable,
  TextInput,
  View,
  type NativeSyntheticEvent,
  type TextInputFocusEventData,
} from "react-native";

import { useTheme } from "@/providers/theme/ThemeContext";
import { palette } from "@shared/lib/palette";
import { Text } from "@shared/ui/Text";
import { IconSymbol } from "@shared/ui/IconSymbol";

import type { TextFieldProps } from "./types";
import { makeStyles } from "./styles";
import { TOGGLE_HIT_SLOP, TOGGLE_ICON_SIZE } from "./constants";

export const TextField = forwardRef<TextInput, TextFieldProps>((props, ref) => {
  const {
    label,
    error,
    touched,
    containerStyle,
    inputStyle,
    helperText,
    isPassword = false,
    onFocus,
    onBlur,
    style: textStyle,
    placeholderTextColor,
    editable,
    secureTextEntry,
    ...inputProps
  } = props;

  const { currentTheme } = useTheme();
  const scheme = currentTheme as keyof typeof palette;
  const styles = makeStyles(scheme);
  const p = palette[scheme];

  const [isFocused, setIsFocused] = useState(false);
  const [isSecureVisible, setIsSecureVisible] = useState(!isPassword);

  const disabled = editable === false;

  const showError = Boolean(error) && Boolean(touched);
  const showHelper = Boolean(helperText) && !showError;

  const placeholderColor = placeholderTextColor ?? p.neutral.light.darkest;

  const handleFocus = useCallback(
    (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(true);
      onFocus?.(event);
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false);
      onBlur?.(event);
    },
    [onBlur]
  );

  const secureEntry = useMemo(() => {
    if (isPassword) {
      return !isSecureVisible;
    }
    return Boolean(secureTextEntry);
  }, [isPassword, isSecureVisible, secureTextEntry]);

  const toggleSecure = useCallback(() => {
    setIsSecureVisible((prev) => !prev);
  }, []);

  const wrapperStyles = useMemo(
    () => [
      styles.inputWrapper,
      isFocused && styles.focused,
      showError && styles.errorBorder,
      disabled && styles.disabled,
    ],
    [disabled, isFocused, showError, styles]
  );

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}{" "}
      <View
        style={[styles.fieldWrapper, showError && styles.fieldWrapperError]}
      >
        <View style={wrapperStyles}>
          <TextInput
            ref={ref}
            style={[styles.input, textStyle, inputStyle]}
            placeholderTextColor={placeholderColor}
            onFocus={handleFocus}
            onBlur={handleBlur}
            editable={!disabled}
            secureTextEntry={secureEntry}
            {...inputProps}
          />
          {isPassword ? (
            <Pressable
              onPress={toggleSecure}
              hitSlop={TOGGLE_HIT_SLOP}
              style={styles.toggle}
              accessibilityRole="button"
              accessibilityLabel={
                isSecureVisible ? "Hide password" : "Show password"
              }
            >
              <IconSymbol
                name={isSecureVisible ? "eye-off" : "eye"}
                color={p.neutral.light.lightest}
                size={TOGGLE_ICON_SIZE}
              />
            </Pressable>
          ) : null}
        </View>
        {showError ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
      {showHelper ? <Text style={styles.helperText}>{helperText}</Text> : null}
    </View>
  );
});

TextField.displayName = "TextField";
