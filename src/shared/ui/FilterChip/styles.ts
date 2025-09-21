import { radius, sizes, typography } from "@/shared/lib/tokens";
import { mscale } from "@shared/lib/responsive";
import { StyleSheet } from "react-native";

/**
 * Lays out the chip variants used within filter controls.
 */
export const styles = StyleSheet.create({
  chipContainer: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radius.pill,
    paddingVertical: mscale(sizes.filterChip.paddingY),
    paddingHorizontal: mscale(sizes.filterChip.paddingX),
    gap: mscale(sizes.filterChip.gap),
  },

  triggerContainer: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radius.md,
    height: mscale(sizes.filterChip.triggerHeight),
    paddingTop: mscale(sizes.filterChip.triggerPaddingTop),
    paddingBottom: mscale(sizes.filterChip.triggerPaddingBottom),
    paddingLeft: mscale(sizes.filterChip.triggerPaddingLeft),
    paddingRight: mscale(sizes.filterChip.triggerPaddingRight),
    gap: mscale(sizes.filterChip.triggerGap),
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
    minWidth: mscale(sizes.filterChip.counterMinWidth),
    height: mscale(sizes.filterChip.counterHeight),
    paddingHorizontal: mscale(sizes.filterChip.counterPaddingX),
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },

  counterText: {
    ...typography.caption.m,
    fontStyle: "normal",
  },
});
