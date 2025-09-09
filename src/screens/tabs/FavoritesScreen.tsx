import { ProductCard } from "@/entities/product/ui/ProductCard";
import { spacing } from "@/shared/lib/tokens";
import products from "@/entities/product/model/__mocks__/products.json";
import { FlatList, SafeAreaView, Text, View } from "react-native";

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
