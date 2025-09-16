import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { router } from "expo-router";

import { Text } from "@shared/ui/Text";
import { PrimaryButton } from "@/shared/ui/PrimaryButton";
import { ProductCard } from "@/entities/product/ui/ProductCard";
import { spacing } from "@/shared/lib/tokens";
import { toProductModal } from "@/navigation/routes";

import { fetchProductById } from "@/entities/product/api";
import type { Product } from "@/entities/product/model";

import { addItem } from "@/store/cartSlice";
import { selectCartItems } from "@/features/cart/model/selectors";

import {
  selectFavoriteProductIds,
  selectIsAuthenticated,
} from "@/entities/user/model";
import { toggleFavorite } from "@/store/authSlice";
import type { AppDispatch } from "@/store";

export default function FavoritesScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector(selectCartItems);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const favoriteIds = useSelector(selectFavoriteProductIds);

  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const favoritesKey = useMemo(
    () => favoriteIds.slice().sort().join(","),
    [favoriteIds]
  );

  const loadFavorites = () => {
    if (!isAuthenticated) {
      setItems([]);
      setLoading(false);
      setRefreshing(false);
      setError(null);
      return;
    }

    let alive = true;
    setLoading(true);
    setError(null);

    Promise.all(favoriteIds.map((id) => fetchProductById(id).catch(() => null)))
      .then((results) => {
        if (!alive) return;
        const map = new Map<string, Product>();
        results.forEach((prod) => {
          if (prod) map.set(prod.id, prod);
        });
        const ordered = favoriteIds
          .map((id) => map.get(id))
          .filter((prod): prod is Product => Boolean(prod));
        setItems(ordered);
      })
      .catch((err: any) => {
        if (!alive) return;
        setError(err?.message ?? "Failed to load favorites");
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
        setRefreshing(false);
      });

    return () => {
      alive = false;
    };
  };

  useEffect(() => {
    const cleanup = loadFavorites();
    return () => {
      cleanup?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, favoritesKey]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadFavorites();
  };

  const handleAuthPrompt = () => {
    Alert.alert(
      "Sign in required",
      "Log in or register to manage your favorites."
    );
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={{ paddingHorizontal: spacing.xl, marginBottom: spacing.lg }}>
      <ProductCard
        variant="favorite"
        title={item.title}
        price={item.price}
        imageUrl={item.imageUrl}
        favorite
        onToggleFavorite={() =>
          dispatch(toggleFavorite({ productId: item.id }))
        }
        onPress={() => router.push(toProductModal(item.id))}
        onAddToCart={() => dispatch(addItem(item.id))}
        inCart={cartItems.some((it) => it.productId === item.id)}
      />
    </View>
  );

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <View
          style={{ padding: spacing.xl, alignItems: "center", gap: spacing.md }}
        >
          <Text style={{ textAlign: "center", marginBottom: spacing.md }}>
            Sign in to view and manage your favorite patterns.
          </Text>
          <PrimaryButton
            title="Log in"
            variant="outline"
            onPress={handleAuthPrompt}
            fullWidth
          />
          <PrimaryButton
            title="Register"
            onPress={handleAuthPrompt}
            fullWidth
          />
        </View>
      </SafeAreaView>
    );
  }

  if (loading && items.length === 0) {
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
        renderItem={renderItem}
        ListEmptyComponent={
          <Text
            style={{ opacity: 0.6, textAlign: "center", marginTop: spacing.xl }}
          >
            {error ?? "No favorites yet"}
          </Text>
        }
        onRefresh={handleRefresh}
        refreshing={refreshing}
        contentContainerStyle={{
          paddingTop: spacing.lg,
          paddingBottom: spacing.xl,
        }}
      />
    </SafeAreaView>
  );
}
