import { ProductCard } from "@/entities/product/ui/ProductCard";
import { spacing } from "@/shared/lib/tokens";
import { useTheme } from "@/providers/theme/ThemeContext";
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
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { makeStyles } from "./styles";
import { PATHS, toProductModal } from "@/navigation/routes";

import { fetchCategoryById } from "@/entities/category/api";
import { useCategoryInfinite } from "@/features/category/lib/useCategoryInfinite";
import {
  selectFavoriteProductIds,
  selectIsAuthenticated,
} from "@/entities/user/model";
import { toggleFavorite } from "@/store/authSlice";
import { ActionModal } from "@/shared/ui/ActionModal";
import {
  AUTH_PROMPT_CANCEL_LABEL,
  AUTH_PROMPT_CONFIRM_LABEL,
  AUTH_PROMPT_DISMISS_LABEL,
  AUTH_PROMPT_MESSAGE,
  AUTH_PROMPT_TITLE,
} from "@/shared/constants/auth";

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
  const { currentTheme: scheme } = useTheme();
  const s = makeStyles(scheme);

  const [title, setTitle] = useState<string>("Category");

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

  const {
    items,
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

  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const favoriteIds = useSelector(selectFavoriteProductIds);
  const favoriteSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);

  const [isAuthModalVisible, setAuthModalVisible] = useState(false);

  const onToggleFavorite = (productId: string) => {
    if (!isAuthenticated) {
      setAuthModalVisible(true);
      return;
    }
    dispatch(toggleFavorite({ productId }));
  };

  const handleCloseAuthModal = () => {
    setAuthModalVisible(false);
  };

  const handleLogin = () => {
    setAuthModalVisible(false);
    router.push(PATHS.AUTH_LOGIN);
  };

  const { width } = useWindowDimensions();
  const gap = spacing.lg;
  const cardWidth = useMemo(() => {
    const padding = spacing.xl * 2;
    return Math.floor((width - padding - gap) / 2);
  }, [width, gap]);

  const filters = useSelector(
    (s: RootState) => s.filters.byCategory[categoryId]
  );

  const filteredItems = useMemo(() => {
    if (!filters) return items;
    return items.filter((p) => {
      let ok = true;
      if (filters.colors && filters.colors.length) {
        const val = p.colors ?? 0;
        ok =
          ok &&
          filters.colors.some((r) => {
            const max = r.max ?? Infinity;
            return val >= r.min && val <= max;
          });
      }
      if (filters.size && filters.size.length) {
        const val = p.width ?? 0;
        ok =
          ok &&
          filters.size.some((r) => {
            const max = r.max ?? Infinity;
            return val >= r.min && val <= max;
          });
      }
      if (filters.blends && filters.blends.length) {
        const blend = p.blends ?? 0;
        const checks: boolean[] = [];
        if (filters.blends.includes("pure")) checks.push(blend === 0);
        if (filters.blends.includes("mixed")) checks.push(blend > 0);
        ok = ok && checks.some(Boolean);
      }
      return ok;
    });
  }, [items, filters]);

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
          data={filteredItems}
          keyExtractor={(it) => it.id}
          numColumns={2}
          columnWrapperStyle={s.columnWrapper}
          contentContainerStyle={s.listContent}
          stickyHeaderIndices={[0]}
          ListHeaderComponent={<StickyHeader categoryId={categoryId} />}
          ListEmptyComponent={
            <View style={s.emptyWrap}>
              <Text style={s.emptyText}>
                There is no patterns in this category.
              </Text>
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
              favorite={favoriteSet.has(item.id)}
              onToggleFavorite={() => onToggleFavorite(item.id)}
              onPress={() => router.push(toProductModal(item.id))}
              width={cardWidth}
            />
          )}
        />
      )}

      <ActionModal
        visible={isAuthModalVisible}
        title={AUTH_PROMPT_TITLE}
        message={AUTH_PROMPT_MESSAGE}
        onRequestClose={handleCloseAuthModal}
        dismissAccessibilityLabel={AUTH_PROMPT_DISMISS_LABEL}
        cancelAction={{
          label: AUTH_PROMPT_CANCEL_LABEL,
          onPress: handleCloseAuthModal,
          variant: "outline",
        }}
        confirmAction={{
          label: AUTH_PROMPT_CONFIRM_LABEL,
          onPress: handleLogin,
        }}
      />

      <ActionModal
        visible={isAuthModalVisible}
        title={AUTH_PROMPT_TITLE}
        message={AUTH_PROMPT_MESSAGE}
        onRequestClose={handleCloseAuthModal}
        dismissAccessibilityLabel={AUTH_PROMPT_DISMISS_LABEL}
        cancelAction={{
          label: AUTH_PROMPT_CANCEL_LABEL,
          onPress: handleCloseAuthModal,
          variant: "outline",
        }}
        confirmAction={{
          label: AUTH_PROMPT_CONFIRM_LABEL,
          onPress: handleLogin,
        }}
      />
    </SafeAreaView>
  );
}
