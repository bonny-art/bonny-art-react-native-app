import { palette } from "@shared/lib/palette";
import { ImageStyle, StyleSheet, ViewStyle } from "react-native";
import { BADGE, metricsForSize } from "./constants";
import type { UserAvatarSize } from "./types";

type ThemeName = keyof typeof palette;

export type AvatarStyles = {
  container: ViewStyle;
  frame: ViewStyle;
  image: ImageStyle;
  placeholderBase: ViewStyle;
  placeholderPad: ViewStyle;
  badge: ViewStyle;
};

/**
 * Generates themed styles for the user avatar component based on size.
 */
export function makeAvatarStyles(
  theme: ThemeName,
  size: UserAvatarSize
): AvatarStyles {
  const p = palette[theme];
  const m = metricsForSize(size);
  const overlap = BADGE.size * BADGE.overlap;

  return StyleSheet.create({
    container: {
      width: m.w,
      height: m.h,
      alignItems: "center",
      justifyContent: "center",
    },
    frame: {
      width: m.w,
      height: m.h,
      borderRadius: m.r,
      overflow: "hidden",
      backgroundColor: p.highlight.lightest,
      alignItems: "center",
      justifyContent: "center",
    },
    image: { width: "100%", height: "100%" },
    placeholderBase: { alignItems: "center", justifyContent: "center" },
    placeholderPad: {
      paddingTop: m.pad.top,
      paddingRight: m.pad.right,
      paddingBottom: m.pad.bottom,
      paddingLeft: m.pad.left,
      width: "100%",
      height: "100%",
    },
    badge: {
      position: "absolute",
      right: -overlap,
      bottom: -overlap,
      width: BADGE.size,
      height: BADGE.size,
      borderRadius: BADGE.size / 2,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: p.highlight.medium,
    },
  });
}
