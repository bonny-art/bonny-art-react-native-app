import { mscale, vscale } from "@shared/lib/responsive";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    borderRadius: mscale(14),
    overflow: "hidden",
  },

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

  // кругла кнопка на фото (для tile)
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

  // heart у футері (без фону)
  favBtnInline: {
    padding: mscale(6),
    alignItems: "center",
    justifyContent: "center",
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

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: mscale(8),
  },

  cartBtn: {
    marginTop: mscale(2),
    borderRadius: mscale(12),
    height: vscale(40),
    alignItems: "center",
    justifyContent: "center",
  },
  cartText: {
    fontWeight: "700",
  },
});
