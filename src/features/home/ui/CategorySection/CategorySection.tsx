import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useColorScheme } from "@shared/hooks/useColorScheme";
import { palette } from "@shared/lib/palette";
import { ProductCard } from "@entities/product/ui/ProductCard";

import { CARD_W, HIT_SLOP } from "./constants";
import { makeStyles } from "./styles";
import type { CategorySectionProps } from "./types";

export function CategorySection({
  title,
  categoryId,
  items,
  onSeeMore,
  onPressItem,
  onToggleFavorite,
}: CategorySectionProps) {
  const scheme = (useColorScheme() ?? "light") as keyof typeof palette;
  const s = makeStyles(scheme);

  return (
    <View style={s.root}>
      <View style={s.headerRow}>
        <Text style={s.title}>{title}</Text>

        <TouchableOpacity
          onPress={() => onSeeMore(categoryId)}
          hitSlop={HIT_SLOP}
        >
          <Text style={s.seeMore}>See more</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={items}
        keyExtractor={(it) => it.id}
        renderItem={({ item }) => (
          <ProductCard
            variant="tile"
            title={item.title}
            price={item.price}
            imageUrl={item.imageUrl}
            favorite={item.favorite}
            onToggleFavorite={() => onToggleFavorite?.(item.id)}
            onPress={() => onPressItem(item.id)}
            width={CARD_W}
          />
        )}
        contentContainerStyle={s.listContent as any}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
