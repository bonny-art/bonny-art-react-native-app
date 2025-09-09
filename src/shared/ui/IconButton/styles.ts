import { palette } from "@shared/lib/palette";
import { StyleSheet } from "react-native";
import { BADGE, BORDER_WIDTH, DIAMETER } from "./constants";
import type { IconButtonSize } from "./types";

type ThemeName = keyof typeof palette;

export function makeBaseStyles(theme: ThemeName, size: IconButtonSize) {
  const p = palette[theme];
  const d = DIAMETER[size];

  return StyleSheet.create({
    root: {
      width: d,
      height: d,
      borderRadius: d / 2,
      alignItems: "center",
      justifyContent: "center",
    },

    badge: {
      position: "absolute",
      bottom: 4,
      right: 4,
      minWidth: BADGE.size,
      height: BADGE.size,
      paddingHorizontal: BADGE.padX,
      borderRadius: 999,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: p.highlight.medium,
    },
    badgeText: {
      color: p.neutral.dark.darkest,
      fontSize: 10,
      lineHeight: 12,
      fontWeight: "700",
    },
  });
}

export function computeColors(
  theme: ThemeName,
  opts: {
    variant: "solid" | "outline" | "ghost";
    selected?: boolean;
    disabled?: boolean;
  }
) {
  const p = palette[theme];
  const isDis = !!opts.disabled;

  // базові відтінки
  const fill = p.highlight.medium;
  const fillSel = p.highlight.darkest;
  const iconOnFill = p.neutral.dark.darkest;
  const stroke = p.highlight.medium;

  // неактивні кольори
  const disBg = p.neutral.light.medium;
  const disText = p.neutral.dark.lightest;

  if (opts.variant === "solid") {
    return {
      bg: isDis ? disBg : opts.selected ? fillSel : fill,
      borderColor: isDis ? disBg : opts.selected ? fillSel : fill,
      borderWidth: BORDER_WIDTH,
      icon: isDis ? disText : iconOnFill,
    };
  }

  if (opts.variant === "outline") {
    return {
      bg: "transparent",
      borderColor: isDis ? disBg : stroke,
      borderWidth: BORDER_WIDTH,
      icon: isDis ? disText : stroke,
    };
  }

  // ghost
  return {
    bg: isDis ? "transparent" : "transparent",
    borderColor: "transparent",
    borderWidth: 0,
    icon: isDis ? disText : opts.selected ? fill : p.neutral.light.lightest,
  };
}
