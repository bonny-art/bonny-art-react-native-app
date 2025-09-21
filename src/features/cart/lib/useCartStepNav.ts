import { useCallback } from "react";
import { router } from "expo-router";

const ROUTES = [
  "/(drawer)/(tabs)/cart", // 0 — Cart (index)
  "/(drawer)/(tabs)/cart/order", // 1 — Order
  "/(drawer)/(tabs)/cart/success", // 2 — Success
] as const;

/**
 * Returns a callback that navigates to the specified cart step by index.
 */
export function useCartStepNav() {
  return useCallback((i: number) => {
    const idx = Math.max(0, Math.min(i, ROUTES.length - 1));
    router.replace(ROUTES[idx]);
  }, []);
}
