import React, { useMemo } from "react";
import { SafeAreaView, FlatList, useWindowDimensions } from "react-native";
import products from "@/store/products.json";
import ProductCard from "@/components/ProductCard";
import { spacing } from "@/constants/tokens";
import { vscale } from "@/constants/responsive";

export default function GridTwoColumns() {
  const { width } = useWindowDimensions();
  const gap = spacing.lg;
  const horizontalPadding = spacing.xl * 2;
  const cardWidth = useMemo(() => {
    const available = width - horizontalPadding - gap;
    return Math.floor(available / 2);
  }, [gap, horizontalPadding, width]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={products}
        keyExtractor={(it) => it.id}
        numColumns={2}
        columnWrapperStyle={{ gap, paddingHorizontal: spacing.xl }}
        renderItem={({ item }) => (
          <ProductCard
            variant="tile"
            title={item.title}
            price={item.price}
            imageUrl={item.imageUrl}
            favorite={item.favorite}
            onToggleFavorite={() => {}}
            onPress={() => {}}
            width={cardWidth}
          />
        )}
        contentContainerStyle={{
          gap,
          paddingTop: spacing.lg,
          paddingBottom: vscale(spacing.xxl),
        }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
