import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView, Text, TextInput, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { spacing } from "@/shared/lib/tokens";
import { FilterChip } from "@/shared/ui/FilterChip";
import { PrimaryButton } from "@/shared/ui/PrimaryButton";
import { RangeSlider } from "@/shared/ui/RangeSlider";
import { fetchCategories } from "@/entities/category/api";
import { fetchProductsByCategoryPage } from "@/entities/product/api";
import { clearFilters, setFilters } from "@/features/filters/model/filterSlice";
import type { RootState } from "@/store";

type RangeValue = { min: number; max: number | null };

export default function FilterModal() {
  const { categoryId = "" } = useLocalSearchParams<{ categoryId: string }>();
  const dispatch = useDispatch();

  // --- enter/exit animation
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

  // --- Redux filters
  const existing = useSelector(
    (s: RootState) => s.filters.byCategory[categoryId] || {}
  ) as {
    categories?: string[];
    colors?: RangeValue | null;
    size?: RangeValue | null;
    price?: RangeValue | null;
  };

  // --- Categories
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [selectedCats, setSelectedCats] = useState<string[]>(
    existing.categories || []
  );

  useEffect(() => {
    fetchCategories()
      .then((c) => setCategories(c))
      .catch((e) => console.warn("fetchCategories failed", e));
  }, []);

  const toggleCat = (id: string) => {
    setSelectedCats((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  // --- Presets for Colors / Size (unchanged)
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
    const arr: { label: string; min: number; max: number | null }[] = [];
    for (let from = 101; from <= 901; from += 100) {
      arr.push({ label: `${from}-${from + 99}`, min: from, max: from + 99 });
    }
    arr.push({ label: ">1000", min: 1001, max: null });
    return arr;
  }, []);

  const [colorRange, setColorRange] = useState(existing.colors || null);
  const [sizeRange, setSizeRange] = useState(existing.size || null);

  // --- PRICE: always numeric in state
  const [priceLimits, setPriceLimits] = useState({ min: 0, max: 1000 });

  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: existing.price?.min ?? 0,
    max: existing.price?.max ?? 1000,
  });

  useEffect(() => {
    let alive = true;
    fetchProductsByCategoryPage(categoryId, { limit: 1000 })
      .then((res) => {
        if (!alive) return;
        const prices = res.items.map((p) => p.price);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        setPriceLimits({ min, max });

        // якщо в Redux не було ціни — виставляємо межі з беку
        if (!existing.price) {
          setPriceRange({ min, max });
        } else {
          // якщо була, але могла містити null — докрутимо до валідних чисел
          setPriceRange((prev) => ({
            min: isFinite(prev.min) ? prev.min : min,
            max: isFinite(prev.max) ? prev.max : max,
          }));
        }
      })
      .catch((e) => console.warn("fetchProductsByCategoryPage failed", e));
    return () => {
      alive = false;
    };
  }, [categoryId, existing.price]);

  // Universal onChange: supports {min,max?} or [min,max]
  const handlePriceChange = (r: RangeValue | [number, number]) => {
    if (Array.isArray(r)) {
      const [min, max] = r;
      setPriceRange({ min, max });
    } else {
      setPriceRange({
        min: r.min ?? priceLimits.min,
        max: r.max ?? priceLimits.max,
      });
    }
  };

  const onApply = () => {
    dispatch(
      setFilters({
        categoryId,
        filters: {
          categories: selectedCats,
          colors: colorRange || undefined,
          size: sizeRange || undefined,
          price: priceRange, // strictly numbers
        },
      })
    );
    handleClose();
  };

  const onClear = () => {
    setSelectedCats([]);
    setColorRange(null);
    setSizeRange(null);
    setPriceRange({ min: priceLimits.min, max: priceLimits.max });
    dispatch(clearFilters(categoryId));
  };

  const renderOptions = (
    options: { label: string; min: number; max: number | null }[],
    selected: { min: number; max: number | null } | null,
    onSelect: (o: { label: string; min: number; max: number | null }) => void
  ) => (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
      {options.map((o) => (
        <FilterChip
          key={o.label}
          label={o.label}
          selected={selected?.min === o.min && selected?.max === o.max}
          onPress={() => onSelect(o)}
        />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Animated.View
        style={[
          {
            flex: 1,
            padding: spacing.xl,
            gap: spacing.lg,
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
          <Text onPress={handleClose}>Cancel</Text>
          <Text style={{ fontWeight: "600" }}>Filter</Text>
          <Text onPress={onClear}>Clear All</Text>
        </View>

        <View style={{ gap: spacing.sm }}>
          <Text style={{ fontWeight: "600", color: "white" }}>Category</Text>
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}
          >
            {categories.map((c) => (
              <FilterChip
                key={c.id}
                label={c.name}
                selected={selectedCats.includes(c.id)}
                onPress={() => toggleCat(c.id)}
              />
            ))}
          </View>
        </View>

        <View style={{ gap: spacing.sm }}>
          <Text style={{ fontWeight: "600", color: "white" }}>Price Range</Text>

          <RangeSlider
            min={priceLimits.min}
            max={priceLimits.max}
            values={[priceRange.min, priceRange.max]}
            onChange={handlePriceChange}
          />

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TextInput
              keyboardType="numeric"
              value={String(priceRange.min)}
              onChangeText={(t) =>
                setPriceRange((p) => {
                  const n = Number(t);
                  return Number.isNaN(n) ? p : { ...p, min: n };
                })
              }
              style={{
                borderWidth: 1,
                padding: 4,
                flex: 1,
                marginRight: spacing.sm,
                backgroundColor: "white",
              }}
            />
            <TextInput
              keyboardType="numeric"
              value={String(priceRange.max)}
              onChangeText={(t) =>
                setPriceRange((p) => {
                  const n = Number(t);
                  return Number.isNaN(n) ? p : { ...p, max: n };
                })
              }
              style={{
                borderWidth: 1,
                padding: 4,
                flex: 1,
                marginLeft: spacing.sm,
                backgroundColor: "white",
              }}
            />
          </View>
        </View>

        <View style={{ gap: spacing.sm }}>
          <Text style={{ fontWeight: "600", color: "white" }}>Colors</Text>
          {renderOptions(colorOptions, colorRange, setColorRange)}
        </View>

        <View style={{ gap: spacing.sm }}>
          <Text style={{ fontWeight: "600", color: "white" }}>Size</Text>
          {renderOptions(sizeOptions, sizeRange, setSizeRange)}
        </View>

        <View style={{ marginTop: "auto" }}>
          <PrimaryButton title="Apply Filters" onPress={onApply} fullWidth />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}
