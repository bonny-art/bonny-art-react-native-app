import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { router, useNavigation } from "expo-router";

import { Text } from "@shared/ui/Text";
import { PrimaryButton } from "@/shared/ui/PrimaryButton";
import { ProductCard } from "@/entities/product/ui/ProductCard";
import { IconButton } from "@/shared/ui/IconButton";
import { spacing, typography } from "@/shared/lib/tokens";
import { InfoBar } from "@/widgets/InfoBar";
import { toCartIndex, toProductModal, toTabsRoot } from "@/navigation/routes";

import { fetchProductById } from "@/entities/product/api";
import type { Product } from "@/entities/product/model";

import { addItem } from "@/store/cartSlice";
import {
  selectCartCount,
  selectCartItems,
} from "@/features/cart/model/selectors";

import {
  selectFavoriteProductIds,
  selectIsAuthenticated,
} from "@/entities/user/model";
import { toggleFavorite } from "@/store/authSlice";
import type { AppDispatch } from "@/store";

export default function FavoritesScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const cartItems = useSelector(selectCartItems);
  const cartCount = useSelector(selectCartCount);
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

  const handleCartNav = () => {
    router.push(toCartIndex());
  };

  const handleBack = () => {
    if (
      typeof navigation?.canGoBack === "function" &&
      navigation.canGoBack() &&
      typeof navigation.goBack === "function"
    ) {
      navigation.goBack();
      return;
    }
    router.replace(toTabsRoot());
  };

  const Header = () => (
    <View style={styles.headerWrapper}>
      <View style={styles.headerRow}>
        <IconButton
          icon="chevron-left"
          variant="ghost"
          size="md"
          onPress={handleBack}
          accessibilityLabel="Back to Explore"
        />
        <Text style={styles.headerTitle}>Favorites</Text>
      </View>
    </View>
  );

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
      <SafeAreaView style={{ flex: 1 }}>
        <InfoBar
          onSearch={() => {}}
          onFavorites={() => {}}
          favoritesSelected
          onCart={handleCartNav}
          cartCount={cartCount}
        />

        <Header />

        <View style={styles.unauthContainer}>
          <Text style={styles.unauthMessage}>
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
        <InfoBar
          onSearch={() => {}}
          onFavorites={() => {}}
          favoritesSelected
          onCart={handleCartNav}
          cartCount={cartCount}
        />

        <Header />

        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <InfoBar
        onSearch={() => {}}
        onFavorites={() => {}}
        favoritesSelected
        onCart={handleCartNav}
        cartCount={cartCount}
      />

      <FlatList
        style={{ flex: 1 }}
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
        ListHeaderComponent={Header}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        contentContainerStyle={{
          paddingBottom: spacing.xl,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    ...typography.heading.h1,
    marginLeft: spacing.md,
    color: "white",
  },
  unauthContainer: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
  },
  unauthMessage: {
    textAlign: "center",
    marginBottom: spacing.md,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
