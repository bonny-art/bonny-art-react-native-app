import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { spacing, typography } from "@/shared/lib/tokens";
import { FilterChip } from "@/shared/ui/FilterChip";
import { PrimaryButton } from "@/shared/ui/PrimaryButton";
import {
  clearFilters,
  setFilters,
  type RangeValue,
} from "@/features/filters/model/filterSlice";
import type { RootState } from "@/store";
import { Text } from "@shared/ui/Text";
import { useTheme } from "@/providers/theme/ThemeContext";
import { palette } from "@shared/lib/palette";
import { Section } from "./Section";

export function FilterModal() {
  const { categoryId = "" } = useLocalSearchParams<{ categoryId: string }>();
  const dispatch = useDispatch();
  const { currentTheme: scheme } = useTheme();
  const colors = palette[scheme];

  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = withTiming(1, { duration: 200 });
  }, [progress]);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: (1 - progress.value) * 20 }],
  }));
  const handleClose = () => {
    progress.value = withTiming(0, { duration: 200 }, (finished) => {
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

  const colorOptions = useMemo(() => {
    const arr: { label: string; min: number; max: number | null }[] = [
      { label: "<100", min: 0, max: 100 },
    ];
    for (let from = 101; from <= 191; from += 10) {
      arr.push({ label: `${from}-${from + 9}`, min: from, max: from + 9 });
    }
    arr.push({ label: ">200", min: 201, max: null });
    return arr;
  }, []);

  const sizeOptions = useMemo(() => {
    const arr: { label: string; min: number; max: number | null }[] = [
      { label: "менше 200", min: 0, max: 200 },
    ];
    for (let from = 201; from <= 901; from += 100) {
      arr.push({ label: `${from}-${from + 99}`, min: from, max: from + 99 });
    }
    arr.push({ label: ">1000", min: 1001, max: null });
    return arr;
  }, []);

  const [selectedColors, setSelectedColors] = useState<RangeValue[]>(
    existing.colors || []
  );
  const [selectedSizes, setSelectedSizes] = useState<RangeValue[]>(
    existing.size || []
  );
  const [selectedBlends, setSelectedBlends] = useState<("pure" | "mixed")[]>(
    existing.blends || []
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
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
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
    <SafeAreaView style={{ flex: 1 }}>
      <Animated.View
        style={[
          {
            flex: 1,
            padding: spacing.xl,
            gap: spacing.lg,
            backgroundColor: colors.neutral.dark.dark,
          },
          animatedStyle,
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              ...typography.action.m,
              color: colors.neutral.light.light,
            }}
            onPress={handleClose}
          >
            Cancel
          </Text>
          <Text
            style={{
              ...typography.heading.h3,
              color: colors.neutral.light.light,
            }}
          >
            Filter
          </Text>
          <Text
            style={{
              ...typography.action.m,
              color: colors.neutral.light.light,
            }}
            onPress={onClear}
          >
            Clear All
          </Text>
        </View>

        <Section title="Color" selectedCount={selectedColors.length}>
          {renderRangeOptions(colorOptions, selectedColors, (r) =>
            toggleRange(setSelectedColors, r)
          )}
        </Section>

        <Section title="Size" selectedCount={selectedSizes.length}>
          {renderRangeOptions(sizeOptions, selectedSizes, (r) =>
            toggleRange(setSelectedSizes, r)
          )}
        </Section>

        <Section title="Blends" selectedCount={selectedBlends.length}>
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}
          >
            <FilterChip
              label="Pure"
              selected={selectedBlends.includes("pure")}
              onPress={() => toggleBlend("pure")}
            />
            <FilterChip
              label="Mixed"
              selected={selectedBlends.includes("mixed")}
              onPress={() => toggleBlend("mixed")}
            />
          </View>
        </Section>

        <View style={{ marginTop: "auto" }}>
          <PrimaryButton title="Apply Filters" onPress={onApply} fullWidth />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}
