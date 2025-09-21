import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { router } from "expo-router";

import { useTheme } from "@/providers/theme/ThemeContext";
import { PrimaryButton } from "@/shared/ui/PrimaryButton";
import { Text } from "@/shared/ui/Text";

import { addItem, updateQuantity } from "@/store/cartSlice";
import { selectCartItems } from "@/features/cart/model/selectors";
import { fetchProductById } from "@/entities/product/api";
import type { Product } from "@/entities/product/model";
import { PATHS, toCartOrder } from "@/navigation/routes";
import { selectIsAuthenticated } from "@/entities/user/model";
import type { AppDispatch } from "@/store";

import { CartItemRow, type ItemWithProduct } from "../CartItemRow";
import {
  EMPTY_CART_MESSAGE,
  LOGIN_PROMPT_MESSAGE,
  TOTAL_LABEL,
} from "./constants";
import { makeStyles } from "./styles";
import type { RenderCartItem } from "./types";

/**
 * Cart screen showing line items, totals, and checkout navigation.
 */
export default function CartScreen() {
  const items = useSelector(selectCartItems);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const dispatch = useDispatch<AppDispatch>();
  const { currentTheme: scheme } = useTheme();
  const styles = makeStyles(scheme);

  const [products, setProducts] = useState<Record<string, Product>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      const results = await Promise.all(
        items
          .map((it) => it.productId)
          .map((id) => fetchProductById(id).catch(() => null))
      );
      if (!alive) return;
      const map: Record<string, Product> = {};
      results.forEach((prod) => {
        if (prod) map[prod.id] = prod;
      });
      setProducts(map);
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, [items]);

  const data: ItemWithProduct[] = useMemo(
    () =>
      items
        .map((it) => ({ ...it, product: products[it.productId] }))
        .filter((x): x is ItemWithProduct => Boolean(x.product)),
    [items, products]
  );

  const total = useMemo(
    () =>
      data.reduce((sum, { product, qty }) => {
        return sum + (product.price ?? 0) * qty;
      }, 0),
    [data]
  );

  const handleIncrement = useCallback(
    (productId: string) => {
      dispatch(addItem(productId));
    },
    [dispatch]
  );

  const handleDecrement = useCallback(
    (productId: string, nextQty: number) => {
      dispatch(updateQuantity({ productId, qty: nextQty }));
    },
    [dispatch]
  );

  const handleLoginRedirect = useCallback(() => {
    router.push(PATHS.AUTH_LOGIN);
  }, []);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      handleLoginRedirect();
      return;
    }
    router.push(toCartOrder());
  };

  const renderItem = useCallback(
    ({ item }: RenderCartItem) => (
      <CartItemRow
        item={item}
        onIncrement={() => handleIncrement(item.productId)}
        onDecrement={() => handleDecrement(item.productId, item.qty - 1)}
      />
    ),
    [handleIncrement, handleDecrement]
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.listContainer}>
        {loading && data.length === 0 ? (
          <View style={styles.centered}>
            <ActivityIndicator />
          </View>
        ) : data.length === 0 ? (
          <View style={styles.centered}>
            <Text style={styles.emptyMessage}>{EMPTY_CART_MESSAGE}</Text>
          </View>
        ) : (
          <FlatList
            data={data}
            keyExtractor={(it) => it.productId}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <View style={styles.footer}>
        <View style={styles.totalsRow}>
          <Text style={styles.totalLabel}>{TOTAL_LABEL}</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>
        {!isAuthenticated && (
          <View style={styles.loginPrompt}>
            <Text style={styles.loginPromptText}>{LOGIN_PROMPT_MESSAGE}</Text>
          </View>
        )}
        <PrimaryButton
          title={isAuthenticated ? "Checkout" : "Log in"}
          onPress={isAuthenticated ? handleCheckout : handleLoginRedirect}
          fullWidth
          disabled={isAuthenticated ? data.length === 0 : false}
        />
      </View>
    </SafeAreaView>
  );
}
