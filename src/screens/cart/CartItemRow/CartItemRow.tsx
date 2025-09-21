import React from "react";
import { Image, View } from "react-native";

import { useTheme } from "@/providers/theme/ThemeContext";
import { IconButton } from "@/shared/ui/IconButton";
import { Text } from "@/shared/ui/Text";

import { makeStyles } from "./styles";
import type { CartItemRowProps } from "./types";

/**
 * Renders a cart list row with product details and quantity controls.
 */
function CartItemRowComponent({
  item,
  onIncrement,
  onDecrement,
}: CartItemRowProps) {
  const { currentTheme: scheme } = useTheme();
  const styles = makeStyles(scheme);
  const { product } = item;

  return (
    <View style={styles.root}>
      {product.imageUrl ? (
        <Image source={{ uri: product.imageUrl }} style={styles.image} />
      ) : (
        <View style={styles.placeholder} />
      )}

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.meta}>
          {`${product.width ?? "—"}x${product.height ?? "—"}`}
        </Text>
        <Text style={styles.meta}>
          {`${product.colors ?? "—"}-${product.solids ?? "—"}-${
            product.blends ?? "—"
          }`}
        </Text>

        <View style={styles.quantityRow}>
          <IconButton
            icon="minus"
            size="sm"
            variant="outline"
            onPress={onDecrement}
          />
          <Text style={styles.quantity}>{item.qty}</Text>
          <IconButton
            icon="plus"
            size="sm"
            variant="outline"
            onPress={onIncrement}
          />
        </View>
      </View>

      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
    </View>
  );
}

/**
 * Memoized cart item row to prevent unnecessary re-renders.
 */
export const CartItemRow = React.memo(CartItemRowComponent);
