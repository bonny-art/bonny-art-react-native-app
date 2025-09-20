import { ProductCard } from "@/entities/product/ui/ProductCard";
import { spacing } from "@/shared/lib/tokens";
import { useTheme } from "@/providers/theme/ThemeContext";
import { router, Stack, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  useWindowDimensions,
  View,
} from "react-native";
import type { ListRenderItem } from "react-native";
import { Text } from "@shared/ui/Text";
import {
  StickyHeader,
  CATEGORY_SORT_SEQUENCE,
  type CategorySortMode,
} from "@/features/category/ui/StickyHeader";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { makeStyles } from "./styles";
import { PATHS, toProductModal } from "@/navigation/routes";

import { fetchCategoryById } from "@/entities/category/api";
import type { Product } from "@/entities/product/model";
import { useCategoryInfinite } from "@/features/category/lib/useCategoryInfinite";
import {
  selectFavoriteProductIds,
  selectIsAuthenticated,
} from "@/entities/user/model";
import { toggleFavorite } from "@/store/authSlice";
import { clearFilters } from "@/store/filterSlice";
import { clearCategorySearch } from "@/store/searchSlice";
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
  const [sortMode, setSortMode] = useState<CategorySortMode>("default");

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

  useEffect(() => {
    setSortMode("default");
  }, [categoryId]);

  const sortParams = useMemo<
    Partial<{ sortBy: string; order: "asc" | "desc" }>
  >(() => {
    switch (sortMode) {
      case "priceDesc":
        return { sortBy: "price", order: "desc" };
      case "priceAsc":
        return { sortBy: "price", order: "asc" };
      default:
        return {};
    }
  }, [sortMode]);

  const searchQuery = useSelector(
    (s: RootState) => s.search.byCategory[categoryId] || ""
  );

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
    sortBy: sortParams.sortBy,
    order: sortParams.order,
    search: searchQuery,
    silentErrors: true,
  });

  const handleToggleSort = useCallback(() => {
    setSortMode((prev) => {
      const currentIndex = CATEGORY_SORT_SEQUENCE.indexOf(prev);
      if (currentIndex === -1) return CATEGORY_SORT_SEQUENCE[0];
      const nextIndex = (currentIndex + 1) % CATEGORY_SORT_SEQUENCE.length;
      return CATEGORY_SORT_SEQUENCE[nextIndex];
    });
  }, []);

  const dispatch = useDispatch<AppDispatch>();

  useFocusEffect(
    useCallback(() => {
      return () => {
        setSortMode("default");
        dispatch(clearFilters(categoryId));
        dispatch(clearCategorySearch(categoryId));
      };
    }, [dispatch, categoryId])
  );

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const favoriteIds = useSelector(selectFavoriteProductIds);
  const favoriteSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);

  const [isAuthModalVisible, setAuthModalVisible] = useState(false);

  const handleToggleFavorite = useCallback(
    (productId: string) => {
      if (!isAuthenticated) {
        setAuthModalVisible(true);
        return;
      }
      dispatch(toggleFavorite({ productId }));
    },
    [dispatch, isAuthenticated]
  );

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
        const val = Math.max(p.width ?? 0, p.height ?? 0);
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

  const keyExtractor = useCallback((item: Product) => item.id, []);

  const handleProductPress = useCallback((productId: string) => {
    router.push(toProductModal(productId));
  }, []);

  const renderItem = useCallback<ListRenderItem<Product>>(
    ({ item }) => (
      <ProductCard
        variant="tile"
        title={item.title}
        price={item.price}
        imageUrl={item.imageUrl}
        favorite={favoriteSet.has(item.id)}
        onToggleFavorite={() => handleToggleFavorite(item.id)}
        onPress={() => handleProductPress(item.id)}
        width={cardWidth}
      />
    ),
    [cardWidth, favoriteSet, handleProductPress, handleToggleFavorite]
  );

  const handleEndReached = useCallback(() => {
    if (hasMore && !loadingMore) {
      loadMore();
    }
  }, [hasMore, loadMore, loadingMore]);

  const listFooter = useMemo(() => {
    if (!loadingMore) return null;
    return (
      <View style={{ paddingVertical: spacing.lg }}>
        <ActivityIndicator />
      </View>
    );
  }, [loadingMore]);

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
          keyExtractor={keyExtractor}
          numColumns={2}
          columnWrapperStyle={s.columnWrapper}
          contentContainerStyle={s.listContent}
          stickyHeaderIndices={[0]}
          ListHeaderComponent={
            <StickyHeader
              categoryId={categoryId}
              sortMode={sortMode}
              onToggleSort={handleToggleSort}
              searchQuery={searchQuery}
            />
          }
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
          onEndReached={handleEndReached}
          ListFooterComponent={listFooter}
          renderItem={renderItem}
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
