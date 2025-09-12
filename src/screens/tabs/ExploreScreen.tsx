import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useScrollToTop } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { CategorySection } from "@/features/home/ui/CategorySection";
import { InfoBar } from "@/widgets/InfoBar";
import { HeroCarousel } from "@/features/home/ui/HeroCarousel";
import { spacing } from "@/shared/lib/tokens";

import { selectCartCount } from "@/features/cart/model/selectors";

import { fetchCategories } from "@/entities/category/api";
import {
  fetchProductsByCategoryPage,
  fetchRandomProductsKnownTotal,
  toggleProductFavorite,
} from "@/entities/product/api";
import type { Category } from "@/entities/category/model";
import type { Product } from "@/entities/product/model";

import {
  toCartIndex,
  toCategory,
  toFavorites,
  toProductModal,
} from "@/navigation/routes";

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

  type Section = { category: Category; items: Product[] };
  const [sections, setSections] = useState<Section[]>([]);
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const cartCount = useSelector(selectCartCount);

  useEffect(() => {
    let alive = true;

    (async () => {
      setLoading(true);

      let cats: Category[] = [];
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
        page: 1,
        limit: 5,
        sortBy: "id" as const,
        order: "asc" as const,
      };

      const sec = (
        await Promise.all(
          cats.map(async (c) => {
            try {
              const page = await fetchProductsByCategoryPage(c.id, paramsBase);
              return { category: c, items: page.items } as Section;
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
      ).filter(Boolean) as Section[];

      let randomTop: Product[] = [];
      try {
        randomTop = await fetchRandomProductsKnownTotal(5);
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

  const handleToggleFavorite = (categoryId: string, productId: string) => {
    setSections((prev) =>
      prev.map((sec) =>
        sec.category.id === categoryId
          ? {
              ...sec,
              items: sec.items.map((p) =>
                p.id === productId ? { ...p, favorite: !p.favorite } : p
              ),
            }
          : sec
      )
    );

    const current = sections
      .find((s) => s.category.id === categoryId)
      ?.items.find((p) => p.id === productId);
    if (!current) return;

    toggleProductFavorite(current)
      .then((updated) => {
        setSections((prev) =>
          prev.map((sec) =>
            sec.category.id === categoryId
              ? {
                  ...sec,
                  items: sec.items.map((p) =>
                    p.id === updated.id ? updated : p
                  ),
                }
              : sec
          )
        );
      })
      .catch((err: any) => {
        console.warn(
          "toggleFavorite failed:",
          err?.response?.status ?? err?.message ?? String(err)
        );

        setSections((prev) =>
          prev.map((sec) =>
            sec.category.id === categoryId
              ? {
                  ...sec,
                  items: sec.items.map((p) =>
                    p.id === productId
                      ? { ...p, favorite: current.favorite }
                      : p
                  ),
                }
              : sec
          )
        );
      });
  };

  const contentPadding = useMemo(
    () => ({ paddingBottom: spacing.xl + insets.bottom }),
    [insets.bottom]
  );

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <InfoBar
        onSearch={() => {}}
        onFavorites={() => router.push(toFavorites())}
        onCart={() => router.push(toCartIndex())}
        cartCount={cartCount}
        favoritesSelected={true}
      />

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={contentPadding}
        showsVerticalScrollIndicator={false}
      >
        {topProducts.length > 0 && (
          <HeroCarousel
            products={topProducts}
            count={Math.min(5, topProducts.length)}
            height={215}
          />
        )}

        {sections.map((sec) => (
          <CategorySection
            key={sec.category.id}
            title={sec.category.name}
            categoryId={sec.category.id}
            items={sec.items}
            onSeeMore={openCategory}
            onPressItem={openProduct}
            onToggleFavorite={(productId) =>
              handleToggleFavorite(sec.category.id, productId)
            }
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
