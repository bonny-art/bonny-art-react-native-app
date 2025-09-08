import React from "react";
import { SafeAreaView, FlatList, View, Text } from "react-native";
import products from "@/store/products.json";
import ProductCard from "@/components/ProductCard";
import { spacing } from "@/constants/tokens";

export default function FavoritesScreen() {
  const favs = products.filter((p) => p.favorite);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={favs}
        keyExtractor={(it) => it.id}
        renderItem={({ item }) => (
          <View
            style={{ paddingHorizontal: spacing.xl, marginBottom: spacing.lg }}
          >
            <ProductCard
              variant="favorite"
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              favorite
              onToggleFavorite={() => {}}
              onPress={() => {}}
              onAddToCart={() => {}}
            />
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ opacity: 0.6, textAlign: "center" }}>
            No favorites yet
          </Text>
        }
        contentContainerStyle={{
          paddingTop: spacing.lg,
          paddingBottom: spacing.xl,
        }}
      />
    </SafeAreaView>
  );
}
