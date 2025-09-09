import { palette } from "@shared/lib/palette";
import { font } from "@shared/lib/responsive";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { BADGE, metricsForSize } from "./constants";
import type { UserAvatarSize } from "./types";

type ThemeName = keyof typeof palette;

export type AvatarStyles = {
  container: ViewStyle;
  frame: ViewStyle;
  image: ImageStyle;
  placeholderBase: ViewStyle;
  placeholderPad: ViewStyle;
  initials: TextStyle;
  badge: ViewStyle;
};

export function makeAvatarStyles(
  theme: ThemeName,
  size: UserAvatarSize
): AvatarStyles {
  const p = palette[theme];
  const m = metricsForSize(size);
  const overlap = BADGE.size * 0.15;

  return StyleSheet.create({
    container: {
      width: m.w,
      height: m.h,
      alignItems: "center",
      justifyContent: "center",
      overflow: "visible",
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
      paddingTop: m.pad.t,
      paddingRight: m.pad.r,
      paddingBottom: m.pad.b,
      paddingLeft: m.pad.l,
      width: "100%",
      height: "100%",
    },
    initials: {
      color: p.neutral.dark.lightest,
      fontWeight: "700",
      fontSize: font(size === "lg" ? 28 : size === "md" ? 22 : 16),
      lineHeight: font(size === "lg" ? 32 : size === "md" ? 26 : 18),
      textAlign: "center",
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
