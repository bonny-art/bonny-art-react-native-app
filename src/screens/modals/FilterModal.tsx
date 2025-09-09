import { PrimaryButton } from "@/shared/ui/PrimaryButton";
import { spacing } from "@/shared/lib/tokens";
import { FilterChip } from "@/shared/ui/FilterChip";
import { router } from "expo-router";
import { View } from "react-native";

export default function FilterModal() {
  return (
    <View style={{ flex: 1, padding: spacing.xl, gap: spacing.md }}>
      {/* TODO: блоки Color/Size/Category/Price */}
      <FilterChip label="Green" selected onPress={() => {}} />
      <FilterChip label="Size M" selected={false} onPress={() => {}} />
      <PrimaryButton title="Apply" onPress={() => router.back()} fullWidth />
    </View>
  );
}
