import { palette } from "@shared/lib/palette";
import { sizes, spacing, typography } from "@/shared/lib/tokens";

/**
 * Creates the bottom tabs navigator options based on theme and safe-area insets.
 */
export function getTabsOptions(
  scheme: "light" | "dark",
  insets: { bottom: number }
) {
  const p = palette[scheme];
  const label = typography.action.m;

  const extraTop = spacing.xsPlus;
  const baseBottom = Math.max(insets.bottom, 0);
  const adjustedBottom = Math.max(baseBottom - extraTop, 0);

  return {
    headerShown: false,
    tabBarActiveTintColor: p.highlight.medium,
    tabBarInactiveTintColor: p.neutral.light.darkest,

    tabBarLabelStyle: {
      fontFamily: label.fontFamily,
      fontSize: label.fontSize,
      lineHeight: label.lineHeight,
      marginTop: spacing.xxs,
    },

    tabBarItemStyle: {
      paddingTop: extraTop,
    },

    tabBarStyle: {
      backgroundColor: p.neutral.dark.medium,
      borderTopWidth: 0,
      height: sizes.control.xl + insets.bottom,
      paddingBottom: adjustedBottom,
    },
  } as const;
}
