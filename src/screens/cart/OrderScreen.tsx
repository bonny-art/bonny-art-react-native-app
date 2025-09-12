import { ScreenWithFooter } from "@/shared/ui/ScreenWithFooter";
import { OrderStepper } from "@/features/cart/ui/OrderStepper";
import { useTheme } from "@/providers/theme/ThemeContext";
import { palette } from "@shared/lib/palette";
import { router } from "expo-router";
import { View } from "react-native";
import { Text } from "@shared/ui/Text";
import { useCartStepNav } from "@/features/cart/lib/useCartStepNav";
import { toCartSuccess } from "@/navigation/routes";

export default function OrderScreen() {
  const { currentTheme: scheme } = useTheme();
  const p = palette[scheme];
  const goToStep = useCartStepNav();
  const currentStep = 1;

  return (
    <ScreenWithFooter
      footer={{
        label: "Continue",
        onPress: () => router.push(toCartSuccess()),
      }}
      scroll
    >
      <OrderStepper
        steps={["Your cart", "Order", "Success"]}
        currentStep={currentStep}
        showLabels
        onStepPress={(i: number) => {
          if (i <= currentStep) goToStep(i);
        }}
      />
      <View style={{ marginTop: 16, gap: 12 }}>
        <Text style={{ color: p.neutral.light.light, opacity: 0.9 }}>
          Choose a payment method (placeholder)
        </Text>
        {/* TODO: форма/метод оплати */}
      </View>
    </ScreenWithFooter>
  );
}
