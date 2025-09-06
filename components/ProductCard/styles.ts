import { StyleSheet } from "react-native";
import { vscale, mscale } from "@/constants/responsive";

export const styles = StyleSheet.create({
  card: {
    borderRadius: mscale(14),
    overflow: "hidden",
  },

  // для Favorites трохи більший бордер/тінь
  cardFavorite: {
    borderRadius: mscale(16),
  },

  imageWrap: {
    width: "100%",
    borderTopLeftRadius: mscale(14),
    borderTopRightRadius: mscale(14),
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  image: { width: "100%", height: "100%" },

  placeholder: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  favBtn: {
    position: "absolute",
    right: mscale(10),
    top: mscale(10),
    width: mscale(28),
    height: mscale(28),
    borderRadius: mscale(28) / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  // у Favorites серце не накладається на фото
  favBtnOutside: {
    position: "relative",
    right: undefined,
    top: undefined,
    marginLeft: mscale(8),
  },

  meta: {
    paddingHorizontal: mscale(12),
    paddingVertical: mscale(10),
    gap: mscale(4),
  },
  title: { fontWeight: "600" },
  price: { fontWeight: "400" },

  metaFav: {
    padding: mscale(12),
    gap: mscale(10),
  },

  cartBtn: {
    marginTop: mscale(10),
    borderRadius: mscale(12),
    alignItems: "center",
    justifyContent: "center",
    height: vscale(40),
  },
  cartText: {
    fontWeight: "700",
  },
});
