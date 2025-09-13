import { radius, typography } from "@/shared/lib/tokens";
import { mscale } from "@shared/lib/responsive";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // chip
  chipContainer: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radius.pill,
    paddingVertical: mscale(6),
    paddingHorizontal: mscale(8),
    gap: mscale(4),
  },

  // кнопка-тригер для відкриття модалки
  triggerContainer: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radius.md,
    height: mscale(36),
    paddingTop: mscale(8),
    paddingBottom: mscale(8),
    paddingLeft: mscale(12),
    paddingRight: mscale(8),
    gap: mscale(12),
    borderWidth: 0.5,
  },

  label: {
    ...typography.action.m,
  },

  leftIconWrap: {
    alignItems: "center",
    justifyContent: "center",
  },

  counter: {
    minWidth: mscale(18),
    height: mscale(18),
    paddingHorizontal: mscale(6),
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },

  counterText: {
    ...typography.caption.m,
    fontStyle: "normal",
    fontWeight: "700",
  },
});
