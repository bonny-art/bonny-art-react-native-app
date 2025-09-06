import { useColorScheme } from "@/hooks/useColorScheme";
import { palette } from "@/constants/palette";

type ThemeName = keyof typeof palette; // 'light' | 'dark'
type PaletteTheme = (typeof palette)["light"] | (typeof palette)["dark"];

/**
 * Usage:
 * const text = useThemeColor({}, p => p.neutral.dark.lightest);
 * const accent = useThemeColor({}, p => p.highlight.medium);
 *
 * with overrides:
 * const bg = useThemeColor({ light: '#fff', dark: '#000' }, p => p.neutral.light.medium);
 */
export function useThemeColor(
  props: Partial<Record<ThemeName, string>>,
  selector: (p: PaletteTheme) => string
) {
  const scheme = (useColorScheme() ?? "light") as ThemeName;

  const override = props[scheme];
  if (override) return override;

  return selector(palette[scheme]);
}
