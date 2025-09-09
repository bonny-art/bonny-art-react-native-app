import categories from "@/entities/category/model/__mocks__/categories.json";
import products from "@/entities/product/model/__mocks__/products.json";
import { ProductCard } from "@/entities/product/ui/ProductCard";
import { spacing } from "@/shared/lib/tokens";
import { useColorScheme } from "@shared/hooks/useColorScheme";
import { palette } from "@shared/lib/palette";
import { router, Stack } from "expo-router";
import { useMemo } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { StickyHeader } from "@/features/category/ui/StickyHeader";
import { useCategoryProducts } from "@/features/category/lib/useCategoryProducts";
import { makeStyles } from "./styles";
import { toProductModal } from "@/navigation/routes";

type Props = {
  categoryId: string;
};

export function CategoryScreen({ categoryId }: Props) {
  const scheme = (useColorScheme() ?? "light") as keyof typeof palette;
  const s = makeStyles(scheme);

  const cat = categories.find((c) => c.id === categoryId);
  const items = useCategoryProducts(products, categoryId);

  const { width } = useWindowDimensions();
  const gap = spacing.lg;
  const cardWidth = useMemo(() => {
    const padding = spacing.xl * 2;
    return Math.floor((width - padding - gap) / 2);
  }, [width, gap]);

  return (
    <SafeAreaView style={s.root}>
      <Stack.Screen options={{ title: cat?.name ?? "Category" }} />

      <FlatList
        style={s.root}
        data={items}
        keyExtractor={(it) => it.id}
        numColumns={2}
        columnWrapperStyle={s.columnWrapper}
        contentContainerStyle={s.listContent}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={<StickyHeader />}
        ListEmptyComponent={
          <View style={s.emptyWrap}>
            <Text style={s.emptyText}>Немає товарів у цій категорії.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <ProductCard
            variant="tile"
            title={item.title}
            price={item.price}
            imageUrl={item.imageUrl}
            favorite={item.favorite}
            onToggleFavorite={() => {}}
            onPress={() => router.push(toProductModal(item.id))}
            width={cardWidth}
          />
        )}
      />
    </SafeAreaView>
  );
}
