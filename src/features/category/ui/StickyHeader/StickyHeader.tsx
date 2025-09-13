import { FilterChip } from "@/shared/ui/FilterChip";
import { IconSymbol } from "@/shared/ui/IconSymbol";
import { spacing } from "@/shared/lib/tokens";
import { useTheme } from "@/providers/theme/ThemeContext";
import { palette } from "@shared/lib/palette";
import { router } from "expo-router";

import { TouchableOpacity, View } from "react-native";
import { Text } from "@shared/ui/Text";
import { makeStyles } from "./styles";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { toFilterModal, toSearchModal } from "@/navigation/routes";

type Props = { categoryId: string };

export function StickyHeader({ categoryId }: Props) {
  const { currentTheme: scheme } = useTheme();
  const p = palette[scheme];
  const s = makeStyles(scheme);

  const filterCount = useSelector((state: RootState) => {
    const f = state.filters.byCategory[categoryId];
    if (!f) return 0;
    let count = 0;
    if (f.categories && f.categories.length) count += 1;
    if (f.price) count += 1;
    if (f.colors) count += 1;
    if (f.size) count += 1;
    return count;
  });

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
          selected={filterCount > 0}
          counter={filterCount || undefined}
          variant="trigger"
          onPress={() => router.push(toFilterModal(categoryId))}
        />
      </View>
    </View>
  );
}
