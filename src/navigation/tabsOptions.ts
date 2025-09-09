import { palette } from "@shared/lib/palette";

export function getTabsOptions(
  scheme: "light" | "dark",
  insets: { bottom: number }
) {
  const p = palette[scheme];
  return {
    headerShown: false,
    tabBarActiveTintColor: p.highlight.medium,
    tabBarInactiveTintColor: p.neutral.dark.dark,
    tabBarStyle: {
      backgroundColor: p.neutral.light.darkest,
      borderTopWidth: 0,
      height: 56 + insets.bottom,
      paddingBottom: Math.max(insets.bottom, 0),
    },
  };
}
