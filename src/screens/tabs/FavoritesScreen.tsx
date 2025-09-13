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
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/features/cart/model/cartSlice";

import { selectCartItems } from "@/features/cart/model/selectors";

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

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const contentPadding = useMemo(
    () => ({ paddingTop: spacing.lg, paddingBottom: spacing.xl }),
    []
  );

  const onToggleFavorite = async (p: Product) => {
    setItems((prev) => prev.filter((x) => x.id !== p.id));
    try {
      await toggleProductFavorite(p);
    } catch (e: any) {
      console.warn(
        "toggleFavorite failed:",
        e?.response?.status ?? e?.message ?? String(e)
      );
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
              onAddToCart={() => dispatch(addItem(item.id))}
              inCart={cartItems.some((it) => it.id === item.id)}
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
