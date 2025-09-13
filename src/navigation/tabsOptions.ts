import { palette } from "@shared/lib/palette";
import { typography } from "@/shared/lib/tokens";

export function getTabsOptions(
  scheme: "light" | "dark",
  insets: { bottom: number }
) {
  const p = palette[scheme];
  const label = typography.action.m;

  const extraTop = 6;
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
      marginTop: 2,
    },

    tabBarItemStyle: {
      paddingTop: extraTop,
    },

    tabBarStyle: {
      backgroundColor: p.neutral.dark.medium,
      borderTopWidth: 0,
      height: 56 + insets.bottom,
      paddingBottom: adjustedBottom,
    },
  } as const;
}
