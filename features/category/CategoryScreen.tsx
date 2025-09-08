import React, { useMemo } from "react";
import {
  SafeAreaView,
  FlatList,
  useWindowDimensions,
  View,
  Text,
} from "react-native";
import { Stack, router } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { palette } from "@/constants/palette";
import productsJson from "@/store/products.json";
import categoriesJson from "@/store/categories.json";
import ProductCard from "@/components/ProductCard";
import { spacing } from "@/constants/tokens";
import type { Product, Category } from "@/utils/catalog";
import { useCategoryProducts } from "./hooks/useCategoryProducts";
import StickyHeader from "./components/StickyHeader/StickyHeader";
import { makeStyles } from "./styles";

type Props = {
  categoryId: string;
};

export default function CategoryScreen({ categoryId }: Props) {
  const scheme = (useColorScheme() ?? "light") as keyof typeof palette;
  const s = makeStyles(scheme);

  const products = productsJson as unknown as Product[];
  const categories = categoriesJson as unknown as Category[];

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
            onPress={() =>
              router.push({
                pathname: "/(modals)/product/[id]",
                params: { id: item.id },
              })
            }
            width={cardWidth}
          />
        )}
      />
    </SafeAreaView>
  );
}
