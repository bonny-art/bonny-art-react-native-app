import React from "react";
import { SafeAreaView, View } from "react-native";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import { spacing } from "@/constants/tokens";
import { router } from "expo-router";

export default function CartScreen() {
  return (
    <SafeAreaView style={{ flex: 1, padding: spacing.xl }}>
      {/* TODO: список позицій + сума */}
      <View style={{ marginTop: "auto" }}>
        <PrimaryButton
          title="Checkout"
          onPress={() => router.push("/(drawer)/(tabs)/cart/order")}
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
}
