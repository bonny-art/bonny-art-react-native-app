import { FilterChip } from "@/shared/ui/FilterChip";
import { IconSymbol } from "@/shared/ui/IconSymbol";
import { sizes, spacing } from "@/shared/lib/tokens";
import { useTheme } from "@/providers/theme/ThemeContext";
import { palette } from "@shared/lib/palette";
import { router } from "expo-router";

import { TouchableOpacity, View } from "react-native";
import { Text } from "@shared/ui/Text";
import { makeStyles } from "./styles";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { toFilterModal, toSearchModal } from "@/navigation/routes";
import { CATEGORY_SORT_ICON_MAP } from "./constants";
import type { CategorySortMode } from "./types";

type Props = {
  categoryId: string;
  sortMode: CategorySortMode;
  onToggleSort: () => void;
  searchQuery?: string;
};

/**
 * Renders the sticky header with search, sort, and filter controls for a category list.
 */
export function StickyHeader({
  categoryId,
  sortMode,
  onToggleSort,
  searchQuery,
}: Props) {
  const { currentTheme: scheme } = useTheme();
  const p = palette[scheme];
  const s = makeStyles(scheme);

  const filterCount = useSelector((state: RootState) => {
    const f = state.filters.byCategory[categoryId];
    if (!f) return 0;
    let count = 0;
    if (f.colors && f.colors.length) count += 1;
    if (f.size && f.size.length) count += 1;
    if (f.blends && f.blends.length) count += 1;
    return count;
  });

  const sortIconName = CATEGORY_SORT_ICON_MAP[sortMode];
  const isSortActive = sortMode !== "default";
  const sortLabel =
    sortMode === "priceDesc"
      ? "Price"
      : sortMode === "priceAsc"
      ? "Price"
      : "Sort";

  return (
    <View style={s.wrap}>
      <TouchableOpacity
        onPress={() => router.push(toSearchModal(categoryId, searchQuery))}
        activeOpacity={0.8}
        style={s.searchPill}
        accessibilityRole="button"
        accessibilityLabel={searchQuery ? `Search: ${searchQuery}` : "Search"}
      >
        <IconSymbol
          name="search"
          size={sizes.icon.lgPlus}
          color={p.neutral.light.light}
        />
        <Text
          style={[s.searchPlaceholder, searchQuery ? s.searchValue : null]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {searchQuery || "Search"}
        </Text>
      </TouchableOpacity>

      <View style={s.row}>
        <FilterChip
          label={sortLabel}
          iconLeft={sortIconName}
          selected={isSortActive}
          variant="trigger"
          onPress={onToggleSort}
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
