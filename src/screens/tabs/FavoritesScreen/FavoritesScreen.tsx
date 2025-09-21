import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, View } from "react-native";
import { router, useNavigation } from "expo-router";
import { useDispatch, useSelector } from "react-redux";

import { useTheme } from "@/providers/theme/ThemeContext";
import { palette } from "@shared/lib/palette";
import { spacing } from "@shared/lib/tokens";
import { Text } from "@shared/ui/Text";
import { PrimaryButton } from "@/shared/ui/PrimaryButton";
import { ProductCard } from "@/entities/product/ui/ProductCard";
import { IconButton } from "@/shared/ui/IconButton";
import { InfoBar } from "@/widgets/InfoBar";
import {
  PATHS,
  toCartIndex,
  toProductModal,
  toTabsRoot,
} from "@/navigation/routes";

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

import { makeStyles } from "./styles";
import type { FavoritesScreenProps } from "./types";
import {
  BACK_BUTTON_ACCESSIBILITY_LABEL,
  EMPTY_STATE_MESSAGE,
  LOAD_ERROR_MESSAGE,
  SCREEN_TITLE,
  UNAUTH_MESSAGE,
} from "./constants";

/**
 * Screen that lists favorited products with actions for cart and authentication.
 */
export default function FavoritesScreen(_props: FavoritesScreenProps) {
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

  const { currentTheme } = useTheme();
  const scheme = currentTheme as keyof typeof palette;
  const styles = useMemo(() => makeStyles(scheme), [scheme]);
  const activityColor = palette[scheme].highlight.medium;

  const favoritesKey = useMemo(
    () => favoriteIds.slice().sort().join(","),
    [favoriteIds]
  );

  const loadFavorites = useCallback(() => {
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
        setError(err?.message ?? LOAD_ERROR_MESSAGE);
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
        setRefreshing(false);
      });

    return () => {
      alive = false;
    };
  }, [favoriteIds, isAuthenticated]);

  useEffect(() => {
    const cleanup = loadFavorites();
    return () => {
      cleanup?.();
    };
  }, [loadFavorites, favoritesKey]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadFavorites();
  }, [loadFavorites]);

  const handleLogin = useCallback(() => {
    router.push(PATHS.AUTH_LOGIN);
  }, []);

  const handleSignUp = useCallback(() => {
    router.push(PATHS.AUTH_SIGN_UP);
  }, []);

  const handleCartNav = useCallback(() => {
    router.push(toCartIndex());
  }, []);

  const handleBack = useCallback(() => {
    if (
      typeof navigation?.canGoBack === "function" &&
      navigation.canGoBack() &&
      typeof navigation.goBack === "function"
    ) {
      navigation.goBack();
      return;
    }
    router.replace(toTabsRoot());
  }, [navigation]);

  const Header = useCallback(
    () => (
      <View style={styles.headerWrapper}>
        <View style={styles.headerRow}>
          <IconButton
            icon="chevron-left"
            variant="ghost"
            size="md"
            onPress={handleBack}
            accessibilityLabel={BACK_BUTTON_ACCESSIBILITY_LABEL}
          />
          <Text style={styles.headerTitle}>{SCREEN_TITLE}</Text>
        </View>
      </View>
    ),
    [handleBack, styles]
  );

  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
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
    ),
    [cartItems, dispatch]
  );

  const infoBarProps = useMemo(
    () => ({
      onFavorites: () => {},
      favoritesSelected: true,
      onCart: handleCartNav,
      cartCount,
      showSearchButton: false,
    }),
    [cartCount, handleCartNav]
  );

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <InfoBar {...infoBarProps} />

        <Header />

        <View style={styles.unauthContainer}>
          <Text style={styles.unauthMessage}>{UNAUTH_MESSAGE}</Text>
          <PrimaryButton
            title="Log in"
            variant="outline"
            onPress={handleLogin}
            fullWidth
          />
          <PrimaryButton title="Sign Up" onPress={handleSignUp} fullWidth />
        </View>
      </SafeAreaView>
    );
  }

  if (loading && items.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <InfoBar {...infoBarProps} />

        <Header />

        <View style={styles.loadingContainer}>
          <ActivityIndicator color={activityColor} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <InfoBar {...infoBarProps} />

      <FlatList
        style={styles.list}
        data={items}
        keyExtractor={(it) => it.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>{error ?? EMPTY_STATE_MESSAGE}</Text>
        }
        ListHeaderComponent={Header}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}
