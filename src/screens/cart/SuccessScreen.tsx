// src/screens/cart/SuccessScreen.tsx
import { ScreenWithFooter } from "@/shared/ui/ScreenWithFooter";
import { OrderStepper } from "@/features/cart/ui/OrderStepper";
import { useCartStepNav } from "@/features/cart/lib/useCartStepNav";
import { useColorScheme } from "@shared/hooks/useColorScheme";
import { palette } from "@shared/lib/palette";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { toTabsRoot } from "@/navigation/routes";

export default function SuccessScreen() {
  const scheme = (useColorScheme() ?? "light") as keyof typeof palette;
  const p = palette[scheme];
  const goToStep = useCartStepNav();
  const currentStep = 2;

  return (
    <ScreenWithFooter
      footer={{
        label: "Go to Home",
        onPress: () => router.replace(toTabsRoot()),
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
