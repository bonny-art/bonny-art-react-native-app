import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { router } from "expo-router";

import { PrimaryButton } from "@/shared/ui/PrimaryButton";
import { Text } from "@/shared/ui/Text";

import { spacing } from "@/shared/lib/tokens";
import { useTheme } from "@/providers/theme/ThemeContext";
import { palette } from "@/shared/lib/palette";
import { CartItemRow, type ItemWithProduct } from "./CartItemRow";

import { selectCartItems } from "@/features/cart/model/selectors";
import { addItem, updateQuantity } from "@/store/cartSlice";
import { fetchProductById } from "@/entities/product/api";
import type { Product } from "@/entities/product/model";
import { PATHS, toCartOrder } from "@/navigation/routes";
import { selectIsAuthenticated } from "@/entities/user/model";
import type { AppDispatch } from "@/store";

export default function CartScreen() {
  const items = useSelector(selectCartItems);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const dispatch = useDispatch<AppDispatch>();
  const { currentTheme: scheme } = useTheme();
  const p = palette[scheme];

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

  const textPrimary = p.neutral.light.light;

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
    ({ item }: { item: ItemWithProduct }) => (
      <CartItemRow
        item={item}
        onIncrement={() => handleIncrement(item.productId)}
        onDecrement={() => handleDecrement(item.productId, item.qty - 1)}
      />
    ),
    [handleIncrement, handleDecrement]
  );

  return (
    <SafeAreaView style={{ flex: 1, padding: spacing.xl }}>
      <View style={{ flex: 1 }}>
        {loading && data.length === 0 ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator />
          </View>
        ) : data.length === 0 ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text>Your cart is empty</Text>
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

      <View style={{ marginTop: "auto" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: spacing.md,
          }}
        >
          <Text style={{ color: textPrimary }}>Total</Text>
          <Text style={{ color: textPrimary }}>${total.toFixed(2)}</Text>
        </View>
        {!isAuthenticated && (
          <View style={{ marginBottom: spacing.md }}>
            <Text style={{ color: textPrimary, opacity: 0.8 }}>
              Log in to continue with your order.
            </Text>
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
