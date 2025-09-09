import type { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { palette } from "@shared/lib/palette";

export function getCartStackOptions(
  scheme: keyof typeof palette,
  insetsTop: number
): NativeStackNavigationOptions {
  const p = palette[scheme];

  return {
    headerShown: true,
    // ми використовуємо кастомний header у самому лейауті — тут лише базові стилі
    contentStyle: { backgroundColor: "transparent" },
  };
}
