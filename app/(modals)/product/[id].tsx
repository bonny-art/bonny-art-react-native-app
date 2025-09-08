import React from "react";
import { View, Text, Pressable } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import { spacing } from "@/constants/tokens";

export default function ProductModal() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View style={{ flex: 1, padding: spacing.xl }}>
      <Pressable
        onPress={() => router.back()}
        style={{ alignSelf: "flex-end" }}
      >
        <Text>Close</Text>
      </Pressable>
      <Text
        style={{ fontWeight: "700", fontSize: 18, marginVertical: spacing.md }}
      >
        Product #{id}
      </Text>
      {/* TODO: галерея, опис, ціна */}
      <PrimaryButton
        title="Add to cart"
        onPress={() => {
          /* addToCart(id) */
        }}
        fullWidth
      />
    </View>
  );
}
