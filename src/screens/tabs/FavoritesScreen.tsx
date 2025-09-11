import React, { useMemo } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, View } from "react-native";
import { Text } from "@shared/ui/Text";
import { ProductCard } from "@/entities/product/ui/ProductCard";
import { spacing } from "@/shared/lib/tokens";
import { useFavoritesInfinite } from "@/features/favorites/lib/useFavoritesInfinite";
import { toggleProductFavorite } from "@/entities/product/api";
import type { Product } from "@/entities/product/model";
import { toProductModal } from "@/navigation/routes";
import { router } from "expo-router";

export default function FavoritesScreen() {
  const {
    items,
    setItems,
    loading,
    loadingMore,
    refreshing,
    hasMore,
    loadMore,
    refresh,
  } = useFavoritesInfinite({
    limit: 12,
    sortBy: "id",
    order: "asc",
    silentErrors: true,
  });

  const contentPadding = useMemo(
    () => ({ paddingTop: spacing.lg, paddingBottom: spacing.xl }),
    []
  );

  const onToggleFavorite = async (p: Product) => {
    // оптимістично прибираємо з фаворитів (бо стане favorite=false)
    setItems((prev) => prev.filter((x) => x.id !== p.id));
    try {
      await toggleProductFavorite(p);
      // нічого не робимо: на сервері вже false, у списку його немає
    } catch (e: any) {
      console.warn(
        "toggleFavorite failed:",
        e?.response?.status ?? e?.message ?? String(e)
      );
      // відкат: повертаємо картку назад
      setItems((prev) => [p, ...prev]);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={items}
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
              favorite={true}
              onToggleFavorite={() => onToggleFavorite(item)}
              onPress={() => router.push(toProductModal(item.id))}
              onAddToCart={() => {}}
            />
          </View>
        )}
        ListEmptyComponent={
          <Text
            style={{ opacity: 0.6, textAlign: "center", marginTop: spacing.xl }}
          >
            No favorites yet
          </Text>
        }
        onRefresh={refresh}
        refreshing={refreshing}
        onEndReachedThreshold={0.6}
        onEndReached={() => hasMore && !loadingMore && loadMore()}
        ListFooterComponent={
          loadingMore ? (
            <View style={{ paddingVertical: 16 }}>
              <ActivityIndicator />
            </View>
          ) : null
        }
        contentContainerStyle={contentPadding}
      />
    </SafeAreaView>
  );
}
