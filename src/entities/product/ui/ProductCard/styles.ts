import { palette } from "@shared/lib/palette";
import { mscale, vscale } from "@shared/lib/responsive";
import { typography } from "@/shared/config";
import { StyleSheet } from "react-native";

type ThemeName = keyof typeof palette;

export const makeStyles = (scheme: ThemeName) => {
  const p = palette[scheme];

  return StyleSheet.create({
    card: {
      borderRadius: mscale(14),
      overflow: "hidden",
      backgroundColor: p.neutral.dark.medium,
    },

    cardFavorite: {
      borderRadius: mscale(16),
      backgroundColor: p.neutral.dark.light,
    },

    imageWrap: {
      width: "100%",
      borderTopLeftRadius: mscale(14),
      borderTopRightRadius: mscale(14),
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
      right: mscale(10),
      top: mscale(10),
      alignItems: "center",
      justifyContent: "center",
    },

    favBtnInline: {
      alignItems: "center",
      justifyContent: "center",
    },

    meta: {
      paddingHorizontal: mscale(12),
      paddingVertical: mscale(10),
      gap: mscale(4),
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
      padding: mscale(12),
      gap: mscale(10),
    },

    row: {
      flexDirection: "row",
      gap: mscale(8),
    },

    details: {
      flex: 1,
    },

    cartBtn: {
      marginTop: mscale(2),
      borderRadius: mscale(12),
      height: vscale(40),
      alignItems: "center",
      justifyContent: "center",
    },

    cartText: {},
  });
};

export type ProductCardStyles = ReturnType<typeof makeStyles>;
