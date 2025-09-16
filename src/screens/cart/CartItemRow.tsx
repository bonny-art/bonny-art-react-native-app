import React from "react";
import { View, Image } from "react-native";

import { spacing } from "@/shared/lib/tokens";
import { useTheme } from "@/providers/theme/ThemeContext";
import { palette } from "@/shared/lib/palette";
import { Text } from "@/shared/ui/Text";
import { IconButton } from "@/shared/ui/IconButton";

import type { CartItem } from "@/store/cartSlice";
import type { Product } from "@/entities/product/model";

export type ItemWithProduct = CartItem & { product: Product };

interface Props {
  item: ItemWithProduct;
  onIncrement: () => void;
  onDecrement: () => void;
}

function CartItemRowComponent({ item, onIncrement, onDecrement }: Props) {
  const { currentTheme: scheme } = useTheme();
  const p = palette[scheme];

  const textPrimary = p.neutral.light.light;
  const textSecondary = p.neutral.light.dark;
  const placeholderBg = p.neutral.dark.medium;

  return (
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
          {`${item.product.width ?? "—"}x${item.product.height ?? "—"}`}
        </Text>
        <Text style={{ color: textSecondary, marginTop: 2 }}>
          {`${item.product.colors ?? "—"}-${item.product.solids ?? "—"}-${
            item.product.blends ?? "—"
          }`}
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
            onPress={onDecrement}
          />
          <Text style={{ color: textPrimary }}>{item.qty}</Text>
          <IconButton
            icon="plus"
            size="sm"
            variant="outline"
            onPress={onIncrement}
          />
        </View>
      </View>

      <Text style={{ color: textPrimary }}>
        ${item.product.price.toFixed(2)}
      </Text>
    </View>
  );
}

export const CartItemRow = React.memo(CartItemRowComponent);
