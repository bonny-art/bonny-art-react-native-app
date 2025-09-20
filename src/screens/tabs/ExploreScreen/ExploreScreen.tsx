import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useScrollToTop } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { CategorySection } from "@/features/home/ui/CategorySection";
import { InfoBar } from "@/widgets/InfoBar";
import { HeroCarousel } from "@/features/home/ui/HeroCarousel";
import { spacing } from "@/shared/lib/tokens";
import { useTheme } from "@/providers/theme/ThemeContext";

import { selectCartCount } from "@/features/cart/model/selectors";

import { fetchCategories } from "@/entities/category/api";
import {
  fetchProductsByCategoryPage,
  fetchRandomProductsKnownTotal,
} from "@/entities/product/api";
import type { Product } from "@/entities/product/model";

import {
  PATHS,
  toCartIndex,
  toCategory,
  toFavorites,
  toProductModal,
} from "@/navigation/routes";
import {
  selectFavoriteProductIds,
  selectIsAuthenticated,
} from "@/entities/user/model";
import { toggleFavorite } from "@/store/authSlice";
import type { AppDispatch } from "@/store";
import { ActionModal } from "@/shared/ui/ActionModal";
import {
  AUTH_PROMPT_CANCEL_LABEL,
  AUTH_PROMPT_CONFIRM_LABEL,
  AUTH_PROMPT_DISMISS_LABEL,
  AUTH_PROMPT_MESSAGE,
  AUTH_PROMPT_TITLE,
} from "@/shared/constants/auth";

import {
  CATEGORY_FETCH_LIMIT,
  CATEGORY_FETCH_PAGE,
  CATEGORY_FETCH_SORT_BY,
  CATEGORY_FETCH_SORT_ORDER,
  HERO_CAROUSEL_COUNT,
  HERO_CAROUSEL_HEIGHT,
} from "./constants";
import { makeStyles } from "./styles";
import type { CategorySectionData } from "./types";

/**
 * ExploreScreen
 * - Хедер: 5 випадкових продуктів (вся БД)
 * - Далі: секції за всіма категоріями, в кожній по 5 продуктів категорії
 * - Помилки не показуються в UI: «биті» категорії тихо пропускаються
 */
export default function ExploreScreen() {
  const scrollRef = React.useRef<ScrollView>(null);
  useScrollToTop(scrollRef);
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();
  const { currentTheme: scheme } = useTheme();
  const styles = makeStyles(scheme);

  const [sections, setSections] = useState<CategorySectionData[]>([]);
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const cartCount = useSelector(selectCartCount);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const favoriteIds = useSelector(selectFavoriteProductIds);
  const favoriteSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);
  const [isAuthModalVisible, setAuthModalVisible] = useState(false);

  useEffect(() => {
    let alive = true;

    (async () => {
      setLoading(true);

      let cats: CategorySectionData["category"][] = [];
      try {
        cats = await fetchCategories();
      } catch (err: any) {
        console.warn(
          "fetchCategories failed:",
          err?.response?.status ?? err?.message ?? String(err)
        );
        cats = [];
      }

      const paramsBase = {
        page: CATEGORY_FETCH_PAGE,
        limit: CATEGORY_FETCH_LIMIT,
        sortBy: CATEGORY_FETCH_SORT_BY,
        order: CATEGORY_FETCH_SORT_ORDER,
      };

      const sec = (
        await Promise.all(
          cats.map(async (c) => {
            try {
              const page = await fetchProductsByCategoryPage(c.id, paramsBase);
              return { category: c, items: page.items } as CategorySectionData;
            } catch (err: any) {
              console.warn(
                "Category failed:",
                c.id,
                err?.response?.status ?? err?.message ?? String(err)
              );
              return null;
            }
          })
        )
      ).filter(Boolean) as CategorySectionData[];

      let randomTop: Product[] = [];
      try {
        randomTop = await fetchRandomProductsKnownTotal(HERO_CAROUSEL_COUNT);
      } catch (err: any) {
        console.warn(
          "randomTop failed:",
          err?.response?.status ?? err?.message ?? String(err)
        );
        randomTop = [];
      }

      if (!alive) return;
      setSections(sec);
      setTopProducts(randomTop);
      setLoading(false);
    })();

    return () => {
      alive = false;
    };
  }, []);

  const openProduct = (id: string) => router.push(toProductModal(id));
  const openCategory = (categoryId: string) =>
    router.push(toCategory(categoryId));

  const handleFavoritesNav = () => {
    if (!isAuthenticated) {
      setAuthModalVisible(true);
      return;
    }
    router.push(toFavorites());
  };

  const handleToggleFavorite = (productId: string) => {
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

  const contentPadding = useMemo(
    () => ({ paddingBottom: spacing.xl + insets.bottom }),
    [insets.bottom]
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderSafeArea}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <InfoBar
        onSearch={() => {}}
        onFavorites={handleFavoritesNav}
        onCart={() => router.push(toCartIndex())}
        cartCount={cartCount}
        favoritesSelected
      />

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={contentPadding}
        showsVerticalScrollIndicator={false}
      >
        {topProducts.length > 0 && (
          <HeroCarousel
            products={topProducts}
            count={Math.min(HERO_CAROUSEL_COUNT, topProducts.length)}
            height={HERO_CAROUSEL_HEIGHT}
          />
        )}

        {sections.map((sec) => (
          <CategorySection
            key={sec.category.id}
            title={sec.category.name}
            categoryId={sec.category.id}
            items={sec.items.map((item) => ({
              ...item,
              favorite: favoriteSet.has(item.id),
            }))}
            onSeeMore={openCategory}
            onPressItem={openProduct}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </ScrollView>

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
