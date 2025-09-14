import { ScreenWithFooter } from "@/shared/ui/ScreenWithFooter";
import { OrderStepper } from "@/features/cart/ui/OrderStepper";
import { useTheme } from "@/providers/theme/ThemeContext";
import { palette } from "@shared/lib/palette";
import { router } from "expo-router";
import { View } from "react-native";
import { Text } from "@shared/ui/Text";
import { useCartStepNav } from "@/features/cart/lib/useCartStepNav";
import { toCartSuccess } from "@/navigation/routes";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "@/features/cart/model/selectors";
import { clear } from "@/store/cartSlice";
import { fetchProductById } from "@/entities/product/api";
import { useEffect, useState } from "react";

export default function OrderScreen() {
  const { currentTheme: scheme } = useTheme();
  const p = palette[scheme];
  const goToStep = useCartStepNav();
  const currentStep = 1;
  const items = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let alive = true;
    Promise.all(
      items.map((it) => fetchProductById(it.id).catch(() => null))
    ).then((res) => {
      if (!alive) return;
      const sum = res.reduce((acc, prod) => {
        if (!prod) return acc;
        const q = items.find((i) => i.id === prod.id)?.quantity ?? 0;
        return acc + (prod.price ?? 0) * q;
      }, 0);
      setTotal(sum);
    });
    return () => {
      alive = false;
    };
  }, [items]);

  return (
    <ScreenWithFooter
      footer={{
        label: "Continue",
        onPress: () => {
          dispatch(clear());
          router.push(toCartSuccess(total));
        },
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
