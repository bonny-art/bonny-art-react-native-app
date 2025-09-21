import { palette } from "@shared/lib/palette";
import { StyleSheet } from "react-native";
import { BADGE, BORDER_WIDTH, DIAMETER, ICON } from "./constants";
import type { IconButtonSize } from "./types";
import { radius, spacing, typography } from "@/shared/lib/tokens";

type ThemeName = keyof typeof palette;

/**
 * Generates size-aware base styles for the icon button wrapper and badge.
 */
export function makeBaseStyles(
  theme: ThemeName,
  size: IconButtonSize,
  padded: boolean
) {
  const p = palette[theme];
  const d = padded ? DIAMETER[size] : ICON[size];

  const actionBySize = {
    sm: typography.body.m,
    md: typography.body.l,
    lg: typography.body.xl,
  };

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
      bottom: spacing.xs,
      right: spacing.xs,
      minWidth: BADGE.size,
      height: BADGE.size,
      paddingHorizontal: BADGE.padX,
      borderRadius: radius.pill,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: p.highlight.medium,
    },
    badgeText: {
      color: p.neutral.dark.darkest,
      ...typography.action.s,
      lineHeight: spacing.md,
    },
    contentText: {
      ...actionBySize[size],
      textAlign: "center",
      includeFontPadding: false,
      color: "inherit",
    },
  });
}

/**
 * Determines icon button colors based on variant, selection, and disabled state.
 */
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

  const fill = p.highlight.medium;
  const fillSel = p.highlight.darkest;
  const iconOnFill = p.neutral.dark.darkest;
  const stroke = p.highlight.medium;

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

  return {
    bg: isDis ? "transparent" : "transparent",
    borderColor: "transparent",
    borderWidth: 0,
    icon: isDis ? disText : opts.selected ? fill : p.neutral.light.lightest,
  };
}
