import React from "react";
import { View } from "react-native";
import FilterChip from "@/components/ui/FilterChip";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import { spacing } from "@/constants/tokens";
import { router } from "expo-router";

export default function FilterModal() {
  return (
    <View style={{ flex: 1, padding: spacing.xl, gap: spacing.md }}>
      {/* TODO: блоки Color/Size/Category/Price */}
      <FilterChip label="Green" selected={true} onPress={() => {}} />
      <FilterChip label="Size M" selected={false} onPress={() => {}} />
      <PrimaryButton title="Apply" onPress={() => router.back()} fullWidth />
    </View>
  );
}
