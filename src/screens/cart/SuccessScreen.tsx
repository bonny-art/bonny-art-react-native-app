import { ScreenWithFooter } from "@/shared/ui/ScreenWithFooter";
import { OrderStepper } from "@/features/cart/ui/OrderStepper";
import { useCartStepNav } from "@/features/cart/lib/useCartStepNav";
import { useTheme } from "@/providers/theme/ThemeContext";
import { palette } from "@shared/lib/palette";
import { router, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { Text } from "@shared/ui/Text";
import { toTabsRoot } from "@/navigation/routes";
import { typography } from "@/shared/config";

export default function SuccessScreen() {
  const { currentTheme: scheme } = useTheme();
  const p = palette[scheme];
  const goToStep = useCartStepNav();
  const currentStep = 2;
  const { total: totalParam } = useLocalSearchParams<{ total?: string }>();
  const total = typeof totalParam === "string" ? parseFloat(totalParam) : 0;

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

      <View style={{ marginTop: 24, gap: 16 }}>
        <Text
          style={{
            color: p.neutral.light.light,
            ...typography.heading.h2,
            fontWeight: "600",
          }}
        >
          Order Confirmed!
        </Text>
        <Text style={{ color: p.neutral.light.dark }}>
          Your order has been successfully placed.
        </Text>
        <View
          style={{
            backgroundColor: p.neutral.dark.medium,
            padding: 16,
            borderRadius: 8,
            gap: 4,
          }}
        >
          <Text style={{ color: p.neutral.light.light, fontWeight: "600" }}>
            Order info
          </Text>
          <Text style={{ color: p.neutral.light.light }}>
            Order Number: #PS-2025-184
          </Text>
          <Text style={{ color: p.neutral.light.light }}>
            Total: ${total.toFixed(2)}
          </Text>
          <Text style={{ color: p.neutral.light.light }}>
            Status: Pending confirmation
          </Text>
        </View>
        <Text style={{ color: p.neutral.light.dark }}>
          Our manager will contact you shortly to provide payment details and
          complete the process. Please check your email and phone for updates.
        </Text>
      </View>
    </ScreenWithFooter>
  );
}
