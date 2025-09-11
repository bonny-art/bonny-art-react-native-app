import { palette } from "@shared/lib/palette";
import { typography } from "@/shared/lib/tokens";

export function getTabsOptions(
  scheme: "light" | "dark",
  insets: { bottom: number }
) {
  const p = palette[scheme];
  const label = typography.action.m; // або typography.body.s — як більше подобається

  // Скільки додати зверху і забрати знизу
  const extraTop = 6;
  const baseBottom = Math.max(insets.bottom, 0);
  const adjustedBottom = Math.max(baseBottom - extraTop, 0);

  return {
    headerShown: false,
    tabBarActiveTintColor: p.highlight.medium,
    tabBarInactiveTintColor: p.neutral.dark.dark,

    // Шрифт підписів із токенів
    tabBarLabelStyle: {
      fontFamily: label.fontFamily,
      fontSize: label.fontSize,
      lineHeight: label.lineHeight,
      marginTop: 2, // трохи повітря між іконкою та підписом
    },

    // Додаємо простір над іконками/підписом
    tabBarItemStyle: {
      paddingTop: extraTop,
    },

    tabBarStyle: {
      backgroundColor: p.neutral.light.darkest,
      borderTopWidth: 0,
      height: 56 + insets.bottom, // тримаємо загальну висоту
      paddingBottom: adjustedBottom, // симетрично зменшуємо низ
    },
  } as const;
}
