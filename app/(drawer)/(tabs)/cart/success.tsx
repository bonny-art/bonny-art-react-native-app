import { ScreenWithFooter } from "@/components/ui/layout/ScreenWithFooter";
import OrderStepper from "@/components/ui/OrderStepper";
import { palette } from "@/constants/palette";
import { useCartStepNav } from "@/hooks/navigation/useCartStepNav";
import { useColorScheme } from "@/hooks/useColorScheme";
import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function SuccessScreen() {
  const scheme = (useColorScheme() ?? "light") as keyof typeof palette;
  const p = palette[scheme];

  const goToStep = useCartStepNav();
  const currentStep = 2;

  return (
    <ScreenWithFooter
      footer={{
        label: "Go to Home",
        onPress: () => router.replace("/(drawer)/(tabs)"),
      }}
      scroll={false}
    >
      <OrderStepper
        steps={["Your cart", "Order", "Success"]}
        currentStep={currentStep}
        onStepPress={(i) => {
          if (i <= currentStep) goToStep(i);
        }}
        showLabels
      />

      <View style={{ marginTop: 24, gap: 12 }}>
        <Text
          style={{
            color: p.neutral.light.light,
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          Order Confirmed!
        </Text>
        <Text style={{ color: p.neutral.light.dark }}>
          Our manager will contact you shortly to provide payment details and
          complete the process.
        </Text>
      </View>
    </ScreenWithFooter>
  );
}
