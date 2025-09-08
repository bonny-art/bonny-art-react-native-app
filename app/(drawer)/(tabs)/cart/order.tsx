import React from "react";
import { View, Text } from "react-native";
import { router } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { palette } from "@/constants/palette";
import { ScreenWithFooter } from "@/components/ui/layout/ScreenWithFooter";
import OrderStepper from "@/components/ui/OrderStepper";

import { useCartStepNav } from "@/hooks/useCartStepNav";

export default function OrderScreen() {
  const scheme = (useColorScheme() ?? "light") as keyof typeof palette;
  const p = palette[scheme];

  const goToStep = useCartStepNav();
  const currentStep = 1;

  return (
    <ScreenWithFooter
      footer={{
        label: "Continue",
        onPress: () => router.push("/(drawer)/(tabs)/cart/success"),
      }}
      scroll
    >
      <OrderStepper
        steps={["Your cart", "Order", "Success"]}
        currentStep={currentStep}
        showLabels
        onStepPress={(i) => {
          if (i <= currentStep) goToStep(i);
        }}
      />

      {/* Контент між степпером і кнопкою */}
      <View style={{ marginTop: 16, gap: 12 }}>
        <Text style={{ color: p.neutral.light.light, opacity: 0.9 }}>
          Choose a payment method (placeholder)
        </Text>
        {/* TODO: поля форми, селект способу оплати тощо */}
      </View>
    </ScreenWithFooter>
  );
}
