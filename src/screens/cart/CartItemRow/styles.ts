import {
  StyleSheet,
  type ImageStyle,
  type TextStyle,
  type ViewStyle,
} from "react-native";

import { palette } from "@/shared/lib/palette";
import { spacing, typography } from "@/shared/lib/tokens";

import {
  CART_ITEM_IMAGE_RADIUS,
  CART_ITEM_IMAGE_SIZE,
  CART_ITEM_META_SPACING,
} from "./constants";

export type CartItemRowStyles = {
  root: ViewStyle;
  image: ImageStyle;
  placeholder: ViewStyle;
  content: ViewStyle;
  title: TextStyle;
  meta: TextStyle;
  quantityRow: ViewStyle;
  quantity: TextStyle;
  price: TextStyle;
};

type ThemeName = keyof typeof palette;

export const makeStyles = (theme: ThemeName): CartItemRowStyles => {
  const colors = palette[theme];

  return StyleSheet.create({
    root: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: spacing.lg,
      gap: spacing.md,
    },
    image: {
      width: CART_ITEM_IMAGE_SIZE,
      height: CART_ITEM_IMAGE_SIZE,
      borderRadius: CART_ITEM_IMAGE_RADIUS,
    },
    placeholder: {
      width: CART_ITEM_IMAGE_SIZE,
      height: CART_ITEM_IMAGE_SIZE,
      borderRadius: CART_ITEM_IMAGE_RADIUS,
      backgroundColor: colors.neutral.dark.medium,
    },
    content: {
      flex: 1,
    },
    title: {
      ...typography.heading.h4,
      color: colors.neutral.light.light,
    },
    meta: {
      ...typography.body.s,
      color: colors.neutral.light.dark,
      marginTop: CART_ITEM_META_SPACING,
    },
    quantityRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: spacing.sm,
      gap: spacing.sm,
    },
    quantity: {
      ...typography.body.m,
      color: colors.neutral.light.light,
    },
    price: {
      ...typography.body.m,
      color: colors.neutral.light.light,
    },
  });
};
