import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { FilterChip } from "@/shared/ui/FilterChip";
import { PrimaryButton } from "@/shared/ui/PrimaryButton";
import { clearFilters, setFilters, type RangeValue } from "@/store/filterSlice";
import type { AppDispatch, RootState } from "@/store";
import { Text } from "@shared/ui/Text";
import { useTheme } from "@/providers/theme/ThemeContext";
import { palette } from "@shared/lib/palette";
import { Section } from "./Section";

import { COLOR_OPTIONS, SIZE_OPTIONS, BLEND_OPTIONS } from "./constants";
import { styles as S } from "./styles";

export function FilterModal() {
  const { categoryId = "" } = useLocalSearchParams<{ categoryId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { currentTheme: scheme } = useTheme();
  const colors = palette[scheme];

  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = withTiming(1, { duration: 300 });
  }, [progress]);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: (1 - progress.value) * 20 }],
  }));
  const handleClose = () => {
    progress.value = withTiming(0, { duration: 300 }, (finished) => {
      if (finished) runOnJS(router.back)();
    });
  };

  const existing = useSelector(
    (s: RootState) => s.filters.byCategory[categoryId] || {}
  ) as {
    colors?: RangeValue[];
    size?: RangeValue[];
    blends?: ("pure" | "mixed")[];
  };

  const normalize = <T,>(v: T[] | undefined): T[] =>
    Array.isArray(v) ? v : [];

  const [selectedColors, setSelectedColors] = useState<RangeValue[]>(
    normalize(existing.colors)
  );
  const [selectedSizes, setSelectedSizes] = useState<RangeValue[]>(
    normalize(existing.size)
  );
  const [selectedBlends, setSelectedBlends] = useState<("pure" | "mixed")[]>(
    normalize(existing.blends)
  );

  const toggleRange = (
    setter: React.Dispatch<React.SetStateAction<RangeValue[]>>,
    r: RangeValue
  ) => {
    setter((prev) => {
      const exists = prev.some((p) => p.min === r.min && p.max === r.max);
      return exists
        ? prev.filter((p) => p.min !== r.min || p.max !== r.max)
        : [...prev, r];
    });
  };

  const toggleBlend = (v: "pure" | "mixed") => {
    setSelectedBlends((prev) =>
      prev.includes(v) ? prev.filter((b) => b !== v) : [...prev, v]
    );
  };

  const renderRangeOptions = (
    options: { label: string; min: number; max: number | null }[],
    selected: RangeValue[],
    toggle: (r: RangeValue) => void
  ) => (
    <View style={S.chipRow}>
      {options.map((o) => (
        <FilterChip
          key={o.label}
          label={o.label}
          selected={selected.some((s) => s.min === o.min && s.max === o.max)}
          onPress={() => toggle({ min: o.min, max: o.max })}
        />
      ))}
    </View>
  );

  const onApply = () => {
    dispatch(
      setFilters({
        categoryId,
        filters: {
          colors: selectedColors.length ? selectedColors : undefined,
          size: selectedSizes.length ? selectedSizes : undefined,
          blends: selectedBlends.length ? selectedBlends : undefined,
        },
      })
    );
    handleClose();
  };

  const onClear = () => {
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedBlends([]);
    dispatch(clearFilters(categoryId));
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.neutral.dark.dark }}
      edges={["top"]}
    >
      <Animated.View
        style={[
          S.container,
          { backgroundColor: colors.neutral.dark.dark },
          animatedStyle,
        ]}
      >
        <View style={S.header}>
          <Text
            style={[S.headerAction, { color: colors.highlight.medium }]}
            onPress={handleClose}
          >
            Cancel
          </Text>
          <Text style={[S.headerTitle, { color: colors.neutral.light.light }]}>
            Filter
          </Text>
          <Text
            style={[S.headerAction, { color: colors.highlight.medium }]}
            onPress={onClear}
          >
            Clear All
          </Text>
        </View>

        <Section title="Color" selectedCount={selectedColors.length}>
          {renderRangeOptions(COLOR_OPTIONS, selectedColors, (r) =>
            toggleRange(setSelectedColors, r)
          )}
        </Section>

        <Section title="Size" selectedCount={selectedSizes.length}>
          {renderRangeOptions(SIZE_OPTIONS, selectedSizes, (r) =>
            toggleRange(setSelectedSizes, r)
          )}
        </Section>

        <Section title="Blends" selectedCount={selectedBlends.length}>
          <View style={S.chipRow}>
            {BLEND_OPTIONS.map((opt) => (
              <FilterChip
                key={opt}
                label={opt === "pure" ? "Only solids" : "With blends"}
                selected={selectedBlends.includes(opt)}
                onPress={() => toggleBlend(opt)}
              />
            ))}
          </View>
        </Section>

        <View style={S.footer}>
          <PrimaryButton title="Apply Filters" onPress={onApply} fullWidth />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}
