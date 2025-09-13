import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { router } from "expo-router";

import { PrimaryButton } from "@/shared/ui/PrimaryButton";
import { Text } from "@/shared/ui/Text";

import { spacing } from "@/shared/lib/tokens";
import { useTheme } from "@/providers/theme/ThemeContext";
import { palette } from "@/shared/lib/palette";
import { IconButton } from "@/shared/ui/IconButton";

import { selectCartItems } from "@/features/cart/model/selectors";
import {
  addItem,
  updateQuantity,
  type CartItem,
} from "@/features/cart/model/cartSlice";
import { fetchProductById } from "@/entities/product/api";
import type { Product } from "@/entities/product/model";
import { toCartOrder } from "@/navigation/routes";

type ItemWithProduct = CartItem & { product: Product };

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
  const textSecondary = p.neutral.light.dark;
  const placeholderBg = p.neutral.dark.medium;

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
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: spacing.lg,
                  gap: spacing.md,
                }}
              >
                {item.product.imageUrl ? (
                  <Image
                    source={{ uri: item.product.imageUrl }}
                    style={{ width: 72, height: 72, borderRadius: 8 }}
                  />
                ) : (
                  <View
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: 8,
                      backgroundColor: placeholderBg,
                    }}
                  />
                )}

                <View style={{ flex: 1 }}>
                  <Text style={{ color: textPrimary }} numberOfLines={2}>
                    {item.product.title}
                  </Text>
                  <Text style={{ color: textSecondary, marginTop: 2 }}>
                    {`${item.product.width ?? "—"}x${
                      item.product.height ?? "—"
                    }`}
                  </Text>
                  <Text style={{ color: textSecondary, marginTop: 2 }}>
                    {`${item.product.colors ?? "—"}-${
                      item.product.solids ?? "—"
                    }-${item.product.blends ?? "—"}`}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: spacing.sm,
                      gap: spacing.sm,
                    }}
                  >
                    <IconButton
                      icon="minus"
                      size="sm"
                      variant="outline"
                      onPress={() =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: item.quantity - 1,
                          })
                        )
                      }
                    />
                    <Text style={{ color: textPrimary }}>{item.quantity}</Text>
                    <IconButton
                      icon="plus"
                      size="sm"
                      variant="outline"
                      onPress={() => dispatch(addItem(item.id))}
                    />
                  </View>
                </View>

                <Text style={{ color: textPrimary }}>
                  ${item.product.price.toFixed(2)}
                </Text>
              </View>
            )}
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
