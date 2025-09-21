import type { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { palette } from "@shared/lib/palette";

/**
 * Creates default stack options for the cart flow, honoring the active theme.
 */
export function getCartStackOptions(
  scheme: keyof typeof palette,
  insetsTop: number
): NativeStackNavigationOptions {
  return {
    headerShown: true,
    contentStyle: { backgroundColor: "transparent" },
  };
}
