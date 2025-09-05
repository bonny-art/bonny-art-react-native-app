import { StyleSheet, TextStyle, ViewStyle, ImageStyle } from "react-native";
import { palette } from "@/constants/palette";
import { BADGE, metricsForSize } from "./constants";
import type { UserAvatarSize } from "./types";
import { font } from "@/constants/responsive";

type ThemeName = keyof typeof palette;

export type AvatarStyles = {
  container: ViewStyle; // оболонка (не обрізає)
  frame: ViewStyle; // сам “квадрат із радіусом”, обрізає фото
  image: ImageStyle;
  placeholderBase: ViewStyle;
  placeholderPad: ViewStyle; // паддінги тільки для плейсхолдера
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
      overflow: "visible", // бейдж не обрізаємо
    },
    frame: {
      width: m.w,
      height: m.h,
      borderRadius: m.r,
      overflow: "hidden", // обрізаємо лише контент
      backgroundColor: p.highlight.lightest, // ⬅️ кремовий з макету
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
