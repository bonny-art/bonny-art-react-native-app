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
import { toCartOrder } from "@/navigation/routes";

export default function CartScreen() {
  const items = useSelector(selectCartItems);

  const dispatch = useDispatch();
  const { currentTheme: scheme } = useTheme();
  const p = palette[scheme];

  const [products, setProducts] = useState<Record<string, Product>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      const results = await Promise.all(
        items.map((it) => fetchProductById(it.id).catch(() => null))
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
        .map((it) => ({ ...it, product: products[it.id] }))
        .filter((x): x is ItemWithProduct => Boolean(x.product)),
    [items, products]
  );

  const total = useMemo(
    () =>
      data.reduce((sum, { product, quantity }) => {
        return sum + (product.price ?? 0) * quantity;
      }, 0),
    [data]
  );

  const textPrimary = p.neutral.light.light;

  const handleIncrement = useCallback(
    (id: string) => {
      dispatch(addItem(id));
    },
    [dispatch]
  );

  const handleDecrement = useCallback(
    (id: string, quantity: number) => {
      dispatch(updateQuantity({ id, quantity }));
    },
    [dispatch]
  );

  const renderItem = useCallback(
    ({ item }: { item: ItemWithProduct }) => (
      <CartItemRow
        item={item}
        onIncrement={() => handleIncrement(item.id)}
        onDecrement={() => handleDecrement(item.id, item.quantity - 1)}
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
            keyExtractor={(it) => it.id}
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
        <PrimaryButton
          title="Checkout"
          onPress={() => router.push(toCartOrder())}
          fullWidth
          disabled={data.length === 0}
        />
      </View>
    </SafeAreaView>
  );
}
