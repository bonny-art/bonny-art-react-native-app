import { palette } from "@shared/lib/palette";
import { mscale, vscale } from "@shared/lib/responsive";
import { StyleSheet } from "react-native";
import { radius, sizes, spacing, typography } from "@/shared/lib/tokens";

type ThemeName = keyof typeof palette;

/**
 * Produces themed styles for the product card variants.
 */
export const makeStyles = (scheme: ThemeName) => {
  const p = palette[scheme];

  return StyleSheet.create({
    card: {
      borderRadius: mscale(radius.mdPlus),
      overflow: "hidden",
      backgroundColor: p.neutral.dark.medium,
    },

    cardFavorite: {
      borderRadius: mscale(radius.lg),
      backgroundColor: p.neutral.dark.light,
    },

    imageWrap: {
      width: "100%",
      borderTopLeftRadius: mscale(radius.mdPlus),
      borderTopRightRadius: mscale(radius.mdPlus),
      overflow: "hidden",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: p.neutral.dark.light,
    },

    image: {
      width: "100%",
      height: "100%",
    },

    placeholder: {
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
    },

    favBtnTile: {
      position: "absolute",
      right: mscale(spacing.smPlus),
      top: mscale(spacing.smPlus),
      alignItems: "center",
      justifyContent: "center",
    },

    favBtnInline: {
      alignItems: "center",
      justifyContent: "center",
    },

    meta: {
      paddingHorizontal: mscale(spacing.md),
      paddingVertical: mscale(spacing.smPlus),
      gap: mscale(spacing.xs),
    },

    title: {
      ...typography.body.s,
      color: p.neutral.light.darkest,
    },

    price: {
      ...typography.body.m,
      color: p.neutral.light.light,
    },

    metaFav: {
      padding: mscale(spacing.md),
      gap: mscale(spacing.smPlus),
    },

    row: {
      flexDirection: "row",
      gap: mscale(spacing.sm),
    },

    details: {
      flex: 1,
    },

    cartBtn: {
      marginTop: mscale(spacing.xxs),
      borderRadius: mscale(radius.md),
      height: vscale(sizes.control.md),
      alignItems: "center",
      justifyContent: "center",
    },

    cartText: {},
  });
};

export type ProductCardStyles = ReturnType<typeof makeStyles>;
