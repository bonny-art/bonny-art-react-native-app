import { useCallback } from "react";
import { Pressable, View } from "react-native";

import { useTheme } from "@/providers/theme/ThemeContext";
import { palette } from "@shared/lib/palette";
import { IconSymbol } from "@shared/ui/IconSymbol";

import type { CheckboxProps } from "./types";
import { CHECKBOX_HIT_SLOP, CHECKBOX_SIZE } from "./constants";
import { makeStyles } from "./styles";

/**
 * Presents a theme-aware checkbox with optional disabled state and callbacks.
 */
export function Checkbox(props: CheckboxProps) {
  const { checked, onChange, disabled = false, size = "md", style } = props;

  const { currentTheme } = useTheme();
  const scheme = currentTheme as keyof typeof palette;
  const styles = makeStyles(scheme);
  const p = palette[scheme];

  const dimension = CHECKBOX_SIZE[size] ?? CHECKBOX_SIZE.md;
  const radius = Math.max(4, Math.round(dimension * 0.25));
  const iconSize = Math.round(dimension * 0.6);

  const handlePress = useCallback(() => {
    if (disabled) return;
    onChange?.(!checked);
  }, [checked, disabled, onChange]);

  return (
    <Pressable
      onPress={handlePress}
      hitSlop={CHECKBOX_HIT_SLOP}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      disabled={disabled}
      style={style}
    >
      <View
        style={[
          styles.box,
          {
            width: dimension,
            height: dimension,
            borderRadius: radius,
          },
          checked && styles.checked,
          disabled && styles.disabled,
        ]}
      >
        {checked ? (
          <IconSymbol
            name="check"
            size={iconSize}
            color={p.neutral.dark.darkest}
          />
        ) : null}
      </View>
    </Pressable>
  );
}
