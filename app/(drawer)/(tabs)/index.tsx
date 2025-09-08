import { router } from "expo-router";
import React, { useMemo } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import CategorySection from "@/components/home/CategorySection/CategorySection";
import InfoBar from "@/components/home/InfoBar/InfoBar";

import categoriesJson from "@/store/categories.json";
import productsJson from "@/store/products.json";

import { spacing } from "@/constants/tokens";
import {
  buildSectionsByCategory,
  type Category,
  type Product,
} from "@/utils/catalog";

import HeroCarousel from "@/components/home/HeroCarousel/HeroCarousel";
import { useScrollToTop } from "@react-navigation/native";

export default function ExploreScreen() {
  const scrollRef = React.useRef<ScrollView>(null);
  useScrollToTop(scrollRef);

  const insets = useSafeAreaInsets();

  const products = productsJson as unknown as Product[];
  const categories = categoriesJson as unknown as Category[];

  const sections = useMemo(
    () => buildSectionsByCategory(categories, products, true),
    [categories, products]
  );

  const openProduct = (id: string) =>
    router.push({ pathname: "/(modals)/product/[id]", params: { id } });

  const openCategory = (categoryId: string) =>
    router.push({
      pathname: "/(drawer)/(tabs)/category/[id]",
      params: { id: categoryId },
    });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Нерухома інфопанель зверху */}
      <InfoBar
        onSearch={() => {}}
        onFavorites={() => router.push("/(drawer)/(tabs)/favorites")}
        onCart={() => router.push("/(drawer)/(tabs)/cart")}
        cartCount={5}
        favoritesSelected={true}
      />

      {/* Прокручуваний контент: гарячі + секції категорій */}
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
