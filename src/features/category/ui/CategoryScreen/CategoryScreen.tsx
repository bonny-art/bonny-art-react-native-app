import { ProductCard } from "@/entities/product/ui/ProductCard";
import { spacing } from "@/shared/lib/tokens";
import { useColorScheme } from "@shared/hooks/useColorScheme";
import { palette } from "@shared/lib/palette";
import { router, Stack } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  useWindowDimensions,
  View,
} from "react-native";
import { Text } from "@shared/ui/Text";
import { StickyHeader } from "@/features/category/ui/StickyHeader";
import { makeStyles } from "./styles";
import { toProductModal } from "@/navigation/routes";

import { fetchCategoryById } from "@/entities/category/api";
import { toggleProductFavorite } from "@/entities/product/api";
import type { Product } from "@/entities/product/model";
import { useCategoryInfinite } from "@/features/category/lib/useCategoryInfinite";

type Props = {
  categoryId: string;
};

/**
 * CategoryScreen
 * - Тягне назву категорії (GET /Category/:id)
 * - Тягне товари з пагінацією (GET /Product?categoryId=&page=&limit=)
 * - Інфініт-скрол: onEndReached → loadMore()
 * - Оптимістичний toggle favorite з відкатом
 * - Помилки в UI не показуємо (лог у консоль), порожній стан — текст
 */
export function CategoryScreen({ categoryId }: Props) {
  const scheme = (useColorScheme() ?? "light") as keyof typeof palette;
  const s = makeStyles(scheme);

  const [title, setTitle] = useState<string>("Category");

  // назва категорії (не фатально, якщо впаде — лишимо "Category")
  useEffect(() => {
    let alive = true;

    const loadTitle = async (): Promise<void> => {
      try {
        const c = await fetchCategoryById(categoryId);
        if (!alive) return;
        setTitle(c.name);
      } catch (err: unknown) {
        console.warn(
          "fetchCategoryById failed:",
          (err as any)?.response?.status ??
            (err as Error)?.message ??
            String(err)
        );
      }
    };

    loadTitle();
    return () => {
      alive = false;
    };
  }, [categoryId]);

  // інфініт-скрол товарів
  const {
    items,
    setItems,
    loading,
    loadingMore,
    refreshing,
    hasMore,
    loadMore,
    refresh,
  } = useCategoryInfinite(categoryId, {
    limit: 12,
    sortBy: "id",
    order: "asc",
    silentErrors: true,
  });

  // оптимістичне перемикання favorite
  const onToggleFavorite = async (p: Product) => {
    setItems((prev) =>
      prev.map((x) => (x.id === p.id ? { ...x, favorite: !x.favorite } : x))
    );
    try {
      const updated = await toggleProductFavorite(p);
      setItems((prev) => prev.map((x) => (x.id === updated.id ? updated : x)));
    } catch (e: any) {
      console.warn(
        "toggleFavorite failed:",
        e?.response?.status ?? e?.message ?? String(e)
      );
      setItems((prev) =>
        prev.map((x) => (x.id === p.id ? { ...x, favorite: p.favorite } : x))
      ); // відкат
    }
  };

  const { width } = useWindowDimensions();
  const gap = spacing.lg;
  const cardWidth = useMemo(() => {
    const padding = spacing.xl * 2;
    return Math.floor((width - padding - gap) / 2);
  }, [width, gap]);

  return (
    <SafeAreaView style={s.root}>
      <Stack.Screen options={{ title }} />

      {loading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator />
        </View>
      ) : (
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
          renderItem={({ item }) => (
            <ProductCard
              variant="tile"
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              favorite={item.favorite}
              onToggleFavorite={() => onToggleFavorite(item)}
              onPress={() => router.push(toProductModal(item.id))}
              width={cardWidth}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}
