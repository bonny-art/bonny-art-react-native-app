import type { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { palette } from "@shared/lib/palette";

export function getCartStackOptions(
  scheme: keyof typeof palette,
  insetsTop: number
): NativeStackNavigationOptions {
  return {
    headerShown: true,
    contentStyle: { backgroundColor: "transparent" },
  };
}
