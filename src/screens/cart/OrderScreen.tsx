import { ScreenWithFooter } from "@/shared/ui/ScreenWithFooter";
import { PrimaryButton } from "@/shared/ui/PrimaryButton";
import { OrderStepper } from "@/features/cart/ui/OrderStepper";
import { useTheme } from "@/providers/theme/ThemeContext";
import { palette } from "@shared/lib/palette";
import { spacing } from "@/shared/lib/tokens";
import { router } from "expo-router";
import { View, Alert } from "react-native";
import { Text } from "@shared/ui/Text";
import { useCartStepNav } from "@/features/cart/lib/useCartStepNav";
import { toCartSuccess } from "@/navigation/routes";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "@/features/cart/model/selectors";
import { clear } from "@/store/cartSlice";
import { fetchProductById } from "@/entities/product/api";
import { useEffect, useState } from "react";
import { selectIsAuthenticated } from "@/entities/user/model";
import type { AppDispatch } from "@/store";

export default function OrderScreen() {
  const { currentTheme: scheme } = useTheme();
  const p = palette[scheme];
  const goToStep = useCartStepNav();
  const currentStep = 1;
  const items = useSelector(selectCartItems);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch<AppDispatch>();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let alive = true;
    Promise.all(
      items.map((it) => fetchProductById(it.productId).catch(() => null))
    ).then((res) => {
      if (!alive) return;
      const sum = res.reduce((acc, prod) => {
        if (!prod) return acc;
        const q = items.find((i) => i.productId === prod.id)?.qty ?? 0;
        return acc + (prod.price ?? 0) * q;
      }, 0);
      setTotal(sum);
    });
    return () => {
      alive = false;
    };
  }, [items]);

  const handleAuthPrompt = () => {
    Alert.alert("Sign in required", "Log in or sign up to place your order.");
  };

  const handleContinue = () => {
    if (!isAuthenticated) {
      handleAuthPrompt();
      return;
    }
    dispatch(clear());
    router.push(toCartSuccess(total));
  };

  return (
    <ScreenWithFooter
      footer={{
        label: isAuthenticated ? "Continue" : "Log in",
        onPress: handleContinue,
        disabled: items.length === 0,
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
      {!isAuthenticated && (
        <View style={{ marginTop: spacing.lg, gap: spacing.sm }}>
          <Text style={{ color: p.neutral.light.light, opacity: 0.9 }}>
            Sign in to continue with checkout.
          </Text>
          <PrimaryButton
            title="Log in"
            variant="outline"
            onPress={handleAuthPrompt}
            fullWidth
          />
          <PrimaryButton title="Sign Up" onPress={handleAuthPrompt} fullWidth />
        </View>
      )}
    </ScreenWithFooter>
  );
}
