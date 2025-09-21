import { StyleSheet } from "react-native";

import { typography } from "@/shared/lib/tokens";

/**
 * Applies the default body font family to text elements.
 */
export const styles = StyleSheet.create({
  base: { fontFamily: typography.body.m.fontFamily },
});
