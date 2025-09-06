import React, { memo } from "react";
import { Pressable, Text, View } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { palette } from "@/constants/palette";
import { mscale, font } from "@/constants/responsive";
import { IconSymbol } from "@/components/ui/IconSymbol";
import type { IconName } from "@/components/ui/IconSymbol";
import { styles as S } from "./styles";
import type { FilterChipProps } from "./types";

const FilterChip: React.FC<FilterChipProps> = ({
  label,
  selected,
  onPress,
  disabled = false,
  iconLeft,
  counter,
  variant = "chip",
  testID,
  allowFontScaling = true,
}) => {
  const scheme = (useColorScheme() ?? "light") as keyof typeof palette;
  const p = palette[scheme];

  const isTrigger = variant === "trigger";
  const hasActiveCounter = (counter ?? 0) > 0;

  const colors = {
    // chip (tag)
    chipIdleBg:
      scheme === "dark" ? p.neutral.dark.lightest : p.neutral.light.medium,
    chipIdleText:
      scheme === "dark" ? p.neutral.light.darkest : p.neutral.dark.darkest,
    chipActiveBg: p.highlight.medium,
    chipActiveText: p.neutral.dark.darkest,

    // trigger (outline)
    triggerBorder:
      scheme === "dark" ? p.neutral.dark.lightest : p.neutral.light.medium,
    triggerTextIdle:
      scheme === "dark" ? p.neutral.light.darkest : p.neutral.light.medium,
    triggerTextActive: p.highlight.medium,

    // badge
    counterBg:
      scheme === "dark" ? p.neutral.dark.light : p.neutral.light.medium,
    counterText:
      scheme === "dark" ? p.neutral.light.lightest : p.neutral.dark.darkest,
  };

  // контейнер
  const baseContainerStyle = isTrigger ? S.triggerContainer : S.chipContainer;

  const variantStyle = isTrigger
    ? {
        backgroundColor: "transparent",
        borderColor: hasActiveCounter
          ? colors.triggerTextActive
          : colors.triggerBorder,
      }
    : selected
    ? { backgroundColor: colors.chipActiveBg }
    : { backgroundColor: colors.chipIdleBg };

  const containerStyle = [
    baseContainerStyle,
    variantStyle,
    disabled && { opacity: 0.5 },
  ];

  // текст
  const labelColor = isTrigger
    ? hasActiveCounter
      ? colors.triggerTextActive
      : colors.triggerTextIdle
    : selected
    ? colors.chipActiveText
    : colors.chipIdleText;

  const labelStyle = [S.label, { color: labelColor, fontSize: font(12) }];

  // type guard
  const isIconName = (v: FilterChipProps["iconLeft"]): v is IconName =>
    typeof v === "string";

  const renderLeftIcon = () => {
    if (!iconLeft) return null;

    const color = labelColor;

    if (isIconName(iconLeft)) {
      return (
        <View style={S.leftIconWrap}>
          <IconSymbol
            name={iconLeft}
            size={mscale(16)}
            color={color}
            accessibilityLabel={`${label} icon`}
          />
        </View>
      );
    }
    return <View style={S.leftIconWrap}>{iconLeft}</View>;
  };

  const renderCounter = () =>
    typeof counter === "number" ? (
      <View
        style={[
          S.counter,
          {
            backgroundColor: isTrigger
              ? colors.counterBg
              : selected
              ? colors.chipActiveText
              : colors.counterBg,
          },
        ]}
      >
        <Text
          allowFontScaling={allowFontScaling}
          style={[
            S.counterText,
            {
              color: isTrigger
                ? colors.counterText
                : selected
                ? colors.chipActiveBg
                : colors.counterText,
            },
          ]}
        >
          {counter}
        </Text>
      </View>
    ) : null;

  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{ selected: !isTrigger && selected, disabled }}
      accessibilityLabel={label}
      hitSlop={8}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        containerStyle,
        { opacity: pressed ? 0.9 : disabled ? 0.5 : 1 },
      ]}
    >
      {renderLeftIcon()}
      <Text
        allowFontScaling={allowFontScaling}
        numberOfLines={1}
        style={labelStyle}
      >
        {label}
      </Text>
      {renderCounter()}
    </Pressable>
  );
};

export default memo(FilterChip);
