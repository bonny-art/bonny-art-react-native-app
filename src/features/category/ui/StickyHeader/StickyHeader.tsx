import { FilterChip } from "@/shared/ui/FilterChip";
import { IconSymbol } from "@/shared/ui/IconSymbol";
import { spacing } from "@/shared/lib/tokens";
import { useColorScheme } from "@shared/hooks/useColorScheme";
import { palette } from "@shared/lib/palette";
import { router } from "expo-router";

import { TouchableOpacity, View } from "react-native";
import { Text } from "@shared/ui/Text";
import { makeStyles } from "./styles";
import { toFilterModal, toSearchModal } from "@/navigation/routes";

export function StickyHeader() {
  const scheme = (useColorScheme() ?? "light") as keyof typeof palette;
  const p = palette[scheme];
  const s = makeStyles(scheme);

  return (
    <View style={s.wrap}>
      <TouchableOpacity
        onPress={() => router.push(toSearchModal())}
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
          onPress={() => router.push(toFilterModal())}
        />
      </View>
    </View>
  );
}
