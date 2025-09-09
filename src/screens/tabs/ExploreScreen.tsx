import { router } from "expo-router";
import React, { useMemo } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CategorySection } from "@/features/home/ui/CategorySection";
import { InfoBar } from "@/widgets/InfoBar";

import categories from "@/entities/category/model/__mocks__/categories.json";
import products from "@/entities/product/model/__mocks__/products.json";

import { spacing } from "@/shared/lib/tokens";
import { buildSectionsByCategory } from "@shared/lib/catalog";
import { HeroCarousel } from "@/features/home/ui/HeroCarousel";
import { useScrollToTop } from "@react-navigation/native";
import { PATHS, toCategory, toProductModal } from "@/navigation/routes";

export default function ExploreScreen() {
  const scrollRef = React.useRef<ScrollView>(null);
  useScrollToTop(scrollRef);

  const insets = useSafeAreaInsets();

  const sections = useMemo(
    () => buildSectionsByCategory(categories, products, true),
    [categories, products]
  );

  const openProduct = (id: string) => router.push(toProductModal(id));
  const openCategory = (categoryId: string) =>
    router.push(toCategory(categoryId));

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <InfoBar
        onSearch={() => {}}
        onFavorites={() => router.push(PATHS.TABS_FAVORITES)}
        onCart={() => router.push(PATHS.TABS_CART)}
        cartCount={5}
        favoritesSelected={true}
      />

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: spacing.xl + insets.bottom }}
        showsVerticalScrollIndicator={false}
      >
        <HeroCarousel products={products} count={5} height={215} />

        {sections.map((sec) => (
          <CategorySection
            key={sec.category.id}
            title={sec.category.name}
            categoryId={sec.category.id}
            items={sec.items}
            onSeeMore={openCategory}
            onPressItem={openProduct}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
