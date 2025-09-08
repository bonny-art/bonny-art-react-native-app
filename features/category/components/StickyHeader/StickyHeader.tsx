import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { palette } from "@/constants/palette";
import { spacing } from "@/constants/tokens";
import FilterChip from "@/components/ui/FilterChip";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { router } from "expo-router";
import { makeStyles } from "./styles";

export default function StickyHeader() {
  const scheme = (useColorScheme() ?? "light") as keyof typeof palette;
  const p = palette[scheme];
  const s = makeStyles(scheme);

  return (
    <View style={s.wrap}>
      <TouchableOpacity
        onPress={() => router.push("/(modals)/search")}
        activeOpacity={0.8}
        style={s.searchPill}
      >
        <IconSymbol name="search" size={22} color={p.neutral.light.light} />
        <Text style={s.searchPlaceholder}>Search</Text>
      </TouchableOpacity>

      <View style={s.row}>
        <FilterChip
          label="Sort"
          iconLeft="sort"
          selected={false}
          variant="trigger"
          onPress={() => {}}
        />
        <View style={{ width: spacing.md }} />
        <FilterChip
          label="Filter"
          iconLeft="filter"
          selected={false}
          counter={2}
          variant="trigger"
          onPress={() => router.push("/(modals)/filter")}
        />
      </View>
    </View>
  );
}
